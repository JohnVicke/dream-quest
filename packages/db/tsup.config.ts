import { defineConfig } from "tsup";

export default defineConfig((opts) => {
  return {
    entry: ["src/index.ts"],
    format: ["esm"],
    splitting: false,
    sourcemap: true,
    clean: !opts.watch,
    bundle: true,
    dts: true,
  };
});
