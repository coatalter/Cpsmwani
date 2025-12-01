import React, { useState, useMemo, useEffect } from "react";
import Layout from "./Layout";
import KPI from "./KPI";
import CustomerTable from "./CustomerTable";
import Pagination from "./Pagination";
import SalesCharts from "./SalesCharts"; 
import Leaderboard from "./Leaderboard";       // Fitur 4
import RecentActivity from "./RecentActivity"; // Fitur 5
import { fetchLeadsFromCsv } from "../services/csvService";
import { getAllMetadata } from "../services/contactService";  

export default function SalesDashboard() {
  const [query, setQuery] = useState("");
  const [minScore, setMinScore] = useState(0);
  const [jobFilter, setJobFilter] = useState("All");
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);

  // Pagination state
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
        console.error("Gagal memuat CSV:", err);
      } finally {
        setLoading(false);
      }
    };

    load();
  }, []);

  const jobs = useMemo(() => {
    const set = new Set(customers.map((c) => c.job).filter(Boolean));
    return ["All", ...Array.from(set)];
  }, [customers]);

  const filtered = useMemo(() => {
    return customers
      .filter((c) => c.score >= minScore)
      .filter((c) => (jobFilter === "All" ? true : c.job === jobFilter))
      .filter((c) =>
        (c.name + (c.job || "")).toLowerCase().includes(query.toLowerCase())
      )
      .sort((a, b) => b.score - a.score);
  }, [customers, query, minScore, jobFilter]);

  useEffect(() => {
    setPage(1);
  }, [query, minScore, jobFilter]);

  const total = filtered.length;
  
  const paginated = useMemo(() => {
    const start = (page - 1) * pageSize;
    return filtered.slice(start, start + pageSize);
  }, [filtered, page, pageSize]);

  const topLeads = customers.filter((c) => c.score >= 0.7).length;
  const convRate = customers.length > 0 ? `${Math.round((topLeads / customers.length) * 100)}%` : "0%";

  if (loading) {
    return (
      <Layout>
        <div className="p-10 text-center text-muted animate-pulse">Loading data prospek...</div>
      </Layout>
    );
  }

  return (
    <Layout>
      {/* 1. HEADER & SEARCH */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-8 gap-4">
        <div>
          <h1 className="text-2xl font-bold text-main">Dashboard Prospek</h1>
          <p className="text-muted text-sm mt-1">Kelola dan hubungi prospek prioritas tinggi.</p>
        </div>
        <div className="w-full sm:w-72">
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="🔍 Cari nama atau pekerjaan..."
            className="input-field"
          />
        </div>
      </div>

      {/* 2. KPI CARDS */}
      <div className="grid md:grid-cols-3 gap-6 mb-8">
        <KPI title="Total Prospek" value={customers.length} />
        <KPI title="Prospek Hot (>=70%)" value={topLeads} />
        <KPI title="Potensi Konversi" value={convRate} />
      </div>

      {/* 3. CHARTS SECTION */}
      <SalesCharts data={filtered.length > 0 ? filtered : customers} />

      {/* 4. TABLE & FILTER SECTION */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 mb-8">
        {/* Kolom Kiri: Tabel */}
        <div className="lg:col-span-3 card h-fit">
          <div className="flex items-center justify-between mb-6 pb-4 border-b" style={{ borderColor: 'var(--border-color)' }}>
            <h3 className="font-bold text-main">Daftar Prospek</h3>
            <span className="text-xs text-muted font-medium bg-opacity-10 px-3 py-1 rounded-full border border-theme">
              Sorted by Probability
            </span>
          </div>

          <CustomerTable customers={paginated} onContactSaved={() => {
             const allMeta = getAllMetadata();
             setCustomers(prev => prev.map(c => {
               const m = allMeta[c.id] || {};
               return { ...c, lastContacted: m.lastContacted || null, subscribed: typeof m.subscribed === "boolean" ? m.subscribed : null, notes: m.notes || "" };
             }));
          }} />

          <Pagination
            total={total}
            page={page}
            pageSize={pageSize}
            onPageChange={(p) => setPage(p)}
            onPageSizeChange={(s) => { setPageSize(s); setPage(1); }}
            pageSizeOptions={pageSizeOptions}
          />
        </div>

        {/* Kolom Kanan: Filter */}
        <aside className="card h-fit sticky top-6">
          <h3 className="font-bold text-main mb-6">Filter Data</h3>
          
          <div className="space-y-6">
            <div>
              <div className="flex justify-between mb-2">
                <label className="text-xs font-bold text-muted uppercase tracking-wide">Min Probability</label>
                <span className="text-xs font-bold text-indigo-600">{Math.round(minScore * 100)}%</span>
              </div>
              <input
                type="range" min={0} max={1} step={0.01}
                value={minScore}
                onChange={(e) => setMinScore(parseFloat(e.target.value))}
                className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-indigo-600"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-muted uppercase tracking-wide mb-2">Pekerjaan</label>
              <select
                className="input-field cursor-pointer font-medium"
                value={jobFilter}
                onChange={(e) => setJobFilter(e.target.value)}
              >
                {jobs.map((j) => (
                  <option key={j} value={j}>{j}</option>
                ))}
              </select>
            </div>
            
            <div className="pt-6 border-t" style={{ borderColor: 'var(--border-color)' }}>
                <button 
                  onClick={() => {setMinScore(0); setJobFilter("All"); setQuery("")}} 
                  className="w-full btn btn-ghost btn-small text-xs uppercase tracking-wider font-bold"
                >
                    Reset Filter
                </button>
            </div>
          </div>
        </aside>
      </div>

      {/* 5. BOTTOM SECTION: LEADERBOARD & ACTIVITY LOG */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <Leaderboard />
        <RecentActivity />
      </div>

    </Layout>
  );
}