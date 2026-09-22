// Check the actual static output, including native links and responsive images.
import { readFileSync, statSync } from "node:fs";
import { resolve, sep } from "node:path";
import { fileURLToPath } from "node:url";

const project = fileURLToPath(new URL("../", import.meta.url));
const { basePath } = JSON.parse(readFileSync(resolve(project, "deployment.config.json"), "utf8"));
const root = resolve(project, "out");
const origin = "https://static-check.invalid";
const routes = ["/", "/story/", "/bounty/", "/visit/", "/404.html"];
const checked = new Set();

function outputFile(pathname) {
  if (!pathname.startsWith(`${basePath}/`)) throw new Error(`URL is outside basePath: ${pathname}`);
  let file = resolve(root, `.${decodeURIComponent(pathname.slice(basePath.length))}`);
  if (file !== root && !file.startsWith(`${root}${sep}`)) throw new Error(`URL leaves output directory: ${pathname}`);
  if (statSync(file).isDirectory()) file = resolve(file, "index.html");
  if (!statSync(file).isFile()) throw new Error(`Missing output file: ${pathname}`);
  return file;
}

for (const route of routes) {
  const page = `${basePath}${route}`;
  // Ignore inline script payloads; inspect HTML attributes only.
  const html = readFileSync(outputFile(page), "utf8").replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi, match => match.slice(0, match.indexOf(">") + 1));
  for (const match of html.matchAll(/\b(href|src|srcset)="([^"]+)"/gi)) {
    const values = match[1].toLowerCase() === "srcset" ? match[2].split(",").map(value => value.trim().split(/\s+/)[0]) : [match[2]];
    for (const value of values) {
      const url = new URL(value.replaceAll("&amp;", "&"), `${origin}${page}`);
      if (url.origin !== origin) continue;
      const file = outputFile(url.pathname);
      checked.add(url.pathname);
      if (url.hash) {
        const target = decodeURIComponent(url.hash.slice(1));
        const ids = Array.from(readFileSync(file, "utf8").matchAll(/\bid="([^"]+)"/g), item => item[1]);
        if (!ids.includes(target)) throw new Error(`Missing anchor: ${page} -> ${url.pathname}${url.hash}`);
      }
    }
  }
}
console.log(`Verified ${routes.length} pages and ${checked.size} local URLs, including anchors and srcSet.`);
