import { type User } from "@clerk/nextjs/dist/types/server";

export const initialsFromUser = (user: User) =>
  `${user.firstName?.[0]}${user.lastName?.[0]}`;
