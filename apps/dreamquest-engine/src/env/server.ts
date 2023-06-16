import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

export const env = createEnv({
  server: {
    API_BASE_URL: z.string().min(1),
    OPENAI_API_KEY: z.string().min(1),
    CLERK_SECRET_KEY: z.string().optional(),
  },
  runtimeEnv: {
    API_BASE_URL: process.env.API_BASE_URL,
    CLERK_SECRET_KEY: process.env.CLERK_SECRET_KEY,
    OPENAI_API_KEY: process.env.OPENAI_API_KEY,
  },
});
