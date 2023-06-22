import { InferModel } from "drizzle-orm";

import * as schema from "./schema";

export type Community = InferModel<typeof schema.community>;
