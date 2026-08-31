// ESLint 9 flat config — eslint-config-next ships flat arrays directly
// (no FlatCompat) since Next 16.
import { defineConfig, globalIgnores } from "eslint/config";
import coreWebVitals from "eslint-config-next/core-web-vitals";
import nextTypescript from "eslint-config-next/typescript";

const eslintConfig = defineConfig([
  globalIgnores([
    // Next.js generated
    "next-env.d.ts",
    // build output
    ".next/",
    "out/",
  ]),
  ...coreWebVitals,
  ...nextTypescript,
]);

export default eslintConfig;