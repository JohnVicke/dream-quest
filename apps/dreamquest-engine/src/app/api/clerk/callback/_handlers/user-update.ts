import { NextResponse } from "next/server";
import { UserJSON } from "@clerk/clerk-sdk-node";

import { db, eq, schema } from "@dq/db";

export async function handleUserUpdate(user: UserJSON) {
  try {
    await db
      .update(schema.user)
      .set({
        username: user.username as string, // always defined since we require it
        profileImageUrl: user.profile_image_url,
        updatedAt: new Date(),
      })
      .where(eq(schema.user.id, user.id));
  } catch (error) {
    return new NextResponse("Internal Server Error", { status: 500 });
  }
  return new NextResponse("Base user created", { status: 200 });
}
