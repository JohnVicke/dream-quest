import type { Config } from "tailwindcss";

import baseConfig from "@ff/tailwind-config";

export default {
  content: ["../../apps/vega/src/**/*.tsx"],
  presets: [baseConfig],
} satisfies Config;
