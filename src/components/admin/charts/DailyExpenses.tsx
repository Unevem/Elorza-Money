"use client";

import { BarChart } from '@tremor/react';

const mockData = [
  { date: '01 Abr', 'Gastos': 120 },
  { date: '02 Abr', 'Gastos': 150 },
  { date: '03 Abr', 'Gastos': 60 },
  { date: '04 Abr', 'Gastos': 400 },
  { date: '05 Abr', 'Gastos': 250 },
  { date: '06 Abr', 'Gastos': 190 },
  { date: '07 Abr', 'Gastos': 30 },
];

export function DailyExpenses() {
  return (
    <div className="flex flex-col h-full bg-white p-6 rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
      <h3 className="font-bold text-gray-900 text-lg mb-1">Gastos Diários</h3>
      <p className="text-gray-500 text-sm mb-6">Mapeamento dos últimos 7 dias operacionais</p>
      
      <div className="flex-1 min-h-[300px]">
        <BarChart
          data={mockData}
          index="date"
          categories={['Gastos']}
          colors={['blue']}
          valueFormatter={(v) => `R$ ${v.toFixed(0)}`}
          yAxisWidth={60}
          className="h-full w-full"
          showAnimation
        />
      </div>
    </div>
  );
}
