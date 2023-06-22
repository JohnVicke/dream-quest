import { defineConfig } from "tsup";

export default defineConfig((opts) => {
  return {
    entry: ["src/index.ts"],
    format: ["esm"],
    sourcemap: true,
    clean: !opts.watch,
    bundle: true,
    dts: true,
  };
});
