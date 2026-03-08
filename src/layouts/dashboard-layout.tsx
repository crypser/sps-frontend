import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { Sidebar } from '../components/layout/sidebar';

export function DashboardLayout() {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div className="min-h-screen bg-surface">
      <Sidebar collapsed={collapsed} onToggle={() => setCollapsed((c) => !c)} />
      <div
        className="transition-all duration-300"
        style={{ paddingLeft: collapsed ? 68 : 240 }}
      >
        <main className="p-8 max-w-[1400px] animate-page-enter">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
