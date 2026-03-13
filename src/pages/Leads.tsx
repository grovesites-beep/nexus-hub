import React, { useState } from 'react';
import { Search, Download, MessageCircle, X, Filter, Users } from 'lucide-react';
import { toast } from 'sonner';

export default function Leads() {
  const [leads, setLeads] = useState([
    { id: 1, nome: 'João Silva', email: 'joao@exemplo.com', telefone: '5511999999999', servico: 'Criação de Site', status: 'novo', data: '13/03/2026', mensagem: 'Gostaria de um orçamento para um site institucional.' },
    { id: 2, nome: 'Maria Santos', email: 'maria@exemplo.com', telefone: '5511988888888', servico: 'Marketing Digital', status: 'em atendimento', data: '12/03/2026', mensagem: 'Preciso de ajuda com anúncios no Google.' },
    { id: 3, nome: 'Empresa XYZ', email: 'contato@xyz.com', telefone: '5511977777777', servico: 'Consultoria', status: 'finalizado', data: '10/03/2026', mensagem: 'Temos interesse em uma consultoria financeira.' },
  ]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedLead, setSelectedLead] = useState<any>(null);

  const handleExport = () => {
    toast.success('Dados exportados com sucesso! O download iniciará em breve.');
  };

  const handleWhatsApp = (telefone: string) => {
    window.open(`https://wa.me/${telefone}?text=Olá! Recebemos seu contato através do nosso site.`, '_blank');
    toast.info('Redirecionando para o WhatsApp...');
  };

  const filteredLeads = leads.filter(l => l.nome.toLowerCase().includes(searchTerm.toLowerCase()) || l.email.toLowerCase().includes(searchTerm.toLowerCase()));

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <h1 className="text-2xl font-semibold text-zinc-950">Oportunidades (Leads)</h1>
        <button onClick={handleExport} className="inline-flex items-center gap-2 rounded-xl bg-white border border-zinc-200 px-4 py-2 text-sm font-medium text-zinc-900 hover:bg-zinc-50 shadow-sm">
          <Download className="h-4 w-4" /> Exportar CSV
        </button>
      </div>

      <div className="flex items-center gap-4 rounded-xl bg-white p-4 shadow-sm border border-zinc-200">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-500" />
          <input 
            type="text" 
            placeholder="Buscar por nome ou email..." 
            className="w-full rounded-lg border border-zinc-200 py-2 pl-10 pr-4 text-sm outline-none focus:border-zinc-950 focus:ring-1 focus:ring-zinc-950"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <button className="inline-flex items-center gap-2 rounded-lg border border-zinc-200 px-4 py-2 text-sm font-medium text-zinc-700 hover:bg-zinc-50">
          <Filter className="h-4 w-4" /> Status
        </button>
      </div>

      {/* Table */}
      {filteredLeads.length > 0 ? (
        <div className="overflow-hidden rounded-xl border border-zinc-200 bg-white shadow-sm">
          <table className="w-full text-left text-sm">
            <thead className="bg-zinc-50 text-zinc-500">
              <tr>
                <th className="px-6 py-3 font-medium">Nome</th>
                <th className="px-6 py-3 font-medium">Serviço</th>
                <th className="px-6 py-3 font-medium">Status</th>
                <th className="px-6 py-3 font-medium">Data</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-200">
              {filteredLeads.map(lead => (
                <tr key={lead.id} onClick={() => setSelectedLead(lead)} className="cursor-pointer hover:bg-zinc-50 transition-colors">
                  <td className="px-6 py-4 font-medium text-zinc-900">{lead.nome}</td>
                  <td className="px-6 py-4 text-zinc-500">{lead.servico}</td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium capitalize ${
                      lead.status === 'novo' ? 'bg-zinc-900 text-white' : 
                      lead.status === 'em atendimento' ? 'bg-zinc-100 text-zinc-800' : 
                      'bg-emerald-100 text-emerald-800'
                    }`}>
                      {lead.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-zinc-500">{lead.data}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-zinc-300 bg-white py-12 text-center">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-zinc-100">
            <Users className="h-6 w-6 text-zinc-400" />
          </div>
          <h3 className="mt-4 text-lg font-medium text-zinc-900">Nenhum lead encontrado</h3>
          <p className="mt-1 text-sm text-zinc-500">Tente ajustar seus filtros de busca.</p>
        </div>
      )}

      {/* Modal */}
      {selectedLead && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-zinc-950/50 p-4">
          <div className="w-full max-w-lg rounded-2xl bg-white p-6 shadow-xl">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-zinc-950">Detalhes da Oportunidade</h2>
              <button onClick={() => setSelectedLead(null)} className="rounded-full p-2 hover:bg-zinc-100"><X className="h-5 w-5 text-zinc-500" /></button>
            </div>
            
            <div className="space-y-4">
              <div>
                <p className="text-sm font-medium text-zinc-500">Nome</p>
                <p className="text-base text-zinc-900">{selectedLead.nome}</p>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm font-medium text-zinc-500">Email</p>
                  <p className="text-base text-zinc-900">{selectedLead.email}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-zinc-500">Telefone</p>
                  <p className="text-base text-zinc-900">{selectedLead.telefone}</p>
                </div>
              </div>
              <div>
                <p className="text-sm font-medium text-zinc-500">Mensagem Original</p>
                <div className="mt-1 rounded-lg bg-zinc-50 p-3 text-sm text-zinc-700">
                  {selectedLead.mensagem}
                </div>
              </div>
              
              <div className="pt-4 border-t border-zinc-100">
                <p className="text-sm font-medium text-zinc-900 mb-2">Anotações Internas (Follow-up)</p>
                <textarea 
                  className="w-full rounded-lg border border-zinc-200 p-3 text-sm outline-none focus:border-zinc-950 focus:ring-1 focus:ring-zinc-950" 
                  rows={3} 
                  placeholder="Adicione notas sobre o atendimento..."
                ></textarea>
              </div>
            </div>

            <div className="mt-6 flex items-center justify-end gap-3">
              <button onClick={() => {
                toast.success('Lead finalizado! Webhook disparado para o n8n.');
                setSelectedLead({...selectedLead, status: 'finalizado'});
                setLeads(leads.map(l => l.id === selectedLead.id ? {...l, status: 'finalizado'} : l));
              }} className="rounded-xl px-4 py-2 text-sm font-medium text-zinc-700 hover:bg-zinc-100">
                Marcar como Finalizado
              </button>
              <button onClick={() => handleWhatsApp(selectedLead.telefone)} className="inline-flex items-center gap-2 rounded-xl bg-emerald-500 px-4 py-2 text-sm font-medium text-white hover:bg-emerald-600 shadow-sm">
                <MessageCircle className="h-4 w-4" /> Chamar no WhatsApp
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
