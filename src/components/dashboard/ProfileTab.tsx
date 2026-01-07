"use client";

import { useState } from "react";

interface ProfileTabProps {
    initialData: {
        name: string;
        username: string;
    };
}

export function ProfileTab({ initialData }: ProfileTabProps) {
    const [formData, setFormData] = useState({
        name: initialData.name || "",
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
    });
    const [isLoading, setIsLoading] = useState(false);
    const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

    const handleProfileSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setMessage(null);

        try {
            const res = await fetch("/api/profile", {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ name: formData.name }),
            });

            if (res.ok) {
                setMessage({ type: "success", text: "Profile updated successfully!" });
            } else {
                const data = await res.json();
                setMessage({ type: "error", text: data.error || "Failed to update profile" });
            }
        } catch {
            setMessage({ type: "error", text: "An error occurred" });
        } finally {
            setIsLoading(false);
        }
    };

    const handlePasswordSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (formData.newPassword !== formData.confirmPassword) {
            setMessage({ type: "error", text: "New passwords don't match" });
            return;
        }

        setIsLoading(true);
        setMessage(null);

        try {
            const res = await fetch("/api/profile/password", {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    currentPassword: formData.currentPassword,
                    newPassword: formData.newPassword,
                }),
            });

            if (res.ok) {
                setMessage({ type: "success", text: "Password changed successfully!" });
                setFormData(prev => ({ ...prev, currentPassword: "", newPassword: "", confirmPassword: "" }));
            } else {
                const data = await res.json();
                setMessage({ type: "error", text: data.error || "Failed to change password" });
            }
        } catch {
            setMessage({ type: "error", text: "An error occurred" });
        } finally {
            setIsLoading(false);
        }
    };

    return (
        // <div className="space-y-8 max-w-2xl">
        <div className="space-y-8">
            {message && (
                <div className={`p-4 rounded-lg ${message.type === "success" ? "bg-green-500/10 text-green-400 border border-green-500/20" : "bg-red-500/10 text-red-400 border border-red-500/20"}`}>
                    {message.text}
                </div>
            )}

            {/* Profile Section */}
            <div className="bg-secondary/30 border border-border/50 rounded-xl p-6">
                <h3 className="text-lg font-semibold mb-4">Profile Information</h3>
                <form onSubmit={handleProfileSubmit} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-muted-foreground mb-2">
                            Username
                        </label>
                        <input
                            type="text"
                            value={initialData.username}
                            disabled
                            className="w-full px-4 py-3 bg-secondary/50 border border-border/50 rounded-lg text-muted-foreground cursor-not-allowed"
                        />
                        <p className="text-xs text-muted-foreground mt-1">Username cannot be changed</p>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-muted-foreground mb-2">
                            Display Name
                        </label>
                        <input
                            type="text"
                            value={formData.name}
                            onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                            className="w-full px-4 py-3 bg-secondary/50 border border-border/50 rounded-lg focus:border-primary focus:ring-1 focus:ring-primary transition-colors"
                            placeholder="Your display name"
                        />
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

            {/* Password Section */}
            <div className="bg-secondary/30 border border-border/50 rounded-xl p-6">
                <h3 className="text-lg font-semibold mb-4">Change Password</h3>
                <form onSubmit={handlePasswordSubmit} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-muted-foreground mb-2">
                            Current Password
                        </label>
                        <input
                            type="password"
                            value={formData.currentPassword}
                            onChange={(e) => setFormData(prev => ({ ...prev, currentPassword: e.target.value }))}
                            className="w-full px-4 py-3 bg-secondary/50 border border-border/50 rounded-lg focus:border-primary focus:ring-1 focus:ring-primary transition-colors"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-muted-foreground mb-2">
                            New Password
                        </label>
                        <input
                            type="password"
                            value={formData.newPassword}
                            onChange={(e) => setFormData(prev => ({ ...prev, newPassword: e.target.value }))}
                            className="w-full px-4 py-3 bg-secondary/50 border border-border/50 rounded-lg focus:border-primary focus:ring-1 focus:ring-primary transition-colors"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-muted-foreground mb-2">
                            Confirm New Password
                        </label>
                        <input
                            type="password"
                            value={formData.confirmPassword}
                            onChange={(e) => setFormData(prev => ({ ...prev, confirmPassword: e.target.value }))}
                            className="w-full px-4 py-3 bg-secondary/50 border border-border/50 rounded-lg focus:border-primary focus:ring-1 focus:ring-primary transition-colors"
                        />
                    </div>
                    <button
                        type="submit"
                        disabled={isLoading || !formData.currentPassword || !formData.newPassword}
                        className="px-6 py-2.5 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 transition-colors disabled:opacity-50"
                    >
                        {isLoading ? "Changing..." : "Change Password"}
                    </button>
                </form>
            </div>
        </div>
    );
}
