import React, { useState, useEffect } from "react";
import Layout from "./Layout";
import { getUsers, addUser, removeUser } from "../services/authService";

/**
 * Superadmin panel: list sales accounts + create new sales account (no DB)
 */
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
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-semibold">Superadmin — Manage Sales</h1>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow p-4">
          <h2 className="font-medium">Buat Akun Sales</h2>
          <form onSubmit={handleCreate} className="mt-3 space-y-3">
            <div>
              <label className="text-xs text-gray-600">Nama</label>
              <input className="mt-1 w-full border rounded px-3 py-2" value={form.name} onChange={e=>setForm({...form, name:e.target.value})} />
            </div>
            <div>
              <label className="text-xs text-gray-600">Email</label>
              <input className="mt-1 w-full border rounded px-3 py-2" value={form.email} onChange={e=>setForm({...form, email:e.target.value})} />
            </div>
            <div>
              <label className="text-xs text-gray-600">Password</label>
              <input type="password" className="mt-1 w-full border rounded px-3 py-2" value={form.password} onChange={e=>setForm({...form, password:e.target.value})} />
            </div>
            <div>
              <label className="text-xs text-gray-600">Team (opsional)</label>
              <input className="mt-1 w-full border rounded px-3 py-2" value={form.team} onChange={e=>setForm({...form, team:e.target.value})} />
            </div>

            {err && <div className="text-sm text-red-500">{err}</div>}
            {ok && <div className="text-sm text-green-600">{ok}</div>}

            <button type="submit" className="mt-2 bg-indigo-600 text-white px-4 py-2 rounded">Buat Akun</button>
          </form>
        </div>

        <div className="bg-white rounded-lg shadow p-4">
          <h2 className="font-medium">Daftar Sales</h2>
          <div className="mt-3 space-y-2">
            {users.length === 0 && <div className="text-sm text-gray-500">Belum ada akun sales.</div>}
            {users.map(u => (
              <div key={u.id} className="flex items-center justify-between border-b py-2">
                <div>
                  <div className="font-medium">{u.name}</div>
                  <div className="text-xs text-gray-500">{u.email} · {u.team || "-"}</div>
                </div>
                <div className="flex items-center gap-2">
                  <button onClick={() => navigator.clipboard?.writeText(`${u.email} / ${u.password}`)} className="text-xs border rounded px-2 py-1">Copy creds</button>
                  <button onClick={()=>doDelete(u.id)} className="text-xs text-red-500 border rounded px-2 py-1">Hapus</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
}
