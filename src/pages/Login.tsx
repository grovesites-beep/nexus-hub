import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { toast } from 'sonner';
import { setAuth } from '../lib/auth';
import { Shield, Briefcase, PenTool } from 'lucide-react';

export default function Login() {
  const navigate = useNavigate();
  // Mocking the layout configuration from Admin
  const [layout] = useState<'card' | 'split' | 'full'>('card');
  const [hidePoweredBy] = useState(false);

  const handleLogin = (role: 'admin' | 'client' | 'copywriter') => {
    setAuth(role);
    toast.success(`Login realizado como ${role.toUpperCase()}`);
    navigate(`/${role}`);
  };

  const LoginForm = () => (
    <div className="w-full max-w-md space-y-8 rounded-[var(--radius,1rem)] bg-white p-8 shadow-sm border border-zinc-200">
      <div className="text-center">
        <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-[var(--radius,0.75rem)] bg-zinc-900 text-xl font-bold text-white" style={{ backgroundColor: 'var(--primary-color, #18181b)' }}>
          N
        </div>
        <h2 className="mt-6 text-2xl font-bold tracking-tight text-zinc-950">
          Acesse sua conta
        </h2>
        <p className="mt-2 text-sm text-zinc-500">
          Selecione seu perfil para entrar (Modo Demo)
        </p>
      </div>

      <div className="mt-8 space-y-4">
        <button
          onClick={() => handleLogin('admin')}
          className="flex w-full items-center justify-between rounded-[var(--radius,0.75rem)] border border-zinc-200 p-4 hover:border-zinc-950 hover:bg-zinc-50 transition-colors"
        >
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-[var(--radius,0.5rem)] bg-indigo-100 text-indigo-600">
              <Shield className="h-5 w-5" />
            </div>
            <div className="text-left">
              <p className="font-medium text-zinc-900">Administrador</p>
              <p className="text-xs text-zinc-500">Dono da Agência</p>
            </div>
          </div>
        </button>

        <button
          onClick={() => handleLogin('client')}
          className="flex w-full items-center justify-between rounded-[var(--radius,0.75rem)] border border-zinc-200 p-4 hover:border-zinc-950 hover:bg-zinc-50 transition-colors"
        >
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-[var(--radius,0.5rem)] bg-emerald-100 text-emerald-600">
              <Briefcase className="h-5 w-5" />
            </div>
            <div className="text-left">
              <p className="font-medium text-zinc-900">Cliente</p>
              <p className="text-xs text-zinc-500">Dono do Negócio</p>
            </div>
          </div>
        </button>

        <button
          onClick={() => handleLogin('copywriter')}
          className="flex w-full items-center justify-between rounded-[var(--radius,0.75rem)] border border-zinc-200 p-4 hover:border-zinc-950 hover:bg-zinc-50 transition-colors"
        >
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-[var(--radius,0.5rem)] bg-orange-100 text-orange-600">
              <PenTool className="h-5 w-5" />
            </div>
            <div className="text-left">
              <p className="font-medium text-zinc-900">Copywriter</p>
              <p className="text-xs text-zinc-500">Produtor de Conteúdo</p>
            </div>
          </div>
        </button>
      </div>

      <div className="mt-6 text-center">
        <Link to="/forgot-password" className="text-sm font-medium text-zinc-600 hover:text-zinc-900">
          Esqueceu sua senha?
        </Link>
      </div>

      {!hidePoweredBy && (
        <div className="mt-8 text-center text-xs text-zinc-400">
          Powered by NexusHub
        </div>
      )}
    </div>
  );

  if (layout === 'split') {
    return (
      <div className="flex min-h-screen bg-zinc-50" style={{ backgroundColor: 'var(--bg-color, #fafafa)' }}>
        <div className="hidden lg:block lg:w-1/2 bg-zinc-900 bg-[url('https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=2069&auto=format&fit=crop')] bg-cover bg-center">
          <div className="h-full w-full bg-black/50 flex items-center justify-center p-12">
            <div className="text-white max-w-lg">
              <h1 className="text-4xl font-bold mb-4">Bem-vindo à sua plataforma de crescimento.</h1>
              <p className="text-lg text-zinc-300">Gerencie seus leads, acompanhe resultados e escale suas vendas em um só lugar.</p>
            </div>
          </div>
        </div>
        <div className="flex w-full lg:w-1/2 items-center justify-center px-4">
          <LoginForm />
        </div>
      </div>
    );
  }

  if (layout === 'full') {
    return (
      <div className="flex min-h-screen items-center justify-center bg-zinc-900 px-4 bg-[url('https://images.unsplash.com/photo-1557683316-973673baf926?q=80&w=2029&auto=format&fit=crop')] bg-cover bg-center">
        <div className="absolute inset-0 bg-black/40 backdrop-blur-sm"></div>
        <div className="relative z-10 w-full max-w-md">
          <LoginForm />
        </div>
      </div>
    );
  }

  // Default Card Layout
  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 px-4" style={{ backgroundColor: 'var(--bg-color, #fafafa)' }}>
      <LoginForm />
    </div>
  );
}
