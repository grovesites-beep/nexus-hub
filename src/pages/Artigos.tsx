import React, { useState } from 'react';
import { Plus, Edit, Trash2, Eye, FileText } from 'lucide-react';
import { toast } from 'sonner';

export default function Artigos() {
  const [isEditing, setIsEditing] = useState(false);

  if (isEditing) {
    return (
      <div className="space-y-6 max-w-4xl">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-semibold text-zinc-950">Novo Artigo</h1>
          <div className="flex gap-3">
            <button onClick={() => setIsEditing(false)} className="rounded-xl px-4 py-2 text-sm font-medium text-zinc-700 hover:bg-zinc-100">Cancelar</button>
            <button onClick={() => { toast.success('Artigo salvo como rascunho!'); setIsEditing(false); }} className="rounded-xl border border-zinc-200 bg-white px-4 py-2 text-sm font-medium text-zinc-900 hover:bg-zinc-50 shadow-sm">Salvar Rascunho</button>
            <button onClick={() => { toast.success('Artigo publicado no WordPress!'); setIsEditing(false); }} className="rounded-xl bg-zinc-900 px-4 py-2 text-sm font-medium text-white hover:bg-zinc-800">Publicar</button>
          </div>
        </div>

        <div className="space-y-4 rounded-xl border border-zinc-200 bg-white p-6 shadow-sm">
          <input type="text" placeholder="Título do Artigo" className="w-full text-2xl font-bold outline-none placeholder:text-zinc-300" />
          
          <div className="flex gap-4">
            <select className="rounded-lg border border-zinc-200 px-3 py-2 text-sm outline-none focus:border-zinc-950 focus:ring-1 focus:ring-zinc-950">
              <option>Categoria: Tecnologia</option>
              <option>Categoria: Negócios</option>
            </select>
            <input type="text" placeholder="Tags (separadas por vírgula)" className="flex-1 rounded-lg border border-zinc-200 px-3 py-2 text-sm outline-none focus:border-zinc-950 focus:ring-1 focus:ring-zinc-950" />
          </div>

          <div className="min-h-[300px] rounded-lg border border-zinc-200 p-4">
            <p className="text-zinc-400 text-sm italic">O editor WYSIWYG (ex: TipTap) seria renderizado aqui...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold text-zinc-950">Artigos (Blog)</h1>
        <button onClick={() => setIsEditing(true)} className="inline-flex items-center gap-2 rounded-xl bg-zinc-900 px-4 py-2 text-sm font-medium text-white hover:bg-zinc-800 shadow-sm">
          <Plus className="h-4 w-4" /> Novo Artigo
        </button>
      </div>

      <div className="overflow-hidden rounded-xl border border-zinc-200 bg-white shadow-sm">
        <table className="w-full text-left text-sm">
          <thead className="bg-zinc-50 text-zinc-500">
            <tr>
              <th className="px-6 py-3 font-medium">Título</th>
              <th className="px-6 py-3 font-medium">Categoria</th>
              <th className="px-6 py-3 font-medium">Status</th>
              <th className="px-6 py-3 font-medium text-right">Ações</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-zinc-200">
            <tr>
              <td className="px-6 py-4 font-medium text-zinc-900">Como melhorar o SEO do seu site</td>
              <td className="px-6 py-4 text-zinc-500">Marketing</td>
              <td className="px-6 py-4"><span className="inline-flex items-center rounded-full bg-emerald-100 px-2.5 py-0.5 text-xs font-medium text-emerald-800">Publicado</span></td>
              <td className="px-6 py-4 text-right">
                <button className="p-2 text-zinc-400 hover:text-zinc-900"><Eye className="h-4 w-4" /></button>
                <button className="p-2 text-zinc-400 hover:text-zinc-900"><Edit className="h-4 w-4" /></button>
                <button className="p-2 text-zinc-400 hover:text-red-600"><Trash2 className="h-4 w-4" /></button>
              </td>
            </tr>
            <tr>
              <td className="px-6 py-4 font-medium text-zinc-900">Tendências de Design 2026</td>
              <td className="px-6 py-4 text-zinc-500">Design</td>
              <td className="px-6 py-4"><span className="inline-flex items-center rounded-full bg-zinc-100 px-2.5 py-0.5 text-xs font-medium text-zinc-800">Rascunho</span></td>
              <td className="px-6 py-4 text-right">
                <button className="p-2 text-zinc-400 hover:text-zinc-900"><Eye className="h-4 w-4" /></button>
                <button className="p-2 text-zinc-400 hover:text-zinc-900"><Edit className="h-4 w-4" /></button>
                <button className="p-2 text-zinc-400 hover:text-red-600"><Trash2 className="h-4 w-4" /></button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
