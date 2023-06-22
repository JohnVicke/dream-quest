import { createNextRouteHandler } from "uploadthing/next";

import { fileRouter } from "./core";

// export const runtime = "edge";

export const { GET, POST } = createNextRouteHandler({
  router: fileRouter,
});
