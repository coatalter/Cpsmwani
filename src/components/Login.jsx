import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { authenticate } from "../services/authService";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [err, setErr] = useState("");
  const nav = useNavigate();

  const submit = (e) => {
    e.preventDefault();
    const user = authenticate(email.trim(), password);
    if (!user) {
      setErr("Email atau password salah");
      return;
    }
    if (user.role === "superadmin") nav("/superadmin", { replace: true });
    else if (user.role === "sales") nav("/sales", { replace: true });
    else nav("/", { replace: true });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 p-6">
      {/* Ganti style manual dengan class 'card' */}
      <div className="w-full max-w-md card">
        <h2 className="text-xl font-bold mb-6 text-center text-slate-800">Masuk ke JMK Sales</h2>
        <form onSubmit={submit} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wide mb-1">Email</label>
            {/* Gunakan class 'input-field' */}
            <input 
              value={email} 
              onChange={e => setEmail(e.target.value)} 
              className="input-field" 
              placeholder="admin@bank.co.id" 
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wide mb-1">Password</label>
            <input 
              type="password" 
              value={password} 
              onChange={e => setPassword(e.target.value)} 
              className="input-field" 
              placeholder="••••••••" 
            />
          </div>
          {err && <div className="text-sm text-red-500 bg-red-50 p-2 rounded border border-red-100">{err}</div>}
          
          {/* Gunakan class 'btn' dan 'btn-primary' */}
          <button type="submit" className="w-full btn btn-primary py-2.5">
            Masuk
          </button>
        </form>

        <div className="mt-6 text-center text-xs text-slate-400">
          Default superadmin: <br/> <b className="text-slate-600">admin@bank.co.id</b> / <b className="text-slate-600">admin123</b>
        </div>
      </div>
    </div>
  );
}