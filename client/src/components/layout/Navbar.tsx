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

// Add types for service and solution
type Service = {
  id: string;
  title: string;
  // ... other fields if needed
};

type Solution = {
  id: string;
  title: string;
  // ... other fields if needed
};

type DropdownItem = {
  label: string;
  href: string;
};

type NavItemProps = {
  label: string;
  href: string;
  items?: DropdownItem[];
};

const NavItem = ({ label, href, items }: NavItemProps) => {
  const [location] = useLocation();
  const isActive = location === href || (items && items.some(item => location === item.href));

  if (items) {
    return (
      <div className="group relative">
        <Link 
          href={href}
          className={`font-medium flex items-center gap-1 transition-colors ${isActive ? 'text-primary' : 'text-neutral-800 hover:text-primary'}`}
        >
          {label}
          <ChevronDown className="h-4 w-4" />
        </Link>
        <div className="absolute left-0 top-full hidden group-hover:block w-48 bg-white shadow-lg rounded-md py-2">
          {items.map((item) => (
            <Link 
              key={item.href} 
              href={item.href}
              className="block px-4 py-2 text-sm text-neutral-800 hover:bg-neutral-100 hover:text-primary"
            >
              {item.label}
            </Link>
          ))}
        </div>
      </div>
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
  
  // Fetch services and solutions for the dropdowns with proper types
  const { data: services = [] } = useQuery<Service[]>({
    queryKey: ["/api/services"],
  });
  
  const { data: solutions = [] } = useQuery<Solution[]>({
    queryKey: ["/api/solutions"],
  });

  // Transform services and solutions into dropdown items using their titles
  const serviceItems: DropdownItem[] = services.map((service: Service) => ({
    label: service.title,
    href: `/services/${service.id}`
  }));

  const solutionItems: DropdownItem[] = solutions.map((solution: Solution) => ({
    label: solution.title,
    href: `/solutions/${solution.id}`
  }));

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
              <img 
                src="/assets/logo.png" 
                alt="GD AI Synergy Logo" 
                className="h-10 w-auto rounded-lg"
              />
              <span className="text-xl font-bold text-primary">GD AI Synergy</span>
            </Link>
          </div>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <NavItem label="Home" href="/" />
            <NavItem 
              label="Services" 
              href="/services" 
              items={serviceItems}
            />
            <NavItem 
              label="Solutions" 
              href="/solutions" 
              items={solutionItems}
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
            
            {/* Services Dropdown */}
            <div className="py-2">
              <div className="font-medium text-neutral-800 mb-2">Services</div>
              <div className="pl-4 space-y-2">
                {serviceItems.map((item: DropdownItem) => (
                  <Link 
                    key={item.href}
                    href={item.href}
                    className="block py-1 text-neutral-600 hover:text-primary"
                  >
                    {item.label}
                  </Link>
                ))}
              </div>
            </div>
            
            {/* Solutions Dropdown */}
            <div className="py-2">
              <div className="font-medium text-neutral-800 mb-2">Solutions</div>
              <div className="pl-4 space-y-2">
                {solutionItems.map((item: DropdownItem) => (
                  <Link 
                    key={item.href}
                    href={item.href}
                    className="block py-1 text-neutral-600 hover:text-primary"
                  >
                    {item.label}
                  </Link>
                ))}
              </div>
            </div>
            
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
