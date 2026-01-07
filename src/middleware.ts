import NextAuth from "next-auth";
import { authConfig } from "@/lib/config/auth.config";

const { auth } = NextAuth(authConfig);

export default auth;

export const config = {
  matcher: [
    '/dashboard/:path*', // All dashboard routes
    '/api/:path*',      // All API routes (except auth routes)
  ]
};
