import Link from "next/link";
import { Plus, FileText, BarChart3, Clock, Layout } from "lucide-react";
import { Button } from "@/components/atoms/Button";
import { StatCard } from "@/components/molecules/StatCard";
import { FeatureCard } from "@/components/molecules/FeatureCard";

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
            <Link href="/report/new">
              <Button
                variant="primary"
                size="lg"
                className="w-full sm:w-auto shadow-xl shadow-blue-900/40"
              >
                <Plus size={24} className="mr-2" />
                Mulai Buat Laporan
              </Button>
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
          <StatCard icon={<FileText />} label="PDF Export" />
          <StatCard icon={<BarChart3 />} label="5 Nivo Charts" />
          <StatCard icon={<Plus />} label="Unlimited Tasks" />
        </div>
      </div>
    </main>
  );
}
