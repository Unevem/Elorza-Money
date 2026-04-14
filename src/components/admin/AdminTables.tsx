"use client";

import { useState } from 'react';
import { Check, X, AlertTriangle } from 'lucide-react';
import { toast } from 'sonner';
import { Modal } from '@/components/ui/Modal';
import { MOCK_REQUESTS, type Organization, type ChangeRequest } from '@/lib/mockData';

type Props = { org: Organization };

export function AdminTables({ org }: Props) {
  const [items, setItems] = useState<ChangeRequest[]>(() => [...MOCK_REQUESTS[org]]);
  const [rejectId, setRejectId] = useState<number | null>(null);

  // Reset list when org changes
  const orgItems = items.filter((i) => i.org === org);

  const handleApprove = (id: number) => {
    setItems((p) => p.filter((i) => i.id !== id));
    toast.success('Solicitação aprovada', { description: 'Alteração registrada no histórico.' });
  };

  const confirmReject = () => {
    if (!rejectId) return;
    setItems((p) => p.filter((i) => i.id !== rejectId));
    setRejectId(null);
    toast.success('Solicitação rejeitada', { description: 'Lançamento original mantido.' });
  };

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="px-5 py-4 border-b border-gray-200 sticky top-0 bg-white/95 backdrop-blur-sm z-10 flex-shrink-0">
        <div className="flex justify-between items-center">
          <h3 className="font-extrabold text-gray-900 text-sm">Pedidos de Ajuste</h3>
          <span className="bg-amber-100 text-amber-800 text-xs font-bold px-2 py-0.5 rounded-full">
            {orgItems.length} pendentes
          </span>
        </div>
        <p className="text-gray-400 text-xs mt-0.5">Edições e exclusões aguardando revisão</p>
      </div>

      {/* List */}
      <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-3">
        {orgItems.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-32 text-gray-300 gap-2">
            <Check size={28} strokeWidth={1.5} />
            <p className="text-sm font-medium">Caixa limpa para {org}!</p>
          </div>
        ) : (
          orgItems.map((item) => (
            <div key={item.id} className="flex flex-col gap-3 p-4 rounded-xl border-2 border-red-100 bg-red-50/30 hover:border-red-200 transition-all">
              <div className="flex items-start gap-2 min-w-0">
                <AlertTriangle size={14} className="text-red-500 mt-0.5 flex-shrink-0" strokeWidth={2.5} />
                <div className="min-w-0">
                  <p className="font-bold text-gray-500 uppercase text-[10px] tracking-wider">{item.type}</p>
                  <p className="text-gray-800 text-xs font-medium leading-snug mt-0.5 break-words">{item.desc}</p>
                  <p className="text-gray-400 text-[10px] mt-1">{item.time}</p>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <button onClick={() => handleApprove(item.id)}
                  className="h-8 rounded-lg bg-green-50 border border-green-200 hover:bg-green-100 text-green-700 text-xs font-bold flex items-center justify-center gap-1.5 transition-colors">
                  <Check size={13} strokeWidth={2.5} /> Aprovar
                </button>
                <button onClick={() => setRejectId(item.id)}
                  className="h-8 rounded-lg bg-white border border-gray-200 hover:bg-gray-50 text-gray-600 text-xs font-bold flex items-center justify-center gap-1.5 transition-colors">
                  <X size={13} strokeWidth={2.5} /> Rejeitar
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      <Modal
        isOpen={rejectId !== null}
        onClose={() => setRejectId(null)}
        title="Rejeitar Solicitação?"
        description="O lançamento original será mantido. O usuário não poderá nova tentativa sem contato."
        confirmText="Sim, Rejeitar"
        isDestructive
        onConfirm={confirmReject}
      />
    </div>
  );
}
