import React from "react";

export default function ProgressBar({ value }) {
  const pct = Math.round(value * 100);
  return (
    <div className="w-full bg-gray-100 rounded-full h-2">
      <div className="h-2 rounded-full" style={{ width: `${pct}%`, background: `linear-gradient(90deg,#06b6d4,#7c3aed)` }} />
    </div>
  );
}
