'use server';

import { createAdminClient } from '@/lib/supabase';
import type { ActionResult, Transacao } from '@/types/database';

export type CreateTransactionInput = {
  valor: number;
  data_gasto: string;       // 'YYYY-MM-DD'
  categoria_id?: number;
  descricao?: string;
  // --- Temporário para testes sem auth ---
  // Substitua pelos valores reais vindos da sessão após implementar Auth
  _test_org_slug?: string;  // ex: 'elorza'
  _test_user_id?: string;   // UUID do usuário de teste no Supabase
};

export async function createTransaction(
  input: CreateTransactionInput
): Promise<ActionResult<Transacao>> {
  try {
    const db = createAdminClient();

    // Resolve org_id pelo slug (para teste, default = 'elorza')
    const orgSlug = input._test_org_slug ?? 'elorza';
    const { data: org, error: orgErr } = await db
      .from('organizations')
      .select('id')
      .eq('slug', orgSlug)
      .single();

    if (orgErr || !org) {
      return { success: false, error: `Organização '${orgSlug}' não encontrada.` };
    }

    if (!input._test_user_id) {
      return { success: false, error: 'user_id de teste não fornecido. Veja TODO no código.' };
    }

    const payload = {
      organization_id: org.id,
      usuario_id: input._test_user_id,
      valor: input.valor,
      data_gasto: input.data_gasto,
      categoria_id: input.categoria_id ?? null,
      descricao: input.descricao ?? null,
      status: 'aprovado' as const,
    };

    const { data, error } = await db
      .from('transacoes')
      .insert(payload)
      .select()
      .single();

    if (error) return { success: false, error: error.message };
    return { success: true, data };

  } catch (err) {
    return { success: false, error: (err as Error).message };
  }
}

export async function getTransactions(
  orgId: string,
  limit = 30
): Promise<ActionResult<Transacao[]>> {
  try {
    const db = createAdminClient();

    const { data, error } = await db
      .from('transacoes')
      .select('*, categorias(nome_especifico, nome_global)')
      .eq('organization_id', orgId)
      .order('data_gasto', { ascending: false })
      .limit(limit);

    if (error) return { success: false, error: error.message };
    return { success: true, data: data ?? [] };

  } catch (err) {
    return { success: false, error: (err as Error).message };
  }
}

export async function createPedidoAlteracao(input: {
  transacao_id: string;
  tipo: 'EDIT' | 'DELETION';
  mensagem?: string;
  dados_novos?: Record<string, unknown>;
  organization_id: string;
  usuario_id: string;
}): Promise<ActionResult<null>> {
  try {
    const db = createAdminClient();

    const { error } = await db.from('pedidos_alteracao').insert({
      transacao_id: input.transacao_id,
      organization_id: input.organization_id,
      usuario_id: input.usuario_id,
      tipo: input.tipo,
      mensagem: input.mensagem ?? null,
      dados_novos: input.dados_novos ?? null,
      status: 'pendente',
    });

    if (error) return { success: false, error: error.message };
    return { success: true, data: null };

  } catch (err) {
    return { success: false, error: (err as Error).message };
  }
}
