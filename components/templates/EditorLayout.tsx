import { ReactNode } from "react";

interface EditorLayoutProps {
    navbar: ReactNode;
    sidebar: ReactNode;
    preview: ReactNode;
}

export default function EditorLayout({ navbar, sidebar, preview }: EditorLayoutProps) {
    return (
        <main className="min-h-screen bg-slate-50 flex flex-col">
            {navbar}

            {/* Main Content Area */}
            <div className="flex-1 flex flex-col lg:flex-row overflow-hidden">
                {/* Left Bar: Controls & Task Management */}
                <aside className="w-full lg:w-[400px] border-r border-slate-200 bg-white overflow-y-auto p-6 space-y-8 custom-scrollbar">
                    {sidebar}
                </aside>

                {/* Right Content: The "Document" Preview */}
                <section className="flex-1 bg-slate-100 overflow-y-auto p-4 sm:p-8 lg:p-12 flex justify-center">
                    {preview}
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
