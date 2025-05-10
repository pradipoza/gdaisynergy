import { useState, ReactNode } from 'react';
import { Link, useLocation } from 'wouter';
import { useAuth } from '@/hooks/use-auth';
import { 
  LayoutDashboard, 
  Layers, 
  Lightbulb, 
  FileText, 
  MessageSquare,
  Info, 
  Settings, 
  Menu, 
  X, 
  LogOut, 
  Home 
} from 'lucide-react';
import { Button } from '@/components/ui/button';

type SidebarItem = {
  label: string;
  href: string;
  icon: React.ReactNode;
};

type AdminLayoutProps = {
  children: ReactNode;
  title: string;
};

const AdminLayout = ({ children, title }: AdminLayoutProps) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [location] = useLocation();
  const { logoutMutation } = useAuth();

  const sidebarItems: SidebarItem[] = [
    { label: 'Dashboard', href: '/admin/dashboard', icon: <LayoutDashboard className="w-5 h-5" /> },
    { label: 'Services', href: '/admin/services', icon: <Layers className="w-5 h-5" /> },
    { label: 'Solutions', href: '/admin/solutions', icon: <Lightbulb className="w-5 h-5" /> },
    { label: 'Resources', href: '/admin/resources', icon: <FileText className="w-5 h-5" /> },
    { label: 'Messages', href: '/admin/messages', icon: <MessageSquare className="w-5 h-5" /> },
    { label: 'Company Info', href: '/admin/info', icon: <Info className="w-5 h-5" /> },
    { label: 'Settings', href: '/admin/settings', icon: <Settings className="w-5 h-5" /> },
  ];

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div 
        className={`${
          isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
        } fixed inset-y-0 left-0 z-50 w-64 bg-sidebar border-r border-sidebar-border transform transition-transform duration-300 lg:translate-x-0 lg:static`}
      >
        <div className="flex flex-col h-full">
          {/* Sidebar Header */}
          <div className="flex items-center justify-between px-6 py-4 border-b border-sidebar-border">
            <Link href="/admin/dashboard" className="flex items-center">
              <div className="w-8 h-8 bg-gradient-to-r from-primary to-accent rounded-lg flex items-center justify-center text-white font-bold">
                <span className="text-sm">N</span>
              </div>
              <span className="ml-2 font-bold text-white">NepalAI Admin</span>
            </Link>
            <button 
              onClick={() => setIsSidebarOpen(false)} 
              className="lg:hidden text-sidebar-foreground hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
          
          {/* Navigation */}
          <nav className="flex-1 py-6 px-4 overflow-y-auto">
            <ul className="space-y-1">
              {sidebarItems.map((item) => (
                <li key={item.href}>
                  <Link href={item.href}>
                    <a
                      className={`flex items-center px-4 py-2.5 rounded-md group transition-colors ${
                        location === item.href
                          ? 'bg-sidebar-accent text-sidebar-accent-foreground'
                          : 'text-sidebar-foreground hover:bg-sidebar-accent/50 hover:text-sidebar-accent-foreground'
                      }`}
                    >
                      {item.icon}
                      <span className="ml-3">{item.label}</span>
                    </a>
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
          
          {/* Sidebar Footer */}
          <div className="p-4 border-t border-sidebar-border">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <Link href="/" className="flex items-center px-4 py-2 text-sidebar-foreground hover:text-white transition-colors">
                  <Home className="w-5 h-5 mr-2" />
                  View Site
                </Link>
              </div>
              <button 
                onClick={() => logoutMutation.mutate()} 
                className="flex items-center px-4 py-2 text-sidebar-foreground hover:text-white transition-colors"
              >
                <LogOut className="w-5 h-5 mr-2" /> 
                Logout
              </button>
            </div>
          </div>
        </div>
      </div>
      
      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="bg-white shadow-md z-10">
          <div className="flex items-center justify-between px-6 py-4">
            <div className="flex items-center">
              <button 
                onClick={() => setIsSidebarOpen(true)} 
                className="text-gray-500 lg:hidden"
              >
                <Menu className="w-6 h-6" />
              </button>
              <h1 className="ml-4 lg:ml-0 text-xl font-semibold text-gray-800">{title}</h1>
            </div>
          </div>
        </header>
        
        {/* Content */}
        <main className="flex-1 overflow-y-auto p-6">
          {children}
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
