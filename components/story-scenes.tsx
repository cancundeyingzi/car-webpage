"use client";

import { photoExpandLabel } from "@/content/photos";
import { characterCopy } from "@/content/character-detail";
import { sitePath } from "@/lib/site-path";
import { useRef, useState } from "react";
import { Sun, Moon, Expand } from "lucide-react";
import { LiquidSceneTabs } from "@/components/liquid-motion";
import { Photo, PhotoDialog } from "@/components/photos";
import { scenes, type Scene } from "@/content/characters";
const sceneOptions: [{
  value: Scene;
  label: React.ReactNode;
}, ...{
  value: Scene;
  label: React.ReactNode;
}[]] = [{
  value: "day",
  label: <>
    <Sun size={16} />{" "}
    {characterCopy.dayTab}
  </>
}, {
  value: "night",
  label: <>
    <Moon size={16} />{" "}
    {characterCopy.nightTab}
  </>
}];
export function StoryScenes() {
  const [selected, setSelected] = useState<Scene | null>(null);
  const trigger = useRef<HTMLAnchorElement | null>(null);
  return <>
    <LiquidSceneTabs options={sceneOptions}>{value => {
        const scene = value as Scene;
        return <>
        <div className={`story-scene ${scene}`}>
          <a href={sitePath(`/images/${scene}-1536.webp`)} className="story-photo" onClick={e => {
              e.preventDefault();
              trigger.current = e.currentTarget;
              setSelected(scene);
            }} aria-label={photoExpandLabel(scenes[scene].label)}>
            <Photo scene={scene} eager />
            <span className="expand-chip">
              <Expand size={17} />{" "}
              {characterCopy.viewPhoto}
            </span>
          </a>
          <div className="scene-story-copy">
            <span className="eyebrow">{scenes[scene].english}</span>
            <h2>
              {scenes[scene].name}
              <small>{scenes[scene].pronunciation}</small>
            </h2>
            <span className="character-role">{scenes[scene].role}</span>
            <h3>{scenes[scene].title}</h3>
            <p>{scenes[scene].description}</p>
            <blockquote className="character-motto">{scenes[scene].motto}</blockquote>
            <div className="scene-palette" aria-label={scene === "day" ? characterCopy.dayPalette : characterCopy.nightPalette}>
              <i />
              <i />
              <i />
              <span>{scene === "day" ? characterCopy.dayKeywords : characterCopy.nightKeywords}</span>
            </div>
          </div>
        </div>
        {scene === "day" ? <details className="character-detail">
          <summary>
            {characterCopy.expand}{" "}
            <span aria-hidden="true">＋</span>
          </summary>
          <div className="character-detail-body">
            <div>
              <h3>{characterCopy.motto}</h3>
              <p>{characterCopy.nameMeaning}</p>
              <p>{characterCopy.philosophy}</p>
              <p>{characterCopy.temperament}</p>
              <p className="character-belief">
                {characterCopy.belief}
                <br />
                {characterCopy.beliefContinuation}
              </p>
            </div>
            <div className="letter-card">
              <span className="eyebrow">{characterCopy.letterEyebrow}</span>
              <h3>{characterCopy.letterTitle}</h3>
              <p>
                {characterCopy.letterOneLineOne}
                <br />
                {characterCopy.letterOneLineTwo}
                <br />
                {characterCopy.letterOneLineThree}
                <br />
                {characterCopy.letterOneLineFour}
              </p>
              <p>
                {characterCopy.letterTwoLineOne}
                <br />
                {characterCopy.letterTwoLineTwo}
                <br />
                {characterCopy.letterTwoLineThree}
              </p>
              <p>
                {characterCopy.letterThreeLineOne}
                <br />
                {characterCopy.letterThreeLineTwo}
              </p>
              <span className="letter-signature">{characterCopy.signature}</span>
            </div>
          </div>
        </details> : <div className="self-note">
          <span>{characterCopy.selfLabel}</span>
          <p>{characterCopy.selfDescription}</p>
        </div>}
      </>;
      }}</LiquidSceneTabs>
    <PhotoDialog returnFocus={() => trigger.current?.focus({
      preventScroll: true
    })} scene={selected} onClose={() => setSelected(null)} onChange={setSelected} />
  </>;
}
