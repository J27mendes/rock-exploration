import globals from "globals"

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
    name: "example/strict",
    languageOptions: { globals: globals.node },
    rules: {
      "no-unused-vars": "error",
    },
  },
]
