"use client";

import { navigationCopy, routes } from "@/content/navigation";
import Link from "next/link";
import { useEffect, useLayoutEffect, useRef, useState, type ReactNode, type TouchEvent } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
const spring = "cubic-bezier(.18,.82,.22,1)";
function watchMedia(query: MediaQueryList, callback: () => void) {
  if (query.addEventListener) {
    query.addEventListener("change", callback);
    return () => query.removeEventListener("change", callback);
  }
  query.addListener(callback);
  return () => query.removeListener(callback);
}
function useMotionEnabled() {
  const [enabled, setEnabled] = useState(false);
  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    const connection = (navigator as Navigator & {
      connection?: EventTarget & {
        saveData?: boolean;
      };
    }).connection;
    const update = () => setEnabled(!reduced.matches && !connection?.saveData);
    update();
    const cleanup = watchMedia(reduced, update);
    connection?.addEventListener("change", update);
    return () => {
      cleanup();
      connection?.removeEventListener("change", update);
    };
  }, []);
  return enabled;
}

/** Keep the glass lens separate from text, so only the lens stretches. */
function LiquidLens({
  active,
  motion
}: {
  active: number;
  motion: boolean;
}) {
  const lens = useRef<HTMLSpanElement>(null);
  const animation = useRef<Animation | null>(null);
  const labelAnimation = useRef<Animation | null>(null);
  const position = useRef<{
    x: number;
    width: number;
    active: number;
  } | null>(null);
  useLayoutEffect(() => {
    const element = lens.current;
    const rail = element?.parentElement;
    if (!rail || !element) return;
    const place = (animate: boolean) => {
      const target = rail.querySelector<HTMLElement>(`[data-segment="${active}"]`);
      if (!target) {
        animation.current?.cancel();
        labelAnimation.current?.cancel();
        element.style.opacity = "0";
        delete rail.dataset.lensReady;
        position.current = null;
        return;
      }
      const x = target.offsetLeft;
      const width = target.offsetWidth;
      const previous = position.current;
      const live = element.getBoundingClientRect();
      const origin = rail.getBoundingClientRect();
      const startX = previous ? live.left - origin.left - rail.clientLeft : x;
      const startWidth = previous ? live.width : width;
      animation.current?.cancel();
      labelAnimation.current?.cancel();
      element.style.width = `${width}px`;
      element.style.height = `${target.offsetHeight}px`;
      element.style.top = `${target.offsetTop}px`;
      element.style.transform = `translate3d(${x}px,0,0)`;
      element.style.opacity = "1";
      rail.dataset.lensReady = "true";
      position.current = {
        x,
        width,
        active
      };
      if (animate && motion && previous && previous.active !== active && element.animate) {
        const direction = x >= startX ? 1 : -1;
        animation.current = element.animate([{
          transform: `translate3d(${startX}px,0,0) scale(${startWidth / width},1)`,
          offset: 0,
          easing: spring
        }, {
          transform: `translate3d(${x + direction * 3}px,0,0) scale(1.065,.91)`,
          offset: .57,
          easing: "ease-out"
        }, {
          transform: `translate3d(${x - direction * 1.5}px,0,0) scale(.98,1.035)`,
          offset: .79,
          easing: "ease-out"
        }, {
          transform: `translate3d(${x}px,0,0) scale(1,1)`,
          offset: 1
        }], {
          duration: 620,
          fill: "none"
        });
        const text = target.querySelector<HTMLElement>(".segment-label");
        labelAnimation.current = text?.animate([{
          transform: "translateY(1px) scale(.96)",
          opacity: .65
        }, {
          transform: "translateY(-1px) scale(1.025)",
          opacity: 1,
          offset: .7
        }, {
          transform: "translateY(0) scale(1)",
          opacity: 1
        }], {
          duration: 480,
          easing: spring
        }) || null;
      }
    };
    place(true);
    const sizeKey = () => Array.from(rail.querySelectorAll<HTMLElement>("[data-segment]")).map(el => `${el.offsetLeft}:${el.offsetWidth}:${el.offsetHeight}`).join("|");
    let railSize = sizeKey();
    const resize = () => {
      const next = sizeKey();
      if (next === railSize) return;
      railSize = next;
      place(false);
    };
    const observer = typeof ResizeObserver !== "undefined" ? new ResizeObserver(resize) : null;
    observer?.observe(rail);
    rail.querySelectorAll<HTMLElement>("[data-segment]").forEach(el => observer?.observe(el));
    window.addEventListener("resize", resize, {
      passive: true
    });
    return () => {
      observer?.disconnect();
      window.removeEventListener("resize", resize);
    };
  }, [active, motion]);
  useEffect(() => () => {
    animation.current?.cancel();
    labelAnimation.current?.cancel();
  }, []);
  return <span ref={lens} className="liquid-lens" aria-hidden="true">
    <span className="liquid-lens-light" />
  </span>;
}
export function LiquidNavigation({
  pathname
}: {
  pathname: string;
}) {
  const motion = useMotionEnabled();
  const active = routes.findIndex(item => (item.href.replace(/\/$/, "") || "/") === pathname);
  return <nav className="main-nav liquid-track" aria-label={navigationCopy.navigationAria}>
    <LiquidLens active={active} motion={motion} />
    {routes.map((item, index) => <Link key={item.href} href={item.href} prefetch={false} data-segment={index} aria-current={active === index ? "page" : undefined} className={`nav-link${active === index ? " active" : ""}`}>
      <span className="segment-label">{item.label}</span>
    </Link>)}
  </nav>;
}
export function RouteMotion({
  pathname,
  children
}: {
  pathname: string;
  children: ReactNode;
}) {
  const stage = useRef<HTMLDivElement>(null);
  const previous = useRef(pathname);
  const animation = useRef<Animation | null>(null);
  const motion = useMotionEnabled();
  useLayoutEffect(() => {
    const last = previous.current;
    previous.current = pathname;
    animation.current?.cancel();
    if (last === pathname || !motion || !stage.current?.animate) return;
    const index = (path: string) => routes.findIndex(item => (item.href.replace(/\/$/, "") || "/") === path);
    const direction = index(pathname) >= index(last) ? 1 : -1;
    animation.current = stage.current.animate([{
      opacity: .25,
      transform: `translate3d(${direction * 22}px,10px,0) scale(.992)`
    }, {
      opacity: 1,
      transform: `translate3d(${-direction * 2}px,0,0) scale(1)`,
      offset: .76
    }, {
      opacity: 1,
      transform: "translate3d(0,0,0) scale(1)"
    }], {
      duration: 560,
      easing: spring
    });
  }, [pathname, motion]);
  useEffect(() => () => animation.current?.cancel(), []);
  return <div className="route-motion" ref={stage}>{children}</div>;
}
export function LiquidSceneTabs({
  options,
  children
}: {
  options: readonly [{
    value: string;
    label: ReactNode;
  }, ...{
    value: string;
    label: ReactNode;
  }[]];
  children: (value: string) => ReactNode;
}) {
  const [active, setActive] = useState(options[0].value);
  const frame = useRef<HTMLDivElement>(null);
  const previous = useRef(active);
  const animations = useRef<Animation[]>([]);
  const generation = useRef(0);
  const motion = useMotionEnabled();
  const touch = useRef<{
    x: number;
    y: number;
  } | null>(null);
  const swipedAt = useRef(0);
  const index = options.findIndex(option => option.value === active);
  useLayoutEffect(() => {
    const stage = frame.current;
    if (!stage) return;
    const last = previous.current;
    previous.current = active;
    const interrupted = animations.current.some(animation => animation.playState === "running");
    const currentHeight = stage.getBoundingClientRect().height;
    const oldPanel = stage.querySelector<HTMLElement>(`[data-scene-panel="${last}"]`);
    const oldStyle = oldPanel ? getComputedStyle(oldPanel) : null;
    const oldVisual = {
      opacity: oldStyle?.opacity || "1",
      transform: oldStyle?.transform || "none"
    };
    animations.current.forEach(animation => animation.cancel());
    animations.current = [];
    const epoch = ++generation.current;
    stage.querySelectorAll<HTMLElement>("[data-leaving]").forEach(panel => delete panel.dataset.leaving);
    delete stage.dataset.moving;
    if (last === active || !motion || !stage.animate) return;
    const incoming = stage.querySelector<HTMLElement>(`[data-scene-panel="${active}"]`);
    const outgoing = stage.querySelector<HTMLElement>(`[data-scene-panel="${last}"]`);
    if (!incoming || !outgoing) return;
    outgoing.dataset.leaving = "true";
    stage.dataset.moving = "true";
    const direction = options.findIndex(option => option.value === active) > options.findIndex(option => option.value === last) ? 1 : -1;
    const startHeight = interrupted ? currentHeight : outgoing.offsetHeight;
    const endHeight = incoming.offsetHeight;
    const add = (element: HTMLElement, keyframes: Keyframe[], settings: KeyframeAnimationOptions) => {
      const animation = element.animate(keyframes, settings);
      animations.current.push(animation);
      return animation;
    };
    add(stage, [{
      height: `${startHeight}px`
    }, {
      height: `${endHeight}px`
    }], {
      duration: 560,
      easing: spring
    });
    add(outgoing, [{
      opacity: interrupted ? oldVisual.opacity : 1,
      transform: interrupted ? oldVisual.transform : "translate3d(0,0,0) scale(1)"
    }, {
      opacity: 0,
      transform: `translate3d(${-direction * 40}px,0,0) scale(.98)`
    }], {
      duration: 280,
      easing: "cubic-bezier(.4,0,.8,.2)",
      fill: "forwards"
    });
    const entrance = add(incoming, [{
      opacity: 0,
      transform: `translate3d(${direction * 48}px,8px,0) scale(.978)`
    }, {
      opacity: 1,
      transform: `translate3d(${-direction * 3}px,0,0) scale(1.002)`,
      offset: .76
    }, {
      opacity: 1,
      transform: "translate3d(0,0,0) scale(1)"
    }], {
      duration: 600,
      easing: spring
    });
    incoming.querySelectorAll<HTMLElement>(".scene-story-copy > *, .character-detail, .self-note").forEach((element, i) => {
      add(element, [{
        opacity: 0,
        transform: `translate3d(${direction * 13}px,10px,0)`
      }, {
        opacity: 1,
        transform: "translate3d(0,0,0)"
      }], {
        duration: 440,
        delay: 65 + Math.min(i, 6) * 32,
        easing: spring,
        fill: "backwards"
      });
    });
    entrance.onfinish = () => {
      if (epoch !== generation.current) return;
      delete outgoing.dataset.leaving;
      delete stage.dataset.moving;
    };
  }, [active, motion, options]);
  useEffect(() => () => {
    animations.current.forEach(animation => animation.cancel());
  }, []);
  function startTouch(event: TouchEvent<HTMLDivElement>) {
    swipedAt.current = 0;
    const point = event.touches[0];
    if (event.touches.length !== 1 || !point || point.clientX < 26 || point.clientX > document.documentElement.clientWidth - 26 || (event.target as HTMLElement).closest("button,input,textarea,summary")) {
      touch.current = null;
      return;
    }
    touch.current = {
      x: point.clientX,
      y: point.clientY
    };
  }
  function endTouch(event: TouchEvent<HTMLDivElement>) {
    const start = touch.current;
    touch.current = null;
    const point = event.changedTouches[0];
    if (!start || !point) return;
    const dx = point.clientX - start.x;
    const dy = point.clientY - start.y;
    if (Math.abs(dx) < 55 || Math.abs(dx) < Math.abs(dy) * 1.5) return;
    const next = index + (dx < 0 ? 1 : -1);
    if (next < 0 || next >= options.length) return;
    swipedAt.current = Date.now();
    setActive(options[next].value);
  }
  return <Tabs className="story-tabs liquid-tabs" value={active} onValueChange={setActive}>
    <div className="scene-controls">
      <TabsList className="scene-tabs liquid-track" aria-label={navigationCopy.charactersAria}>
        <LiquidLens active={index} motion={motion} />
        {options.map((option, i) => <TabsTrigger key={option.value} value={option.value} data-segment={i}>
          <span className="segment-label">{option.label}</span>
        </TabsTrigger>)}
      </TabsList>
      <span className="scene-gesture-hint" aria-hidden="true">{navigationCopy.gestureHint}</span>
    </div>
    <div className="scene-panel-stage" ref={frame} onTouchStart={startTouch} onTouchMove={event => {
      if (event.touches.length > 1) touch.current = null;
    }} onTouchCancel={() => {
      touch.current = null;
    }} onTouchEnd={endTouch} onClickCapture={event => {
      if (Date.now() - swipedAt.current < 400) {
        event.preventDefault();
        event.stopPropagation();
      }
    }}>
      {options.map(option => <TabsContent key={option.value} value={option.value} forceMount data-scene-panel={option.value} className="animated-scene-panel" aria-hidden={active !== option.value} inert={active !== option.value}>{children(option.value)}</TabsContent>)}
    </div>
  </Tabs>;
}
