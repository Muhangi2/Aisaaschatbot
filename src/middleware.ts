import { authMiddleware } from "@clerk/nextjs";

export default authMiddleware({
    publicRoutes: ['/', '/auth(.*)', '/portal(.*)','/images(.*)'],
    ignoredRoutes: ['/chatbot'],
    afterAuth(auth, req, evt) {
        // Handle any errors here
        if (!auth.userId && !auth.isPublicRoute) {
            const signInUrl = new URL('/auth/sign-in', req.url);
            signInUrl.searchParams.set('redirect_url', req.url);
            return Response.redirect(signInUrl);
        }
    }
});

export const config = {
    matcher: [
        // Match all routes except static files and api routes
        "/((?!.+\\.[\\w]+$|_next).*)",
        // Match all API routes
        "/api/:path*"
    ],
};