import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

export default defineConfig([
  ...nextVitals,
  ...nextTs,
  globalIgnores([".next/**", "out/**", ".pnpm-store/**", "next-env.d.ts"]),
  {
    files: ["components/photos.tsx", "app/story/page.tsx"],
    rules: {
      // Static hosting: local WebP files, explicit dimensions, responsive srcSet,
      // and lazy loading are supplied directly; no image optimization server.
      "@next/next/no-img-element": "off",
    },
  },
]);
