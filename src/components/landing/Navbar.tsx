"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { logout } from "@/lib/actions/auth";

interface NavbarProps {
    isAuthenticated: boolean;
    username?: string;
}

export function Navbar({ isAuthenticated, username }: NavbarProps) {
    const pathname = usePathname();

    const dashboardPath = username ? `/${username}/dashboard` : "/dashboard";

    return (
        <nav className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md bg-background/80 border-b border-border/50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                    {/* Logo */}
                    <Link href="/" className="flex items-center space-x-2">
                        <div className="w-8 h-8 bg-gradient-to-br from-primary to-primary/60 rounded-lg flex items-center justify-center">
                            <span className="text-white font-bold text-xl">P</span>
                        </div>
                        <span className="font-bold text-xl bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
                            ProjectHub
                        </span>
                    </Link>

                    {/* Navigation Links */}
                    <div className="hidden md:flex items-center space-x-8">
                        <Link
                            href="/#features"
                            className="text-muted-foreground hover:text-foreground transition-colors"
                        >
                            Features
                        </Link>
                        <Link
                            href="/#benefits"
                            className="text-muted-foreground hover:text-foreground transition-colors"
                        >
                            Benefits
                        </Link>
                        <Link
                            href="https://github.com/uzer-ab/my-projects-nextjs"
                            target="_blank"
                            className="text-muted-foreground hover:text-foreground transition-colors"
                        >
                            GitHub
                        </Link>
                    </div>

                    {/* Auth Buttons */}
                    <div className="flex items-center space-x-4">
                        {isAuthenticated ? (
                            <>
                                <Link
                                    href={dashboardPath}
                                    className="px-4 py-2 text-sm font-medium text-foreground hover:text-primary transition-colors"
                                >
                                    Dashboard
                                </Link>
                                <form action={logout}>
                                    <button
                                        type="submit"
                                        className="px-4 py-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
                                    >
                                        Logout
                                    </button>
                                </form>
                            </>
                        ) : (
                            <>
                                <Link
                                    href="/auth/login"
                                    className="px-4 py-2 text-sm font-medium text-foreground hover:text-primary transition-colors"
                                >
                                    Login
                                </Link>
                                <Link
                                    href="/auth/signup"
                                    className="px-4 py-2 text-sm font-medium bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
                                >
                                    Sign Up
                                </Link>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </nav>
    );
}
