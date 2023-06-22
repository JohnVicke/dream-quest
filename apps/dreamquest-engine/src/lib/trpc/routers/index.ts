import { t } from "../trpc";
import { communityRouter } from "./community-router";

export const router = t.router({
  community: communityRouter,
});

export type Router = typeof router;
