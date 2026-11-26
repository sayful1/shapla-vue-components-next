const crypto = require("crypto");
const fs = require("fs");
const babel = require("@babel/core");
const vueJest = require("@vue/vue3-jest");

module.exports = {
  process(source, filename, config, options) {
    const result = vueJest.process(source, filename, config, options);
    const code = result.code.replace(
      /\/\/# sourceMappingURL=data:[\s\S]*?(?=import\s+\{)/,
      "",
    );
    const transformed = babel.transformSync(code, {
      filename,
      presets: ["@babel/preset-env"],
    });

    return {
      ...result,
      code: `${transformed.code}\nif (exports.render) exports.default = { ...exports.default, render: exports.render };`,
      map: transformed.map,
    };
  },
  getCacheKey(...args) {
    return crypto
      .createHash("sha256")
      .update(vueJest.getCacheKey(...args))
      .update(fs.readFileSync(__filename))
      .digest("hex");
  },
};