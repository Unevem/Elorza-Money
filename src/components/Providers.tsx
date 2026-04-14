"use client";
import { OrganizationProvider } from '@/context/OrganizationContext';

export function Providers({ children }: { children: React.ReactNode }) {
  return <OrganizationProvider>{children}</OrganizationProvider>;
}
