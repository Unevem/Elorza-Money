"use client";
import { useState } from 'react';
import { Coffee, Pill, CarFront, Home, Shapes } from 'lucide-react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { toast } from 'sonner';

const CATEGORIES = [
  { id: 'alimentacao', label: 'Alimentação', icon: Coffee },
  { id: 'saude', label: 'Saúde', icon: Pill },
  { id: 'transporte', label: 'Transporte', icon: CarFront },
  { id: 'casa', label: 'Casa', icon: Home },
  { id: 'outros', label: 'Outros', icon: Shapes },
];

export function ExpenseForm() {
  const [amount, setAmount] = useState('');
  const [date, setDate] = useState(() => new Date().toISOString().split('T')[0]);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [description, setDescription] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate submission
    toast.success('Despesa registrada e computada!', {
      description: `R$ ${amount} lançado em ${date}.`
    });
    setAmount('');
    setDescription('');
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-8 w-full">
      {/* AMOUNT INPUT */}
      <div className="flex flex-col items-center gap-2">
        <label className="text-sm font-semibold text-gray-500 uppercase tracking-wider">
          Valor do Gasto
        </label>
        <div className="relative flex items-center justify-center w-full shadow-sm rounded-xl overflow-hidden bg-white">
          <span className="absolute left-6 text-3xl font-bold text-gray-400">R$</span>
          <input
            type="number"
            step="0.01"
            inputMode="decimal"
            required
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="w-full text-center text-[3.5rem] leading-none font-bold bg-transparent border-4 border-transparent focus:border-primary focus:ring-0 px-12 py-6 outline-none transition-colors rounded-xl text-text placeholder-gray-300"
            placeholder="0,00"
          />
        </div>
      </div>

      {/* CATEGORY GRID */}
      <div className="flex flex-col gap-3">
        <label className="font-bold text-xl text-text">
          O que foi comprado?
        </label>
        <div className="grid grid-cols-2 gap-3">
          {CATEGORIES.map((cat) => {
            const Icon = cat.icon;
            const isSelected = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                type="button"
                onClick={() => setSelectedCategory(cat.id)}
                className={twMerge(
                  clsx(
                    "flex flex-col items-center justify-center gap-3 p-6 min-h-[120px] border-4 rounded-2xl transition-all shadow-sm active:scale-[0.98]",
                    isSelected
                      ? "border-primary bg-primary/10 text-primary" 
                      : "border-gray-200 bg-white text-gray-600 hover:bg-gray-50 hover:border-gray-300"
                  )
                )}
              >
                <Icon size={40} className={isSelected ? "text-primary stroke-[2.5]" : "text-gray-500 stroke-[2]"} />
                <span className="font-bold text-lg">{cat.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* OPTIONAL DESCRIPTION */}
      <div className="flex flex-col gap-3">
        <label htmlFor="description" className="font-bold text-xl text-text flex items-end justify-between">
          <span>Detalhes <span className="font-normal text-gray-500 text-base">(Opcional)</span></span>
        </label>
        <input
          id="description"
          type="text"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Ex: Pão, Remédio pra pressão..."
          className="w-full h-16 px-5 text-xl font-medium border-2 border-gray-300 rounded-2xl bg-white focus:border-primary focus:ring-4 focus:ring-primary/20 outline-none placeholder-gray-400"
        />
      </div>

      {/* DATE INPUT */}
      <div className="flex flex-col gap-3">
        <label htmlFor="date" className="font-bold text-xl text-text">
          Quando foi?
        </label>
        <input
          id="date"
          type="date"
          required
          value={date}
          onChange={(e) => setDate(e.target.value)}
          className="w-full h-16 px-5 text-xl font-bold border-2 border-gray-300 rounded-2xl bg-white focus:border-primary focus:ring-4 focus:ring-primary/20 outline-none text-gray-700"
        />
      </div>

      {/* SUBMIT BUTTON */}
      <button 
        type="submit" 
        className="mt-6 w-full h-[72px] bg-success text-white text-2xl font-bold rounded-2xl hover:bg-success/90 transition-colors shadow-lg active:scale-[0.98] active:bg-success/80"
      >
        Salvar Gasto
      </button>
    </form>
  );
}
