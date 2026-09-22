"use client";

import { shellCopy } from "@/content/shell";
import { sitePath } from "@/lib/site-path";
import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";
import { Heart } from "lucide-react";
import { LiquidNavigation, RouteMotion } from "@/components/liquid-motion";
function Brand() {
  return <span className="brand">
    <svg viewBox="0 0 40 40" fill="none" aria-hidden="true">
      <path d="M5 25C11 25 12 12 19 12C27 12 25 28 33 28" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
      <path d="M7 31C13 31 15 18 22 18C28 18 28 11 34 9" stroke="currentColor" strokeWidth="3" strokeLinecap="round" opacity=".4" />
    </svg>
    <span>
      {shellCopy.brand}
      <small>{shellCopy.brandEnglish}</small>
    </span>
  </span>;
}
export function SiteShell({
  children
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname()?.replace(/\/$/, "") || "/";
  const progressRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    const connection = (navigator as Navigator & {
      connection?: EventTarget & {
        saveData?: boolean;
      };
    }).connection;
    let motion = !reduced.matches && !connection?.saveData;
    document.documentElement.dataset.motion = motion ? "full" : "reduced";
    let observer: IntersectionObserver | undefined;
    const reveals = Array.from(document.querySelectorAll<HTMLElement>(".reveal"));
    if (motion && "IntersectionObserver" in window) {
      observer = new IntersectionObserver(entries => entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("revealed");
          observer?.unobserve(entry.target);
        }
      }), {
        threshold: .1
      });
      reveals.forEach(el => {
        if (el.getBoundingClientRect().top > window.innerHeight) {
          el.classList.add("reveal-pending");
          observer?.observe(el);
        }
      });
    }
    const parallax = Array.from(document.querySelectorAll<HTMLElement>("[data-parallax]"));
    let frame = 0;
    const render = () => {
      frame = 0;
      const height = document.documentElement.scrollHeight - window.innerHeight;
      if (progressRef.current) progressRef.current.style.transform = `scaleX(${height > 0 ? Math.max(0, Math.min(1, window.scrollY / height)) : 0})`;
      parallax.forEach(el => {
        const parent = el.parentElement?.getBoundingClientRect();
        if (!parent || parent.bottom < -100 || parent.top > window.innerHeight + 100) return;
        const speed = Number(el.dataset.parallax || "0.08");
        const offset = motion ? Math.max(-38, Math.min(38, (window.innerHeight * .46 - (parent.top + parent.height * .5)) * speed)) : 0;
        el.style.setProperty("--parallax-y", `${offset}px`);
      });
    };
    const scroll = () => {
      if (!frame) frame = requestAnimationFrame(render);
    };
    const change = () => {
      motion = !reduced.matches && !connection?.saveData;
      document.documentElement.dataset.motion = motion ? "full" : "reduced";
      if (!motion) reveals.forEach(el => el.classList.add("revealed"));
      scroll();
    };
    window.addEventListener("scroll", scroll, {
      passive: true
    });
    window.addEventListener("resize", scroll, {
      passive: true
    });
    if (reduced.addEventListener) reduced.addEventListener("change", change);else reduced.addListener(change);
    connection?.addEventListener("change", change);
    render();
    return () => {
      window.removeEventListener("scroll", scroll);
      window.removeEventListener("resize", scroll);
      if (reduced.removeEventListener) reduced.removeEventListener("change", change);else reduced.removeListener(change);
      connection?.removeEventListener("change", change);
      cancelAnimationFrame(frame);
      observer?.disconnect();
    };
  }, [pathname]);
  return <>
    <a className="skip-link" href="#main-content">{shellCopy.skipMain}</a>
    <header className="site-header">
      <div className="nav-wrap">
        <a href={sitePath("/")} aria-label={shellCopy.homeAria} className="brand-link">
          <Brand />
        </a>
        <LiquidNavigation pathname={pathname} />
        <span className="header-note">
          <Heart size={14} strokeWidth={1.5} />{" "}
          {shellCopy.greeting}
        </span>
      </div>
      <div className="reading-progress" ref={progressRef} />
    </header>
    <RouteMotion pathname={pathname}>{children}</RouteMotion>
    <footer className="site-footer section-wrap">
      <a href={sitePath("/")} aria-label={shellCopy.homeAria}>
        <Brand />
      </a>
      <p>{shellCopy.footerMessage}</p>
      <span>{shellCopy.footerLabel}</span>
    </footer>
  </>;
}
