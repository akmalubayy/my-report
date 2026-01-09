"use client";

import { useState } from "react";
import { Plus } from "lucide-react";
import { useReportStore } from "@/store/useReportStore";
import { Card } from "@/components/atoms/Card";
import { Input } from "@/components/atoms/Input";
import { Button } from "@/components/atoms/Button";
import { FormField } from "@/components/molecules/FormField";
import { ChartSelector } from "@/components/molecules/ChartSelector";

export default function TaskForm() {
    const { tasks, addTask, chartType, setChartType, setTitle, title } = useReportStore();
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

    return (
        <div className="space-y-8">
            {/* Title & Setup */}
            <Card className="space-y-4">
                <FormField
                    label="Judul Laporan"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Masukkan judul laporan..."
                />

                <ChartSelector selected={chartType} onSelect={setChartType} />
            </Card>

            {/* Add New Task Form */}
            <Card
                as="form"
                onSubmit={handleAddTask}
                className="space-y-4"
                {...({} as any)} // Helper to bypass type strictness on 'as' prop which Card doesn't natively support yet but renders as div
            >
                <h3 className="text-lg font-semibold text-slate-800">Tambah Task</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="md:col-span-2">
                        <FormField
                            label="Nama Task"
                            required
                            value={newTaskName}
                            onChange={(e) => setNewTaskName(e.target.value)}
                            placeholder="Apa yang sedang dikerjakan?"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1">
                            Progress (%): {newProgress}%
                        </label>
                        <Input
                            type="range"
                            min="0"
                            max="100"
                            value={newProgress}
                            onChange={(e) => setNewProgress(parseInt(e.target.value))}
                            className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-600 p-0 border-0"
                        />
                    </div>
                    <div className="md:col-span-2">
                        <FormField
                            label="Catatan (Opsional)"
                            textarea
                            value={newNote}
                            onChange={(e) => setNewNote(e.target.value)}
                            placeholder="Tambahkan detail jika perlu..."
                        />
                    </div>
                </div>
                <Button
                    type="submit"
                    className="w-full shadow-lg shadow-blue-200"
                >
                    <Plus size={20} className="mr-2" />
                    <span>Tambah Task</span>
                </Button>
            </Card>
        </div>
    );
}
