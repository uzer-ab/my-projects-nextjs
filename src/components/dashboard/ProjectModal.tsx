"use client";

import { useState } from "react";

interface Project {
    id?: number;
    name: string;
    description: string;
    show: boolean;
    tools: { name: string; type: string; description: string }[];
    links: { title: string; url: string }[];
    images: { url: string; alt: string }[];
}

interface ProjectModalProps {
    project: Project;
    onSave: (project: Project) => void;
    onClose: () => void;
}

export function ProjectModal({ project, onSave, onClose }: ProjectModalProps) {
    const [formData, setFormData] = useState<Project>(project);
    const [newTool, setNewTool] = useState({ name: "", type: "", description: "" });
    const [toolError, setToolError] = useState("");
    const [newLink, setNewLink] = useState({ title: "", url: "" });
    const [newImage, setNewImage] = useState({ url: "", alt: "" });

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
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 overflow-y-auto">
            {/* 
               Simplified Layout: 
               - Single scrollable container if content is too tall
               - No internal scrolling 
               - Header/Footer scroll with content
               - margin-auto to center vertically if content is short
            */}
            {/* <div className="relative w-full max-w-2xl bg-background border border-border rounded-2xl shadow-xl my-auto"> */}
            <div className="relative w-full bg-background border border-border rounded-2xl shadow-xl my-auto">
                <div className="flex flex-col">
                    {/* Header */}
                    <div className="flex items-center justify-between p-6 border-b border-border">
                        <h3 className="text-xl font-semibold">
                            {project.id ? "Edit Project" : "New Project"}
                        </h3>
                        <button onClick={onClose} className="p-2 hover:bg-secondary rounded-lg transition-colors">
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M18 6 6 18" /><path d="m6 6 12 12" />
                            </svg>
                        </button>
                    </div>

                    {/* Content */}
                    <div className="p-6 space-y-6">
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
                                    rows={3}
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
                            <div className="flex flex-wrap gap-2">
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
                            <div className="grid grid-cols-3 gap-2">
                                {formData.images.map((img, i) => (
                                    <div key={i} className="relative group">
                                        <img src={img.url} alt={img.alt} className="w-full h-20 object-cover rounded-lg border border-border/50" />
                                        <button
                                            onClick={() => removeImage(i)}
                                            className="absolute top-1 right-1 w-5 h-5 bg-red-500 text-white rounded-full text-xs opacity-0 group-hover:opacity-100 transition-opacity"
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

                    {/* Footer */}
                    <div className="p-6 border-t border-border flex justify-end gap-3">
                        <button
                            onClick={onClose}
                            className="px-4 py-2 bg-secondary border border-border/50 rounded-lg hover:bg-secondary/80 transition-colors"
                        >
                            Cancel
                        </button>
                        <button
                            onClick={() => onSave(formData)}
                            disabled={!formData.name || !formData.description}
                            className="px-4 py-2 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 transition-colors disabled:opacity-50"
                        >
                            {project.id ? "Update Project" : "Create Project"}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
