"use client";
import { useState, useEffect, useTransition } from 'react';
import { Coffee, Pill, CarFront, Home, Shapes } from 'lucide-react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { toast } from 'sonner';
import { useOrgContext } from '@/context/OrganizationContext';
import { createTransaction } from '@/actions/transaction.actions';
import { getCategories } from '@/actions/category.actions';
import type { Categoria, OrgSlug } from '@/types/database';

const ICON_MAP: Record<string, React.ElementType> = {
  'Alimentação': Coffee, 'Saúde': Pill, 'Transporte': CarFront,
  'Casa': Home, 'Outros': Shapes, 'Lazer': Shapes,
};

export function ExpenseForm() {
  const { user, currentOrg } = useOrgContext();
  const [amount, setAmount]         = useState('');
  const [date, setDate]             = useState(() => new Date().toISOString().split('T')[0]);
  const [selectedCat, setSelected]  = useState<number | null>(null);
  const [description, setDesc]      = useState('');
  const [categories, setCategories] = useState<Categoria[]>([]);
  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    if (!currentOrg?.slug) return;
    getCategories(currentOrg.slug as OrgSlug).then((res) => {
      if (res.success) setCategories(res.data);
    });
  }, [currentOrg?.slug]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!amount || parseFloat(amount) <= 0) { toast.error('Informe um valor válido!'); return; }
    if (!user || !currentOrg) { toast.error('Sessão expirada. Faça login novamente.'); return; }

    startTransition(async () => {
      const result = await createTransaction({
        valor: parseFloat(amount),
        data_gasto: date,
        categoria_id: selectedCat ?? undefined,
        descricao: description || undefined,
        _test_org_slug: currentOrg.slug as OrgSlug,
        _test_user_id: user.id,
      });

      if (result.success) {
        toast.success('Gasto salvo com sucesso! ✅', {
          description: `R$ ${parseFloat(amount).toFixed(2)} registrado.`,
        });
        setAmount('');
        setDesc('');
        setSelected(null);
      } else {
        toast.error('Erro ao salvar gasto', { description: result.error });
      }
    });
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-8 w-full">
      {/* AMOUNT */}
      <div className="flex flex-col items-center gap-2">
        <label className="text-sm font-semibold text-gray-500 uppercase tracking-wider">
          Valor do Gasto
        </label>
        <div className="relative flex items-center justify-center w-full shadow-sm rounded-xl overflow-hidden bg-white">
          <span className="absolute left-6 text-3xl font-bold text-gray-400">R$</span>
          <input type="number" step="0.01" inputMode="decimal" required
            value={amount} onChange={(e) => setAmount(e.target.value)}
            className="w-full text-center text-[3.5rem] leading-none font-bold bg-transparent border-4 border-transparent focus:border-primary focus:ring-0 px-12 py-6 outline-none transition-colors rounded-xl text-text placeholder-gray-300"
            placeholder="0,00"
          />
        </div>
      </div>

      {/* CATEGORIES */}
      <div className="flex flex-col gap-3">
        <label className="font-bold text-xl text-text">O que foi comprado?</label>
        <div className="grid grid-cols-2 gap-3">
          {categories.map((cat) => {
            const Icon = ICON_MAP[cat.nome_global] ?? Shapes;
            const isSelected = selectedCat === cat.id;
            return (
              <button key={cat.id} type="button" onClick={() => setSelected(cat.id)}
                className={twMerge(clsx(
                  "flex flex-col items-center justify-center gap-3 p-6 min-h-[120px] border-4 rounded-2xl transition-all shadow-sm active:scale-[0.98]",
                  isSelected ? "border-primary bg-primary/10 text-primary" : "border-gray-200 bg-white text-gray-600 hover:bg-gray-50"
                ))}
              >
                <Icon size={40} className={isSelected ? "text-primary stroke-[2.5]" : "text-gray-500 stroke-[2]"} />
                <span className="font-bold text-lg">{cat.nome_especifico}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* DESCRIPTION */}
      <div className="flex flex-col gap-3">
        <label htmlFor="desc" className="font-bold text-xl text-text">
          Detalhes <span className="font-normal text-gray-500 text-base">(Opcional)</span>
        </label>
        <input id="desc" type="text" value={description} onChange={(e) => setDesc(e.target.value)}
          placeholder="Ex: Pão, Remédio pra pressão..."
          className="w-full h-16 px-5 text-xl font-medium border-2 border-gray-300 rounded-2xl bg-white focus:border-primary focus:ring-4 focus:ring-primary/20 outline-none placeholder-gray-400"
        />
      </div>

      {/* DATE */}
      <div className="flex flex-col gap-3">
        <label htmlFor="date" className="font-bold text-xl text-text">Quando foi?</label>
        <input id="date" type="date" required value={date} onChange={(e) => setDate(e.target.value)}
          className="w-full h-16 px-5 text-xl font-bold border-2 border-gray-300 rounded-2xl bg-white focus:border-primary focus:ring-4 focus:ring-primary/20 outline-none text-gray-700"
        />
      </div>

      {/* SUBMIT */}
      <button type="submit" disabled={isPending}
        className="mt-6 w-full h-[72px] bg-success text-white text-2xl font-bold rounded-2xl hover:bg-success/90 transition-colors shadow-lg active:scale-[0.98] disabled:opacity-60 disabled:cursor-not-allowed"
      >
        {isPending ? 'Salvando...' : 'Salvar Gasto'}
      </button>
    </form>
  );
}
