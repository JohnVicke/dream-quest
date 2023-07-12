import { NextResponse } from "next/server";
import { UserJSON } from "@clerk/clerk-sdk-node";

import { db, schema } from "@dq/db";

import { Timestamp } from "~/utils/timestamp";

export async function handleUserCreation(user: UserJSON) {
  console.log("user", user);
  try {
    await db.insert(schema.user).values({
      id: user.id,
      username: user.username as string, // always defined since we require it
      profileImageUrl: user.profile_image_url,
      createdAt: new Timestamp(),
      updatedAt: new Timestamp(),
    });
  } catch (error) {
    return new NextResponse("Internal Server Error", { status: 500 });
  }
  return new NextResponse("Base user created", { status: 200 });
}
