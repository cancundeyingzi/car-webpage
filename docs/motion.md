# 玻璃与动效

## 这版的视觉行为

- 顶部导航、角色标签、目录胶囊与弹窗使用半透明底色、背景模糊、边缘高光和内阴影。它是网页中的液态玻璃风格，不是调用 iOS 原生材质。
- 导航和角色标签的滑块用 620 ms 的多段动画：从当前位置拉伸移动，轻微越过目标，再收回。文字独立动画，避免跟着滑块被横向拉长。
- 切换角色时，旧画面向反方向淡出，新画面在 600 ms 内进入并轻微回弹；文字分批进入。不同内容高度在 560 ms 内过渡。
- 连续点击会取消前一次播放，从当前可见位置继续；结束后隐藏旧内容。隐藏内容不可聚焦，保留标签的方向键操作。
- 顶部导航切换时，新页面按方向滑入；浏览器前进、后退仍由正常路由处理。其他正文链接保持原生跳转。
- 首页仍保留照片视差、滚动出现、按钮按压反馈。没有添加全屏粒子、持续运行的画布或额外动画依赖。

## 手机和 Safari

- 背景模糊同时写入 `-webkit-backdrop-filter` 与 `backdrop-filter`；不支持时使用更实的浅色底，文字保持可读。
- 主导航及角色标签的点击区域至少 44 px 高。页面允许缩放，未设置 `user-scalable=no`。
- 使用 `viewport-fit=cover` 和安全区间距；弹窗以 `100dvh` 限高，前面保留 `100vh` 回退。
- 角色内容区左右轻扫切换，最少移动 55 px，横向距离需明显大于纵向。保留纵向滚动和双指缩放，不阻止默认触摸事件；从屏幕两边 26 px 内开始的手势不触发切换，以避开系统返回操作。
- 从按钮、输入框和展开控件开始的触摸不切换角色；有效轻扫后的短时间内抑制误触照片链接。多指触摸取消切换。
- 无悬停的设备不保留鼠标悬停位移效果，点击时仍有轻按反馈。
- 动态监听 `prefers-reduced-motion`，关闭弹性滑动、视差和滚动入场。浏览器提供省流量信号时也减少动态效果。
- 浏览器支持减少透明度或增强对比度偏好时，玻璃切换为更实的底色。
- 不支持 Web Animations 的浏览器直接切换内容，不阻断导航。

## 调整位置

`components/liquid-motion.tsx` 负责滑块、路由过渡、内容切换和触摸判断；`app/liquid-glass.css` 负责材质与回退。减少动画时间时保持容器高度与内容入场时长接近，避免容器先结束、文字仍被裁切。

当前在云端 Chromium 和 320 / 390 px 响应式容器中检查，未连接真实 iPhone。正式印制二维码前，请在实际 iPhone Safari、QQ 或微信中打开自己的域名，检查左右轻扫、页面纵向滚动、边缘返回、横竖屏旋转、缩放与联系弹窗。系统开启“减少动态效果”后再次检查，动画应直接切换。原生返回手势和 Safari 地址栏的真实表现需要真机确认。

技术参考：

- WebKit 背景模糊：https://webkit.org/blog/3632/introducing-backdrop-filters/
- MDN 背景模糊：https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/backdrop-filter
- MDN 触摸行为：https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/touch-action
- MDN Web Animations：https://developer.mozilla.org/en-US/docs/Web/API/Element/animate
