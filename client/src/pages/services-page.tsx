import { useEffect } from "react";
import { Helmet } from "react-helmet";
import { useQuery } from "@tanstack/react-query";
import { Link } from "wouter";
import { Service } from "@shared/schema";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
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
        <title>AI Services | NepalAI</title>
        <meta name="description" content="Comprehensive AI services including automation, software development, consulting, and custom solutions for businesses worldwide." />
      </Helmet>

      <div className="min-h-screen flex flex-col">
        <Navbar />
        
        <main className="flex-grow pt-24 pb-16">
          {/* Hero Section */}
          <section className="bg-gradient-to-r from-primary to-secondary text-white py-16 md:py-24">
            <div className="container mx-auto px-4">
              <div className="max-w-3xl mx-auto text-center">
                <h1 className="text-4xl md:text-5xl font-bold mb-6">AI Services</h1>
                <p className="text-lg md:text-xl opacity-90 mb-8">
                  Comprehensive AI solutions tailored to transform your business operations and drive innovation in today's competitive landscape.
                </p>
                <Link href="/lets-discuss">
                  <Button size="lg" className="bg-white text-primary hover:bg-neutral-100">
                    Get Started with Our Services
                  </Button>
                </Link>
              </div>
            </div>
          </section>

          {/* Services List Section */}
          <section className="py-16">
            <div className="container mx-auto px-4">
              {isLoading ? (
                <div className="flex justify-center items-center min-h-[40vh]">
                  <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
                </div>
              ) : error ? (
                <div className="text-center p-12 bg-red-50 rounded-lg">
                  <h3 className="text-xl text-red-600 mb-2">Failed to load services</h3>
                  <p>Please try again later or contact support.</p>
                </div>
              ) : !services || services.length === 0 ? (
                <div className="text-center p-12 bg-blue-50 rounded-lg">
                  <Layers className="h-12 w-12 text-primary mx-auto mb-4" />
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
                  className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                  variants={container}
                  initial="hidden"
                  animate="show"
                >
                  {services.map((service) => (
                    <motion.div key={service.id} variants={item}>
                      <Card className="h-full overflow-hidden hover:shadow-md transition-shadow">
                        <div className="h-48 overflow-hidden">
                          <img 
                            src={service.imageUrl || `https://source.unsplash.com/random/800x600/?ai,technology,${service.id}`} 
                            alt={service.title} 
                            className="w-full h-full object-cover transition-transform hover:scale-105 duration-300"
                          />
                        </div>
                        <CardContent className="p-6">
                          <h2 className="text-xl font-semibold mb-3">{service.title}</h2>
                          <p className="text-neutral-600 mb-4">{service.description}</p>
                          <div className="flex justify-between items-center mt-4">
                            <Link href={`/services/${service.id}`}>
                              <span className="text-primary font-medium flex items-center hover:underline cursor-pointer">
                                Know More
                                <ArrowRight className="ml-1 h-4 w-4" />
                              </span>
                            </Link>
                            <Link href="/lets-discuss">
                              <Button size="sm">Get Service</Button>
                            </Link>
                          </div>
                        </CardContent>
                      </Card>
                    </motion.div>
                  ))}
                </motion.div>
              )}
            </div>
          </section>

          {/* Call-to-Action Section */}
          <section className="bg-neutral-50 py-16">
            <div className="container mx-auto px-4">
              <div className="max-w-3xl mx-auto text-center">
                <h2 className="text-3xl font-bold mb-4">Need a Custom AI Solution?</h2>
                <p className="text-lg text-neutral-600 mb-8">
                  Our team of experts is ready to develop a tailored solution that meets your unique business requirements.
                </p>
                <Link href="/lets-discuss">
                  <Button size="lg" className="bg-primary text-white">
                    Let's Discuss Your Project
                  </Button>
                </Link>
              </div>
            </div>
          </section>
        </main>
        
        <Footer />
      </div>
    </>
  );
};

export default ServicesPage;
