import { Link } from 'wouter';

const Footer = () => {
  return (
    <footer className="bg-neutral-900 text-white pt-16 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Company Info */}
          <div>
            <div className="flex items-center space-x-2 mb-6">
              <div className="w-10 h-10 bg-gradient-to-r from-primary to-accent rounded-lg flex items-center justify-center text-white font-bold">
                <span className="text-xl">N</span>
              </div>
              <span className="text-xl font-bold">NepalAI</span>
            </div>
            <p className="text-neutral-400 mb-6">
              Pioneering AI solutions from Kathmandu to global markets, helping businesses transform through cutting-edge technology.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-neutral-400 hover:text-white transition-colors">
                <i className="fab fa-facebook-f"></i>
              </a>
              <a href="#" className="text-neutral-400 hover:text-white transition-colors">
                <i className="fab fa-twitter"></i>
              </a>
              <a href="#" className="text-neutral-400 hover:text-white transition-colors">
                <i className="fab fa-linkedin-in"></i>
              </a>
              <a href="#" className="text-neutral-400 hover:text-white transition-colors">
                <i className="fab fa-instagram"></i>
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
              <li><Link href="/services/1" className="text-neutral-400 hover:text-white transition-colors">AI Automation</Link></li>
              <li><Link href="/services/2" className="text-neutral-400 hover:text-white transition-colors">AI Software Development</Link></li>
              <li><Link href="/services/3" className="text-neutral-400 hover:text-white transition-colors">AI Consulting</Link></li>
              <li><Link href="/solutions/1" className="text-neutral-400 hover:text-white transition-colors">Enterprise AI Solutions</Link></li>
              <li><Link href="/solutions/2" className="text-neutral-400 hover:text-white transition-colors">Custom AI Implementation</Link></li>
              <li><Link href="/solutions/3" className="text-neutral-400 hover:text-white transition-colors">AI Strategy Development</Link></li>
            </ul>
          </div>
          
          {/* Newsletter */}
          <div>
            <h3 className="text-lg font-semibold mb-6">Subscribe to Newsletter</h3>
            <p className="text-neutral-400 mb-4">
              Stay updated with the latest in AI technology and our services
            </p>
            <form className="flex mb-4">
              <input 
                type="email" 
                placeholder="Your email address" 
                className="bg-neutral-800 border border-neutral-700 rounded-l-lg py-2 px-4 flex-grow focus:outline-none focus:ring-1 focus:ring-primary"
              />
              <button type="submit" className="bg-primary hover:bg-primary-dark px-4 rounded-r-lg transition-colors duration-300">
                <i className="fas fa-arrow-right"></i>
              </button>
            </form>
            <p className="text-neutral-500 text-sm">
              By subscribing, you agree to our Privacy Policy and consent to receive updates from our company.
            </p>
          </div>
        </div>
        
        <div className="border-t border-neutral-800 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="text-neutral-500 text-sm mb-4 md:mb-0">
              © {new Date().getFullYear()} NepalAI. All rights reserved.
            </div>
            <div className="flex space-x-6">
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
