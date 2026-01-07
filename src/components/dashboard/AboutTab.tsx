"use client";

import { useState } from "react";

interface AboutTabProps {
    initialData: {
        title: string;
        bio: string;
        description: string;
        githubUrl: string;
        linkedinUrl: string;
    };
}

export function AboutTab({ initialData }: AboutTabProps) {
    const [formData, setFormData] = useState({
        title: initialData.title || "",
        bio: initialData.bio || "",
        description: initialData.description || "",
        githubUrl: initialData.githubUrl || "",
        linkedinUrl: initialData.linkedinUrl || "",
    });
    const [isLoading, setIsLoading] = useState(false);
    const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setMessage(null);

        try {
            const res = await fetch("/api/profile", {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            });

            if (res.ok) {
                setMessage({ type: "success", text: "About section updated successfully!" });
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
                    <h3 className="text-lg font-semibold">Professional Summary</h3>

                    <div>
                        <label className="block text-sm font-medium text-muted-foreground mb-2">
                            Title
                        </label>
                        <input
                            type="text"
                            value={formData.title}
                            onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                            className="w-full px-4 py-3 bg-secondary/50 border border-border/50 rounded-lg focus:border-primary focus:ring-1 focus:ring-primary transition-colors"
                            placeholder="e.g., Full-Stack Developer"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-muted-foreground mb-2">
                            Bio (Short tagline)
                        </label>
                        <input
                            type="text"
                            value={formData.bio}
                            onChange={(e) => setFormData(prev => ({ ...prev, bio: e.target.value }))}
                            className="w-full px-4 py-3 bg-secondary/50 border border-border/50 rounded-lg focus:border-primary focus:ring-1 focus:ring-primary transition-colors"
                            placeholder="e.g., Building things for the web"
                            maxLength={100}
                        />
                        <p className="text-xs text-muted-foreground mt-1">{formData.bio.length}/100 characters</p>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-muted-foreground mb-2">
                            Description
                        </label>
                        <textarea
                            value={formData.description}
                            onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                            className="w-full px-4 py-3 bg-secondary/50 border border-border/50 rounded-lg focus:border-primary focus:ring-1 focus:ring-primary transition-colors resize-none"
                            placeholder="A longer description about yourself and your work..."
                            rows={4}
                            maxLength={500}
                        />
                        <p className="text-xs text-muted-foreground mt-1">{formData.description.length}/500 characters</p>
                    </div>
                </div>

                <div className="bg-secondary/30 border border-border/50 rounded-xl p-6 space-y-4">
                    <h3 className="text-lg font-semibold">Social Links</h3>

                    <div>
                        <label className="block text-sm font-medium text-muted-foreground mb-2">
                            <span className="flex items-center gap-2">
                                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                                </svg>
                                GitHub URL
                            </span>
                        </label>
                        <input
                            type="url"
                            value={formData.githubUrl}
                            onChange={(e) => setFormData(prev => ({ ...prev, githubUrl: e.target.value }))}
                            className="w-full px-4 py-3 bg-secondary/50 border border-border/50 rounded-lg focus:border-primary focus:ring-1 focus:ring-primary transition-colors"
                            placeholder="https://github.com/username"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-muted-foreground mb-2">
                            <span className="flex items-center gap-2">
                                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                                </svg>
                                LinkedIn URL
                            </span>
                        </label>
                        <input
                            type="url"
                            value={formData.linkedinUrl}
                            onChange={(e) => setFormData(prev => ({ ...prev, linkedinUrl: e.target.value }))}
                            className="w-full px-4 py-3 bg-secondary/50 border border-border/50 rounded-lg focus:border-primary focus:ring-1 focus:ring-primary transition-colors"
                            placeholder="https://linkedin.com/in/username"
                        />
                    </div>
                </div>

                <button
                    type="submit"
                    disabled={isLoading}
                    className="px-6 py-2.5 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 transition-colors disabled:opacity-50"
                >
                    {isLoading ? "Saving..." : "Save Changes"}
                </button>
            </form>
        </div>
    );
}
