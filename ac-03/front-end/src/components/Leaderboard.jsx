import React from "react";

export default function Leaderboard() {
  // Data Dummy (Nanti diganti API dari Postgres)
  const leaders = [
    { id: 1, name: "Raja Sales", score: 142, deals: 45, avatar: "R" },
    { id: 2, name: "Sarah Connor", score: 120, deals: 38, avatar: "S" },
    { id: 3, name: "John Doe", score: 98, deals: 25, avatar: "J" },
    { id: 4, name: "Mike Tyson", score: 85, deals: 20, avatar: "M" },
  ];

  return (
    <div className="card h-full">
      <div className="flex items-center justify-between mb-6">
        <h3 className="font-bold text-main">🏆 Top Sales Bulan Ini</h3>
        <span className="text-xs font-bold text-indigo-600 bg-indigo-50 dark:bg-indigo-900/30 px-2 py-1 rounded">Live</span>
      </div>

      <div className="space-y-4">
        {leaders.map((leader, index) => (
          <div key={leader.id} className="flex items-center gap-4 p-3 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors border border-transparent hover:border-slate-100 dark:hover:border-slate-700">
            {/* Rank Number */}
            <div className={`w-6 text-center font-bold ${
              index === 0 ? "text-yellow-500 text-lg" : 
              index === 1 ? "text-slate-400 text-lg" : 
              index === 2 ? "text-amber-700 text-lg" : "text-muted text-sm"
            }`}>
              {index + 1}
            </div>

            {/* Avatar */}
            <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-white shadow-sm ${
              index === 0 ? "bg-yellow-500" :
              index === 1 ? "bg-slate-400" :
              index === 2 ? "bg-amber-600" : "bg-slate-300 dark:bg-slate-700"
            }`}>
              {leader.avatar}
            </div>

            {/* Info */}
            <div className="flex-1">
              <div className="font-bold text-main text-sm">{leader.name}</div>
              <div className="text-xs text-muted">{leader.deals} Closing</div>
            </div>

            {/* Score */}
            <div className="text-right">
              <div className="font-extrabold text-indigo-600 dark:text-indigo-400">{leader.score}</div>
              <div className="text-[10px] text-muted uppercase">Poin</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}