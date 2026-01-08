import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type ChartType = 'bar' | 'pie' | 'radar' | 'line' | 'funnel';

export interface Task {
    id: string;
    name: string;
    progress: number;
    note?: string;
}

interface ReportState {
    title: string;
    chartType: ChartType;
    tasks: Task[];
    setTitle: (title: string) => void;
    setChartType: (type: ChartType) => void;
    addTask: (task: Omit<Task, 'id'>) => void;
    updateTask: (id: string, updates: Partial<Task>) => void;
    removeTask: (id: string) => void;
    clearAll: () => void;
}

export const useReportStore = create<ReportState>()(
    persist(
        (set) => ({
            title: 'Laporan Pekerjaan Baru',
            chartType: 'bar',
            tasks: [],
            setTitle: (title) => set({ title }),
            setChartType: (chartType) => set({ chartType }),
            addTask: (task) =>
                set((state) => ({
                    tasks: [
                        ...state.tasks,
                        { ...task, id: Math.random().toString(36).substring(2, 9) },
                    ],
                })),
            updateTask: (id, updates) =>
                set((state) => ({
                    tasks: state.tasks.map((t) => (t.id === id ? { ...t, ...updates } : t)),
                })),
            removeTask: (id) =>
                set((state) => ({
                    tasks: state.tasks.filter((t) => t.id !== id),
                })),
            clearAll: () => set({ tasks: [], title: 'Laporan Pekerjaan Baru', chartType: 'bar' }),
        }),
        {
            name: 'report-storage',
        }
    )
);
