import { Helmet } from "react-helmet";
import { useQuery } from "@tanstack/react-query";
import { Link } from "wouter";
import { CompanyInfo } from "@shared/schema";
import Navbar from "@/components/layout/Navbar";
import { Button } from "@/components/ui/button";
import { motion, useInView } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import AIStatsSection from "@/components/about/AIStatsSection";

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

const AboutPage = () => {
  // Fetch company about info
  const { data: aboutInfo } = useQuery<CompanyInfo>({
    queryKey: ['/api/company-info/about'],
  });

  return (
    <>
      <Helmet>
        <title>About Us | GD AI Synergy</title>
        <meta name="description" content="Learn about GD AI Synergy, Nepal's premier artificial intelligence company with a global outlook, combining local talent with international expertise." />
      </Helmet>

      <div className="min-h-screen flex flex-col">
        <Navbar />
        
        <main className="flex-grow pt-24 pb-16">
          {/* Hero Section */}
          <section className="relative py-20 md:py-32 overflow-hidden bg-neutral-900">
            {/* Background Effects */}
            <div className="absolute inset-0 z-0">
              <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-gradient-to-br from-indigo-950/50 via-purple-950/40 to-pink-950/50 rounded-full blur-[120px] transform translate-x-1/2 -translate-y-1/2"></div>
              <div className="absolute bottom-0 left-0 w-[800px] h-[800px] bg-gradient-to-tr from-emerald-950/50 via-cyan-950/40 to-blue-950/50 rounded-full blur-[120px] transform -translate-x-1/2 translate-y-1/2"></div>
              <div className="absolute inset-0 bg-[url('/assets/images/grid.svg')] opacity-10"></div>
            </div>

            <div className="container mx-auto px-4 relative z-10">
              <div className="max-w-3xl mx-auto text-center">
                <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-indigo-300 via-purple-400 to-pink-300">About GD AI Synergy</h1>
                <p className="text-lg md:text-xl text-neutral-300">
                  Nepal's premier artificial intelligence company with a global outlook
                </p>
              </div>
            </div>
          </section>

          {/* Our Story */}
          <section className="py-20 bg-neutral-900">
            <div className="container mx-auto px-4">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5 }}
                  className="relative group"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-indigo-950/20 via-purple-950/20 to-pink-950/20 rounded-2xl transform group-hover:scale-[1.02] transition-transform duration-300"></div>
                  <img 
                    src="/assets/aboutusimage.jpg"
                    alt="About Us"
                    className="rounded-2xl shadow-xl w-full h-full object-cover relative z-10"
                  />
                </motion.div>
                
                <motion.div 
                  className="space-y-6"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                >
                  <h2 className="text-3xl font-bold text-neutral-100">Our Story</h2>
                  
                  {aboutInfo && aboutInfo.content ? (
                    <div 
                      className="prose prose-invert max-w-none"
                      dangerouslySetInnerHTML={{ __html: aboutInfo.content }} 
                    />
                  ) : (
                    <>
                      <p className="text-lg text-neutral-300 leading-relaxed">
                        Founded in Kathmandu, GD AI Synergy is Nepal's premier artificial intelligence company with a global outlook. We combine local talent with international expertise to deliver cutting-edge AI solutions that transform businesses worldwide.
                      </p>
                      <p className="text-lg text-neutral-300">
                        Our mission is to democratize AI technology, making advanced solutions accessible to businesses of all sizes while positioning Nepal as a global hub for AI innovation and talent.
                      </p>
                      <p className="text-lg text-neutral-300">
                        With a team of highly skilled engineers, data scientists, and AI specialists, we're committed to delivering excellence in every project we undertake. Our deep understanding of AI technologies and their practical applications enables us to solve complex business challenges efficiently.
                      </p>
                    </>
                  )}
                </motion.div>
              </div>
            </div>
          </section>

          {/* Stats Section */}
          <section className="py-20 bg-neutral-800">
            <div className="container mx-auto px-4">
              <h2 className="text-3xl font-bold mb-12 text-center text-neutral-100">Our Impact in Numbers</h2>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                <CounterAnimation target={150} label="Clients Served" />
                <CounterAnimation target={200} label="Projects Completed" />
                <CounterAnimation target={30} label="Team Members" />
                <CounterAnimation target={98} label="Satisfaction Rate %" />
              </div>
            </div>
          </section>

          {/* Global Presence & Expertise */}
          <section className="py-20 bg-neutral-900">
            <div className="container mx-auto px-4">
              <h2 className="text-3xl font-bold mb-12 text-center text-neutral-100">Global Presence & Expertise</h2>
              
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* AI Automation Expertise */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  className="group relative bg-gradient-to-br from-neutral-800 via-neutral-800 to-neutral-900 rounded-2xl p-8 border border-neutral-800 hover:border-indigo-900/50 transition-all duration-300 shadow-lg hover:shadow-indigo-950/20"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-indigo-950/20 via-purple-950/20 to-pink-950/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl"></div>
                  <div className="relative">
                    <div className="w-16 h-16 bg-gradient-to-br from-indigo-950/40 via-purple-950/40 to-pink-950/40 rounded-xl flex items-center justify-center text-indigo-300 mb-6 group-hover:scale-110 transition-transform duration-300">
                      <i className="fas fa-robot text-2xl"></i>
                    </div>
                    <h3 className="text-xl font-semibold mb-4 text-neutral-100 group-hover:text-indigo-300 transition-colors">AI Automation</h3>
                    <ul className="space-y-3 text-neutral-300">
                      <li className="flex items-center">
                        <i className="fas fa-check-circle text-emerald-400 mr-3"></i>
                        Workflow automation
                      </li>
                      <li className="flex items-center">
                        <i className="fas fa-check-circle text-emerald-400 mr-3"></i>
                        Process optimization
                      </li>
                      <li className="flex items-center">
                        <i className="fas fa-check-circle text-emerald-400 mr-3"></i>
                        Custom AI solutions
                      </li>
                      <li className="flex items-center">
                        <i className="fas fa-check-circle text-emerald-400 mr-3"></i>
                        Intelligent automation
                      </li>
                    </ul>
                  </div>
                </motion.div>

                {/* Chatbot Solutions */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                  className="group relative bg-gradient-to-br from-neutral-800 via-neutral-800 to-neutral-900 rounded-2xl p-8 border border-neutral-800 hover:border-emerald-900/50 transition-all duration-300 shadow-lg hover:shadow-emerald-950/20"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-emerald-950/20 via-cyan-950/20 to-blue-950/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl"></div>
                  <div className="relative">
                    <div className="w-16 h-16 bg-gradient-to-br from-emerald-950/40 via-cyan-950/40 to-blue-950/40 rounded-xl flex items-center justify-center text-emerald-300 mb-6 group-hover:scale-110 transition-transform duration-300">
                      <i className="fas fa-comment-dots text-2xl"></i>
                    </div>
                    <h3 className="text-xl font-semibold mb-4 text-neutral-100 group-hover:text-emerald-300 transition-colors">Chatbot Solutions</h3>
                    <ul className="space-y-3 text-neutral-300">
                      <li className="flex items-center">
                        <i className="fas fa-check-circle text-emerald-400 mr-3"></i>
                        AI-powered chatbots
                      </li>
                      <li className="flex items-center">
                        <i className="fas fa-check-circle text-emerald-400 mr-3"></i>
                        24/7 customer support
                      </li>
                      <li className="flex items-center">
                        <i className="fas fa-check-circle text-emerald-400 mr-3"></i>
                        Multi-platform integration
                      </li>
                      <li className="flex items-center">
                        <i className="fas fa-check-circle text-emerald-400 mr-3"></i>
                        Natural language processing
                      </li>
                    </ul>
                  </div>
                </motion.div>

                {/* Global Impact */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  className="group relative bg-gradient-to-br from-neutral-800 via-neutral-800 to-neutral-900 rounded-2xl p-8 border border-neutral-800 hover:border-violet-900/50 transition-all duration-300 shadow-lg hover:shadow-violet-950/20"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-violet-950/20 via-purple-950/20 to-fuchsia-950/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl"></div>
                  <div className="relative">
                    <div className="w-16 h-16 bg-gradient-to-br from-violet-950/40 via-purple-950/40 to-fuchsia-950/40 rounded-xl flex items-center justify-center text-violet-300 mb-6 group-hover:scale-110 transition-transform duration-300">
                      <i className="fas fa-globe-americas text-2xl"></i>
                    </div>
                    <h3 className="text-xl font-semibold mb-4 text-neutral-100 group-hover:text-violet-300 transition-colors">Global Impact</h3>
                    <ul className="space-y-3 text-neutral-300">
                      <li className="flex items-center">
                        <i className="fas fa-check-circle text-emerald-400 mr-3"></i>
                        Clients in 15+ countries
                      </li>
                      <li className="flex items-center">
                        <i className="fas fa-check-circle text-emerald-400 mr-3"></i>
                        Round-the-clock support
                      </li>
                      <li className="flex items-center">
                        <i className="fas fa-check-circle text-emerald-400 mr-3"></i>
                        Cross-border collaborations
                      </li>
                      <li className="flex items-center">
                        <i className="fas fa-check-circle text-emerald-400 mr-3"></i>
                        International partnerships
                      </li>
                    </ul>
                  </div>
                </motion.div>
              </div>
            </div>
          </section>

          {/* AI Impact Stats */}
          <AIStatsSection />

          {/* Our Values */}
          <section className="py-20 bg-neutral-800">
            <div className="container mx-auto px-4">
              <h2 className="text-3xl font-bold mb-12 text-center text-neutral-100">Our Core Values</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                {[
                  {
                    icon: "fas fa-lightbulb",
                    title: "Innovation",
                    description: "Constantly pushing the boundaries of what's possible with AI technology."
                  },
                  {
                    icon: "fas fa-handshake",
                    title: "Integrity",
                    description: "Operating with transparency, honesty, and ethical considerations in all we do."
                  },
                  {
                    icon: "fas fa-users",
                    title: "Collaboration",
                    description: "Working closely with our clients to ensure their success is our success."
                  },
                  {
                    icon: "fas fa-globe",
                    title: "Global Impact",
                    description: "Representing Nepal on the global stage while making a positive worldwide impact."
                  }
                ].map((value, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="group relative bg-gradient-to-br from-neutral-800 via-neutral-800 to-neutral-900 rounded-2xl p-8 border border-neutral-800 hover:border-indigo-900/50 transition-all duration-300 shadow-lg hover:shadow-indigo-950/20"
                  >
                    <div className="absolute inset-0 bg-gradient-to-br from-indigo-950/20 via-purple-950/20 to-pink-950/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl"></div>
                    <div className="relative">
                      <div className="w-12 h-12 bg-gradient-to-br from-indigo-950/40 via-purple-950/40 to-pink-950/40 rounded-xl flex items-center justify-center text-indigo-300 mb-4 group-hover:scale-110 transition-transform duration-300">
                        <i className={`${value.icon} text-xl`}></i>
                      </div>
                      <h3 className="text-xl font-semibold mb-3 text-neutral-100 group-hover:text-indigo-300 transition-colors">{value.title}</h3>
                      <p className="text-neutral-300">{value.description}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>

          {/* Call-to-Action */}
          <section className="py-20 bg-neutral-800">
            <div className="container mx-auto px-4 text-center">
              <h2 className="text-3xl font-bold mb-4 text-neutral-100">Ready to Transform Your Business with AI?</h2>
              <p className="text-lg text-neutral-300 max-w-2xl mx-auto mb-8">
                Partner with Nepal's premier AI company to unlock the full potential of artificial intelligence for your organization.
              </p>
              <Link href="/lets-discuss">
                <Button size="lg" className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white hover:from-indigo-700 hover:to-purple-700">
                  Start the Conversation
                </Button>
              </Link>
            </div>
          </section>
        </main>
      </div>
    </>
  );
};

export default AboutPage;
