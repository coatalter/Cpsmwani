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
    // redirect based on role
    if (user.role === "superadmin") nav("/superadmin", { replace: true });
    else if (user.role === "sales") nav("/sales", { replace: true });
    else nav("/", { replace: true });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-6">
      <div className="w-full max-w-md bg-white rounded-lg shadow p-6">
        <h2 className="text-xl font-semibold mb-4">Masuk</h2>
        <form onSubmit={submit} className="space-y-3">
          <div>
            <label className="block text-sm text-gray-600">Email</label>
            <input value={email} onChange={e => setEmail(e.target.value)} className="mt-1 w-full border rounded px-3 py-2" placeholder="admin@bank.co.id" />
          </div>
          <div>
            <label className="block text-sm text-gray-600">Password</label>
            <input type="password" value={password} onChange={e => setPassword(e.target.value)} className="mt-1 w-full border rounded px-3 py-2" placeholder="password" />
          </div>
          {err && <div className="text-sm text-red-500">{err}</div>}
          <button type="submit" className="mt-2 w-full bg-indigo-600 text-white rounded py-2">Masuk</button>
        </form>

        <div className="mt-4 text-xs text-gray-500">
          Default superadmin: <b>admin@bank.co.id</b> / <b>admin123</b>
        </div>
      </div>
    </div>
  );
}
