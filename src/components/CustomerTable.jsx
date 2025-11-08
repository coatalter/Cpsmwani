import React, { useState } from "react";
import ProgressBar from "./ProgressBar";

/**
 * Simple table for list prospek; detail modal basic
 */
export default function CustomerTable({ customers }) {
  const [selected, setSelected] = useState(null);

  return (
    <>
      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead>
            <tr className="text-xs text-gray-500 border-b">
              <th className="py-2">Nama</th>
              <th>Umur</th>
              <th>Pekerjaan</th>
              <th>Skor</th>
              <th>Prob.</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {customers.map(c => (
              <tr key={c.id} className="hover:bg-gray-50">
                <td className="py-3">{c.name}</td>
                <td>{c.age}</td>
                <td>{c.job}</td>
                <td className="font-medium">{Math.round(c.score*100)}%</td>
                <td style={{width:200}}>
                  <div className="flex items-center gap-3">
                    <div style={{width:110}}><ProgressBar value={c.score} /></div>
                    <div className="text-xs text-gray-500">{(c.score*100).toFixed(0)}%</div>
                  </div>
                </td>
                <td className="text-right">
                  <button onClick={()=>setSelected(c)} className="text-sm px-3 py-1 border rounded">Detail</button>
                  <button onClick={()=>alert(`Menghubungi ${c.name} (${c.phone})`)} className="ml-2 text-sm px-3 py-1 bg-indigo-600 text-white rounded">Hubungi</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {selected && (
        <div className="fixed inset-0 bg-black/30 flex items-end sm:items-center justify-center p-4">
          <div className="bg-white rounded-lg w-full sm:w-3/4 max-w-3xl shadow p-6">
            <div className="flex items-start justify-between">
              <div>
                <h2 className="text-lg font-semibold">Detail Nasabah</h2>
                <div className="text-sm text-gray-500">{selected.name} — {selected.job}</div>
              </div>
              <button onClick={()=>setSelected(null)} className="text-gray-500">Tutup ✕</button>
            </div>

            <div className="mt-4 grid grid-cols-2 gap-4">
              <div>
                <div className="text-xs text-gray-500">Telepon</div>
                <div className="font-medium">{selected.phone}</div>
              </div>
              <div>
                <div className="text-xs text-gray-500">Status Pinjaman</div>
                <div className="font-medium">{selected.loanStatus}</div>
              </div>
              <div className="col-span-2">
                <div className="text-xs text-gray-500">Catatan Probabilitas</div>
                <div className="mt-2">Model memprediksi probabilitas berlangganan {Math.round(selected.score*100)}%. Prioritaskan panggilan singkat dengan penawaran promo deposito berjangka.</div>
              </div>
            </div>

            <div className="mt-6 flex justify-end gap-3">
              <button onClick={() => { alert('Mencatat tindakan: Diikuti'); setSelected(null); }} className="px-4 py-2 border rounded">Catat Tindak Lanjut</button>
              <button onClick={() => { alert(`Panggilan ke ${selected.phone}`); }} className="px-4 py-2 bg-indigo-600 text-white rounded">Panggil</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
