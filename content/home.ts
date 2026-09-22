import { rewardText, siteName } from "./site";
import { characters } from "./characters";
import { navigationCopy } from "./navigation";
// Editable text for app/page.tsx. Keep layout and behavior in the component.
export const homeCopy = {
  decoration: "✳",
  subject: "无断点插画痛车",
  vehicle: "AVATR 07",
  title: "感谢你的喜欢",
  intro: "很高兴，这一段路被你遇见。",
  detailAction: "看看车身细节",
  bountyAction: "有个更好的想法？",
  caption: "现实与幻想，沿途相伴。",
  exploreAria: "向下查看快速入口",
  exploreAction: "还有一些，想和你分享",
  captionEnglish: "DAYLIGHT & STARDUST",
  exploreEyebrow: "TAKE A LITTLE DETOUR",
  exploreTitle: "随心看看。",
  exploreAside: "选一段你感兴趣的故事",
  storyNumber: "01 / STORY",
  storyTitle: "画里的两个世界",
  storyIntro: `认识${characters.day.name}与 ${characters.night.name}，读懂关于`,
  storyOutro: "未来、希望与家的故事。",
  storyAction: "设计思路与寓意",
  bountyNumber: "02 / CO-CREATE",
  bountyTitle: "下一笔，听你的",
  bountyIntro: "它还可以更好。欢迎带着",
  bountyOutro: "你的好点子，一起完善它。",
  bountyLabel: navigationCopy.bountyLabel,
  rewardRange: rewardText.overall,
  visitNumber: "03 / SAY HELLO",
  visitTitle: "有空，上车坐坐",
  visitIntro: "如果刚好遇见，也欢迎",
  visitOutro: "打个招呼，聊一聊彼此的热爱。",
  visitAction: "了解上车体验",
  closing: "让普通的一段路，多一点不普通的相遇。"
};
export const homeMetadata = {
  title: {
    default: `${siteName} · ${homeCopy.title}`,
    template: `%s · ${siteName}`
  },
  description: "无断点插画痛车，一辆车的白昼与星夜。看看设计故事，分享优化想法，期待下一次相遇。"
};
