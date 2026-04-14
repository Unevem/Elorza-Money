import type { Metadata } from 'next';
import './globals.css';
import { ToasterProvider } from '@/components/ui/ToasterProvider';

export const metadata: Metadata = {
  title: 'Elorza Money',
  description: 'Controle financeiro simplificado',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR">
      <body className="antialiased font-sans flex min-h-screen w-full">
        <ToasterProvider />
        {children}
      </body>
    </html>
  );
}
