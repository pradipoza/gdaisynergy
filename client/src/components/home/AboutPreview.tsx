import { useQuery } from '@tanstack/react-query';
import { Link } from 'wouter';
import { CompanyInfo } from '@shared/schema';
import { motion, useInView } from 'framer-motion';
import { useRef, useEffect, useState } from 'react';

const CounterAnimation = ({ target, label }: { target: number; label: string }) => {
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
      <div className="text-3xl lg:text-4xl font-bold text-primary">{count}</div>
      <div className="text-sm text-neutral-600">{label}</div>
    </div>
  );
};

const AboutPreview = () => {
  // Fetch company about info
  const { data: aboutInfo, isLoading, error } = useQuery<CompanyInfo>({
    queryKey: ['/api/company-info/about'],
  });

  return (
    <section id="about" className="py-16 md:py-24 px-4">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <img 
              src="https://images.unsplash.com/photo-1556761175-b413da4baf72?ixlib=rb-4.0.3&auto=format&fit=crop&w=1400&h=1000&q=80" 
              alt="NepalAI Team in Kathmandu Office" 
              className="rounded-xl shadow-lg w-full"
            />
          </motion.div>
          
          <motion.div 
            className="space-y-6"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold">About NepalAI</h2>
            <p className="text-lg text-neutral-600">
              Founded in Kathmandu, NepalAI is Nepal's premier artificial intelligence company with a global outlook. We combine local talent with international expertise to deliver cutting-edge AI solutions that transform businesses worldwide.
            </p>
            <p className="text-lg text-neutral-600">
              Our mission is to democratize AI technology, making advanced solutions accessible to businesses of all sizes while positioning Nepal as a global hub for AI innovation and talent.
            </p>
            
            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-8">
              <CounterAnimation target={150} label="Clients Served" />
              <CounterAnimation target={200} label="Projects Completed" />
              <CounterAnimation target={30} label="Team Members" />
              <CounterAnimation target={98} label="Satisfaction Rate" />
            </div>
            
            {/* Clients */}
            <div className="mt-8">
              <h3 className="text-lg font-semibold mb-4">Trusted by Industry Leaders</h3>
              <div className="flex flex-wrap items-center gap-6 opacity-70">
                {/* Client logos */}
                <div className="h-10 w-24 bg-neutral-200 rounded flex items-center justify-center text-neutral-500 text-xs">Client 1</div>
                <div className="h-10 w-24 bg-neutral-200 rounded flex items-center justify-center text-neutral-500 text-xs">Client 2</div>
                <div className="h-10 w-24 bg-neutral-200 rounded flex items-center justify-center text-neutral-500 text-xs">Client 3</div>
                <div className="h-10 w-24 bg-neutral-200 rounded flex items-center justify-center text-neutral-500 text-xs">Client 4</div>
                <div className="h-10 w-24 bg-neutral-200 rounded flex items-center justify-center text-neutral-500 text-xs">Client 5</div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AboutPreview;
