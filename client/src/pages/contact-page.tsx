import { Helmet } from "react-helmet";
import { useQuery } from "@tanstack/react-query";
import { CompanyInfo } from "@shared/schema";
import Navbar from "@/components/layout/Navbar";
import ContactForm from "@/components/forms/ContactForm";
import { motion } from "framer-motion";
import { MapPin, Phone, Mail, Globe, Clock, MessageCircle } from "lucide-react";

const ContactPage = () => {
  // Fetch company contact info
  const { data: contactInfo } = useQuery<CompanyInfo>({
    queryKey: ['/api/company-info/contact'],
  });

  return (
    <>
      <Helmet>
        <title>Contact Us | GD AI Synergy</title>
        <meta name="description" content="Reach out to GD AI Synergy for any inquiries, support, or partnership opportunities. We're here to help you transform your business with AI." />
      </Helmet>

      <div className="min-h-screen flex flex-col">
        <Navbar />
        
        <main className="flex-grow pt-24 pb-16">
          {/* Hero Section */}
          <section className="relative py-20 md:py-32 overflow-hidden bg-neutral-950">
            {/* Background Effects */}
            <div className="absolute inset-0 z-0">
              <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-gradient-to-br from-indigo-950/50 via-purple-950/40 to-pink-950/50 rounded-full blur-[120px] transform translate-x-1/2 -translate-y-1/2"></div>
              <div className="absolute bottom-0 left-0 w-[800px] h-[800px] bg-gradient-to-tr from-emerald-950/50 via-cyan-950/40 to-blue-950/50 rounded-full blur-[120px] transform -translate-x-1/2 translate-y-1/2"></div>
              <div className="absolute inset-0 bg-[url('/assets/images/grid.svg')] opacity-10"></div>
            </div>

            <div className="container mx-auto px-4 relative z-10">
              <motion.div 
                className="max-w-3xl mx-auto text-center"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
              >
                <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-indigo-300 via-purple-400 to-pink-300 tracking-tight">
                  Get in Touch
                </h1>
                <p className="text-xl text-neutral-300 max-w-2xl mx-auto leading-relaxed">
                  Ready to transform your business with cutting-edge AI solutions? Our team of experts is here to help you navigate the future of technology.
                </p>
              </motion.div>
            </div>
          </section>

          {/* Contact Info and Form */}
          <section className="py-20 bg-neutral-950">
            <div className="container mx-auto px-4">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Office Location */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  className="group relative bg-gradient-to-br from-neutral-900 via-neutral-800 to-neutral-900 backdrop-blur-xl p-8 rounded-3xl border border-neutral-800 hover:border-indigo-900/50 transition-all duration-300 shadow-lg hover:shadow-indigo-950/20"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-indigo-950/20 via-purple-950/20 to-pink-950/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-3xl"></div>
                  <div className="relative">
                    <div className="w-16 h-16 bg-gradient-to-br from-indigo-950/40 via-purple-950/40 to-pink-950/40 rounded-2xl flex items-center justify-center text-indigo-300 mb-6 group-hover:scale-110 transition-transform duration-300">
                      <MapPin className="w-8 h-8" />
                    </div>
                    <h3 className="text-2xl font-semibold mb-4 text-neutral-100 group-hover:text-indigo-300 transition-colors">Office Location</h3>
                    <p className="text-neutral-400 text-lg leading-relaxed group-hover:text-neutral-300 transition-colors">
                      New Baneshwor, Kathmandu<br />
                      Nepal, 44600
                    </p>
                    <div className="mt-6 h-48 bg-gradient-to-br from-neutral-900 via-neutral-800 to-neutral-900 rounded-xl overflow-hidden border border-neutral-800 group-hover:border-indigo-900/30 transition-colors">
                      <iframe 
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3532.2585286253274!2d85.30738947547852!3d27.71435107676407!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39eb18fcb77fd4bd%3A0x58119588d548dcf1!2sBhanimandal%2C%20Lalitpur!5e0!3m2!1sen!2snp!4v1620000000000!5m2!1sen!2snp" 
                        width="100%" 
                        height="100%" 
                        style={{ border: 0 }} 
                        allowFullScreen={false} 
                        loading="lazy" 
                        referrerPolicy="no-referrer-when-downgrade"
                        className="opacity-80 group-hover:opacity-100 transition-opacity"
                      ></iframe>
                    </div>
                  </div>
                </motion.div>
                
                {/* Contact Information */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                  className="group relative bg-gradient-to-br from-neutral-900 via-neutral-800 to-neutral-900 backdrop-blur-xl p-8 rounded-3xl border border-neutral-800 hover:border-emerald-900/50 transition-all duration-300 shadow-lg hover:shadow-emerald-950/20"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-emerald-950/20 via-cyan-950/20 to-blue-950/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-3xl"></div>
                  <div className="relative">
                    <div className="w-16 h-16 bg-gradient-to-br from-emerald-950/40 via-cyan-950/40 to-blue-950/40 rounded-2xl flex items-center justify-center text-emerald-300 mb-6 group-hover:scale-110 transition-transform duration-300">
                      <MessageCircle className="w-8 h-8" />
                    </div>
                    <h3 className="text-2xl font-semibold mb-4 text-neutral-100 group-hover:text-emerald-300 transition-colors">Contact Information</h3>
                    
                    {contactInfo && contactInfo.content ? (
                      <div 
                        className="prose prose-invert max-w-none"
                        dangerouslySetInnerHTML={{ __html: contactInfo.content }} 
                      />
                    ) : (
                      <ul className="space-y-6 text-neutral-400">
                        <li className="flex items-center group/item">
                          <div className="w-10 h-10 bg-gradient-to-br from-emerald-950/40 via-cyan-950/40 to-blue-950/40 rounded-lg flex items-center justify-center text-emerald-300 mr-4 group-hover/item:scale-110 transition-transform">
                            <Mail className="w-5 h-5" />
                          </div>
                          <a href="mailto:info@gdaisynergy.com" className="text-lg hover:text-emerald-300 transition-colors">info@gdaisynergy.com</a>
                        </li>
                        <li className="flex items-center group/item">
                          <div className="w-10 h-10 bg-gradient-to-br from-emerald-950/40 via-cyan-950/40 to-blue-950/40 rounded-lg flex items-center justify-center text-emerald-300 mr-4 group-hover/item:scale-110 transition-transform">
                            <Phone className="w-5 h-5" />
                          </div>
                          <a href="tel:9779767952043" className="text-lg hover:text-emerald-300 transition-colors">+977 9767952043</a>
                        </li>
                        <li className="flex items-center group/item">
                          <div className="w-10 h-10 bg-gradient-to-br from-emerald-950/40 via-cyan-950/40 to-blue-950/40 rounded-lg flex items-center justify-center text-emerald-300 mr-4 group-hover/item:scale-110 transition-transform">
                            <Globe className="w-5 h-5" />
                          </div>
                          <a href="https://www.gdaisynergy.com" className="text-lg hover:text-emerald-300 transition-colors">www.gdaisynergy.com</a>
                        </li>
                        <li className="flex items-center group/item">
                          <div className="w-10 h-10 bg-gradient-to-br from-emerald-950/40 via-cyan-950/40 to-blue-950/40 rounded-lg flex items-center justify-center text-emerald-300 mr-4 group-hover/item:scale-110 transition-transform">
                            <Clock className="w-5 h-5" />
                          </div>
                          <div className="text-lg">
                            Mon-Fri: 9:00 AM - 6:00 PM<br />
                            Sat: 10:00 AM - 4:00 PM
                          </div>
                        </li>
                      </ul>
                    )}
                    
                    <div className="mt-8 pt-8 border-t border-neutral-800">
                      <h4 className="text-lg font-medium text-neutral-100 mb-4">Follow Us</h4>
                      <div className="flex flex-wrap gap-4">
                        {/* Social Media Icons */}
                        <a 
                          href="https://www.facebook.com/share/198bKBTrCt/" 
                          target="_blank"
                          rel="noopener noreferrer"
                          className="group relative w-16 h-16 bg-gradient-to-br from-[#232526] via-[#414345] to-[#232526] rounded-2xl flex items-center justify-center backdrop-blur-xl border-2 border-neutral-800 hover:border-[#1877F2]/60 transition-all duration-300 hover:scale-110 hover:shadow-2xl hover:shadow-[#1877F2]/20"
                        >
                          <div className="absolute inset-0 bg-gradient-to-br from-[#1877F2]/20 via-[#1877F2]/10 to-[#1877F2]/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                          <i className="fab fa-facebook-f text-3xl text-[#1877F2] drop-shadow-lg group-hover:scale-125 transition-transform relative z-10"></i>
                        </a>

                        {/* Twitter */}
                        <a 
                          href="https://x.com/GDAisynergy_" 
                          target="_blank"
                          rel="noopener noreferrer"
                          className="group relative w-16 h-16 bg-gradient-to-br from-[#232526] via-[#414345] to-[#232526] rounded-2xl flex items-center justify-center backdrop-blur-xl border-2 border-neutral-800 hover:border-[#1DA1F2]/60 transition-all duration-300 hover:scale-110 hover:shadow-2xl hover:shadow-[#1DA1F2]/20"
                        >
                          <div className="absolute inset-0 bg-gradient-to-br from-[#1DA1F2]/20 via-[#1DA1F2]/10 to-[#1DA1F2]/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                          <i className="fab fa-twitter text-3xl text-[#1DA1F2] drop-shadow-lg group-hover:scale-125 transition-transform relative z-10"></i>
                        </a>

                        {/* LinkedIn */}
                        <a 
                          href="https://www.linkedin.com/company/gd-ai-synergy" 
                          target="_blank"
                          rel="noopener noreferrer"
                          className="group relative w-16 h-16 bg-gradient-to-br from-[#232526] via-[#414345] to-[#232526] rounded-2xl flex items-center justify-center backdrop-blur-xl border-2 border-neutral-800 hover:border-[#0A66C2]/60 transition-all duration-300 hover:scale-110 hover:shadow-2xl hover:shadow-[#0A66C2]/20"
                        >
                          <div className="absolute inset-0 bg-gradient-to-br from-[#0A66C2]/20 via-[#0A66C2]/10 to-[#0A66C2]/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                          <i className="fab fa-linkedin-in text-3xl text-[#0A66C2] drop-shadow-lg group-hover:scale-125 transition-transform relative z-10"></i>
                        </a>

                        {/* Instagram */}
                        <a 
                          href="https://www.instagram.com/gdaisynergy_/" 
                          target="_blank"
                          rel="noopener noreferrer"
                          className="group relative w-16 h-16 bg-gradient-to-br from-[#232526] via-[#414345] to-[#232526] rounded-2xl flex items-center justify-center backdrop-blur-xl border-2 border-neutral-800 hover:border-[#E4405F]/60 transition-all duration-300 hover:scale-110 hover:shadow-2xl hover:shadow-[#E4405F]/20"
                        >
                          <div className="absolute inset-0 bg-gradient-to-br from-[#E4405F]/20 via-[#E4405F]/10 to-[#E4405F]/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                          <i className="fab fa-instagram text-3xl text-[#E4405F] drop-shadow-lg group-hover:scale-125 transition-transform relative z-10"></i>
                        </a>

                        {/* WhatsApp */}
                        <a 
                          href="https://wa.me/9779767952043" 
                          target="_blank"
                          rel="noopener noreferrer"
                          className="group relative w-16 h-16 bg-gradient-to-br from-[#232526] via-[#414345] to-[#232526] rounded-2xl flex items-center justify-center backdrop-blur-xl border-2 border-neutral-800 hover:border-[#25D366]/60 transition-all duration-300 hover:scale-110 hover:shadow-2xl hover:shadow-[#25D366]/20"
                        >
                          <div className="absolute inset-0 bg-gradient-to-br from-[#25D366]/20 via-[#25D366]/10 to-[#25D366]/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                          <i className="fab fa-whatsapp text-3xl text-[#25D366] drop-shadow-lg group-hover:scale-125 transition-transform relative z-10"></i>
                        </a>
                      </div>
                    </div>
                  </div>
                </motion.div>
                
                {/* Contact Form */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  className="group relative bg-gradient-to-br from-neutral-900 via-neutral-800 to-neutral-900 backdrop-blur-xl p-8 rounded-3xl border border-neutral-800 hover:border-violet-900/50 transition-all duration-300 shadow-lg hover:shadow-violet-950/20"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-violet-950/20 via-purple-950/20 to-fuchsia-950/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-3xl"></div>
                  <div className="relative">
                    <div className="w-16 h-16 bg-gradient-to-br from-violet-950/40 via-purple-950/40 to-fuchsia-950/40 rounded-2xl flex items-center justify-center text-violet-300 mb-6 group-hover:scale-110 transition-transform duration-300">
                      <MessageCircle className="w-8 h-8" />
                    </div>
                    <h3 className="text-2xl font-semibold mb-4 text-neutral-100 group-hover:text-violet-300 transition-colors">Send us a Message</h3>
                    <ContactForm />
                  </div>
                </motion.div>
              </div>
            </div>
          </section>

          {/* FAQ Section */}
          <section className="py-20 bg-neutral-950">
            <div className="container mx-auto px-4">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="max-w-3xl mx-auto"
              >
                <h2 className="text-4xl font-bold mb-12 text-center bg-clip-text text-transparent bg-gradient-to-r from-indigo-300 via-purple-400 to-pink-300">
                  Frequently Asked Questions
                </h2>
                
                <div className="space-y-8">
                  {[
                    {
                      question: "What AI automation services do you provide?",
                      answer: "We specialize in AI-powered workflow automation, intelligent chatbots, process automation, and custom AI solutions. Our services help businesses automate repetitive tasks, enhance customer engagement, and optimize operations."
                    },
                    {
                      question: "How can I integrate your chatbot with my existing systems?",
                      answer: "Our chatbots can be seamlessly integrated with your CRM, helpdesk, e-commerce platform, or any other business system through APIs. We handle the entire integration process to ensure smooth operation with your current setup."
                    },
                    {
                      question: "What makes your AI solutions different?",
                      answer: "Our solutions combine cutting-edge AI with deep industry expertise. We focus on creating intuitive, scalable, and highly effective AI tools that deliver measurable business value and ROI."
                    },
                    {
                      question: "Do you offer ongoing support and maintenance?",
                      answer: "Yes, we provide comprehensive 24/7 support, regular updates, and performance optimization to ensure your AI solutions continue to perform at their best. Our team is always available to assist with any questions or adjustments."
                    },
                    {
                      question: "How do you ensure data security and privacy?",
                      answer: "We implement enterprise-grade security measures including data encryption, secure authentication, and compliance with global data protection regulations. Your data remains secure and private at all times."
                    }
                  ].map((faq, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      className="group bg-gradient-to-br from-neutral-900 via-neutral-800 to-neutral-900 backdrop-blur-xl p-6 rounded-2xl border border-neutral-800 hover:border-indigo-900/50 transition-all duration-300 shadow-lg hover:shadow-indigo-950/10"
                    >
                      <h3 className="text-xl font-semibold mb-3 text-neutral-100 group-hover:text-indigo-300 transition-colors">{faq.question}</h3>
                      <p className="text-neutral-400 group-hover:text-neutral-300 transition-colors">{faq.answer}</p>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </div>
          </section>
        </main>
      </div>
    </>
  );
};

export default ContactPage;
