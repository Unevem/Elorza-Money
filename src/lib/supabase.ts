import { createClient } from '@supabase/supabase-js';

const url  = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const anon = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

// ── Cliente público (Client Components / auth flows)
export const supabase = createClient(url, anon);

// ── Cliente Admin (Server Actions — bypassa RLS via service_role)
// Nunca expor ao browser. Apenas em arquivos server-side.
export function createAdminClient() {
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!serviceKey) throw new Error('SUPABASE_SERVICE_ROLE_KEY não configurada no .env.local');
  return createClient(url, serviceKey, {
    auth: { persistSession: false },
  });
}
