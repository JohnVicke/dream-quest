# Dream Quest

## What's inside?

Frag fusion monorepo currently includes the following apps and packages

### Apps and Packages

- `dreamquest-engine`: a [Next.js](https://nextjs.org/) 13 app (main application)
- `ui`: a stub React component library shared by React applications
- `config`: `eslint` `tailwind` and `tsconfig` configuration
- `db`: `drizzle-orm` database schemas and types

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

## Servers

[get5](https://github.com/splewis/get5)
