import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Users, FileText, Activity, Download, BellRing, Zap } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { toast } from 'sonner';
import { databases, DATABASE_ID, COLLECTIONS } from '../../lib/appwrite';

const chartData = [
  { name: '01/03', visitas: 120, leads: 4 },
  { name: '05/03', visitas: 210, leads: 7 },
  { name: '10/03', visitas: 180, leads: 5 },
  { name: '15/03', visitas: 320, leads: 12 },
];

export default function ClientDashboard() {
  const [stats, setStats] = useState({ leads: 0, artigos: 0 });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const [leadsRes, artRes] = await Promise.all([
          databases.listDocuments(DATABASE_ID, COLLECTIONS.LEADS),
          databases.listDocuments(DATABASE_ID, COLLECTIONS.ARTIGOS)
        ]);
        setStats({
          leads: leadsRes.total,
          artigos: artRes.total
        });
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
    // Simulating a push/sound notification for a new lead
    const timer = setTimeout(() => {
      toast('Novo Lead Recebido!', {
        description: 'João Silva acabou de preencher o formulário.',
        icon: <BellRing className="h-4 w-4 text-emerald-500" />,
      });
      // In a real app: new Audio('/notification.mp3').play().catch(e => console.log(e));
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

  const handleGeneratePDF = () => {
    toast.success('Gerando relatório PDF com o timbre da agência...');
    setTimeout(() => window.print(), 1000);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between print:hidden">
        <h1 className="text-2xl font-semibold tracking-tight text-zinc-950">Visão Geral</h1>
        <button onClick={handleGeneratePDF} className="inline-flex items-center gap-2 rounded-[var(--radius,0.5rem)] bg-white border border-zinc-200 px-4 py-2 text-sm font-medium text-zinc-900 hover:bg-zinc-50 shadow-sm">
          <Download className="h-4 w-4" /> Relatório PDF
        </button>
      </div>
      
      {/* Follow-up Reminders */}
      <div className="rounded-[var(--radius,0.75rem)] border border-orange-200 bg-orange-50 p-4 print:hidden">
        <div className="flex items-center gap-3">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-orange-100">
            <BellRing className="h-4 w-4 text-orange-600" />
          </div>
          <div>
            <h3 className="text-sm font-medium text-orange-900">Atenção: Leads parados</h3>
            <p className="text-xs text-orange-700">Você tem 2 leads na coluna "Novo" há mais de 48 horas. Faça o follow-up!</p>
          </div>
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Card className="rounded-[var(--radius,0.5rem)]">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Oportunidades</CardTitle>
            <Users className="h-4 w-4 text-zinc-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{loading ? '-' : stats.leads}</div>
            <p className="text-xs text-zinc-500">Métricas em tempo real</p>
          </CardContent>
        </Card>
        <Card className="rounded-[var(--radius,0.5rem)]">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Tráfego do Site</CardTitle>
            <Activity className="h-4 w-4 text-zinc-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1.204</div>
            <p className="text-xs text-zinc-500">Visitantes únicos (Google Analytics)</p>
          </CardContent>
        </Card>
        <Card className="rounded-[var(--radius,0.5rem)]">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Artigos Base</CardTitle>
            <FileText className="h-4 w-4 text-zinc-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{loading ? '-' : stats.artigos}</div>
            <p className="text-xs text-zinc-500">Métricas em tempo real</p>
          </CardContent>
        </Card>
        
        {/* Lighthouse Metrics */}
        <Card className="bg-emerald-50 border-emerald-100 rounded-[var(--radius,0.5rem)]">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-emerald-900">Saúde do Site (Lighthouse)</CardTitle>
            <Zap className="h-4 w-4 text-emerald-600" />
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-4 mt-2">
              <div className="flex flex-col items-center">
                <div className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-emerald-500 text-sm font-bold text-emerald-700">98</div>
                <span className="text-[10px] text-emerald-700 mt-1 font-medium">Desempenho</span>
              </div>
              <div className="flex flex-col items-center">
                <div className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-emerald-500 text-sm font-bold text-emerald-700">100</div>
                <span className="text-[10px] text-emerald-700 mt-1 font-medium">SEO</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="rounded-[var(--radius,0.5rem)]">
        <CardHeader>
          <CardTitle>Tráfego vs Leads (Analytics)</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e4e4e7" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#71717a', fontSize: 12 }} dy={10} />
                <YAxis yAxisId="left" axisLine={false} tickLine={false} tick={{ fill: '#71717a', fontSize: 12 }} dx={-10} />
                <YAxis yAxisId="right" orientation="right" axisLine={false} tickLine={false} tick={{ fill: '#71717a', fontSize: 12 }} dx={10} />
                <Tooltip contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} />
                <Line yAxisId="left" type="monotone" dataKey="visitas" stroke="#18181b" strokeWidth={2} name="Visitas" />
                <Line yAxisId="right" type="monotone" dataKey="leads" stroke="#10b981" strokeWidth={2} name="Leads" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
