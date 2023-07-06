import { NextResponse } from "next/server";
import { UserJSON } from "@clerk/clerk-sdk-node";

import { db, schema } from "@dq/db";

export async function handleUserCreation(user: UserJSON) {
  try {
    await db.insert(schema.user).values({
      id: user.id,
      profileImageUrl: user.profile_image_url,
    });
  } catch (error) {
    return new NextResponse("Internal Server Error", { status: 500 });
  }
  return new NextResponse("Base user created", { status: 200 });
}
