'use server';

import { createAdminClient } from '@/lib/supabase';
import type { ActionResult, Categoria, OrgSlug } from '@/types/database';

export async function getCategories(orgSlug: OrgSlug): Promise<ActionResult<Categoria[]>> {
  try {
    const db = createAdminClient();

    const { data: org } = await db
      .from('organizations')
      .select('id')
      .eq('slug', orgSlug)
      .single();

    if (!org) return { success: false, error: `Org '${orgSlug}' não encontrada.` };

    const { data, error } = await db
      .from('categorias')
      .select('*')
      .eq('organization_id', org.id)
      .order('nome_global');

    if (error) return { success: false, error: error.message };
    return { success: true, data: data ?? [] };
  } catch (err) {
    return { success: false, error: (err as Error).message };
  }
}
