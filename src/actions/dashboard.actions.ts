'use server';

import { createAdminClient } from '@/lib/supabase';
import type { ActionResult, OrgSlug } from '@/types/database';

export interface DailyPoint  { date: string; Gastos: number; }
export interface CategoryPoint { name: string; value: number; }
export interface KpiData { total: number; pedidos_pendentes: number; maior_gasto: number; }

export interface DashboardData {
  kpi: KpiData;
  daily: DailyPoint[];
  categories: CategoryPoint[];
}

export interface MonthInfo {
  value: string;
  label: string;
  status: 'complete' | 'incomplete';
}

export async function fetchAvailableMonths(orgSlug: OrgSlug): Promise<ActionResult<MonthInfo[]>> {
  try {
    const db = createAdminClient();
    const { data: org } = await db.from('organizations').select('id').eq('slug', orgSlug).single();
    if (!org) return { success: false, error: 'Org não encontrada.' };

    const { data, error } = await db
      .from('organizacao_meses')
      .select('mes, dias_com_registro')
      .eq('organization_id', org.id)
      .order('mes', { ascending: false });

    if (error) return { success: false, error: error.message };

    const months: MonthInfo[] = (data ?? []).map((row: any) => {
      const [y, m] = row.mes.split('-');
      const date = new Date(parseInt(y), parseInt(m) - 1, 1);
      const label = date.toLocaleDateString('pt-BR', { month: 'short', year: 'numeric' }).replace('.', '');
      return {
        value: row.mes,
        label: label.charAt(0).toUpperCase() + label.slice(1),
        status: (row.dias_com_registro < 10) ? 'incomplete' : 'complete'
      };
    });

    return { success: true, data: months };
  } catch (err) {
    return { success: false, error: (err as Error).message };
  }
}

export async function fetchDashboardData(
  orgSlug: OrgSlug,
  month?: string
): Promise<ActionResult<DashboardData>> {
  try {
    const db = createAdminClient();

    // 1. Resolve organization_id pelo slug
    const { data: org, error: orgErr } = await db
      .from('organizations')
      .select('id')
      .eq('slug', orgSlug)
      .single();

    if (orgErr || !org) return { success: false, error: `Org '${orgSlug}' não encontrada.` };
    const orgId = org.id as string;

    // 2. Filtro de Mês
    let query = db
      .from('transacoes')
      .select('valor, data_gasto, categoria_id, categorias(nome_global)')
      .eq('organization_id', orgId)
      .eq('status', 'aprovado')
      .order('data_gasto', { ascending: true });

    if (month) {
      const [year, m] = month.split('-');
      const startDate = `${year}-${m}-01`;
      const endDate = new Date(parseInt(year), parseInt(m), 0).toISOString().split('T')[0];
      query = query.gte('data_gasto', startDate).lte('data_gasto', endDate);
    } else {
      const now = new Date();
      const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1).toISOString().split('T')[0];
      query = query.gte('data_gasto', startOfMonth);
    }

    const { data: txs, error: txErr } = await query;

    if (txErr) return { success: false, error: txErr.message };

    // 4. Pedidos pendentes de moderação
    const { count: pedidosPendentes } = await db
      .from('pedidos_alteracao')
      .select('id', { count: 'exact', head: true })
      .eq('organization_id', orgId)
      .eq('status', 'pendente');

    // 5. Compute KPI
    const allValues = (txs ?? []).map((t) => t.valor as number);
    const total = allValues.reduce((a, b) => a + b, 0);
    const maiorGasto = allValues.length ? Math.max(...allValues) : 0;

    // 6. Group by date (últimos 7 dias visíveis)
    const dailyMap: Record<string, number> = {};
    (txs ?? []).forEach((t) => {
      const day = (t.data_gasto as string).slice(5); // MM-DD
      dailyMap[day] = (dailyMap[day] ?? 0) + (t.valor as number);
    });
    const daily: DailyPoint[] = Object.entries(dailyMap)
      .slice(-7)
      .map(([date, Gastos]) => ({ date, Gastos }));

    // 7. Group by category
    const catMap: Record<string, number> = {};
    (txs ?? []).forEach((t: any) => {
      const name: string = t.categorias?.nome_global ?? 'Outros';
      catMap[name] = (catMap[name] ?? 0) + (t.valor as number);
    });
    const categories: CategoryPoint[] = Object.entries(catMap)
      .map(([name, value]) => ({ name, value }))
      .sort((a, b) => b.value - a.value);

    return {
      success: true,
      data: {
        kpi: { total, pedidos_pendentes: pedidosPendentes ?? 0, maior_gasto: maiorGasto },
        daily,
        categories,
      },
    };

  } catch (err) {
    return { success: false, error: (err as Error).message };
  }
}

export async function getPedidosPendentes(orgSlug: OrgSlug) {
  try {
    const db = createAdminClient();
    const { data: org } = await db
      .from('organizations').select('id').eq('slug', orgSlug).single();
    if (!org) return { success: false, error: 'Org não encontrada.' };

    const { data, error } = await db
      .from('pedidos_alteracao')
      .select('*, transacoes(valor, descricao, data_gasto)')
      .eq('organization_id', org.id)
      .eq('status', 'pendente')
      .order('criado_em', { ascending: false });

    if (error) return { success: false, error: error.message };
    return { success: true, data: data ?? [] };
  } catch (err) {
    return { success: false, error: (err as Error).message };
  }
}

export async function resolverPedido(
  pedidoId: string,
  acao: 'aprovar' | 'rejeitar'
): Promise<ActionResult<null>> {
  try {
    const db = createAdminClient();
    const fn = acao === 'aprovar' ? 'aprovar_pedido' : 'rejeitar_pedido';
    const { error } = await db.rpc(fn, { pedido_id: pedidoId });
    if (error) return { success: false, error: error.message };
    return { success: true, data: null };
  } catch (err) {
    return { success: false, error: (err as Error).message };
  }
}
