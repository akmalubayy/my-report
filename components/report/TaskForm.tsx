"use client";

import { useState } from "react";
import { Plus, Trash2, LayoutGrid, PieChart, Activity, LineChart, Filter } from "lucide-react";
import { useReportStore, ChartType } from "../../store/useReportStore";
import { cn } from "../../lib/utils";

export default function TaskForm() {
    const { tasks, addTask, removeTask, chartType, setChartType, setTitle, title } = useReportStore();
    const [newTaskName, setNewTaskName] = useState("");
    const [newProgress, setNewProgress] = useState(0);
    const [newNote, setNewNote] = useState("");

    const handleAddTask = (e: React.FormEvent) => {
        e.preventDefault();
        if (!newTaskName.trim()) return;

        addTask({
            name: newTaskName,
            progress: newProgress,
            note: newNote,
        });

        setNewTaskName("");
        setNewProgress(0);
        setNewNote("");
    };

    const chartOptions: { type: ChartType; label: string; icon: any }[] = [
        { type: "bar", label: "Bar", icon: LayoutGrid },
        { type: "pie", label: "Pie", icon: PieChart },
        { type: "radar", label: "Radar", icon: Activity },
        { type: "line", label: "Line", icon: LineChart },
        { type: "funnel", label: "Funnel", icon: Filter },
    ];

    return (
        <div className="space-y-8">
            {/* Title & Setup */}
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 space-y-4">
                <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">
                        Judul Laporan
                    </label>
                    <input
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className="w-full px-4 py-2 rounded-xl border border-slate-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                        placeholder="Masukkan judul laporan..."
                    />
                </div>

                <div>
                    <label className="block text-sm font-bold text-slate-500 uppercase tracking-wider mb-3">
                        Pilih Visualisasi
                    </label>
                    <div className="grid grid-cols-5 gap-2">
                        {chartOptions.map((opt) => (
                            <button
                                key={opt.type}
                                onClick={() => setChartType(opt.type)}
                                title={opt.label}
                                className={cn(
                                    "flex flex-col items-center justify-center gap-2 py-3 px-1 rounded-2xl border-2 transition-all duration-300",
                                    chartType === opt.type
                                        ? "bg-blue-600 border-blue-600 text-white shadow-lg shadow-blue-200 scale-105"
                                        : "bg-slate-50 border-slate-100 text-slate-400 hover:border-slate-200 hover:bg-white"
                                )}
                            >
                                <opt.icon size={20} strokeWidth={chartType === opt.type ? 2.5 : 2} />
                                <span className="text-[10px] font-bold uppercase tracking-tight">{opt.label}</span>
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            {/* Add New Task Form */}
            <form onSubmit={handleAddTask} className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 space-y-4">
                <h3 className="text-lg font-semibold text-slate-800">Tambah Task</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="md:col-span-2">
                        <label className="block text-sm font-medium text-slate-700 mb-1">Nama Task</label>
                        <input
                            type="text"
                            required
                            value={newTaskName}
                            onChange={(e) => setNewTaskName(e.target.value)}
                            className="w-full px-4 py-2 rounded-xl border border-slate-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                            placeholder="Apa yang sedang dikerjakan?"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1">Progress (%): {newProgress}%</label>
                        <input
                            type="range"
                            min="0"
                            max="100"
                            value={newProgress}
                            onChange={(e) => setNewProgress(parseInt(e.target.value))}
                            className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
                        />
                    </div>
                    <div className="md:col-span-2">
                        <label className="block text-sm font-medium text-slate-700 mb-1">Catatan (Opsional)</label>
                        <textarea
                            value={newNote}
                            onChange={(e) => setNewNote(e.target.value)}
                            className="w-full px-4 py-2 rounded-xl border border-slate-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all min-h-[80px]"
                            placeholder="Tambahkan detail jika perlu..."
                        />
                    </div>
                </div>
                <button
                    type="submit"
                    className="w-full flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-xl transition-all shadow-lg shadow-blue-200"
                >
                    <Plus size={20} />
                    <span>Tambah Task</span>
                </button>
            </form>
        </div>
    );
}
