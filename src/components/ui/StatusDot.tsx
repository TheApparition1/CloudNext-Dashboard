import clsx from "clsx";
import React from "react";

type Status =
    | "success"
    | "warning"
    | "danger"
    | "neutral"
    | "info";

interface StatusDotProps {
    status: Status;
    pulse?: boolean;
}

const styles = {
    success: {
        dot: "bg-emerald-500",
        text: "text-emerald-700"
    },

    warning: {
        dot: "bg-amber-500",
        text: "text-amber-700"
    },

    danger: {
        dot: "bg-red-500",
        text: "text-red-700"
    },

    neutral: {
        dot: "bg-zinc-400",
        text: "text-zinc-600"
    },

    info: {
        dot: "bg-blue-500",
        text: "text-blue-700"
    }
};

export default function StatusDot({
  status,
  pulse = false
}: StatusDotProps) {

    const colour = styles[status];

    return (
        <span className="inline-flex items-center gap-2">

            <span
                className={clsx(
                    "h-2.5 w-2.5 rounded-full transition-colors duration-150",
                    colour.dot,
                    pulse && "animate-pulse"
                )}
            />

            <span
                className={clsx(
                    "text-sm font-medium",
                    colour.text
                )}
            >
            </span>

        </span>
    );
}