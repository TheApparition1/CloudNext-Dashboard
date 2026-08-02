import { ReactNode } from "react";
import Sidebar from "./Sidebar";

interface DashboardLayoutProps {
    children: ReactNode;
}

const navigation = [
    {
        label: "Overview",
        active: true,
    },
    {
        label: "DNS",
    },
    {
        label: "SSL",
    },
    {
        label: "Analytics",
    },
    {
        label: "Settings",
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