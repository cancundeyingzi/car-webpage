# 沿途 · 无断点插画痛车

车辆二维码访客使用的中文网站，优先适配手机。保留浅色液态玻璃导航、弹性标签切换、滚动视差、实拍查看和四个独立页面。本包用于 `https://i.ccdyz.top/car/`，无需数据库、登录或后台服务。

## 直接部署

把交付包 `website/` **里面的全部内容**上传到服务器网站根目录下的 `car/` 文件夹。服务器不需要 Node.js。保留 `_next/`、`images/` 和各页子目录；不要多套一层 `website/` 或 `car/`。

更新前备份现有文件，尤其是自己替换过的照片。详见 `docs/deployment.md`，Nginx 示例见 `docs/nginx.conf`。本包没有自动上传到你的服务器。

## 修改源码

使用 Node.js 22.13+、pnpm 11.25.0，在源码目录运行：

```bash
pnpm install --frozen-lockfile
pnpm dev
```

在命令显示的本机地址后加 `/car/`。`dev:selfhost` 保留为同一命令的兼容别名。

```bash
pnpm check
pnpm build
pnpm preview:static
```

`check` 执行 ESLint 和 TypeScript 检查；`build` 导出静态网站，并检查页面、图片、脚本、样式与锚点路径。预览地址为 `http://127.0.0.1:8080/car/`。将新生成的 `out/` 内部全部内容上传到服务器 `car/`。`pnpm start` 也只启动本地静态预览；生产环境使用 Nginx 等静态服务器。

## 日常修改位置

所有业务文案集中在 `content/`。详细字段与示例见 **`docs/content-editing.md`**。

| 内容 | 文件 |
| --- | --- |
| QQ、奖励金额、支付规则、投稿提纲 | `content/site.ts` |
| 导航名称和顺序 | `content/navigation.ts` |
| 首页与整站 SEO | `content/home.ts` |
| 故事页标题、摘要与图注 | `content/story-page.ts` |
| 完整设计手记 | `content/story.ts` |
| 角色概述、名称与标签 | `content/characters.ts` |
| 角色详述与祈夙的信 | `content/character-detail.ts` |
| 六处寓意 | `content/meanings.ts` |
| 悬赏正文、流程与 FAQ | `content/bounty.ts` |
| 上车体验 | `content/visit.ts` |
| 联系弹窗、复制提示 | `content/contact.ts` |
| 页眉页脚、照片查看、404 | `content/shell.ts`、`content/photos.ts`、`content/not-found.ts` |
| 布局与页面结构 | `app/` 下的页面文件 |
| 全站框架、照片、角色、联系交互 | `components/site-shell.tsx`、`photos.tsx`、`story-scenes.tsx`、`contact.tsx` |
| 布局与动效外观 | `app/globals.css`、`app/liquid-glass.css` |
| 弹性标签、路由过渡、轻扫手势 | `components/liquid-motion.tsx` |
| 本地图片 | `public/images/` |
| 部署子路径 | `deployment.config.json` |

QQ 和奖励数字只在共享配置维护，页面、SEO、首页奖励提示和弹窗由它派生。导航名和 SEO 默认共用对应名称，页面主标题仍可独立编辑。

## 自托管路径

`deployment.config.json` 当前是 `basePath: "/car"`，末尾不加斜杠。改成其他路径后必须重新构建。根目录部署使用空字符串。

Next.js 的 `Link` 自动添加前缀；原生链接、图片、srcSet 和 favicon 使用 `lib/site-path.ts`。不要给 Next Link 重复加前缀，也不要只改导出 HTML。

## 本次代码整理

- 文案集中管理，移除重复 QQ、金额、支付规则与角色标签定义。
- 拆分原 `roadside.tsx`，角色长文和联系功能不再混在全站框架中。
- 删除确认未使用的 CSS、被覆盖的旧入场动画和一直隐藏的节点。
- 删除未接入的数据库、认证示例、旧 Vite/Cloudflare 开发配置及未使用的 UI 文件；保留实际使用的基础组件。
- 清理对应依赖及锁文件中的不可达条目，保留使用中依赖的原有版本和完整性校验值。
- 修复动效组件的静态检查问题、玻璃滑块尺寸监听、弹窗关闭后的焦点恢复；滚动进度限制在 0–100%。
- 增加静态导出路径检查，避免后续编辑再次造成子目录资源 404。

检查范围、结果和限制见 `docs/code-quality.md` 与 `docs/verification.md`。

## 照片与体验

两侧照片为实拍；引擎盖图片是明确标注的 AI 占位示意，不能作为实际贴膜或施工依据。替换方法见 `docs/images.md`。

复制按钮兼容不支持 Clipboard API 的浏览器，并保留手动复制提示。网站不自动发送 QQ 消息、不收款、不提供在线预约；建议与体验安排通过 QQ 详聊。

玻璃效果和移动端回退见 `docs/motion.md`。正式印制二维码前，仍需用真实 iPhone Safari、QQ 和微信内置浏览器检查手势、缩放与系统返回。
