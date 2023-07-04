import { NextRequest, NextResponse } from "next/server";
import { authMiddleware } from "@clerk/nextjs";

export default authMiddleware({
  publicRoutes: ["/signin(.*)", "/api(.*)", "/", "/c(.*)"],
  signInUrl: "/signin",
  afterAuth(auth, req) {
    if (!auth.userId && req.nextUrl.pathname.endsWith("settings")) {
      return redirect("/signin", req);
    }
    if (!(auth.userId || auth.isPublicRoute)) {
      return redirect("/signin", req);
    }
  },
});
export const config = {
  matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
};

const redirect = (url: string, req: NextRequest) => {
  return NextResponse.redirect(new URL(url, req.url));
};
