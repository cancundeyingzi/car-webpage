"use client";

import { photoCopy } from "@/content/photos";
import { sitePath } from "@/lib/site-path";
import { useRef, useState } from "react";
import { Sun, Moon, Expand, X, ArrowRight } from "lucide-react";
import { Dialog, DialogContent, DialogTitle, DialogDescription, DialogClose } from "@/components/ui/dialog";
import { scenes, type Scene } from "@/content/characters";
export function Photo({
  scene,
  eager = false,
  sizes = "(max-width: 700px) 100vw, 65vw"
}: {
  scene: Scene;
  eager?: boolean;
  sizes?: string;
}) {
  return <div className="photo-ink">
    <img src={sitePath(`/images/${scene}-1536.webp`)} srcSet={`${sitePath(`/images/${scene}-768.webp`)} 768w, ${sitePath(`/images/${scene}-1536.webp`)} 1536w`} sizes={sizes} width="1536" height="1317" alt={scenes[scene].alt} loading={eager ? "eager" : "lazy"} fetchPriority={eager ? "high" : "auto"} decoding="async" />
  </div>;
}
export function HeroPhotos() {
  const [selected, setSelected] = useState<Scene | null>(null);
  const trigger = useRef<HTMLAnchorElement | null>(null);
  return <>
    <div className="photo-stage">
      <div className="photo-orbit" aria-hidden="true" />
      <div className="floating-note" aria-hidden="true">
        <span>{photoCopy.greeting}</span>
        <svg viewBox="0 0 52 50" fill="none">
          <path d="M4 3C33 5 44 18 35 39M26 33L35 41L45 36" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>
      <div className="scene-motion day-motion" data-parallax="0.09">
        <a href={sitePath("/images/day-1536.webp")} className="scene-card day-card" onClick={e => {
          e.preventDefault();
          trigger.current = e.currentTarget;
          setSelected("day");
        }} aria-label={photoCopy.dayExpand}>
          <Photo scene="day" eager />
          <span className="scene-overlay">
            <span className="scene-label">
              <Sun size={16} />{" "}
              {photoCopy.dayLabel}
            </span>
            <span className="scene-expand">
              <Expand size={18} />
            </span>
          </span>
          <span className="photo-corner">{photoCopy.dayCorner}</span>
        </a>
      </div>
      <div className="scene-motion night-motion" data-parallax="-0.1">
        <a href={sitePath("/images/night-1536.webp")} className="scene-card night-card" onClick={e => {
          e.preventDefault();
          trigger.current = e.currentTarget;
          setSelected("night");
        }} aria-label={photoCopy.nightExpand}>
          <Photo scene="night" eager />
          <span className="scene-overlay">
            <span className="scene-label">
              <Moon size={16} />{" "}
              {photoCopy.nightLabel}
            </span>
            <span className="scene-expand">
              <Expand size={18} />
            </span>
          </span>
          <span className="photo-corner">{photoCopy.nightCorner}</span>
        </a>
      </div>
    </div>
    <PhotoDialog returnFocus={() => trigger.current?.focus({
      preventScroll: true
    })} scene={selected} onClose={() => setSelected(null)} onChange={setSelected} />
  </>;
}
export function PhotoDialog({
  scene,
  onClose,
  onChange,
  returnFocus
}: {
  scene: Scene | null;
  onClose: () => void;
  onChange: (scene: Scene) => void;
  returnFocus: () => void;
}) {
  const current = scene || "day";
  return <Dialog open={!!scene} onOpenChange={open => {
    if (!open) onClose();
  }}>
    <DialogContent className="photo-dialog" showCloseButton={false} onCloseAutoFocus={event => {
      event.preventDefault();
      returnFocus();
    }}>
      <DialogTitle className="sr-only">{scenes[current].label}  {photoCopy.dialogTitleSuffix}</DialogTitle>
      <DialogDescription className="sr-only">{photoCopy.dialogDescription}</DialogDescription>
      <DialogClose className="close-photo" aria-label={photoCopy.close}>
        <X size={20} />
      </DialogClose>
      <Photo scene={current} eager sizes="(max-width: 700px) 95vw, 85vw" />
      <div className="photo-dialog-footer">
        <span>
          {scenes[current].label}{" "}
          <small>{photoCopy.realPhoto}</small>
        </span>
        <button className="text-link" onClick={() => onChange(current === "day" ? "night" : "day")}>
          {photoCopy.otherSide}{" "}
          <ArrowRight size={17} />
        </button>
      </div>
    </DialogContent>
  </Dialog>;
}
