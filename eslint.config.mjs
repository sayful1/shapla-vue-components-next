import eslint from "@eslint/js";
import prettierConfig from "@vue/eslint-config-prettier/skip-formatting";
import {
  defineConfigWithVueTs,
  vueTsConfigs,
} from "@vue/eslint-config-typescript";
import pluginVue from "eslint-plugin-vue";
import globals from "globals";

export default defineConfigWithVueTs(
  {
    ignores: ["dist/**"],
  },
  {
    languageOptions: {
      ecmaVersion: 2020,
      sourceType: "module",
      globals: {
        ...globals.browser,
        ...globals.node,
      },
    },
  },
  eslint.configs.recommended,
  pluginVue.configs["flat/recommended"],
  vueTsConfigs.recommended,
  {
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
  },
  prettierConfig,
);