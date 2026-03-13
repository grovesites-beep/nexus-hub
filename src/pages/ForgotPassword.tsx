import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

export default function ForgotPassword() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 px-4" style={{ backgroundColor: 'var(--bg-color, #fafafa)' }}>
      <div className="w-full max-w-md space-y-8 rounded-[var(--radius,1rem)] bg-white p-8 shadow-sm border border-zinc-200">
        <div className="text-center">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-[var(--radius,0.75rem)] bg-zinc-900 text-xl font-bold text-white" style={{ backgroundColor: 'var(--primary-color, #18181b)' }}>
            N
          </div>
          <h2 className="mt-6 text-2xl font-bold tracking-tight text-zinc-950">
            Recuperar Senha
          </h2>
          <p className="mt-2 text-sm text-zinc-500">
            Digite seu e-mail para receber as instruções de redefinição.
          </p>
        </div>

        <form className="mt-8 space-y-6" onSubmit={(e) => e.preventDefault()}>
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-zinc-900">
              E-mail
            </label>
            <div className="mt-2">
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                className="block w-full rounded-[var(--radius,0.5rem)] border border-zinc-200 px-3 py-2 text-zinc-900 placeholder-zinc-400 focus:border-zinc-950 focus:outline-none focus:ring-1 focus:ring-zinc-950 sm:text-sm"
                placeholder="seu@email.com"
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="flex w-full justify-center rounded-[var(--radius,0.5rem)] bg-zinc-900 px-3 py-2 text-sm font-semibold text-white hover:bg-zinc-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-zinc-900 transition-colors"
              style={{ backgroundColor: 'var(--primary-color, #18181b)' }}
            >
              Enviar instruções
            </button>
          </div>
        </form>

        <div className="text-center">
          <Link to="/login" className="inline-flex items-center gap-2 text-sm font-medium text-zinc-600 hover:text-zinc-900">
            <ArrowLeft className="h-4 w-4" />
            Voltar para o login
          </Link>
        </div>
      </div>
    </div>
  );
}
