"use client";

import { DonutChart } from '@tremor/react';

const mockData = [
  { category: 'Alimentação', value: 850.5 },
  { category: 'Locomoção', value: 320.0 },
  { category: 'Saúde', value: 1200.0 },
  { category: 'Lazer', value: 450.0 },
  { category: 'Casa', value: 1800.0 },
];

export function CategoryDistribution() {
  return (
    <div className="flex flex-col h-full bg-white p-6 rounded-2xl border border-gray-200 shadow-sm">
      <h3 className="font-bold text-gray-900 text-lg mb-1">Distribuição Global</h3>
      <p className="text-gray-500 text-sm mb-8">Baseado nas macros ativas</p>
      
      <div className="flex-1 flex items-center justify-center">
        <DonutChart
          data={mockData}
          category="value"
          index="category"
          valueFormatter={(v) => `R$ ${v.toFixed(2)}`}
          colors={['blue', 'sky', 'indigo', 'violet', 'fuchsia']}
          className="h-60"
          showAnimation
        />
      </div>
    </div>
  );
}
