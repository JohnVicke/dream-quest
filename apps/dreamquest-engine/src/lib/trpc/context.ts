import { getAuth } from "@clerk/nextjs/server";
import type { inferAsyncReturnType } from "@trpc/server";
import type * as trpcFetch from "@trpc/server/adapters/fetch";

export function createContext({ req }: trpcFetch.FetchCreateContextFnOptions) {
  const { userId } = getAuth(req as any);

  return {
    req,
    user: userId ? { id: userId } : null,
  };
}

export type Context = inferAsyncReturnType<typeof createContext>;
