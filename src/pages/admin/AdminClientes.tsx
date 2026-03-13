import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { setImpersonation } from '../../lib/auth';
import { databases, DATABASE_ID, COLLECTIONS } from '../../lib/appwrite';
import { Building, LogIn, MoreVertical, Plus, Settings, Activity, CheckCircle2, XCircle, Link as LinkIcon, RefreshCw, Image as ImageIcon, ToggleLeft } from 'lucide-react';

export default function AdminClientes() {
  const navigate = useNavigate();
  const [selectedClient, setSelectedClient] = useState<any>(null);
  const [isTestingConnection, setIsTestingConnection] = useState(false);
  const [wpConnected, setWpConnected] = useState(false);
  const [isFetchingCpts, setIsFetchingCpts] = useState(false);
  const [availableCpts, setAvailableCpts] = useState<{id: string, name: string, checked: boolean}[]>([]);

  const [clientes, setClientes] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchClientes = async () => {
      try {
        const response = await databases.listDocuments(DATABASE_ID, COLLECTIONS.CLIENTES);
        // Map appwrite document fields to the matching UI fields, since leads is now leadsCount
        const mounted = response.documents.map(doc => ({
           id: doc.$id,
           nome: doc.nome,
           plano: doc.plano,
           leads: doc.leadsCount,
           status: doc.status,
           uptime: doc.uptime,
           wpConnected: doc.wpConnected
        }));
        setClientes(mounted);
      } catch (error) {
        toast.error('Erro ao carregar clientes do banco de dados.');
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchClientes();
  }, []);

  const handleImpersonate = (cliente: any) => {
    setImpersonation(cliente.nome);
    toast.success(`Entrando como ${cliente.nome}`);
    navigate('/client');
  };

  // Reset states when selecting a new client
  const handleSelectClient = (cliente: any) => {
    setSelectedClient(cliente);
    setWpConnected(cliente.wpConnected);
    if (cliente.wpConnected) {
      // Simulate already fetched CPTs
      setAvailableCpts([
        { id: 'portfolio', name: 'Portfólio', checked: true },
        { id: 'imoveis', name: 'Imóveis', checked: false },
        { id: 'servicos', name: 'Serviços', checked: true },
        { id: 'produtos', name: 'Produtos', checked: false },
      ]);
    } else {
      setAvailableCpts([]);
    }
  };

  const testWpConnection = () => {
    setIsTestingConnection(true);
    setTimeout(() => {
      setIsTestingConnection(false);
      setWpConnected(true);
      toast.success('Conexão com a REST API do WordPress estabelecida com sucesso!');
      
      // Simulate fetching CPTs after connection
      setIsFetchingCpts(true);
      setTimeout(() => {
        setIsFetchingCpts(false);
        setAvailableCpts([
          { id: 'portfolio', name: 'Portfólio', checked: true },
          { id: 'imoveis', name: 'Imóveis', checked: false },
          { id: 'servicos', name: 'Serviços', checked: true },
          { id: 'produtos', name: 'Produtos', checked: false },
        ]);
        toast.success('Custom Post Types sincronizados!');
      }, 1000);
    }, 1500);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold text-zinc-950">Gestão de Clientes (Tenants)</h1>
        <button className="inline-flex items-center gap-2 rounded-[var(--radius,0.5rem)] bg-zinc-900 px-4 py-2 text-sm font-medium text-white hover:bg-zinc-800 shadow-sm" style={{ backgroundColor: 'var(--primary-color, #18181b)' }}>
          <Plus className="h-4 w-4" /> Novo Cliente
        </button>
      </div>

      <div className="overflow-hidden rounded-[var(--radius,1rem)] border border-zinc-200 bg-white shadow-sm">
        <table className="w-full text-left text-sm">
          <thead className="bg-zinc-50 text-zinc-500">
            <tr>
              <th className="px-6 py-3 font-medium">Cliente</th>
              <th className="px-6 py-3 font-medium">Uptime (Site)</th>
              <th className="px-6 py-3 font-medium">Leads (Mês)</th>
              <th className="px-6 py-3 font-medium">Status</th>
              <th className="px-6 py-3 font-medium text-right">Ações</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-zinc-200">
            {loading ? (
                <tr>
                    <td colSpan={5} className="py-8 text-center text-zinc-500">
                        Carregando clientes...
                    </td>
                </tr>
            ) : clientes.map(cliente => (
              <tr key={cliente.id} className="hover:bg-zinc-50 transition-colors">
                <td className="px-6 py-4 font-medium text-zinc-900 flex items-center gap-3">
                  <div className="h-8 w-8 rounded-[var(--radius,0.5rem)] bg-zinc-100 flex items-center justify-center"><Building className="h-4 w-4 text-zinc-500" /></div>
                  <div className="flex flex-col">
                    <span>{cliente.nome}</span>
                    <span className="text-xs text-zinc-500 font-normal flex items-center gap-1">
                      {cliente.wpConnected ? <CheckCircle2 className="h-3 w-3 text-emerald-500" /> : <XCircle className="h-3 w-3 text-red-500" />}
                      WP {cliente.wpConnected ? 'Conectado' : 'Desconectado'}
                    </span>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-2">
                    <Activity className={`h-4 w-4 ${cliente.uptime > 99 ? 'text-emerald-500' : cliente.uptime > 0 ? 'text-orange-500' : 'text-red-500'}`} />
                    <span className={cliente.uptime > 99 ? 'text-emerald-700' : cliente.uptime > 0 ? 'text-orange-700' : 'text-red-700'}>
                      {cliente.uptime}%
                    </span>
                  </div>
                </td>
                <td className="px-6 py-4 text-zinc-500">{cliente.leads}</td>
                <td className="px-6 py-4">
                  <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                    cliente.status === 'ativo' ? 'bg-emerald-100 text-emerald-800' : 'bg-red-100 text-red-800'
                  }`}>
                    {cliente.status}
                  </span>
                </td>
                <td className="px-6 py-4 text-right">
                  <button 
                    onClick={() => handleImpersonate(cliente)}
                    className="inline-flex items-center gap-1 rounded-[var(--radius,0.5rem)] border border-zinc-200 px-3 py-1.5 text-xs font-medium text-zinc-700 hover:bg-zinc-100 mr-2"
                  >
                    <LogIn className="h-3 w-3" /> Entrar como
                  </button>
                  <button 
                    onClick={() => handleSelectClient(cliente)}
                    className="inline-flex items-center gap-1 rounded-[var(--radius,0.5rem)] border border-zinc-200 px-3 py-1.5 text-xs font-medium text-zinc-700 hover:bg-zinc-100 mr-2"
                  >
                    <Settings className="h-3 w-3" /> Configurar
                  </button>
                  <button className="p-1.5 text-zinc-400 hover:text-zinc-900"><MoreVertical className="h-4 w-4" /></button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Configuration Modal */}
      {selectedClient && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-zinc-950/50 p-4">
          <div className="w-full max-w-2xl rounded-[var(--radius,1rem)] bg-white shadow-xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-zinc-200 px-6 py-4 sticky top-0 bg-white z-10">
              <h2 className="text-xl font-semibold text-zinc-950">Configurações: {selectedClient.nome}</h2>
              <button onClick={() => setSelectedClient(null)} className="rounded-full p-2 hover:bg-zinc-100"><XCircle className="h-5 w-5 text-zinc-500" /></button>
            </div>
            
            <div className="p-6 space-y-8">
              {/* Basic Info */}
              <section className="space-y-4">
                <h3 className="text-sm font-semibold text-zinc-900 flex items-center gap-2">
                  <ImageIcon className="h-4 w-4" /> Identidade Visual (White-label)
                </h3>
                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label className="text-xs font-medium text-zinc-700">Nome do Cliente</label>
                    <input type="text" defaultValue={selectedClient.nome} className="mt-1 w-full rounded-[var(--radius,0.5rem)] border border-zinc-200 px-3 py-2 text-sm outline-none focus:border-zinc-950 focus:ring-1 focus:ring-zinc-950" />
                  </div>
                  <div>
                    <label className="text-xs font-medium text-zinc-700">Logo do Cliente (URL)</label>
                    <input type="url" placeholder="https://..." className="mt-1 w-full rounded-[var(--radius,0.5rem)] border border-zinc-200 px-3 py-2 text-sm outline-none focus:border-zinc-950 focus:ring-1 focus:ring-zinc-950" />
                  </div>
                </div>
              </section>

              {/* Feature Flags */}
              <section className="space-y-4">
                <h3 className="text-sm font-semibold text-zinc-900 flex items-center gap-2">
                  <ToggleLeft className="h-4 w-4" /> Módulos Ativos (Feature Flags)
                </h3>
                <div className="grid gap-3 sm:grid-cols-2">
                  <label className="flex items-center gap-3 p-3 border border-zinc-200 rounded-[var(--radius,0.5rem)] cursor-pointer hover:bg-zinc-50">
                    <input type="checkbox" defaultChecked className="rounded border-zinc-300 text-zinc-900 focus:ring-zinc-950" />
                    <span className="text-sm font-medium text-zinc-900">Módulo de Leads (CRM)</span>
                  </label>
                  <label className="flex items-center gap-3 p-3 border border-zinc-200 rounded-[var(--radius,0.5rem)] cursor-pointer hover:bg-zinc-50">
                    <input type="checkbox" defaultChecked className="rounded border-zinc-300 text-zinc-900 focus:ring-zinc-950" />
                    <span className="text-sm font-medium text-zinc-900">Módulo de Artigos (Blog)</span>
                  </label>
                  <label className="flex items-center gap-3 p-3 border border-zinc-200 rounded-[var(--radius,0.5rem)] cursor-pointer hover:bg-zinc-50">
                    <input type="checkbox" defaultChecked className="rounded border-zinc-300 text-zinc-900 focus:ring-zinc-950" />
                    <span className="text-sm font-medium text-zinc-900">Módulo de Relatórios</span>
                  </label>
                </div>
              </section>

              {/* WP Connection */}
              <section className="space-y-4">
                <div className="flex items-center justify-between border-b border-zinc-200 pb-2">
                  <h3 className="text-lg font-medium text-zinc-900 flex items-center gap-2"><LinkIcon className="h-5 w-5" /> Conexão WordPress</h3>
                  <button 
                    onClick={testWpConnection}
                    disabled={isTestingConnection}
                    className="inline-flex items-center gap-2 rounded-[var(--radius,0.5rem)] bg-zinc-100 px-3 py-1.5 text-xs font-medium text-zinc-700 hover:bg-zinc-200"
                  >
                    <RefreshCw className={`h-3 w-3 ${isTestingConnection ? 'animate-spin' : ''}`} /> Ping de Saúde
                  </button>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="col-span-2">
                    <label className="text-sm font-medium text-zinc-900">URL do Site (REST API)</label>
                    <input type="url" defaultValue="https://site-do-cliente.com" className="mt-1 w-full rounded-[var(--radius,0.5rem)] border border-zinc-200 px-3 py-2 text-sm outline-none focus:border-zinc-950 focus:ring-1 focus:ring-zinc-950" />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-zinc-900">Usuário WP</label>
                    <input type="text" defaultValue="admin_agencia" className="mt-1 w-full rounded-[var(--radius,0.5rem)] border border-zinc-200 px-3 py-2 text-sm outline-none focus:border-zinc-950 focus:ring-1 focus:ring-zinc-950" />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-zinc-900">Application Password</label>
                    <input type="password" defaultValue="xxxx xxxx xxxx xxxx" className="mt-1 w-full rounded-[var(--radius,0.5rem)] border border-zinc-200 px-3 py-2 text-sm outline-none focus:border-zinc-950 focus:ring-1 focus:ring-zinc-950" />
                  </div>
                </div>
                {wpConnected && (
                  <div className="pt-4 border-t border-zinc-200">
                    <div className="flex items-center justify-between mb-2">
                      <label className="text-sm font-medium text-zinc-900">Sincronizar Custom Post Types (CPTs)</label>
                      <button 
                        onClick={() => {
                          setIsFetchingCpts(true);
                          setTimeout(() => {
                            setIsFetchingCpts(false);
                            toast.success('Custom Post Types sincronizados!');
                          }, 1000);
                        }}
                        disabled={isFetchingCpts}
                        className="inline-flex items-center gap-1 text-xs font-medium text-zinc-500 hover:text-zinc-900"
                      >
                        <RefreshCw className={`h-3 w-3 ${isFetchingCpts ? 'animate-spin' : ''}`} /> Sincronizar
                      </button>
                    </div>
                    <p className="text-xs text-zinc-500 mb-3">Selecione quais CPTs devem aparecer no painel do cliente.</p>
                    
                    {isFetchingCpts ? (
                      <div className="flex items-center gap-2 text-sm text-zinc-500 py-2">
                        <RefreshCw className="h-4 w-4 animate-spin" /> Buscando CPTs no WordPress...
                      </div>
                    ) : availableCpts.length > 0 ? (
                      <div className="flex flex-wrap gap-4">
                        {availableCpts.map(cpt => (
                          <label key={cpt.id} className="flex items-center gap-2 text-sm cursor-pointer">
                            <input 
                              type="checkbox" 
                              defaultChecked={cpt.checked} 
                              className="rounded border-zinc-300 text-zinc-900 focus:ring-zinc-950" 
                            /> 
                            {cpt.name}
                          </label>
                        ))}
                      </div>
                    ) : (
                      <p className="text-sm text-zinc-500 italic">Nenhum CPT encontrado.</p>
                    )}
                  </div>
                )}
              </section>

              {/* Webhooks & Evolution API */}
              <section className="space-y-4">
                <div className="border-b border-zinc-200 pb-2">
                  <h3 className="text-lg font-medium text-zinc-900">Captura e WhatsApp (Evolution API)</h3>
                </div>
                <div>
                  <label className="text-sm font-medium text-zinc-900">Endpoint de Captura Exclusivo (Webhook)</label>
                  <p className="text-xs text-zinc-500 mb-1">Cole esta URL no Elementor Pro ou Contact Form 7 do cliente.</p>
                  <div className="flex items-center gap-2">
                    <input type="text" readOnly value={`https://api.nexushub.com/webhook/lead/${selectedClient.id}`} className="w-full rounded-[var(--radius,0.5rem)] border border-zinc-200 bg-zinc-50 px-3 py-2 text-sm text-zinc-500 outline-none" />
                    <button onClick={() => toast.success('URL copiada!')} className="rounded-[var(--radius,0.5rem)] bg-zinc-900 px-3 py-2 text-sm font-medium text-white hover:bg-zinc-800" style={{ backgroundColor: 'var(--primary-color, #18181b)' }}>Copiar</button>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4 mt-4">
                  <div>
                    <label className="text-sm font-medium text-zinc-900">Instância Evolution API</label>
                    <input type="text" defaultValue={`instancia_${selectedClient.id}`} className="mt-1 w-full rounded-[var(--radius,0.5rem)] border border-zinc-200 px-3 py-2 text-sm outline-none focus:border-zinc-950 focus:ring-1 focus:ring-zinc-950" />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-zinc-900">API Key da Instância</label>
                    <input type="password" defaultValue="evolution_key_123" className="mt-1 w-full rounded-[var(--radius,0.5rem)] border border-zinc-200 px-3 py-2 text-sm outline-none focus:border-zinc-950 focus:ring-1 focus:ring-zinc-950" />
                  </div>
                </div>
                <p className="text-xs text-zinc-500">O cliente poderá gerar o QR Code de conexão diretamente pelo painel dele usando estas credenciais.</p>
              </section>
            </div>

            <div className="flex items-center justify-end gap-3 border-t border-zinc-200 bg-zinc-50 px-6 py-4 sticky bottom-0">
              <button onClick={() => setSelectedClient(null)} className="rounded-[var(--radius,0.5rem)] px-4 py-2 text-sm font-medium text-zinc-700 hover:bg-zinc-100">Cancelar</button>
              <button onClick={() => { toast.success('Configurações salvas!'); setSelectedClient(null); }} className="rounded-[var(--radius,0.5rem)] bg-zinc-900 px-4 py-2 text-sm font-medium text-white hover:bg-zinc-800" style={{ backgroundColor: 'var(--primary-color, #18181b)' }}>Salvar Integrações</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
