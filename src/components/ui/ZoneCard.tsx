import Card from "./Card";
import Badge from "./Badge";
import StatusDot from "./StatusDot";

interface ZoneCardProps {
    name: string;
    status: string;
    paused: boolean;
}

export default function ZoneCard({ name, status, paused }: ZoneCardProps) {
    const active = !paused;

    return (
        <Card>
            <Card.Content>
                <div className="flex items-start justify-between gap-4">
                    <div>
                        <h3 className="text-base font-semibold text-gray-900">
                            {name}
                        </h3>

                        <div className="mt-2 flex items-center gap-2">
                            <StatusDot status={active ? "success" : "warning"} />

                            <span className="text-sm text-gray-500">
                                {paused ? "Paused" : status}
                            </span>
                        </div>
                    </div>

                    <Badge variant={active ? "success" : "warning"}>
                        {active ? "Active" : "Paused"}
                    </Badge>
                </div>
            </Card.Content>
        </Card>
    );
}