"use client";
import { useState, useTransition, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase';
import { getUserOrganizations, type UserOrgAccess } from '@/actions/auth.actions';
import { useOrgContext } from '@/context/OrganizationContext';
import { OrgSelector } from './OrgSelector';
import { DollarSign, Eye, EyeOff } from 'lucide-react';

type Step = 'form' | 'org-select';

export default function LoginPage() {
  const router = useRouter();
  const { setCurrentAccess, user, currentOrg, userOrgs } = useOrgContext();

  const [step, setStep]           = useState<Step>('form');
  const [email, setEmail]         = useState('');
  const [password, setPassword]   = useState('');
  const [showPass, setShowPass]   = useState(false);
  const [error, setError]         = useState('');
  const [orgs, setOrgs]           = useState<UserOrgAccess[]>([]);
  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    if (user) {
      if (currentOrg) {
        router.push('/');
      } else if (userOrgs.length > 1) {
        setOrgs(userOrgs);
        setStep('org-select');
      }
    }
  }, [user, currentOrg, userOrgs, router]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    startTransition(async () => {
      const { data, error: authError } = await supabase.auth.signInWithPassword({ email, password });
      if (authError || !data.user) {
        setError('Email ou senha incorretos. Tente novamente.');
        return;
      }

      const result = await getUserOrganizations(data.user.id);
      if (!result.success || result.data.length === 0) {
        setError('Usuário sem organização vinculada. Contate o administrador.');
        return;
      }

      if (result.data.length === 1) {
        setCurrentAccess(result.data[0]);
        router.push('/');
      } else {
        setOrgs(result.data);
        setStep('org-select');
      }
    });
  };

  const handleOrgSelect = (access: UserOrgAccess) => {
    setCurrentAccess(access);
    router.push('/');
  };

  return (
    <div className="w-full max-w-sm flex flex-col gap-8">
      {/* Logo */}
      <div className="flex flex-col items-center gap-3">
        <div className="w-16 h-16 bg-primary rounded-2xl flex items-center justify-center shadow-lg">
          <DollarSign className="text-white" size={32} strokeWidth={2.5} />
        </div>
        <div className="text-center">
          <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">Elorza Money</h1>
          <p className="text-gray-500 mt-1">
            {step === 'form' ? 'Entre para registrar seus gastos' : 'Qual organização hoje?'}
          </p>
        </div>
      </div>

      <div className="bg-white rounded-3xl shadow-sm border border-gray-200 p-8">
        {step === 'org-select' ? (
          <OrgSelector orgs={orgs} onSelect={handleOrgSelect} />
        ) : (
          <form onSubmit={handleLogin} className="flex flex-col gap-5">
            <div className="flex flex-col gap-2">
              <label htmlFor="email" className="font-bold text-gray-700 text-lg">Email</label>
              <input id="email" type="email" autoComplete="email" required
                value={email} onChange={(e) => setEmail(e.target.value)}
                placeholder="seu@email.com"
                className="h-14 px-4 text-lg border-2 border-gray-300 rounded-2xl focus:border-primary focus:ring-4 focus:ring-primary/20 outline-none"
              />
            </div>

            <div className="flex flex-col gap-2">
              <label htmlFor="password" className="font-bold text-gray-700 text-lg">Senha</label>
              <div className="relative">
                <input id="password" type={showPass ? 'text' : 'password'}
                  autoComplete="current-password" required
                  value={password} onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full h-14 px-4 pr-14 text-lg border-2 border-gray-300 rounded-2xl focus:border-primary focus:ring-4 focus:ring-primary/20 outline-none"
                />
                <button type="button" onClick={() => setShowPass(!showPass)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                  aria-label="Mostrar senha"
                >
                  {showPass ? <EyeOff size={22} /> : <Eye size={22} />}
                </button>
              </div>
            </div>

            {error && (
              <div className="bg-red-50 border-2 border-red-200 text-red-700 rounded-xl px-4 py-3 text-base font-medium">
                {error}
              </div>
            )}

            <button type="submit" disabled={isPending}
              className="mt-2 h-16 w-full bg-primary text-white text-xl font-bold rounded-2xl hover:bg-primary/90 transition-colors shadow-md active:scale-[0.98] disabled:opacity-60"
            >
              {isPending ? 'Entrando...' : 'Entrar'}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
