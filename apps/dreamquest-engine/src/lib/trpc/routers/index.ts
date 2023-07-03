import { t } from "../trpc";
import { communityRouter } from "./community-router";
import { postRouter } from "./post-router";

export const router = t.router({
  community: communityRouter,
  post: postRouter,
});

export type Router = typeof router;
