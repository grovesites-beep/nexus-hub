import React, { useState, useEffect } from 'react';
import { Save, Palette, BellRing, FileText, Smartphone, Layout, Globe, Mail, Loader2 } from 'lucide-react';
import { toast } from 'sonner';
import { ImageUpload } from '../../components/ui/ImageUpload';
import { databases, DATABASE_ID, COLLECTIONS } from '../../lib/appwrite';

export default function AdminConfig() {
  const [activeTab, setActiveTab] = useState('whitelabel');
  const [loading, setLoading] = useState(true);
  const [templates, setTemplates] = useState<any[]>([]);
  const [showTemplateModal, setShowTemplateModal] = useState(false);
  const [editingTemplate, setEditingTemplate] = useState<any>(null);
  
  // State for Appearance Settings
  const [nomeAgencia, setNomeAgencia] = useState('NexusHub');
  const [primaryColor, setPrimaryColor] = useState(localStorage.getItem('primaryColor') || '#18181b');
  const [bgColor, setBgColor] = useState(localStorage.getItem('bgColor') || '#fafafa');
  const [borderRadius, setBorderRadius] = useState(localStorage.getItem('borderRadius') || '0.5rem');
  const [globalFont, setGlobalFont] = useState(localStorage.getItem('globalFont') || 'Inter');
  const [loaderSpinner, setLoaderSpinner] = useState('spinner');
  const [cssCustom, setCssCustom] = useState('');
  
  // State for Login View
  const [loginLayout, setLoginLayout] = useState('card');
  const [loginTitulo, setLoginTitulo] = useState('Acesse sua conta');
  const [loginSubtitulo, setLoginSubtitulo] = useState('Selecione seu perfil para entrar');
  const [hidePoweredBy, setHidePoweredBy] = useState(false);

  // Domain
  const [dominio, setDominio] = useState('');

  // Email/Communication
  const [faviconUrl, setFaviconUrl] = useState<string | null>(null);
  const [pdfHeader, setPdfHeader] = useState<string | null>(null);
  const [pushIcon, setPushIcon] = useState<string | null>(null);
  const [emailFooter, setEmailFooter] = useState('<p>Enviado por Sua Agência</p>');

  // Broadcast
  const [broadcastMsg, setBroadcastMsg] = useState('Manutenção programada para o servidor principal nesta sexta-feira às 23h.');
  const [broadcastActive, setBroadcastActive] = useState(true);

  // Evolution API
  const [evoUrl, setEvoUrl] = useState('https://api.seuservidor.com');
  const [evoKey, setEvoKey] = useState('global_key_secret_123');
  const [evoAgencia, setEvoAgencia] = useState('5511999999999');

  useEffect(() => {
    const fetchConfig = async () => {
      try {
        const res = await databases.getDocument(DATABASE_ID, COLLECTIONS.ADMIN_CONFIG, 'global');
        setNomeAgencia(res.nome_agencia || 'NexusHub');
        setPrimaryColor(res.primaryColor || '#18181b');
        setBgColor(res.bgColor || '#fafafa');
        setBorderRadius(res.borderRadius || '0.5rem');
        setGlobalFont(res.globalFont || 'Inter');
        setLoaderSpinner(res.loaderSpinner || 'spinner');
        setCssCustom(res.cssCustom || '');
        setLoginLayout(res.loginLayout || 'card');
        setLoginTitulo(res.loginTitulo || 'Acesse sua conta');
        setLoginSubtitulo(res.loginSubtitulo || 'Selecione seu perfil para entrar');
        setHidePoweredBy(res.hidePoweredBy || false);
        setDominio(res.dominio || '');
        setFaviconUrl(res.favicon || null);
        setPdfHeader(res.pdfHeader || null);
        setPushIcon(res.pushIcon || null);
        setEmailFooter(res.emailFooter || '<p>Enviado por Sua Agência</p>');
        setBroadcastMsg(res.broadcastMsg || '');
        setBroadcastActive(res.broadcastActive || false);
        setEvoUrl(res.evoUrl || '');
        setEvoKey(res.evoKey || '');
        setEvoAgencia(res.evoAgencia || '');

        const templatesRes = await databases.listDocuments(DATABASE_ID, COLLECTIONS.ARTIGO_TEMPLATES);
        setTemplates(templatesRes.documents);

        // Also sync local storage so app UI works synchronously
        if (res.primaryColor) localStorage.setItem('primaryColor', res.primaryColor);
        if (res.bgColor) localStorage.setItem('bgColor', res.bgColor);
        if (res.borderRadius) localStorage.setItem('borderRadius', res.borderRadius);
        if (res.globalFont) localStorage.setItem('globalFont', res.globalFont);
      } catch (err) {
        console.error('Erro ao buscar configs globais:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchConfig();
  }, []);

  // Apply CSS variables globally when they change
  useEffect(() => {
    if (loading) return;
    const root = document.documentElement;
    root.style.setProperty('--primary-color', primaryColor);
    root.style.setProperty('--bg-color', bgColor);
    root.style.setProperty('--radius', borderRadius);
    
    // Font mapping
    let fontValue = '"Inter", ui-sans-serif, system-ui, sans-serif';
    if (globalFont === 'Roboto') fontValue = '"Roboto", ui-sans-serif, system-ui, sans-serif';
    if (globalFont === 'Playfair Display') fontValue = '"Playfair Display", ui-serif, Georgia, serif';
    root.style.setProperty('--font-global', fontValue);
    
  }, [primaryColor, bgColor, borderRadius, globalFont, loading]);

  const handleSaveConfig = async (tabName: string, data: any) => {
    try {
      await databases.updateDocument(DATABASE_ID, COLLECTIONS.ADMIN_CONFIG, 'global', data);
      toast.success(`${tabName} salvas com sucesso no banco de dados!`);
      
      // Update local storage for appearance
      if (data.primaryColor) localStorage.setItem('primaryColor', data.primaryColor);
      if (data.bgColor) localStorage.setItem('bgColor', data.bgColor);
      if (data.borderRadius) localStorage.setItem('borderRadius', data.borderRadius);
      if (data.globalFont) localStorage.setItem('globalFont', data.globalFont);
      if (data.loaderSpinner) localStorage.setItem('loaderSpinner', data.loaderSpinner);
      if (data.cssCustom !== undefined) {
        localStorage.setItem('cssCustom', data.cssCustom);
        let styleEl = document.getElementById('nexus-custom-css');
        if (!styleEl) {
          styleEl = document.createElement('style');
          styleEl.id = 'nexus-custom-css';
          document.head.appendChild(styleEl);
        }
        styleEl.innerHTML = data.cssCustom;
      }
      
    } catch (err) {
      toast.error('Erro ao salvar as configurações.');
      console.error(err);
    }
  };

  const handleSaveTemplate = async (templateData: any) => {
    try {
      if (editingTemplate) {
        await databases.updateDocument(DATABASE_ID, COLLECTIONS.ARTIGO_TEMPLATES, editingTemplate.$id, templateData);
        toast.success('Template atualizado com sucesso!');
      } else {
        await databases.createDocument(DATABASE_ID, COLLECTIONS.ARTIGO_TEMPLATES, 'unique()', templateData);
        toast.success('Template criado com sucesso!');
      }
      setShowTemplateModal(false);
      setEditingTemplate(null);
      const refresh = await databases.listDocuments(DATABASE_ID, COLLECTIONS.ARTIGO_TEMPLATES);
      setTemplates(refresh.documents);
    } catch (err) {
      toast.error('Erro ao salvar template.');
      console.error(err);
    }
  };

  const handleDeleteTemplate = async (id: string) => {
    if (!confirm('Tem certeza que deseja excluir este template?')) return;
    try {
      await databases.deleteDocument(DATABASE_ID, COLLECTIONS.ARTIGO_TEMPLATES, id);
      toast.success('Template excluído!');
      setTemplates(templates.filter(t => t.$id !== id));
    } catch (err) {
      toast.error('Erro ao excluir template.');
      console.error(err);
    }
  };

  if (loading) return <div className="p-8 text-center text-zinc-500">Carregando configurações...</div>;

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
                <input type="text" value={nomeAgencia} onChange={(e) => setNomeAgencia(e.target.value)} className="rounded-[var(--radius,0.5rem)] border border-zinc-200 px-3 py-2 text-sm outline-none focus:border-zinc-950 focus:ring-1 focus:ring-zinc-950" />
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
                <div onClick={() => setLoaderSpinner('spinner')} className={`border-2 rounded-[var(--radius,0.5rem)] p-4 cursor-pointer flex flex-col items-center justify-center ${loaderSpinner === 'spinner' ? 'border-zinc-950 bg-zinc-50' : 'border-zinc-200 hover:border-zinc-400'}`}>
                  <Loader2 className="h-6 w-6 animate-spin text-zinc-900 mb-2" />
                  <span className="text-xs font-medium">Spinner (Padrão)</span>
                </div>
                <div onClick={() => setLoaderSpinner('dots')} className={`border-2 rounded-[var(--radius,0.5rem)] p-4 cursor-pointer flex flex-col items-center justify-center ${loaderSpinner === 'dots' ? 'border-zinc-950 bg-zinc-50' : 'border-zinc-200 hover:border-zinc-400'}`}>
                  <div className="flex gap-1 mb-2">
                    <div className="w-2 h-2 rounded-full bg-zinc-400 animate-bounce"></div>
                    <div className="w-2 h-2 rounded-full bg-zinc-400 animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                    <div className="w-2 h-2 rounded-full bg-zinc-400 animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                  </div>
                  <span className="text-xs font-medium">Pontos (Dots)</span>
                </div>
                <div onClick={() => setLoaderSpinner('progress')} className={`border-2 rounded-[var(--radius,0.5rem)] p-4 cursor-pointer flex flex-col items-center justify-center ${loaderSpinner === 'progress' ? 'border-zinc-950 bg-zinc-50' : 'border-zinc-200 hover:border-zinc-400'}`}>
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
              <textarea rows={4} value={cssCustom} onChange={(e) => setCssCustom(e.target.value)} placeholder="/* Ex: .sidebar { background: #000; } */" className="rounded-[var(--radius,0.5rem)] border border-zinc-200 px-3 py-2 text-sm font-mono outline-none focus:border-zinc-950 focus:ring-1 focus:ring-zinc-950" />
            </div>

            <button onClick={() => handleSaveConfig('Aparência', { nome_agencia: nomeAgencia, favicon: faviconUrl, primaryColor, bgColor, borderRadius, globalFont, loaderSpinner, cssCustom })} className="mt-4 inline-flex items-center gap-2 rounded-[var(--radius,0.5rem)] bg-zinc-900 px-4 py-2 text-sm font-medium text-white hover:bg-zinc-800" style={{ backgroundColor: 'var(--primary-color, #18181b)' }}>
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
                <div onClick={() => setLoginLayout('card')} className={`border-2 rounded-lg p-2 cursor-pointer ${loginLayout === 'card' ? 'border-zinc-950 bg-zinc-50' : 'border-zinc-200 hover:border-zinc-400'}`}>
                  <div className="h-20 bg-white border border-zinc-200 rounded flex items-center justify-center shadow-sm">Card Central</div>
                  <p className="text-center text-xs mt-2 font-medium">Card Central</p>
                </div>
                <div onClick={() => setLoginLayout('split')} className={`border-2 rounded-lg p-2 cursor-pointer ${loginLayout === 'split' ? 'border-zinc-950 bg-zinc-50' : 'border-zinc-200 hover:border-zinc-400'}`}>
                  <div className="h-20 flex gap-1">
                    <div className="flex-1 bg-zinc-200 rounded-l"></div>
                    <div className="flex-1 bg-white border border-zinc-200 rounded-r flex items-center justify-center">Login</div>
                  </div>
                  <p className="text-center text-xs mt-2 font-medium">Split Screen</p>
                </div>
                <div onClick={() => setLoginLayout('full')} className={`border-2 rounded-lg p-2 cursor-pointer ${loginLayout === 'full' ? 'border-zinc-950 bg-zinc-50' : 'border-zinc-200 hover:border-zinc-400'}`}>
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
                <input type="text" value={loginTitulo} onChange={(e) => setLoginTitulo(e.target.value)} className="rounded-[var(--radius,0.5rem)] border border-zinc-200 px-3 py-2 text-sm outline-none focus:border-zinc-950 focus:ring-1 focus:ring-zinc-950" />
              </div>
              <div className="grid gap-2">
                <label className="text-sm font-medium text-zinc-900">Subtítulo</label>
                <input type="text" value={loginSubtitulo} onChange={(e) => setLoginSubtitulo(e.target.value)} className="rounded-[var(--radius,0.5rem)] border border-zinc-200 px-3 py-2 text-sm outline-none focus:border-zinc-950 focus:ring-1 focus:ring-zinc-950" />
              </div>
            </div>

            <div className="flex items-center gap-2 mt-4">
              <input type="checkbox" id="poweredby" checked={hidePoweredBy} onChange={(e) => setHidePoweredBy(e.target.checked)} className="rounded border-zinc-300 text-zinc-900 focus:ring-zinc-950" />
              <label htmlFor="poweredby" className="text-sm text-zinc-900">Ocultar "Powered by NexusHub" no rodapé</label>
            </div>

            <button onClick={() => handleSaveConfig('Tela de Login', { loginLayout, loginTitulo, loginSubtitulo, hidePoweredBy })} className="mt-4 inline-flex items-center gap-2 rounded-[var(--radius,0.5rem)] bg-zinc-900 px-4 py-2 text-sm font-medium text-white hover:bg-zinc-800" style={{ backgroundColor: 'var(--primary-color, #18181b)' }}>
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
                <input type="text" value={dominio} onChange={(e) => setDominio(e.target.value)} placeholder="painel.suaagencia.com.br" className="flex-1 rounded-[var(--radius,0.5rem)] border border-zinc-200 px-3 py-2 text-sm outline-none focus:border-zinc-950 focus:ring-1 focus:ring-zinc-950" />
                <button onClick={() => handleSaveConfig('Domínio', { dominio })} className="rounded-[var(--radius,0.5rem)] bg-zinc-100 px-4 py-2 text-sm font-medium text-zinc-900 hover:bg-zinc-200">Verificar e Salvar</button>
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
                <textarea rows={3} value={emailFooter} onChange={(e) => setEmailFooter(e.target.value)} className="w-full rounded-[var(--radius,0.5rem)] border border-zinc-200 px-3 py-2 text-sm font-mono outline-none focus:border-zinc-950 focus:ring-1 focus:ring-zinc-950" />
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

            <button onClick={() => handleSaveConfig('Comunicação e Relatórios', { pdfHeader, emailFooter, pushIcon })} className="mt-4 inline-flex items-center gap-2 rounded-[var(--radius,0.5rem)] bg-zinc-900 px-4 py-2 text-sm font-medium text-white hover:bg-zinc-800" style={{ backgroundColor: 'var(--primary-color, #18181b)' }}>
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
              <textarea rows={3} value={broadcastMsg} onChange={(e) => setBroadcastMsg(e.target.value)} className="rounded-[var(--radius,0.5rem)] border border-zinc-200 px-3 py-2 text-sm outline-none focus:border-zinc-950 focus:ring-1 focus:ring-zinc-950" />
            </div>
            <div className="flex items-center gap-2 mt-2">
              <input type="checkbox" id="active" checked={broadcastActive} onChange={(e) => setBroadcastActive(e.target.checked)} className="rounded border-zinc-300 text-zinc-900 focus:ring-zinc-950" />
              <label htmlFor="active" className="text-sm text-zinc-900">Aviso Ativo</label>
            </div>
            <button onClick={() => handleSaveConfig('Mensagem de Broadcast', { broadcastMsg, broadcastActive })} className="mt-4 inline-flex items-center gap-2 rounded-[var(--radius,0.5rem)] bg-zinc-900 px-4 py-2 text-sm font-medium text-white hover:bg-zinc-800" style={{ backgroundColor: 'var(--primary-color, #18181b)' }}>
              <Save className="h-4 w-4" /> Publicar Aviso
            </button>
          </div>
        )}

        {activeTab === 'templates' && (
          <div className="space-y-4">
            <h2 className="text-lg font-medium text-zinc-950">Templates de Artigos Globais</h2>
            <p className="text-sm text-zinc-500 mb-4">Crie estruturas padrão para os copywriters usarem em qualquer cliente.</p>
            
            <div className="grid gap-4 sm:grid-cols-2">
              {templates.map(tpl => (
                <div key={tpl.$id} className="rounded-[var(--radius,0.5rem)] border border-zinc-200 p-4 hover:border-zinc-400 cursor-pointer relative group">
                  <h3 className="font-medium text-zinc-900 pr-12">{tpl.nome}</h3>
                  <p className="text-xs text-zinc-500 mt-1 line-clamp-2">{tpl.descricao}</p>
                  <div className="absolute top-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button onClick={(e) => { e.stopPropagation(); setEditingTemplate(tpl); setShowTemplateModal(true); }} className="text-zinc-500 hover:text-blue-500">Editar</button>
                    <button onClick={(e) => { e.stopPropagation(); handleDeleteTemplate(tpl.$id); }} className="text-zinc-500 hover:text-red-500">Excluir</button>
                  </div>
                </div>
              ))}
              <div onClick={() => { setEditingTemplate(null); setShowTemplateModal(true); }} className="rounded-[var(--radius,0.5rem)] border border-dashed border-zinc-300 p-4 flex items-center justify-center text-zinc-500 hover:bg-zinc-50 cursor-pointer min-h-[100px]">
                + Criar Novo Template
              </div>
            </div>
          </div>
        )}

        {showTemplateModal && (
          <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-xl shadow-lg w-full max-w-2xl max-h-[90vh] overflow-hidden flex flex-col">
              <div className="p-6 border-b border-zinc-200">
                <h2 className="text-lg font-medium">{editingTemplate ? 'Editar Template' : 'Novo Template'}</h2>
              </div>
              <div className="p-6 overflow-y-auto flex-1 space-y-4">
                <div>
                  <label className="text-sm font-medium text-zinc-900">Nome do Template</label>
                  <input type="text" id="tpl_nome" defaultValue={editingTemplate?.nome} className="mt-1 w-full rounded border border-zinc-200 px-3 py-2" />
                </div>
                <div>
                  <label className="text-sm font-medium text-zinc-900">Descrição</label>
                  <textarea id="tpl_desc" defaultValue={editingTemplate?.descricao} rows={2} className="mt-1 w-full rounded border border-zinc-200 px-3 py-2"></textarea>
                </div>
                <div>
                  <label className="text-sm font-medium text-zinc-900">Conteúdo Base (HTML)</label>
                  <textarea id="tpl_content" defaultValue={editingTemplate?.conteudo} rows={8} className="mt-1 w-full rounded border border-zinc-200 px-3 py-2 font-mono text-sm" placeholder="<h2>Introdução</h2>..."></textarea>
                </div>
              </div>
              <div className="p-6 border-t border-zinc-200 flex justify-end gap-2">
                <button onClick={() => setShowTemplateModal(false)} className="px-4 py-2 text-sm font-medium text-zinc-600 hover:bg-zinc-100 rounded">Cancelar</button>
                <button onClick={() => {
                  const nome = (document.getElementById('tpl_nome') as HTMLInputElement).value;
                  const desc = (document.getElementById('tpl_desc') as HTMLTextAreaElement).value;
                  const content = (document.getElementById('tpl_content') as HTMLTextAreaElement).value;
                  handleSaveTemplate({ nome, descricao: desc, conteudo: content });
                }} className="px-4 py-2 text-sm font-medium text-white bg-zinc-900 hover:bg-zinc-800 rounded">Salvar</button>
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
                <input type="url" value={evoUrl} onChange={(e) => setEvoUrl(e.target.value)} className="mt-1 w-full rounded-[var(--radius,0.5rem)] border border-zinc-200 px-3 py-2 text-sm outline-none focus:border-zinc-950 focus:ring-1 focus:ring-zinc-950" />
              </div>
              <div>
                <label className="text-sm font-medium text-zinc-900">Global API Key</label>
                <input type="password" value={evoKey} onChange={(e) => setEvoKey(e.target.value)} className="mt-1 w-full rounded-[var(--radius,0.5rem)] border border-zinc-200 px-3 py-2 text-sm outline-none focus:border-zinc-950 focus:ring-1 focus:ring-zinc-950" />
              </div>
              <div className="pt-4 border-t border-zinc-200">
                <label className="text-sm font-medium text-zinc-900">WhatsApp da Agência (Notificações de Leads)</label>
                <p className="text-xs text-zinc-500 mb-2">Este número receberá um alerta sempre que um lead cair em qualquer cliente.</p>
                <input type="text" value={evoAgencia} onChange={(e) => setEvoAgencia(e.target.value)} className="w-full rounded-[var(--radius,0.5rem)] border border-zinc-200 px-3 py-2 text-sm outline-none focus:border-zinc-950 focus:ring-1 focus:ring-zinc-950" />
              </div>
            </div>
            <button onClick={() => handleSaveConfig('Integrações (Evolution API)', { evoUrl, evoKey, evoAgencia })} className="mt-4 inline-flex items-center gap-2 rounded-[var(--radius,0.5rem)] bg-zinc-900 px-4 py-2 text-sm font-medium text-white hover:bg-zinc-800" style={{ backgroundColor: 'var(--primary-color, #18181b)' }}>
              <Save className="h-4 w-4" /> Salvar Integrações
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
