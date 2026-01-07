"use client";

import { useState } from "react";
import Link from "next/link";
import { signOut } from "next-auth/react";

type Props = {
    username: string;
    isOwner: boolean;
};

export function PortfolioControls({ username, isOwner }: Props) {
    const [isOpen, setIsOpen] = useState(false);

    if (!isOwner) {
        return (
            <Link
                href="/"
                className="fixed bottom-4 right-4 z-50 flex items-center gap-1.5 px-4 py-2.5 rounded-full bg-background/80 backdrop-blur-md border border-border shadow-lg hover:bg-primary hover:text-primary-foreground transition-all duration-300 group animate-fade-up"
            >
                <div className="flex flex-col items-start leading-none gap-1">
                    <span className="text-s font-bold font-space-grotesk">CodeFolio</span>
                    <span className="text-[12px] text-muted-foreground group-hover:text-primary-foreground/80 font-mono tracking-tight">By Uzair</span>
                </div>
            </Link>
        );
    }

    return (
        <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-2">
            {isOpen && (
                <div className="flex flex-col gap-2 animate-fade-up">
                    <Link
                        href={`/${username}/dashboard`}
                        className="flex items-center gap-2 px-4 py-2 rounded-full bg-background/80 backdrop-blur-md border border-border shadow-lg hover:bg-muted transition-colors text-sm font-medium"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-layout-dashboard">
                            <rect width="7" height="9" x="3" y="3" rx="1" /><rect width="7" height="5" x="14" y="3" rx="1" /><rect width="7" height="9" x="14" y="12" rx="1" /><rect width="7" height="5" x="3" y="16" rx="1" />
                        </svg>
                        Dashboard
                    </Link>
                    <button
                        onClick={() => signOut({ callbackUrl: "/" })}
                        className="flex items-center gap-2 px-4 py-2 rounded-full bg-destructive/10 backdrop-blur-md border border-destructive/20 shadow-lg hover:bg-destructive/20 text-destructive transition-colors text-sm font-medium"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-log-out">
                            <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" /><polyline points="16 17 21 12 16 7" /><line x1="21" x2="9" y1="12" y2="12" />
                        </svg>
                        Sign Out
                    </button>
                </div>
            )}
            <button
                onClick={() => setIsOpen(!isOpen)}
                className={`p-3 rounded-full shadow-xl transition-all duration-300 ${isOpen ? 'bg-primary text-primary-foreground rotate-90' : 'bg-background/80 backdrop-blur-md border border-border hover:bg-muted'}`}
                aria-label="Admin Controls"
            >
                {isOpen ? (
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-x"><path d="M18 6 6 18" /><path d="6 6 18 18" /></svg>
                ) : (
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-settings">
                        <path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.09a2 2 0 0 1-1-1.74v-.47a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z" />
                        <circle cx="12" cy="12" r="3" />
                    </svg>
                )}
            </button>
        </div>
    );
}
