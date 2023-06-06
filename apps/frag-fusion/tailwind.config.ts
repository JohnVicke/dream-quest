import type { Config } from "tailwindcss";

import baseConfig from "@ff/tailwind-config";

export default {
  content: ["./src/**/*.tsx", "../../packages/ui/src/**/*.tsx"],
  presets: [baseConfig],
} satisfies Config;
