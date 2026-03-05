import { Outlet } from 'react-router-dom';
import { Sidebar } from './Sidebar';

export function DashboardLayout() {
  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar />
      
      {/* Main Content Area */}
      <div className="flex-1 md:ml-64">
        <main className="p-6 md:p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
