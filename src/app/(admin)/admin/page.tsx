"use client";

import { useOrganization } from '@/hooks/useOrganization';
import { AdminSidebar } from '@/components/admin/AdminSidebar';
import { AdminMetrics } from '@/components/admin/AdminMetrics';
import { AdminTables } from '@/components/admin/AdminTables';

export default function AdminDashboard() {
  const { currentOrg, setCurrentOrg } = useOrganization();

  return (
    <div className="flex h-screen w-full overflow-hidden bg-gray-50 text-sm">
      <AdminSidebar currentOrg={currentOrg} onOrgChange={setCurrentOrg} />

      <div className="flex-1 flex overflow-hidden min-w-0">
        {/* Main content */}
        <main className="flex-1 overflow-y-auto p-6 min-w-0">
          <AdminMetrics org={currentOrg} />
        </main>

        {/* Right panel */}
        <aside className="w-[380px] flex-shrink-0 bg-white border-l border-gray-200 overflow-hidden flex flex-col hidden xl:flex shadow-sm">
          <AdminTables org={currentOrg} />
        </aside>
      </div>
    </div>
  );
}
