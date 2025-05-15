import { Link } from 'wouter';
import { Facebook, Instagram, Linkedin, Twitter } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import { Service, Solution } from '@shared/schema';

const Footer = () => {
  // Fetch services and solutions for the footer
  const { data: services = [] } = useQuery<Service[]>({
    queryKey: ["/api/services"],
  });
  
  const { data: solutions = [] } = useQuery<Solution[]>({
    queryKey: ["/api/solutions"],
  });

  return (
    <footer className="bg-neutral-900 text-white py-16">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12">
          {/* Company Info */}
          <div className="lg:col-span-2">
            <Link href="/" className="inline-block mb-6">
              <img 
                src="/assets/logo.png" 
                alt="GD AI Synergy Logo" 
                className="h-12 w-auto rounded-lg"
              />
            </Link>
            <p className="text-neutral-400 mb-6">
              Pioneering AI innovation in Nepal with global impact. We combine local talent with international expertise to deliver cutting-edge AI solutions.
            </p>
            <div className="flex flex-wrap gap-3">
              {/* Social Media Links */}
              <a 
                href="https://www.facebook.com/share/198bKBTrCt/" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="group relative w-10 h-10 bg-gradient-to-br from-[#1877F2]/10 to-[#1877F2]/5 rounded-lg flex items-center justify-center backdrop-blur-sm border border-[#1877F2]/20 hover:border-[#1877F2]/40 transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-[#1877F2]/20"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-[#1877F2]/20 to-[#1877F2]/10 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <Facebook className="w-5 h-5 text-[#1877F2] transform group-hover:scale-110 transition-transform relative z-10" />
              </a>
              <a 
                href="https://x.com/GDAisynergy_" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="group relative w-10 h-10 bg-gradient-to-br from-[#1DA1F2]/10 to-[#1DA1F2]/5 rounded-lg flex items-center justify-center backdrop-blur-sm border border-[#1DA1F2]/20 hover:border-[#1DA1F2]/40 transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-[#1DA1F2]/20"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-[#1DA1F2]/20 to-[#1DA1F2]/10 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <Twitter className="w-5 h-5 text-[#1DA1F2] transform group-hover:scale-110 transition-transform relative z-10" />
              </a>
              <a 
                href="https://www.linkedin.com/company/gd-ai-synergy" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="group relative w-10 h-10 bg-gradient-to-br from-[#0A66C2]/10 to-[#0A66C2]/5 rounded-lg flex items-center justify-center backdrop-blur-sm border border-[#0A66C2]/20 hover:border-[#0A66C2]/40 transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-[#0A66C2]/20"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-[#0A66C2]/20 to-[#0A66C2]/10 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <Linkedin className="w-5 h-5 text-[#0A66C2] transform group-hover:scale-110 transition-transform relative z-10" />
              </a>
              <a 
                href="https://www.instagram.com/gdaisynergy_/" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="group relative w-10 h-10 bg-gradient-to-br from-[#E4405F]/10 to-[#E4405F]/5 rounded-lg flex items-center justify-center backdrop-blur-sm border border-[#E4405F]/20 hover:border-[#E4405F]/40 transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-[#E4405F]/20"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-[#E4405F]/20 to-[#E4405F]/10 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <Instagram className="w-5 h-5 text-[#E4405F] transform group-hover:scale-110 transition-transform relative z-10" />
              </a>
            </div>
          </div>
          
          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-6">Quick Links</h3>
            <ul className="space-y-3">
              <li><Link href="/" className="text-neutral-400 hover:text-white transition-colors">Home</Link></li>
              <li><Link href="/services" className="text-neutral-400 hover:text-white transition-colors">Services</Link></li>
              <li><Link href="/solutions" className="text-neutral-400 hover:text-white transition-colors">Solutions</Link></li>
              <li><Link href="/resources" className="text-neutral-400 hover:text-white transition-colors">Resources</Link></li>
              <li><Link href="/about" className="text-neutral-400 hover:text-white transition-colors">About Us</Link></li>
              <li><Link href="/contact" className="text-neutral-400 hover:text-white transition-colors">Contact</Link></li>
            </ul>
          </div>
          
          {/* Services */}
          <div>
            <h3 className="text-lg font-semibold mb-6">Our Services</h3>
            <ul className="space-y-3">
              {services.map((service) => (
                <li key={service.id}>
                  <Link 
                    href={`/services/${service.id}`} 
                    className="text-neutral-400 hover:text-white transition-colors"
                  >
                    {service.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          
          {/* Solutions */}
          <div>
            <h3 className="text-lg font-semibold mb-6">Our Solutions</h3>
            <ul className="space-y-3">
              {solutions.map((solution) => (
                <li key={solution.id}>
                  <Link 
                    href={`/solutions/${solution.id}`} 
                    className="text-neutral-400 hover:text-white transition-colors"
                  >
                    {solution.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold mb-6">Contact Us</h3>
            <div className="text-neutral-400 space-y-3">
              <p>
                <i className="fas fa-map-marker-alt mr-2"></i>
                Kathmandu, Nepal
              </p>
              <p>
                <i className="fas fa-envelope mr-2"></i>
                <a href="mailto:info@gdaisynergy.com" className="hover:text-white transition-colors">
                  info@gdaisynergy.com
                </a>
              </p>
              <p>
                <i className="fas fa-phone mr-2"></i>
                <a href="tel:9779767952043" className="hover:text-white transition-colors">
                  +977 9767952043
                </a>
              </p>
            </div>
          </div>
        </div>

        <div className="border-t border-neutral-800 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="text-center text-sm text-neutral-600">
              © {new Date().getFullYear()} GD AI Synergy. All rights reserved.
            </div>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <a href="#" className="text-neutral-500 text-sm hover:text-white transition-colors">Privacy Policy</a>
              <a href="#" className="text-neutral-500 text-sm hover:text-white transition-colors">Terms of Service</a>
              <a href="#" className="text-neutral-500 text-sm hover:text-white transition-colors">Cookie Policy</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

