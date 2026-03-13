import React, { useState, useEffect } from 'react';
import { Search, Filter, MessageCircle, MoreVertical, ThumbsUp, ThumbsDown, User, Calendar, MapPin, AlertCircle, Link as LinkIcon, Activity } from 'lucide-react';
import { toast } from 'sonner';
import { databases, DATABASE_ID, COLLECTIONS } from '../../lib/appwrite';

export default function ClientLeads() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedLead, setSelectedLead] = useState<any>(null);
  
  const [leads, setLeads] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLeads = async () => {
      try {
        const response = await databases.listDocuments(DATABASE_ID, COLLECTIONS.LEADS);
        const mounted = response.documents.map(doc => ({
           id: doc.$id,
           nome: doc.nome,
           email: doc.email,
           telefone: doc.telefone,
           status: doc.status || 'novo',
           data: doc.data || new Date(doc.$createdAt).toLocaleString('pt-BR'),
           origem: doc.origem || 'Desconhecida',
           score: doc.score || 50,
           utm: null,
           pagesVisited: [],
           isDuplicate: false,
           dynamicFields: {}
        }));
        setLeads(mounted);
      } catch (error) {
        toast.error('Erro ao carregar leads.');
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchLeads();
  }, []);

  const filteredLeads = leads.filter(lead => 
    lead.nome.toLowerCase().includes(searchQuery.toLowerCase()) ||
    lead.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleFeedback = (lead: any, type: 'qualificado' | 'desqualificado') => {
    toast.success(`Feedback enviado: Lead ${type}`);
    setSelectedLead(null);
  };

  const handleWhatsApp = (telefone: string, template: string) => {
    let msg = '';
    if (template === 'saudacao') msg = 'Olá! Vi que você se cadastrou no nosso site. Como posso ajudar?';
    if (template === 'reuniao') msg = 'Olá! Gostaria de agendar uma reunião rápida para entender sua demanda?';
    
    const url = `https://wa.me/55${telefone.replace(/\D/g, '')}?text=${encodeURIComponent(msg)}`;
    window.open(url, '_blank');
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <h1 className="text-2xl font-semibold text-zinc-950">Gestão de Leads</h1>
        <div className="flex items-center gap-2">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-400" />
            <input
              type="text"
              placeholder="Buscar leads..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full rounded-[var(--radius,0.5rem)] border border-zinc-200 py-2 pl-10 pr-4 text-sm outline-none focus:border-zinc-950 focus:ring-1 focus:ring-zinc-950 sm:w-64"
            />
          </div>
          <button className="inline-flex items-center gap-2 rounded-[var(--radius,0.5rem)] border border-zinc-200 bg-white px-4 py-2 text-sm font-medium text-zinc-700 hover:bg-zinc-50 shadow-sm">
            <Filter className="h-4 w-4" /> Filtros
          </button>
        </div>
      </div>

      {filteredLeads.length === 0 ? (
        <div className="flex flex-col items-center justify-center rounded-[var(--radius,1rem)] border border-dashed border-zinc-300 bg-zinc-50 py-24">
          <User className="h-12 w-12 text-zinc-300 mb-4" />
          <h3 className="text-lg font-medium text-zinc-900">Nenhum lead encontrado</h3>
          <p className="text-sm text-zinc-500 max-w-sm text-center mt-1">
            Não encontramos nenhum lead com os termos da sua busca. Tente alterar os filtros.
          </p>
        </div>
      ) : (
        <div className="overflow-hidden rounded-[var(--radius,1rem)] border border-zinc-200 bg-white shadow-sm">
          <table className="w-full text-left text-sm">
            <thead className="bg-zinc-50 text-zinc-500">
              <tr>
                <th className="px-6 py-3 font-medium">Nome / Contato</th>
                <th className="px-6 py-3 font-medium">Origem</th>
                <th className="px-6 py-3 font-medium">Score</th>
                <th className="px-6 py-3 font-medium">Status</th>
                <th className="px-6 py-3 font-medium">Data</th>
                <th className="px-6 py-3 font-medium text-right">Ações</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-200">
              {loading ? (
                  <tr>
                      <td colSpan={6} className="py-8 text-center text-zinc-500">
                          Carregando leads...
                      </td>
                  </tr>
              ) : filteredLeads.map(lead => (
                <tr key={lead.id} className="hover:bg-zinc-50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="font-medium text-zinc-900 flex items-center gap-2">
                      {lead.nome}
                      {lead.isDuplicate && <span className="inline-flex items-center rounded-full bg-red-100 px-2 py-0.5 text-[10px] font-medium text-red-800"><AlertCircle className="h-3 w-3 mr-1" /> Duplicado</span>}
                    </div>
                    <div className="text-zinc-500 mt-0.5">{lead.email}</div>
                    <div className="text-zinc-500">{lead.telefone}</div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-zinc-900">{lead.origem}</div>
                    {lead.utm && (
                      <div className="flex gap-1 mt-1">
                        <span className="inline-flex items-center rounded-[var(--radius,0.25rem)] bg-zinc-100 px-1.5 py-0.5 text-[10px] font-medium text-zinc-600">src: {lead.utm.source}</span>
                        <span className="inline-flex items-center rounded-[var(--radius,0.25rem)] bg-zinc-100 px-1.5 py-0.5 text-[10px] font-medium text-zinc-600">cmp: {lead.utm.campaign}</span>
                      </div>
                    )}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-1">
                      <Activity className={`h-4 w-4 ${lead.score > 70 ? 'text-emerald-500' : lead.score > 40 ? 'text-orange-500' : 'text-red-500'}`} />
                      <span className={`font-medium ${lead.score > 70 ? 'text-emerald-700' : lead.score > 40 ? 'text-orange-700' : 'text-red-700'}`}>{lead.score}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                      lead.status === 'novo' ? 'bg-blue-100 text-blue-800' :
                      lead.status === 'em_atendimento' ? 'bg-orange-100 text-orange-800' :
                      'bg-emerald-100 text-emerald-800'
                    }`}>
                      {lead.status.replace('_', ' ').toUpperCase()}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-zinc-500">{lead.data}</td>
                  <td className="px-6 py-4 text-right">
                    <button 
                      onClick={() => setSelectedLead(lead)}
                      className="inline-flex items-center justify-center rounded-[var(--radius,0.5rem)] border border-zinc-200 bg-white px-3 py-1.5 text-xs font-medium text-zinc-700 hover:bg-zinc-50 shadow-sm mr-2"
                    >
                      Ver Detalhes
                    </button>
                    <button className="p-1.5 text-zinc-400 hover:text-zinc-900"><MoreVertical className="h-4 w-4" /></button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Lead Details Modal */}
      {selectedLead && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-zinc-950/50 p-4">
          <div className="w-full max-w-2xl rounded-[var(--radius,1rem)] bg-white shadow-xl max-h-[90vh] overflow-y-auto">
            <div className="border-b border-zinc-200 px-6 py-4 flex items-center justify-between sticky top-0 bg-white z-10">
              <h2 className="text-xl font-semibold text-zinc-950">Detalhes do Lead</h2>
              <button onClick={() => setSelectedLead(null)} className="text-zinc-400 hover:text-zinc-900">&times;</button>
            </div>
            
            <div className="p-6 space-y-6">
              {/* Header Info */}
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="text-2xl font-semibold text-zinc-900 flex items-center gap-2">
                    {selectedLead.nome}
                    {selectedLead.isDuplicate && <span className="inline-flex items-center rounded-full bg-red-100 px-2 py-0.5 text-xs font-medium text-red-800"><AlertCircle className="h-3 w-3 mr-1" /> Lead Duplicado</span>}
                  </h3>
                  <div className="mt-2 space-y-1 text-sm text-zinc-500">
                    <p className="flex items-center gap-2"><User className="h-4 w-4" /> {selectedLead.email}</p>
                    <p className="flex items-center gap-2"><MessageCircle className="h-4 w-4" /> {selectedLead.telefone}</p>
                    <p className="flex items-center gap-2"><Calendar className="h-4 w-4" /> {selectedLead.data}</p>
                  </div>
                </div>
                
                <div className="text-right">
                  <div className="mb-2">
                    <span className="text-xs text-zinc-500 block mb-1">Lead Score</span>
                    <div className="inline-flex items-center justify-center h-12 w-12 rounded-full border-4 border-emerald-500 text-lg font-bold text-emerald-700">
                      {selectedLead.score}
                    </div>
                  </div>
                  <div className="mt-4">
                    <label className="text-xs font-medium text-zinc-900 block mb-1">Atribuir Vendedor</label>
                    <select className="rounded-[var(--radius,0.5rem)] border border-zinc-200 px-3 py-1.5 text-sm outline-none">
                      <option>Nenhum</option>
                      <option>Vendedor 1</option>
                      <option>Vendedor 2</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* WhatsApp Quick Reply */}
              <div className="rounded-[var(--radius,0.75rem)] bg-emerald-50 p-4 border border-emerald-100 flex items-center gap-4">
                <div className="flex-1">
                  <label className="text-xs font-medium text-emerald-900 block mb-1">Template de Resposta Rápida</label>
                  <select id="wa-template" className="w-full rounded-[var(--radius,0.5rem)] border border-emerald-200 bg-white px-3 py-2 text-sm outline-none">
                    <option value="saudacao">Saudação Inicial</option>
                    <option value="reuniao">Agendar Reunião</option>
                    <option value="">(Mensagem em branco)</option>
                  </select>
                </div>
                <button 
                  onClick={() => {
                    const select = document.getElementById('wa-template') as HTMLSelectElement;
                    handleWhatsApp(selectedLead.telefone, select.value);
                  }}
                  className="mt-5 inline-flex items-center gap-2 rounded-[var(--radius,0.5rem)] bg-emerald-600 px-4 py-2 text-sm font-medium text-white hover:bg-emerald-700 shadow-sm whitespace-nowrap"
                >
                  <MessageCircle className="h-4 w-4" /> Chamar no WhatsApp
                </button>
              </div>

              {/* Tracking & Dynamic Fields */}
              <div className="grid grid-cols-2 gap-6 border-t border-zinc-200 pt-6">
                <div>
                  <h4 className="font-medium text-zinc-900 mb-3 flex items-center gap-2"><LinkIcon className="h-4 w-4" /> Rastreamento (UTM)</h4>
                  {selectedLead.utm ? (
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between border-b border-zinc-100 pb-1">
                        <span className="text-zinc-500">Source:</span>
                        <span className="font-medium text-zinc-900">{selectedLead.utm.source}</span>
                      </div>
                      <div className="flex justify-between border-b border-zinc-100 pb-1">
                        <span className="text-zinc-500">Campaign:</span>
                        <span className="font-medium text-zinc-900">{selectedLead.utm.campaign}</span>
                      </div>
                      <div className="flex justify-between border-b border-zinc-100 pb-1">
                        <span className="text-zinc-500">Medium:</span>
                        <span className="font-medium text-zinc-900">{selectedLead.utm.medium}</span>
                      </div>
                    </div>
                  ) : (
                    <p className="text-sm text-zinc-500">Sem dados de UTM.</p>
                  )}

                  <h4 className="font-medium text-zinc-900 mt-6 mb-3 flex items-center gap-2"><MapPin className="h-4 w-4" /> Páginas Visitadas</h4>
                  <ul className="space-y-1">
                    {selectedLead.pagesVisited.map((page: string, i: number) => (
                      <li key={i} className="text-sm text-zinc-600 flex items-center gap-2">
                        <span className="h-1.5 w-1.5 rounded-full bg-zinc-300"></span> {page}
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h4 className="font-medium text-zinc-900 mb-3">Campos Dinâmicos (Formulário)</h4>
                  {Object.keys(selectedLead.dynamicFields).length > 0 ? (
                    <div className="space-y-3">
                      {Object.entries(selectedLead.dynamicFields).map(([key, value]: any) => (
                        <div key={key}>
                          <span className="block text-xs text-zinc-500">{key}</span>
                          <span className="block text-sm font-medium text-zinc-900">{value}</span>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-sm text-zinc-500">Nenhum campo extra mapeado.</p>
                  )}

                  <div className="mt-6">
                    <h4 className="font-medium text-zinc-900 mb-2">Anotações Internas</h4>
                    <textarea 
                      className="w-full rounded-[var(--radius,0.5rem)] border border-zinc-200 p-3 text-sm outline-none focus:border-zinc-950 focus:ring-1 focus:ring-zinc-950"
                      rows={3}
                      placeholder="Adicione notas sobre este lead..."
                    ></textarea>
                    <button className="mt-2 text-xs font-medium text-zinc-900 hover:underline">Salvar anotação</button>
                  </div>
                </div>
              </div>

              {/* Feedback Section */}
              <div className="border-t border-zinc-200 pt-6 bg-zinc-50 -mx-6 -mb-6 p-6 rounded-b-[var(--radius,1rem)]">
                <h4 className="font-medium text-zinc-900 mb-2">Feedback para a Agência</h4>
                <p className="text-sm text-zinc-500 mb-4">Avalie a qualidade deste lead para otimizarmos suas campanhas.</p>
                <div className="flex gap-3">
                  <button 
                    onClick={() => handleFeedback(selectedLead, 'qualificado')}
                    className="flex flex-1 items-center justify-center gap-2 rounded-[var(--radius,0.75rem)] bg-white border border-emerald-200 px-4 py-3 text-sm font-medium text-emerald-700 hover:bg-emerald-50 shadow-sm"
                  >
                    <ThumbsUp className="h-4 w-4" /> Lead Qualificado
                  </button>
                  <button 
                    onClick={() => handleFeedback(selectedLead, 'desqualificado')}
                    className="flex flex-1 items-center justify-center gap-2 rounded-[var(--radius,0.75rem)] bg-white border border-red-200 px-4 py-3 text-sm font-medium text-red-700 hover:bg-red-50 shadow-sm"
                  >
                    <ThumbsDown className="h-4 w-4" /> Lead Desqualificado
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
