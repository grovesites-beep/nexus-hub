export type Role = 'admin' | 'client' | 'copywriter' | null;

export const getAuth = () => {
  const role = localStorage.getItem('role') as Role;
  const impersonating = localStorage.getItem('impersonating');
  return { role, impersonating, isAuthenticated: !!role };
};

export const setAuth = (role: Role) => {
  if (role) localStorage.setItem('role', role);
  else {
    localStorage.removeItem('role');
    localStorage.removeItem('impersonating');
  }
};

export const setImpersonation = (clientId: string | null) => {
  if (clientId) localStorage.setItem('impersonating', clientId);
  else localStorage.removeItem('impersonating');
};
