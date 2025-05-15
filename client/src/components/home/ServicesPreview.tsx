import { useQuery } from '@tanstack/react-query';
import { Link } from 'wouter';
import { Service } from '@shared/schema';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import { apiRequest } from '@/lib/queryClient';

const ServiceCard = ({ service, index }: { service: Service, index: number }) => {
  const handleServiceClick = async () => {
    try {
      // Track service click for analytics
      await apiRequest('POST', '/api/analytics/service-click', { serviceId: service.id });
    } catch (error) {
      console.error('Failed to track service click:', error);
    }
  };

  return (
    <motion.div 
      className="relative bg-white/10 backdrop-blur-lg rounded-3xl shadow-2xl border border-white/10 hover:border-indigo-400/40 transition-all duration-300 w-full max-w-xl overflow-hidden group"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
    >
      {/* Accent bar or floating icon */}
      <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-indigo-500 via-purple-500 to-blue-500 group-hover:from-emerald-500 group-hover:to-cyan-500 transition-all duration-300"></div>
      <div className="absolute -top-6 right-6 w-16 h-16 bg-gradient-to-br from-indigo-500 via-purple-500 to-blue-500 rounded-full blur-2xl opacity-30 group-hover:opacity-50 transition-all duration-300"></div>
      <div className="relative z-10">
        <div className="overflow-hidden rounded-2xl mt-4 mx-4 shadow-lg">
          <img 
            src={service.imageUrl || `https://source.unsplash.com/random/800x600/?ai,technology,${index}`} 
            alt={service.title} 
            className="w-full h-56 object-cover group-hover:scale-105 transition-transform duration-500"
          />
        </div>
        <div className="p-8">
          <h3 className="text-xl font-semibold mb-3 text-white drop-shadow-lg">{service.title}</h3>
          <p className="text-neutral-200 mb-4 line-clamp-6">{service.description}</p>
          <div className="flex items-center justify-between mt-4">
            <Link href={`/services/${service.id}`}>
              <span className="text-indigo-200 font-medium flex items-center hover:underline cursor-pointer">
                Know More
                <i className="fas fa-arrow-right ml-1 text-sm"></i>
              </span>
            </Link>
            <Link href="/lets-discuss">
              <Button className="bg-gradient-to-r from-emerald-500 to-cyan-500 text-white text-sm font-medium hover:from-emerald-600 hover:to-cyan-600 transition-colors shadow-md">
                Get Service
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

const ServicesPreview = () => {
  // Fetch services data
  const { data: services, isLoading, error } = useQuery<Service[]>({
    queryKey: ['/api/services'],
  });

  // Sample services for initial loading or fallback
  const defaultServices = [
    {
      id: 1,
      title: "AI Automation Agency",
      description: "Streamline operations and increase efficiency with custom AI automation solutions designed for your unique business processes.",
      content: "",
      imageUrl: "https://pixabay.com/get/gc2de78f9886f806680b5fa99721d1830ee7a6a78f8f784de1587f0e3acaaa6b5663234b190c8302d75447f285dbfa11afb2915e63977ca0654109922550d6af0_1280.jpg",
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      id: 2,
      title: "AI Software Development",
      description: "Custom AI software solutions built from the ground up, integrating machine learning and advanced algorithms.",
      content: "",
      imageUrl: "https://images.unsplash.com/photo-1555949963-aa79dcee981c?ixlib=rb-4.0.3&auto=format&fit=crop&w=900&h=600&q=80",
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      id: 3,
      title: "AI Consulting",
      description: "Strategic guidance on implementing AI solutions that align with your business goals and provide measurable ROI.",
      content: "",
      imageUrl: "https://images.unsplash.com/photo-1559223607-a43c990c692c?ixlib=rb-4.0.3&auto=format&fit=crop&w=900&h=600&q=80",
      createdAt: new Date(),
      updatedAt: new Date()
    }
  ];

  // If loading, show defaultServices, otherwise show actual services (limited to 3 for preview)
  const displayServices = isLoading || !services ? defaultServices : services.slice(0, 3);

  return (
    <section id="services" className="py-16 md:py-24 px-4 bg-gradient-to-br from-blue-950 via-blue-900 to-indigo-900">
      <div className="container mx-auto">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">Our AI Services</h2>
          <p className="text-lg text-neutral-200 max-w-2xl mx-auto">
            Comprehensive AI solutions tailored to transform your business operations and drive innovation
          </p>
        </motion.div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 justify-items-center">
          {displayServices.map((service, index) => (
            <ServiceCard key={service.id} service={service} index={index} />
          ))}
        </div>
        
        <motion.div 
          className="text-center mt-12"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          <Link href="/services">
            <span className="inline-flex items-center text-indigo-300 hover:text-indigo-400 font-medium text-lg cursor-pointer">
              View All Services
              <i className="fas fa-arrow-right ml-2"></i>
            </span>
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default ServicesPreview;
