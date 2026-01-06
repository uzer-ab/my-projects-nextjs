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
    const [name, setName] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        // TODO: Implement signup logic
        console.log('Signup:', { name, username, password });
        setIsLoading(false);
    };

    return (
        <AuthLayout
            icon={<SignupIcon />}
            title="Create Account"
            subtitle="Join us and start your journey"
        >
            <form onSubmit={handleSubmit} className="space-y-4">
                <AuthInput
                    id="name"
                    type="text"
                    label="Full Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="John Doe"
                    required
                />

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
                    minLength={8}
                />

                {/* Terms */}
                <div className="flex items-start gap-3">
                    <input
                        id="terms"
                        type="checkbox"
                        required
                        className="mt-1 h-4 w-4 rounded border-border/50 bg-secondary/50 text-primary focus:ring-primary/50 focus:ring-offset-0"
                    />
                    <label htmlFor="terms" className="text-sm text-muted-foreground">
                        I agree to the{' '}
                        <Link href="/terms" className="text-primary hover:text-primary/80 transition-colors">
                            Terms of Service
                        </Link>
                        {' '}and{' '}
                        <Link href="/privacy" className="text-primary hover:text-primary/80 transition-colors">
                            Privacy Policy
                        </Link>
                    </label>
                </div>

                <AuthButton
                    type="submit"
                    isLoading={isLoading}
                    loadingText="Creating account..."
                >
                    Create Account
                </AuthButton>
            </form>

            <AuthDivider />

            <SocialLoginButtons />

            <AuthFooter
                text="Already have an account?"
                linkText="Sign in"
                linkHref="/auth/login"
            />
        </AuthLayout>
    );
}
