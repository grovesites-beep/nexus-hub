import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Users, Briefcase, FileText, Activity, MessageSquare } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const chartData = [
  { name: 'Seg', leads: 4 },
  { name: 'Ter', leads: 7 },
  { name: 'Qua', leads: 5 },
  { name: 'Qui', leads: 12 },
  { name: 'Sex', leads: 8 },
  { name: 'Sáb', leads: 2 },
  { name: 'Dom', leads: 3 },
];

export default function DashboardResumo() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1500);
    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div className="h-8 w-48 animate-pulse rounded-lg bg-zinc-200"></div>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="h-32 animate-pulse rounded-xl bg-zinc-200"></div>
          ))}
        </div>
        <div className="grid gap-4 lg:grid-cols-7">
          <div className="col-span-4 h-96 animate-pulse rounded-xl bg-zinc-200"></div>
          <div className="col-span-3 h-96 animate-pulse rounded-xl bg-zinc-200"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold tracking-tight text-zinc-950">Visão Geral</h1>
        <Badge variant="secondary" className="hidden sm:flex">
          Sincronizado há 5 min
        </Badge>
      </div>
      
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Novas Oportunidades</CardTitle>
            <Users className="h-4 w-4 text-zinc-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12</div>
            <p className="text-xs text-zinc-500">+2 desde ontem</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Serviços Ativos</CardTitle>
            <Briefcase className="h-4 w-4 text-zinc-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">8</div>
            <p className="text-xs text-zinc-500">Sincronizados com o site</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Artigos Publicados</CardTitle>
            <FileText className="h-4 w-4 text-zinc-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">24</div>
            <p className="text-xs text-zinc-500">+3 neste mês</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Taxa de Resposta</CardTitle>
            <Activity className="h-4 w-4 text-zinc-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">98%</div>
            <p className="text-xs text-zinc-500">Tempo médio: 2h</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 lg:grid-cols-7">
        <Card className="col-span-4">
          <CardHeader>
            <CardTitle>Desempenho de Leads (Últimos 7 dias)</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e4e4e7" />
                  <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#71717a', fontSize: 12 }} dy={10} />
                  <YAxis axisLine={false} tickLine={false} tick={{ fill: '#71717a', fontSize: 12 }} dx={-10} />
                  <Tooltip contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} />
                  <Line type="monotone" dataKey="leads" stroke="#18181b" strokeWidth={2} dot={{ r: 4, fill: '#18181b' }} activeDot={{ r: 6 }} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card className="col-span-3">
          <CardHeader>
            <CardTitle>Leads Recentes</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-8">
              {[
                { nome: "Ana Silva", servico: "Desenvolvimento Web", status: "novo", tempo: "2 horas atrás" },
                { nome: "Carlos Oliveira", servico: "Marketing Digital", status: "em atendimento", tempo: "5 horas atrás" },
                { nome: "Roberto Almeida", servico: "Auditoria", status: "finalizado", tempo: "1 dia atrás" },
                { nome: "Empresa XYZ", servico: "Consultoria Financeira", status: "novo", tempo: "2 dias atrás" },
              ].map((lead, i) => (
                <div key={i} className="flex items-center gap-4">
                  <div className="flex h-9 w-9 items-center justify-center rounded-full bg-zinc-100">
                    <MessageSquare className="h-4 w-4 text-zinc-500" />
                  </div>
                  <div className="grid gap-1">
                    <p className="text-sm font-medium leading-none">{lead.nome}</p>
                    <p className="text-sm text-zinc-500">Interesse: {lead.servico}</p>
                  </div>
                  <div className="ml-auto flex items-center gap-2">
                    <Badge variant={lead.status === 'novo' ? 'default' : lead.status === 'em atendimento' ? 'secondary' : 'outline'} className="capitalize">
                      {lead.status}
                    </Badge>
                    <span className="text-xs text-zinc-500 hidden sm:inline-block w-16 text-right">{lead.tempo}</span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
