import { useEffect } from "react";
import { Helmet } from "react-helmet";
import { useQuery } from "@tanstack/react-query";
import { Link } from "wouter";
import { Service } from "@shared/schema";
import Navbar from "@/components/layout/Navbar";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { ArrowRight, Layers } from "lucide-react";

const ServicesPage = () => {
  const { data: services, isLoading, error } = useQuery<Service[]>({
    queryKey: ['/api/services'],
  });

  // Animation variants for staggered appearance
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  return (
    <>
      <Helmet>
        <title>AI Services | GD AI Synergy</title>
        <meta name="description" content="Explore our comprehensive AI services including automation, software development, and consulting. Transform your business with cutting-edge AI solutions." />
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
              {/* Gradient fade to next section */}
              <div className="absolute bottom-0 left-0 w-full h-24 bg-gradient-to-b from-transparent to-neutral-900 pointer-events-none"></div>
            </div>
            <div className="container mx-auto px-4 relative z-10">
              <div className="max-w-3xl mx-auto text-center">
                <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-indigo-300 via-purple-400 to-pink-300">AI Services</h1>
                <p className="text-lg md:text-xl text-neutral-200 mb-8">
                  Comprehensive AI solutions tailored to transform your business operations and drive innovation in today's competitive landscape.
                </p>
                <Link href="/lets-discuss">
                  <Button size="lg" className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white hover:from-indigo-700 hover:to-purple-700">
                    Get Started with Our Services
                  </Button>
                </Link>
              </div>
            </div>
          </section>

          {/* Services List Section */}
          <section className="relative py-20 bg-gradient-to-br from-black via-blue-950 to-black">
            {/* Gradient fade to next section */}
            <div className="absolute top-0 left-0 w-full h-16 bg-gradient-to-t from-transparent to-blue-950/80 pointer-events-none"></div>
            <div className="absolute bottom-0 left-0 w-full h-16 bg-gradient-to-b from-transparent to-blue-900/80 pointer-events-none"></div>
            <div className="container mx-auto px-4 relative z-10">
              {isLoading ? (
                <div className="flex justify-center items-center min-h-[40vh]">
                  <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
                </div>
              ) : error ? (
                <div className="text-center p-12 bg-red-50 rounded-lg">
                  <h3 className="text-xl text-red-600 mb-2">Failed to load services</h3>
                  <p>Please try again later or contact support.</p>
                </div>
              ) : !services || services.length === 0 ? (
                <div className="text-center p-12 bg-blue-50 rounded-lg">
                  <Layers className="h-12 w-12 text-indigo-500 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold mb-2">No services available</h3>
                  <p className="text-neutral-600 mb-4">
                    We're currently updating our service offerings. Please check back soon.
                  </p>
                  <Link href="/lets-discuss">
                    <Button>Contact Us for Custom Solutions</Button>
                  </Link>
                </div>
              ) : (
                <motion.div 
                  className="space-y-48"
                  variants={container}
                  initial="hidden"
                  animate="show"
                >
                  {services.map((service, idx) => (
                    <motion.div key={service.id} variants={item}>
                      <div className={`flex flex-col md:flex-row ${idx % 2 === 1 ? 'md:flex-row-reverse' : ''} bg-transparent rounded-3xl transition-all duration-300 overflow-hidden group hover:scale-[1.025] hover:shadow-[0_8px_40px_0_rgba(56,189,248,0.15)]`}>
                        {/* Image left/right */}
                        <div className="md:w-1/3 w-full h-64 md:h-auto flex-shrink-0 relative">
                          <img 
                            src={service.imageUrl || `https://source.unsplash.com/random/800x600/?ai,technology,${service.id}`} 
                            alt={service.title} 
                            className="w-full h-full object-cover rounded-3xl"
                            style={{ maskImage: 'radial-gradient(circle at center, white 70%, transparent 100%)', WebkitMaskImage: 'radial-gradient(circle at center, white 70%, transparent 100%)' }}
                          />
                          {/* Vignette overlay for fade effect */}
                          <div className="absolute inset-0 pointer-events-none rounded-3xl" style={{ background: 'radial-gradient(circle at center, transparent 60%, #0a0f1c 100%)' }} />
                        </div>
                        {/* Content right/left */}
                        <div className="flex-1 p-8 flex flex-col justify-between">
                          <div tabIndex={-1} className="focus:outline-none">
                            <h2 className="text-3xl font-bold mb-4 text-indigo-100 drop-shadow-lg focus:outline-none">{service.title}</h2>
                            <p className="text-lg text-neutral-300 mb-6 focus:outline-none">{service.description}</p>
                          </div>
                          <div className="flex items-center gap-6 mt-4">
                            <Link href={`/services/${service.id}`}>
                              <span className="text-lg px-6 py-3 rounded-full bg-gradient-to-r from-indigo-500 to-blue-600 text-white font-semibold flex items-center hover:from-blue-600 hover:to-indigo-500 transition-all duration-200 shadow-md cursor-pointer" style={{ fontSize: '1.25rem' }}>
                                Know More
                                <ArrowRight className="ml-2 h-5 w-5" />
                              </span>
                            </Link>
                            <Link href="/lets-discuss">
                              <Button size="lg" className="text-lg px-8 py-3 rounded-full bg-gradient-to-r from-emerald-500 to-cyan-600 text-white font-semibold hover:from-cyan-600 hover:to-emerald-500 transition-all duration-200 shadow-lg" style={{ fontSize: '1.25rem' }}>
                                Get Service
                              </Button>
                            </Link>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </motion.div>
              )}
            </div>
          </section>

          {/* Call-to-Action Section */}
          <section className="py-20 bg-gradient-to-r from-indigo-700 via-purple-700 to-pink-70 text-white">
            <div className="container mx-auto px-4">
              <div className="max-w-3xl mx-auto text-center">
                <h2 className="text-3xl font-bold mb-4">Need a Custom AI Solution?</h2>
                <p className="text-lg text-neutral-200 mb-8">
                  Our team of experts is ready to develop a tailored solution that meets your unique business requirements.
                </p>
                <Link href="/lets-discuss">
                  <Button size="lg" className="bg-white text-indigo-700 hover:bg-neutral-100">
                    Let's Discuss Your Project
                  </Button>
                </Link>
              </div>
            </div>
          </section>
        </main>
      </div>
    </>
  );
};

export default ServicesPage;
