Berikut adalah **App Flow** yang dioptimalkan untuk aplikasi pelaporan pekerjaan berbasis **React/Next.js**, dengan fitur utama:

- Pilih jenis chart berbasis progress  
- Tambah/edit/hapus task dengan:  
  - Nama task  
  - Progress (1–100%)  
  - Catatan (note) opsional  
- Tampilkan preview chart secara real-time  
- Ekspor laporan sebagai **PDF summary**  

---

## 🔧 **Tech Stack Recommendation**
- **Framework**: Next.js (App Router) → untuk SSR, file-based routing, dan future-proof  
- **State Management**: Zustand atau React Context + `useReducer` (sederhana, cukup untuk scope ini)  
- **UI Library**: Tailwind CSS + Radix UI atau ShadCN/ui → cepat, responsif, modern  
- **Charting**: **Chart.js** (via `react-chartjs-2`) → ringan, mendukung progress bar/doughnut/radar  
- **PDF Export**: **jsPDF + html2canvas** → render komponen chart + daftar task ke PDF  

---

## 📱 **App Flow (User Journey)**

### 1. **Dashboard / Home Page**  
- Tampilan awal:  
  - Judul: *“Buat Laporan Pekerjaan”*  
  - Tombol: **+ Buat Laporan Baru**  
  - (Opsional) Daftar laporan sebelumnya (jika ingin save/load → nanti bisa pakai localStorage atau backend)

---

### 2. **Form Input Task & Chart Setup**  
> Route: `/report/new`  

#### A. **Pilih Jenis Chart**  
- Opsi (radio/select):  
  - 📊 **Progress Bar** (horizontal bar chart)  
  - 🥧 **Doughnut** (lingkaran progress per task)  
  - 📈 **Radar Chart** (progress multi-task dalam bentuk jaring)  
- Preview chart langsung muncul di samping/atas saat dipilih (even jika belum ada task)

#### B. **Tambah Task**  
- Form dinamis (bisa tambah >1 task):  
  - Input: **Nama Task** (wajib)  
  - Slider/Input number: **Progress (%)** (1–100, default 0)  
  - Textarea: **Catatan** (opsional)  
  - Tombol: **+ Tambah Task** / **🗑️ Hapus**  

- Real-time update: setiap perubahan langsung merefleksi ke preview chart

#### C. **Preview Section**  
- Chart (menggunakan pilihan user) → update otomatis  
- Daftar task dalam bentuk card/list (nama, progress bar, note)  

#### D. **Action Buttons**  
- **Simpan Sementara** (opsional, simpan ke localStorage)  
- **Ekspor ke PDF** → trigger generate PDF  

---

### 3. **PDF Generation Flow**  
- Saat user klik **“Ekspor ke PDF”**:  
  1. Aplikasi render **komponen khusus `ReportSummary`** (tersembunyi dari UI, hanya untuk render PDF)  
     - Berisi:  
       - Judul laporan  
       - Chart (dalam format canvas/image — Chart.js bisa di-`toBase64Image()`)  
       - Daftar task (dengan progress bar visual & catatan)  
       - Tanggal ekspor  
  2. Gunakan `html2canvas` → capture elemen `ReportSummary`  
  3. Gunakan `jsPDF` → tambahkan gambar hasil capture  
  4. Trigger download file PDF (misal: `Laporan-Pekerjaan_2026-01-06.pdf`)  

> ✅ Optimasi:  
> - Gunakan `useCallback` dan `memo` untuk hindari re-render berlebihan  
> - Chart hanya update saat data berubah (`useEffect` dengan dependency array)  
> - Validasi: pastikan minimal 1 task sebelum ekspor  

---

## 📁 **Suggested Folder Structure (Next.js App Router)**

```
/app
  /report
    /new
      page.tsx          → Form + preview
      ReportSummary.tsx → Komponen untuk PDF
      useReportStore.ts → Zustand store (tasks, chartType)
  /lib
    generatePDF.ts      → fungsi export ke PDF
  /components
    ChartPreview.tsx
    TaskForm.tsx
    TaskList.tsx
```

---

## 💡 Fitur Tambahan (Opsional, untuk skalabilitas)
- **Auto-save** ke localStorage setiap 30 detik  
- **Template chart**: simpan preferensi chart sebagai default  
- **Dark mode** (Tailwind sudah support)  
- **Print-friendly layout** (bisa juga print langsung tanpa PDF)  