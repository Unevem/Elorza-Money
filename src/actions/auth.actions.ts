'use server';

import { createAdminClient } from '@/lib/supabase';
import type { ActionResult, OrgSlug, Organization } from '@/types/database';

export interface UserOrgAccess {
  org: Organization;
  role: 'user' | 'admin' | 'super_admin';
}

/**
 * Retorna todas as organizações que um usuário tem acesso.
 * Usado após o login para montar o switcher de orgs.
 */
export async function getUserOrganizations(
  userId: string
): Promise<ActionResult<UserOrgAccess[]>> {
  try {
    const db = createAdminClient();

    const { data, error } = await db
      .from('perfil_organizacoes')
      .select('role, organizations(id, slug, nome, criado_em)')
      .eq('perfil_id', userId);

    if (error) return { success: false, error: error.message };

    const result: UserOrgAccess[] = (data ?? [])
      .filter((row: any) => row.organizations)
      .map((row: any) => ({
        org: row.organizations as Organization,
        role: row.role,
      }));

    return { success: true, data: result };
  } catch (err) {
    return { success: false, error: (err as Error).message };
  }
}

/**
 * Retorna o perfil completo do usuário logado.
 */
export async function getUserProfile(
  userId: string
): Promise<ActionResult<{ nome: string | null; email: string; role: string }>> {
  try {
    const db = createAdminClient();

    const { data, error } = await db
      .from('perfis')
      .select('nome, email, role')
      .eq('id', userId)
      .single();

    if (error) return { success: false, error: error.message };
    return { success: true, data };
  } catch (err) {
    return { success: false, error: (err as Error).message };
  }
}
