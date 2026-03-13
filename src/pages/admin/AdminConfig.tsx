import React, { useState, useEffect } from 'react';
import { Save, Palette, BellRing, FileText, Smartphone, Layout, Globe, Mail, Loader2 } from 'lucide-react';
import { toast } from 'sonner';
import { ImageUpload } from '../../components/ui/ImageUpload';

export default function AdminConfig() {
  const [activeTab, setActiveTab] = useState('whitelabel');
  
  // State for Appearance Settings
  const [primaryColor, setPrimaryColor] = useState(localStorage.getItem('primaryColor') || '#18181b');
  const [bgColor, setBgColor] = useState(localStorage.getItem('bgColor') || '#fafafa');
  const [borderRadius, setBorderRadius] = useState(localStorage.getItem('borderRadius') || '0.5rem');
  const [globalFont, setGlobalFont] = useState(localStorage.getItem('globalFont') || 'Inter');
  
  // State for Images
  const [faviconUrl, setFaviconUrl] = useState<string | null>(null);
  const [pdfHeader, setPdfHeader] = useState<string | null>(null);
  const [pushIcon, setPushIcon] = useState<string | null>(null);

  // Apply CSS variables globally when they change
  useEffect(() => {
    const root = document.documentElement;
    root.style.setProperty('--primary-color', primaryColor);
    root.style.setProperty('--bg-color', bgColor);
    root.style.setProperty('--radius', borderRadius);
    
    // Font mapping
    let fontValue = '"Inter", ui-sans-serif, system-ui, sans-serif';
    if (globalFont === 'Roboto') fontValue = '"Roboto", ui-sans-serif, system-ui, sans-serif';
    if (globalFont === 'Playfair Display') fontValue = '"Playfair Display", ui-serif, Georgia, serif';
    root.style.setProperty('--font-global', fontValue);
    
  }, [primaryColor, bgColor, borderRadius, globalFont]);

  const handleSaveAppearance = () => {
    localStorage.setItem('primaryColor', primaryColor);
    localStorage.setItem('bgColor', bgColor);
    localStorage.setItem('borderRadius', borderRadius);
    localStorage.setItem('globalFont', globalFont);
    toast.success('Aparência salva com sucesso!');
  };

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold text-zinc-950">Configurações Globais</h1>
      
      <div className="flex border-b border-zinc-200 overflow-x-auto">
        {[
          { id: 'whitelabel', name: 'Aparência', icon: Palette },
          { id: 'login', name: 'Tela de Login', icon: Layout },
          { id: 'domain', name: 'Domínio', icon: Globe },
          { id: 'comunicacao', name: 'Comunicação', icon: Mail },
          { id: 'broadcast', name: 'Central de Avisos', icon: BellRing },
          { id: 'templates', name: 'Templates de Artigos', icon: FileText },
          { id: 'integracoes', name: 'Evolution API', icon: Smartphone },
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

      <div className="rounded-[var(--radius,1rem)] border border-zinc-200 bg-white p-6 shadow-sm">
        {activeTab === 'whitelabel' && (
          <div className="space-y-6 max-w-2xl">
            <div>
              <h2 className="text-lg font-medium text-zinc-950">Aparência e White-label</h2>
              <p className="text-sm text-zinc-500 mb-4">Defina a marca que seus clientes verão ao acessar o painel.</p>
            </div>
            
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="grid gap-2">
                <label className="text-sm font-medium text-zinc-900">Nome da Agência</label>
                <input type="text" defaultValue="NexusHub" className="rounded-[var(--radius,0.5rem)] border border-zinc-200 px-3 py-2 text-sm outline-none focus:border-zinc-950 focus:ring-1 focus:ring-zinc-950" />
              </div>
              <div className="grid gap-2">
                <label className="text-sm font-medium text-zinc-900">Favicon</label>
                <ImageUpload 
                  value={faviconUrl}
                  onChange={(_, url) => setFaviconUrl(url)}
                />
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="grid gap-2">
                <label className="text-sm font-medium text-zinc-900">Cor Principal (Hex)</label>
                <div className="flex items-center gap-3">
                  <input type="color" value={primaryColor} onChange={(e) => setPrimaryColor(e.target.value)} className="h-9 w-9 rounded border border-zinc-200 p-0.5 cursor-pointer" />
                  <input type="text" value={primaryColor} onChange={(e) => setPrimaryColor(e.target.value)} className="rounded-[var(--radius,0.5rem)] border border-zinc-200 px-3 py-2 text-sm outline-none focus:border-zinc-950 focus:ring-1 focus:ring-zinc-950" />
                </div>
              </div>
              <div className="grid gap-2">
                <label className="text-sm font-medium text-zinc-900">Cor de Fundo (Background)</label>
                <div className="flex items-center gap-3">
                  <input type="color" value={bgColor} onChange={(e) => setBgColor(e.target.value)} className="h-9 w-9 rounded border border-zinc-200 p-0.5 cursor-pointer" />
                  <input type="text" value={bgColor} onChange={(e) => setBgColor(e.target.value)} className="rounded-[var(--radius,0.5rem)] border border-zinc-200 px-3 py-2 text-sm outline-none focus:border-zinc-950 focus:ring-1 focus:ring-zinc-950" />
                </div>
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="grid gap-2">
                <label className="text-sm font-medium text-zinc-900">Estilo de Bordas (Border Radius)</label>
                <select value={borderRadius} onChange={(e) => setBorderRadius(e.target.value)} className="rounded-[var(--radius,0.5rem)] border border-zinc-200 px-3 py-2 text-sm outline-none focus:border-zinc-950 focus:ring-1 focus:ring-zinc-950">
                  <option value="0.5rem">Suave (Padrão)</option>
                  <option value="0rem">Quadrado (Brutalista)</option>
                  <option value="1rem">Arredondado (Moderno)</option>
                </select>
              </div>
              <div className="grid gap-2">
                <label className="text-sm font-medium text-zinc-900">Fonte Global</label>
                <select value={globalFont} onChange={(e) => setGlobalFont(e.target.value)} className="rounded-[var(--radius,0.5rem)] border border-zinc-200 px-3 py-2 text-sm outline-none focus:border-zinc-950 focus:ring-1 focus:ring-zinc-950">
                  <option value="Inter">Inter (Tech/Clean)</option>
                  <option value="Roboto">Roboto (Corporativo)</option>
                  <option value="Playfair Display">Playfair (Elegante)</option>
                </select>
              </div>
            </div>

            <div className="grid gap-2">
              <label className="text-sm font-medium text-zinc-900">Loader/Spinner Personalizado</label>
              <p className="text-xs text-zinc-500">Escolha o estilo de carregamento do painel.</p>
              <div className="grid grid-cols-3 gap-4 mt-2">
                <div className="border-2 border-zinc-950 rounded-[var(--radius,0.5rem)] p-4 cursor-pointer bg-zinc-50 flex flex-col items-center justify-center">
                  <Loader2 className="h-6 w-6 animate-spin text-zinc-900 mb-2" />
                  <span className="text-xs font-medium">Spinner (Padrão)</span>
                </div>
                <div className="border border-zinc-200 rounded-[var(--radius,0.5rem)] p-4 cursor-pointer hover:border-zinc-400 flex flex-col items-center justify-center">
                  <div className="flex gap-1 mb-2">
                    <div className="w-2 h-2 rounded-full bg-zinc-400 animate-bounce"></div>
                    <div className="w-2 h-2 rounded-full bg-zinc-400 animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                    <div className="w-2 h-2 rounded-full bg-zinc-400 animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                  </div>
                  <span className="text-xs font-medium">Pontos (Dots)</span>
                </div>
                <div className="border border-zinc-200 rounded-[var(--radius,0.5rem)] p-4 cursor-pointer hover:border-zinc-400 flex flex-col items-center justify-center">
                  <div className="w-full h-1 bg-zinc-200 rounded-full overflow-hidden mb-2">
                    <div className="w-1/2 h-full bg-zinc-900 animate-pulse"></div>
                  </div>
                  <span className="text-xs font-medium">Barra (Progress)</span>
                </div>
              </div>
            </div>

            <div className="grid gap-2">
              <label className="text-sm font-medium text-zinc-900">CSS Customizado</label>
              <p className="text-xs text-zinc-500">Injete CSS puro para alterar detalhes avançados da interface.</p>
              <textarea rows={4} placeholder="/* Ex: .sidebar { background: #000; } */" className="rounded-[var(--radius,0.5rem)] border border-zinc-200 px-3 py-2 text-sm font-mono outline-none focus:border-zinc-950 focus:ring-1 focus:ring-zinc-950" />
            </div>

            <button onClick={handleSaveAppearance} className="mt-4 inline-flex items-center gap-2 rounded-[var(--radius,0.5rem)] bg-zinc-900 px-4 py-2 text-sm font-medium text-white hover:bg-zinc-800" style={{ backgroundColor: 'var(--primary-color, #18181b)' }}>
              <Save className="h-4 w-4" /> Salvar Aparência
            </button>
          </div>
        )}

        {activeTab === 'login' && (
          <div className="space-y-6 max-w-2xl">
            <div>
              <h2 className="text-lg font-medium text-zinc-950">Tela de Login</h2>
              <p className="text-sm text-zinc-500 mb-4">Personalize a experiência de entrada dos seus clientes.</p>
            </div>
            
            <div className="grid gap-2">
              <label className="text-sm font-medium text-zinc-900">Layout da Tela</label>
              <div className="grid grid-cols-3 gap-4 mt-2">
                <div className="border-2 border-zinc-950 rounded-lg p-2 cursor-pointer bg-zinc-50">
                  <div className="h-20 bg-white border border-zinc-200 rounded flex items-center justify-center shadow-sm">Card Central</div>
                  <p className="text-center text-xs mt-2 font-medium">Card Central</p>
                </div>
                <div className="border border-zinc-200 rounded-lg p-2 cursor-pointer hover:border-zinc-400">
                  <div className="h-20 flex gap-1">
                    <div className="flex-1 bg-zinc-200 rounded-l"></div>
                    <div className="flex-1 bg-white border border-zinc-200 rounded-r flex items-center justify-center">Login</div>
                  </div>
                  <p className="text-center text-xs mt-2 font-medium">Split Screen</p>
                </div>
                <div className="border border-zinc-200 rounded-lg p-2 cursor-pointer hover:border-zinc-400">
                  <div className="h-20 bg-zinc-200 rounded flex items-center justify-center">
                    <div className="w-1/2 h-1/2 bg-white rounded shadow-sm"></div>
                  </div>
                  <p className="text-center text-xs mt-2 font-medium">Full Background</p>
                </div>
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2 mt-6">
              <div className="grid gap-2">
                <label className="text-sm font-medium text-zinc-900">Título de Boas-Vindas</label>
                <input type="text" defaultValue="Acesse sua conta" className="rounded-[var(--radius,0.5rem)] border border-zinc-200 px-3 py-2 text-sm outline-none focus:border-zinc-950 focus:ring-1 focus:ring-zinc-950" />
              </div>
              <div className="grid gap-2">
                <label className="text-sm font-medium text-zinc-900">Subtítulo</label>
                <input type="text" defaultValue="Selecione seu perfil para entrar" className="rounded-[var(--radius,0.5rem)] border border-zinc-200 px-3 py-2 text-sm outline-none focus:border-zinc-950 focus:ring-1 focus:ring-zinc-950" />
              </div>
            </div>

            <div className="flex items-center gap-2 mt-4">
              <input type="checkbox" id="poweredby" className="rounded border-zinc-300 text-zinc-900 focus:ring-zinc-950" />
              <label htmlFor="poweredby" className="text-sm text-zinc-900">Ocultar "Powered by NexusHub" no rodapé</label>
            </div>

            <button onClick={() => toast.success('Tela de login atualizada!')} className="mt-4 inline-flex items-center gap-2 rounded-[var(--radius,0.5rem)] bg-zinc-900 px-4 py-2 text-sm font-medium text-white hover:bg-zinc-800" style={{ backgroundColor: 'var(--primary-color, #18181b)' }}>
              <Save className="h-4 w-4" /> Salvar Tela de Login
            </button>
          </div>
        )}

        {activeTab === 'domain' && (
          <div className="space-y-6 max-w-2xl">
            <div>
              <h2 className="text-lg font-medium text-zinc-950">Domínio Personalizado</h2>
              <p className="text-sm text-zinc-500 mb-4">Acesse a plataforma usando o domínio da sua agência.</p>
            </div>
            
            <div className="grid gap-2">
              <label className="text-sm font-medium text-zinc-900">Seu Domínio</label>
              <div className="flex gap-2">
                <input type="text" placeholder="painel.suaagencia.com.br" className="flex-1 rounded-[var(--radius,0.5rem)] border border-zinc-200 px-3 py-2 text-sm outline-none focus:border-zinc-950 focus:ring-1 focus:ring-zinc-950" />
                <button className="rounded-[var(--radius,0.5rem)] bg-zinc-100 px-4 py-2 text-sm font-medium text-zinc-900 hover:bg-zinc-200">Verificar</button>
              </div>
            </div>

            <div className="bg-zinc-50 border border-zinc-200 rounded-lg p-4 mt-4">
              <h3 className="font-medium text-sm text-zinc-900 mb-2">Instruções de Configuração (DNS)</h3>
              <p className="text-sm text-zinc-600 mb-4">Adicione o seguinte registro CNAME no painel do seu provedor de domínio (Cloudflare, Registro.br, etc):</p>
              <div className="grid grid-cols-3 gap-4 text-sm">
                <div>
                  <span className="block text-xs text-zinc-500 font-medium mb-1">Tipo</span>
                  <code className="bg-white border border-zinc-200 px-2 py-1 rounded block">CNAME</code>
                </div>
                <div>
                  <span className="block text-xs text-zinc-500 font-medium mb-1">Nome</span>
                  <code className="bg-white border border-zinc-200 px-2 py-1 rounded block">painel</code>
                </div>
                <div>
                  <span className="block text-xs text-zinc-500 font-medium mb-1">Destino</span>
                  <code className="bg-white border border-zinc-200 px-2 py-1 rounded block">cname.nexushub.com</code>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'comunicacao' && (
          <div className="space-y-6 max-w-2xl">
            <div>
              <h2 className="text-lg font-medium text-zinc-950">Comunicação e Relatórios</h2>
              <p className="text-sm text-zinc-500 mb-4">Personalize os e-mails, PDFs e notificações enviados aos clientes.</p>
            </div>
            
            <div className="grid gap-4">
              <div className="border border-zinc-200 rounded-lg p-4">
                <ImageUpload 
                  label="Timbre para Relatórios PDF"
                  description="Faça upload de uma imagem (cabeçalho) que aparecerá no topo de todos os relatórios exportados."
                  value={pdfHeader}
                  onChange={(_, url) => setPdfHeader(url)}
                />
              </div>

              <div className="border border-zinc-200 rounded-lg p-4">
                <h3 className="font-medium text-sm text-zinc-900 mb-2">Templates de E-mail (HTML)</h3>
                <p className="text-xs text-zinc-500 mb-4">Personalize o rodapé dos e-mails transacionais enviados pelo sistema.</p>
                <textarea rows={3} defaultValue="<p>Enviado por Sua Agência</p>" className="w-full rounded-[var(--radius,0.5rem)] border border-zinc-200 px-3 py-2 text-sm font-mono outline-none focus:border-zinc-950 focus:ring-1 focus:ring-zinc-950" />
              </div>

              <div className="border border-zinc-200 rounded-lg p-4">
                <ImageUpload 
                  label="Ícone de Notificação Push"
                  description="Este ícone aparecerá nas notificações de navegador (Windows/Mac) quando um novo lead chegar."
                  value={pushIcon}
                  onChange={(_, url) => setPushIcon(url)}
                />
              </div>
            </div>

            <button onClick={() => toast.success('Configurações de comunicação salvas!')} className="mt-4 inline-flex items-center gap-2 rounded-[var(--radius,0.5rem)] bg-zinc-900 px-4 py-2 text-sm font-medium text-white hover:bg-zinc-800" style={{ backgroundColor: 'var(--primary-color, #18181b)' }}>
              <Save className="h-4 w-4" /> Salvar Comunicação
            </button>
          </div>
        )}

        {activeTab === 'broadcast' && (
          <div className="space-y-4 max-w-2xl">
            <h2 className="text-lg font-medium text-zinc-950">Aviso Global (Broadcast)</h2>
            <p className="text-sm text-zinc-500 mb-4">Este aviso aparecerá no topo do painel de todos os clientes.</p>
            
            <div className="grid gap-2">
              <label className="text-sm font-medium text-zinc-900">Mensagem</label>
              <textarea rows={3} defaultValue="Manutenção programada para o servidor principal nesta sexta-feira às 23h." className="rounded-[var(--radius,0.5rem)] border border-zinc-200 px-3 py-2 text-sm outline-none focus:border-zinc-950 focus:ring-1 focus:ring-zinc-950" />
            </div>
            <div className="flex items-center gap-2 mt-2">
              <input type="checkbox" id="active" defaultChecked className="rounded border-zinc-300 text-zinc-900 focus:ring-zinc-950" />
              <label htmlFor="active" className="text-sm text-zinc-900">Aviso Ativo</label>
            </div>
            <button onClick={() => toast.success('Aviso atualizado!')} className="mt-4 inline-flex items-center gap-2 rounded-[var(--radius,0.5rem)] bg-zinc-900 px-4 py-2 text-sm font-medium text-white hover:bg-zinc-800" style={{ backgroundColor: 'var(--primary-color, #18181b)' }}>
              <Save className="h-4 w-4" /> Publicar Aviso
            </button>
          </div>
        )}

        {activeTab === 'templates' && (
          <div className="space-y-4">
            <h2 className="text-lg font-medium text-zinc-950">Templates de Artigos Globais</h2>
            <p className="text-sm text-zinc-500 mb-4">Crie estruturas padrão para os copywriters usarem em qualquer cliente.</p>
            
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="rounded-[var(--radius,0.5rem)] border border-zinc-200 p-4 hover:border-zinc-400 cursor-pointer">
                <h3 className="font-medium text-zinc-900">Artigo Listicle (Top 10)</h3>
                <p className="text-xs text-zinc-500 mt-1">Estrutura focada em listas com introdução, 10 itens e conclusão.</p>
              </div>
              <div className="rounded-[var(--radius,0.5rem)] border border-zinc-200 p-4 hover:border-zinc-400 cursor-pointer">
                <h3 className="font-medium text-zinc-900">Estudo de Caso</h3>
                <p className="text-xs text-zinc-500 mt-1">Problema, Solução e Resultados com depoimentos.</p>
              </div>
              <div className="rounded-[var(--radius,0.5rem)] border border-dashed border-zinc-300 p-4 flex items-center justify-center text-zinc-500 hover:bg-zinc-50 cursor-pointer">
                + Criar Novo Template
              </div>
            </div>
          </div>
        )}

        {activeTab === 'integracoes' && (
          <div className="space-y-4 max-w-2xl">
            <h2 className="text-lg font-medium text-zinc-950">Configuração Global da Evolution API</h2>
            <p className="text-sm text-zinc-500 mb-4">Configure o servidor base da Evolution API e o WhatsApp da Agência para receber notificações de novos leads.</p>
            
            <div className="grid gap-4">
              <div>
                <label className="text-sm font-medium text-zinc-900">URL Base da Evolution API</label>
                <input type="url" defaultValue="https://api.seuservidor.com" className="mt-1 w-full rounded-[var(--radius,0.5rem)] border border-zinc-200 px-3 py-2 text-sm outline-none focus:border-zinc-950 focus:ring-1 focus:ring-zinc-950" />
              </div>
              <div>
                <label className="text-sm font-medium text-zinc-900">Global API Key</label>
                <input type="password" defaultValue="global_key_secret_123" className="mt-1 w-full rounded-[var(--radius,0.5rem)] border border-zinc-200 px-3 py-2 text-sm outline-none focus:border-zinc-950 focus:ring-1 focus:ring-zinc-950" />
              </div>
              <div className="pt-4 border-t border-zinc-200">
                <label className="text-sm font-medium text-zinc-900">WhatsApp da Agência (Notificações de Leads)</label>
                <p className="text-xs text-zinc-500 mb-2">Este número receberá um alerta sempre que um lead cair em qualquer cliente.</p>
                <input type="text" defaultValue="5511999999999" className="w-full rounded-[var(--radius,0.5rem)] border border-zinc-200 px-3 py-2 text-sm outline-none focus:border-zinc-950 focus:ring-1 focus:ring-zinc-950" />
              </div>
            </div>
            <button onClick={() => toast.success('Configurações da Evolution API salvas!')} className="mt-4 inline-flex items-center gap-2 rounded-[var(--radius,0.5rem)] bg-zinc-900 px-4 py-2 text-sm font-medium text-white hover:bg-zinc-800" style={{ backgroundColor: 'var(--primary-color, #18181b)' }}>
              <Save className="h-4 w-4" /> Salvar Integrações
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
