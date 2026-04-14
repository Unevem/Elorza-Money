import { AdminSidebar } from '@/components/admin/AdminSidebar';

export default function CategoriesPage() {
  const MOCK_MAPPINGS = [
    { id: 1, specific: 'Assaí Atacadista', global: 'Alimentação' },
    { id: 2, specific: 'Picanha do Careca', global: 'Alimentação' },
    { id: 3, specific: 'Remédio Pressão', global: 'Saúde' },
    { id: 4, specific: 'Uber para Médico', global: 'Transporte' },
    { id: 5, specific: 'Cinema', global: 'Lazer' },
  ];

  return (
    <div className="flex h-screen w-full max-w-[1600px] mx-auto overflow-hidden bg-gray-50 text-sm">
      <AdminSidebar />
      <div className="flex-1 overflow-y-auto p-10 flex flex-col gap-8">
        <header>
          <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">Gestão de Categorias</h1>
          <p className="text-gray-500 mt-2 text-base font-medium">Mapeie as descrições específicas para as Categorias Globais do seu Dashboard.</p>
        </header>

        <section className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm max-w-3xl">
          <h2 className="text-xl font-bold text-gray-900 mb-6">Criar Novo Mapeamento</h2>
          <form className="flex flex-col sm:flex-row gap-4 items-end">
            <div className="flex flex-col gap-2 flex-1">
              <label className="font-semibold text-gray-700">Descrição Específica (Tag)</label>
              <input type="text" placeholder="Ex: Farmácia São Paulo" className="h-12 w-full px-4 rounded-xl border border-gray-300 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none text-base" />
            </div>
            <div className="flex flex-col gap-2 flex-1">
              <label className="font-semibold text-gray-700">Categoria Global (Macro)</label>
              <select className="h-12 w-full px-4 rounded-xl border border-gray-300 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none text-base bg-white">
                <option value="alimentacao">Alimentação</option>
                <option value="saude">Saúde</option>
                <option value="transporte">Transporte</option>
                <option value="lazer">Lazer</option>
                <option value="casa">Casa</option>
                <option value="outros">Outros</option>
              </select>
            </div>
            <button type="button" className="h-12 px-8 bg-gray-900 text-white font-bold rounded-xl hover:bg-black transition-colors w-full sm:w-auto mt-4 sm:mt-0 shadow-sm">
              Adicionar
            </button>
          </form>
        </section>

        <section className="bg-white rounded-2xl border border-gray-200 shadow-sm max-w-3xl flex flex-col overflow-hidden">
          <div className="p-6 border-b border-gray-200 bg-gray-50/50">
            <h2 className="text-xl font-bold text-gray-900">Mapeamentos Ativos</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-base">
              <thead className="bg-gray-50 border-b border-gray-200 text-gray-500 font-semibold uppercase text-xs tracking-wider">
                <tr>
                  <th className="px-6 py-4">Descrição Específica</th>
                  <th className="px-6 py-4">Categoria Global (Dashboard)</th>
                  <th className="px-6 py-4 text-right">Ação</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {MOCK_MAPPINGS.map((item) => (
                  <tr key={item.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4 font-bold text-gray-900">{item.specific}</td>
                    <td className="px-6 py-4">
                      <span className="bg-blue-50 text-blue-700 px-3 py-1 rounded-lg font-semibold tracking-wide text-sm border border-blue-100">
                        {item.global}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <button className="text-red-500 font-semibold hover:text-red-700 text-sm">Remover</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

      </div>
    </div>
  );
}
