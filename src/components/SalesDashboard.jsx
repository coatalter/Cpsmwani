import React, { useState, useMemo, useEffect } from "react";
import Layout from "./Layout";
import KPI from "./KPI";
import CustomerTable from "./CustomerTable";
import Pagination from "./Pagination";
import { fetchLeadsFromCsv } from "../services/csvService";
import { getAllMetadata } from "../services/contactService";  

export default function SalesDashboard() {
  const [query, setQuery] = useState("");
  const [minScore, setMinScore] = useState(0);
  const [jobFilter, setJobFilter] = useState("All");
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);

  // pagination state
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const pageSizeOptions = [5, 10, 25, 50, 100];

  useEffect(() => {
    const load = async () => {
      try {
        setLoading(true);
        const rows = await fetchLeadsFromCsv();
        const mapped = rows.map((row, index) => ({
          id: index + 1,
          name: row.name || `Prospek #${index + 1}`,
          age: row.age,
          job: row.job,
          score: Number(row.probability),
          raw: row,
        }));
        const allMeta = getAllMetadata();
        const merged = mapped.map((c) => {
          const m = allMeta[c.id] || {};
          return { ...c, lastContacted: m.lastContacted || null, subscribed: typeof m.subscribed === "boolean" ? m.subscribed : null, notes: m.notes || "" };
        });
        setCustomers(merged);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  const jobs = useMemo(() => ["All", ...Array.from(new Set(customers.map((c) => c.job).filter(Boolean)))], [customers]);

  const filtered = useMemo(() => {
    return customers
      .filter((c) => c.score >= minScore)
      .filter((c) => (jobFilter === "All" ? true : c.job === jobFilter))
      .filter((c) => (c.name + (c.job || "")).toLowerCase().includes(query.toLowerCase()))
      .sort((a, b) => b.score - a.score);
  }, [customers, query, minScore, jobFilter]);

  useEffect(() => setPage(1), [query, minScore, jobFilter]);

  const paginated = useMemo(() => {
    const start = (page - 1) * pageSize;
    return filtered.slice(start, start + pageSize);
  }, [filtered, page, pageSize]);

  const topLeads = customers.filter((c) => c.score >= 0.7).length;
  const convRate = customers.length > 0 ? `${Math.round((topLeads / customers.length) * 100)}%` : "0%";

  if (loading) return <Layout><div className="p-10 text-center text-muted">Loading data...</div></Layout>;

  return (
    <Layout>
      <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-8 gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Dashboard Prospek</h1>
          <p className="text-slate-500 text-sm mt-1">Kelola dan hubungi prospek prioritas tinggi.</p>
        </div>
        <div className="w-full sm:w-72">
           {/* Gunakan class input-field */}
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="🔍 Cari nama atau pekerjaan..."
            className="input-field"
          />
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-6 mb-8">
        <KPI title="Total Prospek" value={customers.length} />
        <KPI title="Prospek Hot (>=70%)" value={topLeads} />
        <KPI title="Potensi Konversi" value={convRate} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Kolom Kiri: Tabel (3 bagian) */}
        {/* Gunakan class 'card' */}
        <div className="lg:col-span-3 card h-fit">
          <div className="flex items-center justify-between mb-4 pb-4 border-b border-slate-100">
            <h3 className="font-semibold text-slate-700">Daftar Prospek</h3>
            <span className="text-xs text-slate-400 bg-slate-50 px-2 py-1 rounded">Sorted by Probability</span>
          </div>

          <CustomerTable customers={paginated} onContactSaved={() => {
             const allMeta = getAllMetadata();
             setCustomers(prev => prev.map(c => {
               const m = allMeta[c.id] || {};
               return { ...c, lastContacted: m.lastContacted || null, subscribed: typeof m.subscribed === "boolean" ? m.subscribed : null, notes: m.notes || "" };
             }));
          }} />

          <Pagination
            total={filtered.length}
            page={page}
            pageSize={pageSize}
            onPageChange={setPage}
            onPageSizeChange={(s) => { setPageSize(s); setPage(1); }}
            pageSizeOptions={pageSizeOptions}
          />
        </div>

        {/* Kolom Kanan: Filter (1 bagian) */}
        {/* Gunakan class 'card' */}
        <aside className="card h-fit sticky top-6">
          <h3 className="font-semibold text-slate-700 mb-4">Filter Data</h3>
          
          <div className="space-y-5">
            <div>
              <div className="flex justify-between mb-2">
                <label className="text-xs font-semibold text-slate-500 uppercase">Min Probability</label>
                <span className="text-xs font-bold text-indigo-600">{Math.round(minScore * 100)}%</span>
              </div>
              <input
                type="range" min={0} max={1} step={0.01}
                value={minScore}
                onChange={(e) => setMinScore(parseFloat(e.target.value))}
                className="w-full accent-indigo-600 cursor-pointer"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-500 uppercase mb-2">Pekerjaan</label>
              <select
                className="input-field cursor-pointer"
                value={jobFilter}
                onChange={(e) => setJobFilter(e.target.value)}
              >
                {jobs.map((j) => <option key={j} value={j}>{j}</option>)}
              </select>
            </div>
            
            <div className="pt-4 border-t border-slate-100">
                <button onClick={() => {setMinScore(0); setJobFilter("All"); setQuery("")}} className="w-full btn btn-ghost btn-small text-xs">
                    Reset Filter
                </button>
            </div>
          </div>
        </aside>
      </div>
    </Layout>
  );
}