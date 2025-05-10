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
  delay 
}: { 
  title: string; 
  icon: string; 
  description: string; 
  href: string; 
  linkText: string;
  delay: number;
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay }}
    >
      <Link href={href}>
        <div className="block bg-white/10 backdrop-blur-md rounded-xl p-6 transition-all duration-300 hover:bg-white/20 hover:shadow-lg border border-white/20 cursor-pointer">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xl font-semibold">{title}</h3>
            <i className={`${icon} text-xl`}></i>
          </div>
          <p className="text-sm opacity-90 mb-4">
            {description}
          </p>
          <span className="text-sm font-medium flex items-center">
            {linkText}
            <i className="fas fa-arrow-right ml-2"></i>
          </span>
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
    imageUrl: 'https://images.unsplash.com/photo-1639322537228-f710d846310a?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&h=1200&q=80',
    tags: ['Banking', 'Machine Learning', 'Process Automation', 'Customer Experience'],
    featured: true,
    createdAt: new Date(),
    updatedAt: new Date()
  };

  const featured = featuredResource && featuredResource.length > 0 ? featuredResource[0] : defaultFeatured;

  return (
    <section id="resources" className="py-16 md:py-24 bg-gradient-to-r from-primary to-secondary text-white px-4">
      <div className="container mx-auto">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">AI Resources & Insights</h2>
          <p className="text-lg opacity-90 max-w-2xl mx-auto">
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
          />
          
          <ResourceCategory 
            title="News" 
            icon="fas fa-newspaper" 
            description="Latest updates on our company, partnerships, and AI industry developments" 
            href="/resources/news" 
            linkText="View News"
            delay={0.2}
          />
          
          <ResourceCategory 
            title="Portfolio" 
            icon="fas fa-briefcase" 
            description="Showcase of our successful AI projects and implementations across industries" 
            href="/resources/portfolio" 
            linkText="Explore Portfolio"
            delay={0.3}
          />
          
          <ResourceCategory 
            title="Case Studies" 
            icon="fas fa-file-alt" 
            description="Detailed analysis of client challenges, our AI solutions, and the measurable results" 
            href="/resources/case-study" 
            linkText="Read Case Studies"
            delay={0.4}
          />
        </div>
        
        {/* Featured Content Preview */}
        <motion.div 
          className="mt-16 bg-white/5 backdrop-blur-md rounded-xl overflow-hidden shadow-lg"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          <div className="grid grid-cols-1 lg:grid-cols-3">
            <img 
              src={featured.imageUrl || "https://images.unsplash.com/photo-1639322537228-f710d846310a?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&h=1200&q=80"} 
              alt={featured.title} 
              className="w-full h-64 lg:h-full object-cover"
            />
            <div className="p-8 lg:col-span-2">
              <div className="text-sm text-accent-light font-medium mb-2">FEATURED {featured.type.toUpperCase().replace('-', ' ')}</div>
              <h3 className="text-2xl font-bold mb-4">{featured.title}</h3>
              <p className="opacity-90 mb-6">
                {featured.description}
              </p>
              <div className="flex flex-wrap gap-3 mb-6">
                {featured.tags?.map((tag, index) => (
                  <span key={index} className="bg-white/10 text-xs py-1 px-3 rounded-full">{tag}</span>
                ))}
              </div>
              <Link href={`/resources/${featured.id}`}>
                <span className="inline-flex items-center bg-white text-primary font-medium py-2 px-6 rounded-full transition-colors hover:bg-opacity-90 cursor-pointer">
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
