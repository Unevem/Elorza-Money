"use client";

import Link from 'next/link';
import { LayoutDashboard, Receipt, Tag, Settings, LogOut } from 'lucide-react';
import type { Organization } from '@/lib/mockData';
import { ORG_LIST } from '@/hooks/useOrganization';

type Props = {
  currentOrg: Organization;
  onOrgChange: (org: Organization) => void;
};

export function AdminSidebar({ currentOrg, onOrgChange }: Props) {
  const activeOrg = ORG_LIST.find((o) => o.id === currentOrg)!;

  return (
    <aside className="w-60 bg-white border-r border-gray-200 flex flex-col justify-between shadow-sm flex-shrink-0">
      {/* Brand */}
      <div className="flex flex-col gap-6 overflow-hidden">
        <div className="px-5 pt-5">
          <h2 className="text-xl font-extrabold text-gray-900 tracking-tight truncate">Elorza Money</h2>
          <p className="text-xs text-gray-400 font-medium mt-0.5">Painel Administrativo</p>
        </div>

        {/* Org Switcher */}
        <div className="px-4">
          <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2 px-1">Contexto Ativo</p>
          <div className="flex flex-col gap-1">
            {ORG_LIST.map((org) => (
              <button
                key={org.id}
                onClick={() => onOrgChange(org.id)}
                className={`flex items-center gap-3 w-full px-3 py-2 rounded-lg text-sm font-semibold transition-all text-left ${
                  currentOrg === org.id
                    ? `${org.color} text-white shadow-md`
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                <span className={`w-2 h-2 rounded-full flex-shrink-0 ${currentOrg === org.id ? 'bg-white/70' : org.color}`} />
                {org.label}
              </button>
            ))}
          </div>
        </div>

        {/* Nav */}
        <nav className="flex flex-col gap-1 px-4">
          <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1 px-1">Navegação</p>
          <Link href="/admin" className="flex items-center gap-3 px-3 py-2 rounded-lg bg-gray-900 text-white font-semibold text-sm transition-colors">
            <LayoutDashboard size={15} /> Dashboard
          </Link>
          <Link href="/admin" className="flex items-center gap-3 px-3 py-2 rounded-lg text-gray-600 hover:bg-gray-100 font-medium text-sm transition-colors">
            <Receipt size={15} /> Transações
          </Link>
          <Link href="/admin/categories" className="flex items-center gap-3 px-3 py-2 rounded-lg text-gray-600 hover:bg-gray-100 font-medium text-sm transition-colors">
            <Tag size={15} /> Categorias
          </Link>
        </nav>
      </div>

      {/* Footer */}
      <div className="px-4 pb-5 flex flex-col gap-1 border-t border-gray-100 pt-4">
        <div className={`flex items-center gap-2 px-3 py-2 rounded-lg ${activeOrg.color} text-white text-xs font-bold mb-2`}>
          <span className="w-1.5 h-1.5 rounded-full bg-white/80" />
          {activeOrg.label}
        </div>
        <Link href="/admin" className="flex items-center gap-3 px-3 py-2 rounded-lg text-gray-500 hover:bg-gray-100 font-medium text-sm">
          <Settings size={15} /> Configurações
        </Link>
        <Link href="/" className="flex items-center gap-3 px-3 py-2 rounded-lg text-red-500 hover:bg-red-50 font-medium text-sm">
          <LogOut size={15} /> Voltar ao App
        </Link>
      </div>
    </aside>
  );
}
