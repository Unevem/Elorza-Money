export default function UserLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="w-full max-w-md mx-auto min-h-screen relative px-5 py-8 shadow-sm bg-white">
      {children}
    </main>
  );
}
