import { createServer } from "node:http";
import { stat, readFile } from "node:fs/promises";
import { resolve, extname, sep } from "node:path";
import { existsSync, readFileSync } from "node:fs";
const { basePath } = JSON.parse(readFileSync(new URL("../deployment.config.json", import.meta.url), "utf8"));
const root = resolve("out");
if (!existsSync(resolve(root, "index.html"))) throw new Error("Run npm run build first.");
const types = {".html":"text/html; charset=utf-8",".js":"text/javascript; charset=utf-8",".css":"text/css; charset=utf-8",".json":"application/json",".txt":"text/plain; charset=utf-8",".webp":"image/webp",".png":"image/png",".svg":"image/svg+xml",".ico":"image/x-icon",".woff2":"font/woff2"};
const port = Number(process.env.PORT || 8080);
createServer(async (req, res) => {
  if (!["GET","HEAD"].includes(req.method)) { res.writeHead(405, {Allow:"GET, HEAD"}); res.end(); return; }
  try {
    const url = new URL(req.url, "http://localhost");
    if (basePath && url.pathname === basePath) { res.writeHead(301, {Location:basePath + "/" + url.search}); res.end(); return; }
    if (basePath && !url.pathname.startsWith(basePath + "/")) { res.writeHead(404); res.end("Not found"); return; }
    let file = resolve(root, "." + decodeURIComponent(url.pathname.slice(basePath.length) || "/"));
    if (file !== root && !file.startsWith(root + sep)) { res.writeHead(403); res.end(); return; }
    if ((await stat(file)).isDirectory()) {
      if (!url.pathname.endsWith("/")) { res.writeHead(301, {Location:url.pathname + "/" + url.search}); res.end(); return; }
      file = resolve(file, "index.html");
    }
    const bytes = await readFile(file);
    res.writeHead(200, {"Content-Type":types[extname(file)] || "application/octet-stream", "Content-Length":bytes.length});
    res.end(req.method === "HEAD" ? undefined : bytes);
  } catch {
    const bytes = await readFile(resolve(root, "404.html")).catch(() => Buffer.from("Not found"));
    res.writeHead(404, {"Content-Type":"text/html; charset=utf-8"});
    res.end(req.method === "HEAD" ? undefined : bytes);
  }
}).listen(port, "127.0.0.1", () => console.log(`Static preview: http://127.0.0.1:${port}${basePath}/`));
