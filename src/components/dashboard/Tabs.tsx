"use client";

import { useState, ReactNode } from "react";

interface Tab {
    id: string;
    label: string;
    icon: ReactNode;
}

interface DashboardTabsProps {
    tabs: Tab[];
    children: ReactNode[];
    defaultTab?: string;
}

export function DashboardTabs({ tabs, children, defaultTab }: DashboardTabsProps) {
    const [activeTab, setActiveTab] = useState(defaultTab || tabs[0]?.id);

    return (
        <div className="w-full">
            {/* Tab Navigation */}
            <div className="flex flex-wrap gap-2 border-b border-border/50 pb-4 mb-8">
                {tabs.map((tab) => (
                    <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id)}
                        className={`
                            flex items-center gap-2 px-4 py-2.5 rounded-lg font-medium transition-all duration-200
                            ${activeTab === tab.id
                                ? "bg-primary text-primary-foreground shadow-lg shadow-primary/25"
                                : "bg-secondary/50 text-muted-foreground hover:bg-secondary hover:text-foreground"
                            }
                        `}
                    >
                        {tab.icon}
                        <span>{tab.label}</span>
                    </button>
                ))}
            </div>

            {/* Tab Content */}
            <div className="animate-fade-up">
                {children.map((child, index) => (
                    <div
                        key={tabs[index]?.id}
                        className={activeTab === tabs[index]?.id ? "block" : "hidden"}
                    >
                        {child}
                    </div>
                ))}
            </div>
        </div>
    );
}
