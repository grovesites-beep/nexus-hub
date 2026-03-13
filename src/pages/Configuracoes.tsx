import React, { useState } from 'react';
import { Save, Shield, User, Activity, Globe } from 'lucide-react';
import { toast } from 'sonner';

export default function Configuracoes() {
  const [activeTab, setActiveTab] = useState('site');

  const handleSave = () => toast.success('Configurações salvas com sucesso!');

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold text-zinc-950">Configurações</h1>
      
      <div className="flex border-b border-zinc-200 overflow-x-auto">
        {[
          { id: 'site', name: 'Site (ACF)', icon: Globe },
          { id: 'equipe', name: 'Equipe', icon: Shield },
          { id: 'perfil', name: 'Meu Perfil', icon: User },
          { id: 'auditoria', name: 'Log de Atividades', icon: Activity },
        ].map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex items-center gap-2 border-b-2 px-4 py-3 text-sm font-medium transition-colors whitespace-nowrap ${
              activeTab === tab.id ? 'border-zinc-950 text-zinc-950' : 'border-transparent text-zinc-500 hover:text-zinc-900'
            }`}
          >
            <tab.icon className="h-4 w-4" /> {tab.name}
          </button>
        ))}
      </div>

      <div className="rounded-xl border border-zinc-200 bg-white p-6 shadow-sm">
        {activeTab === 'site' && (
          <div className="space-y-4 max-w-2xl">
            <h2 className="text-lg font-medium text-zinc-950">Informações do Site</h2>
            <p className="text-sm text-zinc-500 mb-4">Estas informações serão sincronizadas com o seu site WordPress.</p>
            
            <div className="grid gap-2">
              <label className="text-sm font-medium text-zinc-900">Telefone de Contato</label>
              <input type="text" defaultValue="(11) 99999-9999" className="rounded-lg border border-zinc-200 px-3 py-2 text-sm outline-none focus:border-zinc-950 focus:ring-1 focus:ring-zinc-950" />
            </div>
            <div className="grid gap-2">
              <label className="text-sm font-medium text-zinc-900">Endereço Físico</label>
              <textarea rows={3} defaultValue="Av. Paulista, 1000 - São Paulo, SP" className="rounded-lg border border-zinc-200 px-3 py-2 text-sm outline-none focus:border-zinc-950 focus:ring-1 focus:ring-zinc-950" />
            </div>
            <div className="grid gap-2">
              <label className="text-sm font-medium text-zinc-900">Link do Instagram</label>
              <input type="url" defaultValue="https://instagram.com/empresa" className="rounded-lg border border-zinc-200 px-3 py-2 text-sm outline-none focus:border-zinc-950 focus:ring-1 focus:ring-zinc-950" />
            </div>
            <button onClick={handleSave} className="mt-4 inline-flex items-center gap-2 rounded-xl bg-zinc-900 px-4 py-2 text-sm font-medium text-white hover:bg-zinc-800">
              <Save className="h-4 w-4" /> Salvar Alterações
            </button>
          </div>
        )}
        
        {activeTab === 'equipe' && (
          <div className="space-y-4">
            <h2 className="text-lg font-medium text-zinc-950">Gestão de Equipe</h2>
            <p className="text-sm text-zinc-500">Convide membros para gerenciar este painel.</p>
            <div className="flex items-center gap-4">
              <input type="email" placeholder="Email do novo membro" className="rounded-lg border border-zinc-200 px-3 py-2 text-sm outline-none focus:border-zinc-950 focus:ring-1 focus:ring-zinc-950" />
              <button className="rounded-xl bg-zinc-900 px-4 py-2 text-sm font-medium text-white hover:bg-zinc-800">Convidar</button>
            </div>
          </div>
        )}

        {activeTab === 'perfil' && (
          <div className="space-y-4 max-w-md">
            <h2 className="text-lg font-medium text-zinc-950">Meu Perfil</h2>
            <div className="grid gap-2">
              <label className="text-sm font-medium text-zinc-900">Nome</label>
              <input type="text" defaultValue="Admin" className="rounded-lg border border-zinc-200 px-3 py-2 text-sm outline-none focus:border-zinc-950 focus:ring-1 focus:ring-zinc-950" />
            </div>
            <div className="grid gap-2">
              <label className="text-sm font-medium text-zinc-900">Nova Senha</label>
              <input type="password" placeholder="••••••••" className="rounded-lg border border-zinc-200 px-3 py-2 text-sm outline-none focus:border-zinc-950 focus:ring-1 focus:ring-zinc-950" />
            </div>
            <button onClick={handleSave} className="mt-2 inline-flex items-center gap-2 rounded-xl bg-zinc-900 px-4 py-2 text-sm font-medium text-white hover:bg-zinc-800">
              Atualizar Perfil
            </button>
          </div>
        )}

        {activeTab === 'auditoria' && (
          <div className="space-y-4">
            <h2 className="text-lg font-medium text-zinc-950">Log de Atividades</h2>
            <ul className="space-y-3">
              <li className="text-sm text-zinc-700"><span className="font-medium">Admin</span> fez login - <span className="text-zinc-500">Hoje, 10:00</span></li>
              <li className="text-sm text-zinc-700"><span className="font-medium">Admin</span> alterou o status do lead "João Silva" - <span className="text-zinc-500">Ontem, 15:30</span></li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}
