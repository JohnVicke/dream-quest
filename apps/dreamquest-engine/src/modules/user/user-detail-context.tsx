"use client";

import React from "react";

import { Comment, Community, Post, Subscription, User } from "@dq/db";

type UserDetails = User & {
  posts: Post[];
  comments: Comment[];
  communities: Community[];
  subscriptions: Subscription[];
};

export const UserDetailContext = React.createContext<UserDetails | null>(null);

export function useUserDetail() {
  const user = React.useContext(UserDetailContext);
  if (user === null) {
    throw new Error("useUserDetail must be used within a UserDetailProvider");
  }
  return user;
}

export function UserDetailProvider({
  children,
  user,
}: React.PropsWithChildren<{
  user: UserDetails;
}>) {
  return (
    <UserDetailContext.Provider value={user}>
      {children}
    </UserDetailContext.Provider>
  );
}
