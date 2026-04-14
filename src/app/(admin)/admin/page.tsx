import { AdminSidebar } from '@/components/admin/AdminSidebar';
import { AdminMetrics } from '@/components/admin/AdminMetrics';
import { AdminTables } from '@/components/admin/AdminTables';

export default function AdminDashboard() {
  return (
    <div className="flex h-screen w-full max-w-[1600px] mx-auto overflow-hidden bg-gray-50 text-sm">
      <AdminSidebar />
      <div className="flex-1 flex overflow-hidden">
        <main className="flex-1 overflow-y-auto p-8 relative">
          <AdminMetrics />
        </main>
        <aside className="w-[420px] bg-white border-l border-gray-200 overflow-y-auto hidden xl:block shadow-sm z-10 relative">
          <AdminTables />
        </aside>
      </div>
    </div>
  );
}
