import { NextRequest, NextResponse } from "next/server";
import { authMiddleware } from "@clerk/nextjs";

export default authMiddleware({
  publicRoutes: [
    "/",
    "/signin(.*)",
    "/signup(.*)",
    "/u(.*)",
    "/sso-callback(.*)",
    "/c(.*)",
    "/api(.*)",
  ],
  afterAuth(auth, req) {
    if (auth.isPublicRoute) {
      return NextResponse.next();
    }
    if (!auth?.sessionClaims?.username) {
      return redirect("/complete-signup", req);
    }
    if (!auth.userId && req.nextUrl.pathname.endsWith("settings")) {
      return redirect("/signin", req);
    }
    if (!auth.userId) {
      return redirect("/signin", req);
    }
  },
});
export const config = {
  matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
};

const redirect = (url: string, req: NextRequest) => {
  const redirectUrl = new URL(req.nextUrl.origin);
  redirectUrl.pathname = url;
  return NextResponse.redirect(redirectUrl);
};
