import { CategoryDistribution } from '@/components/admin/charts/CategoryDistribution';
import { DailyExpenses } from '@/components/admin/charts/DailyExpenses';
import { TrendingDown, Clock, DollarSign } from 'lucide-react';
import { MOCK_DAILY, MOCK_CATEGORIES, MOCK_KPI, type Organization } from '@/lib/mockData';

const KPI_META = [
  { key: 'total',   label: 'Total do Mês',        Icon: DollarSign,  border: 'border-blue-200',    bg: 'bg-blue-50',    text: 'text-blue-700'    },
  { key: 'pending', label: 'Pedidos Pendentes',    Icon: Clock,       border: 'border-amber-200',   bg: 'bg-amber-50',   text: 'text-amber-700'   },
  { key: 'biggest', label: 'Maior Despesa',        Icon: TrendingDown, border: 'border-emerald-200', bg: 'bg-emerald-50', text: 'text-emerald-700' },
] as const;

type Props = { org: Organization };

export function AdminMetrics({ org }: Props) {
  const kpi = MOCK_KPI[org];
  const dailyData = MOCK_DAILY[org];
  const categoryData = MOCK_CATEGORIES[org];

  return (
    <div className="flex flex-col gap-6 w-full min-w-0">
      <header className="flex justify-between items-end gap-4 flex-wrap">
        <div className="min-w-0">
          <h1 className="text-2xl font-extrabold text-gray-900 tracking-tight truncate">Visão Geral</h1>
          <p className="text-gray-400 mt-0.5 text-sm">Consolidado — Abril 2026</p>
        </div>
        <button className="px-4 py-2 bg-gray-900 text-white font-semibold rounded-lg hover:bg-black transition-colors text-xs flex-shrink-0">
          Exportar ↓
        </button>
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
                {key === 'pending' ? kpi.pending : (kpi as any)[key]}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Charts */}
      <div className="flex flex-col xl:flex-row gap-4 min-w-0">
        <div className="flex-[2] h-[300px] min-w-0">
          <DailyExpenses data={dailyData} />
        </div>
        <div className="flex-1 h-[300px] min-w-0">
          <CategoryDistribution data={categoryData} />
        </div>
      </div>
    </div>
  );
}
