import React, { useState, useEffect } from "react";
import Layout from "./Layout";
import { getUsers, addUser, removeUser } from "../services/authService";

export default function SuperAdminPanel() {
  const [users, setUsers] = useState([]);
  const [form, setForm] = useState({ name: "", email: "", password: "", team: "" });
  const [err, setErr] = useState("");
  const [ok, setOk] = useState("");

  useEffect(() => setUsers(getUsers().filter(u => u.role === "sales")), []);

  const handleCreate = (e) => {
    e.preventDefault();
    setErr(""); setOk("");
    try {
      if (!form.name || !form.email || !form.password) throw new Error("Lengkapi semua field.");
      addUser({ email: form.email, name: form.name, password: form.password, role: "sales", team: form.team || null });
      setUsers(getUsers().filter(u => u.role === "sales"));
      setOk("Akun sales berhasil dibuat.");
      setForm({ name: "", email: "", password: "", team: "" });
    } catch (err) {
      setErr(err.message || "Gagal membuat akun.");
    }
  };

  const doDelete = (id) => {
    if (!confirm("Hapus akun sales ini?")) return;
    removeUser(id);
    setUsers(getUsers().filter(u => u.role === "sales"));
  };

  return (
    <Layout>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-slate-800">Superadmin Control</h1>
        <p className="text-slate-500 text-sm">Kelola akses tim sales.</p>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        {/* Form Card */}
        <div className="card h-fit">
          <h2 className="font-bold text-lg text-slate-800 mb-4">Buat Akun Sales Baru</h2>
          <form onSubmit={handleCreate} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-500 mb-1">Nama Lengkap</label>
              <input className="input-field" value={form.name} onChange={e=>setForm({...form, name:e.target.value})} placeholder="John Doe" />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-500 mb-1">Email</label>
              <input className="input-field" value={form.email} onChange={e=>setForm({...form, email:e.target.value})} placeholder="sales@bank.co.id" />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-500 mb-1">Password</label>
              <input type="password" className="input-field" value={form.password} onChange={e=>setForm({...form, password:e.target.value})} placeholder="******" />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-500 mb-1">Tim / Divisi (Opsional)</label>
              <input className="input-field" value={form.team} onChange={e=>setForm({...form, team:e.target.value})} placeholder="Area Jakarta Selatan" />
            </div>

            {err && <div className="text-sm text-red-600 bg-red-50 p-2 rounded">{err}</div>}
            {ok && <div className="text-sm text-green-600 bg-green-50 p-2 rounded">{ok}</div>}

            <button type="submit" className="w-full btn btn-primary mt-2">Buat Akun</button>
          </form>
        </div>

        {/* List Card */}
        <div className="card">
          <h2 className="font-bold text-lg text-slate-800 mb-4">Daftar Akun Sales ({users.length})</h2>
          <div className="space-y-3">
            {users.length === 0 && <div className="text-sm text-slate-400 italic text-center py-4">Belum ada akun sales.</div>}
            {users.map(u => (
              <div key={u.id} className="flex items-center justify-between p-3 border border-slate-100 rounded-lg hover:bg-slate-50 transition-colors">
                <div>
                  <div className="font-semibold text-slate-800">{u.name}</div>
                  <div className="text-xs text-slate-500">{u.email}</div>
                  {u.team && <div className="text-xs text-indigo-600 mt-0.5">{u.team}</div>}
                </div>
                <div className="flex items-center gap-2">
                  <button onClick={() => {navigator.clipboard?.writeText(`${u.email} / ${u.password}`); alert("Credential disalin")}} className="btn btn-ghost btn-small text-xs">
                    Copy Creds
                  </button>
                  <button onClick={()=>doDelete(u.id)} className="btn btn-small text-white bg-red-500 hover:bg-red-600 rounded">
                    Hapus
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
}