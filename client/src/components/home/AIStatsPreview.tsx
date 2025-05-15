import { motion, useInView } from 'framer-motion';
import { useRef, useEffect, useState } from 'react';
import { Link } from 'wouter';

const StatCard = ({ 
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
  const cardRef = useRef<HTMLDivElement>(null);
  const inView = useInView(cardRef, { once: true, margin: "-100px" });
  
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
        ref={cardRef}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay }}
        className="group relative bg-white/5 backdrop-blur-lg rounded-2xl p-8 border border-white/10 hover:border-white/20 transition-all duration-300 cursor-pointer hover:scale-[1.02]"
      >
        <div className={`absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-300 ${gradient}`}></div>
        
        <div className="relative z-10">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xl font-semibold text-white">{title}</h3>
            <i className={`${icon} text-2xl bg-clip-text text-transparent ${gradient}`}></i>
          </div>
          
          <div className="mb-2">
            <span className={`text-4xl font-bold bg-clip-text text-transparent ${gradient}`}>
              {count}{suffix}
            </span>
          </div>
          
          <p className="text-sm text-gray-400 mb-4">
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

const AIStatsPreview = () => {
  const stats = [
    {
      title: "Cost Reduction",
      value: 60,
      suffix: "%",
      description: "Average reduction in operational costs through AI automation",
      icon: "fas fa-chart-line",
      gradient: "bg-gradient-to-br from-blue-500 to-blue-600",
      reportUrl: "https://www.mckinsey.com/capabilities/quantumblack/our-insights/the-state-of-ai-in-2023-generative-ais-breakout-year",
      source: "McKinsey"
    },
    {
      title: "Efficiency Boost",
      value: 60,
      suffix: "%",
      description: "Increase in process efficiency with AI implementation",
      icon: "fas fa-bolt",
      gradient: "bg-gradient-to-br from-purple-500 to-purple-600",
      reportUrl: "https://www.accenture.com/us-en/insights/artificial-intelligence/ai-investment",
      source: "Accenture"
    },
    {
      title: "Error Reduction",
      value: 85,
      suffix: "%",
      description: "Decrease in manual errors through AI validation",
      icon: "fas fa-check-circle",
      gradient: "bg-gradient-to-br from-emerald-500 to-emerald-600",
      reportUrl: "https://www2.deloitte.com/us/en/insights/focus/cognitive-technologies/state-of-ai-and-intelligent-automation-in-business.html",
      source: "Deloitte"
    },
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
      title: "Time Saved",
      value: 65,
      suffix: "%",
      description: "Reduction in processing time with AI automation",
      icon: "fas fa-clock",
      gradient: "bg-gradient-to-br from-rose-500 to-rose-600",
      reportUrl: "https://www.pwc.com/gx/en/issues/data-and-analytics/publications/artificial-intelligence-study.html",
      source: "PwC"
    },
    {
      title: "Customer Satisfaction",
      value: 92,
      suffix: "%",
      description: "Increase in customer satisfaction scores",
      icon: "fas fa-smile",
      gradient: "bg-gradient-to-br from-cyan-500 to-cyan-600",
      reportUrl: "https://www.gartner.com/en/documents/4008670",
      source: "Gartner"
    }
  ];

  return (
    <section className="py-20 px-4 bg-[#0A0F1C] relative overflow-hidden">
      {/* Modern gradient background */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-[#2563EB]/10 rounded-full blur-[120px] transform translate-x-1/2 -translate-y-1/2"></div>
        <div className="absolute bottom-0 left-0 w-[800px] h-[800px] bg-[#7C3AED]/10 rounded-full blur-[120px] transform -translate-x-1/2 translate-y-1/2"></div>
        <div className="absolute inset-0 bg-[url('/assets/images/grid.svg')] opacity-10"></div>
      </div>

      <div className="container mx-auto relative z-10 max-w-7xl">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-indigo-500 to-purple-600 tracking-tight">
            AI Impact in Numbers
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Real-world results achieved through our AI solutions across various industries. Click on any statistic to view the detailed report.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {stats.map((stat, index) => (
            <StatCard
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

export default AIStatsPreview; 