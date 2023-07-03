import { authMiddleware } from "@clerk/nextjs";

export default authMiddleware({
  publicRoutes: ["/signin(.*)", "/api(.*)", "/", "/c(.*)"],
});
export const config = {
  matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
};
