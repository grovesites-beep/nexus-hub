import React, { useState } from 'react';
import { Save, Image as ImageIcon, Sparkles, MessageSquare, CheckCircle2, AlertCircle, Calendar, User, Tag } from 'lucide-react';
import { toast } from 'sonner';

export default function CopywriterEditor() {
  const [showWpModal, setShowWpModal] = useState(false);

  return (
    <div className="flex flex-col lg:flex-row gap-6 h-[calc(100vh-8rem)]">
      {/* Main Editor Area */}
      <div className="flex-1 flex flex-col bg-white rounded-xl border border-zinc-200 shadow-sm overflow-hidden">
        <div className="flex flex-col border-b border-zinc-200 p-4 gap-4">
          <input 
            type="text" 
            defaultValue="Como otimizar seu site para SEO" 
            className="text-xl font-semibold outline-none w-full text-zinc-950 placeholder:text-zinc-300"
          />
          
          {/* WP Metadata Bar */}
          <div className="flex flex-wrap items-center gap-4 text-sm">
            <div className="flex items-center gap-2 text-zinc-600">
              <User className="h-4 w-4" />
              <select className="bg-transparent border-none outline-none font-medium text-zinc-900 cursor-pointer">
                <option>Autor: João (Admin WP)</option>
                <option>Autor: Maria (Editora WP)</option>
              </select>
            </div>
            <div className="w-px h-4 bg-zinc-200"></div>
            <div className="flex items-center gap-2 text-zinc-600">
              <Calendar className="h-4 w-4" />
              <input type="datetime-local" className="bg-transparent border-none outline-none font-medium text-zinc-900 cursor-pointer" title="Agendar Publicação (Cron WP)" />
            </div>
            <div className="w-px h-4 bg-zinc-200"></div>
            <div className="flex items-center gap-2 text-zinc-600">
              <Tag className="h-4 w-4" />
              <select className="bg-transparent border-none outline-none font-medium text-zinc-900 cursor-pointer">
                <option>Categoria: Marketing</option>
                <option>Categoria: Vendas</option>
                <option>Categoria: SEO</option>
              </select>
            </div>
          </div>
        </div>
        
        {/* Toolbar Mock */}
        <div className="flex items-center gap-2 border-b border-zinc-100 p-2 bg-zinc-50">
          <button className="p-1.5 hover:bg-zinc-200 rounded text-zinc-700 font-bold">B</button>
          <button className="p-1.5 hover:bg-zinc-200 rounded text-zinc-700 italic">I</button>
          <button className="p-1.5 hover:bg-zinc-200 rounded text-zinc-700 underline">U</button>
          <div className="w-px h-4 bg-zinc-300 mx-1"></div>
          <button 
            onClick={() => setShowWpModal(true)}
            className="flex items-center gap-1 p-1.5 hover:bg-zinc-200 rounded text-zinc-700 text-sm font-medium"
          >
            <ImageIcon className="h-4 w-4" /> Mídia WP
          </button>
          <div className="w-px h-4 bg-zinc-300 mx-1"></div>
          <button 
            onClick={() => toast.success('IA gerando ideias...')}
            className="flex items-center gap-1 p-1.5 hover:bg-indigo-100 text-indigo-600 rounded text-sm font-medium ml-auto"
          >
            <Sparkles className="h-4 w-4" /> Assistente IA
          </button>
        </div>

        {/* Editor Content Area */}
        <div className="flex-1 p-6 overflow-auto">
          <p className="text-zinc-700 leading-relaxed">
            O SEO (Search Engine Optimization) é fundamental para qualquer estratégia de marketing digital. 
            Neste artigo, vamos explorar as melhores práticas para 2026...
            <br/><br/>
            [Área do Editor WYSIWYG Real]
          </p>
        </div>
      </div>

      {/* Right Sidebar: SEO & Chat */}
      <div className="w-full lg:w-80 flex flex-col gap-4">
        {/* SEO Analysis */}
        <div className="bg-white rounded-xl border border-zinc-200 shadow-sm p-4">
          <h3 className="font-semibold text-zinc-950 mb-4">Análise SEO (Tempo Real)</h3>
          
          <div className="space-y-3 text-sm">
            <div className="flex items-start gap-2">
              <CheckCircle2 className="h-4 w-4 text-emerald-500 mt-0.5" />
              <div>
                <p className="font-medium text-zinc-900">Palavra-chave no Título</p>
                <p className="text-xs text-zinc-500">"SEO" encontrada.</p>
              </div>
            </div>
            <div className="flex items-start gap-2">
              <AlertCircle className="h-4 w-4 text-orange-500 mt-0.5" />
              <div>
                <p className="font-medium text-zinc-900">Densidade da Palavra</p>
                <p className="text-xs text-zinc-500">Apenas 0.5%. Tente aumentar para 1.5%.</p>
              </div>
            </div>
            <div className="flex items-start gap-2">
              <CheckCircle2 className="h-4 w-4 text-emerald-500 mt-0.5" />
              <div>
                <p className="font-medium text-zinc-900">Tamanho do Texto</p>
                <p className="text-xs text-zinc-500">Bom (850 palavras).</p>
              </div>
            </div>
          </div>
        </div>

        {/* Chat / Comments */}
        <div className="flex-1 bg-white rounded-xl border border-zinc-200 shadow-sm flex flex-col overflow-hidden">
          <div className="p-3 border-b border-zinc-200 bg-zinc-50 flex items-center gap-2">
            <MessageSquare className="h-4 w-4 text-zinc-500" />
            <h3 className="font-medium text-zinc-900 text-sm">Comentários do Cliente</h3>
          </div>
          <div className="flex-1 p-4 overflow-auto space-y-4">
            <div className="bg-zinc-100 rounded-lg p-3 text-sm">
              <p className="font-medium text-zinc-900 text-xs mb-1">Cliente (Empresa XYZ)</p>
              <p className="text-zinc-700">Por favor, adicione um parágrafo sobre SEO Local no final.</p>
            </div>
          </div>
          <div className="p-3 border-t border-zinc-200">
            <input type="text" placeholder="Responder..." className="w-full rounded-lg border border-zinc-200 px-3 py-2 text-sm outline-none focus:border-zinc-950 focus:ring-1 focus:ring-zinc-950" />
          </div>
        </div>

        <button onClick={() => toast.success('Artigo enviado para aprovação do cliente!')} className="w-full flex items-center justify-center gap-2 rounded-xl bg-zinc-900 px-4 py-3 text-sm font-medium text-white hover:bg-zinc-800 shadow-sm">
          <Save className="h-4 w-4" /> Enviar para Aprovação
        </button>
      </div>

      {/* WP Media Modal Mock */}
      {showWpModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-zinc-950/50 p-4">
          <div className="w-full max-w-2xl rounded-2xl bg-white p-6 shadow-xl">
            <h2 className="text-xl font-semibold text-zinc-950 mb-4">Biblioteca de Mídia (WordPress)</h2>
            <div className="grid grid-cols-3 gap-4 mb-6">
              <div className="aspect-video bg-zinc-100 rounded-lg border border-zinc-200 bg-[url('https://picsum.photos/seed/seo/300/200')] bg-cover cursor-pointer hover:ring-2 ring-zinc-950"></div>
              <div className="aspect-video bg-zinc-100 rounded-lg border border-zinc-200 bg-[url('https://picsum.photos/seed/marketing/300/200')] bg-cover cursor-pointer hover:ring-2 ring-zinc-950"></div>
              <div className="aspect-video bg-zinc-100 rounded-lg border border-zinc-200 flex items-center justify-center text-zinc-400 cursor-pointer hover:bg-zinc-50">
                + Upload
              </div>
            </div>
            <div className="flex justify-end gap-3">
              <button onClick={() => setShowWpModal(false)} className="rounded-xl px-4 py-2 text-sm font-medium text-zinc-700 hover:bg-zinc-100">Cancelar</button>
              <button onClick={() => { setShowWpModal(false); toast.success('Imagem inserida no editor!'); }} className="rounded-xl bg-zinc-900 px-4 py-2 text-sm font-medium text-white hover:bg-zinc-800">Inserir no Artigo</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
