// Database Types — gerados manualmente do schema SQL
// (No futuro: substituir por `supabase gen types typescript`)

export type OrgSlug = 'elorza' | 'rolim' | 'firma';

export interface Organization {
  id: string;
  slug: OrgSlug;
  nome: string;
  criado_em: string;
}

export interface Perfil {
  id: string;
  email: string;
  nome: string | null;
  role: 'admin' | 'user' | 'super_admin';
  organization_id: string; // org principal/padrão
  criado_em: string;
}

export interface PerfilOrganizacao {
  id: string;
  perfil_id: string;
  organization_id: string;
  role: 'admin' | 'user' | 'super_admin';
  criado_em: string;
  // relação incluída via join:
  organizations?: Organization;
}

export interface Categoria {
  id: number;
  organization_id: string;
  nome_especifico: string;
  nome_global: string;
  criado_em: string;
}

export interface Transacao {
  id: string;
  organization_id: string;
  usuario_id: string;
  valor: number;
  data_gasto: string;
  categoria_id: number | null;
  descricao: string | null;
  status: 'aprovado' | 'rejeitado';
  criado_em: string;
}

export interface PedidoAlteracao {
  id: string;
  organization_id: string;
  transacao_id: string | null;
  usuario_id: string;
  tipo: 'EDIT' | 'DELETION' | 'SUGGESTION';
  dados_novos: Record<string, unknown> | null;
  mensagem: string | null;
  status: 'pendente' | 'aprovado' | 'rejeitado';
  resolvido_em: string | null;
  criado_em: string;
}

export type ActionResult<T = null> =
  | { success: true; data: T }
  | { success: false; error: string };
