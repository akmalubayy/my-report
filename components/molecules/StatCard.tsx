import { ReactNode } from "react";

interface StatCardProps {
    icon: ReactNode;
    label: string;
}

export function StatCard({ icon, label }: StatCardProps) {
    return (
        <div className="flex flex-col items-center gap-3">
            <div className="p-4 bg-slate-50 rounded-2xl text-slate-600">
                {icon}
            </div>
            <span className="font-semibold text-slate-700">{label}</span>
        </div>
    );
}
