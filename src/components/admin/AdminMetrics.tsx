"use client";
import { useEffect, useState, useTransition } from 'react';
import { CategoryDistribution } from '@/components/admin/charts/CategoryDistribution';
import { DailyExpenses } from '@/components/admin/charts/DailyExpenses';
import { TrendingDown, Clock, DollarSign, AlertTriangle } from 'lucide-react';
import { fetchAvailableMonths, fetchDashboardData, type MonthInfo, type DashboardData } from '@/actions/dashboard.actions';
import { MOCK_DAILY, MOCK_CATEGORIES, MOCK_KPI } from '@/lib/mockData';

const KPI_META = [
  { key: 'total',   label: 'Total do Mês',        Icon: DollarSign,  border: 'border-blue-200',    bg: 'bg-blue-50',    text: 'text-blue-700'    },
  { key: 'pending', label: 'Pedidos Pendentes',    Icon: Clock,       border: 'border-amber-200',   bg: 'bg-amber-50',   text: 'text-amber-700'   },
  { key: 'biggest', label: 'Maior Despesa',        Icon: TrendingDown, border: 'border-emerald-200', bg: 'bg-emerald-50', text: 'text-emerald-700' },
] as const;

type Props = { org: string };

export function AdminMetrics({ org }: Props) {
  const [months, setMonths] = useState<MonthInfo[]>([]);
  const [activeMonth, setActiveMonth] = useState<string | null>(null);
  const [data, setData] = useState<DashboardData | null>(null);
  const [isPending, startTransition] = useTransition();

  // Load Months
  useEffect(() => {
    startTransition(async () => {
      const res = await fetchAvailableMonths(org);
      if (res.success && res.data.length > 0) {
        setMonths(res.data);
        setActiveMonth(res.data[0].value);
      } else {
        const now = new Date();
        const m = String(now.getMonth() + 1).padStart(2, '0');
        const y = now.getFullYear();
        const currentM = `${y}-${m}`;
        const label = now.toLocaleDateString('pt-BR', { month: 'short', year: 'numeric' }).replace('.', '');
        setMonths([{ value: currentM, label: label.charAt(0).toUpperCase() + label.slice(1), status: 'complete' }]);
        setActiveMonth(currentM);
      }
    });
  }, [org]);

  // Load Dashboard Data when activeMonth changes
  useEffect(() => {
    if (!activeMonth) return;
    startTransition(async () => {
      const res = await fetchDashboardData(org, activeMonth);
      if (res.success) {
        // Fallback Falso/Isolado
        if (res.data.daily.length === 0 && res.data.categories.length === 0) {
          const fakeData: DashboardData = {
            kpi: (MOCK_KPI as any)[org] ?? { total: 0, maior_gasto: 0, pedidos_pendentes: 0 },
            daily: (MOCK_DAILY as any)[org] ?? [],
            categories: (MOCK_CATEGORIES as any)[org] ?? []
          };
          setData(fakeData);
        } else {
          setData(res.data);
        }
      }
    });
  }, [org, activeMonth]);

  if (!data) {
    return (
      <div className="flex items-center justify-center h-full w-full">
        <div className="text-gray-400 font-medium animate-pulse">Carregando painel...</div>
      </div>
    );
  }

  const { kpi, daily, categories } = data;

  return (
    <div className="flex flex-col gap-6 w-full min-w-0">
      <header className="flex flex-col gap-4">
        <div className="flex justify-between items-end gap-4 flex-wrap">
          <div className="min-w-0">
            <h1 className="text-2xl font-extrabold text-gray-900 tracking-tight truncate">Visão Geral</h1>
            <p className="text-gray-400 mt-0.5 text-sm">Consolidado da Organização</p>
          </div>
          <button className="px-4 py-2 bg-gray-900 text-white font-semibold rounded-lg hover:bg-black transition-colors text-xs flex-shrink-0 shadow-sm">
            Exportar ↓
          </button>
        </div>

        {/* Tabs de Meses */}
        {months.length > 0 && (
          <div className="flex items-center gap-2 overflow-x-auto pb-2 -mx-2 px-2 hide-scrollbar">
            {months.map(m => {
              const isActive = activeMonth === m.value;
              return (
                <button
                  key={m.value}
                  onClick={() => setActiveMonth(m.value)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold transition-all whitespace-nowrap border ${
                    isActive 
                      ? 'bg-gray-900 text-white border-gray-900 shadow-md' 
                      : 'bg-white text-gray-600 border-gray-200 hover:bg-gray-50'
                  }`}
                >
                  {m.label}
                  {m.status === 'incomplete' && (
                    <span className={`flex items-center gap-1 text-[10px] px-1.5 py-0.5 rounded-md uppercase tracking-wider font-bold ${
                      isActive ? 'bg-amber-400/20 text-amber-100' : 'bg-amber-100 text-amber-700'
                    }`}>
                      <AlertTriangle size={10} /> Parcial
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        )}
      </header>

      {/* KPI Cards */}
      <div className="grid grid-cols-3 gap-4 min-w-0">
        {KPI_META.map(({ key, label, Icon, border, bg, text }) => (
          <div key={key} className={`rounded-xl p-4 border-2 ${border} ${bg} flex items-start gap-3 min-w-0 overflow-hidden`}>
            <div className={`p-2 rounded-lg bg-white/70 border ${border} flex-shrink-0`}>
              <Icon className={`w-4 h-4 ${text}`} strokeWidth={2} />
            </div>
            <div className="min-w-0">
              <p className="text-gray-500 text-xs font-medium truncate">{label}</p>
              <p className={`text-xl font-extrabold mt-0.5 ${text} truncate`}>
                {key === 'total' || key === 'biggest' ? 
                  new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(key === 'total' ? kpi.total : kpi.maior_gasto) 
                  : kpi.pedidos_pendentes}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Charts */}
      <div className="flex flex-col xl:flex-row gap-4 min-w-0">
        <div className="flex-[2] h-[300px] min-w-0">
          <DailyExpenses data={daily} />
        </div>
        <div className="flex-1 h-[300px] min-w-0">
          <CategoryDistribution data={categories} />
        </div>
      </div>
    </div>
  );
}
