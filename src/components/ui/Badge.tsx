import React from "react";

interface BadgeProps {
    children: React.ReactNode;
    variant?: "neutral" | "info" | "success" | "warning" | "danger" | "indigo" | "slate";
}

const variants = {
    neutral: "bg-gray-100 text-gray-700",
    info: "bg-blue-50 text-blue-700",
    success: "bg-green-50 text-green-700",
    warning: "bg-amber-50 text-amber-700",
    danger: "bg-red-50 text-red-700",
    indigo: "bg-indigo-50 text-indigo-700",
    slate: "bg-slate-100 text-slate-700",
};

export default function Badge({
                                  children,
                                  variant = "neutral",
                              }: BadgeProps) {
    return (
        <span className={`inline-flex items-center whitespace-nowrap rounded-md px-2 py-1 text-xs font-medium ${variants[variant]}`}>
            {children}
        </span>
    );
}