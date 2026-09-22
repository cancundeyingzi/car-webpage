# 部署到 https://i.ccdyz.top/car/

## 直接上传成品

1. 先备份服务器现有的 car 文件夹；如果你已经替换过照片或修改过内容，也保留这些修改。
2. 将交付包 website/ **里面的全部文件和目录**上传到网站根目录下的 car/ 文件夹。不要多套一层 website，也不要形成 car/car。
3. 上传后应存在 car/index.html、car/_next/、car/images/、car/story/index.html、car/bounty/index.html、car/visit/index.html。
4. 访问 https://i.ccdyz.top/car/。四个页面应能直接访问及刷新，图片、JS、CSS 请求都应在 /car/ 下。
5. 清理该站点的旧 HTML/CDN 缓存，然后刷新手机浏览器。更新过程中可保留旧的带哈希 _next/static 文件，等旧 HTML 缓存过期后再清理。

只上传成品网页；不用上传 source/、node_modules/，服务器不需要 Node.js。不要删除或覆盖 i.ccdyz.top 下的其他网站内容。

## Nginx 配置

如果直接访问 /car/story/ 仍然 404，确认服务器网站根目录及文件位置，再检查伪静态规则。可把下面的两段合并到现有 i.ccdyz.top 的 server 块中，保留现有证书、root 与其他网站配置；同一路径已有 location 时应修改原规则，避免重复。

```nginx
location = /car {
    return 301 /car/;
}
location ^~ /car/ {
    index index.html;
    error_page 404 /car/404.html;
    try_files $uri $uri/ =404;
}
```

上述配置使用现有 server 的 root，root 应指向域名网站根目录，例如 /www/wwwroot/i.ccdyz.top，而不是它里面的 car 文件夹。示例中的 error_page 让缺失页面显示本包自定义 404，并保留 404 状态码。网站服务器需加载 mime.types；不要把 JS/CSS 请求回退成首页 HTML。已有正常静态目录配置时通常不需要添加这些规则。

## 修改源码及重新构建

本包默认配置已为 /car。Node.js 22.13+ 和 pnpm 11.25.0 环境下，在 source/ 执行：

```bash
pnpm install --frozen-lockfile
pnpm run build
pnpm run preview:static
```

本地预览地址：http://127.0.0.1:8080/car/ 。每次修改后，把 out/ 内部全部内容上传到服务器 car/ 中。开发使用 pnpm dev，并访问命令所示地址的 /car/ 页面。

以后换子目录，只需修改 deployment.config.json 中的 basePath，然后重新构建。域名根目录部署使用空字符串；子目录使用 /car 这样的前导斜杠路径，末尾不加斜杠。不要只修改构建后的 HTML、不要只加 assetPrefix，也不要使用全局 <base> 标签来修复。

Next.js 的 basePath 负责路由与框架资源；普通 a、img、srcSet 和 favicon 通过 lib/site-path.ts 使用同一份配置。顶部 Next Link 保留 /story/ 等无前缀参数，由框架自动转换，避免 /car/car/。

官方文档：https://nextjs.org/docs/app/api-reference/config/next-config-js/basePath
