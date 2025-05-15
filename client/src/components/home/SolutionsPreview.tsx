import { useQuery } from '@tanstack/react-query';
import { Link } from 'wouter';
import { Solution } from '@shared/schema';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';

const SolutionCard = ({ solution, index }: { solution: Solution, index: number }) => {
  return (
    <motion.div 
      className="group relative bg-white overflow-hidden rounded-xl shadow-lg transition-all duration-300 hover:shadow-xl"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.2 }}
    >
      <div className="absolute inset-0 bg-black/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10 flex items-center justify-center">
        <div className="text-white text-center p-6 transform translate-y-8 group-hover:translate-y-0 transition-transform duration-300 opacity-0 group-hover:opacity-100">
          <h3 className="text-2xl font-bold mb-3">{solution.title}</h3>
          <p className="mb-4 line-clamp-5 text-white">{solution.description}</p>
          <div className="flex justify-center space-x-4">
            <Link href={`/solutions/${solution.id}`}>
              <Button variant="secondary" className="bg-white text-black font-medium hover:bg-neutral-200 transition-colors">
                Know More
              </Button>
            </Link>
            <Link href="/lets-discuss">
              <Button variant="secondary" className="bg-primary text-white font-medium hover:bg-primary-dark transition-colors">
                Get Solution
              </Button>
            </Link>
          </div>
        </div>
      </div>
      <img 
        src={solution.imageUrl || `https://images.unsplash.com/photo-${index === 0 ? '1558494949-ef010cbdcc31' : '1576091160550-2173dba999ef'}?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&h=1000&q=80`} 
        alt={solution.title} 
        className="w-full h-72 md:h-96 object-cover transition-transform duration-300 group-hover:scale-105"
      />
      <div className="p-6 z-20 relative bg-white">
        <h3 className="text-xl font-semibold text-neutral-900">{solution.title}</h3>
      </div>
    </motion.div>
  );
};

const SolutionsPreview = () => {
  // Fetch solutions data
  const { data: solutions, isLoading, error } = useQuery<Solution[]>({
    queryKey: ['/api/solutions'],
  });

  // Sample solutions for initial loading or fallback
  const defaultSolutions = [
    {
      id: 1,
      title: "Enterprise AI Integration",
      description: "End-to-end AI solutions that optimize operations, enhance decision-making, and drive innovation across your organization.",
      content: "",
      imageUrl: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&h=1000&q=80",
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      id: 2,
      title: "Healthcare AI",
      description: "Advanced AI solutions for healthcare providers that enhance patient care, optimize operations, and improve diagnostic accuracy.",
      content: "",
      imageUrl: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&h=1000&q=80",
      createdAt: new Date(),
      updatedAt: new Date()
    }
  ];

  // Show 3 solutions in the preview
  const displaySolutions = isLoading || !solutions ? defaultSolutions : solutions.slice(0, 3);

  return (
    <section id="solutions" className="py-16 md:py-24 px-4 bg-gradient-to-br from-neutral-900 via-blue-950/80 to-indigo-950/90">
      <div className="container mx-auto">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">AI Solutions for Every Industry</h2>
          <p className="text-lg text-neutral-600 max-w-2xl mx-auto">
            Tailored AI implementations designed to address the unique challenges in different sectors
          </p>
        </motion.div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 justify-items-center">
          {displaySolutions.map((solution, index) => (
            <SolutionCard key={solution.id} solution={solution} index={index} />
          ))}
        </div>
        
        <motion.div 
          className="text-center mt-12"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          <Link href="/solutions">
            <span className="inline-flex items-center text-primary hover:text-primary-dark font-medium text-lg cursor-pointer">
              Explore All Solutions
              <i className="fas fa-arrow-right ml-2"></i>
            </span>
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default SolutionsPreview;
