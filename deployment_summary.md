# Rangkuman Deployment Next.js ke Shared Hosting (CI/CD)

Dokumen ini berisi rangkuman langkah-langkah, konfigurasi penting, dan solusi masalah yang kita hadapi selama proses setup deployment otomatis (CI/CD) dari GitHub ke Shared Hosting cPanel.

## 1. Konsep Utama
- **Local (Laptop)**: Hanya untuk coding. Tidak perlu `npm run build`. Cukup `git push`.
- **GitHub**: Bertugas sebagai "Pabrik". Dia yang melakukan install, build, dan mengirim file jadi ke hosting.
- **Hosting**: Hanya menerima file jadi. Wajib di-**Restart** agar perubahan terlihat.

## 2. File Konfigurasi Penting

### A. `.github/workflows/deploy.yml` (Otak CI/CD)
Menggunakan `lftp` karena lebih tangguh menembus firewall hosting dibanding action FTP standar.
```yaml
name: Deploy Next.js to Shared Hosting
on:
  push:
    branches:
      - main
jobs:
  build_and_deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: '20'
      - run: npm ci
      - run: npm run build
      # Menyiapkan folder siap kirim agar bersih
      - run: |
          mkdir deploy_ready
          cp -r .next deploy_ready/
          cp -r public deploy_ready/
          cp package.json deploy_ready/
          cp package-lock.json deploy_ready/
          cp next.config.mjs deploy_ready/
          cp server.js deploy_ready/
      # Kirim pakai LFTP (Anti Timeout & SSL Error)
      - name: Install & Sync via LFTP
        run: |
          sudo apt-get install lftp
          lftp -e "set ssl:verify-certificate no; open ${{ secrets.FTP_SERVER }}; user ${{ secrets.FTP_USERNAME }} '${{ secrets.FTP_PASSWORD }}'; mirror -R --parallel=5 --exclude-glob .git* --exclude-glob .github* ./deploy_ready/ /; quit"
```

### B. `server.js` (Jembatan Hosting)
File wajib agar cPanel bisa menjalankan Next.js. Pastikan file ini ada di root project.

### C. `next.config.mjs`
Wajib ubah dari `.ts` ke `.mjs` karena Shared Hosting (Production) biasanya tidak menginstal TypeScript.

## 3. GitHub Secrets (Kunci Masuk)
Di repository GitHub -> **Settings** -> **Secrets and variables** -> **Actions**:
- `FTP_SERVER`: Gunakan **IP Address Asli** hosting (misal: `103.xxx`) untuk menghindari blokir proxy Cloudflare.
- `FTP_USERNAME`: Username lengkap (misal: `user@domain.com`).
- `FTP_PASSWORD`: Password akun FTP.

## 4. Masalah Umum & Solusi (Troubleshooting)

| Masalah / Error | Penyebab | Solusi |
| :--- | :--- | :--- |
| **RPC failed; curl 56... (Push Gagal)** | Ukuran git terlalu besar (misal ada file zip/node_modules lama). | Reset git: `rm -rf .git`, `git init -b main`, lalu push force. |
| **ETIMEDOUT / Connection Reset** | Cloudflare memblokir port 21 FTP. | Ganti `FTP_SERVER` di GitHub Secrets menjadi **IP Address** hosting. |
| **Timeout ... open data connection** | Firewall hosting memblokir Passive Mode/Port tinggi. | Gunakan script **LFTP** di `deploy.yml` (lihat poin 2A). |
| **Login authentication failed 530** | Salah username/password FTP. | Cek Secrets. Pastikan path user FTP di cPanel benar (root folder project). |
| **Perubahan tidak muncul di web** | Node.js di server masih menjalankan kode lama di memori. | Masuk cPanel -> Setup Node.js App -> Klik **Restart**. |

## 5. Checklist Harian
Setiap kali Anda ingin update website:
1.  [ ] Edit kode di laptop.
2.  [ ] `git add .` -> `git commit -m "Pesan"` -> `git push`.
3.  [ ] Tunggu centang hijau di GitHub Actions.
4.  [ ] Buka cPanel -> **Restart** Application.
5.  [ ] Selesai! Website terupdate.
