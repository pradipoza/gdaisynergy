import { useEffect } from "react";
import { Helmet } from "react-helmet";
import { useQuery } from "@tanstack/react-query";
import { Link, useRoute, useLocation } from "wouter";
import { Solution } from "@shared/schema";
import Navbar from "@/components/layout/Navbar";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { ChevronLeft, Loader2 } from "lucide-react";
import { apiRequest } from "@/lib/queryClient";

const SolutionDetailPage = () => {
  const [match, params] = useRoute("/solutions/:id");
  const [_, navigate] = useLocation();
  const solutionId = params?.id ? parseInt(params.id) : null;

  const { data: solution, isLoading, error } = useQuery<Solution>({
    queryKey: solutionId ? [`/api/solutions/${solutionId}`] : [],
    enabled: !!solutionId,
  });

  // Track solution click for analytics
  useEffect(() => {
    if (solution) {
      const trackServiceClick = async () => {
        try {
          await apiRequest('POST', '/api/analytics/service-click', { serviceId: solution.id });
        } catch (error) {
          console.error('Failed to track solution click:', error);
        }
      };
      trackServiceClick();
    }
  }, [solution]);

  // Redirect if no solution ID
  useEffect(() => {
    if (!solutionId) {
      navigate("/solutions");
    }
  }, [solutionId, navigate]);

  return (
    <>
      <Helmet>
        <title>{solution ? `${solution.title} | NepalAI Solutions` : 'Solution Detail | NepalAI'}</title>
        <meta 
          name="description" 
          content={solution ? solution.description : 'Detailed information about our AI solutions and how they can transform your industry.'}
        />
      </Helmet>

      <div className="min-h-screen flex flex-col">
        <Navbar />
        
        <main className="flex-grow pt-24 pb-16">
          <div className="container mx-auto px-4">
            <Link href="/solutions">
              <a className="inline-flex items-center text-primary hover:text-primary-dark mb-6">
                <ChevronLeft className="h-4 w-4 mr-1" />
                Back to Solutions
              </a>
            </Link>

            {isLoading ? (
              <div className="flex justify-center items-center min-h-[50vh]">
                <Loader2 className="h-12 w-12 animate-spin text-primary" />
              </div>
            ) : error ? (
              <div className="text-center p-12 bg-red-50 rounded-lg">
                <h3 className="text-xl text-red-600 mb-2">Failed to load solution details</h3>
                <p className="mb-4">Please try again later or contact support.</p>
                <Link href="/solutions">
                  <Button>View All Solutions</Button>
                </Link>
              </div>
            ) : !solution ? (
              <div className="text-center p-12 bg-blue-50 rounded-lg">
                <h3 className="text-xl font-semibold mb-2">Solution not found</h3>
                <p className="text-neutral-600 mb-4">
                  The solution you're looking for might have been moved or doesn't exist.
                </p>
                <Link href="/solutions">
                  <Button>View All Solutions</Button>
                </Link>
              </div>
            ) : (
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                <div className="lg:col-span-2">
                  <div className="mb-8 overflow-hidden rounded-xl">
                    <img 
                      src={solution.imageUrl || `https://images.unsplash.com/photo-1558494949-ef010cbdcc31?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&h=1000&q=80`}
                      alt={solution.title}
                      className="w-full h-auto rounded-xl shadow-md"
                    />
                  </div>
                  
                  <h1 className="text-3xl md:text-4xl font-bold mb-4">{solution.title}</h1>
                  
                  <p className="text-lg text-neutral-600 mb-8">
                    {solution.description}
                  </p>
                  
                  <div className="prose max-w-none">
                    <div dangerouslySetInnerHTML={{ __html: solution.content }} />
                  </div>
                </div>
                
                <div className="lg:col-span-1">
                  <div className="bg-neutral-50 rounded-xl p-6 shadow-sm sticky top-24">
                    <h3 className="text-xl font-semibold mb-4">Interested in this solution?</h3>
                    <p className="text-neutral-600 mb-6">
                      Our team can customize this solution to meet your specific industry needs.
                    </p>
                    <Link href="/lets-discuss">
                      <Button className="w-full mb-4">Get Solution</Button>
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
                      <h4 className="font-medium mb-3">Industry Applications</h4>
                      <ul className="space-y-2">
                        <li className="flex items-start">
                          <i className="fas fa-check-circle text-green-500 mt-1 mr-2"></i>
                          <span>Healthcare - Predictive diagnostics and patient care optimization</span>
                        </li>
                        <li className="flex items-start">
                          <i className="fas fa-check-circle text-green-500 mt-1 mr-2"></i>
                          <span>Finance - AI-powered fraud detection and risk assessment</span>
                        </li>
                        <li className="flex items-start">
                          <i className="fas fa-check-circle text-green-500 mt-1 mr-2"></i>
                          <span>Manufacturing - Predictive maintenance and quality control</span>
                        </li>
                        <li className="flex items-start">
                          <i className="fas fa-check-circle text-green-500 mt-1 mr-2"></i>
                          <span>Retail - Personalized recommendations and inventory optimization</span>
                        </li>
                        <li className="flex items-start">
                          <i className="fas fa-check-circle text-green-500 mt-1 mr-2"></i>
                          <span>Agriculture - Crop monitoring and yield prediction</span>
                        </li>
                        <li className="flex items-start">
                          <i className="fas fa-check-circle text-green-500 mt-1 mr-2"></i>
                          <span>Energy - Smart grid management and consumption forecasting</span>
                        </li>
                      </ul>
                    </div>
                    
                    <div className="mt-8 p-4 bg-blue-50 rounded-lg">
                      <h4 className="font-medium mb-2">Success Rate</h4>
                      <div className="flex items-center">
                        <div className="w-full bg-gray-200 rounded-full h-2.5">
                          <div className="bg-blue-600 h-2.5 rounded-full" style={{ width: '95%' }}></div>
                        </div>
                        <span className="ml-2 text-sm font-medium">99.9%</span>
                      </div>
                      <p className="text-sm mt-2 text-neutral-600">
                        Based on our implementation success across similar industries.
                      </p>
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

export default SolutionDetailPage;
