import React from "react";

export default function KPI({ title, value, delta }) {
  return (
    <div className="bg-white shadow rounded-lg p-4 w-full">
      <div className="text-sm font-medium text-gray-500">{title}</div>
      <div className="mt-2 flex items-baseline gap-2">
        <div className="text-2xl font-semibold">{value}</div>
        {delta && <div className="text-sm text-green-600">▲ {delta}</div>}
      </div>
    </div>
  );
}
