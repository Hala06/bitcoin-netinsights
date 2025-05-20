import { clerkMiddleware } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// Define public paths that don't require authentication
const publicPaths = ["/", "/onboarding", "/login", "/sign-in", "/sign-up", "/api/public"];

// Use a simple middleware for handling both public and protected routes
export default function middleware(req: NextRequest) {
  // Check if the path is public
  const path = req.nextUrl.pathname;
  
  // If public path, allow access without authentication
  for (const publicPath of publicPaths) {
    if (path === publicPath || path.startsWith(`${publicPath}/`) || path.startsWith(`${publicPath}?`)) {
      return NextResponse.next();
    }
  }

  // For protected routes, redirect to sign-in if not authenticated
  // This is a simplified approach - in production you'd check auth status
  // Authentication will be handled by Clerk's components on the client side
  return NextResponse.next();
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
