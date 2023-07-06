import { headers } from "next/headers";
import { NextResponse } from "next/server";
import type {
  DeletedObjectJSON,
  UserJSON,
  WebhookEvent,
} from "@clerk/clerk-sdk-node";
import { Webhook, WebhookRequiredHeaders } from "svix";

import { exhaustive } from "~/utils/exhaustive";
import { env } from "~/env/server";

type AllowedEventTypes = "user.created" | "user.updated" | "user.deleted";
type VerifiedPayload = Extract<WebhookEvent, { type: AllowedEventTypes }>;

export async function POST(req: Request) {
  const body = await req.text();
  const webHook = new Webhook(env.CLERK_WEBHOOK_SECRET);

  try {
    const payload = webHook.verify(body, getSvixHeaders()) as VerifiedPayload;
    switch (payload.type) {
      case "user.created":
        return handleUserCreation(payload.data);
      case "user.updated":
        return handleUserUpdate(payload.data);
      case "user.deleted":
        return handleUserDeletion(payload.data);
      default:
        return exhaustive(payload);
    }
  } catch (error) {
    return new NextResponse("Unauthorized", { status: 401 });
  }
}

function getSvixHeaders(): WebhookRequiredHeaders {
  const requestHeaders = headers();
  return {
    "svix-id": requestHeaders.get("svix-id") ?? "",
    "svix-timestamp": requestHeaders.get("svix-timestamp") ?? "",
    "svix-signature": requestHeaders.get("svix-signature") ?? "",
  };
}

function handleUserCreation(user: UserJSON) {
  console.log("created", user);
  return new NextResponse("ok");
}

function handleUserUpdate(user: UserJSON) {
  console.log("updated", user);
  return new NextResponse("ok");
}

function handleUserDeletion(deletedObj: DeletedObjectJSON) {
  console.log("deleted", deletedObj);
  return new NextResponse("ok");
}
