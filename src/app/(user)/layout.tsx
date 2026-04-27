import { Header } from '@/components/Header';

export default function UserLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="w-full min-h-screen flex flex-col bg-gray-50">
      <Header />
      <main className="w-full max-w-md mx-auto relative px-5 py-8 shadow-sm bg-white flex-1">
        {children}
      </main>
    </div>
  );
}
