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
      className="bg-white rounded-xl shadow-md overflow-hidden transition-all duration-300 hover:shadow-xl border border-neutral-200 hover:-translate-y-2"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
    >
      <img 
        src={service.imageUrl || `https://source.unsplash.com/random/800x600/?ai,technology,${index}`} 
        alt={service.title} 
        className="w-full h-48 object-cover"
      />
      <div className="p-6">
        <h3 className="text-xl font-semibold mb-3">{service.title}</h3>
        <p className="text-neutral-600 mb-4">
          {service.description}
        </p>
        <div className="flex items-center justify-between mt-4">
          <Link href={`/services/${service.id}`}>
            <a className="text-primary font-medium flex items-center hover:underline" onClick={handleServiceClick}>
              Know More
              <i className="fas fa-arrow-right ml-1 text-sm"></i>
            </a>
          </Link>
          <Link href="/lets-discuss">
            <Button className="bg-primary hover:bg-primary-dark text-white text-sm">
              Get Service
            </Button>
          </Link>
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
    <section id="services" className="py-16 md:py-24 bg-neutral-50 px-4">
      <div className="container mx-auto">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Our AI Services</h2>
          <p className="text-lg text-neutral-600 max-w-2xl mx-auto">
            Comprehensive AI solutions tailored to transform your business operations and drive innovation
          </p>
        </motion.div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
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
            <a className="inline-flex items-center text-primary hover:text-primary-dark font-medium text-lg">
              View All Services
              <i className="fas fa-arrow-right ml-2"></i>
            </a>
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default ServicesPreview;
