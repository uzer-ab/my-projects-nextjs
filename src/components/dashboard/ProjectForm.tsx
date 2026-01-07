"use client";

import { useState } from "react";
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

interface ProjectFormProps {
    initialData?: Project;
    username: string;
}

export function ProjectForm({ initialData, username }: ProjectFormProps) {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);
    const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

    const [formData, setFormData] = useState<Project>(initialData || {
        name: "",
        description: "",
        show: true,
        tools: [],
        links: [],
        images: [],
    });

    const [newTool, setNewTool] = useState({ name: "", type: "", description: "" });
    const [toolError, setToolError] = useState("");
    const [newLink, setNewLink] = useState({ title: "", url: "" });
    const [newImage, setNewImage] = useState({ url: "", alt: "" });

    const handleSave = async () => {
        setIsLoading(true);
        setMessage(null);
        try {
            const method = formData.id ? "PUT" : "POST";
            const res = await fetch("/api/projects", {
                method,
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ ...formData, username }),
            });

            if (res.ok) {
                setMessage({ type: "success", text: `Project ${formData.id ? "updated" : "created"} successfully!` });
                // Redirect back to dashboard after short delay
                setTimeout(() => {
                    router.push(`/${username}/dashboard`);
                    router.refresh();
                }, 1000);
            } else {
                const data = await res.json();
                setMessage({ type: "error", text: data.error || "Failed to save project" });
                setIsLoading(false);
            }
        } catch {
            setMessage({ type: "error", text: "An error occurred" });
            setIsLoading(false);
        }
    };

    const addTool = () => {
        if (!newTool.type) {
            setToolError("Please select a tool type first");
            return;
        }
        if (!newTool.name.trim()) {
            setToolError("Please enter a tool name");
            return;
        }
        setToolError("");
        setFormData(prev => ({ ...prev, tools: [...prev.tools, newTool] }));
        setNewTool({ name: "", type: "", description: "" });
    };

    const removeTool = (index: number) => {
        setFormData(prev => ({ ...prev, tools: prev.tools.filter((_, i) => i !== index) }));
    };

    const addLink = () => {
        if (newLink.title && newLink.url) {
            setFormData(prev => ({ ...prev, links: [...prev.links, newLink] }));
            setNewLink({ title: "", url: "" });
        }
    };

    const removeLink = (index: number) => {
        setFormData(prev => ({ ...prev, links: prev.links.filter((_, i) => i !== index) }));
    };

    const addImage = () => {
        if (newImage.url) {
            setFormData(prev => ({ ...prev, images: [...prev.images, newImage] }));
            setNewImage({ url: "", alt: "" });
        }
    };

    const removeImage = (index: number) => {
        setFormData(prev => ({ ...prev, images: prev.images.filter((_, i) => i !== index) }));
    };

    return (
        <div className="max-w-3xl mx-auto p-6">
            <div className="flex items-center justify-between mb-8">
                <div>
                    <h1 className="text-3xl font-bold mb-2">
                        {formData.id ? "Edit Project" : "New Project"}
                    </h1>
                    <p className="text-muted-foreground">
                        {formData.id ? "Update your project details" : "Add a new project to your portfolio"}
                    </p>
                </div>
                <button
                    onClick={() => router.back()}
                    className="px-4 py-2 bg-secondary border border-border/50 rounded-lg hover:bg-secondary/80 transition-colors"
                >
                    Cancel
                </button>
            </div>

            {message && (
                <div className={`mb-6 p-4 rounded-lg ${message.type === "success" ? "bg-green-500/10 text-green-400 border border-green-500/20" : "bg-red-500/10 text-red-400 border border-red-500/20"}`}>
                    {message.text}
                </div>
            )}

            <div className="bg-secondary/30 border border-border/50 rounded-xl p-6 space-y-8">
                {/* Basic Info */}
                <div className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-muted-foreground mb-2">Project Name *</label>
                        <input
                            type="text"
                            value={formData.name}
                            onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                            className="w-full px-4 py-3 bg-secondary/50 border border-border/50 rounded-lg focus:border-primary focus:ring-1 focus:ring-primary transition-colors"
                            placeholder="My Awesome Project"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-muted-foreground mb-2">Description *</label>
                        <textarea
                            value={formData.description}
                            onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                            className="w-full px-4 py-3 bg-secondary/50 border border-border/50 rounded-lg focus:border-primary focus:ring-1 focus:ring-primary transition-colors resize-none"
                            rows={4}
                            placeholder="Describe your project..."
                        />
                    </div>

                    <label className="flex items-center gap-2 cursor-pointer">
                        <input
                            type="checkbox"
                            checked={formData.show}
                            onChange={(e) => setFormData(prev => ({ ...prev, show: e.target.checked }))}
                            className="w-4 h-4 rounded border-border accent-primary"
                        />
                        <span className="text-sm">Show on public profile</span>
                    </label>
                </div>

                {/* Tools */}
                <div className="space-y-3">
                    <label className="block text-sm font-medium text-muted-foreground">Tools Used *</label>
                    <p className="text-xs text-muted-foreground">Select the tool type first, then enter the name</p>
                    {toolError && (
                        <p className="text-xs text-red-400">{toolError}</p>
                    )}
                    <div className="flex flex-wrap gap-2 mb-2">
                        {formData.tools.map((tool, i) => (
                            <span key={i} className="inline-flex items-center gap-1 px-3 py-1 bg-primary/10 text-primary rounded-full text-sm">
                                <span className="text-xs text-muted-foreground">[{tool.type}]</span> {tool.name}
                                <button onClick={() => removeTool(i)} className="hover:text-red-400">×</button>
                            </span>
                        ))}
                    </div>
                    <div className="flex gap-2">
                        <select
                            value={newTool.type}
                            onChange={(e) => {
                                setNewTool(prev => ({ ...prev, type: e.target.value }));
                                setToolError("");
                            }}
                            className={`px-3 py-2 bg-secondary/50 border rounded-lg text-sm ${!newTool.type ? 'border-yellow-500/50 text-muted-foreground' : 'border-border/50'}`}
                        >
                            <option value="">Select type first...</option>
                            <option value="framework">Framework</option>
                            <option value="language">Language</option>
                            <option value="database">Database</option>
                            <option value="tool">Tool</option>
                            <option value="other">Other</option>
                        </select>
                        <input
                            type="text"
                            value={newTool.name}
                            onChange={(e) => setNewTool(prev => ({ ...prev, name: e.target.value }))}
                            onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), addTool())}
                            disabled={!newTool.type}
                            className={`flex-1 px-3 py-2 bg-secondary/50 border border-border/50 rounded-lg text-sm ${!newTool.type ? 'opacity-50 cursor-not-allowed' : ''}`}
                            placeholder={newTool.type ? `Enter ${newTool.type} name...` : "Select type first"}
                        />
                        <button
                            onClick={addTool}
                            disabled={!newTool.type || !newTool.name.trim()}
                            className="px-3 py-2 bg-secondary border border-border/50 rounded-lg hover:bg-secondary/80 disabled:opacity-50 disabled:cursor-not-allowed"
                        >+</button>
                    </div>
                </div>

                {/* Links */}
                <div className="space-y-3">
                    <label className="block text-sm font-medium text-muted-foreground">Project Links</label>
                    {formData.links.map((link, i) => (
                        <div key={i} className="flex items-center gap-2 text-sm">
                            <span className="text-primary">{link.title}:</span>
                            <span className="text-muted-foreground truncate">{link.url}</span>
                            <button onClick={() => removeLink(i)} className="text-red-400 hover:text-red-300">×</button>
                        </div>
                    ))}
                    <div className="flex gap-2">
                        <input
                            type="text"
                            value={newLink.title}
                            onChange={(e) => setNewLink(prev => ({ ...prev, title: e.target.value }))}
                            className="w-24 px-3 py-2 bg-secondary/50 border border-border/50 rounded-lg text-sm"
                            placeholder="Label"
                        />
                        <input
                            type="url"
                            value={newLink.url}
                            onChange={(e) => setNewLink(prev => ({ ...prev, url: e.target.value }))}
                            onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), addLink())}
                            className="flex-1 px-3 py-2 bg-secondary/50 border border-border/50 rounded-lg text-sm"
                            placeholder="https://..."
                        />
                        <button onClick={addLink} className="px-3 py-2 bg-secondary border border-border/50 rounded-lg hover:bg-secondary/80">+</button>
                    </div>
                </div>

                {/* Images */}
                <div className="space-y-3">
                    <label className="block text-sm font-medium text-muted-foreground">Project Images (URLs)</label>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                        {formData.images.map((img, i) => (
                            <div key={i} className="relative group">
                                <img src={img.url} alt={img.alt} className="w-full h-32 object-cover rounded-lg border border-border/50" />
                                <button
                                    onClick={() => removeImage(i)}
                                    className="absolute top-2 right-2 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center text-sm opacity-0 group-hover:opacity-100 transition-opacity shadow-lg"
                                >×</button>
                            </div>
                        ))}
                    </div>
                    <div className="flex gap-2">
                        <input
                            type="url"
                            value={newImage.url}
                            onChange={(e) => setNewImage(prev => ({ ...prev, url: e.target.value }))}
                            onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), addImage())}
                            className="flex-1 px-3 py-2 bg-secondary/50 border border-border/50 rounded-lg text-sm"
                            placeholder="Image URL"
                        />
                        <input
                            type="text"
                            value={newImage.alt}
                            onChange={(e) => setNewImage(prev => ({ ...prev, alt: e.target.value }))}
                            className="w-32 px-3 py-2 bg-secondary/50 border border-border/50 rounded-lg text-sm"
                            placeholder="Alt text"
                        />
                        <button onClick={addImage} className="px-3 py-2 bg-secondary border border-border/50 rounded-lg hover:bg-secondary/80">+</button>
                    </div>
                </div>
            </div>

            <div className="flex justify-end gap-4 mt-8">
                <button
                    onClick={() => router.back()}
                    className="px-6 py-3 bg-secondary border border-border/50 rounded-xl hover:bg-secondary/80 transition-colors"
                >
                    Cancel
                </button>
                <button
                    onClick={handleSave}
                    disabled={isLoading || !formData.name || !formData.description}
                    className="px-6 py-3 bg-primary text-primary-foreground rounded-xl font-medium hover:bg-primary/90 transition-colors disabled:opacity-50 min-w-[140px]"
                >
                    {isLoading ? "Saving..." : "Save Project"}
                </button>
            </div>
        </div>
    );
}
