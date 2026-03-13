import React, { useState } from 'react';
import { Save, Smartphone, Database, MessageSquare, Image as ImageIcon, QrCode } from 'lucide-react';
import { toast } from 'sonner';
import { MultiImageUpload } from '../../components/ui/MultiImageUpload';

export default function ClientConfig() {
  const [activeTab, setActiveTab] = useState('whatsapp');
  const [isGeneratingQR, setIsGeneratingQR] = useState(false);
  const [qrCodeVisible, setQrCodeVisible] = useState(false);
  
  const [galleryImages, setGalleryImages] = useState<string[]>([
    'https://picsum.photos/seed/1/200/200',
    'https://picsum.photos/seed/2/200/200',
    'https://picsum.photos/seed/3/200/200',
    'https://picsum.photos/seed/4/200/200'
  ]);

  const handleAddImages = (newImages: string[]) => {
    setGalleryImages(prev => [...prev, ...newImages]);
  };

  const handleRemoveImage = (index: number) => {
    setGalleryImages(prev => prev.filter((_, i) => i !== index));
  };

  const handleGenerateQR = () => {
    setIsGeneratingQR(true);
    setTimeout(() => {
      setIsGeneratingQR(false);
      setQrCodeVisible(true);
      toast.success('QR Code gerado! Escaneie com seu WhatsApp.');
    }, 2000);
  };

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold text-zinc-950">Configurações do Site</h1>
      
      <div className="flex border-b border-zinc-200 overflow-x-auto">
        {[
          { id: 'whatsapp', name: 'WhatsApp (Evolution)', icon: Smartphone },
          { id: 'site', name: 'Campos do Site (ACF)', icon: Database },
          { id: 'comentarios', name: 'Comentários do Blog', icon: MessageSquare },
          { id: 'galeria', name: 'Galeria de Fotos', icon: ImageIcon },
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
        
        {/* WhatsApp & Evolution API */}
        {activeTab === 'whatsapp' && (
          <div className="space-y-8 max-w-2xl">
            <section>
              <h2 className="text-lg font-medium text-zinc-950">Conexão do WhatsApp</h2>
              <p className="text-sm text-zinc-500 mb-4">Conecte seu WhatsApp para habilitar automações e disparos pelo painel.</p>
              
              {!qrCodeVisible ? (
                <div className="flex flex-col items-center justify-center rounded-[var(--radius,1rem)] border border-dashed border-zinc-300 bg-zinc-50 py-12">
                  <QrCode className="h-12 w-12 text-zinc-400 mb-4" />
                  <button 
                    onClick={handleGenerateQR}
                    disabled={isGeneratingQR}
                    className="inline-flex items-center gap-2 rounded-[var(--radius,0.5rem)] bg-emerald-600 px-4 py-2 text-sm font-medium text-white hover:bg-emerald-700"
                  >
                    {isGeneratingQR ? 'Gerando...' : 'Gerar QR Code de Conexão'}
                  </button>
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center rounded-[var(--radius,1rem)] border border-emerald-200 bg-emerald-50 py-8">
                  <div className="h-48 w-48 bg-white border border-zinc-200 p-2 rounded-[var(--radius,0.5rem)] flex items-center justify-center">
                    {/* Mock QR Code */}
                    <img src="https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=mock_evolution_api_qr_code" alt="QR Code" />
                  </div>
                  <p className="text-sm text-emerald-800 mt-4 font-medium">Aguardando leitura pelo aplicativo do WhatsApp...</p>
                </div>
              )}
            </section>

            <section className="pt-6 border-t border-zinc-200">
              <h2 className="text-lg font-medium text-zinc-950">Templates de Resposta Rápida</h2>
              <p className="text-sm text-zinc-500 mb-4">Crie mensagens padrão para usar ao chamar um lead no WhatsApp.</p>
              
              <div className="space-y-4">
                <div className="rounded-[var(--radius,0.5rem)] border border-zinc-200 p-4">
                  <input type="text" defaultValue="Saudação Inicial" className="font-medium text-zinc-900 bg-transparent outline-none w-full mb-2" />
                  <textarea rows={2} defaultValue="Olá! Vi que você se cadastrou no nosso site. Como posso ajudar?" className="w-full text-sm text-zinc-600 outline-none resize-none bg-transparent" />
                </div>
                <div className="rounded-[var(--radius,0.5rem)] border border-zinc-200 p-4">
                  <input type="text" defaultValue="Agendar Reunião" className="font-medium text-zinc-900 bg-transparent outline-none w-full mb-2" />
                  <textarea rows={2} defaultValue="Olá! Gostaria de agendar uma reunião rápida para entender sua demanda?" className="w-full text-sm text-zinc-600 outline-none resize-none bg-transparent" />
                </div>
                <button className="text-sm font-medium text-zinc-900 hover:underline">+ Adicionar Template</button>
              </div>
            </section>
          </div>
        )}

        {/* ACF / Site Fields */}
        {activeTab === 'site' && (
          <div className="space-y-4 max-w-2xl">
            <h2 className="text-lg font-medium text-zinc-950">Informações do Site (ACF)</h2>
            <p className="text-sm text-zinc-500 mb-4">As alterações feitas aqui refletem instantaneamente no seu site WordPress.</p>
            
            <div className="grid gap-4">
              <div>
                <label className="text-sm font-medium text-zinc-900">Telefone Principal (Header)</label>
                <input type="text" defaultValue="(11) 9999-9999" className="mt-1 w-full rounded-[var(--radius,0.5rem)] border border-zinc-200 px-3 py-2 text-sm outline-none focus:border-zinc-950 focus:ring-1 focus:ring-zinc-950" />
              </div>
              <div>
                <label className="text-sm font-medium text-zinc-900">Endereço (Rodapé)</label>
                <input type="text" defaultValue="Av. Paulista, 1000 - São Paulo, SP" className="mt-1 w-full rounded-[var(--radius,0.5rem)] border border-zinc-200 px-3 py-2 text-sm outline-none focus:border-zinc-950 focus:ring-1 focus:ring-zinc-950" />
              </div>
              <div>
                <label className="text-sm font-medium text-zinc-900">Link do Instagram</label>
                <input type="url" defaultValue="https://instagram.com/empresa" className="mt-1 w-full rounded-[var(--radius,0.5rem)] border border-zinc-200 px-3 py-2 text-sm outline-none focus:border-zinc-950 focus:ring-1 focus:ring-zinc-950" />
              </div>
            </div>
            <button onClick={() => toast.success('Campos sincronizados com o WordPress!')} className="mt-4 inline-flex items-center gap-2 rounded-[var(--radius,0.5rem)] bg-zinc-900 px-4 py-2 text-sm font-medium text-white hover:bg-zinc-800" style={{ backgroundColor: 'var(--primary-color, #18181b)' }}>
              <Save className="h-4 w-4" /> Sincronizar Alterações
            </button>
          </div>
        )}

        {/* Comments */}
        {activeTab === 'comentarios' && (
          <div className="space-y-4">
            <h2 className="text-lg font-medium text-zinc-950">Moderação de Comentários</h2>
            <p className="text-sm text-zinc-500 mb-4">Aprove ou rejeite comentários feitos no seu blog.</p>
            
            <div className="space-y-4">
              {[1, 2].map((i) => (
                <div key={i} className="rounded-[var(--radius,0.5rem)] border border-zinc-200 p-4 flex items-start justify-between">
                  <div>
                    <h4 className="font-medium text-zinc-900">Maria Silva <span className="text-xs text-zinc-500 font-normal">em "Como aumentar suas vendas"</span></h4>
                    <p className="text-sm text-zinc-600 mt-1">Ótimo artigo! Me ajudou muito a entender as novas estratégias.</p>
                  </div>
                  <div className="flex gap-2">
                    <button onClick={() => toast.success('Comentário aprovado no WP!')} className="text-xs font-medium text-emerald-700 bg-emerald-50 px-2 py-1 rounded-[var(--radius,0.25rem)] hover:bg-emerald-100">Aprovar</button>
                    <button onClick={() => toast.success('Marcado como SPAM!')} className="text-xs font-medium text-red-700 bg-red-50 px-2 py-1 rounded-[var(--radius,0.25rem)] hover:bg-red-100">SPAM</button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Gallery */}
        {activeTab === 'galeria' && (
          <div className="space-y-4">
            <h2 className="text-lg font-medium text-zinc-950">Galeria de Fotos do Site</h2>
            <p className="text-sm text-zinc-500 mb-4">Faça upload de imagens para atualizar a galeria do seu site WordPress.</p>
            
            <MultiImageUpload 
              images={galleryImages}
              onAddImages={handleAddImages}
              onRemoveImage={handleRemoveImage}
            />
          </div>
        )}
      </div>
    </div>
  );
}
