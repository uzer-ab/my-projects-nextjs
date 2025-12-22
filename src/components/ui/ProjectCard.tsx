import type { ProjectType } from "@/data/projects/types"

type ProjectProps = {
    project: ProjectType
}

export function Project(props: ProjectProps) {
    const { project } = props;
    const { links, tools } = project

    return (
        <div className="animate-fade-up" style={{ animationDelay: '0ms' }}>
            <article className="group relative card-glass card-glass-hover rounded-xl border border-border/50 overflow-hidden transition-all duration-500 hover:border-primary/30 hover:-translate-y-1" style={{ animationDelay: '0ms' }}>
                <div className="relative h-48 overflow-hidden">
                    <img
                        src="https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&h=400&fit=crop"
                        alt="E-Commerce Platform"
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-linear-to-t from-card to-transparent"></div>
                </div>
                <div className="p-6 space-y-4">
                    <div className="flex items-start justify-between gap-4">
                        <div className="flex items-center gap-3">
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
                                className="lucide lucide-folder h-5 w-5 text-primary flex-shrink-0"
                            >
                                <path d="M20 20a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.9a2 2 0 0 1-1.69-.9L9.6 3.9A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13a2 2 0 0 0 2 2Z" />
                            </svg>
                            <h3 className="text-xl font-semibold text-foreground group-hover:text-primary transition-colors duration-300">
                                {project.name}
                            </h3>
                        </div>
                        <div className="flex items-center gap-2">
                            <a
                                href="https://github.com/username/ecommerce"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-muted-foreground hover:text-primary transition-colors duration-200"
                                aria-label="View Source"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-github h-5 w-5">
                                    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
                                    <path d="M9 18c-4.51 2-5-2-7-2" />
                                </svg>
                            </a>
                            <a
                                href="https://ecommerce-demo.com"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-muted-foreground hover:text-primary transition-colors duration-200"
                                aria-label="Live Demo"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-external-link h-5 w-5">
                                    <path d="M15 3h6v6" />
                                    <path d="M10 14 21 3" />
                                    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                                </svg>
                            </a>
                        </div>
                    </div>
                    <p className="text-muted-foreground text-sm leading-relaxed">
                        {project.description}
                    </p>
                    <div className="flex flex-wrap gap-2 pt-2">
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-mono bg-secondary/50 text-primary border border-border/30 hover:bg-primary/10 transition-colors duration-200">React</span>
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-mono bg-secondary/50 text-primary border border-border/30 hover:bg-primary/10 transition-colors duration-200">Node.js</span>
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-mono bg-secondary/50 text-primary border border-border/30 hover:bg-primary/10 transition-colors duration-200">PostgreSQL</span>
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-mono bg-secondary/50 text-primary border border-border/30 hover:bg-primary/10 transition-colors duration-200">Stripe</span>
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-mono bg-secondary/50 text-primary border border-border/30 hover:bg-primary/10 transition-colors duration-200">Tailwind CSS</span>
                    </div>
                </div>
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
                    <div className="absolute inset-0 bg-linear-to-r from-primary/5 via-transparent to-primary/5"></div>
                </div>
            </article>
        </div>
    )
}