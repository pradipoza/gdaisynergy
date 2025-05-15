import { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { useQuery } from "@tanstack/react-query";
import { Link, useRoute } from "wouter";
import { Resource } from "@shared/schema";
import Navbar from "@/components/layout/Navbar";
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
        <title>AI Resources & Insights | GD AI Synergy</title>
        <meta name="description" content="Explore our collection of AI resources including blogs, news, portfolios, and case studies to stay updated with the latest AI trends and insights." />
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
              <div className="absolute bottom-0 left-0 w-full h-24 bg-gradient-to-b from-transparent to-neutral-900 pointer-events-none"></div>
            </div>
            <div className="container mx-auto px-4 relative z-10">
              <div className="max-w-3xl mx-auto text-center">
                <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-indigo-300 via-purple-400 to-pink-300">AI Resources & Insights</h1>
                <p className="text-lg md:text-xl text-neutral-200 mb-8">
                  Stay updated with the latest trends, case studies, and insights from our AI experts
                </p>
              </div>
            </div>
          </section>

          {/* Resources Tabs */}
          <section className="relative py-20 bg-gradient-to-br from-neutral-900 via-blue-950/80 to-indigo-950/90">
            <div className="absolute top-0 left-0 w-full h-16 bg-gradient-to-t from-transparent to-indigo-950/80 pointer-events-none"></div>
            <div className="absolute bottom-0 left-0 w-full h-16 bg-gradient-to-b from-transparent to-indigo-700/80 pointer-events-none"></div>
            <div className="container mx-auto px-4 relative z-10">
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
                      <Loader2 className="h-12 w-12 animate-spin text-indigo-500" />
                    </div>
                  ) : error ? (
                    <div className="text-center p-12 bg-red-50 rounded-lg">
                      <h3 className="text-xl text-red-600 mb-2">Failed to load resources</h3>
                      <p>Please try again later or contact support.</p>
                    </div>
                  ) : !resources || resources.length === 0 ? (
                    <div className="text-center p-12 bg-blue-50 rounded-lg">
                      <FileText className="h-12 w-12 text-indigo-500 mx-auto mb-4" />
                      <h3 className="text-xl font-semibold mb-2">No resources available</h3>
                      <p className="text-neutral-600 mb-4">
                        We're currently adding new content to this section. Please check back soon.
                      </p>
                    </div>
                  ) : (
                    <motion.div 
                      className="space-y-12"
                      variants={container}
                      initial="hidden"
                      animate="show"
                    >
                      {resources.map((resource, idx) => (
                        <motion.div key={resource.id} variants={item}>
                          <div className="flex flex-col md:flex-row bg-gradient-to-br from-neutral-800 via-neutral-900 to-neutral-950 border border-indigo-900/30 rounded-2xl shadow-lg hover:shadow-indigo-950/20 transition-all duration-300 overflow-hidden">
                            {/* Image left */}
                            <div className="md:w-1/3 w-full flex-shrink-0 overflow-hidden flex items-center justify-center bg-neutral-900">
                              <img 
                                src={resource.imageUrl || `https://source.unsplash.com/random/800x600/?ai,technology,${resource.id}`} 
                                alt={resource.title} 
                                className="w-full max-h-80 object-contain transition-transform hover:scale-105 duration-300"
                              />
                            </div>
                            {/* Content right */}
                            <div className="flex-1 p-8 flex flex-col justify-between">
                              <div>
                                <div className="flex items-center mb-2 text-sm text-neutral-400">
                                  <i className="far fa-calendar-alt mr-2"></i>
                                  <span>{resource.createdAt ? format(new Date(resource.createdAt), 'MMM d, yyyy') : 'Date not available'}</span>
                                </div>
                                <h2 className="text-2xl font-semibold mb-3 text-neutral-100">{resource.title}</h2>
                                <div className="prose prose-invert max-w-none text-neutral-300 mb-4 text-base leading-relaxed" dangerouslySetInnerHTML={{ __html: resource.content }} />
                                {resource.tags && resource.tags.length > 0 && (
                                  <div className="flex flex-wrap gap-2 mb-4">
                                    {resource.tags.map((tag, index) => (
                                      <span key={index} className="bg-neutral-700 text-xs py-1 px-2 rounded-full text-indigo-200">
                                        {tag}
                                      </span>
                                    ))}
                                  </div>
                                )}
                              </div>
                              <div className="flex items-center gap-4 mt-4">
                                <Link href={`/resources/${resource.id}`}>
                                  <span className="text-indigo-300 font-medium flex items-center hover:underline cursor-pointer">
                                    Read More
                                    <i className="fas fa-arrow-right ml-1 text-sm"></i>
                                  </span>
                                </Link>
                              </div>
                            </div>
                          </div>
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
      </div>
    </>
  );
};

export default ResourcesPage;
