import { useQuery } from '@tanstack/react-query';
import { useParams, Link } from 'wouter';
import { Resource } from '@shared/schema';
import Navbar from '@/components/layout/Navbar';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import { format } from 'date-fns';

const ResourceDetailPage = () => {
  const params = useParams();
  const resourceId = params?.id;

  const { data: resource, isLoading, error } = useQuery<Resource | null>({
    queryKey: ['/api/resources/' + resourceId],
    enabled: !!resourceId,
  });

  return (
    <div className="min-h-screen flex flex-col bg-neutral-950">
      <Navbar />
      <main className="flex-grow pt-24 pb-16">
        <div className="container mx-auto px-4 max-w-4xl">
          {isLoading ? (
            <div className="flex justify-center items-center min-h-[40vh]">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
            </div>
          ) : error ? (
            <div className="text-center p-12 bg-red-50 rounded-lg">
              <h3 className="text-xl text-red-600 mb-2">Failed to load resource</h3>
              <p>Please try again later or contact support.</p>
            </div>
          ) : !resource ? (
            <div className="text-center p-12 bg-blue-50 rounded-lg">
              <h3 className="text-xl font-semibold mb-2">Resource not found</h3>
              <p className="text-neutral-600 mb-4">The resource you are looking for does not exist or has been removed.</p>
              <Link href="/resources">
                <Button>Back to Resources</Button>
              </Link>
            </div>
          ) : (
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="bg-gradient-to-br from-neutral-800 via-neutral-900 to-neutral-950 rounded-3xl shadow-xl overflow-hidden"
            >
              <div className="w-full h-80 md:h-[400px] overflow-hidden relative">
                <img 
                  src={resource.imageUrl || `https://source.unsplash.com/random/800x600/?ai,technology,${resource.id}`} 
                  alt={resource.title} 
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-4 left-4 bg-indigo-600 text-white text-xs font-bold uppercase px-4 py-2 rounded-full shadow">
                  {resource.type?.replace('-', ' ').toUpperCase()}
                </div>
                {resource.featured && (
                  <div className="absolute top-4 right-4 bg-emerald-600 text-white text-xs font-bold px-4 py-2 rounded-full shadow">
                    Featured
                  </div>
                )}
              </div>
              <div className="p-8 md:p-12">
                <div className="flex flex-wrap gap-4 items-center mb-4">
                  <span className="text-sm text-neutral-400 flex items-center">
                    <i className="far fa-calendar-alt mr-2"></i>
                    {resource.createdAt ? format(new Date(resource.createdAt), 'MMM d, yyyy') : 'Date not available'}
                  </span>
                  {resource.tags && resource.tags.length > 0 && (
                    <div className="flex flex-wrap gap-2">
                      {resource.tags.map((tag, idx) => (
                        <span key={idx} className="bg-neutral-700 text-xs py-1 px-3 rounded-full text-indigo-200">
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
                <h1 className="text-3xl md:text-4xl font-bold mb-6 text-neutral-100">{resource.title}</h1>
                <div className="prose prose-invert max-w-none text-neutral-200 text-lg leading-relaxed" dangerouslySetInnerHTML={{ __html: resource.content || resource.description || '' }} />
                <div className="mt-12">
                  <Link href="/resources">
                    <Button variant="secondary" className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-medium hover:from-indigo-700 hover:to-purple-700">
                      ← Back to Resources
                    </Button>
                  </Link>
                </div>
              </div>
            </motion.div>
          )}
        </div>
      </main>
    </div>
  );
};

export default ResourceDetailPage; 