import { NextResponse } from "next/server";
import { DeletedObjectJSON } from "@clerk/clerk-sdk-node";

import { db, eq, schema } from "@dq/db";

export async function handleUserDeletion(deletedObj: DeletedObjectJSON) {
  if (deletedObj.object !== "user" || !deletedObj.id) {
    return new NextResponse("Not a user", { status: 409 });
  }
  try {
    await db.delete(schema.user).where(eq(schema.user.id, deletedObj.id));
  } catch (error) {
    return new NextResponse("Internal Server Error", { status: 500 });
  }
  return new NextResponse("User removed", { status: 200 });
}
