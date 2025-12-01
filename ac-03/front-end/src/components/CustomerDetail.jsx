import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Layout from "./Layout";
import ProgressBar from "./ProgressBar";
import { fetchLeadsFromCsv } from "../services/csvService";
import { getMetadata, setContact } from "../services/contactService";

export default function CustomerDetail() {
  const { id } = useParams(); // Ambil ID dari URL
  const nav = useNavigate();
  
  const [customer, setCustomer] = useState(null);
  const [loading, setLoading] = useState(true);
  
  // State untuk form notes
  const [notes, setNotes] = useState("");
  const [subscribedChoice, setSubscribedChoice] = useState(null);

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        // 1. Ambil semua data (Simulasi fetch dari DB)
        const rows = await fetchLeadsFromCsv();
        
        // 2. Cari data yang ID-nya cocok (Karena ID kita generate dari index, kita cocokan index+1)
        // Nanti kalau sudah pakai PostgreSQL, ganti ini dengan: axios.get(`/api/customers/${id}`)
        const targetIndex = parseInt(id) - 1;
        const rawData = rows[targetIndex];

        if (!rawData) {
          alert("Data tidak ditemukan!");
          nav("/sales");
          return;
        }

        // 3. Mapping data raw ke object yang rapi
        const mapped = {
          id: parseInt(id),
          name: rawData.name || `Prospek #${id}`,
          age: rawData.age,
          job: rawData.job,
          marital: rawData.marital,
          education: rawData.education,
          balance: rawData.balance, // Asumsi ada kolom balance
          housing: rawData.housing,
          loan: rawData.loan,
          score: Number(rawData.probability),
          raw: rawData
        };

        // 4. Merge dengan Metadata (Status & Notes yang tersimpan)
        const meta = getMetadata(mapped.id);
        setCustomer({ ...mapped, ...meta });
        
        // Set form state awal
        setSubscribedChoice(meta.subscribed);
        setNotes(meta.notes || "");

      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [id, nav]);

  const handleSave = () => {
    if (!customer) return;
    setContact(customer.id, { subscribed: subscribedChoice, notes });
    alert("Perubahan berhasil disimpan!");
    // Update local state biar UI refresh tanpa reload
    setCustomer(prev => ({ ...prev, subscribed: subscribedChoice, notes }));
  };

  if (loading) return <Layout><div className="p-10 text-center text-muted">Memuat profil...</div></Layout>;
  if (!customer) return null;

  return (
    <Layout>
      {/* --- HEADER NAVIGASI --- */}
      <div className="mb-6">
        <button onClick={() => nav("/sales")} className="text-sm font-bold text-muted hover:text-main flex items-center gap-2 transition-colors">
          <span>←</span> Kembali ke Dashboard
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* --- KOLOM KIRI: PROFIL UTAMA --- */}
        <div className="space-y-6">
          <div className="card text-center">
            <div className="w-24 h-24 rounded-full bg-gradient-to-br from-indigo-100 to-purple-100 dark:from-indigo-900 dark:to-purple-900 mx-auto flex items-center justify-center text-3xl font-bold text-indigo-600 dark:text-indigo-300 shadow-inner mb-4 border-4 border-white dark:border-slate-700">
              {customer.name.slice(0, 2).toUpperCase()}
            </div>
            <h1 className="text-xl font-bold text-main">{customer.name}</h1>
            <p className="text-muted text-sm capitalize">{customer.job} • {customer.age} Tahun</p>
            
            <div className="mt-6 pt-6 border-t border-theme flex justify-center gap-4">
               {/* Status Badge Besar */}
               {customer.subscribed === true && <span className="px-4 py-2 rounded-full bg-emerald-100 text-emerald-700 font-bold text-sm border border-emerald-200">✅ Berlangganan</span>}
               {customer.subscribed === false && <span className="px-4 py-2 rounded-full bg-slate-100 text-slate-600 font-bold text-sm border border-slate-200">❌ Menolak</span>}
               {(customer.subscribed === null || customer.subscribed === undefined) && <span className="px-4 py-2 rounded-full bg-amber-100 text-amber-700 font-bold text-sm border border-amber-200">⚠️ Belum Jelas</span>}
            </div>
          </div>

          <div className="card">
            <h3 className="text-xs font-bold text-muted uppercase tracking-wider mb-4">Prediksi AI</h3>
            <div className="text-center">
              <div className="text-5xl font-extrabold text-indigo-600 dark:text-indigo-400 mb-2">
                {Math.round(customer.score * 100)}%
              </div>
              <p className="text-sm text-muted mb-4">Kemungkinan Konversi</p>
              <ProgressBar value={customer.score} />
              <p className="text-xs text-muted mt-4 bg-indigo-50 dark:bg-indigo-900/20 p-3 rounded-lg border border-indigo-100 dark:border-indigo-800">
                AI merekomendasikan prospek ini karena memiliki profil finansial yang stabil dan riwayat kredit yang baik.
              </p>
            </div>
          </div>
        </div>

        {/* --- KOLOM TENGAH & KANAN: DETAIL INFO --- */}
        <div className="lg:col-span-2 space-y-6">
          
          {/* Detail Data Diri */}
          <div className="card">
            <h3 className="text-lg font-bold text-main mb-6 border-b border-theme pb-2">Informasi Detail</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-y-6 gap-x-8">
              <div>
                <label className="text-xs text-muted font-bold uppercase">Pendidikan</label>
                <div className="text-main font-medium capitalize mt-1">{customer.education || "-"}</div>
              </div>
              <div>
                <label className="text-xs text-muted font-bold uppercase">Status Pernikahan</label>
                <div className="text-main font-medium capitalize mt-1">{customer.marital || "-"}</div>
              </div>
              <div>
                <label className="text-xs text-muted font-bold uppercase">Memiliki Rumah?</label>
                <div className="text-main font-medium capitalize mt-1">{customer.housing === "yes" ? "Ya" : "Tidak"}</div>
              </div>
              <div>
                <label className="text-xs text-muted font-bold uppercase">Memiliki Pinjaman?</label>
                <div className="text-main font-medium capitalize mt-1">{customer.loan === "yes" ? "Ya" : "Tidak"}</div>
              </div>
              <div>
                <label className="text-xs text-muted font-bold uppercase">Saldo Perkiraan</label>
                <div className="text-main font-medium capitalize mt-1">
                    {/* Format Currency IDR */}
                    {new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(customer.balance || 0)}
                </div>
              </div>
            </div>
          </div>

          {/* Form Follow Up */}
          <div className="card bg-slate-50 dark:bg-slate-800/50 border-indigo-100 dark:border-indigo-900">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-bold text-main">Update Status & Catatan</h3>
              <span className="text-xs text-muted">Terakhir diupdate: {customer.lastContacted ? new Date(customer.lastContacted).toLocaleString() : "Belum pernah"}</span>
            </div>
            
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-muted uppercase mb-2">Status Sales</label>
                <div className="flex gap-3">
                    <button onClick={() => setSubscribedChoice(true)} className={`contact-choice ${subscribedChoice === true ? "contact-choice-yes" : "border"}`}>Berlangganan</button>
                    <button onClick={() => setSubscribedChoice(false)} className={`contact-choice ${subscribedChoice === false ? "contact-choice-no" : "border"}`}>Menolak</button>
                    <button onClick={() => setSubscribedChoice(null)} className={`contact-choice ${subscribedChoice === null ? "contact-choice-unk" : "border"}`}>Belum Jelas</button>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-muted uppercase mb-2">Catatan Harian</label>
                <textarea 
                  className="input-field min-h-[100px]" 
                  placeholder="Hasil pembicaraan via telepon/whatsapp..."
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                />
              </div>

              <div className="flex justify-end pt-2">
                <button onClick={handleSave} className="btn btn-primary px-8">Simpan Perubahan</button>
              </div>
            </div>
          </div>

        </div>
      </div>
    </Layout>
  );
}