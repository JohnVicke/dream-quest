import { fetchRequestHandler } from "@trpc/server/adapters/fetch";

import { createContext } from "~/lib/trpc/context";
import { router } from "~/lib/trpc/routers";

const handler = (request: Request) => {
  return fetchRequestHandler({
    endpoint: "/api/trpc",
    req: request,
    router,
    createContext,
    onError: ({ path, error }) => {
      console.error(
        `❌ tRPC failed on ${path ?? "<no-path>"}: ${error.message}`,
      );
    },
  });
};

export { handler as GET, handler as POST };
