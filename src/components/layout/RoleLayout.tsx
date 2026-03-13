import React, { useState } from 'react';
import { Outlet, Link, useLocation, useNavigate } from 'react-router-dom';
import { Menu, X, LogOut, Bell, AlertTriangle, UserX, ChevronLeft, ChevronRight } from 'lucide-react';
import { toast } from 'sonner';
import { getAuth, setAuth, setImpersonation } from '../../lib/auth';

interface NavItem {
  name: string;
  href: string;
  icon: React.ElementType;
}

interface RoleLayoutProps {
  navigation: NavItem[];
  roleName: string;
  basePath: string;
}

export default function RoleLayout({ navigation, roleName, basePath }: RoleLayoutProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { role, impersonating } = getAuth();

  // Simulating a broadcast message from Admin
  const broadcastMessage = "Manutenção programada para o servidor principal nesta sexta-feira às 23h.";

  const handleLogout = () => {
    setAuth(null);
    toast.success('Sessão encerrada');
    navigate('/login');
  };

  const handleStopImpersonating = () => {
    setImpersonation(null);
    toast.success('Sessão de cliente encerrada. Voltando ao Admin.');
    navigate('/admin/clientes');
  };

  const pathnames = location.pathname.split('/').filter((x) => x && x !== basePath.replace('/', ''));

  // Dynamic Greeting
  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Bom dia';
    if (hour < 18) return 'Boa tarde';
    return 'Boa noite';
  };

  const userName = role === 'admin' ? 'João' : role === 'client' ? 'Maria' : 'Carlos';

  return (
    <div className="flex min-h-screen w-full bg-zinc-50/50" style={{ backgroundColor: 'var(--bg-color, #fafafa)' }}>
      {/* Sidebar Desktop */}
      <aside className={`hidden flex-col border-r border-zinc-200 bg-white sm:flex transition-all duration-300 ${isSidebarCollapsed ? 'w-20' : 'w-64'}`}>
        <div className="flex h-14 items-center justify-between border-b border-zinc-200 px-4">
          <div className={`flex items-center gap-2 font-semibold text-zinc-950 ${isSidebarCollapsed ? 'justify-center w-full' : ''}`}>
            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-[var(--radius,0.5rem)] bg-zinc-900 text-white" style={{ backgroundColor: 'var(--primary-color, #18181b)' }}>
              N
            </div>
            {!isSidebarCollapsed && (
              <span className="truncate">NexusHub <span className="text-xs font-normal text-zinc-500 ml-1 border border-zinc-200 rounded px-1">{roleName}</span></span>
            )}
          </div>
        </div>
        <nav className="flex flex-1 flex-col gap-1 p-4 overflow-y-auto">
          {navigation.map((item) => {
            const isActive = location.pathname === item.href || (item.href !== basePath && location.pathname.startsWith(item.href));
            return (
              <Link
                key={item.name}
                to={item.href}
                title={isSidebarCollapsed ? item.name : undefined}
                className={`flex items-center gap-3 rounded-[var(--radius,0.75rem)] px-3 py-2 text-sm font-medium transition-colors ${
                  isActive ? 'bg-zinc-100 text-zinc-900' : 'text-zinc-500 hover:bg-zinc-100 hover:text-zinc-900'
                } ${isSidebarCollapsed ? 'justify-center' : ''}`}
              >
                <item.icon className="h-5 w-5 shrink-0" />
                {!isSidebarCollapsed && <span className="truncate">{item.name}</span>}
              </Link>
            );
          })}
        </nav>
        <div className="border-t border-zinc-200 p-4 flex flex-col gap-2">
          <button 
            onClick={() => setIsSidebarCollapsed(!isSidebarCollapsed)} 
            className={`flex w-full items-center gap-3 rounded-[var(--radius,0.75rem)] px-3 py-2 text-sm font-medium text-zinc-500 hover:bg-zinc-100 hover:text-zinc-900 ${isSidebarCollapsed ? 'justify-center' : ''}`}
            title={isSidebarCollapsed ? "Expandir Menu" : "Recolher Menu"}
          >
            {isSidebarCollapsed ? <ChevronRight className="h-5 w-5 shrink-0" /> : <><ChevronLeft className="h-5 w-5 shrink-0" /> <span className="truncate">Recolher</span></>}
          </button>
          <button onClick={handleLogout} className={`flex w-full items-center gap-3 rounded-[var(--radius,0.75rem)] px-3 py-2 text-sm font-medium text-red-600 hover:bg-red-50 hover:text-red-700 ${isSidebarCollapsed ? 'justify-center' : ''}`} title={isSidebarCollapsed ? "Sair" : undefined}>
            <LogOut className="h-5 w-5 shrink-0" />
            {!isSidebarCollapsed && <span className="truncate">Sair</span>}
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
                  className="flex items-center gap-3 rounded-[var(--radius,0.75rem)] px-3 py-2 text-sm font-medium text-zinc-500 hover:bg-zinc-100"
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
      <div className="flex flex-1 flex-col min-w-0">
        {/* Broadcast Banner */}
        {broadcastMessage && (
          <div className="bg-indigo-600 px-4 py-2 text-center text-xs font-medium text-white sm:px-6 lg:px-8 flex items-center justify-center gap-2" style={{ backgroundColor: 'var(--primary-color, #4f46e5)' }}>
            <AlertTriangle className="h-4 w-4" />
            {broadcastMessage}
          </div>
        )}

        {/* Impersonation Banner */}
        {impersonating && (
          <div className="bg-orange-500 px-4 py-2 text-center text-xs font-medium text-white sm:px-6 lg:px-8 flex items-center justify-center gap-4">
            <span>Você está acessando como <strong>{impersonating}</strong> (Modo Impersonation)</span>
            <button onClick={handleStopImpersonating} className="flex items-center gap-1 underline hover:text-orange-100">
              <UserX className="h-3 w-3" /> Sair do modo cliente
            </button>
          </div>
        )}

        <header className="sticky top-0 z-30 flex h-14 items-center justify-between border-b border-zinc-200 bg-white px-4 sm:px-6">
          <div className="flex items-center gap-4">
            <button className="sm:hidden" onClick={() => setIsMobileMenuOpen(true)}>
              <Menu className="h-5 w-5 text-zinc-500" />
            </button>
            
            {/* Client Logo in Header (if client) */}
            {role === 'client' && (
              <div className="hidden sm:flex items-center gap-3 border-r border-zinc-200 pr-4 mr-2">
                <div className="h-6 w-6 rounded bg-zinc-100 flex items-center justify-center text-xs font-bold text-zinc-400">CL</div>
                <span className="text-sm font-medium text-zinc-700">Cliente S.A.</span>
              </div>
            )}

            {/* Dynamic Greeting */}
            <div className="hidden sm:block text-sm text-zinc-600">
              {getGreeting()}, <span className="font-medium text-zinc-900">{userName}</span>!
            </div>
          </div>

          <div className="flex items-center gap-4">
            <button className="relative rounded-full p-1 hover:bg-zinc-100">
              <Bell className="h-5 w-5 text-zinc-500" />
              <span className="absolute right-1 top-1 flex h-2 w-2 rounded-full bg-red-500"></span>
            </button>
            
            {/* Profile Link & Avatar */}
            <Link to={`${basePath}/perfil`} className="relative group cursor-pointer">
              <div className="h-8 w-8 rounded-full bg-zinc-200 flex items-center justify-center text-xs font-bold text-zinc-600 border border-zinc-300 group-hover:ring-2 group-hover:ring-zinc-950 transition-all">
                {userName.substring(0, 2).toUpperCase()}
              </div>
              {/* Online Status */}
              <div className="absolute bottom-0 right-0 h-2.5 w-2.5 rounded-full bg-emerald-500 border-2 border-white" title="Online"></div>
            </Link>
          </div>
        </header>

        <main className="flex-1 overflow-auto p-4 sm:p-6 print:p-0 print:overflow-visible">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
