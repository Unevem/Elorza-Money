"use client";
import { useState } from 'react';
import type { Organization } from '@/lib/mockData';

export const ORG_LIST: { id: Organization; label: string; color: string }[] = [
  { id: 'elorza', label: 'Elorza',  color: 'bg-blue-600'  },
  { id: 'rolim',  label: 'Rolim',   color: 'bg-violet-600' },
  { id: 'firma',  label: 'Firma',   color: 'bg-emerald-600' },
];

export function useOrganization() {
  const [currentOrg, setCurrentOrg] = useState<Organization>('elorza');
  return { currentOrg, setCurrentOrg, orgs: ORG_LIST };
}
