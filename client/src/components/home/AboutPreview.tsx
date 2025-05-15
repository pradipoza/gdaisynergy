import { useQuery } from '@tanstack/react-query';
import { Link } from 'wouter';
import { CompanyInfo } from '@shared/schema';
import { motion, useInView } from 'framer-motion';
import { useRef, useEffect, useState } from 'react';

const CounterAnimation = ({ target, label, color }: { target: number; label: string; color: string }) => {
  const [count, setCount] = useState(0);
  const counterRef = useRef<HTMLDivElement>(null);
  const inView = useInView(counterRef, { once: true, margin: "-100px" });
  
  useEffect(() => {
    if (inView) {
      let startTimestamp: number;
      const duration = 2000;
      
      const step = (timestamp: number) => {
        if (!startTimestamp) startTimestamp = timestamp;
        const progress = Math.min((timestamp - startTimestamp) / duration, 1);
        setCount(Math.floor(progress * target));
        
        if (progress < 1) {
          window.requestAnimationFrame(step);
        }
      };
      
      window.requestAnimationFrame(step);
    }
  }, [inView, target]);
  
  return (
    <div className="text-center" ref={counterRef}>
      <div className={`text-4xl lg:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r ${color}`}>{count}+</div>
      <div className="text-sm text-gray-400 mt-2">{label}</div>
    </div>
  );
};

const AboutPreview = () => {
  // Fetch company about info
  const { data: aboutInfo, isLoading, error } = useQuery<CompanyInfo>({
    queryKey: ['/api/company-info/about'],
  });

  return (
    <section id="about" className="py-20 md:py-32 px-4 bg-[#0A0F1C] relative overflow-hidden">
      {/* Modern gradient background */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-[#2563EB]/10 rounded-full blur-[120px] transform translate-x-1/2 -translate-y-1/2"></div>
        <div className="absolute bottom-0 left-0 w-[800px] h-[800px] bg-[#7C3AED]/10 rounded-full blur-[120px] transform -translate-x-1/2 translate-y-1/2"></div>
        <div className="absolute inset-0 bg-[url('/assets/images/grid.svg')] opacity-10"></div>
      </div>

      <div className="container mx-auto relative z-10 max-w-7xl">
        {/* Company Logo */}
        <motion.div 
          className="flex justify-center mb-12"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <img 
            src="/assets/logo.png" 
            alt="GD AI Synergy Logo" 
            className="h-16 md:h-20 w-auto"
          />
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="relative"
          >
            <div className="relative rounded-3xl overflow-hidden shadow-2xl">
              <img 
                src="/assets/team.webp"
                alt="GD AI Synergy Team in Kathmandu Office"
                className="w-full h-[600px] object-cover transform hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0A0F1C] via-transparent to-transparent opacity-60"></div>
            </div>
            {/* Decorative elements */}
            <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-blue-500/20 rounded-full blur-2xl"></div>
            <div className="absolute -top-6 -right-6 w-32 h-32 bg-purple-500/20 rounded-full blur-2xl"></div>
          </motion.div>
          
          <motion.div 
            className="space-y-8"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
          >
            <div>
              <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-indigo-500 to-purple-600 tracking-tight">
                Pioneering AI Innovation in Nepal
              </h2>
              <p className="text-xl text-gray-300 leading-relaxed">
                Founded in Kathmandu, GD AI Synergy is Nepal's premier artificial intelligence company with a global outlook. We combine local talent with international expertise to deliver cutting-edge AI solutions that transform businesses worldwide.
              </p>
            </div>
            
            <div className="bg-white/5 backdrop-blur-lg p-8 rounded-3xl border border-white/10">
              <p className="text-lg text-gray-300 leading-relaxed">
                Our mission is to democratize AI technology, making advanced solutions accessible to businesses of all sizes while positioning Nepal as a global hub for AI innovation and talent.
              </p>
            </div>
            
            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-12">
              <CounterAnimation 
                target={150} 
                label="Clients Served" 
                color="from-blue-400 to-blue-600"
              />
              <CounterAnimation 
                target={200} 
                label="Projects Completed" 
                color="from-purple-400 to-purple-600"
              />
              <CounterAnimation 
                target={30} 
                label="Team Members" 
                color="from-emerald-400 to-emerald-600"
              />
              <CounterAnimation 
                target={98} 
                label="Satisfaction Rate" 
                color="from-amber-400 to-amber-600"
              />
            </div>
            
            {/* Clients */}
            {/*
            <div className="mt-12">
              <h3 className="text-xl font-semibold mb-6 text-white">Trusted by Industry Leaders</h3>
              <div className="grid grid-cols-2 md:grid-cols-5 gap-6">
                {[1, 2, 3, 4, 5].map((client) => (
                  <div 
                    key={client}
                    className="bg-white/5 backdrop-blur-lg rounded-2xl p-4 border border-white/10 hover:border-white/20 transition-all duration-300 group"
                  >
                    <div className="aspect-[3/2] flex items-center justify-center">
                      <img 
                        src={`/assets/images/clients/client-${client}.png`}
                        alt={`Client ${client} Logo`}
                        className="max-w-[80%] max-h-[80%] object-contain filter brightness-0 invert opacity-70 group-hover:opacity-100 transition-opacity"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
            */}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AboutPreview;
