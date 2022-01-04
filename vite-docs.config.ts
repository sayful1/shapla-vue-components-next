import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import eslintPlugin from "vite-plugin-eslint";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(), eslintPlugin({ cache: false })],
  build: {
    sourcemap: false,
    target: "es2015",
    outDir: "docs",
    lib: {
      formats: ["umd"],
      entry: "docs-src/main.ts",
      name: "ShaplaComponent",
      fileName: "docs-script",
    },
    rollupOptions: {
      output: {
        assetFileNames: (assetInfo) => {
          if (assetInfo.name == "style.css") {
            return "docs-style.css";
          }
          return assetInfo.name;
        },
      },
    },
  },
});
