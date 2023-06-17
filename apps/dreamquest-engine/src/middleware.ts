import { NextResponse } from "next/server";
import { redirectToSignIn } from "@clerk/nextjs";
import { authMiddleware } from "@clerk/nextjs/server";

export default authMiddleware({
  publicRoutes: [
    "/",
    "/signin(.*)",
    "/home(.*)",
    "/terms(.*)",
    "/privacy(.*)",
    "/api(.*)",
  ],
  afterAuth(auth, req, evt) {
    console.log("afterAuth", auth, req, evt);
    if (!auth.userId && !auth.isPublicRoute) {
      return NextResponse.redirect("/signin");
    }
  },
});

export const config = {
  matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
};
