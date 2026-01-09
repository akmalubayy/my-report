import { LayoutGrid, PieChart, Activity, LineChart, Filter } from "lucide-react";
import { cn } from "@/lib/utils";
import { ChartType } from "@/store/useReportStore";

interface ChartSelectorProps {
    selected: ChartType;
    onSelect: (type: ChartType) => void;
}

const chartOptions: { type: ChartType; label: string; icon: any }[] = [
    { type: "bar", label: "Bar", icon: LayoutGrid },
    { type: "pie", label: "Pie", icon: PieChart },
    { type: "radar", label: "Radar", icon: Activity },
    { type: "line", label: "Line", icon: LineChart },
    { type: "funnel", label: "Funnel", icon: Filter },
];

export function ChartSelector({ selected, onSelect }: ChartSelectorProps) {
    return (
        <div>
            <label className="block text-sm font-bold text-slate-500 uppercase tracking-wider mb-3">
                Pilih Visualisasi
            </label>
            <div className="grid grid-cols-5 gap-2">
                {chartOptions.map((opt) => (
                    <button
                        key={opt.type}
                        type="button"
                        onClick={() => onSelect(opt.type)}
                        title={opt.label}
                        className={cn(
                            "flex flex-col items-center justify-center gap-2 py-3 px-1 rounded-2xl border-2 transition-all duration-300",
                            selected === opt.type
                                ? "bg-blue-600 border-blue-600 text-white shadow-lg shadow-blue-200 scale-105"
                                : "bg-slate-50 border-slate-100 text-slate-400 hover:border-slate-200 hover:bg-white"
                        )}
                    >
                        <opt.icon size={20} strokeWidth={selected === opt.type ? 2.5 : 2} />
                        <span className="text-[10px] font-bold uppercase tracking-tight">
                            {opt.label}
                        </span>
                    </button>
                ))}
            </div>
        </div>
    );
}
