import type { Config } from "tailwindcss";

import baseConfig from "@dq/tailwind-config";

export default {
  content: ["./src/**/*.tsx", "../../packages/ui/src/**/*.tsx"],
  presets: [baseConfig],
  plugins: [require("@tailwindcss/typography")],
} satisfies Config;
