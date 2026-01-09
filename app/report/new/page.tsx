"use client";

import { useState, useRef } from "react";
import html2canvas from "html2canvas";
import { pdf } from "@react-pdf/renderer";
import { FileText, Clock } from "lucide-react";

import { useReportStore } from "@/store/useReportStore";
import { ReportDocument } from "@/components/templates/ReportDocument";
import { Badge } from "@/components/atoms/Badge";
import EditorLayout from "@/components/templates/EditorLayout";
import Navbar from "@/components/organisms/Navbar";
import TaskForm from "@/components/organisms/TaskForm";
import TaskList from "@/components/organisms/TaskList";
import ChartPreview from "@/components/organisms/ChartPreview";

export default function NewReportPage() {
    const { tasks, title } = useReportStore();
    const [isExporting, setIsExporting] = useState(false);

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
                <ReportDocument title={title} tasks={tasks} chartImage={chartImage} />
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
        <EditorLayout
            navbar={
                <Navbar
                    title={title}
                    onExport={handleExportPDF}
                    isExporting={isExporting}
                />
            }
            sidebar={
                <>
                    <section className="space-y-6">
                        <div className="flex items-center justify-between">
                            <h2 className="text-lg font-bold text-slate-800">Pengaturan</h2>
                            <Badge variant="primary">Real-time</Badge>
                        </div>
                        <TaskForm />
                    </section>

                    <section className="space-y-4 pt-6 border-t border-slate-100 pb-10">
                        <h2 className="text-lg font-bold text-slate-800">Manajemen Task</h2>
                        <TaskList />
                    </section>
                </>
            }
            preview={
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
            }
        />
    );
}
