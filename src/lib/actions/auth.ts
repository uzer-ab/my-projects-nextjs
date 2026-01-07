"use server";

import { signIn, signOut } from "@/lib/auth";
import { prisma } from "@/data/prisma/client";
import bcrypt from "bcryptjs";
import { AuthError } from "next-auth";
import { redirect } from "next/navigation";

export type AuthState = {
  error?: string;
  success?: boolean;
};

export async function login(
  prevState: AuthState | undefined,
  formData: FormData
): Promise<AuthState> {
  try {
    const username = formData.get("username") as string;
    const password = formData.get("password") as string;
    let redirectUrl = formData.get("redirectUrl") as string;

    if (!redirectUrl || redirectUrl === "/") {
      redirectUrl = `/${username}/dashboard`;
    }

    if (!username || !password) {
      return { error: "Username and password are required" };
    }

    await signIn("credentials", {
      username,
      password,
      redirectTo: redirectUrl,
    });

    return { success: true };
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return { error: "Invalid username or password" };
        default:
          return { error: "Something went wrong" };
      }
    }
    // Re-throw redirect errors (signIn redirects on success)
    throw error;
  }
}

export async function register(
  prevState: AuthState | undefined,
  formData: FormData
): Promise<AuthState> {
  try {
    const name = formData.get("name") as string;
    const username = formData.get("username") as string;
    const password = formData.get("password") as string;

    // Validation
    if (!name || !username || !password) {
      return { error: "Name, username, and password are required" };
    }

    if (password.length < 8) {
      return { error: "Password must be at least 8 characters" };
    }

    if (username.length < 3) {
      return { error: "Username must be at least 3 characters" };
    }

    // Check if username already exists
    const existingUser = await prisma.users.findUnique({
      where: { username },
    });

    if (existingUser) {
      return { error: "Username already exists" };
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 12);

    // Create user
    await prisma.users.create({
      data: {
        name,
        username,
        password: hashedPassword,
      },
    });

    // Auto sign in after registration
    await signIn("credentials", {
      username,
      password,
      redirectTo: `/${username}/dashboard`,
    });

    return { success: true };
  } catch (error) {
    if (error instanceof AuthError) {
      return { error: "Failed to sign in after registration" };
    }
    // Re-throw redirect errors
    throw error;
  }
}

export async function logout() {
  await signOut({ redirectTo: "/" });
}
