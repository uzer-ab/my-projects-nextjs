import NextAuth from "next-auth";
import { authConfig } from "@/lib/config/auth.config";

export const { auth: middleware } = NextAuth(authConfig);

export const config = {
  matcher: [
    '/dashboard/:path*', // All dashboard routes
    '/api/:path*',      // All API routes
  ]
};
