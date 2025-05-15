import { Link } from 'wouter';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';

const Hero = () => {
  return (
    <section className="pt-32 pb-24 md:pt-40 md:pb-32 px-4 relative overflow-hidden min-h-[80vh] flex items-center bg-gradient-to-br from-indigo-950 via-purple-950 to-blue-950">
      {/* Animated blurred gradient shapes for depth */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-0 right-0 w-[700px] h-[700px] bg-gradient-to-br from-indigo-800/40 via-purple-800/30 to-pink-800/40 rounded-full blur-[120px] transform translate-x-1/2 -translate-y-1/2 animate-pulse"></div>
        <div className="absolute bottom-0 left-0 w-[700px] h-[700px] bg-gradient-to-tr from-emerald-800/40 via-cyan-800/30 to-blue-800/40 rounded-full blur-[120px] transform -translate-x-1/2 translate-y-1/2 animate-pulse"></div>
        <div className="absolute inset-0 bg-[url('/assets/images/grid.svg')] opacity-10"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/60 to-black/50"></div>
      </div>
      
      {/* Background pattern */}
      <div className="absolute inset-0 z-0 opacity-5">
        <div className="absolute inset-0 bg-gradient-to-r from-primary to-secondary opacity-20"></div>
        <div className="absolute top-0 right-0 w-full h-full bg-[radial-gradient(circle_400px_at_70%_20%,rgba(114,9,183,0.2),transparent)]"></div>
      </div>
      
      <div className="container mx-auto relative z-10">
        <motion.div 
          className="max-w-2xl space-y-8 text-white"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
            Pioneering <span className="bg-clip-text text-transparent bg-gradient-to-r from-accent to-secondary">AI Solutions</span> from Kathmandu to Global Markets
          </h1>
          <p className="text-lg md:text-xl text-white/90 leading-relaxed">
            We transform businesses through cutting-edge AI automation, custom software development, and strategic consulting. Build your future with Nepal's premier AI innovation partner.
          </p>
          <div className="flex flex-wrap gap-4 pt-4">
            <Link href="/services">
              <Button size="lg" className="bg-primary hover:bg-primary-dark text-white">
                Get Started
                <i className="fas fa-arrow-right ml-2"></i>
              </Button>
            </Link>
            <a href="https://wa.me/9779767952043" target="_blank" rel="noopener noreferrer">
              <Button size="lg" className="bg-[#25D366] hover:bg-[#128C7E] text-white">
                <i className="fab fa-whatsapp mr-2"></i>
                Chat with Us
              </Button>
            </a>
          </div>
        </motion.div>
      </div>

      {/* Floating accent elements */}
      <motion.div 
        className="absolute bottom-6 left-6 w-24 h-24 bg-accent/10 backdrop-blur-sm rounded-lg flex items-center justify-center shadow-lg border border-accent/20"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ 
          duration: 0.5, 
          delay: 0.4,
          repeat: Infinity,
          repeatType: "reverse",
          repeatDelay: 2,
        }}
      >
        <div className="text-center">
          <div className="font-tech font-semibold text-accent text-2xl">AI</div>
          <div className="text-xs text-neutral-600">Powered</div>
        </div>
      </motion.div>
      
      <motion.div 
        className="absolute top-6 right-6 w-24 h-24 bg-secondary/10 backdrop-blur-sm rounded-lg flex items-center justify-center shadow-lg border border-secondary/20"
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ 
          duration: 0.5, 
          delay: 0.6,
          repeat: Infinity,
          repeatType: "reverse",
          repeatDelay: 3,
        }}
      >
        <div className="text-center">
          <div className="font-tech font-semibold text-secondary text-2xl">24/7</div>
          <div className="text-xs text-neutral-600">Support</div>
        </div>
      </motion.div>
    </section>
  );
};

export default Hero;
