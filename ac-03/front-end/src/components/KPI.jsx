import React from "react";

export default function KPI({ title, value, delta }) {
  return (
    <div className="kpi">
      <div className="kpi-title">{title}</div>
      <div className="kpi-value">
        <div>{value}</div>
        {delta && <div className="text-sm text-green-600">▲ {delta}</div>}
      </div>
    </div>
  );
}
