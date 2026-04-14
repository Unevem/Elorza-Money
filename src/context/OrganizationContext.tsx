"use client";
import { createContext, useContext, useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { getUserOrganizations, type UserOrgAccess } from '@/actions/auth.actions';
import type { User } from '@supabase/supabase-js';
import type { Organization } from '@/types/database';

interface OrgContextValue {
  user: User | null;
  currentOrg: Organization | null;
  userOrgs: UserOrgAccess[];
  currentRole: string;
  setCurrentAccess: (access: UserOrgAccess) => void;
  signOut: () => Promise<void>;
  isLoading: boolean;
}

const OrgContext = createContext<OrgContextValue | null>(null);

export function useOrgContext() {
  const ctx = useContext(OrgContext);
  if (!ctx) throw new Error('useOrgContext precisa estar dentro do OrganizationProvider');
  return ctx;
}

export function OrganizationProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser]               = useState<User | null>(null);
  const [userOrgs, setUserOrgs]       = useState<UserOrgAccess[]>([]);
  const [currentOrg, setCurrentOrg]   = useState<Organization | null>(null);
  const [currentRole, setCurrentRole] = useState('user');
  const [isLoading, setIsLoading]     = useState(true);

  async function loadOrgs(u: User) {
    setUser(u);
    const result = await getUserOrganizations(u.id);
    if (!result.success) { setIsLoading(false); return; }

    setUserOrgs(result.data);

    // Tenta restaurar a org salva na sessão anterior
    const savedSlug = sessionStorage.getItem('currentOrgSlug');
    const saved = result.data.find(a => a.org.slug === savedSlug);
    const chosen = saved ?? (result.data.length === 1 ? result.data[0] : null);

    if (chosen) {
      setCurrentOrg(chosen.org);
      setCurrentRole(chosen.role);
    }
    setIsLoading(false);
  }

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session?.user) loadOrgs(session.user);
      else setIsLoading(false);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_e, session) => {
      if (session?.user) { loadOrgs(session.user); }
      else {
        setUser(null); setUserOrgs([]); setCurrentOrg(null); setIsLoading(false);
        sessionStorage.removeItem('currentOrgSlug');
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  const setCurrentAccess = (access: UserOrgAccess) => {
    setCurrentOrg(access.org);
    setCurrentRole(access.role);
    sessionStorage.setItem('currentOrgSlug', access.org.slug);
  };

  const signOut = async () => { await supabase.auth.signOut(); };

  return (
    <OrgContext.Provider value={{ user, currentOrg, userOrgs, currentRole, setCurrentAccess, signOut, isLoading }}>
      {children}
    </OrgContext.Provider>
  );
}
