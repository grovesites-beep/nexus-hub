import React, { useState } from 'react';
import { Save, Camera, User, Mail, Phone, MapPin } from 'lucide-react';
import { toast } from 'sonner';
import { getAuth } from '../lib/auth';

export default function Profile() {
  const { role } = getAuth();
  const [avatarPreview, setAvatarPreview] = useState<string | null>(null);
  const [coverPreview, setCoverPreview] = useState<string | null>(null);

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setAvatarPreview(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  const handleCoverChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setCoverPreview(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <h1 className="text-2xl font-semibold tracking-tight text-zinc-950">Meu Perfil</h1>

      <div className="bg-white rounded-[var(--radius,1rem)] border border-zinc-200 shadow-sm overflow-hidden">
        {/* Cover Photo */}
        <div className="relative h-48 bg-zinc-100 group">
          {coverPreview ? (
            <img src={coverPreview} alt="Cover" className="w-full h-full object-cover" />
          ) : (
            <div className="w-full h-full bg-gradient-to-r from-indigo-500 to-purple-600" style={{ backgroundImage: 'var(--cover-gradient, linear-gradient(to right, #6366f1, #9333ea))' }}></div>
          )}
          <label className="absolute bottom-4 right-4 cursor-pointer bg-white/90 backdrop-blur-sm px-3 py-1.5 rounded-lg text-sm font-medium text-zinc-700 shadow-sm hover:bg-white transition-colors flex items-center gap-2">
            <Camera className="h-4 w-4" />
            Alterar Capa
            <input type="file" accept="image/*" className="hidden" onChange={handleCoverChange} />
          </label>
        </div>

        <div className="px-6 pb-6">
          {/* Avatar */}
          <div className="relative -mt-12 mb-6 flex justify-between items-end">
            <div className="relative group">
              <div className="h-24 w-24 rounded-full border-4 border-white bg-zinc-200 overflow-hidden flex items-center justify-center text-2xl font-bold text-zinc-500 shadow-sm">
                {avatarPreview ? (
                  <img src={avatarPreview} alt="Avatar" className="w-full h-full object-cover" />
                ) : (
                  "JS"
                )}
              </div>
              <label className="absolute inset-0 flex items-center justify-center bg-black/50 text-white opacity-0 group-hover:opacity-100 rounded-full cursor-pointer transition-opacity">
                <Camera className="h-6 w-6" />
                <input type="file" accept="image/*" className="hidden" onChange={handleAvatarChange} />
              </label>
              {/* Online Status Indicator */}
              <div className="absolute bottom-1 right-1 h-4 w-4 rounded-full bg-emerald-500 border-2 border-white" title="Online"></div>
            </div>
            
            <button onClick={() => toast.success('Perfil atualizado com sucesso!')} className="inline-flex items-center gap-2 rounded-[var(--radius,0.5rem)] bg-zinc-900 px-4 py-2 text-sm font-medium text-white hover:bg-zinc-800 shadow-sm" style={{ backgroundColor: 'var(--primary-color, #18181b)' }}>
              <Save className="h-4 w-4" /> Salvar Perfil
            </button>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            <div className="space-y-4">
              <h3 className="font-medium text-zinc-900 border-b border-zinc-100 pb-2">Informações Pessoais</h3>
              
              <div className="grid gap-2">
                <label className="text-sm font-medium text-zinc-700">Nome Completo</label>
                <div className="relative">
                  <User className="absolute left-3 top-2.5 h-4 w-4 text-zinc-400" />
                  <input type="text" defaultValue="João Silva" className="w-full rounded-[var(--radius,0.5rem)] border border-zinc-200 pl-9 pr-3 py-2 text-sm outline-none focus:border-zinc-950 focus:ring-1 focus:ring-zinc-950" />
                </div>
              </div>

              <div className="grid gap-2">
                <label className="text-sm font-medium text-zinc-700">E-mail</label>
                <div className="relative">
                  <Mail className="absolute left-3 top-2.5 h-4 w-4 text-zinc-400" />
                  <input type="email" defaultValue="joao@exemplo.com" className="w-full rounded-[var(--radius,0.5rem)] border border-zinc-200 pl-9 pr-3 py-2 text-sm outline-none focus:border-zinc-950 focus:ring-1 focus:ring-zinc-950" />
                </div>
              </div>

              <div className="grid gap-2">
                <label className="text-sm font-medium text-zinc-700">Telefone / WhatsApp</label>
                <div className="relative">
                  <Phone className="absolute left-3 top-2.5 h-4 w-4 text-zinc-400" />
                  <input type="text" defaultValue="+55 11 99999-9999" className="w-full rounded-[var(--radius,0.5rem)] border border-zinc-200 pl-9 pr-3 py-2 text-sm outline-none focus:border-zinc-950 focus:ring-1 focus:ring-zinc-950" />
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="font-medium text-zinc-900 border-b border-zinc-100 pb-2">Configurações Adicionais</h3>
              
              {/* Salesperson Signature (Visible for Admin/Client) */}
              {(role === 'admin' || role === 'client') && (
                <div className="grid gap-2">
                  <label className="text-sm font-medium text-zinc-700">Assinatura de Vendedor (WhatsApp)</label>
                  <p className="text-xs text-zinc-500">Esta assinatura será anexada ao final das suas mensagens enviadas pelo sistema.</p>
                  <textarea rows={3} defaultValue="Abs, João Silva\nConsultor de Vendas | NexusHub" className="w-full rounded-[var(--radius,0.5rem)] border border-zinc-200 px-3 py-2 text-sm outline-none focus:border-zinc-950 focus:ring-1 focus:ring-zinc-950" />
                </div>
              )}

              <div className="grid gap-2">
                <label className="text-sm font-medium text-zinc-700">Fuso Horário</label>
                <select className="w-full rounded-[var(--radius,0.5rem)] border border-zinc-200 px-3 py-2 text-sm outline-none focus:border-zinc-950 focus:ring-1 focus:ring-zinc-950">
                  <option>America/Sao_Paulo (GMT-3)</option>
                  <option>America/Manaus (GMT-4)</option>
                </select>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
