import Link from "next/link";

type AuthLayoutProps = {
    children: React.ReactNode;
    icon: React.ReactNode;
    title: string;
    subtitle: string;
};

export function AuthLayout({ children, icon, title, subtitle }: AuthLayoutProps) {
    return (
        <div className="min-h-screen relative flex items-center justify-center px-4 py-12">
            {/* Background */}
            <div
                className="absolute inset-0 opacity-50"
                style={{ background: "var(--gradient-hero)" }}
            />
            <div
                className="absolute inset-0 opacity-5"
                style={{
                    backgroundImage: `linear-gradient(hsl(var(--primary)) 1px, transparent 1px),
                            linear-gradient(90deg, hsl(var(--primary)) 1px, transparent 1px)`,
                    backgroundSize: '50px 50px'
                }}
            />

            {/* Card */}
            <div className="relative w-full max-w-md animate-fade-up">
                <div className="card-glass rounded-xl border border-border/50 p-8 space-y-6">
                    {/* Header */}
                    <div className="text-center space-y-2">
                        <div className="inline-flex items-center justify-center w-14 h-14 rounded-xl bg-secondary/50 border border-border/50 glow mb-4">
                            {icon}
                        </div>
                        <h1 className="text-2xl md:text-3xl font-bold text-gradient">
                            {title}
                        </h1>
                        <p className="text-muted-foreground">
                            {subtitle}
                        </p>
                    </div>

                    {children}
                </div>

                {/* Back to home */}
                <div className="mt-6 text-center">
                    <Link
                        href="/"
                        className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors"
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="16"
                            height="16"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        >
                            <path d="m12 19-7-7 7-7" />
                            <path d="M19 12H5" />
                        </svg>
                        Back to home
                    </Link>
                </div>
            </div>
        </div>
    );
}
