# Cpsmwani 🚀

**AC-03 — Predictive Lead Scoring**

> Dua prototype dalam satu repo: insight personal untuk pembelajar dan portal prioritas leads untuk tim sales. Dirancang untuk demo capstone: cepat, jelas, dan mudah direproduksi.

---

## 🚩 Elevator pitch (1 kalimat)

Berikan insight yang membuat keputusan jadi mudah — untuk siswa (apa yang harus dipelajari) dan tim sales (siapa yang harus dihubungi) — melalui notebook ML dan dashboard interaktif.

---

## ✨ Mengapa proyek ini menarik?

* **Dua domain, satu pendekatan** — tunjukkan kemampuan tim memecah masalah nyata di edukasi dan perbankan menggunakan pipeline ML yang sama.
* **Demo yang "menjual"** — stakeholder langsung melihat dampak (top leads dan learning suggestions) dalam 3–5 menit.
* **Reuse maksimum** — UI, model-serving, dan pola arsitektur dapat dipakai ulang sehingga effort tim efisien.

---

## 🎯 Highlight MVP

* **DC-08 — AI Learning Insight**: ekstraksi fitur aktivitas, kategorisasi gaya belajar (rule-based / clustering), kartu insight per-user + rekomendasi singkat.
* **AC-03 — Predictive Lead Scoring**: EDA pada Bank Marketing (UCI), baseline model (LogReg / RandomForest / XGBoost), API scoring, dashboard prioritas leads.

---

## 🧩 Fitur Utama (ringkas)

* Dashboard berisi tabel terurut, filter, dan detail modal.
* Endpoint model untuk scoring batch & single.
* Notebook reproducible (EDA → modeling → evaluation).
* Komponen frontend reusable (Table, Card, Chart, Modal).

---

## 🛠️ Tech stack (rekomendasi cepat)

* **ML**: Python, pandas, scikit-learn, XGBoost, Jupyter
* **API**: FastAPI + Uvicorn (atau Next.js API routes)
* **Frontend**: React + Tailwind CSS / Next.js
* **Prototype cepat**: Streamlit (opsional)

---

## 🚀 Quickstart (local)

1. Clone repo & buat virtual env.
2. Install dependencies (`pip install -r requirements.txt`, `npm install` untuk frontend).
3. Jalankan notebook untuk eksplorasi.
4. Serve model dengan FastAPI: `uvicorn ac03/api/main:app --reload`.
5. Jalankan frontend: `npm run dev`.

> Catatan: README lengkap dengan contoh perintah dan struktur repo ada di panel dokumen (lihat file README di canvas).

---

## 🗂️ Struktur repo (singkat)

`/ac03`, `/dc08`, `/shared`, `/notebooks`, `requirements.txt`, `package.json` — setiap modul punya `notebooks/`, `api/`, dan `sample_data/`.

---

## 🧭 Roadmap pasca-MVP

* Explainability (SHAP) untuk AC-03.
* Penyempurnaan insight DC-08 (personalized learning plan).
* CI/CD + tests untuk deploy reproducible demo.

---

## 🤝 Cara kontribusi

* Buat branch `feature/<deskripsi>`.
* Buka PR dengan deskripsi & langkah reproduce.
* Label: `ac03` atau `dc08`.

---

## 📬 Kontak tim

Tim Cpsmwani — 3x Frontend (React) & 2x ML Engineers. Untuk pertanyaan, buka issue atau hubungi PM tim.

---

**Terima kasih telah mampir — ayo buat demo yang memukau!** ✨
