"use client";

import { useEffect, useState, useTransition } from 'react';
import { useOrganization } from '@/hooks/useOrganization';
import { AdminSidebar } from '@/components/admin/AdminSidebar';
import { fetchAdminTransactions, type TransactionRow } from '@/actions/transaction.actions';
import { fetchAvailableMonths, type MonthInfo } from '@/actions/dashboard.actions';
import { Search, Filter, Loader2 } from 'lucide-react';

export default function TransacoesPage() {
  const { currentOrg, setCurrentOrg } = useOrganization();
  const [months, setMonths] = useState<MonthInfo[]>([]);
  const [activeMonth, setActiveMonth] = useState<string | null>(null);
  
  const [transactions, setTransactions] = useState<TransactionRow[]>([]);
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('all');
  
  const [isPending, startTransition] = useTransition();

  // Load Months
  useEffect(() => {
    startTransition(async () => {
      const res = await fetchAvailableMonths(currentOrg);
      if (res.success && res.data.length > 0) {
        setMonths(res.data);
        setActiveMonth(res.data[0].value);
      } else {
        setMonths([]);
        setActiveMonth(null);
      }
    });
  }, [currentOrg]);

  // Load Transactions
  useEffect(() => {
    startTransition(async () => {
      const res = await fetchAdminTransactions(
        currentOrg,
        activeMonth ?? undefined,
        search.length > 2 ? search : undefined,
        category
      );
      if (res.success) {
        setTransactions(res.data);
      }
    });
  }, [currentOrg, activeMonth, search, category]);

  return (
    <div className="flex flex-1 w-full h-full overflow-hidden bg-gray-50 text-sm">
      <AdminSidebar currentOrg={currentOrg} onOrgChange={setCurrentOrg} />

      <div className="flex-1 flex flex-col overflow-hidden min-w-0 p-6 gap-6">
        <header className="flex justify-between items-end gap-4 flex-wrap">
          <div className="min-w-0">
            <h1 className="text-2xl font-extrabold text-gray-900 tracking-tight truncate">Gestão de Transações</h1>
            <p className="text-gray-400 mt-0.5 text-sm">Acompanhe todos os lançamentos da organização</p>
          </div>
        </header>

        {/* Filters */}
        <div className="flex flex-wrap gap-4 items-center bg-white p-4 rounded-xl border border-gray-200 shadow-sm">
          {/* Month Select */}
          <div className="flex flex-col gap-1 min-w-[150px]">
            <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">Mês</label>
            <select
              className="h-10 px-3 rounded-lg border border-gray-200 bg-gray-50 focus:bg-white focus:ring-2 focus:ring-primary/20 outline-none text-sm font-medium"
              value={activeMonth ?? ''}
              onChange={(e) => setActiveMonth(e.target.value)}
            >
              <option value="">Todos</option>
              {months.map(m => (
                <option key={m.value} value={m.value}>
                  {m.label} {m.status === 'incomplete' ? '(Parcial)' : ''}
                </option>
              ))}
            </select>
          </div>

          {/* Search */}
          <div className="flex flex-col gap-1 flex-1 min-w-[200px]">
            <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">Busca</label>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
              <input
                type="text"
                placeholder="Pesquisar por descrição..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="h-10 w-full pl-9 pr-4 rounded-lg border border-gray-200 bg-gray-50 focus:bg-white focus:ring-2 focus:ring-primary/20 outline-none text-sm"
              />
            </div>
          </div>

          {/* Category */}
          <div className="flex flex-col gap-1 min-w-[180px]">
            <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">Categoria Global</label>
            <div className="relative">
              <Filter className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="h-10 w-full pl-9 pr-4 rounded-lg border border-gray-200 bg-gray-50 focus:bg-white focus:ring-2 focus:ring-primary/20 outline-none text-sm font-medium appearance-none"
              >
                <option value="all">Todas as categorias</option>
                <option value="Alimentação">Alimentação</option>
                <option value="Saúde">Saúde</option>
                <option value="Transporte">Transporte</option>
                <option value="Lazer">Lazer</option>
                <option value="Casa">Casa</option>
                <option value="Outros">Outros</option>
              </select>
            </div>
          </div>
        </div>

        {/* Table */}
        <div className="flex-1 bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden flex flex-col">
          <div className="overflow-x-auto flex-1">
            <table className="w-full text-left text-sm whitespace-nowrap">
              <thead className="bg-gray-50 border-b border-gray-200 text-gray-500 font-semibold uppercase text-xs tracking-wider sticky top-0 z-10">
                <tr>
                  <th className="px-6 py-4">Data</th>
                  <th className="px-6 py-4 w-full">Descrição</th>
                  <th className="px-6 py-4">Categoria</th>
                  <th className="px-6 py-4 text-right">Valor</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {isPending && transactions.length === 0 ? (
                  <tr>
                    <td colSpan={4} className="px-6 py-12 text-center text-gray-400">
                      <Loader2 className="animate-spin w-6 h-6 mx-auto mb-2" />
                      Carregando transações...
                    </td>
                  </tr>
                ) : transactions.length === 0 ? (
                  <tr>
                    <td colSpan={4} className="px-6 py-12 text-center text-gray-400 font-medium">
                      Nenhuma transação encontrada.
                    </td>
                  </tr>
                ) : (
                  transactions.map((item) => (
                    <tr key={item.id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4 font-medium text-gray-600">
                        {new Date(item.data_gasto).toLocaleDateString('pt-BR')}
                      </td>
                      <td className="px-6 py-4 font-bold text-gray-900 truncate max-w-[300px]">
                        {item.descricao || '-'}
                      </td>
                      <td className="px-6 py-4">
                        <span className="bg-blue-50 text-blue-700 px-2 py-1 rounded-md font-semibold text-xs border border-blue-100 inline-block">
                          {item.categoria_global}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-right font-bold text-gray-900">
                        {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(item.valor)}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </div>
  );
}
