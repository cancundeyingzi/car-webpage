import { rewardText, rewardPolicy } from "./site";
// Editable text for components/contact.tsx. Keep layout and behavior in the component.
export const contactCopy = {
  copied: "已复制",
  copyFailed: "请长按上方文字，手动复制。",
  copySuccess: "复制成功，可以粘贴到 QQ。",
  channel: "QQ",
  numberAria: "车主 QQ 号码，可长按复制",
  copyNumber: "复制 QQ",
  bountyHint: "添加时备注「痛车优化」，把你的想法发给我。",
  visitHint: "添加时备注「上车体验」，时间与地点联系详聊。",
  eyebrow: "LET’S TALK",
  bountyTitle: "好想法，直接来聊。",
  visitTitle: "把偶遇，变成一次相识。",
  bountyIntro: `采纳前确认修改范围与金额。${rewardPolicy}其他细节，我们联系详聊。`,
  visitIntro: "可以先在 QQ 上打个招呼；如果恰好在车旁遇见，也欢迎问问我现在是否方便。",
  bountyAction: "我有一个想法",
  visitAction: "联系车主，聊聊体验",
  close: "关闭",
  bountyDialogTitle: "让下一笔，更接近理想。",
  visitDialogTitle: "期待一次刚刚好的相遇。",
  bountyDialogDescription: `小修改 ¥${rewardText.small}，大修改 ¥${rewardText.large}。${rewardPolicy}`,
  visitDialogDescription: "上车体验的时间与地点，可以先联系详聊。当天是否方便，以车主确认为准。",
  proposalSummary: "需要一点思路？展开投稿提纲",
  proposalAria: "投稿提纲，可选中复制",
  copyProposal: "复制投稿提纲",
  visitReminderTitle: "先问一声，等一句欢迎。",
  visitReminder: "车辆停稳、车主在场并明确同意后，再一起看看车内。"
};
export const dialogKickers = {
  bounty: "LET’S MAKE IT BETTER",
  visit: "NICE TO MEET YOU"
};
