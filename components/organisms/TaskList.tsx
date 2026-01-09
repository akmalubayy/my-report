"use client";

import { Trash2 } from "lucide-react";
import { useReportStore } from "@/store/useReportStore";
import { Card } from "@/components/atoms/Card";
import { Button } from "@/components/atoms/Button";

export default function TaskList() {
    const { tasks, removeTask } = useReportStore();

    if (tasks.length === 0) return (
        <div className="text-center py-6 border-2 border-dashed border-slate-50 rounded-xl">
            <p className="text-xs text-slate-400">Belum ada task ditambahkan</p>
        </div>
    );

    return (
        <div className="space-y-3">
            {tasks.map((task) => (
                <Card
                    key={task.id}
                    className="flex flex-col p-3 border-slate-100 hover:border-blue-200 hover:bg-white transition-all group"
                >
                    <div className="flex items-center justify-between gap-3">
                        <div className="flex-1 min-w-0">
                            <h4 className="font-bold text-slate-800 text-sm truncate">{task.name}</h4>
                            <div className="flex items-center gap-2 mt-1">
                                <div className="flex-1 h-1 bg-slate-200 rounded-full overflow-hidden">
                                    <div
                                        className="h-full bg-blue-500 rounded-full"
                                        style={{ width: `${task.progress}%` }}
                                    />
                                </div>
                                <span className="text-[10px] font-black text-blue-600">{task.progress}%</span>
                            </div>
                        </div>
                        <Button
                            variant="danger"
                            size="sm"
                            onClick={() => removeTask(task.id)}
                            className="p-1.5 rounded-lg opacity-60 group-hover:opacity-100"
                        >
                            <Trash2 size={14} />
                        </Button>
                    </div>
                </Card>
            ))}
        </div>
    );
}
