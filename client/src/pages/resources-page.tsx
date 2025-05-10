import { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { useQuery } from "@tanstack/react-query";
import { Link, useRoute } from "wouter";
import { Resource } from "@shared/schema";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Loader2, FileText, Tag } from "lucide-react";
import { motion } from "framer-motion";
import { format } from "date-fns";

const ResourcesPage = () => {
  const [match, params] = useRoute("/resources/:type");
  const resourceType = params?.type || "all";
  const [activeTab, setActiveTab] = useState(resourceType !== "all" ? resourceType : "all");

  // Update tab when route changes
  useEffect(() => {
    if (resourceType !== "all") {
      setActiveTab(resourceType);
    }
  }, [resourceType]);

  // All resources query
  const { data: allResources, isLoading: isLoadingAll, error: errorAll } = useQuery<Resource[]>({
    queryKey: ['/api/resources'],
  });

  // Filtered resources query
  const { data: filteredResources, isLoading: isLoadingFiltered, error: errorFiltered } = useQuery<Resource[]>({
    queryKey: [`/api/resources?type=${resourceType}`],
    enabled: resourceType !== "all",
  });

  const resources = resourceType === "all" ? allResources : filteredResources;
  const isLoading = resourceType === "all" ? isLoadingAll : isLoadingFiltered;
  const error = resourceType === "all" ? errorAll : errorFiltered;

  // Format resource type for display
  const formatResourceType = (type: string) => {
    switch (type) {
      case "blog":
        return "Blog";
      case "news":
        return "News";
      case "portfolio":
        return "Portfolio";
      case "case-study":
        return "Case Study";
      default:
        return type.charAt(0).toUpperCase() + type.slice(1);
    }
  };

  // Animation variants
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
        <title>AI Resources & Insights | NepalAI</title>
        <meta name="description" content="Explore our collection of AI resources including blogs, news, portfolios, and case studies to stay updated with the latest AI trends and insights." />
      </Helmet>

      <div className="min-h-screen flex flex-col">
        <Navbar />
        
        <main className="flex-grow pt-24 pb-16">
          {/* Hero Section */}
          <section className="bg-gradient-to-r from-primary to-secondary text-white py-16 md:py-24">
            <div className="container mx-auto px-4">
              <div className="max-w-3xl mx-auto text-center">
                <h1 className="text-4xl md:text-5xl font-bold mb-6">AI Resources & Insights</h1>
                <p className="text-lg md:text-xl opacity-90 mb-8">
                  Stay updated with the latest trends, case studies, and insights from our AI experts
                </p>
              </div>
            </div>
          </section>

          {/* Resources Tabs */}
          <section className="py-16">
            <div className="container mx-auto px-4">
              <Tabs defaultValue={activeTab} value={activeTab} onValueChange={(value) => setActiveTab(value)}>
                <div className="flex justify-center mb-12">
                  <TabsList className="bg-neutral-100">
                    <Link href="/resources">
                      <TabsTrigger value="all" className="text-base px-6">All</TabsTrigger>
                    </Link>
                    <Link href="/resources/blog">
                      <TabsTrigger value="blog" className="text-base px-6">Blogs</TabsTrigger>
                    </Link>
                    <Link href="/resources/news">
                      <TabsTrigger value="news" className="text-base px-6">News</TabsTrigger>
                    </Link>
                    <Link href="/resources/portfolio">
                      <TabsTrigger value="portfolio" className="text-base px-6">Portfolio</TabsTrigger>
                    </Link>
                    <Link href="/resources/case-study">
                      <TabsTrigger value="case-study" className="text-base px-6">Case Studies</TabsTrigger>
                    </Link>
                  </TabsList>
                </div>

                <TabsContent value={activeTab}>
                  {isLoading ? (
                    <div className="flex justify-center items-center min-h-[40vh]">
                      <Loader2 className="h-12 w-12 animate-spin text-primary" />
                    </div>
                  ) : error ? (
                    <div className="text-center p-12 bg-red-50 rounded-lg">
                      <h3 className="text-xl text-red-600 mb-2">Failed to load resources</h3>
                      <p>Please try again later or contact support.</p>
                    </div>
                  ) : !resources || resources.length === 0 ? (
                    <div className="text-center p-12 bg-blue-50 rounded-lg">
                      <FileText className="h-12 w-12 text-primary mx-auto mb-4" />
                      <h3 className="text-xl font-semibold mb-2">No resources available</h3>
                      <p className="text-neutral-600 mb-4">
                        We're currently adding new content to this section. Please check back soon.
                      </p>
                    </div>
                  ) : (
                    <motion.div 
                      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                      variants={container}
                      initial="hidden"
                      animate="show"
                    >
                      {resources.map((resource) => (
                        <motion.div key={resource.id} variants={item}>
                          <Card className="h-full overflow-hidden hover:shadow-md transition-shadow">
                            <div className="h-48 overflow-hidden relative">
                              <img 
                                src={resource.imageUrl || `https://source.unsplash.com/random/800x600/?ai,technology,${resource.id}`} 
                                alt={resource.title} 
                                className="w-full h-full object-cover transition-transform hover:scale-105 duration-300"
                              />
                              <div className="absolute top-0 right-0 bg-primary text-white text-xs font-bold uppercase px-3 py-1">
                                {formatResourceType(resource.type)}
                              </div>
                              {resource.featured && (
                                <div className="absolute bottom-0 left-0 bg-accent text-white text-xs font-bold px-3 py-1">
                                  Featured
                                </div>
                              )}
                            </div>
                            <CardContent className="p-6">
                              <div className="flex items-center mb-2 text-sm text-neutral-500">
                                <i className="far fa-calendar-alt mr-2"></i>
                                <span>{format(new Date(resource.createdAt), 'MMM d, yyyy')}</span>
                              </div>
                              <h2 className="text-xl font-semibold mb-3">{resource.title}</h2>
                              <p className="text-neutral-600 mb-4">{resource.description}</p>
                              
                              {resource.tags && resource.tags.length > 0 && (
                                <div className="flex flex-wrap gap-2 mb-4">
                                  {resource.tags.map((tag, index) => (
                                    <span key={index} className="bg-neutral-100 text-xs py-1 px-2 rounded-full">
                                      {tag}
                                    </span>
                                  ))}
                                </div>
                              )}
                              
                              <Link href={`/resources/${resource.id}`}>
                                <a className="text-primary font-medium flex items-center hover:underline">
                                  Read More
                                  <i className="fas fa-arrow-right ml-1 text-sm"></i>
                                </a>
                              </Link>
                            </CardContent>
                          </Card>
                        </motion.div>
                      ))}
                    </motion.div>
                  )}
                </TabsContent>
              </Tabs>
            </div>
          </section>

          {/* Newsletter Section */}
          <section className="bg-neutral-50 py-16">
            <div className="container mx-auto px-4">
              <div className="max-w-3xl mx-auto text-center">
                <h2 className="text-3xl font-bold mb-4">Subscribe to Our Newsletter</h2>
                <p className="text-lg text-neutral-600 mb-8">
                  Stay updated with the latest AI trends, insights, and company news.
                </p>
                <form className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
                  <input 
                    type="email" 
                    placeholder="Your email address" 
                    className="flex-grow px-4 py-2 rounded-lg border border-neutral-300 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                  />
                  <Button type="submit">Subscribe</Button>
                </form>
              </div>
            </div>
          </section>
        </main>
        
        <Footer />
      </div>
    </>
  );
};

export default ResourcesPage;
