import js from "@eslint/js";
import tseslint from "typescript-eslint";

export default tseslint.config(
  { ignores: ["dist/", "coverage/", "node_modules/"] },
  js.configs.recommended,
  ...tseslint.configs.recommended,
  // shortcut: legacy API payloads typed any, replace with real types when touched
  { rules: { "@typescript-eslint/no-explicit-any": "warn" } },
);
