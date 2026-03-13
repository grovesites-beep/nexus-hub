import React, { useState } from 'react';
import { Plus, Edit, Image as ImageIcon, Power } from 'lucide-react';
import { toast } from 'sonner';

export default function Servicos() {
  const [servicos, setServicos] = useState([
    { id: 1, nome: 'Criação de Sites', ativo: true },
    { id: 2, nome: 'Gestão de Tráfego', ativo: true },
    { id: 3, nome: 'Identidade Visual', ativo: false },
  ]);

  const toggleStatus = (id: number) => {
    setServicos(servicos.map(s => s.id === id ? { ...s, ativo: !s.ativo } : s));
    toast.success('Visibilidade do serviço atualizada no site!');
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold text-zinc-950">Serviços</h1>
        <button className="inline-flex items-center gap-2 rounded-xl bg-zinc-900 px-4 py-2 text-sm font-medium text-white hover:bg-zinc-800 shadow-sm">
          <Plus className="h-4 w-4" /> Novo Serviço
        </button>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {servicos.map((servico) => (
          <div key={servico.id} className={`rounded-xl border border-zinc-200 bg-white p-6 shadow-sm transition-opacity ${!servico.ativo && 'opacity-60'}`}>
            <div className="flex items-start justify-between mb-4">
              <h3 className="font-medium text-zinc-900">{servico.nome}</h3>
              <button 
                onClick={() => toggleStatus(servico.id)}
                className={`rounded-full p-2 ${servico.ativo ? 'text-emerald-500 hover:bg-emerald-50' : 'text-zinc-400 hover:bg-zinc-100'}`}
                title={servico.ativo ? "Pausar Serviço" : "Ativar Serviço"}
              >
                <Power className="h-5 w-5" />
              </button>
            </div>
            
            <div className="flex gap-2 mt-6">
              <button className="flex-1 inline-flex items-center justify-center gap-2 rounded-lg border border-zinc-200 px-3 py-2 text-xs font-medium text-zinc-700 hover:bg-zinc-50">
                <Edit className="h-3 w-3" /> Editar
              </button>
              <button className="flex-1 inline-flex items-center justify-center gap-2 rounded-lg border border-zinc-200 px-3 py-2 text-xs font-medium text-zinc-700 hover:bg-zinc-50">
                <ImageIcon className="h-3 w-3" /> Galeria
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
