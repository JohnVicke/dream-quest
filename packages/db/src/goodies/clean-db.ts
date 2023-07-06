import { db } from "../db";
import { community, friends, post, subscription, user, vote } from "../schema";

export async function clean() {
  const promises = [
    db.delete(post),
    db.delete(user),
    db.delete(vote),
    db.delete(friends),
    db.delete(community),
    db.delete(subscription),
  ];
  await Promise.all(promises);
  console.log("Cleaned database");
}
