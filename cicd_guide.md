# Panduan CI/CD: GitHub Actions ke Shared Hosting

Ya, Anda bisa mengimplementasikan CI/CD sehingga setiap kali Anda melakukan `git push`, aplikasi akan otomatis di-build dan di-update di hosting.

> [!IMPORTANT]
> **Mengapa Build di GitHub?**
> Shared hosting biasanya membatasi penggunaan RAM/CPU. Menjalankan `npm run build` langsung di cPanel seringkali gagal atau menyebabkan akun di-suspend. Solusi terbaik adalah melakukan build di GitHub Actions, lalu mengirim hasilnya ke hosting.

## Alur Kerja (Workflow)

1. **Build**: GitHub Actions menjalankan instalasi dan build.
2. **Deploy**: Hasil build (`.next`, `public`, dll) dikirim ke hosting via FTP atau SFTP.

## Langkah-langkah Persiapan

### 1. Buat File Secret di GitHub
Masuk ke repository GitHub Anda -> **Settings** -> **Secrets and variables** -> **Actions**. Tambahkan:
- `FTP_SERVER`: Alamat FTP hosting Anda.
- `FTP_USERNAME`: Username FTP.
- `FTP_PASSWORD`: Password FTP.

### 2. Buat File Konfigurasi Workflow
Di komputer lokal, buat file baru di path: `.github/workflows/deploy.yml`

```yaml
name: Deploy Next.js to Shared Hosting

on:
  push:
    branches:
      - main # Jalankan otomatis saat push ke branch main

jobs:
  build_and_deploy:
    runs-on: ubuntu-latest

    steps:
      - name: Checkout Code
        uses: actions/checkout@v4

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: '20'
          cache: 'npm'

      - name: Install Dependencies
        run: npm ci

      - name: Build Project
        run: npm run build

      - name: Sync Files to Hosting
        uses: SamKirkland/FTP-Deploy-Action@v4.3.5
        with:
          server: ${{ secrets.FTP_SERVER }}
          username: ${{ secrets.FTP_USERNAME }}
          password: ${{ secrets.FTP_PASSWORD }}
          # Daftar file/folder yang dikirim (sesuai panduan sebelumnya)
          local-dir: ./ # Jika build lokal, sesuaikan ke folder hasil build jika perlu
          # Namun karena kita butuh struktur folder tertentu, 
          # alternatifnya adalah memindahkan file ke folder 'deploy' di action ini
          # sebelum dikirim.
```

### 3. Penyesuaian Struktur Folder (Opsional tapi Direkomendasikan)
Agar lebih rapi, Anda bisa menambahkan step di file YAML tadi untuk mengumpulkan file ke satu folder sebelum dikirim:

```yaml
      - name: Prepare Deployment Folder
        run: |
          mkdir deploy_ready
          cp -r .next deploy_ready/
          cp -r public deploy_ready/
          cp package.json deploy_ready/
          cp package-lock.json deploy_ready/
          cp next.config.mjs deploy_ready/
          cp server.js deploy_ready/

      - name: Sync Files to Hosting
        uses: SamKirkland/FTP-Deploy-Action@v4.3.5
        with:
          server: ${{ secrets.FTP_SERVER }}
          username: ${{ secrets.FTP_USERNAME }}
          password: ${{ secrets.FTP_PASSWORD }}
          local-dir: ./deploy_ready/
          server-dir: public_html/sub.domain.com/ # Folder tujuan di hosting
```

## Keuntungan Cara Ini:
1. **Zero Downtime**: Proses build tidak membebani server hosting.
2. **Otomatis**: Anda tidak perlu lagi buka File Manager cPanel untuk update.
3. **Aman**: Semua konfigurasi sensitif (password) tersimpan di GitHub Secrets.

Setelah file `.github/workflows/deploy.yml` ini Anda push ke GitHub, sistem CI/CD akan langsung berjalan!
