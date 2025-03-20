import { authMiddleware } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export default authMiddleware({
  publicRoutes: ['/', '/auth(.*)', '/portal(.*)', '/images(.*)'],
  ignoredRoutes: ['/chatbot'],
  afterAuth(auth, req, evt) {
    // If the user is not signed in and trying to access a protected route
    if (!auth.userId && !auth.isPublicRoute) {
      // Redirect them to your custom sign-in page
      const url = new URL('/auth/sign-in', req.url);
      return NextResponse.redirect(url);
    }
  }
});

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    // Always run for API routes
    '/(api|trpc)(.*)',
  ],
};