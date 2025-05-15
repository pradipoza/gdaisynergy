import { useQuery } from '@tanstack/react-query';
import { Link } from 'wouter';
import { Resource } from '@shared/schema';
import { motion } from 'framer-motion';

const ResourceCategory = ({ 
  title, 
  icon, 
  description, 
  href, 
  linkText, 
  delay,
  gradient
}: { 
  title: string; 
  icon: string; 
  description: string; 
  href: string; 
  linkText: string;
  delay: number;
  gradient: string;
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay }}
    >
      <Link href={href}>
        <div className="group relative bg-white/5 backdrop-blur-lg rounded-3xl p-8 transition-all duration-300 hover:bg-white/10 border border-white/10 hover:border-white/20 cursor-pointer overflow-hidden">
          {/* Gradient overlay */}
          <div className={`absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-300 ${gradient}`}></div>
          
          <div className="relative z-10">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-semibold text-white">{title}</h3>
              <i className={`${icon} text-2xl bg-clip-text text-transparent ${gradient}`}></i>
            </div>
            <p className="text-gray-300 text-sm mb-6 line-clamp-5">
              {description}
            </p>
            <span className="text-sm font-medium text-white inline-flex items-center group-hover:translate-x-2 transition-transform duration-300">
              {linkText}
              <i className="fas fa-arrow-right ml-2"></i>
            </span>
          </div>
        </div>
      </Link>
    </motion.div>
  );
};

const ResourcesPreview = () => {
  // Fetch featured resource
  const { data: featuredResource, isLoading, error } = useQuery<Resource[]>({
    queryKey: ['/api/resources/featured'],
  });

  // Default featured resource if data is loading or not available
  const defaultFeatured = {
    id: 1,
    type: 'case-study',
    title: 'AI in Finance: Transforming the Banking Industry',
    description: 'Learn how our AI solutions helped a leading bank reduce operational costs by 35% while improving customer satisfaction scores.',
    content: 'Learn how our AI solutions helped a leading bank reduce operational costs by 35% while improving customer satisfaction scores. This comprehensive case study details the implementation process, challenges overcome, and measurable results achieved.',
    imageUrl: '/assets/images/resources/featured-case-study.jpg',
    tags: ['Banking', 'Machine Learning', 'Process Automation', 'Customer Experience'],
    featured: true,
    createdAt: new Date(),
    updatedAt: new Date()
  };

  const featured = featuredResource && featuredResource.length > 0 ? featuredResource[0] : defaultFeatured;

  return (
    <section id="resources" className="py-20 md:py-32 px-4 bg-[#0A0F1C] relative overflow-hidden">
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
            AI Resources & Insights
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Stay updated with the latest trends, case studies, and insights from our AI experts
          </p>
        </motion.div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <ResourceCategory 
            title="Blogs" 
            icon="fas fa-rss" 
            description="In-depth articles on AI trends, technologies, and implementation strategies" 
            href="/resources/blog" 
            linkText="Read Latest Blogs"
            delay={0.1}
            gradient="bg-gradient-to-br from-blue-500 to-blue-600"
          />
          
          <ResourceCategory 
            title="News" 
            icon="fas fa-newspaper" 
            description="Latest updates on our company, partnerships, and AI industry developments" 
            href="/resources/news" 
            linkText="View News"
            delay={0.2}
            gradient="bg-gradient-to-br from-purple-500 to-purple-600"
          />
          
          <ResourceCategory 
            title="Portfolio" 
            icon="fas fa-briefcase" 
            description="Showcase of our successful AI projects and implementations across industries" 
            href="/resources/portfolio" 
            linkText="Explore Portfolio"
            delay={0.3}
            gradient="bg-gradient-to-br from-emerald-500 to-emerald-600"
          />
          
          <ResourceCategory 
            title="Case Studies" 
            icon="fas fa-file-alt" 
            description="Detailed analysis of client challenges, our AI solutions, and the measurable results" 
            href="/resources/case-study" 
            linkText="Read Case Studies"
            delay={0.4}
            gradient="bg-gradient-to-br from-amber-500 to-amber-600"
          />
        </div>
        
        {/* Featured Content Preview */}
        <motion.div 
          className="mt-20 bg-white/5 backdrop-blur-lg rounded-3xl overflow-hidden border border-white/10"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          <div className="grid grid-cols-1 lg:grid-cols-3">
            <div className="relative">
              <img 
                src={featured.imageUrl || "/assets/images/resources/default-featured.jpg"} 
                alt={featured.title} 
                className="w-full h-full object-cover aspect-[4/3] lg:aspect-auto"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0A0F1C] via-transparent to-transparent opacity-60"></div>
            </div>
            <div className="p-8 lg:p-12 lg:col-span-2">
              <div className="inline-block px-4 py-1 rounded-full bg-white/10 text-blue-400 text-sm font-medium mb-4">
                FEATURED {featured.type.toUpperCase().replace('-', ' ')}
              </div>
              <h3 className="text-2xl md:text-3xl font-bold mb-4 text-white">{featured.title}</h3>
              <p className="text-gray-300 mb-6 leading-relaxed line-clamp-5">
                {featured.description}
              </p>
              <div className="flex flex-wrap gap-3 mb-8">
                {featured.tags?.map((tag, index) => (
                  <span 
                    key={index} 
                    className="bg-white/10 text-gray-300 text-xs py-1.5 px-4 rounded-full border border-white/10 hover:border-white/20 transition-colors"
                  >
                    {tag}
                  </span>
                ))}
              </div>
              <Link href={`/resources/${featured.type}`}>
                <span className="inline-flex items-center bg-gradient-to-r from-blue-500 to-blue-600 text-white font-medium py-3 px-6 rounded-full transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/20 hover:scale-105">
                  Read Full {featured.type.replace('-', ' ')}
                  <i className="fas fa-arrow-right ml-2"></i>
                </span>
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ResourcesPreview;
