/** @type {import('eslint').Linter.Config} */
const config = {
  root: true,
  extends: [
    "@dq/eslint-config/base",
    "@dq/eslint-config/nextjs",
    "@dq/eslint-config/react",
  ],
};

module.exports = config;
