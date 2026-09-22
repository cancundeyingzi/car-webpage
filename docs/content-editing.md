# 文案修改指南

这是静态网站的源码文案层，不是在线 CMS。修改 `content/` 后，需要重新构建并上传 `out/`。TS 文件内只写公开内容，不要放密码或服务器密钥。

## 只改一处的共享信息

打开 `content/site.ts`：

```ts
export const contactQQ = "1765875868";
export const rewardPolicy = "一经采纳，立即支付奖励。";
export const rewards = {
  small: { min: 300, max: 500 },
  large: 1000,
};
```

QQ 会同步用于悬赏页、体验页、联系弹窗、FAQ、搜索简介和复制操作。奖励会同步用于首页范围、悬赏卡片、搜索简介及弹窗。金额填写数字，千位分隔符由 `formatAmount` 生成；不要在派生字段再写死一份。

支付政策被正文与弹窗引用。若改变了奖励条件，还应阅读 `content/bounty.ts` 的 FAQ，核对其解释是否符合新的政策；程序无法自动改写自然语言中的法律或业务含义。

## 按页面编辑

- 首页：`home.ts`；`title` 是首页 H1，`homeMetadata` 是整站 SEO。
- 故事：`story-page.ts` 是页面摘要、图注和章节入口；`story.ts` 是完整手记；`meanings.ts` 是六处寓意。
- 角色：`characters.ts` 管理名称、角色、简介和标签；`character-detail.ts` 管理详述与信。角色长文中的专有名称仍需人工校对，系统只自动组合名称标签。
- 悬赏：`bounty.ts` 管理正文、流程和 FAQ；金额与 QQ 引用共享信息。
- 体验：`visit.ts`。
- 弹窗、按钮和复制反馈：`contact.ts`、`photos.ts`。
- 页眉页脚和 404：`shell.ts`、`not-found.ts`。
- 导航：`navigation.ts`；默认 SEO 名称引用相应导航名称，主标题单独保留创作空间。

`title` 与 `titleEmphasis` 分别是标题两行，换行和强调样式由 JSX 渲染。以 `Continuation` 或 `Line` 结尾的字段对应原有换行。保持这些字段名称，修改引号内的文字即可。不要把 `<br />` 或 HTML 塞进文本；需要改段落或布局时再改页面组件。

英文小标题、图片替代文字 `alt`、按钮的无障碍标签同样位于文案层。不要为了减少文件数量，将全部长文导入全站导航组件。

## 更新流程

1. 修改相应文案或 `public/images/` 中的照片。
2. 执行 `pnpm check`，排查语法、类型与代码规范问题。
3. 执行 `pnpm build`。构建会自动检查五个 HTML 文件及其本地链接、srcSet 和锚点。
4. 执行 `pnpm preview:static`，访问 `/car/`，检查换行与按钮。
5. 上传 `out/` 内全部内容到服务器 `car/`，清理旧 HTML 缓存。

不要直接修改成品 HTML：同一内容还存在于客户端页面数据中，手改可能造成水合不一致，下次构建也会覆盖。
