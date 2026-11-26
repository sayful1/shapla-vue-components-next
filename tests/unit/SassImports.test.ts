/** @jest-environment node */

declare const require: (moduleName: string) => any;
declare const __dirname: string;

const fs = require("fs");
const path = require("path");
const { pathToFileURL } = require("url");
const sass = require("sass");

const projectRoot = path.resolve(__dirname, "../..");
const nodeModules = path.join(projectRoot, "node_modules");

const readVueStyle = (filePath: string) => {
  const source = fs.readFileSync(filePath, "utf8");
  const style = source.match(/<style lang="scss">([\s\S]*?)<\/style>/);

  if (!style) {
    throw new Error(`Could not find an SCSS style block in ${filePath}`);
  }

  return style[1];
};

const compileStylesheet = (filePath: string, source: string) =>
  sass.compileString(source, {
    fatalDeprecations: ["import"],
    loadPaths: [nodeModules],
    url: pathToFileURL(filePath.replace(/\.vue$/, ".scss")),
  }).css;

describe("Sass imports", () => {
  test.each([
    [
      "MediaModal",
      "src/components/file-uploader/experimental/MediaModal.vue",
      /\.shapla-media-modal__item\.is-selected[\s\S]*?border-color: var\(--shapla-primary,/,
    ],
    [
      "FeaturedImage",
      "src/components/file-uploader/experimental/FeaturedImage.vue",
      /\.shapla-delete-icon[\s\S]*?background-color: var\(--shapla-error,/,
    ],
    [
      "ShaplaSearchForm",
      "src/components/search-form/ShaplaSearchForm.vue",
      /\.shapla-search-form__input:focus[\s\S]*?color: var\(--shapla-text-primary,/,
    ],
    [
      "ShaplaStepperStep",
      "src/components/stepper/ShaplaStepperStep.vue",
      /\.shapla-stepper-step\.is-active[\s\S]*?background-color: var\(--shapla-primary,/,
    ],
    [
      "docs App",
      "docs-src/App.vue",
      /@import url\("https:\/\/unpkg\.com\/@fortawesome\/fontawesome-free\/css\/all\.css"\)/,
    ],
    [
      "docs stylesheet",
      "docs-src/style.scss",
      /@import url\("https:\/\/unpkg\.com\/@fortawesome\/fontawesome-free\/css\/all\.css"\)/,
    ],
  ])(
    "compiles %s without Sass import deprecations",
    (_, relativePath, expectedRule) => {
      const filePath = path.join(projectRoot, relativePath);
      const source = relativePath.endsWith(".vue")
        ? readVueStyle(filePath)
        : fs.readFileSync(filePath, "utf8");
      const css = compileStylesheet(filePath, source);

      expect(css).toMatch(expectedRule);
    },
  );

  test("preserves documentation CSS imports", () => {
    const filePath = path.join(projectRoot, "docs-src/style.scss");
    const source = fs.readFileSync(filePath, "utf8");
    const css = compileStylesheet(filePath, source);

    expect(css).toContain(
      '@import url("https://fonts.googleapis.com/icon?family=Material+Icons");',
    );
    expect(css).toContain(
      '@import "highlight.js/styles/github-dark-dimmed.css";',
    );
  });
});
