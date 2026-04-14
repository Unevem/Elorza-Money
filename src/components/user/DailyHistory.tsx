"use client";
import { useState } from 'react';
import { toast } from 'sonner';
import { Modal } from '@/components/ui/Modal';

const FAKE_HISTORY = [
  { id: 1, category: 'Alimentação', description: 'Assaí Atacadista', amount: 150.0, time: 'Hoje, 10:30', status: 'aprovado' },
  { id: 2, category: 'Saúde', description: 'Remédio Pressão', amount: 45.9, time: 'Hoje, 09:12', status: 'aprovado' },
];

export function DailyHistory() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedTx, setSelectedTx] = useState<any>(null);
  const [reason, setReason] = useState('');

  const handleEditClick = (tx: any) => {
    setSelectedTx(tx);
    setReason('');
    setIsModalOpen(true);
  };

  const handleSendRequest = () => {
    setIsModalOpen(false);
    toast.success('Solicitação enviada de volta pra base!', {
      description: 'O Administrador verá seu pedido em breve.'
    });
  };

  return (
    <div className="flex flex-col gap-5 w-full pb-20">
      <h2 className="text-3xl font-bold text-text">Meu Histórico</h2>
      <div className="flex flex-col gap-4">
        {FAKE_HISTORY.map((tx) => (
          <div key={tx.id} className="w-full flex-col p-5 rounded-2xl border-2 border-gray-200 bg-white shadow-sm flex gap-4">
            
            <div className="flex justify-between items-start gap-4">
              <div className="flex flex-col">
                <p className="font-bold text-xl text-text">{tx.category}</p>
                {tx.description && <p className="text-lg text-gray-600 leading-snug">{tx.description}</p>}
                <p className="text-base text-gray-500 mt-2 font-medium">{tx.time}</p>
              </div>
              <div className="flex flex-col items-end gap-3 text-right">
                <p className="font-extrabold text-2xl text-text tracking-tight">
                  R$ {tx.amount.toFixed(2).replace('.', ',')}
                </p>
                {/* Status Simplificado: Apenas 'aprovados' transitam naturalmente */}
                <span className="bg-green-100 text-green-800 border-2 border-green-200 text-sm font-bold px-3 py-1 rounded-full uppercase tracking-wider">Lançado</span>
              </div>
            </div>

             <button 
                type="button"
                onClick={() => handleEditClick(tx)}
                className="w-full mt-2 h-14 bg-gray-50 text-gray-600 font-bold text-lg rounded-xl active:bg-gray-200 border-2 border-gray-200 hover:border-gray-300 transition-colors"
              >
                Ops, errei! Solicitar Correção
              </button>
          </div>
        ))}
      </div>

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="O que deu errado?"
        confirmText="Enviar para Correção"
        onConfirm={handleSendRequest}
        description={
          <div className="flex flex-col gap-4 mt-2">
            <p>Você quer alterar a transação de <strong>{selectedTx?.category}</strong> no valor de <strong>R$ {selectedTx?.amount?.toFixed(2).replace('.', ',')}</strong>?</p>
            <textarea 
              className="w-full border-2 border-gray-300 rounded-2xl p-4 h-32 text-lg focus:border-primary focus:ring-4 focus:ring-primary/20 outline-none text-gray-900"
              placeholder="Me conte o que precisa ser corrigido (ex: Valor errado, esqueci de marcar a data)..."
              value={reason}
              onChange={(e) => setReason(e.target.value)}
            />
          </div>
        }
      />
    </div>
  );
}
