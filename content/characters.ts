export const characters = {
  day: {
    name: "祈夙",
    pronunciation: "Qí Sù",
    role: "副驾驶侧 · 蓝白黄的狐狸",
    title: "我还未绽放的可能",
    description: "他是理想人格的具象，是未竟之梦，也是对朋友、另一半与家的温柔期待。",
    alt: "副驾驶侧的蓝白黄狐狸祈夙，躺在草木与蓝天之间",
    motto: "夙愿非梦，祈而不求。"
  },
  night: {
    name: "ccdyz",
    pronunciation: "",
    role: "主驾驶侧 · 紫色自设",
    title: "镜子里，真实的我",
    description: "性格、爱好与现实中的我一致。喜欢魔法，也喜欢旅行与宁静；把自己的优点与不足，一起带上路。",
    alt: "主驾驶侧的紫色自设 ccdyz，躺在木船上托起火球，身后是星空",
    motto: "带着真实的自己，继续向前。"
  }
};
export const scenes = {
  day: {
    ...characters.day,
    label: characters.day.name + " · 幻想未来",
    tabLabel: characters.day.name + " · 幻想",
    english: "THE POSSIBILITY"
  },
  night: {
    ...characters.night,
    label: characters.night.name + " · 现实自我",
    tabLabel: characters.night.name + " · 自我",
    english: "THE REAL ME"
  }
};
export type Scene = keyof typeof scenes;
