import Link from 'next/link';
import { LayoutDashboard, Receipt, Tag, Settings, LogOut } from 'lucide-react';

export function AdminSidebar() {
  return (
    <aside className="w-64 bg-white border-r border-gray-200 p-5 flex flex-col justify-between shadow-sm z-20 relative">
      <div className="flex flex-col gap-8">
        <div className="px-2">
          <h2 className="text-2xl font-extrabold text-primary tracking-tight">ADM Elorza</h2>
        </div>
        <nav className="flex flex-col gap-1">
          <Link href="/admin" className="flex items-center gap-3 px-3 py-2.5 rounded-lg bg-primary/10 text-primary font-semibold transition-colors">
            <LayoutDashboard size={18} /> Dashboard
          </Link>
          <Link href="/admin" className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-gray-600 hover:bg-gray-100 font-medium transition-colors">
            <Receipt size={18} /> Transações
          </Link>
          <Link href="/admin/categories" className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-gray-600 hover:bg-gray-100 font-medium transition-colors">
            <Tag size={18} /> Categorias
          </Link>
        </nav>
      </div>
      
      <div>
        <nav className="flex flex-col gap-1 border-t border-gray-200 pt-4">
          <Link href="/admin" className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-gray-600 hover:bg-gray-100 font-medium transition-colors">
            <Settings size={18} /> Configurações
          </Link>
          <Link href="/" className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-gray-600 hover:bg-red-50 hover:text-red-700 font-medium transition-colors mt-2">
            <LogOut size={18} /> Voltar para o App
          </Link>
        </nav>
      </div>
    </aside>
  );
}
