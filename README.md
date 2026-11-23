# PerakitPC TJKT

Aplikasi web interaktif untuk siswa SMK jurusan Teknik Jaringan Komputer dan Telekomunikasi (TJKT):

- **Materi Pembelajaran**: pengenalan 9 komponen perangkat keras dan SOP perakitan PC sesuai K3LH.
- **Simulasi Perakitan 3D**: siswa merakit PC dari awal sampai POST berhasil. Komponen diseret langsung ke slotnya (atau diketuk, lalu ketuk slot), lengkap dengan validasi urutan teknis, mini-simulasi Front Panel, Mode Latihan, Mode Ujian, dan kartu hasil praktik.
- **PWA**: bisa diinstal di PC dan HP, dan bisa dipakai offline. Progres dan riwayat tersimpan di `localStorage`.

Teknologi: React 18, Tailwind (CDN), Three.js r128, tanpa proses build. Seluruh aplikasi ada di satu berkas `index.html`.

## Menjalankan di komputer

Service worker hanya aktif lewat `https://` atau `localhost`, jadi jalankan server lokal:

```bash
python3 -m http.server 8080
# buka http://localhost:8080
```

Membuka `index.html` langsung (file://) tetap bisa dipakai, tetapi tanpa mode offline/instal.


## Cara unggah ke GitHub (penting)

GitHub **tidak mengekstrak file .zip** secara otomatis. Jika file `.zip` diunggah apa adanya, situs tidak akan berubah.

1. Ekstrak zip. Hasilnya adalah file dan folder langsung (`index.html`, `sw.js`, `manifest.webmanifest`, `versi.txt`, dan seterusnya), bukan di dalam folder lain.
2. Di repositori GitHub: **Add file > Upload files**, lalu seret **semua isi** hasil ekstrak (bukan file zip-nya). Pastikan `index.html` berada di **akar** repositori, bukan di dalam subfolder.
3. Jika ada berkas lama dengan nama sama, GitHub akan menimpanya. Klik **Commit changes**.
4. Folder tersembunyi `.github` dan berkas `.nojekyll` sering tidak ikut terseret. Jika begitu, di **Settings > Pages** pilih **Deploy from a branch**, branch `main`, folder `/ (root)`. Cara ini tidak membutuhkan folder `.github`.
5. Tunggu 1 sampai 2 menit, lalu buka `https://NAMA.github.io/REPO/versi.txt`. Isinya harus sama dengan versi di bagian bawah aplikasi. Jika masih versi lama, tekan muat ulang keras (Ctrl+Shift+R) atau hapus data situs di browser.

## Deploy ke GitHub Pages

1. Buat repositori baru di GitHub, lalu unggah seluruh isi folder ini (termasuk folder `.github`).
2. Buka **Settings > Pages**, pada **Source** pilih **GitHub Actions**.
3. Push ke branch `main`. Workflow `Deploy ke GitHub Pages` akan berjalan, lalu aplikasi tersedia di `https://<username>.github.io/<nama-repo>/`.

Alternatif tanpa Actions: **Settings > Pages > Deploy from a branch**, pilih `main` dan folder `/ (root)`.

## Pemakaian offline

Buka alamat Pages sekali dengan internet. Service worker menyimpan berkas aplikasi dan pustaka (React, Three.js, Tailwind) ke cache. Setelah itu aplikasi bisa dibuka tanpa internet, dan bisa diinstal lewat tombol **Install Aplikasi (Offline Mode)** di header.

## Struktur berkas

| Berkas | Fungsi |
| --- | --- |
| `index.html` | Seluruh aplikasi (materi, simulasi 3D, PWA) |
| `sw.js` | Service worker (cache offline) |
| `manifest.webmanifest` | Manifest PWA |
| `icon.svg`, `icon-192.png`, `icon-512.png` | Ikon aplikasi |
| `.github/workflows/pages.yml` | Deploy otomatis ke GitHub Pages |
| `.nojekyll` | Mematikan pemrosesan Jekyll |

## Jika yang tampil masih versi lama (2D)

1. **Pastikan berkas yang diunggah benar.** Versi 3D adalah `index.html` di paket ini. Hapus berkas lama dari repositori, yaitu `perakitpc-tjkt.html` dan `sw.js` versi lama (versi 2D), lalu ganti dengan isi paket ini. Cek: buka `index.html` di GitHub dan cari teks `three.min.js`. Jika ada, itu versi 3D.
2. **Tunggu deployment selesai.** Lihat tab **Actions** di repositori sampai tanda centang hijau. Pages bisa butuh 1 sampai 2 menit.
3. **Bersihkan cache browser.** Service worker lama bisa menyajikan versi 2D dari cache. Di Chrome: tekan F12, tab **Application**, **Service Workers**, klik **Unregister**, lalu **Storage**, **Clear site data**, dan muat ulang. Di HP: hapus data situs atau hapus aplikasi yang sudah diinstal, lalu buka lagi.
4. **Verifikasi:** di bagian bawah halaman harus tertulis **Versi 4.2 (rak 2: hanya kepala kabel)** dan tombol "Zoom In (+)" terlihat di simulasi.
