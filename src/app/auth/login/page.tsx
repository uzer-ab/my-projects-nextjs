'use client';

import Link from "next/link";
import { useState } from "react";
import {
    AuthLayout,
    AuthInput,
    AuthButton,
    AuthDivider,
    AuthFooter,
    SocialLoginButtons
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

export default function LoginPage() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        // TODO: Implement login logic
        console.log('Login:', { username, password });
        setIsLoading(false);
    };

    return (
        <AuthLayout
            icon={<LoginIcon />}
            title="Welcome Back"
            subtitle="Sign in to your account to continue"
        >
            <form onSubmit={handleSubmit} className="space-y-5">
                <AuthInput
                    id="username"
                    type="text"
                    label="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="yourusername"
                    required
                />

                <AuthInput
                    id="password"
                    type="password"
                    label="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
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
                    isLoading={isLoading}
                    loadingText="Signing in..."
                >
                    Sign In
                </AuthButton>
            </form>

            {/* <AuthDivider /> */}

            {/* <SocialLoginButtons /> */}

            <AuthFooter
                text="Don't have an account?"
                linkText="Sign up"
                linkHref="/auth/signup"
            />
        </AuthLayout>
    );
}
