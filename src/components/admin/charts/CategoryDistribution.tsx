"use client";

import {
  PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer,
} from 'recharts';
import type { CategoryPoint } from '@/lib/mockData';

const COLORS = ['#1E40AF', '#0ea5e9', '#6366f1', '#8b5cf6', '#166534'];

type Props = { data: CategoryPoint[] };

export function CategoryDistribution({ data }: Props) {
  return (
    <div className="flex flex-col h-full bg-white p-5 rounded-xl border border-gray-200 shadow-sm overflow-hidden">
      <h3 className="font-bold text-gray-800 text-sm mb-0.5">Distribuição por Categoria</h3>
      <p className="text-gray-400 text-xs mb-2">Macros ativas</p>
      <div className="flex-1 min-h-[200px]">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie data={data} cx="50%" cy="45%" innerRadius="40%" outerRadius="65%"
              paddingAngle={3} dataKey="value"
            >
              {data.map((_, i) => (
                <Cell key={`c-${i}`} fill={COLORS[i % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip
              formatter={(v: number) => [`R$ ${v.toFixed(2)}`]}
              contentStyle={{ borderRadius: '8px', border: '1px solid #e5e7eb', fontSize: '12px' }}
            />
            <Legend iconType="circle" iconSize={8}
              formatter={(v) => <span style={{ fontSize: '11px', color: '#4b5563' }}>{v}</span>}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
