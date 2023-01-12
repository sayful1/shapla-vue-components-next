module.exports = {
  root: true,
  env: {
    node: true,
  },
  extends: [
    "plugin:vue/vue3-recommended",
    "eslint:recommended",
    "@vue/typescript/recommended",
    "prettier",
  ],
  parser: "vue-eslint-parser",
  parserOptions: {
    ecmaVersion: 2020,
    parser: "@typescript-eslint/parser",
  },
  rules: {
    "no-console": process.env.NODE_ENV === "production" ? "warn" : "off",
    "no-debugger": process.env.NODE_ENV === "production" ? "warn" : "off",
    "vue/no-v-html": "off",
    "vue/v-on-event-hyphenation": "off",
    "vue/singleline-html-element-content-newline": "off",
    "vue/max-attributes-per-line": [
      "warn",
      { singleline: { max: 4 }, multiline: { max: 3 } },
    ],
    "vue/first-attribute-linebreak": [
      "warn",
      { singleline: "beside", multiline: "below" },
    ],
    "prefer-const": [
      "warn",
      {
        destructuring: "any",
        ignoreReadBeforeAssign: false,
      },
    ],
  },
};
