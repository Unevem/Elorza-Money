"use client";

import { useState } from 'react';
import { Check, X, AlertTriangle } from 'lucide-react';
import { toast } from 'sonner';
import { Modal } from '@/components/ui/Modal';

const INITIAL_REQUESTS = [
  { id: 101, type: 'DELETION', desc: 'O usuário quer DELETAR a transação "Assaí Atacadista" (R$ 150,00).', time: 'Hoje, 10:35' },
  { id: 102, type: 'EDIT', desc: 'O usuário quer ALTERAR o valor de R$ 45,90 para R$ 40,00 em "Remédio Pressão".', time: 'Hoje, 09:15' },
  { id: 103, type: 'EDIT', desc: 'O usuário quer ALTERAR a categoria de "Transporte" para "Saúde" em "Uber Médico".', time: 'Ontem, 20:10' },
];

export function AdminTables() {
  const [items, setItems] = useState(INITIAL_REQUESTS);
  
  // Modal State for Reject
  const [isRejectOpen, setIsRejectOpen] = useState(false);
  const [rejectId, setRejectId] = useState<number | null>(null);

  const handleApprove = (id: number) => {
    setItems((prev) => prev.filter((item) => item.id !== id));
    toast.success('Solicitação APROVADA com sucesso', {
      description: 'As alterações já refletem no painel principal.'
    });
  };

  const attemptReject = (id: number) => {
    setRejectId(id);
    setIsRejectOpen(true);
  };

  const confirmReject = () => {
    if (!rejectId) return;
    setItems((prev) => prev.filter((item) => item.id !== rejectId));
    setIsRejectOpen(false);
    toast.success('Solicitação REJEITADA', {
      description: 'O lançamento original foi mantido intacto.'
    });
  };

  return (
    <div className="flex flex-col h-full bg-white relative">
      <div className="px-6 py-5 border-b border-gray-200 sticky top-0 bg-white/90 backdrop-blur-sm z-10">
        <div className="flex justify-between items-center">
          <h3 className="font-extrabold text-gray-900 text-lg">Pedidos de Ajuste</h3>
          <span className="bg-amber-100 text-amber-800 text-xs font-bold px-2 py-0.5 rounded-full">{items.length} pendentes</span>
        </div>
        <p className="text-gray-500 text-sm mt-1">Aprove ou rejeite edições feitas pelo usuário após o lançamento.</p>
      </div>
      
      <div className="flex-1 overflow-y-auto p-5 flex flex-col gap-4">
        {items.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-40 text-gray-400">
            <Check size={32} className="mb-2 text-green-500 opacity-50" />
            <p className="font-medium">Caixa de entrada limpa!</p>
          </div>
        ) : (
          items.map((item) => (
            <div key={item.id} className="flex flex-col gap-3 p-5 rounded-2xl border-2 border-red-100 bg-red-50/30 hover:border-red-200 transition-all shadow-sm">
              <div className="flex justify-between items-start gap-4">
                <div className="flex flex-col gap-2">
                  <div className="flex items-center gap-2">
                    <AlertTriangle size={18} className="text-red-500" strokeWidth={2.5} />
                    <p className="font-bold text-gray-900 tracking-tight uppercase text-xs">{item.type} REQUEST</p>
                  </div>
                  <p className="text-gray-700 font-medium text-base leading-snug">{item.desc}</p>
                  <p className="text-gray-400 text-xs">{item.time}</p>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-3 mt-4">
                <button 
                  onClick={() => handleApprove(item.id)}
                  className="h-10 rounded-xl bg-green-50 flex items-center justify-center gap-2 border border-green-200 hover:bg-green-100 transition-colors text-green-700 hover:shadow-sm"
                >
                  <Check size={18} strokeWidth={2.5} />
                  <span className="text-sm font-bold">Aprovar Mudança</span>
                </button>
                <button 
                  onClick={() => attemptReject(item.id)}
                  className="h-10 rounded-xl bg-white flex items-center justify-center gap-2 border border-gray-300 hover:bg-gray-50 transition-colors text-gray-600 hover:shadow-sm"
                >
                  <X size={18} strokeWidth={2.5} />
                  <span className="text-sm font-bold">Recusar Modificação</span>
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      <Modal 
        isOpen={isRejectOpen}
        onClose={() => setIsRejectOpen(false)}
        title="Rejeitar Solicitação"
        description="Você tem certeza que deseja negar essa alteração? O usuário será mantido com a transação original na interface dele."
        confirmText="Sim, Rejeitar"
        isDestructive={true}
        onConfirm={confirmReject}
      />
    </div>
  );
}
