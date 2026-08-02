import React from "react";

interface SectionProps {
    title: string;
    description?: string;
    action?: React.ReactNode;
    children: React.ReactNode;
}

export default function Section({ title, description, action, children }: SectionProps) {
    return (
        <section className="space-y-4">
            <div className="flex items-start justify-between gap-4">
                <div>
                    <h2 className="text-lg font-semibold text-gray-900">
                        {title}
                    </h2>

                    {description && (
                        <p className="mt-1 text-sm text-gray-500">
                            {description}
                        </p>
                    )}
                </div>

                {action && <div>{action}</div>}
            </div>

            {children}
        </section>
    );
}