import { authMiddleware } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export default authMiddleware({
  publicRoutes: ['/', '/auth(.*)', '/portal(.*)', '/images(.*)'],
  ignoredRoutes: ['/chatbot'],
  afterAuth(auth, req) {
    // console.log("Middleware triggered for:", req.nextUrl.pathname);
    // console.log("auth.userId:", auth.userId);
    // console.log("auth.isPublicRoute:", auth.isPublicRoute);

    if (!auth.userId && !auth.isPublicRoute) {
      console.log("Redirecting to /auth/sign-in");
      const url = new URL('/auth/sign-in', req.url);
      return NextResponse.redirect(url);
    }

    if (auth.userId && req.nextUrl.pathname === '/auth/sign-in') {
      console.log("Redirecting to /dashboard");
      const url = new URL('/dashboard', req.url);
      return NextResponse.redirect(url);
    }
  },
});

// export const config = {
//   matcher: [
//     '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
//     '/(api|trpc)(.*)',
//   ],
// };

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    // Always run for API routes
    '/(api|trpc)(.*)',
  ],
};