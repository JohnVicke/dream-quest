import { t } from "../trpc";
import { communityRouter } from "./community-router";
import { postRouter } from "./post-router";
import { subscriptionRouter } from "./subscription-router";
import { voteRouter } from "./vote-router";

export const router = t.router({
  community: communityRouter,
  post: postRouter,
  vote: voteRouter,
  subscription: subscriptionRouter,
});

export type Router = typeof router;
