# 🚀 JMK Sales Dashboard - Capstone Project

![Accenture Capstone Badge](https://img.shields.io/badge/Accenture-Capstone%20Project-purple?style=for-the-badge&logo=accenture)
![Cohort](https://img.shields.io/badge/Cohort-AC--03-blue?style=for-the-badge)
![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)

> **Sistem Manajemen Hubungan Pelanggan (CRM) & Dashboard Analitik Sales Berbasis Web.**

Project ini dikembangkan sebagai **Final Capstone Project** untuk program **Accenture (Cohort RB dan ML )**. Aplikasi ini dirancang untuk membantu tim sales mengelola prospek (leads), memantau performa penjualan, dan menganalisis data pelanggan potensial menggunakan prediksi berbasis skor probabilitas.

---

## 📸 Screenshots

| Light Mode | Dark Mode |
|:---:|:---:|
| ![Dashboard Light](https://via.placeholder.com/600x300?text=Screenshot+Light+Mode) | ![Dashboard Dark](https://via.placeholder.com/600x300?text=Screenshot+Dark+Mode) |
| *Dashboard Interaktif* | *High Contrast Dark Mode* |

---

## ✨ Fitur Utama

Aplikasi ini berfokus pada pengalaman pengguna (UX) yang modern dan penyajian data yang informatif.

### 📊 1. Dashboard Analitik
* **Visualisasi Data:** Grafik interaktif (Pie Chart & Bar Chart) menggunakan `recharts` untuk melihat status konversi dan demografi pekerjaan.
* **KPI Cards:** Ringkasan cepat total prospek, prospek prioritas (Hot Leads), dan estimasi konversi.

### 🎯 2. Manajemen Prospek (Leads)
* **Smart Table:** Tabel data prospek dengan fitur sorting berdasarkan probabilitas konversi.
* **Advanced Filtering:** Filter data berdasarkan nilai minimum skor (Slide range) dan jenis pekerjaan.
* **Pagination:** Navigasi data yang mulus dengan custom pagination.

### 👤 3. Profil Detail Pelanggan
* Halaman detail (`/customer/:id`) yang menampilkan informasi komprehensif.
* **Prediksi AI:** Visualisasi skor probabilitas pelanggan untuk berlangganan.
* **Update Status:** Form untuk mengubah status (Berlangganan/Menolak) dan menambahkan catatan sales.

### 🏆 4. Gamifikasi & Audit
* **Sales Leaderboard:** Menampilkan performa sales terbaik bulan ini.
* **Activity Log:** Riwayat aktivitas real-time (Audit Trail) yang mencatat setiap perubahan data yang dilakukan oleh user.

### 🎨 5. UI/UX Modern
* **Dark Mode Support:** Tema adaptif (Terang/Gelap) yang nyaman di mata dengan kontras tinggi.
* **Responsive Design:** Tampilan optimal di Desktop dan Tablet.

---

## 🛠️ Teknologi yang Digunakan

### Frontend
* **React.js (Vite):** Framework utama untuk performa tinggi.
* **React Router DOM:** Manajemen navigasi halaman.
* **Recharts:** Library visualisasi data/grafik.
* **Lucide React:** Ikon set modern.

### Styling
* **Tailwind CSS:** Utility-first CSS framework.
* **CSS Variables:** Manajemen tema (Dark/Light) yang terpusat dan konsisten.

### Data Simulation (Current State)
* **CSV Parsing:** Simulasi fetching data prospek dari dataset eksternal.
* **LocalStorage:** Penyimpanan sementara untuk status kontak dan log aktivitas.

---

## 🚀 Cara Menjalankan Project

Ikuti langkah-langkah berikut untuk menjalankan project di lokal komputer Anda:

1.  **Clone Repository**
    ```bash
    git clone [https://github.com/username-anda/nama-repo.git](https://github.com/username-anda/nama-repo.git)
    cd nama-repo
    ```

2.  **Install Dependencies**
    Pastikan Node.js sudah terinstall.
    ```bash
    npm install
    ```

3.  **Jalankan Server Development**
    ```bash
    npm run dev
    ```

4.  **Buka di Browser**
    Akses `http://localhost:5173` 

---

## 🗺️ Roadmap & Pengembangan Lanjut

Project ini saat ini menggunakan *Mock Data Service*. Untuk pengembangan selanjutnya menuju *Production Ready*, rencana kami adalah:

- [ ] **Migrasi Backend:** Mengganti CSV Service dengan REST API.
- [ ] **Database:** Integrasi dengan **PostgreSQL** untuk penyimpanan data prospek yang persisten.
- [ ] **Authentication:** Implementasi JWT untuk login yang aman (Superadmin vs Sales).
- [ ] **Machine Learning API:** Menghubungkan skor probabilitas langsung dengan model ML Python yang berjalan di server.

---

## 👥 Tim Pengembang (Accenture AC-03)

Project ini dibangun dengan ❤️ oleh Tim Capstone:

Rahasia dulu karena kami blm selesai proyek nya.

---

## 📄 Lisensi

Didistribusikan di bawah Lisensi MIT. Lihat `LICENSE` untuk informasi lebih lanjut.

---

*Project ini dibuat semata-mata untuk tujuan pendidikan dan evaluasi Capstone Project Accenture.*
