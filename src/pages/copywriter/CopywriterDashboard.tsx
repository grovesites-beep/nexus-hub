import React from 'react';
import { Calendar as CalendarIcon, Clock, CheckCircle, AlertCircle, DownloadCloud } from 'lucide-react';
import { toast } from 'sonner';

export default function CopywriterDashboard() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <h1 className="text-2xl font-semibold tracking-tight text-zinc-950">Calendário Editorial (Kanban)</h1>
        <div className="flex items-center gap-2">
          <button onClick={() => toast.success('Buscando artigos publicados no WordPress...')} className="inline-flex items-center gap-2 rounded-xl border border-zinc-200 bg-white px-4 py-2 text-sm font-medium text-zinc-700 hover:bg-zinc-50 shadow-sm">
            <DownloadCloud className="h-4 w-4" /> Importar do WP
          </button>
          <button className="inline-flex items-center gap-2 rounded-xl bg-zinc-900 px-4 py-2 text-sm font-medium text-white hover:bg-zinc-800 shadow-sm">
            + Nova Pauta
          </button>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-3 lg:grid-cols-4 items-start">
        {/* Column: A Fazer */}
        <div className="flex flex-col gap-3">
          <div className="flex items-center justify-between">
            <h3 className="font-medium text-zinc-900 flex items-center gap-2">
              <div className="h-2 w-2 rounded-full bg-zinc-400"></div> A Fazer
            </h3>
            <span className="text-xs font-medium text-zinc-500 bg-zinc-100 px-2 py-0.5 rounded-full">2</span>
          </div>
          
          <div className="rounded-xl border border-zinc-200 bg-white p-4 shadow-sm cursor-grab hover:border-zinc-300">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-[10px] font-bold uppercase tracking-wider text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded">Empresa XYZ</span>
            </div>
            <h4 className="text-sm font-medium text-zinc-900 mb-3">5 Dicas de Marketing Digital para 2026</h4>
            <div className="flex items-center justify-between text-xs text-zinc-500">
              <span className="flex items-center gap-1"><CalendarIcon className="h-3 w-3" /> 20/03</span>
            </div>
          </div>
          
          <div className="rounded-xl border border-zinc-200 bg-white p-4 shadow-sm cursor-grab hover:border-zinc-300">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded">Clínica Sorriso</span>
            </div>
            <h4 className="text-sm font-medium text-zinc-900 mb-3">A importância do clareamento dental</h4>
            <div className="flex items-center justify-between text-xs text-zinc-500">
              <span className="flex items-center gap-1"><CalendarIcon className="h-3 w-3" /> 22/03</span>
            </div>
          </div>
        </div>

        {/* Column: Escrevendo */}
        <div className="flex flex-col gap-3">
          <div className="flex items-center justify-between">
            <h3 className="font-medium text-zinc-900 flex items-center gap-2">
              <div className="h-2 w-2 rounded-full bg-blue-500"></div> Escrevendo
            </h3>
            <span className="text-xs font-medium text-zinc-500 bg-zinc-100 px-2 py-0.5 rounded-full">1</span>
          </div>
          
          <div className="rounded-xl border border-blue-200 bg-blue-50/50 p-4 shadow-sm cursor-grab">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-[10px] font-bold uppercase tracking-wider text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded">Empresa XYZ</span>
            </div>
            <h4 className="text-sm font-medium text-zinc-900 mb-3">Como otimizar seu site para SEO</h4>
            <div className="flex items-center justify-between text-xs text-zinc-500">
              <span className="flex items-center gap-1 text-blue-600"><Clock className="h-3 w-3" /> Em andamento</span>
            </div>
          </div>
        </div>

        {/* Column: Em Revisão (Cliente) */}
        <div className="flex flex-col gap-3">
          <div className="flex items-center justify-between">
            <h3 className="font-medium text-zinc-900 flex items-center gap-2">
              <div className="h-2 w-2 rounded-full bg-orange-500"></div> Em Revisão
            </h3>
            <span className="text-xs font-medium text-zinc-500 bg-zinc-100 px-2 py-0.5 rounded-full">1</span>
          </div>
          
          <div className="rounded-xl border border-orange-200 bg-orange-50/50 p-4 shadow-sm cursor-grab">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded">Clínica Sorriso</span>
            </div>
            <h4 className="text-sm font-medium text-zinc-900 mb-3">Mitos e verdades sobre implantes</h4>
            <div className="flex items-center justify-between text-xs text-zinc-500">
              <span className="flex items-center gap-1 text-orange-600"><AlertCircle className="h-3 w-3" /> Aguardando Cliente</span>
            </div>
          </div>
        </div>

        {/* Column: Publicado */}
        <div className="flex flex-col gap-3">
          <div className="flex items-center justify-between">
            <h3 className="font-medium text-zinc-900 flex items-center gap-2">
              <div className="h-2 w-2 rounded-full bg-emerald-500"></div> Publicado
            </h3>
            <span className="text-xs font-medium text-zinc-500 bg-zinc-100 px-2 py-0.5 rounded-full">12</span>
          </div>
          
          <div className="rounded-xl border border-zinc-200 bg-white p-4 shadow-sm opacity-60">
            <h4 className="text-sm font-medium text-zinc-900 line-through mb-3">O que é Inbound Marketing?</h4>
            <div className="flex items-center justify-between text-xs text-zinc-500">
              <span className="flex items-center gap-1 text-emerald-600"><CheckCircle className="h-3 w-3" /> Concluído</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
