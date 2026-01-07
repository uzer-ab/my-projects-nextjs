'use client';

import Link from "next/link";
import { useActionState } from "react";
import { useSearchParams } from "next/navigation";
import { login, type AuthState } from "@/lib/actions/auth";
import {
    AuthLayout,
    AuthInput,
    AuthButton,
    AuthFooter,
} from "@/components/auth";

const LoginIcon = () => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="h-7 w-7 text-primary"
    >
        <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4" />
        <polyline points="10 17 15 12 10 7" />
        <line x1="15" x2="3" y1="12" y2="12" />
    </svg>
);

import { Suspense } from "react";

function LoginFormComponent() {
    const searchParams = useSearchParams();
    const redirectUrl = searchParams.get("redirectUrl") || "/";

    const [state, formAction, isPending] = useActionState<AuthState | undefined, FormData>(
        login,
        undefined
    );

    return (
        <form action={formAction} className="space-y-5">
            <input type="hidden" name="redirectUrl" value={redirectUrl} />

            {state?.error && (
                <div className="p-3 text-sm text-red-500 bg-red-500/10 border border-red-500/20 rounded-lg">
                    {state.error}
                </div>
            )}

            <AuthInput
                id="username"
                name="username"
                type="text"
                label="Username"
                placeholder="yourusername"
                required
            />

            <AuthInput
                id="password"
                name="password"
                type="password"
                label="Password"
                placeholder="••••••••"
                required
                rightLabel={
                    <Link
                        href="/auth/forgot-password"
                        className="text-sm text-primary hover:text-primary/80 transition-colors"
                    >
                        Forgot password?
                    </Link>
                }
            />

            <AuthButton
                type="submit"
                isLoading={isPending}
                loadingText="Signing in..."
            >
                Sign In
            </AuthButton>
        </form>
    );
}

export default function LoginPage() {
    return (
        <AuthLayout
            icon={<LoginIcon />}
            title="Welcome Back"
            subtitle="Sign in to your account to continue"
        >
            <Suspense fallback={<div className="h-64 flex items-center justify-center">Loading...</div>}>
                <LoginFormComponent />
            </Suspense>

            <AuthFooter
                text="Don't have an account?"
                linkText="Sign up"
                linkHref="/auth/signup"
            />
        </AuthLayout>
    );
}
