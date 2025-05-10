import { Helmet } from "react-helmet";
import { useQuery } from "@tanstack/react-query";
import { Link } from "wouter";
import { CompanyInfo } from "@shared/schema";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { motion, useInView } from "framer-motion";
import { useRef, useEffect, useState } from "react";

const CounterAnimation = ({ target, label }: { target: number; label: string }) => {
  const [count, setCount] = useState(0);
  const counterRef = useRef<HTMLDivElement>(null);
  const inView = useInView(counterRef, { once: true, margin: "-100px" });
  
  useEffect(() => {
    if (inView) {
      let startTimestamp: number;
      const duration = 2000;
      
      const step = (timestamp: number) => {
        if (!startTimestamp) startTimestamp = timestamp;
        const progress = Math.min((timestamp - startTimestamp) / duration, 1);
        setCount(Math.floor(progress * target));
        
        if (progress < 1) {
          window.requestAnimationFrame(step);
        }
      };
      
      window.requestAnimationFrame(step);
    }
  }, [inView, target]);
  
  return (
    <div className="text-center" ref={counterRef}>
      <div className="text-3xl lg:text-4xl font-bold text-primary">{count}</div>
      <div className="text-sm text-neutral-600">{label}</div>
    </div>
  );
};

const AboutPage = () => {
  // Fetch company about info
  const { data: aboutInfo } = useQuery<CompanyInfo>({
    queryKey: ['/api/company-info/about'],
  });

  return (
    <>
      <Helmet>
        <title>About Us | NepalAI</title>
        <meta name="description" content="Learn about NepalAI, Nepal's premier artificial intelligence company with a global outlook, combining local talent with international expertise." />
      </Helmet>

      <div className="min-h-screen flex flex-col">
        <Navbar />
        
        <main className="flex-grow pt-24 pb-16">
          {/* Hero Section */}
          <section className="bg-gradient-to-r from-primary to-secondary text-white py-16 md:py-24">
            <div className="container mx-auto px-4">
              <div className="max-w-3xl mx-auto text-center">
                <h1 className="text-4xl md:text-5xl font-bold mb-6">About NepalAI</h1>
                <p className="text-lg md:text-xl opacity-90">
                  Nepal's premier artificial intelligence company with a global outlook
                </p>
              </div>
            </div>
          </section>

          {/* Our Story */}
          <section className="py-16">
            <div className="container mx-auto px-4">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  <img 
                    src="https://images.unsplash.com/photo-1556761175-b413da4baf72?ixlib=rb-4.0.3&auto=format&fit=crop&w=1400&h=1000&q=80" 
                    alt="NepalAI Team in Kathmandu Office" 
                    className="rounded-xl shadow-lg w-full"
                  />
                </motion.div>
                
                <motion.div 
                  className="space-y-6"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                >
                  <h2 className="text-3xl font-bold">Our Story</h2>
                  
                  {aboutInfo && aboutInfo.content ? (
                    <div 
                      className="prose max-w-none"
                      dangerouslySetInnerHTML={{ __html: aboutInfo.content }} 
                    />
                  ) : (
                    <>
                      <p className="text-lg text-neutral-600">
                        Founded in Kathmandu, NepalAI is Nepal's premier artificial intelligence company with a global outlook. We combine local talent with international expertise to deliver cutting-edge AI solutions that transform businesses worldwide.
                      </p>
                      <p className="text-lg text-neutral-600">
                        Our mission is to democratize AI technology, making advanced solutions accessible to businesses of all sizes while positioning Nepal as a global hub for AI innovation and talent.
                      </p>
                      <p className="text-lg text-neutral-600">
                        With a team of highly skilled engineers, data scientists, and AI specialists, we're committed to delivering excellence in every project we undertake. Our deep understanding of AI technologies and their practical applications enables us to solve complex business challenges efficiently.
                      </p>
                    </>
                  )}
                </motion.div>
              </div>
            </div>
          </section>

          {/* Stats Section */}
          <section className="py-16 bg-neutral-50">
            <div className="container mx-auto px-4">
              <h2 className="text-3xl font-bold mb-12 text-center">Our Impact in Numbers</h2>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                <CounterAnimation target={150} label="Clients Served" />
                <CounterAnimation target={200} label="Projects Completed" />
                <CounterAnimation target={30} label="Team Members" />
                <CounterAnimation target={98} label="Satisfaction Rate %" />
              </div>
            </div>
          </section>

          {/* Our Team */}
          <section className="py-16">
            <div className="container mx-auto px-4">
              <h2 className="text-3xl font-bold mb-12 text-center">Our Leadership Team</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {[
                  {
                    name: "Arjun Sharma",
                    position: "Chief Executive Officer",
                    bio: "With over 15 years in AI and software development, Arjun leads our company vision and strategy."
                  },
                  {
                    name: "Priya Patel",
                    position: "Chief Technology Officer",
                    bio: "A machine learning expert with a Ph.D. in AI, Priya oversees all our technological innovations."
                  },
                  {
                    name: "Rajesh Thapa",
                    position: "Head of AI Research",
                    bio: "Leading our R&D efforts with a focus on developing cutting-edge AI algorithms and solutions."
                  }
                ].map((member, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-shadow"
                  >
                    <div className="h-48 bg-gradient-to-r from-primary/10 to-accent/10 flex items-center justify-center">
                      <div className="w-24 h-24 bg-neutral-200 rounded-full flex items-center justify-center">
                        <i className="fas fa-user text-3xl text-neutral-400"></i>
                      </div>
                    </div>
                    <div className="p-6">
                      <h3 className="text-xl font-semibold mb-1">{member.name}</h3>
                      <p className="text-primary mb-3">{member.position}</p>
                      <p className="text-neutral-600">{member.bio}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>

          {/* Our Values */}
          <section className="py-16 bg-gradient-to-r from-primary to-secondary text-white">
            <div className="container mx-auto px-4">
              <h2 className="text-3xl font-bold mb-12 text-center">Our Core Values</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                {[
                  {
                    icon: "fas fa-lightbulb",
                    title: "Innovation",
                    description: "Constantly pushing the boundaries of what's possible with AI technology."
                  },
                  {
                    icon: "fas fa-handshake",
                    title: "Integrity",
                    description: "Operating with transparency, honesty, and ethical considerations in all we do."
                  },
                  {
                    icon: "fas fa-users",
                    title: "Collaboration",
                    description: "Working closely with our clients to ensure their success is our success."
                  },
                  {
                    icon: "fas fa-globe",
                    title: "Global Impact",
                    description: "Representing Nepal on the global stage while making a positive worldwide impact."
                  }
                ].map((value, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20"
                  >
                    <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center text-white mb-4">
                      <i className={`${value.icon} text-xl`}></i>
                    </div>
                    <h3 className="text-xl font-semibold mb-3">{value.title}</h3>
                    <p className="opacity-90">{value.description}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>

          {/* Clients */}
          <section className="py-16">
            <div className="container mx-auto px-4">
              <h2 className="text-3xl font-bold mb-12 text-center">Trusted by Industry Leaders</h2>
              
              <div className="flex flex-wrap justify-center items-center gap-8 md:gap-12 opacity-70">
                {[...Array(8)].map((_, index) => (
                  <div key={index} className="h-16 w-32 md:h-20 md:w-40 bg-neutral-200 rounded flex items-center justify-center text-neutral-500 text-sm">
                    Client {index + 1}
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Call-to-Action */}
          <section className="py-16 bg-neutral-50">
            <div className="container mx-auto px-4 text-center">
              <h2 className="text-3xl font-bold mb-4">Ready to Transform Your Business with AI?</h2>
              <p className="text-lg text-neutral-600 max-w-2xl mx-auto mb-8">
                Partner with Nepal's premier AI company to unlock the full potential of artificial intelligence for your organization.
              </p>
              <Link href="/lets-discuss">
                <Button size="lg" className="bg-primary text-white">
                  Start the Conversation
                </Button>
              </Link>
            </div>
          </section>
        </main>
        
        <Footer />
      </div>
    </>
  );
};

export default AboutPage;
