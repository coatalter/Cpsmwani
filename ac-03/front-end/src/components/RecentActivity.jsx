import React, { useEffect, useState } from "react";
import { getLogs } from "../services/contactService";

export default function RecentActivity() {
  const [logs, setLogs] = useState([]);

  // Load logs setiap kali komponen muncul
  useEffect(() => {
    setLogs(getLogs());
    
    // Interval check setiap 2 detik (biar kerasa realtime kalau ada tab lain update)
    const interval = setInterval(() => {
      setLogs(getLogs());
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="card h-full flex flex-col">
      <h3 className="font-bold text-main mb-6">🕒 Riwayat Aktivitas</h3>
      
      <div className="flex-1 overflow-y-auto pr-2 space-y-5 custom-scrollbar">
        {logs.length === 0 && (
          <p className="text-sm text-muted italic text-center py-10">Belum ada aktivitas tercatat.</p>
        )}

        {logs.map((log, idx) => (
          <div key={idx} className="flex gap-3 relative pb-5 last:pb-0">
            {/* Garis Vertikal (Timeline) */}
            {idx !== logs.length - 1 && (
              <div className="absolute left-[15px] top-8 bottom-0 w-0.5 bg-slate-100 dark:bg-slate-700"></div>
            )}

            {/* Icon Bulat */}
            <div className="w-8 h-8 rounded-full bg-indigo-50 dark:bg-indigo-900/30 flex-shrink-0 flex items-center justify-center border border-indigo-100 dark:border-indigo-800 z-10">
              <span className="text-xs">⚡</span>
            </div>

            {/* Konten */}
            <div>
              <p className="text-sm text-main">
                <span className="font-bold">{log.user}</span> {log.action} <span className="font-bold text-indigo-600 dark:text-indigo-400">{log.target}</span>
              </p>
              <p className="text-xs text-muted mt-1">
                {new Date(log.time).toLocaleDateString("id-ID")} • {new Date(log.time).toLocaleTimeString("id-ID", {hour: '2-digit', minute:'2-digit'})}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}