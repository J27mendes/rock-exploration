import tsPlugin from "@typescript-eslint/eslint-plugin" // O plugin com as regras
import tsParser from "@typescript-eslint/parser"
import { default as globals } from "globals"
import prettier from "eslint-config-prettier"

export default [
  {
    ignores: ["prisma/generated/**"],
  },
  {
    name: "example/recommended",
    languageOptions: { globals: globals.node },
    rules: {
      "no-unused-vars": "warn",
    },
  },
  {
    name: "typescript/recommended",
    files: ["**/*.ts", "**/*.tsx"],
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        project: "./tsconfig.json",
      },
    },
    plugins: {
      "@typescript-eslint": tsPlugin,
    },
    rules: {
      "@typescript-eslint/no-unused-vars": "warn",
    },
  },
  {
    ...prettier,
  },
]
