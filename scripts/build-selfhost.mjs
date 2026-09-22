import { spawnSync } from "node:child_process";
import { existsSync } from "node:fs";
import { fileURLToPath } from "node:url";

const cli = fileURLToPath(new URL("../node_modules/next/dist/bin/next", import.meta.url));
const result = spawnSync(process.execPath, [cli, "build", "--webpack"], {
  stdio: "inherit",
  env: { ...process.env, ROADSIDE_STATIC_EXPORT: "1", NEXT_TELEMETRY_DISABLED: "1" },
});
if (result.error) throw result.error;
if (result.status !== 0) process.exit(result.status ?? 1);
for (const path of ["out/index.html", "out/story/index.html", "out/bounty/index.html", "out/visit/index.html", "out/404.html"]) {
  if (!existsSync(path)) throw new Error(`Missing static page: ${path}`);
}
await import("./verify-export.mjs");
console.log("Static website ready in out/. Upload its contents to your web server.");
