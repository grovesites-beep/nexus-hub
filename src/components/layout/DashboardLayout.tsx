import React, { useState } from 'react';
import { Outlet, Link, useLocation, useNavigate } from 'react-router-dom';
import { LayoutDashboard, Users, FileText, Briefcase, Settings, Menu, X, LogOut, Globe, Bell } from 'lucide-react';
import { toast } from 'sonner';

export default function DashboardLayout() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const navigation = [
    { name: 'Visão Geral', href: '/', icon: LayoutDashboard },
    { name: 'Oportunidades', href: '/leads', icon: Users },
    { name: 'Artigos (Blog)', href: '/artigos', icon: FileText },
    { name: 'Serviços', href: '/servicos', icon: Briefcase },
    { name: 'Configurações', href: '/configuracoes', icon: Settings },
  ];

  const handleLogout = () => {
    localStorage.removeItem('auth');
    toast.success('Sessão encerrada com sucesso');
    navigate('/login');
  };

  const pathnames = location.pathname.split('/').filter((x) => x);

  return (
    <div className="flex min-h-screen w-full bg-zinc-50/50">
      {/* Sidebar Desktop */}
      <aside className="hidden w-64 flex-col border-r border-zinc-200 bg-white sm:flex">
        <div className="flex h-14 items-center border-b border-zinc-200 px-4">
          <div className="flex items-center gap-2 font-semibold text-zinc-950">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-zinc-900 text-white">
              N
            </div>
            NexusHub
          </div>
        </div>
        <nav className="flex flex-1 flex-col gap-1 p-4">
          {navigation.map((item) => {
            const isActive = location.pathname === item.href || (item.href !== '/' && location.pathname.startsWith(item.href));
            return (
              <Link
                key={item.name}
                to={item.href}
                className={`flex items-center gap-3 rounded-xl px-3 py-2 text-sm font-medium transition-colors ${
                  isActive ? 'bg-zinc-100 text-zinc-900' : 'text-zinc-500 hover:bg-zinc-100 hover:text-zinc-900'
                }`}
              >
                <item.icon className="h-4 w-4" />
                {item.name}
              </Link>
            );
          })}
        </nav>
        <div className="border-t border-zinc-200 p-4">
          <button onClick={handleLogout} className="flex w-full items-center gap-3 rounded-xl px-3 py-2 text-sm font-medium text-zinc-500 hover:bg-zinc-100 hover:text-zinc-900">
            <LogOut className="h-4 w-4" />
            Sair
          </button>
        </div>
      </aside>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-50 flex sm:hidden">
          <div className="fixed inset-0 bg-zinc-950/50" onClick={() => setIsMobileMenuOpen(false)} />
          <aside className="relative flex w-64 flex-col bg-white">
            <div className="flex h-14 items-center justify-between border-b border-zinc-200 px-4">
              <span className="font-semibold text-zinc-950">NexusHub</span>
              <button onClick={() => setIsMobileMenuOpen(false)}><X className="h-5 w-5 text-zinc-500" /></button>
            </div>
            <nav className="flex flex-1 flex-col gap-1 p-4">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="flex items-center gap-3 rounded-xl px-3 py-2 text-sm font-medium text-zinc-500 hover:bg-zinc-100"
                >
                  <item.icon className="h-4 w-4" />
                  {item.name}
                </Link>
              ))}
            </nav>
          </aside>
        </div>
      )}

      {/* Main Content */}
      <div className="flex flex-1 flex-col">
        <header className="sticky top-0 z-30 flex h-14 items-center justify-between border-b border-zinc-200 bg-white px-4 sm:px-6">
          <div className="flex items-center gap-4">
            <button className="sm:hidden" onClick={() => setIsMobileMenuOpen(true)}>
              <Menu className="h-5 w-5 text-zinc-500" />
            </button>
            
            {/* Breadcrumbs */}
            <div className="hidden items-center gap-2 text-sm text-zinc-500 sm:flex">
              <Link to="/" className="hover:text-zinc-900">Início</Link>
              {pathnames.map((value, index) => {
                const to = `/${pathnames.slice(0, index + 1).join('/')}`;
                return (
                  <React.Fragment key={to}>
                    <span>/</span>
                    <Link to={to} className="capitalize hover:text-zinc-900">
                      {value}
                    </Link>
                  </React.Fragment>
                );
              })}
            </div>
          </div>

          <div className="flex items-center gap-4">
            {/* Multi-site Selector */}
            <div className="hidden items-center gap-2 sm:flex">
              <Globe className="h-4 w-4 text-zinc-500" />
              <select className="rounded-lg border border-zinc-200 bg-zinc-50 px-2 py-1 text-sm text-zinc-900 outline-none focus:ring-2 focus:ring-zinc-950">
                <option>Empresa XYZ (Principal)</option>
                <option>Filial ABC</option>
              </select>
            </div>
            
            <button className="relative rounded-full p-1 hover:bg-zinc-100">
              <Bell className="h-5 w-5 text-zinc-500" />
              <span className="absolute right-1 top-1 flex h-2 w-2 rounded-full bg-red-500"></span>
            </button>
            
            <div className="h-8 w-8 rounded-full bg-zinc-200 bg-[url('https://picsum.photos/seed/user/100/100')] bg-cover bg-center"></div>
          </div>
        </header>

        <main className="flex-1 overflow-auto p-4 sm:p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
