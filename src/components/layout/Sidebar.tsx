
'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

interface SidebarItem {
    label: string;
    href: string;
}

interface SidebarProps {
    items: SidebarItem[];
}

export default function Sidebar({ items }: SidebarProps) {
    const pathname = usePathname()

    return (
        <aside className="h-screen w-64 border-r border-gray-200 bg-white px-4 py-6">
            <div className="mb-8 px-2">
                <h1 className="text-lg font-semibold text-gray-900">
                    CloudNext
                </h1>
            </div>

            <nav className="space-y-1">
                {items.map((item) => {
                    const isActive = pathname === item.href
                    return (
                        <Link
                            key={item.href}
                            href={item.href}
                            className={`w-full rounded-lg px-3 py-2 text-left text-sm transition block ${
                                isActive
                                    ? "bg-gray-100 font-medium text-gray-900"
                                    : "text-gray-600 hover:bg-gray-50"
                            }`}
                        >
                            {item.label}
                        </Link>
                    )
                })}
            </nav>
        </aside>
    );
}