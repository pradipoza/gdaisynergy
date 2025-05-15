import { useEffect } from "react";
import { Helmet } from "react-helmet";
import { useQuery } from "@tanstack/react-query";
import { Link } from "wouter";
import { Solution } from "@shared/schema";
import Navbar from "@/components/layout/Navbar";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { Lightbulb } from "lucide-react";

const SolutionsPage = () => {
  const { data: solutions, isLoading, error } = useQuery<Solution[]>({
    queryKey: ['/api/solutions'],
  });

  return (
    <>
      <Helmet>
        <title>AI Solutions | GD AI Synergy</title>
        <meta name="description" content="Tailored AI solutions for various industries including enterprise, healthcare, retail, and financial sectors. Transform your business with our specialized AI implementations." />
      </Helmet>

      <div className="min-h-screen flex flex-col bg-neutral-950">
        <Navbar />
        
        <main className="flex-grow pt-24 pb-16">
          {/* Hero Section */}
          <section className="relative py-20 md:py-32 overflow-hidden bg-gradient-to-br from-indigo-950/80 via-purple-950/70 to-blue-950/80">
            {/* Background Effects */}
            <div className="absolute inset-0 z-0">
              <div className="absolute top-0 right-0 w-[700px] h-[700px] bg-gradient-to-br from-indigo-800/40 via-purple-800/30 to-pink-800/40 rounded-full blur-[120px] transform translate-x-1/2 -translate-y-1/2"></div>
              <div className="absolute bottom-0 left-0 w-[700px] h-[700px] bg-gradient-to-tr from-emerald-800/40 via-cyan-800/30 to-blue-800/40 rounded-full blur-[120px] transform -translate-x-1/2 translate-y-1/2"></div>
              <div className="absolute inset-0 bg-[url('/assets/images/grid.svg')] opacity-10"></div>
            </div>
            <div className="container mx-auto px-4 relative z-10">
              <div className="max-w-3xl mx-auto text-center">
                <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-indigo-300 via-purple-400 to-pink-300">AI Solutions for Every Industry</h1>
                <p className="text-lg md:text-xl text-neutral-200 mb-8">
                  Tailored AI implementations designed to address unique challenges across different sectors and business environments.
                </p>
                <Link href="/lets-discuss">
                  <Button size="lg" className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white hover:from-indigo-700 hover:to-purple-700">
                    Discover Your Solution
                  </Button>
                </Link>
              </div>
            </div>
          </section>
          
          {/* Solutions List */}
          <section className="py-20 bg-neutral-900">
            <div className="container mx-auto px-4">
              {isLoading ? (
                <div className="flex justify-center items-center min-h-[40vh]">
                  <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
                </div>
              ) : error ? (
                <div className="text-center p-12 bg-red-50 rounded-lg">
                  <h3 className="text-xl text-red-600 mb-2">Failed to load solutions</h3>
                  <p>Please try again later or contact support.</p>
                </div>
              ) : !solutions || solutions.length === 0 ? (
                <div className="text-center p-12 bg-blue-50 rounded-lg">
                  <Lightbulb className="h-12 w-12 text-indigo-500 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold mb-2">No solutions available</h3>
                  <p className="text-neutral-600 mb-4">
                    We're currently developing new industry-specific solutions. Please check back soon.
                  </p>
                  <Link href="/lets-discuss">
                    <Button>Contact Us for Custom Solutions</Button>
                  </Link>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                  {solutions.map((solution, index) => (
                    <motion.div
                      key={solution.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      className="group relative bg-gradient-to-br from-neutral-800 via-neutral-900 to-neutral-950 border border-indigo-900/30 rounded-2xl shadow-lg hover:shadow-indigo-950/20 overflow-hidden transition-all duration-300"
                    >
                      <img 
                        src={solution.imageUrl || `https://images.unsplash.com/photo-${index % 2 === 0 ? '1558494949-ef010cbdcc31' : '1576091160550-2173dba999ef'}?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&h=1000&q=80`} 
                        alt={solution.title} 
                        className="w-full h-64 object-cover transition-transform duration-300 group-hover:scale-105"
                      />
                      <div className="p-8 z-20 relative">
                        <h3 className="text-2xl font-semibold text-neutral-100 mb-2">{solution.title}</h3>
                        <p className="text-neutral-300 mb-4 min-h-[100px] line-clamp-5">{solution.description}</p>
                        <div className="flex gap-4">
                          <Link href={`/solutions/${solution.id}`}>
                            <Button variant="secondary" className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-medium hover:from-indigo-700 hover:to-purple-700 transition-colors">
                              Know More
                            </Button>
                          </Link>
                          <Link href="/lets-discuss">
                            <Button variant="secondary" className="bg-gradient-to-r from-emerald-600 to-cyan-600 text-white font-medium hover:from-emerald-700 hover:to-cyan-700 transition-colors">
                              Get Solution
                            </Button>
                          </Link>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}
            </div>
          </section>
          
          {/* Industry Sectors */}
          <section className="py-20 bg-gradient-to-br from-indigo-950/80 via-purple-950/70 to-blue-950/80">
            <div className="container mx-auto px-4">
              <h2 className="text-3xl font-bold mb-12 text-center text-neutral-100">We Serve</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                {[
                  {
                    icon: "fas fa-robot",
                    title: "AI Automation",
                    description: "Transform your business with our AI automation solutions. From workflow automation to intelligent process automation, we help you streamline operations and boost productivity."
                  },
                  {
                    icon: "fas fa-comment-dots",
                    title: "AI Chatbots",
                    description: "Intelligent chatbots integrated with popular messaging platforms to provide 24/7 customer support, lead generation, and automated customer engagement."
                  },
                  {
                    icon: "fas fa-cogs",
                    title: "Custom AI Solutions",
                    description: "Tailored AI solutions designed specifically for your business needs, whether it's computer vision, natural language processing, or predictive analytics."
                  },
                  {
                    icon: "fas fa-cloud",
                    title: "AI SaaS Development",
                    description: "End-to-end development of AI-powered Software as a Service (SaaS) platforms that scale with your business needs and customer demands."
                  }
                ].map((industry, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 + 0.3 }}
                    className="group relative bg-gradient-to-br from-neutral-800 via-neutral-900 to-neutral-950 border border-indigo-900/30 rounded-2xl p-8 shadow-lg hover:shadow-indigo-950/20 transition-all duration-300"
                  >
                    <div className="w-12 h-12 bg-gradient-to-br from-indigo-950/40 via-purple-950/40 to-pink-950/40 rounded-xl flex items-center justify-center text-indigo-300 mb-4 group-hover:scale-110 transition-transform duration-300">
                      <i className={`${industry.icon} text-xl`}></i>
                    </div>
                    <h3 className="text-xl font-semibold mb-3 text-neutral-100 group-hover:text-indigo-300 transition-colors">{industry.title}</h3>
                    <p className="text-neutral-300 mb-4">{industry.description}</p>
                    <Link href="/lets-discuss">
                      <span className="text-indigo-300 font-medium hover:underline inline-flex items-center">
                        Learn More
                        <i className="fas fa-arrow-right ml-2 text-sm"></i>
                      </span>
                    </Link>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>
          
          {/* Call-to-Action */}
          <section className="py-20 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 text-white">
            <div className="container mx-auto px-4 text-center">
              <h2 className="text-3xl font-bold mb-4">Ready for an AI-Powered Transformation?</h2>
              <p className="text-lg opacity-90 max-w-2xl mx-auto mb-8">
                Connect with our team to explore how our tailored AI solutions can address your specific business challenges.
              </p>
              <Link href="/lets-discuss">
                <Button size="lg" className="bg-white text-indigo-700 hover:bg-neutral-100">
                  Start Your AI Journey
                </Button>
              </Link>
            </div>
          </section>
        </main>
      </div>
    </>
  );
};

export default SolutionsPage;
