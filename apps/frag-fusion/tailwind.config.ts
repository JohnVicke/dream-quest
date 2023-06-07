import baseConfig from "@ff/tailwind-config";
import type { Config } from "tailwindcss";

export default {
  content: ["./src/**/*.tsx", "../../packages/ui/src/**/*.tsx"],
  presets: [baseConfig],
} satisfies Config;
