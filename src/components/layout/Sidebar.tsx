interface SidebarItem {
    label: string;
    active?: boolean;
}

interface SidebarProps {
    items: SidebarItem[];
}

export default function Sidebar({ items }: SidebarProps) {
    return (
        <aside className="h-screen w-64 border-r border-gray-200 bg-white px-4 py-6">
            <div className="mb-8 px-2">
                <h1 className="text-lg font-semibold text-gray-900">
                    CloudNext
                </h1>
            </div>

            <nav className="space-y-1">
                {items.map((item) => (
                    <button
                        key={item.label}
                        className={`w-full rounded-lg px-3 py-2 text-left text-sm transition ${
                            item.active
                                ? "bg-gray-100 font-medium text-gray-900"
                                : "text-gray-600 hover:bg-gray-50"
                        }`}
                    >
                        {item.label}
                    </button>
                ))}
            </nav>
        </aside>
    );
}