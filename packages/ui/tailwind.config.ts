import baseConfig from "@ff/tailwind-config";
import type { Config } from "tailwindcss";

export default {
  content: ["../../apps/vega/src/**/*.tsx"],
  presets: [baseConfig],
} satisfies Config;
