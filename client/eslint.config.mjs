import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.extends("next/core-web-vitals", "next/typescript"),
  {
    ignores: [
      "node_modules/**",
      ".next/**",
      "out/**",
      "build/**",
      "next-env.d.ts",
    ],
  },
  {
    rules: {
      // Performance optimizations
      "react/jsx-no-bind": "warn",
      "react-hooks/exhaustive-deps": "warn",
      
      // Code quality
      "prefer-const": "error",
      "no-unused-vars": "off", // TypeScript handles this
      "@typescript-eslint/no-unused-vars": ["error", { argsIgnorePattern: "^_" }],
      "@typescript-eslint/no-explicit-any": "warn",
      
      // Next.js specific
      "@next/next/no-img-element": "error",
      "@next/next/no-page-custom-font": "error",
    },
  },
];

export default eslintConfig;
