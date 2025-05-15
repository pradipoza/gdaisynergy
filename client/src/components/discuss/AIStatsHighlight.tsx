import { motion, useInView } from 'framer-motion';
import { useRef, useEffect, useState } from 'react';
import { Link } from 'wouter';

const StatHighlight = ({ 
  title, 
  value, 
  suffix, 
  description, 
  icon, 
  gradient,
  delay,
  reportUrl,
  source
}: { 
  title: string;
  value: number;
  suffix?: string;
  description: string;
  icon: string;
  gradient: string;
  delay: number;
  reportUrl: string;
  source: string;
}) => {
  const [count, setCount] = useState(0);
  const itemRef = useRef<HTMLDivElement>(null);
  const inView = useInView(itemRef, { once: true, margin: "-100px" });
  
  useEffect(() => {
    if (inView) {
      let startTimestamp: number;
      const duration = 2000;
      
      const step = (timestamp: number) => {
        if (!startTimestamp) startTimestamp = timestamp;
        const progress = Math.min((timestamp - startTimestamp) / duration, 1);
        setCount(Math.floor(progress * value));
        
        if (progress < 1) {
          window.requestAnimationFrame(step);
        }
      };
      
      window.requestAnimationFrame(step);
    }
  }, [inView, value]);

  return (
    <a 
      href={reportUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="block"
    >
      <motion.div
        ref={itemRef}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay }}
        className="group relative bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/10 hover:border-white/20 transition-all duration-300 cursor-pointer hover:scale-[1.02]"
      >
        <div className={`absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity duration-300 ${gradient}`}></div>
        
        <div className="relative z-10">
          <div className="flex items-center gap-4 mb-4">
            <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${gradient} bg-opacity-20 group-hover:bg-opacity-30 transition-all duration-300`}>
              <i className={`${icon} text-xl bg-clip-text text-transparent ${gradient}`}></i>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-white">{title}</h3>
              <span className={`text-2xl font-bold bg-clip-text text-transparent ${gradient}`}>
                {count}{suffix}
              </span>
            </div>
          </div>
          
          <p className="text-sm text-gray-300 mb-3">
            {description}
          </p>
          
          <div className="flex items-center justify-between text-sm">
            <div className="text-gray-400 group-hover:text-white transition-colors">
              View Report
              <i className="fas fa-arrow-right ml-2 transform group-hover:translate-x-1 transition-transform"></i>
            </div>
            <span className="text-gray-500 text-xs">Source: {source}</span>
          </div>
        </div>
      </motion.div>
    </a>
  );
};

const AIStatsHighlight = () => {
  // Selected key stats that are most relevant for potential clients
  const stats = [
    {
      title: "ROI Improvement",
      value: 200,
      suffix: "%",
      description: "Average return on investment for AI projects",
      icon: "fas fa-coins",
      gradient: "bg-gradient-to-br from-amber-500 to-amber-600",
      reportUrl: "https://www.ibm.com/watson/advantage-reports/future-of-artificial-intelligence.html",
      source: "IBM"
    },
    {
      title: "Cost Reduction",
      value: 60,
      suffix: "%",
      description: "Average reduction in operational costs",
      icon: "fas fa-chart-line",
      gradient: "bg-gradient-to-br from-blue-500 to-blue-600",
      reportUrl: "https://www.mckinsey.com/capabilities/quantumblack/our-insights/the-state-of-ai-in-2023-generative-ais-breakout-year",
      source: "McKinsey"
    },
    {
      title: "Efficiency Boost",
      value: 60,
      suffix: "%",
      description: "Increase in process efficiency",
      icon: "fas fa-bolt",
      gradient: "bg-gradient-to-br from-purple-500 to-purple-600",
      reportUrl: "https://www.accenture.com/us-en/insights/artificial-intelligence/ai-investment",
      source: "Accenture"
    }
  ];

  return (
    <section className="py-12 bg-neutral-900/50 backdrop-blur-sm">
      <div className="container mx-auto px-4">
        <motion.div 
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <h2 className="text-2xl font-bold mb-4 text-neutral-100">Why Choose AI Solutions?</h2>
          <p className="text-neutral-300 max-w-2xl mx-auto">
            See the real impact of AI implementation in businesses like yours. Click on any statistic to view detailed case studies.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
          {stats.map((stat, index) => (
            <StatHighlight
              key={stat.title}
              {...stat}
              delay={0.1 * index}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default AIStatsHighlight; 