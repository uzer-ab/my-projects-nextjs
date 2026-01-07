'use client';

import Link from "next/link";
import { useActionState } from "react";
import { register, type AuthState } from "@/lib/actions/auth";
import {
    AuthLayout,
    AuthInput,
    AuthButton,
    AuthDivider,
    AuthFooter,
    SocialLoginButtons
} from "@/components/auth";

const SignupIcon = () => (
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
        <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <line x1="19" x2="19" y1="8" y2="14" />
        <line x1="22" x2="16" y1="11" y2="11" />
    </svg>
);

export default function SignupPage() {
    const [state, formAction, isPending] = useActionState<AuthState | undefined, FormData>(
        register,
        undefined
    );

    return (
        <AuthLayout
            icon={<SignupIcon />}
            title="Create Account"
            subtitle="Join us and start your journey"
        >
            <form action={formAction} className="space-y-4">
                {state?.error && (
                    <div className="p-3 text-sm text-red-500 bg-red-500/10 border border-red-500/20 rounded-lg">
                        {state.error}
                    </div>
                )}

                <AuthInput
                    id="name"
                    name="name"
                    type="text"
                    label="Full Name"
                    placeholder="John Doe"
                    required
                />

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
                    minLength={8}
                />

                <AuthButton
                    type="submit"
                    isLoading={isPending}
                    loadingText="Creating account..."
                >
                    Create Account
                </AuthButton>
            </form>

            {/* <AuthDivider /> */}

            {/* <SocialLoginButtons /> */}

            <AuthFooter
                text="Already have an account?"
                linkText="Sign in"
                linkHref="/auth/login"
            />
        </AuthLayout>
    );
}
