import { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { useAuth } from "@/hooks/use-auth";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { 
  Menu,
  UserCircle,
  ChevronDown,
  LogOut,
  Settings
} from "lucide-react";
import { useQuery } from "@tanstack/react-query";

type NavItemProps = {
  label: string;
  href: string;
  items?: { label: string; href: string }[];
};

const NavItem = ({ label, href, items }: NavItemProps) => {
  const [location] = useLocation();
  const isActive = location === href || (items && items.some(item => location === item.href));

  if (items) {
    return (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <button className={`font-medium flex items-center gap-1 transition-colors ${isActive ? 'text-primary' : 'text-neutral-800 hover:text-primary'}`}>
            {label}
            <ChevronDown className="h-4 w-4" />
          </button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          {items.map((item) => (
            <DropdownMenuItem key={item.href} asChild>
              <Link href={item.href} className="w-full">
                {item.label}
              </Link>
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    );
  }

  return (
    <Link 
      href={href}
      className={`relative font-medium transition-colors after:absolute after:bottom-[-4px] after:left-0 after:h-[2px] after:bg-accent after:transition-all after:duration-300 ${
        isActive 
          ? 'text-primary after:w-full' 
          : 'text-neutral-800 hover:text-primary after:w-0 hover:after:w-full'
      }`}
    >
      {label}
    </Link>
  );
};

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { user, logoutMutation } = useAuth();
  
  // Get services list for the dropdown
  const { data: services } = useQuery({
    queryKey: ["/api/services"],
    enabled: false, // Only load on demand
  });
  
  // Get solutions list for the dropdown
  const { data: solutions } = useQuery({
    queryKey: ["/api/solutions"],
    enabled: false, // Only load on demand
  });

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav className={`fixed w-full z-50 transition-all duration-300 ${
      isScrolled ? 'bg-white/90 backdrop-blur-md shadow-sm' : 'bg-transparent'
    }`}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          {/* Logo */}
          <div className="flex items-center">
            <Link href="/" className="flex items-center space-x-2">
              <div className="w-10 h-10 bg-gradient-to-r from-primary to-accent rounded-lg flex items-center justify-center text-white font-bold">
                <span className="text-xl">N</span>
              </div>
              <span className="text-xl font-bold text-primary">NepalAI</span>
            </Link>
          </div>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <NavItem label="Home" href="/" />
            <NavItem 
              label="Services" 
              href="/services" 
              items={[
                { label: "AI Automation Agency", href: "/services/1" },
                { label: "AI Software Development", href: "/services/2" },
                { label: "AI Consulting", href: "/services/3" },
                { label: "Custom AI Solutions", href: "/services/4" },
              ]}
            />
            <NavItem 
              label="Solutions" 
              href="/solutions" 
              items={[
                { label: "Enterprise AI", href: "/solutions/1" },
                { label: "Healthcare AI", href: "/solutions/2" },
                { label: "Retail AI Solutions", href: "/solutions/3" },
                { label: "Financial AI", href: "/solutions/4" },
              ]}
            />
            <NavItem 
              label="Resources" 
              href="/resources" 
              items={[
                { label: "Blogs", href: "/resources/blog" },
                { label: "News", href: "/resources/news" },
                { label: "Portfolios", href: "/resources/portfolio" },
                { label: "Case Studies", href: "/resources/case-study" },
              ]}
            />
            <NavItem label="About Us" href="/about" />
            <NavItem label="Contact" href="/contact" />
          </div>
          
          {/* CTA Button / User Menu */}
          <div className="hidden md:block">
            {user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" className="flex items-center gap-2">
                    <UserCircle className="h-5 w-5" />
                    {user.username}
                    <ChevronDown className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  {user.isAdmin && (
                    <DropdownMenuItem asChild>
                      <Link href="/admin/dashboard" className="w-full">
                        Admin Dashboard
                      </Link>
                    </DropdownMenuItem>
                  )}
                  <DropdownMenuItem asChild>
                    <button 
                      className="w-full flex items-center" 
                      onClick={() => logoutMutation.mutate()}
                    >
                      <LogOut className="mr-2 h-4 w-4" />
                      Log out
                    </button>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <div className="flex items-center gap-2">
                <Link href="/lets-discuss">
                  <Button className="bg-primary hover:bg-primary-dark text-white">
                    Let's Discuss
                  </Button>
                </Link>
                <Link href="/auth">
                  <Button variant="outline">
                    Login
                  </Button>
                </Link>
              </div>
            )}
          </div>
          
          {/* Mobile Menu Button */}
          <button 
            className="md:hidden text-neutral-800"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <Menu className="h-6 w-6" />
          </button>
        </div>
      </div>
      
      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden bg-white border-t border-neutral-200">
          <div className="py-2 px-4 space-y-3">
            <Link href="/" className="block py-2 text-neutral-800 font-medium">Home</Link>
            <Link href="/services" className="block py-2 text-neutral-800 font-medium">Services</Link>
            <Link href="/solutions" className="block py-2 text-neutral-800 font-medium">Solutions</Link>
            <Link href="/resources" className="block py-2 text-neutral-800 font-medium">Resources</Link>
            <Link href="/about" className="block py-2 text-neutral-800 font-medium">About Us</Link>
            <Link href="/contact" className="block py-2 text-neutral-800 font-medium">Contact</Link>
            
            {user ? (
              <div className="space-y-2 pt-2 border-t border-gray-100">
                {user.isAdmin && (
                  <Link href="/admin/dashboard" className="block py-2 text-neutral-800 font-medium">
                    Admin Dashboard
                  </Link>
                )}
                <button 
                  className="block w-full text-left py-2 text-neutral-800 font-medium"
                  onClick={() => logoutMutation.mutate()}
                >
                  Log out
                </button>
              </div>
            ) : (
              <>
                <Link 
                  href="/lets-discuss" 
                  className="block w-full text-center bg-primary text-white font-medium py-2 px-4 rounded-full mt-4"
                >
                  Let's Discuss
                </Link>
                <Link 
                  href="/auth" 
                  className="block w-full text-center bg-white border border-neutral-300 text-neutral-800 font-medium py-2 px-4 rounded-full mt-2"
                >
                  Login
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
