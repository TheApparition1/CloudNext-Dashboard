'use client'

import { ReactNode, useState } from "react";
import Sidebar from "./Sidebar";

interface DashboardLayoutProps {
    children: ReactNode;
}

const navigation = [
    {
        label: "Overview",
        href: "/",
    },
    {
        label: "DNS",
        href: "/dns",
    },
    {
        label: "SSL",
        href: "/ssl",
    },
    {
        label: "Analytics",
        href: "/analytics",
    },
    {
        label: "Settings",
        href: "/settings",
    },
];

export default function DashboardLayout({ children }: DashboardLayoutProps) {
    const [Collapsed, setIsCollapsed] = useState(false)

    return (
        <div className="flex h-screen bg-gray-50 overflow-hidden">
            <Sidebar items={navigation} Collapsed={Collapsed} onToggle={() => setIsCollapsed(!Collapsed)} />

            <main className="flex-1 p-10 overflow-y-auto">
                {children}
            </main>
        </div>
    );
}