import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Users, DollarSign, Activity, Building } from 'lucide-react';

export default function AdminDashboard() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold tracking-tight text-zinc-950">Dashboard Global</h1>
      </div>
      
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Card className="rounded-[var(--radius,0.5rem)]">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total de Clientes</CardTitle>
            <Building className="h-4 w-4 text-zinc-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">24</div>
            <p className="text-xs text-zinc-500">+3 neste mês</p>
          </CardContent>
        </Card>
        <Card className="rounded-[var(--radius,0.5rem)]">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Leads Gerados (Mês)</CardTitle>
            <Users className="h-4 w-4 text-zinc-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1.245</div>
            <p className="text-xs text-zinc-500">+15% em relação ao mês anterior</p>
          </CardContent>
        </Card>
        <Card className="rounded-[var(--radius,0.5rem)]">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Artigos Publicados</CardTitle>
            <Activity className="h-4 w-4 text-zinc-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">89</div>
            <p className="text-xs text-zinc-500">Por 5 copywriters</p>
          </CardContent>
        </Card>
        <Card className="rounded-[var(--radius,0.5rem)]">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">MRR Estimado</CardTitle>
            <DollarSign className="h-4 w-4 text-zinc-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">R$ 45.000</div>
            <p className="text-xs text-zinc-500">Baseado em assinaturas ativas</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        <Card className="rounded-[var(--radius,0.5rem)]">
          <CardHeader>
            <CardTitle>Clientes Mais Ativos</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {['Empresa XYZ', 'Clínica Sorriso', 'Advocacia Silva', 'Construtora Alpha'].map((cliente, i) => (
                <div key={i} className="flex items-center justify-between border-b border-zinc-100 pb-4 last:border-0 last:pb-0">
                  <div className="flex items-center gap-3">
                    <div className="h-8 w-8 rounded-[var(--radius,0.5rem)] bg-zinc-100 flex items-center justify-center font-medium text-zinc-600">{cliente[0]}</div>
                    <span className="font-medium text-sm text-zinc-900">{cliente}</span>
                  </div>
                  <span className="text-sm text-zinc-500">{Math.floor(Math.random() * 100) + 20} leads</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
        
        <Card className="rounded-[var(--radius,0.5rem)]">
          <CardHeader>
            <CardTitle>Avisos do Sistema (Broadcast)</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="rounded-[var(--radius,0.5rem)] border border-indigo-100 bg-indigo-50 p-4" style={{ borderColor: 'color-mix(in srgb, var(--primary-color) 20%, transparent)', backgroundColor: 'color-mix(in srgb, var(--primary-color) 10%, transparent)' }}>
              <p className="text-sm font-medium text-indigo-900" style={{ color: 'var(--primary-color)' }}>Aviso Ativo Atual:</p>
              <p className="mt-1 text-sm text-indigo-700" style={{ color: 'color-mix(in srgb, var(--primary-color) 80%, black)' }}>"Manutenção programada para o servidor principal nesta sexta-feira às 23h."</p>
              <button className="mt-3 text-xs font-medium text-indigo-600 hover:text-indigo-800 underline" style={{ color: 'var(--primary-color)' }}>Editar Aviso</button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
