import React, { useState, useMemo } from "react";
import Layout from "./Layout";
import KPI from "./KPI";
import ProgressBar from "./ProgressBar";
import CustomerTable from "./CustomerTable";
import MOCK_CUSTOMERS from "../utils/mockData";

/**
 * Sales dashboard (dipakai oleh user role 'sales')
 * menampilkan prospek prioritas — menggunakan mock data
 */
export default function SalesDashboard() {
  const [query, setQuery] = useState("");
  const [minScore, setMinScore] = useState(0);
  const [jobFilter, setJobFilter] = useState("All");

  const jobs = useMemo(() => ["All", ...Array.from(new Set(MOCK_CUSTOMERS.map(c => c.job)))], []);

  const filtered = useMemo(() => {
    return MOCK_CUSTOMERS
      .filter(c => c.score >= minScore)
      .filter(c => jobFilter === "All" ? true : c.job === jobFilter)
      .filter(c => (c.name + c.job + c.loanStatus).toLowerCase().includes(query.toLowerCase()))
      .sort((a,b) => b.score - a.score);
  }, [query, minScore, jobFilter]);

  const total = MOCK_CUSTOMERS.length;
  const topLeads = MOCK_CUSTOMERS.filter(c=>c.score>=0.7).length;
  const convRate = `${Math.round((topLeads/total)*100)}%`;

  return (
    <Layout>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-semibold">Daftar Prospek Prioritas</h1>
        <div className="flex items-center gap-3">
          <input value={query} onChange={e=>setQuery(e.target.value)} placeholder="Cari" className="border rounded px-3 py-2" />
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-4 mb-6">
        <KPI title="Total Prospek" value={total} />
        <KPI title="Prospek Top (>=70%)" value={topLeads} />
        <KPI title="Estimasi Conversion" value={convRate} delta="+3%" />
      </div>

      <div className="grid grid-cols-3 gap-6">
        <div className="col-span-2 bg-white rounded shadow p-4">
          <div className="text-sm text-gray-600 mb-3">Sorted by probability (desc)</div>
          <CustomerTable customers={filtered} />
        </div>

        <aside className="bg-white rounded shadow p-4 h-fit">
          <div className="text-sm text-gray-600">Filter cepat</div>
          <div className="mt-3">
            <label className="text-xs">Probabilitas min: {Math.round(minScore*100)}%</label>
            <input type="range" min={0} max={1} step={0.01} value={minScore} onChange={e=>setMinScore(parseFloat(e.target.value))} className="w-full" />
          </div>
          <div className="mt-3">
            <label className="text-xs">Pekerjaan</label>
            <select className="mt-1 w-full border rounded px-2 py-1" value={jobFilter} onChange={e=>setJobFilter(e.target.value)}>
              {jobs.map(j => <option key={j} value={j}>{j}</option>)}
            </select>
          </div>
        </aside>
      </div>
    </Layout>
  );
}
