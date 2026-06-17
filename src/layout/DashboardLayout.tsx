import React from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Package, 
  ShoppingCart, 
  Users, 
  LogOut,
  Menu,
  Bell
} from 'lucide-react';
import { useAuth } from '../hooks/useAuth';

const SidebarLink = ({ to, icon: Icon, children }: { to: string; icon: any; children: React.ReactNode }) => (
  <NavLink
    to={to}
    className={({ isActive }) =>
      `flex items-center gap-3 px-4 py-3 text-sm font-medium transition-colors ${
        isActive 
          ? 'bg-primary/10 text-primary border-r-2 border-primary' 
          : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
      }`
    }
  >
    <Icon size={18} />
    {children}
  </NavLink>
);

export const DashboardLayout = () => {
  const { user, logout } = useAuth();

  return (
    <div className="flex min-h-screen bg-white">
      {/* Sidebar */}
      <aside className="w-64 border-r border-gray-100 flex flex-col fixed h-full bg-white z-20">
        <div className="p-6">
          <h1 className="text-xl font-bold tracking-tight text-primary">EXECUTIVE</h1>
          <p className="text-[10px] uppercase tracking-[0.2em] text-gray-400 mt-1">Admin Dashboard</p>
        </div>

        <nav className="flex-1 mt-4">
          <SidebarLink to="/" icon={LayoutDashboard}>Dashboard</SidebarLink>
          <SidebarLink to="/products" icon={Package}>Products</SidebarLink>
          <SidebarLink to="/orders" icon={ShoppingCart}>Orders</SidebarLink>
          <SidebarLink to="/users" icon={Users}>Users</SidebarLink>
        </nav>

        <div className="p-4 border-t border-gray-50">
          <button 
            onClick={logout}
            className="flex items-center gap-3 px-4 py-3 text-sm font-medium text-gray-600 hover:text-red-600 transition-colors w-full"
          >
            <LogOut size={18} />
            Sign Out
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 ml-64">
        {/* TopNav */}
        <header className="h-16 border-b border-gray-100 flex items-center justify-between px-8 sticky top-0 bg-white/80 backdrop-blur-md z-10">
          <div className="flex items-center gap-4">
            <button className="text-gray-400 hover:text-gray-600">
              <Menu size={20} />
            </button>
            <h2 className="text-sm font-semibold text-gray-700">Overview</h2>
          </div>

          <div className="flex items-center gap-6">
            <button className="text-gray-400 hover:text-gray-600 relative">
              <Bell size={20} />
              <span className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
            </button>
            
            <div className="flex items-center gap-3 pl-6 border-l border-gray-100">
              <div className="text-right">
                <p className="text-sm font-medium text-gray-900">{user?.first_name} {user?.last_name}</p>
                <p className="text-xs text-gray-500 capitalize">{user?.role}</p>
              </div>
              <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-xs">
                {user?.first_name?.[0]}{user?.last_name?.[0]}
              </div>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <div className="p-8">
          <Outlet />
        </div>
      </main>
    </div>
  );
};
