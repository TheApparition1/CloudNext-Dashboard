import { ReactNode } from "react";

interface CardProps {
    children: ReactNode;
    className?: string;
}

interface CardHeaderProps {
    title: string;
    description?: string;
}

interface CardContentProps {
    children: ReactNode;
    className?: string;
}

function CardBase({ children, className = "" }: CardProps) {
    return (
        <div className={`rounded-xl border border-gray-200 bg-white ${className}`}>
            {children}
        </div>
    );
}

function Header({ title, description }: CardHeaderProps) {
    return (
        <div className="border-b border-gray-100 px-6 py-5">
            <h2 className="text-base font-semibold text-gray-900">
                {title}
            </h2>

            {description && (
                <p className="mt-1 text-sm text-gray-500">
                    {description}
                </p>
            )}
        </div>
    );
}

function Content({ children, className = "" }: CardContentProps) {
    return (
        <div className={`px-6 py-5 ${className}`}>
            {children}
        </div>
    );
}

const Card = Object.assign(CardBase, {
    Header,
    Content,
});

export default Card;