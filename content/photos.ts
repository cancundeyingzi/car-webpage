import { scenes } from "./characters";
// Editable text for components/photos.tsx. Keep layout and behavior in the component.
export const photoCopy = {
  greeting: "Good to see you.",
  dayExpand: `放大${scenes.day.name}一侧实拍`,
  dayLabel: scenes.day.label,
  dayCorner: "01 — DAYLIGHT",
  nightExpand: "放大紫色自设一侧实拍",
  nightLabel: scenes.night.label,
  nightCorner: "02 — STARDUST",
  dialogTitleSuffix: "· 车身实拍",
  dialogDescription: "浏览车辆两侧的实拍照片。",
  close: "关闭照片",
  realPhoto: "车身实拍",
  otherSide: "看看另一面"
};
export const photoExpandLabel = (label: string) => `放大${label}实拍`;
