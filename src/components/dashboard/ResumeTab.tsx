"use client";

import { useState, useRef } from "react";

interface ResumeTabProps {
    initialData: {
        resumeUrl: string | null;
    };
}

export function ResumeTab({ initialData }: ResumeTabProps) {
    const [resumeUrl, setResumeUrl] = useState(initialData.resumeUrl || "");
    const [isLoading, setIsLoading] = useState(false);
    const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [dragActive, setDragActive] = useState(false);

    const handleFileUpload = async (file: File) => {
        if (file.type !== "application/pdf") {
            setMessage({ type: "error", text: "Only PDF files are allowed" });
            return;
        }

        if (file.size > 5 * 1024 * 1024) {
            setMessage({ type: "error", text: "File size must be less than 5MB" });
            return;
        }

        setIsLoading(true);
        setMessage(null);

        const formData = new FormData();
        formData.append("resume", file);

        try {
            const res = await fetch("/api/profile/resume", {
                method: "POST",
                body: formData,
            });

            if (res.ok) {
                const data = await res.json();
                setResumeUrl(data.resumeUrl);
                setMessage({ type: "success", text: "Resume uploaded successfully!" });
            } else {
                const data = await res.json();
                setMessage({ type: "error", text: data.error || "Failed to upload" });
            }
        } catch {
            setMessage({ type: "error", text: "An error occurred" });
        } finally {
            setIsLoading(false);
        }
    };

    const handleDelete = async () => {
        if (!confirm("Are you sure you want to remove your resume?")) return;

        setIsLoading(true);
        try {
            const res = await fetch("/api/profile/resume", { method: "DELETE" });
            if (res.ok) {
                setResumeUrl("");
                setMessage({ type: "success", text: "Resume removed" });
            }
        } catch {
            setMessage({ type: "error", text: "Failed to remove resume" });
        } finally {
            setIsLoading(false);
        }
    };

    const handleDrag = (e: React.DragEvent) => {
        e.preventDefault();
        e.stopPropagation();
        if (e.type === "dragenter" || e.type === "dragover") {
            setDragActive(true);
        } else if (e.type === "dragleave") {
            setDragActive(false);
        }
    };

    const handleDrop = (e: React.DragEvent) => {
        e.preventDefault();
        e.stopPropagation();
        setDragActive(false);

        if (e.dataTransfer.files && e.dataTransfer.files[0]) {
            handleFileUpload(e.dataTransfer.files[0]);
        }
    };

    const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            handleFileUpload(e.target.files[0]);
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

            <div className="space-y-6">
                <div className="bg-secondary/30 border border-border/50 rounded-xl p-6 space-y-4">
                    <h3 className="text-lg font-semibold">Upload Resume / CV</h3>
                    <p className="text-sm text-muted-foreground">
                        Upload your resume as a PDF file. This will be available as a download button on your public profile.
                    </p>

                    {/* Upload Area */}
                    <div
                        onDragEnter={handleDrag}
                        onDragLeave={handleDrag}
                        onDragOver={handleDrag}
                        onDrop={handleDrop}
                        onClick={() => fileInputRef.current?.click()}
                        className={`
                            relative border-2 border-dashed rounded-xl p-8 text-center cursor-pointer transition-all
                            ${dragActive
                                ? "border-primary bg-primary/5"
                                : "border-border/50 hover:border-primary/50 hover:bg-secondary/50"
                            }
                            ${isLoading ? "opacity-50 pointer-events-none" : ""}
                        `}
                    >
                        <input
                            ref={fileInputRef}
                            type="file"
                            accept=".pdf,application/pdf"
                            onChange={handleFileSelect}
                            className="hidden"
                        />

                        <div className="flex flex-col items-center gap-3">
                            <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center">
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary">
                                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                                    <polyline points="17 8 12 3 7 8" />
                                    <line x1="12" x2="12" y1="3" y2="15" />
                                </svg>
                            </div>
                            <div>
                                <p className="font-medium">
                                    {isLoading ? "Uploading..." : "Drop your PDF here or click to browse"}
                                </p>
                                <p className="text-xs text-muted-foreground mt-1">PDF files only, max 5MB</p>
                            </div>
                        </div>
                    </div>

                    {/* Current Resume */}
                    {resumeUrl && (
                        <div className="p-4 bg-secondary/50 rounded-lg border border-border/50">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary">
                                            <path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z" />
                                            <path d="M14 2v4a2 2 0 0 0 2 2h4" />
                                            <path d="M10 9H8" />
                                            <path d="M16 13H8" />
                                            <path d="M16 17H8" />
                                        </svg>
                                    </div>
                                    <div>
                                        <p className="font-medium text-sm">Current Resume</p>
                                        <p className="text-xs text-muted-foreground">{resumeUrl.split('/').pop()}</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-2">
                                    <a
                                        href={resumeUrl}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-primary hover:underline text-sm"
                                    >
                                        Preview
                                    </a>
                                    <button
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            handleDelete();
                                        }}
                                        className="text-red-400 hover:text-red-300 text-sm"
                                    >
                                        Remove
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}
                </div>

                <div className="bg-secondary/30 border border-border/50 rounded-xl p-6 space-y-4">
                    <h3 className="text-lg font-semibold flex items-center gap-2">
                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-blue-400">
                            <circle cx="12" cy="12" r="10" />
                            <path d="M12 16v-4" />
                            <path d="M12 8h.01" />
                        </svg>
                        Resume Tips
                    </h3>
                    <ul className="text-sm text-muted-foreground space-y-2">
                        <li className="flex items-start gap-2">
                            <span className="text-primary">•</span>
                            <span>Keep your resume to 1-2 pages for best readability</span>
                        </li>
                        <li className="flex items-start gap-2">
                            <span className="text-primary">•</span>
                            <span>Use a clean, professional format</span>
                        </li>
                        <li className="flex items-start gap-2">
                            <span className="text-primary">•</span>
                            <span>Include relevant projects and technologies</span>
                        </li>
                        <li className="flex items-start gap-2">
                            <span className="text-primary">•</span>
                            <span>Update regularly to reflect your latest experience</span>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );
}
