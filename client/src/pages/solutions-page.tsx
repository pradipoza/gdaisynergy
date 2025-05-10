import { useEffect } from "react";
import { Helmet } from "react-helmet";
import { useQuery } from "@tanstack/react-query";
import { Link } from "wouter";
import { Solution } from "@shared/schema";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
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
        <title>AI Solutions | NepalAI</title>
        <meta name="description" content="Tailored AI solutions for various industries including enterprise, healthcare, retail, and financial sectors. Transform your business with our specialized AI implementations." />
      </Helmet>

      <div className="min-h-screen flex flex-col">
        <Navbar />
        
        <main className="flex-grow pt-24 pb-16">
          {/* Hero Section */}
          <section className="bg-gradient-to-r from-primary-dark to-accent text-white py-16 md:py-24">
            <div className="container mx-auto px-4">
              <div className="max-w-3xl mx-auto text-center">
                <h1 className="text-4xl md:text-5xl font-bold mb-6">AI Solutions for Every Industry</h1>
                <p className="text-lg md:text-xl opacity-90 mb-8">
                  Tailored AI implementations designed to address unique challenges across different sectors and business environments.
                </p>
                <Link href="/lets-discuss">
                  <Button size="lg" className="bg-white text-primary hover:bg-neutral-100">
                    Discover Your Solution
                  </Button>
                </Link>
              </div>
            </div>
          </section>
          
          {/* Solutions List */}
          <section className="py-16">
            <div className="container mx-auto px-4">
              {isLoading ? (
                <div className="flex justify-center items-center min-h-[40vh]">
                  <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
                </div>
              ) : error ? (
                <div className="text-center p-12 bg-red-50 rounded-lg">
                  <h3 className="text-xl text-red-600 mb-2">Failed to load solutions</h3>
                  <p>Please try again later or contact support.</p>
                </div>
              ) : !solutions || solutions.length === 0 ? (
                <div className="text-center p-12 bg-blue-50 rounded-lg">
                  <Lightbulb className="h-12 w-12 text-primary mx-auto mb-4" />
                  <h3 className="text-xl font-semibold mb-2">No solutions available</h3>
                  <p className="text-neutral-600 mb-4">
                    We're currently developing new industry-specific solutions. Please check back soon.
                  </p>
                  <Link href="/lets-discuss">
                    <Button>Contact Us for Custom Solutions</Button>
                  </Link>
                </div>
              ) : (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                  {solutions.map((solution, index) => (
                    <motion.div
                      key={solution.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      className="group relative bg-white overflow-hidden rounded-xl shadow-lg transition-all duration-300 hover:shadow-xl"
                    >
                      <div className="absolute inset-0 bg-gradient-to-r from-primary/60 to-accent/60 opacity-0 group-hover:opacity-90 transition-opacity duration-300 z-10 flex items-center justify-center">
                        <div className="text-white text-center p-6 transform translate-y-8 group-hover:translate-y-0 transition-transform duration-300 opacity-0 group-hover:opacity-100">
                          <h3 className="text-2xl font-bold mb-3">{solution.title}</h3>
                          <p className="mb-4">{solution.description}</p>
                          <div className="flex justify-center space-x-4">
                            <Link href={`/solutions/${solution.id}`}>
                              <Button variant="secondary" className="bg-white text-primary font-medium hover:bg-opacity-90 transition-colors">
                                Know More
                              </Button>
                            </Link>
                            <Link href="/lets-discuss">
                              <Button variant="secondary" className="bg-accent text-white font-medium hover:bg-accent-dark transition-colors">
                                Get Solution
                              </Button>
                            </Link>
                          </div>
                        </div>
                      </div>
                      <img 
                        src={solution.imageUrl || `https://images.unsplash.com/photo-${index % 2 === 0 ? '1558494949-ef010cbdcc31' : '1576091160550-2173dba999ef'}?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&h=1000&q=80`} 
                        alt={solution.title} 
                        className="w-full h-72 md:h-96 object-cover transition-transform duration-300 group-hover:scale-105"
                      />
                      <div className="p-6 z-20 relative bg-white">
                        <h3 className="text-xl font-semibold">{solution.title}</h3>
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}
            </div>
          </section>
          
          {/* Industry Sectors */}
          <section className="bg-neutral-50 py-16">
            <div className="container mx-auto px-4">
              <h2 className="text-3xl font-bold mb-12 text-center">Industries We Serve</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                {[
                  {
                    icon: "fas fa-building",
                    title: "Enterprise",
                    description: "End-to-end AI solutions that optimize operations, enhance decision-making, and drive innovation."
                  },
                  {
                    icon: "fas fa-heartbeat",
                    title: "Healthcare",
                    description: "Advanced AI for providers that enhance patient care, optimize operations, and improve diagnostics."
                  },
                  {
                    icon: "fas fa-shopping-cart",
                    title: "Retail",
                    description: "AI solutions for demand forecasting, customer segmentation, and personalized shopping experiences."
                  },
                  {
                    icon: "fas fa-chart-line",
                    title: "Finance",
                    description: "Intelligent systems for fraud detection, risk assessment, algorithmic trading, and process automation."
                  }
                ].map((industry, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 + 0.3 }}
                    className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow"
                  >
                    <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center text-primary mb-4">
                      <i className={`${industry.icon} text-xl`}></i>
                    </div>
                    <h3 className="text-xl font-semibold mb-3">{industry.title}</h3>
                    <p className="text-neutral-600 mb-4">{industry.description}</p>
                    <Link href="/lets-discuss">
                      <a className="text-primary font-medium hover:underline inline-flex items-center">
                        Learn More
                        <i className="fas fa-arrow-right ml-2 text-sm"></i>
                      </a>
                    </Link>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>
          
          {/* Call-to-Action */}
          <section className="py-16 bg-gradient-to-r from-primary to-secondary text-white">
            <div className="container mx-auto px-4 text-center">
              <h2 className="text-3xl font-bold mb-4">Ready for an AI-Powered Transformation?</h2>
              <p className="text-lg opacity-90 max-w-2xl mx-auto mb-8">
                Connect with our team to explore how our tailored AI solutions can address your specific business challenges.
              </p>
              <Link href="/lets-discuss">
                <Button size="lg" className="bg-white text-primary hover:bg-neutral-100">
                  Start Your AI Journey
                </Button>
              </Link>
            </div>
          </section>
        </main>
        
        <Footer />
      </div>
    </>
  );
};

export default SolutionsPage;
