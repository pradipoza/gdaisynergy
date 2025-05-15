import { Helmet } from "react-helmet";
import Navbar from "@/components/layout/Navbar";
import DiscussForm from "@/components/forms/DiscussForm";
import AIStatsHighlight from "@/components/discuss/AIStatsHighlight";
import { motion } from "framer-motion";
import { Facebook, Instagram, Linkedin, Send } from "lucide-react";

const LetsDiscussPage = () => {
  return (
    <>
      <Helmet>
        <title>Let's Discuss Your AI Project | GD AI Synergy</title>
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
              
              {/* AI Stats Highlight */}
              <AIStatsHighlight />
              
              <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 mt-16">
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
                      <motion.a 
                        href="https://wa.me/9779767952043" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="group flex items-center p-4 bg-gradient-to-r from-[#25D366] to-[#128C7E] rounded-xl hover:shadow-lg hover:shadow-[#25D366]/20 transition-all duration-300 overflow-hidden relative"
                        whileHover={{ scale: 1.02 }}
                      >
                        <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                        <div className="relative z-10 flex items-center justify-center w-12 h-12 mr-4 bg-white/10 rounded-lg backdrop-blur-sm">
                          <i className="fab fa-whatsapp text-2xl text-white"></i>
                        </div>
                        <div>
                          <div className="font-medium text-white">WhatsApp</div>
                          <div className="text-sm text-white/80">Quick chat with our team</div>
                        </div>
                        <i className="fas fa-arrow-right ml-auto opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-300 text-white/70"></i>
                      </motion.a>
                      
                      <motion.a 
                        href="https://m.me/634830789719281?source=qr_link_share" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="group flex items-center p-4 bg-gradient-to-r from-[#0084FF] to-[#0064CE] rounded-xl hover:shadow-lg hover:shadow-[#0084FF]/20 transition-all duration-300 overflow-hidden relative"
                        whileHover={{ scale: 1.02 }}
                      >
                        <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                        <div className="relative z-10 flex items-center justify-center w-12 h-12 mr-4 bg-white/10 rounded-lg backdrop-blur-sm">
                          <i className="fab fa-facebook-messenger text-2xl text-white"></i>
                        </div>
                        <div>
                          <div className="font-medium text-white">Messenger</div>
                          <div className="text-sm text-white/80">Connect on Facebook</div>
                        </div>
                        <i className="fas fa-arrow-right ml-auto opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-300 text-white/70"></i>
                      </motion.a>
                      
                      <motion.a 
                        href="https://www.instagram.com/gdaisynergy_/" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="group flex items-center p-4 bg-gradient-to-r from-[#833AB4] via-[#FD1D1D] to-[#FCAF45] rounded-xl hover:shadow-lg hover:shadow-[#FD1D1D]/20 transition-all duration-300 overflow-hidden relative"
                        whileHover={{ scale: 1.02 }}
                      >
                        <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                        <div className="relative z-10 flex items-center justify-center w-12 h-12 mr-4 bg-white/10 rounded-lg backdrop-blur-sm">
                          <i className="fab fa-instagram text-2xl text-white"></i>
                        </div>
                        <div>
                          <div className="font-medium text-white">Instagram</div>
                          <div className="text-sm text-white/80">Follow our projects</div>
                        </div>
                        <i className="fas fa-arrow-right ml-auto opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-300 text-white/70"></i>
                      </motion.a>
                      
                      <motion.a 
                        href="https://www.linkedin.com/company/gd-ai-synergy" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="group flex items-center p-4 bg-gradient-to-r from-[#0077B5] to-[#005F91] rounded-xl hover:shadow-lg hover:shadow-[#0077B5]/20 transition-all duration-300 overflow-hidden relative"
                        whileHover={{ scale: 1.02 }}
                      >
                        <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                        <div className="relative z-10 flex items-center justify-center w-12 h-12 mr-4 bg-white/10 rounded-lg backdrop-blur-sm">
                          <i className="fab fa-linkedin-in text-2xl text-white"></i>
                        </div>
                        <div>
                          <div className="font-medium text-white">LinkedIn</div>
                          <div className="text-sm text-white/80">Connect professionally</div>
                        </div>
                        <i className="fas fa-arrow-right ml-auto opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-300 text-white/70"></i>
                      </motion.a>
                      
                      <a 
                        href="https://t.me/gdaisynergy" 
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
                    quote: "GD AI Synergy's chatbot solution revolutionized our customer support. Response times improved by 80% while reducing our support costs by 60%. The AI handles 70% of inquiries without human intervention.",
                    author: "Sarah Johnson",
                    company: "E-Commerce Platform"
                  },
                  {
                    quote: "Their AI automation services transformed our workflow. What used to take days now happens in minutes. The team's expertise in process automation is truly impressive.",
                    author: "David Kim",
                    company: "Logistics Firm"
                  },
                  {
                    quote: "The custom AI solution they built for our SaaS platform gave us a competitive edge. Their team's ability to understand complex requirements and deliver scalable AI solutions is remarkable.",
                    author: "Priya Thapa",
                    company: "Tech Startup"
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
                    question: "How long does it take to implement an AI chatbot or automation solution?",
                    answer: "Implementation time varies by project scope. Basic chatbot deployments can be live in 2-3 weeks, while complex AI automation solutions typically take 4-8 weeks. We provide a detailed timeline after understanding your specific requirements."
                  },
                  {
                    question: "What messaging platforms do your chatbots support?",
                    answer: "Our AI chatbots integrate with all major platforms including WhatsApp, Facebook Messenger, Instagram, Telegram, and custom web chat. We can also integrate with your existing CRM or support systems."
                  },
                  {
                    question: "Do I need technical expertise to manage the AI solutions?",
                    answer: "Not at all! Our solutions are designed for ease of use. We provide a user-friendly dashboard for managing your chatbots and automations, along with comprehensive training and 24/7 support."
                  },
                  {
                    question: "What kind of support do you offer after deployment?",
                    answer: "We provide ongoing support including 24/7 monitoring, regular updates, and performance optimization. Our team is always available to help with any questions or adjustments you need to make to your AI solutions."
                  },
                  {
                    question: "Can you customize the AI solutions for my specific business needs?",
                    answer: "Absolutely! We specialize in custom AI solutions tailored to your unique business requirements. Our team will work closely with you to understand your workflow and create a solution that fits perfectly."
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
      </div>
    </>
  );
};

export default LetsDiscussPage;
