"use client";

import Link from "next/link";
import { ArrowLeft, Download, Trash2 } from "lucide-react";
import { Button } from "@/components/atoms/Button";
import { useReportStore } from "@/store/useReportStore";

interface NavbarProps {
    title: string;
    onExport: () => void;
    isExporting: boolean;
}

export default function Navbar({ title, onExport, isExporting }: NavbarProps) {
    const { tasks, clearAll } = useReportStore();

    return (
        <nav className="h-16 bg-white border-b border-slate-200 sticky top-0 z-50 px-4 flex items-center justify-between shadow-sm">
            <div className="flex items-center gap-4">
                <Link
                    href="/"
                    className="p-2 hover:bg-slate-100 rounded-xl transition-colors text-slate-500"
                >
                    <ArrowLeft size={20} />
                </Link>
                <div className="h-6 w-px bg-slate-200 hidden sm:block" />
                <div className="flex flex-col">
                    <span className="text-xs font-bold text-blue-600 uppercase tracking-widest hidden sm:block">
                        Editor
                    </span>
                    <h1 className="font-bold text-slate-800 truncate max-w-[150px] sm:max-w-none">
                        {title}
                    </h1>
                </div>
            </div>

            <div className="flex items-center gap-2">
                <Button
                    variant="danger"
                    size="sm"
                    onClick={() => clearAll()}
                    className="hidden sm:flex items-center gap-2 px-3 py-2 bg-transparent text-slate-500 hover:bg-red-50 hover:text-red-600 shadow-none border-0"
                >
                    <Trash2 size={16} />
                    Reset
                </Button>
                <Button
                    variant="primary" // Changed to primary to match the dark theme in original code which was bg-slate-900 (we'll stick to blue for consistency or override)
                    // Actually original was slate-900, let's stick to our design system primary (blue) for now or use className override
                    onClick={onExport}
                    disabled={tasks.length === 0 || isExporting}
                    isLoading={isExporting}
                    className="bg-slate-900 hover:bg-slate-800 shadow-lg active:scale-95"
                >
                    {!isExporting && <Download size={18} className="mr-2" />}
                    <span>Export PDF</span>
                </Button>
            </div>
        </nav>
    );
}
