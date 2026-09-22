// Public website content. No passwords or private server settings belong here.
export const contactQQ = "1765875868";
export const proposalTemplate = "痛车设计优化建议\n修改位置：\n目前的问题：\n建议的改法：\n参考图或草图说明：\n预计修改范围：\n我的联系方式：";
export const rewardPolicy = "一经采纳，立即支付奖励。";

// Shared facts: change these once, then rebuild the static website.
export const siteName = "沿途";
export const rewards = {
  small: {
    min: 300,
    max: 500
  },
  large: 1000
};
export const formatAmount = (amount: number) => amount.toLocaleString("en-US");
export const rewardText = {
  small: `${formatAmount(rewards.small.min)}–${formatAmount(rewards.small.max)}`,
  large: formatAmount(rewards.large),
  overall: `¥${formatAmount(rewards.small.min)}–${formatAmount(rewards.large)}`
};
