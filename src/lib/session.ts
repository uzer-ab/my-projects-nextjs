import { auth } from "./auth";
import { redirect } from "next/navigation";

/**
 * Get the current session on the server side.
 */
export async function getSession() {
  return await auth();
}

/**
 * Require authentication - redirects to login if not authenticated.
 */
export async function requireAuth() {
  const session = await auth();

  if (!session?.user) {
    redirect("/auth/login");
  }

  return session;
}

/**
 * Get user from session or return null.
 */
export async function getCurrentUser() {
  const session = await auth();
  return session?.user ?? null;
}
