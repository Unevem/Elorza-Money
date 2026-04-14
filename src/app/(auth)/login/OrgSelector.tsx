"use client";
import { Building2, Users } from 'lucide-react';
import type { UserOrgAccess } from '@/actions/auth.actions';

const ORG_COLORS: Record<string, string> = {
  elorza: 'border-blue-300 bg-blue-50 hover:bg-blue-100 text-blue-800',
  rolim:  'border-violet-300 bg-violet-50 hover:bg-violet-100 text-violet-800',
  firma:  'border-emerald-300 bg-emerald-50 hover:bg-emerald-100 text-emerald-800',
};

type Props = {
  orgs: UserOrgAccess[];
  onSelect: (access: UserOrgAccess) => void;
};

export function OrgSelector({ orgs, onSelect }: Props) {
  return (
    <div className="flex flex-col gap-4 w-full">
      <div className="text-center">
        <p className="font-bold text-gray-800 text-lg">De qual organização você quer participar hoje?</p>
        <p className="text-gray-500 text-sm mt-1">Você pode trocar depois, se precisar.</p>
      </div>
      <div className="flex flex-col gap-3">
        {orgs.map((access) => {
          const colorClass = ORG_COLORS[access.org.slug] ?? 'border-gray-200 bg-gray-50 hover:bg-gray-100 text-gray-800';
          const Icon = access.org.slug === 'firma' ? Building2 : Users;
          return (
            <button
              key={access.org.id}
              onClick={() => onSelect(access)}
              className={`flex items-center gap-4 p-5 rounded-2xl border-2 font-bold text-left transition-all active:scale-[0.98] ${colorClass}`}
            >
              <Icon size={28} strokeWidth={2} className="flex-shrink-0" />
              <div>
                <p className="text-xl">{access.org.nome}</p>
                <p className="text-xs font-normal opacity-70 mt-0.5 capitalize">{access.role}</p>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
