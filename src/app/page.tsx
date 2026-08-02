import DashboardLayout from "@/components/layout/DashboardLayout";

export default function Home() {
    return (
        <DashboardLayout>
            <h1 className="text-3xl font-semibold text-gray-900">
                Dashboard
            </h1>

            <p className="mt-2 text-gray-500">
                Welcome to CloudNext.
            </p>
        </DashboardLayout>
    );
}