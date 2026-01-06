export function Benefits() {
    return (
        <section id="benefits" className="py-20 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
                {/* Section Header */}
                <div className="text-center mb-16">
                    <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
                        Why Use{" "}
                        <span className="bg-gradient-to-r from-primary to-purple-500 bg-clip-text text-transparent">
                            This Project
                        </span>
                    </h2>
                    <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                        Learn from a production-ready codebase demonstrating modern Next.js
                        development patterns and best practices.
                    </p>
                </div>

                {/* Benefits Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <div className="p-6 bg-gradient-to-br from-primary/10 to-purple-500/10 rounded-xl border border-primary/20">
                        <h3 className="text-xl font-semibold mb-3">📚 Learning Resource</h3>
                        <p className="text-muted-foreground">
                            Perfect for developers learning Next.js 14, server components, and
                            modern authentication patterns.
                        </p>
                    </div>
                    <div className="p-6 bg-gradient-to-br from-blue-500/10 to-cyan-500/10 rounded-xl border border-blue-500/20">
                        <h3 className="text-xl font-semibold mb-3">🚀 Starter Template</h3>
                        <p className="text-muted-foreground">
                            Use as a foundation for your own projects with authentication,
                            database, and UI already configured.
                        </p>
                    </div>
                    <div className="p-6 bg-gradient-to-br from-green-500/10 to-emerald-500/10 rounded-xl border border-green-500/20">
                        <h3 className="text-xl font-semibold mb-3">🔧 Production Ready</h3>
                        <p className="text-muted-foreground">
                            Follows best practices for security, performance, and code
                            organization suitable for real applications.
                        </p>
                    </div>
                </div>

                {/* Tech Stack Details */}
                <div className="mt-16 p-8 bg-secondary/50 rounded-xl border border-border/50">
                    <h3 className="text-2xl font-bold mb-6 text-center">Tech Stack</h3>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                        <div className="text-center">
                            <div className="text-3xl mb-2">⚡</div>
                            <div className="font-semibold">Next.js 14</div>
                            <div className="text-sm text-muted-foreground">App Router</div>
                        </div>
                        <div className="text-center">
                            <div className="text-3xl mb-2">🔐</div>
                            <div className="font-semibold">NextAuth.js</div>
                            <div className="text-sm text-muted-foreground">Authentication</div>
                        </div>
                        <div className="text-center">
                            <div className="text-3xl mb-2">🗄️</div>
                            <div className="font-semibold">Prisma</div>
                            <div className="text-sm text-muted-foreground">ORM</div>
                        </div>
                        <div className="text-center">
                            <div className="text-3xl mb-2">🎨</div>
                            <div className="font-semibold">TypeScript</div>
                            <div className="text-sm text-muted-foreground">Type Safety</div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
