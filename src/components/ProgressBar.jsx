import React from "react";

export default function ProgressBar({ value = 0 }) {
  const pct = Math.round(value * 100);
  return (
    <div className="progress-track">
      <div className="progress-fill" style={{ width: `${pct}%` }} />
    </div>
  );
}
