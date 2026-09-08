import js from "@eslint/js";
import globals from "globals";
import { defineConfig } from "eslint/config";

export default defineConfig([
  { files: ["**/*.{js,mjs,cjs}"], plugins: { js }, extends: ["js/recommended"], languageOptions: { globals: globals.node } },
]);

  rules: {
    "class-methods-use-this": "off",
    "no-param-reassing": "off",
    "camelcase": "off",
    "no-unused-vars": ["error", {"argsIgnorePattern: "next}]

  }

