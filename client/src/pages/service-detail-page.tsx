import { useEffect } from "react";
import { Helmet } from "react-helmet";
import { useQuery } from "@tanstack/react-query";
import { Link, useRoute, useLocation } from "wouter";
import { Service } from "@shared/schema";
import Navbar from "@/components/layout/Navbar";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { ChevronLeft, Loader2, ArrowRight } from "lucide-react";
import { apiRequest } from "@/lib/queryClient";

const ServiceDetailPage = () => {
  const [match, params] = useRoute("/services/:id");
  const [_, navigate] = useLocation();
  const serviceId = params?.id ? parseInt(params.id) : null;

  const { data: service, isLoading, error } = useQuery<Service>({
    queryKey: serviceId ? [`/api/services/${serviceId}`] : [],
    enabled: !!serviceId,
  });

  // Track service click for analytics
  useEffect(() => {
    if (service) {
      const trackServiceClick = async () => {
        try {
          await apiRequest('POST', '/api/analytics/service-click', { serviceId: service.id });
        } catch (error) {
          console.error('Failed to track service click:', error);
        }
      };
      trackServiceClick();
    }
  }, [service]);

  // Redirect if no service ID
  useEffect(() => {
    if (!serviceId) {
      navigate("/services");
    }
  }, [serviceId, navigate]);

  return (
    <>
      <Helmet>
        <title>{service ? `${service.title} | NepalAI Services` : 'Service Detail | NepalAI'}</title>
        <meta 
          name="description" 
          content={service ? service.description : 'Detailed information about our AI services and how they can transform your business.'}
        />
      </Helmet>

      <div className="min-h-screen flex flex-col">
        <Navbar />
        
        <main className="flex-grow pt-24 pb-16">
          <div className="container mx-auto px-4">
            <Link href="/services">
              <a className="inline-flex items-center text-primary hover:text-primary-dark mb-6">
                <ChevronLeft className="h-4 w-4 mr-1" />
                Back to Services
              </a>
            </Link>

            {isLoading ? (
              <div className="flex justify-center items-center min-h-[50vh]">
                <Loader2 className="h-12 w-12 animate-spin text-primary" />
              </div>
            ) : error ? (
              <div className="text-center p-12 bg-red-50 rounded-lg">
                <h3 className="text-xl text-red-600 mb-2">Failed to load service details</h3>
                <p className="mb-4">Please try again later or contact support.</p>
                <Link href="/services">
                  <Button>View All Services</Button>
                </Link>
              </div>
            ) : !service ? (
              <div className="text-center p-12 bg-blue-50 rounded-lg">
                <h3 className="text-xl font-semibold mb-2">Service not found</h3>
                <p className="text-neutral-600 mb-4">
                  The service you're looking for might have been moved or doesn't exist.
                </p>
                <Link href="/services">
                  <Button>View All Services</Button>
                </Link>
              </div>
            ) : (
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                <div className="lg:col-span-2">
                  <div className="mb-8 overflow-hidden rounded-xl">
                    <img 
                      src={service.imageUrl || `https://source.unsplash.com/random/1200x800/?ai,technology,${service.id}`}
                      alt={service.title}
                      className="w-full h-auto rounded-xl shadow-md"
                    />
                  </div>
                  
                  <h1 className="text-3xl md:text-4xl font-bold mb-4">{service.title}</h1>
                  
                  <p className="text-lg text-neutral-600 mb-8">
                    {service.description}
                  </p>
                  
                  <div className="prose max-w-none">
                    <div dangerouslySetInnerHTML={{ __html: service.content }} />
                  </div>
                </div>
                
                <div className="lg:col-span-1">
                  <div className="bg-neutral-50 rounded-xl p-6 shadow-sm sticky top-24">
                    <h3 className="text-xl font-semibold mb-4">Interested in this service?</h3>
                    <p className="text-neutral-600 mb-6">
                      Our team is ready to help you implement this solution for your business.
                    </p>
                    <Link href="/lets-discuss">
                      <Button className="w-full mb-4">Get Started</Button>
                    </Link>
                    <a 
                      href="https://wa.me/9779767952043"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center w-full bg-[#25D366] hover:bg-[#128C7E] text-white py-2 px-4 rounded-md transition-colors"
                    >
                      <i className="fab fa-whatsapp mr-2"></i>
                      Chat on WhatsApp
                    </a>
                    
                    <div className="mt-8">
                      <h4 className="font-medium mb-3">Key Benefits</h4>
                      <ul className="space-y-2">
                        <li className="flex items-start">
                          <i className="fas fa-check-circle text-green-500 mt-1 mr-2"></i>
                          <span>Increased efficiency and productivity</span>
                        </li>
                        <li className="flex items-start">
                          <i className="fas fa-check-circle text-green-500 mt-1 mr-2"></i>
                          <span>Reduced operational costs</span>
                        </li>
                        <li className="flex items-start">
                          <i className="fas fa-check-circle text-green-500 mt-1 mr-2"></i>
                          <span>Data-driven decision making</span>
                        </li>
                        <li className="flex items-start">
                          <i className="fas fa-check-circle text-green-500 mt-1 mr-2"></i>
                          <span>Competitive advantage through AI</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </main>
      </div>
    </>
  );
};

export default ServiceDetailPage;
