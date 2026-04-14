"use client";

import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
} from 'recharts';
import type { DailyExpensePoint } from '@/lib/mockData';

type Props = { data: DailyExpensePoint[] };

export function DailyExpenses({ data }: Props) {
  return (
    <div className="flex flex-col h-full bg-white p-5 rounded-xl border border-gray-200 shadow-sm overflow-hidden">
      <h3 className="font-bold text-gray-800 text-sm mb-0.5">Gastos Diários</h3>
      <p className="text-gray-400 text-xs mb-4">Últimos 7 dias</p>
      <div className="flex-1 min-h-[200px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} margin={{ top: 4, right: 8, left: 0, bottom: 4 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f3f4f6" />
            <XAxis dataKey="date" tick={{ fontSize: 10, fill: '#9ca3af' }} />
            <YAxis tick={{ fontSize: 10, fill: '#9ca3af' }} width={55}
              tickFormatter={(v) => `R$${v >= 1000 ? `${(v/1000).toFixed(1)}k` : v}`}
            />
            <Tooltip
              formatter={(v: number) => [`R$ ${v.toFixed(2)}`, 'Gastos']}
              contentStyle={{ borderRadius: '8px', border: '1px solid #e5e7eb', fontSize: '12px' }}
            />
            <Bar dataKey="Gastos" fill="#1E40AF" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
