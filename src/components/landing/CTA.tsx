import Link from "next/link";

export function CTA() {
    return (
        <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-primary/10 via-purple-500/10 to-background">
            <div className="max-w-4xl mx-auto text-center">
                {/* Main CTA */}
                <div className="mb-12">
                    <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6">
                        Ready to Explore
                        <span className="block bg-gradient-to-r from-primary to-purple-500 bg-clip-text text-transparent">
                            Modern Web Development?
                        </span>
                    </h2>
                    <p className="text-xl text-muted-foreground mb-8">
                        Clone the repository, explore the code, and start building your own
                        projects with this modern Next.js stack.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                        <a
                            href="https://github.com/uzer-ab/my-projects-nextjs"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="px-8 py-4 bg-primary text-primary-foreground rounded-lg font-semibold hover:bg-primary/90 transform hover:scale-105 transition-all shadow-lg hover:shadow-xl text-lg inline-flex items-center gap-2"
                        >
                            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 16 16">
                                <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.012 8.012 0 0 0 16 8c0-4.42-3.58-8-8-8z" />
                            </svg>
                            Star on GitHub
                        </a>
                        <Link
                            href="/auth/signup"
                            className="px-8 py-4 bg-background border border-border text-foreground rounded-lg font-semibold hover:bg-secondary transition-colors text-lg"
                        >
                            Try Demo
                        </Link>
                    </div>
                </div>

                {/* Info Badges */}
                <div className="flex flex-wrap justify-center items-center gap-8 pt-8 border-t border-border/50">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                            <path
                                fillRule="evenodd"
                                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                                clipRule="evenodd"
                            />
                        </svg>
                        <span>MIT License</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                            <path
                                fillRule="evenodd"
                                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                                clipRule="evenodd"
                            />
                        </svg>
                        <span>Free \u0026 Open Source</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                            <path
                                fillRule="evenodd"
                                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                                clipRule="evenodd"
                            />
                        </svg>
                        <span>Active Development</span>
                    </div>
                </div>
            </div>
        </section>
    );
}
