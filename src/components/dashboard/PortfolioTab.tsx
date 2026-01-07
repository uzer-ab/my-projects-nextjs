"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

interface Project {
    id?: number;
    name: string;
    description: string;
    show: boolean;
    tools: { name: string; type: string; description: string }[];
    links: { title: string; url: string }[];
    images: { url: string; alt: string }[];
}

// src/components/dashboard/PortfolioTab.tsx

interface PortfolioTabProps {
    username: string;
}

export function PortfolioTab({ username }: PortfolioTabProps) {
    const router = useRouter();
    const [projects, setProjects] = useState<Project[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

    useEffect(() => {
        fetchProjects();
    }, []);

    const fetchProjects = async () => {
        try {
            const res = await fetch(`/api/projects?username=${username}`);
            if (res.ok) {
                const data = await res.json();
                setProjects(data);
            }
        } catch (error) {
            console.error("Failed to fetch projects:", error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleDelete = async (id: number) => {
        if (!confirm("Are you sure you want to delete this project?")) return;

        try {
            const res = await fetch(`/api/projects?id=${id}`, { method: "DELETE" });
            if (res.ok) {
                setMessage({ type: "success", text: "Project deleted successfully!" });
                fetchProjects();
            }
        } catch {
            setMessage({ type: "error", text: "Failed to delete project" });
        }
    };

    return (
        <div className="space-y-6">
            {message && (
                <div className={`p-4 rounded-lg ${message.type === "success" ? "bg-green-500/10 text-green-400 border border-green-500/20" : "bg-red-500/10 text-red-400 border border-red-500/20"}`}>
                    {message.text}
                </div>
            )}

            <div className="flex justify-between items-center">
                <h3 className="text-lg font-semibold">Your Portfolio ({projects.length})</h3>
                <button
                    onClick={() => router.push(`/${username}/dashboard/portfolio/new`)}
                    className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 transition-colors"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M5 12h14" /><path d="M12 5v14" />
                    </svg>
                    Add Project
                </button>
            </div>

            {projects.length === 0 ? (
                <div className="text-center py-12 bg-secondary/30 border border-border/50 rounded-xl">
                    <p className="text-muted-foreground mb-4">No projects yet. Start by adding your first project!</p>
                    <button
                        onClick={() => router.push(`/${username}/dashboard/portfolio/new`)}
                        className="px-4 py-2 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 transition-colors"
                    >
                        Create First Project
                    </button>
                </div>
            ) : (
                <div className="grid gap-4">
                    {projects.map((project) => (
                        <div
                            key={project.id}
                            className="bg-secondary/30 border border-border/50 rounded-lg p-4 hover:border-primary/30 transition-colors"
                        >
                            <div className="flex justify-between items-start gap-4">
                                <div className="flex-1">
                                    <div className="flex items-center gap-2 mb-2">
                                        <h4 className="font-semibold text-lg">{project.name}</h4>
                                        {!project.show && (
                                            <span className="text-xs px-2 py-0.5 bg-yellow-500/10 text-yellow-400 rounded">Hidden</span>
                                        )}
                                    </div>
                                    <p className="text-muted-foreground text-sm line-clamp-2">{project.description}</p>

                                    {project.tools && project.tools.length > 0 && (
                                        <div className="flex flex-wrap gap-1.5 mt-3">
                                            {project.tools.map((tool, i) => (
                                                <span key={i} className="text-xs px-2 py-1 bg-primary/10 text-primary rounded-full">
                                                    {tool.name}
                                                </span>
                                            ))}
                                        </div>
                                    )}
                                </div>
                                <div className="flex gap-2">
                                    <button
                                        onClick={() => router.push(`/${username}/dashboard/portfolio/${project.id}/edit`)}
                                        className="p-2 text-muted-foreground hover:text-foreground transition-colors"
                                        title="Edit"
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                            <path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z" />
                                        </svg>
                                    </button>
                                    <button
                                        onClick={() => project.id && handleDelete(project.id)}
                                        className="p-2 text-muted-foreground hover:text-red-400 transition-colors"
                                        title="Delete"
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                            <path d="M3 6h18" /><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" /><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
                                        </svg>
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
