"use client";

import { sitePath } from "@/lib/site-path";

import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { ArrowUpRight, ArrowRight, Sun, Moon, Expand, X, Heart, Check, Copy } from "lucide-react";
import { Dialog, DialogContent, DialogTitle, DialogDescription, DialogClose } from "@/components/ui/dialog";
import { LiquidNavigation, LiquidSceneTabs, RouteMotion } from "@/components/liquid-motion";
import { characters, contactQQ, proposalTemplate } from "@/content/site";

export const scenes = {
  day: { ...characters.day, label: "祈夙 · 幻想未来", english: "THE POSSIBILITY" },
  night: { ...characters.night, label: "ccdyz · 现实自我", english: "THE REAL ME" },
};
export type Scene = keyof typeof scenes;

export function Photo({ scene, eager = false, sizes = "(max-width: 700px) 100vw, 65vw" }: { scene: Scene; eager?: boolean; sizes?: string }) {
  return <div className="photo-ink"><img src={sitePath(`/images/${scene}-1536.webp`)} srcSet={`${sitePath(`/images/${scene}-768.webp`)} 768w, ${sitePath(`/images/${scene}-1536.webp`)} 1536w`} sizes={sizes} width="1536" height="1317" alt={scenes[scene].alt} loading={eager ? "eager" : "lazy"} fetchPriority={eager ? "high" : "auto"} decoding="async" /></div>;
}

export function Brand() {
  return <span className="brand"><svg viewBox="0 0 40 40" fill="none" aria-hidden="true"><path d="M5 25C11 25 12 12 19 12C27 12 25 28 33 28" stroke="currentColor" strokeWidth="3" strokeLinecap="round" /><path d="M7 31C13 31 15 18 22 18C28 18 28 11 34 9" stroke="currentColor" strokeWidth="3" strokeLinecap="round" opacity=".4" /></svg><span>沿途<small>ON THE WAY</small></span></span>;
}

export function SiteShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()?.replace(/\/$/, "") || "/";
  const progressRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    const connection = (navigator as Navigator & { connection?: EventTarget & { saveData?: boolean } }).connection;
    let motion = !reduced.matches && !connection?.saveData;
    document.documentElement.dataset.motion = motion ? "full" : "reduced";
    let observer: IntersectionObserver | undefined;
    const reveals = Array.from(document.querySelectorAll<HTMLElement>(".reveal"));
    if (motion && "IntersectionObserver" in window) {
      observer = new IntersectionObserver(entries => entries.forEach(entry => { if (entry.isIntersecting) { entry.target.classList.add("revealed"); observer?.unobserve(entry.target); } }), { threshold: .1 });
      reveals.forEach(el => { if (el.getBoundingClientRect().top > window.innerHeight) { el.classList.add("reveal-pending"); observer?.observe(el); } });
    }
    const parallax = Array.from(document.querySelectorAll<HTMLElement>("[data-parallax]"));
    let frame = 0;
    const render = () => {
      frame = 0;
      const height = document.documentElement.scrollHeight - window.innerHeight;
      if (progressRef.current) progressRef.current.style.transform = `scaleX(${height > 0 ? window.scrollY / height : 0})`;
      parallax.forEach(el => {
        const parent = el.parentElement?.getBoundingClientRect();
        if (!parent || parent.bottom < -100 || parent.top > window.innerHeight + 100) return;
        const speed = Number(el.dataset.parallax || "0.08");
        const offset = motion ? Math.max(-38, Math.min(38, (window.innerHeight * .46 - (parent.top + parent.height * .5)) * speed)) : 0;
        el.style.setProperty("--parallax-y", `${offset}px`);
      });
    };
    const scroll = () => { if (!frame) frame = requestAnimationFrame(render); };
    const change = () => { motion = !reduced.matches && !connection?.saveData; document.documentElement.dataset.motion = motion ? "full" : "reduced"; if (!motion) reveals.forEach(el => el.classList.add("revealed")); scroll(); };
    window.addEventListener("scroll", scroll, { passive: true });
    window.addEventListener("resize", scroll, { passive: true });
    if (reduced.addEventListener) reduced.addEventListener("change", change); else reduced.addListener(change);
    connection?.addEventListener("change", change);
    render();
    return () => { window.removeEventListener("scroll", scroll); window.removeEventListener("resize", scroll); if (reduced.removeEventListener) reduced.removeEventListener("change", change); else reduced.removeListener(change); connection?.removeEventListener("change", change); cancelAnimationFrame(frame); observer?.disconnect(); };
  }, [pathname]);
  return <><a className="skip-link" href="#main-content">跳到正文</a><header className="site-header"><div className="nav-wrap"><a href={sitePath("/")}  aria-label="沿途，返回首页" className="brand-link"><Brand /></a><LiquidNavigation pathname={pathname} /><span className="header-note"><Heart size={14} strokeWidth={1.5} /> 很高兴遇见你</span></div><div className="reading-progress" ref={progressRef} /></header><RouteMotion pathname={pathname}>{children}</RouteMotion><footer className="site-footer section-wrap"><a href={sitePath("/")}  aria-label="沿途，返回首页"><Brand /></a><p>把喜欢的世界，带进日常。</p><span>沿途 · 个人痛车计划</span></footer></>;
}

export function HeroPhotos() {
  const [selected, setSelected] = useState<Scene | null>(null);
  return <><div className="photo-stage"><div className="photo-orbit" aria-hidden="true" /><div className="floating-note" aria-hidden="true"><span>Good to see you.</span><svg viewBox="0 0 52 50" fill="none"><path d="M4 3C33 5 44 18 35 39M26 33L35 41L45 36" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg></div><div className="scene-motion day-motion" data-parallax="0.09"><a href={sitePath("/images/day-1536.webp")}  className="scene-card day-card" onClick={e => { e.preventDefault(); setSelected("day"); }} aria-label="放大祈夙一侧实拍"><Photo scene="day" eager /><span className="scene-overlay"><span className="scene-label"><Sun size={16} /> 祈夙 · 幻想未来</span><span className="scene-expand"><Expand size={18} /></span></span><span className="photo-corner">01 — DAYLIGHT</span></a></div><div className="scene-motion night-motion" data-parallax="-0.1"><a href={sitePath("/images/night-1536.webp")}  className="scene-card night-card" onClick={e => { e.preventDefault(); setSelected("night"); }} aria-label="放大紫色自设一侧实拍"><Photo scene="night" eager /><span className="scene-overlay"><span className="scene-label"><Moon size={16} /> ccdyz · 现实自我</span><span className="scene-expand"><Expand size={18} /></span></span><span className="photo-corner">02 — STARDUST</span></a></div><span className="stage-note"><span /> 两个世界，在这里交汇。</span></div><PhotoDialog scene={selected} onClose={() => setSelected(null)} onChange={setSelected} /></>;
}

export function PhotoDialog({ scene, onClose, onChange }: { scene: Scene | null; onClose: () => void; onChange: (scene: Scene) => void }) {
  const current = scene || "day";
  return <Dialog open={!!scene} onOpenChange={open => { if (!open) onClose(); }}><DialogContent className="photo-dialog" showCloseButton={false}><DialogTitle className="sr-only">{scenes[current].label} · 车身实拍</DialogTitle><DialogDescription className="sr-only">浏览车辆两侧的实拍照片。</DialogDescription><DialogClose className="close-photo" aria-label="关闭照片"><X size={20} /></DialogClose><Photo scene={current} eager sizes="(max-width: 700px) 95vw, 85vw" /><div className="photo-dialog-footer"><span>{scenes[current].label} <small>车身实拍</small></span><button className="text-link" onClick={() => onChange(current === "day" ? "night" : "day")}>看看另一面 <ArrowRight size={17} /></button></div></DialogContent></Dialog>;
}

export function StoryScenes() {
  const [selected, setSelected] = useState<Scene | null>(null);
  return <><LiquidSceneTabs options={[{ value: "day", label: <><Sun size={16} /> 祈夙 · 幻想</> }, { value: "night", label: <><Moon size={16} /> ccdyz · 自我</> }]}>{value => { const scene = value as Scene; return <><div className={`story-scene ${scene}`}><a href={sitePath(`/images/${scene}-1536.webp`)} className="story-photo" onClick={e => { e.preventDefault(); setSelected(scene); }} aria-label={`放大${scenes[scene].label}实拍`}><Photo scene={scene} eager /><span className="expand-chip"><Expand size={17} /> 查看实拍</span></a><div className="scene-story-copy"><span className="eyebrow">{scenes[scene].english}</span><h2>{scenes[scene].name}<small>{scenes[scene].pronunciation}</small></h2><span className="character-role">{scenes[scene].role}</span><h3>{scenes[scene].title}</h3><p>{scenes[scene].description}</p><blockquote className="character-motto">{scenes[scene].motto}</blockquote><div className="scene-palette" aria-label={scene === "day" ? "配色：天蓝、草绿、暖黄" : "配色：深紫、浅紫、青蓝"}><i /><i /><i /><span>{scene === "day" ? "祈愿 · 旧梦 · 守望" : "真实 · 自由 · 探索"}</span></div></div></div>{scene === "day" ? <details className="character-detail"><summary>再多认识一点祈夙 <span aria-hidden="true">＋</span></summary><div className="character-detail-body"><div><h3>夙愿非梦，祈而不求。</h3><p>在这个名字里，「祈」寄托祈愿与守护，「夙」关联旧梦、初心与未竟之愿。这是我赋予他的私人寓意：过去的回响，与未来的微光，在同一个名字中相遇。</p><p>祈夙是愿望的化身，却不为结果而焦虑。他不是神，也不替我选择方向；他更像理想与现实之间的自我守望者，在动摇与畏惧的时候，陪我看清黎明之前的夜色。</p><p>他的“完美”不是没有缺点，而是明知缺憾，仍选择温柔、坚定与克制。不逃避，也不沉溺；为信念而活，不必急着得到答案。</p><p className="character-belief">愿之所在，步亦不悔。<br />我祈，不是为了得到，而是为了不丢失那一点微光。</p></div><div className="letter-card"><span className="eyebrow">A LETTER TO QÍ SÙ</span><h3>写给祈夙</h3><p>你是我没来得及成为的人，<br />是我还未绽放的可能性，<br />是在我走累的时候，<br />想回头拥抱一次的温柔理想。</p><p>我把那些我无法向谁解释的心事，<br />折成一只小小的纸狐，<br />寄存在你耳尖的花纹里。</p><p>你不用为我成就什么，<br />只要存在，就很好了。</p><span className="letter-signature">—— 你的造梦者</span></div></div></details> : <div className="self-note"><span>现实自我</span><p>紫色的他就是我。性格、爱好与现实一致，不是一份被修饰到完美的理想答案。木船、魔法与星空，都是我真实喜欢的事物。</p></div>}</>; }}</LiquidSceneTabs><PhotoDialog scene={selected} onClose={() => setSelected(null)} onChange={setSelected} /></>;
}

export function CopyButton({ value, label }: { value: string; label: string }) {
  const buttonRef = useRef<HTMLButtonElement>(null);
  const [copied, setCopied] = useState(false);
  const [copyFailed, setCopyFailed] = useState(false);
  async function copy() {
    let success = false;
    try { await navigator.clipboard.writeText(value); success = true; } catch { /* Fall back for HTTP and embedded browsers. */ }
    if (!success) {
      const field = document.createElement("textarea");
      field.value = value;
      field.setAttribute("readonly", "");
      field.style.cssText = "position:fixed;top:0;left:0;width:1px;height:1px;opacity:0;";
      const previousFocus = document.activeElement as HTMLElement | null;
      (buttonRef.current?.closest("[role=dialog]") || document.body).appendChild(field);
      field.select();
      field.setSelectionRange(0, value.length);
      try { success = document.execCommand("copy"); } catch { success = false; }
      field.remove();
      previousFocus?.focus({ preventScroll: true });
    }
    setCopied(success);
    setCopyFailed(!success);
  }
  return <div className="copy-control"><button ref={buttonRef} type="button" className="button button-dark" onClick={copy}>{copied ? <Check size={16} /> : <Copy size={16} />}{copied ? "已复制" : label}</button><span className="copy-status" role="status">{copyFailed ? "请长按上方文字，手动复制。" : copied ? "复制成功，可以粘贴到 QQ。" : ""}</span></div>;
}

function ContactDetails({ type }: { type: "bounty" | "visit" }) {
  return <><div className="qq-contact"><label>QQ<input aria-label="车主 QQ 号码，可长按复制" readOnly value={contactQQ} onFocus={event => event.target.select()} /></label><CopyButton value={contactQQ} label="复制 QQ" /></div><p className="contact-hint">{type === "bounty" ? "添加时备注「痛车优化」，把你的想法发给我。" : "添加时备注「上车体验」，时间与地点联系详聊。"}</p></>;
}

export function ContactSection({ type }: { type: "bounty" | "visit" }) {
  return <section className="contact-section reveal" id="contact"><div><p className="eyebrow">LET’S TALK</p><h2>{type === "bounty" ? "好想法，直接来聊。" : "把偶遇，变成一次相识。"}</h2><p>{type === "bounty" ? "采纳前确认修改范围与金额，一经采纳立即支付。其他细节，我们联系详聊。" : "可以先在 QQ 上打个招呼；如果恰好在车旁遇见，也欢迎问问我现在是否方便。"}</p></div><div><ContactDetails type={type} /></div></section>;
}

export function ParticipationDialog({ type }: { type: "bounty" | "visit" }) {
  const [open, setOpen] = useState(false);
  return <><a href="#contact" className="button button-dark" onClick={event => { event.preventDefault(); setOpen(true); }}>{type === "bounty" ? "我有一个想法" : "联系车主，聊聊体验"}<ArrowUpRight size={17} /></a><Dialog open={open} onOpenChange={setOpen}><DialogContent className="info-dialog" showCloseButton={false}><DialogClose className="close-info" aria-label="关闭"><X size={20} /></DialogClose><span className="dialog-kicker">{type === "bounty" ? "LET’S MAKE IT BETTER" : "NICE TO MEET YOU"}</span><DialogTitle>{type === "bounty" ? "让下一笔，更接近理想。" : "期待一次刚刚好的相遇。"}</DialogTitle><DialogDescription>{type === "bounty" ? "小修改 ¥300–500，大修改 ¥1,000。一经采纳，立即支付奖励。" : "上车体验的时间与地点，可以先联系详聊。当天是否方便，以车主确认为准。"}</DialogDescription><ContactDetails type={type} />{type === "bounty" ? <details className="proposal-details"><summary>需要一点思路？展开投稿提纲</summary><textarea className="proposal-template" aria-label="投稿提纲，可选中复制" value={proposalTemplate} readOnly rows={7} /><CopyButton value={proposalTemplate} label="复制投稿提纲" /></details> : <div className="visit-dialog-note"><strong>先问一声，等一句欢迎。</strong><p>车辆停稳、车主在场并明确同意后，再一起看看车内。</p></div>}</DialogContent></Dialog></>;
}
