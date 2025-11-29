import React, { useState, useMemo, useEffect } from "react";
import Layout from "./Layout";
import KPI from "./KPI";
import CustomerTable from "./CustomerTable";
import { fetchLeadsFromCsv } from "../services/csvService";

/**
 * Sales dashboard (role 'sales')
 * Sekarang menggunakan data dari CSV hasil model ML
 */
export default function SalesDashboard() {
  const [query, setQuery] = useState("");
  const [minScore, setMinScore] = useState(0);
  const [jobFilter, setJobFilter] = useState("All");
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);

  // Load data dari CSV saat pertama kali component dirender
  useEffect(() => {
    const load = async () => {
      try {
        const rows = await fetchLeadsFromCsv();
        // mapping baris CSV → shape yang dipakai CustomerTable
        const mapped = rows.map((row, index) => ({
          id: index + 1,
          name: `Prospek #${index + 1}`,       // CSV tidak punya nama, jadi label generic
          age: row.age,
          job: row.job,
          marital: row.marital,
          education: row.education,
          loanStatus: row.loan === "yes" ? "Punya pinjaman" : "Tidak punya pinjaman",
          score: row.probability,              // 0–1
          probability: row.probability,
          actual: row.actual,
          predicted: row.predicted,
          raw: row,                            // kalau butuh akses kolom lain di detail
        }));

        setCustomers(mapped);
        console.log("Loaded customers from CSV:", mapped.slice(0, 5));
      } catch (err) {
        console.error("Gagal memuat CSV:", err);
      } finally {
        setLoading(false);
      }
    };

    load();
  }, []);

  // daftar pekerjaan unik untuk dropdown
  const jobs = useMemo(() => {
    const set = new Set(customers.map((c) => c.job));
    return ["All", ...Array.from(set)];
  }, [customers]);

  // filter & sort
  const filtered = useMemo(() => {
    return customers
      .filter((c) => c.score >= minScore)
      .filter((c) => (jobFilter === "All" ? true : c.job === jobFilter))
      .filter((c) =>
        (c.name + c.job + c.loanStatus)
          .toLowerCase()
          .includes(query.toLowerCase())
      )
      .sort((a, b) => b.score - a.score); // probability desc
  }, [customers, query, minScore, jobFilter]);

  const total = customers.length;
  const topLeads = customers.filter((c) => c.score >= 0.7).length;
  const convRate = total > 0 ? `${Math.round((topLeads / total) * 100)}%` : "0%";

  if (loading) {
    return (
      <Layout>
        <div className="p-6">Loading data prospek dari model ML...</div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-semibold">Daftar Prospek Prioritas</h1>
        <div className="flex items-center gap-3">
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Cari"
            className="border rounded px-3 py-2"
          />
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-4 mb-6">
        <KPI title="Total Prospek" value={total} />
        <KPI title="Prospek Top (>=70%)" value={topLeads} />
        <KPI title="Estimasi Conversion" value={convRate} delta="+3%" />
      </div>

      <div className="grid grid-cols-3 gap-6">
        <div className="col-span-2 bg-white rounded shadow p-4">
          <div className="text-sm text-gray-600 mb-3">
            Sorted by probability (desc)
          </div>
          <CustomerTable customers={filtered} />
        </div>

        <aside className="bg-white rounded shadow p-4 h-fit">
          <div className="text-sm text-gray-600">Filter cepat</div>
          <div className="mt-3">
            <label className="text-xs">
              Probabilitas min: {Math.round(minScore * 100)}%
            </label>
            <input
              type="range"
              min={0}
              max={1}
              step={0.01}
              value={minScore}
              onChange={(e) => setMinScore(parseFloat(e.target.value))}
              className="w-full"
            />
          </div>
          <div className="mt-3">
            <label className="text-xs">Pekerjaan</label>
            <select
              className="mt-1 w-full border rounded px-2 py-1"
              value={jobFilter}
              onChange={(e) => setJobFilter(e.target.value)}
            >
              {jobs.map((j) => (
                <option key={j} value={j}>
                  {j}
                </option>
              ))}
            </select>
          </div>
        </aside>
      </div>
    </Layout>
  );
}
