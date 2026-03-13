import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Users, DollarSign, Activity, Building } from 'lucide-react';
import { databases, DATABASE_ID, COLLECTIONS } from '../../lib/appwrite';

export default function AdminDashboard() {
  const [stats, setStats] = useState({ clientes: 0, leads: 0, artigos: 0 });
  const [activeClients, setActiveClients] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const [cliRes, leadsRes, artRes] = await Promise.all([
          databases.listDocuments(DATABASE_ID, COLLECTIONS.CLIENTES),
          databases.listDocuments(DATABASE_ID, COLLECTIONS.LEADS),
          databases.listDocuments(DATABASE_ID, COLLECTIONS.ARTIGOS)
        ]);
        
        setStats({
          clientes: cliRes.total,
          leads: leadsRes.total,
          artigos: artRes.total
        });

        // Get top 4 clients roughly for the list
        setActiveClients(cliRes.documents.slice(0, 4));
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
  }, []);

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
            <div className="text-2xl font-bold">{loading ? '-' : stats.clientes}</div>
            <p className="text-xs text-zinc-500">Métricas atualizadas em tempo real</p>
          </CardContent>
        </Card>
        <Card className="rounded-[var(--radius,0.5rem)]">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Leads Gerados (Total)</CardTitle>
            <Users className="h-4 w-4 text-zinc-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{loading ? '-' : stats.leads}</div>
            <p className="text-xs text-zinc-500">Métricas atualizadas em tempo real</p>
          </CardContent>
        </Card>
        <Card className="rounded-[var(--radius,0.5rem)]">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Artigos Publicados</CardTitle>
            <Activity className="h-4 w-4 text-zinc-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{loading ? '-' : stats.artigos}</div>
            <p className="text-xs text-zinc-500">Métricas atualizadas em tempo real</p>
          </CardContent>
        </Card>
        <Card className="rounded-[var(--radius,0.5rem)]">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">MRR Estimado</CardTitle>
            <DollarSign className="h-4 w-4 text-zinc-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{loading ? '-' : `R$ ${stats.clientes * 1000}`}</div>
            <p className="text-xs text-zinc-500">Média de 1000/cliente</p>
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
              {loading ? (
                <p className="text-sm text-zinc-500">Carregando...</p>
              ) : activeClients.length > 0 ? activeClients.map((cliente, i) => (
                <div key={i} className="flex items-center justify-between border-b border-zinc-100 pb-4 last:border-0 last:pb-0">
                  <div className="flex items-center gap-3">
                    <div className="h-8 w-8 rounded-[var(--radius,0.5rem)] bg-zinc-100 flex items-center justify-center font-medium text-zinc-600">
                      {cliente.nome ? cliente.nome[0].toUpperCase() : '-'}
                    </div>
                    <span className="font-medium text-sm text-zinc-900">{cliente.nome}</span>
                  </div>
                  <span className="text-sm text-zinc-500">{cliente.leadsCount || 0} leads</span>
                </div>
              )) : (
                <p className="text-sm text-zinc-500">Nenhum cliente disponível</p>
              )}
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
