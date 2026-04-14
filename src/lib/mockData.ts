export type Organization = 'elorza' | 'rolim' | 'firma';

export interface ChangeRequest {
  id: number;
  type: 'DELETION' | 'EDIT';
  desc: string;
  time: string;
  org: Organization;
}

export interface DailyExpensePoint { date: string; Gastos: number; }
export interface CategoryPoint { name: string; value: number; }
export interface KpiData { total: string; pending: number; biggest: string; }

// ── Change Requests ──────────────────────────────────────────────────────────
export const MOCK_REQUESTS: Record<Organization, ChangeRequest[]> = {
  elorza: [
    { id: 101, type: 'DELETION', desc: 'Usuário quer DELETAR "Assaí Atacadista" (R$ 150,00).', time: 'Hoje, 10:35', org: 'elorza' },
    { id: 102, type: 'EDIT',     desc: 'Usuário quer ALTERAR R$ 45,90 → R$ 40,00 em "Remédio Pressão".', time: 'Hoje, 09:15', org: 'elorza' },
  ],
  rolim: [
    { id: 201, type: 'EDIT', desc: 'Usuário quer ALTERAR categoria de "Cinema" para "Lazer".', time: 'Ontem, 20:10', org: 'rolim' },
  ],
  firma: [
    { id: 301, type: 'DELETION', desc: 'Usuário quer DELETAR "Nota Fiscal #4412" (R$ 1.200,00).', time: 'Hoje, 08:00', org: 'firma' },
    { id: 302, type: 'EDIT',     desc: 'Usuário quer ALTERAR "Material de Escritório" de R$ 300 → R$ 280.', time: 'Hoje, 07:30', org: 'firma' },
    { id: 303, type: 'EDIT',     desc: 'Categoria incorreta em "Combustível Entrega".', time: 'Ontem, 18:00', org: 'firma' },
  ],
};

// ── Daily Expenses Charts ────────────────────────────────────────────────────
export const MOCK_DAILY: Record<Organization, DailyExpensePoint[]> = {
  elorza: [
    { date: '08 Abr', Gastos: 120 }, { date: '09 Abr', Gastos: 45 },
    { date: '10 Abr', Gastos: 210 }, { date: '11 Abr', Gastos: 80 },
    { date: '12 Abr', Gastos: 400 }, { date: '13 Abr', Gastos: 150 },
    { date: '14 Abr', Gastos: 30  },
  ],
  rolim: [
    { date: '08 Abr', Gastos: 60  }, { date: '09 Abr', Gastos: 200 },
    { date: '10 Abr', Gastos: 90  }, { date: '11 Abr', Gastos: 310 },
    { date: '12 Abr', Gastos: 140 }, { date: '13 Abr', Gastos: 75  },
    { date: '14 Abr', Gastos: 50  },
  ],
  firma: [
    { date: '08 Abr', Gastos: 1200 }, { date: '09 Abr', Gastos: 850 },
    { date: '10 Abr', Gastos: 2100 }, { date: '11 Abr', Gastos: 600 },
    { date: '12 Abr', Gastos: 3400 }, { date: '13 Abr', Gastos: 900 },
    { date: '14 Abr', Gastos: 500  },
  ],
};

// ── Category Distribution ────────────────────────────────────────────────────
export const MOCK_CATEGORIES: Record<Organization, CategoryPoint[]> = {
  elorza: [
    { name: 'Alimentação', value: 850 }, { name: 'Saúde', value: 1200 },
    { name: 'Transporte', value: 320  }, { name: 'Casa', value: 1800  },
    { name: 'Lazer', value: 450       },
  ],
  rolim: [
    { name: 'Alimentação', value: 600 }, { name: 'Saúde', value: 400 },
    { name: 'Transporte', value: 150  }, { name: 'Lazer', value: 250 },
  ],
  firma: [
    { name: 'Fornecedores', value: 9000 }, { name: 'RH', value: 6000 },
    { name: 'Logística', value: 2500    }, { name: 'Marketing', value: 1800 },
    { name: 'Infra', value: 1200        },
  ],
};

// ── KPIs ─────────────────────────────────────────────────────────────────────
export const MOCK_KPI: Record<Organization, KpiData> = {
  elorza: { total: 'R$ 4.620,50', pending: 2, biggest: 'R$ 400,00' },
  rolim:  { total: 'R$ 2.100,00', pending: 1, biggest: 'R$ 310,00' },
  firma:  { total: 'R$ 18.500,00', pending: 3, biggest: 'R$ 3.400,00' },
};
