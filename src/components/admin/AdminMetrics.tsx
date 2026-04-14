import { Card, Metric, Text } from '@tremor/react';
import { CategoryDistribution } from '@/components/admin/charts/CategoryDistribution';
import { DailyExpenses } from '@/components/admin/charts/DailyExpenses';

export function AdminMetrics() {
  return (
    <div className="flex flex-col gap-8 w-full max-w-[1100px] mx-auto">
      <header className="flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">Visão Geral</h1>
          <p className="text-gray-500 mt-1 text-base font-medium">Acompanhamento consolidado e métricas</p>
        </div>
        <button className="px-5 py-2.5 bg-primary text-white font-semibold rounded-xl hover:bg-primary/90 transition-colors shadow-sm active:scale-95">
          Exportar Excel
        </button>
      </header>

      {/* KPI Cards using Tremor */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        <Card decoration="top" decorationColor="blue" className="rounded-2xl p-6 shadow-sm border border-gray-200 bg-white">
          <Text className="text-gray-500 font-medium">Total do Mês (Abril)</Text>
          <Metric className="text-3xl font-bold text-gray-900 mt-2">R$ 4.620,50</Metric>
        </Card>
        
        <Card decoration="top" decorationColor="amber" className="rounded-2xl p-6 shadow-sm border border-gray-200 bg-white">
          <Text className="text-gray-500 font-medium">Lançamentos Pendentes</Text>
          <Metric className="text-3xl font-bold text-gray-900 mt-2">12</Metric>
        </Card>

        <Card decoration="top" decorationColor="emerald" className="rounded-2xl p-6 shadow-sm border border-gray-200 bg-white">
          <Text className="text-gray-500 font-medium">Maior Despesa Hoje</Text>
          <Metric className="text-3xl font-bold text-gray-900 mt-2">R$ 150,00</Metric>
        </Card>
      </div>

      {/* Visual Analytics */}
      <div className="flex flex-col xl:flex-row gap-5 h-auto xl:h-[450px]">
        <div className="flex-[2] h-[400px] xl:h-full">
          <DailyExpenses />
        </div>
        
        <div className="flex-[1] h-[400px] xl:h-full">
          <CategoryDistribution />
        </div>
      </div>
    </div>
  );
}
