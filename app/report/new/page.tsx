"use client";

import Link from "next/link";
import { ArrowLeft, Download, FileText, Trash2, Printer, Save, CheckCircle2 } from "lucide-react";
import TaskForm from "../../../components/report/TaskForm";
import ChartPreview from "../../../components/report/ChartPreview";
import TaskList from "../../../components/report/TaskList";
import { useReportStore } from "../../../store/useReportStore";
import { useState, useRef } from "react";
import html2canvas from "html2canvas";
import { pdf } from "@react-pdf/renderer";
import { ReportPDF } from "../../../components/report/ReportPDF";
import { cn } from "../../../lib/utils";

export default function NewReportPage() {
    const { tasks, title, clearAll } = useReportStore();
    const [isExporting, setIsExporting] = useState(false);
    const chartRef = useRef<HTMLDivElement>(null);

    const handleExportPDF = async () => {
        if (tasks.length === 0) return;
        setIsExporting(true);

        try {
            // 1. Capture the chart as an image
            let chartImage = undefined;
            const chartElement = document.getElementById("chart-preview");

            if (chartElement) {
                // Wait for any Nivo animations to settle
                await new Promise(r => setTimeout(r, 500));

                const canvas = await html2canvas(chartElement, {
                    scale: 3, // Higher scale for better PDF quality
                    useCORS: true,
                    backgroundColor: "#ffffff",
                    logging: false,
                    width: chartElement.offsetWidth,
                    height: chartElement.offsetHeight,
                    scrollX: 0,
                    scrollY: -window.scrollY, // Adjust for scroll position
                    onclone: (clonedDoc) => {
                        const el = clonedDoc.getElementById("chart-preview");
                        if (el) {
                            el.style.transform = "none";
                            el.style.padding = "20px";
                        }
                    }
                });
                chartImage = canvas.toDataURL("image/png");
            }

            // 2. Generate PDF using @react-pdf/renderer
            const blob = await pdf(
                <ReportPDF title={title} tasks={tasks} chartImage={chartImage} />
            ).toBlob();

            // Create a New Blob with explicit PDF type just in case
            const pdfBlob = new Blob([blob], { type: "application/pdf" });

            // 3. Download the blob
            const url = URL.createObjectURL(pdfBlob);
            const link = document.createElement("a");
            link.href = url;

            // Sanitize filename: remove special characters, replace spaces with underscores
            const safeTitle = title.replace(/[^\w\s-]/gi, '').replace(/\s+/g, '_');
            const timestamp = new Date().toISOString().split('T')[0];
            link.download = `${safeTitle || 'Report'}_${timestamp}.pdf`;

            document.body.appendChild(link);
            link.click();

            // Natural delay before cleanup to ensure trigger works effectively in all browsers
            setTimeout(() => {
                document.body.removeChild(link);
                URL.revokeObjectURL(url);
            }, 100);
        } catch (error) {
            console.error("PDF Export failed:", error);
        } finally {
            setIsExporting(false);
        }
    };

    return (
        <main className="min-h-screen bg-slate-50 flex flex-col">
            {/* Navbar */}
            <nav className="h-16 bg-white border-b border-slate-200 sticky top-0 z-50 px-4 flex items-center justify-between shadow-sm">
                <div className="flex items-center gap-4">
                    <Link href="/" className="p-2 hover:bg-slate-100 rounded-xl transition-colors text-slate-500">
                        <ArrowLeft size={20} />
                    </Link>
                    <div className="h-6 w-px bg-slate-200 hidden sm:block" />
                    <div className="flex flex-col">
                        <span className="text-xs font-bold text-blue-600 uppercase tracking-widest hidden sm:block">Editor</span>
                        <h1 className="font-bold text-slate-800 truncate max-w-[150px] sm:max-w-none">{title}</h1>
                    </div>
                </div>

                <div className="flex items-center gap-2">
                    <button
                        onClick={() => clearAll()}
                        className="hidden sm:flex items-center gap-2 text-slate-500 hover:text-red-500 hover:bg-red-50 px-3 py-2 rounded-xl transition-all text-sm font-medium"
                    >
                        <Trash2 size={16} />
                        Reset
                    </button>
                    <button
                        onClick={handleExportPDF}
                        disabled={tasks.length === 0 || isExporting}
                        className="flex items-center gap-2 bg-slate-900 hover:bg-slate-800 disabled:bg-slate-300 text-white px-5 py-2.5 rounded-xl font-bold transition-all shadow-lg active:scale-95 text-sm"
                    >
                        {isExporting ? (
                            <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        ) : (
                            <Download size={18} />
                        )}
                        <span>Export PDF</span>
                    </button>
                </div>
            </nav>

            {/* Main Content Area */}
            <div className="flex-1 flex flex-col lg:flex-row overflow-hidden">
                {/* Left Bar: Controls & Task Management */}
                <aside className="w-full lg:w-[400px] border-r border-slate-200 bg-white overflow-y-auto p-6 space-y-8 custom-scrollbar">
                    <section className="space-y-6">
                        <div className="flex items-center justify-between">
                            <h2 className="text-lg font-bold text-slate-800">Pengaturan</h2>
                            <div className="px-2 py-1 bg-blue-50 text-blue-600 text-[10px] font-bold rounded-md uppercase">Real-time</div>
                        </div>
                        <TaskForm />
                    </section>

                    <section className="space-y-4 pt-6 border-t border-slate-100 pb-10">
                        <h2 className="text-lg font-bold text-slate-800">Manajemen Task</h2>
                        <TaskList />
                    </section>
                </aside>

                {/* Right Content: The "Document" Preview */}
                <section className="flex-1 bg-slate-100 overflow-y-auto p-4 sm:p-8 lg:p-12 flex justify-center">
                    <div className="w-full max-w-[800px] bg-white shadow-2xl rounded-sm min-h-[1050px] flex flex-col p-8 sm:p-12 border border-slate-200 relative">
                        {/* PDF Watermark/Header for UI */}
                        <div className="absolute top-0 left-0 w-full h-1.5 bg-blue-600" />

                        <header className="flex justify-between items-start mb-12">
                            <div className="space-y-2">
                                <h2 className="text-3xl font-black text-slate-900 tracking-tight">{title}</h2>
                                <div className="flex items-center gap-2 text-slate-400 text-sm">
                                    <Clock size={14} />
                                    <span>{new Date().toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })}</span>
                                </div>
                            </div>
                            <div className="p-4 bg-slate-50 text-slate-300 rounded-2xl">
                                <FileText size={40} />
                            </div>
                        </header>

                        <div className="flex-1 space-y-12">
                            <div className="space-y-4">
                                <div className="flex items-center gap-2 text-slate-800 font-bold border-b border-slate-100 pb-2">
                                    <div className="w-2 h-6 bg-blue-500 rounded-full" />
                                    Visualisasi Progress (Nivo)
                                </div>
                                <ChartPreview />
                            </div>

                            <div className="space-y-6">
                                <div className="flex items-center gap-2 text-slate-800 font-bold border-b border-slate-100 pb-2">
                                    <div className="w-2 h-6 bg-emerald-500 rounded-full" />
                                    Ringkasan Detail Pekerjaan
                                </div>

                                {tasks.length === 0 ? (
                                    <div className="py-20 text-center border-2 border-dashed border-slate-100 rounded-3xl">
                                        <p className="text-slate-300 italic">Belum ada data untuk ditampilkan</p>
                                    </div>
                                ) : (
                                    <div className="grid gap-6">
                                        {tasks.map((task) => (
                                            <div key={task.id} className="group relative">
                                                <div className="flex justify-between items-end mb-2">
                                                    <span className="font-bold text-slate-800 text-lg">{task.name}</span>
                                                    <span className="text-sm font-black text-blue-600">{task.progress}%</span>
                                                </div>
                                                <div className="w-full h-3 bg-slate-100 rounded-full overflow-hidden mb-3">
                                                    <div className="h-full bg-blue-500 transition-all duration-700 ease-out shadow-sm" style={{ width: `${task.progress}%` }} />
                                                </div>
                                                {task.note && (
                                                    <div className="bg-slate-50 border-l-4 border-slate-200 p-4 rounded-r-xl">
                                                        <p className="text-slate-600 text-sm leading-relaxed">{task.note}</p>
                                                    </div>
                                                )}
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </div>

                        <footer className="mt-20 pt-8 border-t border-slate-100 flex justify-between items-center text-[10px] text-slate-300 uppercase tracking-[0.2em] font-bold">
                            <span>Work Report Generator v1.0</span>
                            <span>Halaman 01</span>
                        </footer>
                    </div>
                </section>
            </div>

            <style jsx global>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: #f8fafc;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #e2e8f0;
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #cbd5e1;
        }
      `}</style>
        </main>
    );
}

function Clock({ size }: { size: number }) {
    return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="10" />
            <polyline points="12 6 12 12 16 14" />
        </svg>
    );
}
