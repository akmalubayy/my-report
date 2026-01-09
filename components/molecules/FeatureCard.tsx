import { ReactNode } from "react";

interface FeatureCardProps {
    icon: ReactNode;
    title: string;
    desc: string;
}

export function FeatureCard({ icon, title, desc }: FeatureCardProps) {
    return (
        <div className="bg-white p-8 rounded-3xl shadow-xl shadow-slate-200/50 border border-slate-100 transition-all hover:translate-y-[-4px]">
            <div className="w-12 h-12 bg-slate-50 rounded-2xl flex items-center justify-center mb-6">
                {icon}
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-3">{title}</h3>
            <p className="text-slate-500 leading-relaxed">{desc}</p>
        </div>
    );
}
