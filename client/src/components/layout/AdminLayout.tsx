import { useState, ReactNode, useEffect } from 'react';
import { Link, useLocation, useRoute } from 'wouter';
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
  Home,
  User
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { useToast } from '@/hooks/use-toast';

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
  const [location, navigate] = useLocation();
  const { user, logoutMutation } = useAuth();
  const { toast } = useToast();
  
  // Redirect non-admins to home page
  useEffect(() => {
    if (user && !user.isAdmin) {
      toast({
        title: "Access Denied",
        description: "You don't have permission to access the admin area.",
        variant: "destructive"
      });
      navigate("/");
    } else if (!user) {
      navigate("/auth");
    }
  }, [user, navigate, toast]);

  const sidebarItems: SidebarItem[] = [
    { label: 'Dashboard', href: '/admin/dashboard', icon: <LayoutDashboard className="w-5 h-5" /> },
    { label: 'Services', href: '/admin/services', icon: <Layers className="w-5 h-5" /> },
    { label: 'Solutions', href: '/admin/solutions', icon: <Lightbulb className="w-5 h-5" /> },
    { label: 'Resources', href: '/admin/resources', icon: <FileText className="w-5 h-5" /> },
    { label: 'Messages', href: '/admin/messages', icon: <MessageSquare className="w-5 h-5" /> },
    { label: 'Company Info', href: '/admin/info', icon: <Info className="w-5 h-5" /> },
    { label: 'Users', href: '/admin/users', icon: <User className="w-5 h-5" /> },
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
              <img 
                src="/assets/logo.png" 
                alt="GD AI Synergy Logo" 
                className="h-8 w-auto rounded-lg"
              />
              <span className="ml-2 font-bold text-white">GD AI Synergy Admin</span>
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
                    <div
                      className={`flex items-center px-4 py-2.5 rounded-md group transition-colors cursor-pointer ${
                        location === item.href
                          ? 'bg-sidebar-accent text-sidebar-accent-foreground'
                          : 'text-sidebar-foreground hover:bg-sidebar-accent/50 hover:text-sidebar-accent-foreground'
                      }`}
                    >
                      {item.icon}
                      <span className="ml-3">{item.label}</span>
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
          
          {/* Sidebar Footer */}
          <div className="p-4 border-t border-sidebar-border">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <Link href="/">
                  <div className="flex items-center px-4 py-2 text-sidebar-foreground hover:text-white transition-colors cursor-pointer">
                    <Home className="w-5 h-5 mr-2" />
                    View Site
                  </div>
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
            
            {/* User Profile */}
            {user && (
              <div className="flex items-center space-x-4">
                <div className="text-right hidden md:block">
                  <p className="text-sm font-medium text-gray-700">{user.username}</p>
                  <p className="text-xs text-gray-500">{user.email || 'No email set'}</p>
                </div>
                <Avatar className="h-10 w-10 bg-primary text-white">
                  <AvatarFallback>
                    {user.username.substring(0, 2).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
              </div>
            )}
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
