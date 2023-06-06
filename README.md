# Frag fusion

## What's inside?

Frag fusion monorepo currently includes the following apps and packages

### Apps and Packages

- `www`: a [Astro](https://astro.build/) website (marketing basically)
- `frag-fusion`: a [Next.js](https://nextjs.org/) 13 app (main application)
- `ui`: a stub React component library shared by React applications
- `eslint-config`: `eslint` configurations (includes `eslint-config-next` and `eslint-config-prettier`)
- `tailwind-config`: `tailwind` configurations used throughout the monorepo

Each package/app is 100% [TypeScript](https://www.typescriptlang.org/).

### Utilities

This Turborepo has some additional tools already setup for you:

- [TypeScript](https://www.typescriptlang.org/) for static type checking
- [ESLint](https://eslint.org/) for code linting
- [Prettier](https://prettier.io) for code formatting

### Build

To build all apps and packages, run the following command:

```
pnpm build
```

### Develop

To develop all apps and packages, run the following command:

```
pnpm dev
```
