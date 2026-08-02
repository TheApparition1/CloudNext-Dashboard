interface TableProps {
    children: React.ReactNode;
    className?: string;
}

export default function Table({ children, className = "" }: TableProps) {
    return (
        <div className={`overflow-hidden rounded-xl border border-gray-200 ${className}`}>
            <table className="w-full text-sm">
                {children}
            </table>
        </div>
    );
}