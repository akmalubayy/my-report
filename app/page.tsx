import Link from "next/link";
import { Plus, FileText, ChevronRight, BarChart3, Clock, Layout } from "lucide-react";

export default function Home() {
  return (
    <main className="min-h-screen bg-white">
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-slate-900 pt-16 pb-32">
        <div className="absolute top-0 left-0 w-full h-full opacity-10">
          <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-500 rounded-full blur-[100px]" />
          <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-purple-500 rounded-full blur-[100px]" />
        </div>

        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 text-white/80 text-sm font-medium mb-8 backdrop-blur-sm border border-white/10">
            <span className="flex h-2 w-2 rounded-full bg-blue-400 animate-pulse" />
            V1.0 Now Live
          </div>
          <h1 className="text-5xl md:text-7xl font-extrabold text-white tracking-tight mb-6">
            Laporan Pekerjaan <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-300">
              Jadi Lebih Cepat.
            </span>
          </h1>
          <p className="text-xl text-slate-400 max-w-2xl mx-auto mb-10 leading-relaxed">
            Buat ringkasan pekerjaan harian atau mingguan Anda dengan visualisasi chart profesional
            hanya dalam hitungan detik.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/report/new"
              className="w-full sm:w-auto flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-500 text-white text-lg font-bold px-8 py-4 rounded-2xl transition-all shadow-xl shadow-blue-900/40 active:scale-95"
            >
              <Plus size={24} />
              Mulai Buat Laporan
            </Link>
          </div>
        </div>
      </div>

      {/* Features Grid */}
      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 mt-[-60px]">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <FeatureCard
            icon={<BarChart3 className="text-blue-500" />}
            title="Real-time Charts"
            desc="Visualisasi otomatis berdasarkan progress pekerjaan Anda."
          />
          <FeatureCard
            icon={<Clock className="text-emerald-500" />}
            title="Sangat Cepat"
            desc="Cukup isi progress, lalu download sebagai PDF instan."
          />
          <FeatureCard
            icon={<Layout className="text-purple-500" />}
            title="Desain Modern"
            desc="Laporan yang terlihat profesional dan mudah dipahami."
          />
        </div>
      </div>

      {/* Stats/Social Proof */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-24 text-center">
        <h2 className="text-3xl font-bold text-slate-900 mb-12">Fitur Utama</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-8">
          <Stat icon={<FileText />} label="PDF Export" />
          <Stat icon={<BarChart3 />} label="5 Nivo Charts" />
          <Stat icon={<Plus />} label="Unlimited Tasks" />
        </div>
      </div>
    </main>
  );
}

function FeatureCard({ icon, title, desc }: { icon: any; title: string; desc: string }) {
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

function Stat({ icon, label }: { icon: any; label: string }) {
  return (
    <div className="flex flex-col items-center gap-3">
      <div className="p-4 bg-slate-50 rounded-2xl text-slate-600">
        {icon}
      </div>
      <span className="font-semibold text-slate-700">{label}</span>
    </div>
  );
}
