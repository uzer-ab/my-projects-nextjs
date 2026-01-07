"use client";

import { useState } from "react";

interface TechStackTabProps {
    initialData: string[];
}

const SUGGESTED_TECH = [
    "React", "Next.js", "TypeScript", "JavaScript", "Node.js", "Python",
    "PostgreSQL", "MongoDB", "Redis", "Docker", "AWS", "Vercel",
    "Tailwind CSS", "Prisma", "GraphQL", "REST API", "Git", "Linux"
];

export function TechStackTab({ initialData }: TechStackTabProps) {
    const [techStack, setTechStack] = useState<string[]>(initialData || []);
    const [newTech, setNewTech] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

    const addTech = (tech: string) => {
        if (tech.trim() && !techStack.includes(tech.trim())) {
            setTechStack(prev => [...prev, tech.trim()]);
            setNewTech("");
        }
    };

    const removeTech = (tech: string) => {
        setTechStack(prev => prev.filter(t => t !== tech));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setMessage(null);

        try {
            const res = await fetch("/api/profile/tech-stack", {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ techStack }),
            });

            if (res.ok) {
                setMessage({ type: "success", text: "Tech stack updated successfully!" });
            } else {
                const data = await res.json();
                setMessage({ type: "error", text: data.error || "Failed to update" });
            }
        } catch {
            setMessage({ type: "error", text: "An error occurred" });
        } finally {
            setIsLoading(false);
        }
    };

    const suggestedToShow = SUGGESTED_TECH.filter(t => !techStack.includes(t));

    return (
        // <div className="max-w-2xl">
        <div className="">
            {message && (
                <div className={`mb-6 p-4 rounded-lg ${message.type === "success" ? "bg-green-500/10 text-green-400 border border-green-500/20" : "bg-red-500/10 text-red-400 border border-red-500/20"}`}>
                    {message.text}
                </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
                <div className="bg-secondary/30 border border-border/50 rounded-xl p-6 space-y-4">
                    <h3 className="text-lg font-semibold">Your Tech Stack</h3>
                    <p className="text-sm text-muted-foreground">
                        Add the technologies and tools you work with. These will be displayed on your profile.
                    </p>

                    {/* Current Tech Stack */}
                    <div className="flex flex-wrap gap-2 min-h-[50px] p-4 bg-secondary/50 rounded-lg border border-border/50">
                        {techStack.length === 0 ? (
                            <span className="text-muted-foreground text-sm">No technologies added yet</span>
                        ) : (
                            techStack.map((tech) => (
                                <span
                                    key={tech}
                                    className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-primary/20 text-primary border border-primary/30 rounded-full text-sm font-medium group"
                                >
                                    {tech}
                                    <button
                                        type="button"
                                        onClick={() => removeTech(tech)}
                                        className="hover:text-red-400 transition-colors"
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                            <path d="M18 6 6 18" /><path d="m6 6 12 12" />
                                        </svg>
                                    </button>
                                </span>
                            ))
                        )}
                    </div>

                    {/* Add Custom */}
                    <div className="flex gap-2">
                        <input
                            type="text"
                            value={newTech}
                            onChange={(e) => setNewTech(e.target.value)}
                            onKeyDown={(e) => {
                                if (e.key === "Enter") {
                                    e.preventDefault();
                                    addTech(newTech);
                                }
                            }}
                            className="flex-1 px-4 py-3 bg-secondary/50 border border-border/50 rounded-lg focus:border-primary focus:ring-1 focus:ring-primary transition-colors"
                            placeholder="Add a technology..."
                        />
                        <button
                            type="button"
                            onClick={() => addTech(newTech)}
                            className="px-4 py-3 bg-secondary border border-border/50 rounded-lg hover:bg-secondary/80 transition-colors"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M5 12h14" /><path d="M12 5v14" />
                            </svg>
                        </button>
                    </div>
                </div>

                {/* Suggestions */}
                {suggestedToShow.length > 0 && (
                    <div className="bg-secondary/30 border border-border/50 rounded-xl p-6 space-y-4">
                        <h3 className="text-lg font-semibold">Quick Add</h3>
                        <div className="flex flex-wrap gap-2">
                            {suggestedToShow.map((tech) => (
                                <button
                                    key={tech}
                                    type="button"
                                    onClick={() => addTech(tech)}
                                    className="px-3 py-1.5 bg-secondary/50 border border-border/50 rounded-full text-sm text-muted-foreground hover:text-foreground hover:border-primary/50 transition-colors"
                                >
                                    + {tech}
                                </button>
                            ))}
                        </div>
                    </div>
                )}

                <button
                    type="submit"
                    disabled={isLoading}
                    className="px-6 py-2.5 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 transition-colors disabled:opacity-50"
                >
                    {isLoading ? "Saving..." : "Save Tech Stack"}
                </button>
            </form>
        </div>
    );
}
