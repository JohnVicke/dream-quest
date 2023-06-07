/** @type {import('eslint').Linter.Config} */
const config = {
  root: true,
  extends: ["@ff/eslint-config/base"],
  parserOptions: {
    project: "./tsconfig.json",
  },
};

module.exports = config;
