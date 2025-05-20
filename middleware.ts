import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// Define public paths that don't require authentication
const publicPaths = ["/", "/onboarding", "/login", "/sign-in", "/sign-up", "/api/public"];

// Function to check if a path is public
const isPublic = (path: string) => {
  return publicPaths.some(publicPath => 
    path === publicPath || 
    path.startsWith(`${publicPath}/`) || 
    path.startsWith(`${publicPath}?`)
  );
};

// Create a route matcher
const isPublicRoute = createRouteMatcher(publicPaths);

// Export middleware function
export default function middleware(request: NextRequest) {
  // Safe path extraction with fallback
  const path = request.nextUrl?.pathname || "/";
  
  // Public paths are always accessible
  if (isPublic(path)) {
    return NextResponse.next();
  }
  
  // For protected routes, use Clerk middleware with correct redirect properties
  return clerkMiddleware({
    // Use the recommended properties instead of afterSignInUrl
    fallbackRedirectUrl: '/dashboard',
    publicRoutes: publicPaths
  })(request);
}

// Configure which routes this middleware will run on
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next
     * - static (static files)
     * - favicon.ico (favicon file)
     * - public folder
     */
    "/((?!static|.*\\..*|_next|favicon.ico).*)",
    "/",
  ],
};
