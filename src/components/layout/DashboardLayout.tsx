import { ReactNode } from "react";
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
    return (
        <div className="flex min-h-screen bg-gray-50">
            <Sidebar items={navigation} />

            <main className="flex-1 p-10">
                {children}
            </main>
        </div>
    );
}