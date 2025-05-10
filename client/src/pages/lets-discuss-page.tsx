import { Helmet } from "react-helmet";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import DiscussForm from "@/components/forms/DiscussForm";
import { motion } from "framer-motion";

const LetsDiscussPage = () => {
  return (
    <>
      <Helmet>
        <title>Let's Discuss Your AI Project | NepalAI</title>
        <meta name="description" content="Tell us about your business challenges and goals. Our team will analyze your needs and suggest the most effective AI solutions." />
      </Helmet>

      <div className="min-h-screen flex flex-col">
        <Navbar />
        
        <main className="flex-grow pt-24 pb-16">
          <section className="py-16 md:py-24 bg-neutral-900 text-white px-4">
            <div className="container mx-auto">
              <motion.h1
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="text-4xl md:text-5xl font-bold mb-8 text-center"
              >
                Let's Discuss Your AI Project
              </motion.h1>
              
              <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
                <motion.div 
                  className="lg:col-span-3"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                >
                  <p className="text-lg opacity-80 mb-8">
                    Tell us about your business challenges and goals. Our team will analyze your needs and suggest the most effective AI solutions to achieve your objectives.
                  </p>
                  
                  <DiscussForm />
                </motion.div>
                
                <motion.div 
                  className="lg:col-span-2"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                >
                  <div className="bg-neutral-800 rounded-xl p-8 h-full">
                    <h3 className="text-xl font-semibold mb-6">Talk to Us in Person</h3>
                    <p className="opacity-80 mb-8">
                      Prefer a direct conversation? Reach out to us through any of these channels:
                    </p>
                    
                    <div className="space-y-4">
                      <a 
                        href="https://wa.me/1234567890" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="flex items-center p-4 bg-[#25D366] rounded-lg hover:bg-opacity-90 transition-colors"
                      >
                        <i className="fab fa-whatsapp text-2xl mr-4"></i>
                        <div>
                          <div className="font-medium">WhatsApp</div>
                          <div className="text-sm opacity-80">Quick chat with our team</div>
                        </div>
                      </a>
                      
                      <a 
                        href="https://m.me/nepalai" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="flex items-center p-4 bg-[#0084FF] rounded-lg hover:bg-opacity-90 transition-colors"
                      >
                        <i className="fab fa-facebook-messenger text-2xl mr-4"></i>
                        <div>
                          <div className="font-medium">Messenger</div>
                          <div className="text-sm opacity-80">Connect on Facebook</div>
                        </div>
                      </a>
                      
                      <a 
                        href="https://instagram.com/nepalai" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="flex items-center p-4 bg-gradient-to-r from-[#833AB4] via-[#FD1D1D] to-[#FCAF45] rounded-lg hover:bg-opacity-90 transition-colors"
                      >
                        <i className="fab fa-instagram text-2xl mr-4"></i>
                        <div>
                          <div className="font-medium">Instagram</div>
                          <div className="text-sm opacity-80">Follow our projects</div>
                        </div>
                      </a>
                      
                      <a 
                        href="https://linkedin.com/company/nepalai" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="flex items-center p-4 bg-[#0077B5] rounded-lg hover:bg-opacity-90 transition-colors"
                      >
                        <i className="fab fa-linkedin text-2xl mr-4"></i>
                        <div>
                          <div className="font-medium">LinkedIn</div>
                          <div className="text-sm opacity-80">Professional connection</div>
                        </div>
                      </a>
                      
                      <a 
                        href="https://t.me/nepalai" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="flex items-center p-4 bg-[#0088CC] rounded-lg hover:bg-opacity-90 transition-colors"
                      >
                        <i className="fab fa-telegram text-2xl mr-4"></i>
                        <div>
                          <div className="font-medium">Telegram</div>
                          <div className="text-sm opacity-80">Instant messaging</div>
                        </div>
                      </a>
                    </div>
                  </div>
                </motion.div>
              </div>
            </div>
          </section>
          
          {/* Process Section */}
          <section className="py-16 bg-white">
            <div className="container mx-auto px-4">
              <h2 className="text-3xl font-bold mb-12 text-center">Our Process</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                {[
                  {
                    icon: "fas fa-comments",
                    title: "Initial Consultation",
                    description: "We start by understanding your business needs, challenges, and objectives."
                  },
                  {
                    icon: "fas fa-lightbulb",
                    title: "Solution Design",
                    description: "Our team designs a tailored AI solution that addresses your specific requirements."
                  },
                  {
                    icon: "fas fa-cogs",
                    title: "Development",
                    description: "We develop the solution using cutting-edge AI technologies and methodologies."
                  },
                  {
                    icon: "fas fa-rocket",
                    title: "Deployment & Support",
                    description: "After deployment, we provide ongoing support and optimization."
                  }
                ].map((step, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="bg-neutral-50 p-6 rounded-xl relative"
                  >
                    <div className="w-12 h-12 bg-primary text-white rounded-full flex items-center justify-center mb-4">
                      <i className={`${step.icon} text-lg`}></i>
                    </div>
                    <h3 className="text-xl font-semibold mb-3">{step.title}</h3>
                    <p className="text-neutral-600">{step.description}</p>
                    
                    {index < 3 && (
                      <div className="hidden lg:block absolute top-1/2 right-0 transform translate-x-1/2 -translate-y-1/2 text-neutral-300">
                        <i className="fas fa-chevron-right text-4xl"></i>
                      </div>
                    )}
                  </motion.div>
                ))}
              </div>
            </div>
          </section>
          
          {/* Testimonials */}
          <section className="py-16 bg-neutral-50">
            <div className="container mx-auto px-4">
              <h2 className="text-3xl font-bold mb-12 text-center">What Our Clients Say</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {[
                  {
                    quote: "NepalAI transformed our business operations with their automated data processing solution. We've seen a 40% increase in efficiency.",
                    author: "Raj Patel",
                    company: "TechSolutions Inc."
                  },
                  {
                    quote: "The healthcare AI solution developed by NepalAI has significantly improved our diagnostic accuracy and patient care.",
                    author: "Dr. Sarah Chen",
                    company: "Global Medical Center"
                  },
                  {
                    quote: "Working with NepalAI has been a game-changer for our financial services. Their AI models have reduced fraud by 65%.",
                    author: "Michael Johnson",
                    company: "Financial Trust Ltd."
                  }
                ].map((testimonial, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="bg-white p-6 rounded-xl shadow-sm"
                  >
                    <div className="mb-4 text-accent text-2xl">
                      <i className="fas fa-quote-left"></i>
                    </div>
                    <p className="text-neutral-600 mb-6 italic">"{testimonial.quote}"</p>
                    <div className="flex items-center">
                      <div className="w-10 h-10 bg-neutral-200 rounded-full mr-3"></div>
                      <div>
                        <div className="font-semibold">{testimonial.author}</div>
                        <div className="text-sm text-neutral-500">{testimonial.company}</div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>
          
          {/* FAQ Section */}
          <section className="py-16 bg-white">
            <div className="container mx-auto px-4">
              <h2 className="text-3xl font-bold mb-12 text-center">Frequently Asked Questions</h2>
              
              <div className="max-w-3xl mx-auto divide-y divide-neutral-200">
                {[
                  {
                    question: "How long does it typically take to implement an AI solution?",
                    answer: "Implementation timeframes vary based on project complexity. Simple automations may take 2-4 weeks, while comprehensive solutions might require 2-3 months. We'll provide you with a specific timeline during our initial consultation."
                  },
                  {
                    question: "What industries do you specialize in?",
                    answer: "We have expertise across multiple sectors including healthcare, finance, retail, manufacturing, and enterprise solutions. Our team adapts AI technologies to meet the specific needs of each industry."
                  },
                  {
                    question: "Do I need to have technical knowledge to work with you?",
                    answer: "No technical knowledge is required. Our team will guide you through the entire process, explaining concepts in clear terms and handling all technical aspects of implementation."
                  },
                  {
                    question: "What kind of support do you provide after deployment?",
                    answer: "We offer comprehensive post-deployment support including system monitoring, maintenance, updates, and ongoing optimization. We also provide training for your team to maximize the value of your AI solution."
                  }
                ].map((faq, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="py-6"
                  >
                    <h3 className="text-lg font-semibold mb-2">{faq.question}</h3>
                    <p className="text-neutral-600">{faq.answer}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>
        </main>
        
        <Footer />
      </div>
    </>
  );
};

export default LetsDiscussPage;
