import { db } from "../db";
import { community, post, subscription, user, vote } from "../schema";

export async function clean() {
  const promises = [
    db.delete(post),
    db.delete(user),
    db.delete(vote),
    db.delete(community),
    db.delete(subscription),
  ];
  const res = await Promise.allSettled(promises);
  res.forEach((r) => {
    if (r.status === "rejected") {
      console.log("Failed to delete", r.reason);
    } else {
      console.log("Deleted", r.value);
    }
  });
  console.log("Cleaned database");
}
