import Link from 'next/link';
import { Lock } from 'lucide-react';

export function Header() {
  return (
    <header className="flex justify-between items-start mb-6">
      <div className="flex flex-col gap-1">
        <h1 className="text-4xl font-extrabold text-text tracking-tight">
          Olá, Pai! 👋
        </h1>
        <p className="text-xl text-gray-600 font-medium">
          Adicione seus gastos do dia abaixo.
        </p>
      </div>
      <Link href="/admin" className="p-3 bg-gray-100 rounded-full hover:bg-gray-200 transition-colors active:scale-95" aria-label="Área do Administrador">
        <Lock className="w-6 h-6 text-gray-500" />
      </Link>
    </header>
  );
}
