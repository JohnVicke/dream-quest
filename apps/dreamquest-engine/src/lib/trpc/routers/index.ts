import { t } from "../trpc";
import { commentRouter } from "./comment-router";
import { communityRouter } from "./community-router";
import { postRouter } from "./post-router";
import { subscriptionRouter } from "./subscription-router";
import { userRouter } from "./user-router";
import { voteRouter } from "./vote-router";

export const router = t.router({
  community: communityRouter,
  post: postRouter,
  vote: voteRouter,
  subscription: subscriptionRouter,
  user: userRouter,
  comment: commentRouter,
});

export type Router = typeof router;
