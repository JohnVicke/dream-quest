/** @type {import('eslint').Linter.Config} */
const config = {
  root: true,
  extends: [
    "@ff/eslint-config/base",
    "@ff/eslint-config/nextjs",
    "@ff/eslint-config/react",
  ],
  parserOptions: {
    project: "./tsconfig.json",
  },
};

module.exports = config;
