'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { ChevronLeft, ChevronRight } from 'lucide-react'

interface Sidebar {
    label: string;
    href: string;
}

interface SidebarProps {
    items: Sidebar[];
    Collapsed: boolean;
    onToggle: () => void;
}

export default function Sidebar({ items, Collapsed, onToggle }: SidebarProps) {
    const pathname = usePathname()

    return (
        <aside className={`h-screen bg-white border-r border-gray-200 transition-all duration-300 ${Collapsed ? 'w-16' : 'w-64'}`}>
            <div className="h-16 flex items-center justify-between px-4 border-b border-gray-100">
                {!Collapsed && (
                    <h1 className="text-lg font-semibold text-gray-900">
                        CloudNext
                    </h1>
                )}
                <button
                    onClick={onToggle}
                    className="p-1 rounded-md hover:bg-gray-900 hover:text-white transition text-gray-900"
                >
                    {Collapsed ? <ChevronRight size={20} /> : <ChevronLeft size={20} />}
                </button>
            </div>

            <nav className="p-2 space-y-1">
                {items.map((item) => {
                    const isActive = pathname === item.href
                    return (
                        <Link
                            key={item.href}
                            href={item.href}
                            className={`flex items-center rounded-lg px-3 py-2 text-sm transition ${
                                isActive
                                    ? "bg-gray-100 font-medium text-gray-900"
                                    : "text-gray-600 hover:bg-gray-50"
                            }`}
                            title={Collapsed ? item.label : undefined}
                        >
                            {!Collapsed && item.label}
                        </Link>
                    )
                })}
            </nav>
        </aside>
    );
}