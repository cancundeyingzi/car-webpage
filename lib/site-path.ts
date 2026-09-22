import deployment from "@/deployment.config.json";

/** For native anchors and public assets. Next Link adds basePath itself. */
export function sitePath(path: string) {
  return `${deployment.basePath}${path}`;
}
