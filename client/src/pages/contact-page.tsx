import { Helmet } from "react-helmet";
import { useQuery } from "@tanstack/react-query";
import { CompanyInfo } from "@shared/schema";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import ContactForm from "@/components/forms/ContactForm";
import { motion } from "framer-motion";

const ContactPage = () => {
  // Fetch company contact info
  const { data: contactInfo } = useQuery<CompanyInfo>({
    queryKey: ['/api/company-info/contact'],
  });

  return (
    <>
      <Helmet>
        <title>Contact Us | NepalAI</title>
        <meta name="description" content="Reach out to NepalAI for any inquiries, support, or partnership opportunities. We're here to help you transform your business with AI." />
      </Helmet>

      <div className="min-h-screen flex flex-col">
        <Navbar />
        
        <main className="flex-grow pt-24 pb-16">
          {/* Hero Section */}
          <section className="bg-gradient-to-r from-primary to-secondary text-white py-16 md:py-24">
            <div className="container mx-auto px-4">
              <div className="max-w-3xl mx-auto text-center">
                <h1 className="text-4xl md:text-5xl font-bold mb-6">Contact Us</h1>
                <p className="text-lg md:text-xl opacity-90">
                  Reach out to our team for any inquiries, support, or partnership opportunities
                </p>
              </div>
            </div>
          </section>

          {/* Contact Info and Form */}
          <section className="py-16">
            <div className="container mx-auto px-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {/* Office Location */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  className="bg-white rounded-xl shadow-md p-6 border border-neutral-200"
                >
                  <div className="flex items-center mb-4">
                    <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center text-primary">
                      <i className="fas fa-map-marker-alt text-xl"></i>
                    </div>
                    <h3 className="text-xl font-semibold ml-4">Office Location</h3>
                  </div>
                  <p className="text-neutral-600">
                    Thamel, Kathmandu<br />
                    Nepal, 44600
                  </p>
                  <div className="mt-4 h-40 bg-neutral-100 rounded-lg overflow-hidden">
                    {/* Google Maps would be embedded here - using placeholder */}
                    <iframe 
                      src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3532.2585286253274!2d85.30738947547852!3d27.71435107676407!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39eb18fcb77fd4bd%3A0x58119588d548dcf1!2sThamel%2C%20Kathmandu%2044600!5e0!3m2!1sen!2snp!4v1687854342013!5m2!1sen!2snp" 
                      width="100%" 
                      height="100%" 
                      style={{ border: 0 }} 
                      allowFullScreen={false} 
                      loading="lazy" 
                      referrerPolicy="no-referrer-when-downgrade"
                    ></iframe>
                  </div>
                </motion.div>
                
                {/* Contact Information */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                  className="bg-white rounded-xl shadow-md p-6 border border-neutral-200"
                >
                  <div className="flex items-center mb-4">
                    <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center text-primary">
                      <i className="fas fa-address-book text-xl"></i>
                    </div>
                    <h3 className="text-xl font-semibold ml-4">Contact Information</h3>
                  </div>
                  
                  {contactInfo && contactInfo.content ? (
                    <div 
                      className="prose max-w-none"
                      dangerouslySetInnerHTML={{ __html: contactInfo.content }} 
                    />
                  ) : (
                    <ul className="space-y-4 text-neutral-600">
                      <li className="flex items-center">
                        <i className="fas fa-envelope text-primary mr-3"></i>
                        <a href="mailto:info@nepalai.com" className="hover:text-primary">info@nepalai.com</a>
                      </li>
                      <li className="flex items-center">
                        <i className="fas fa-phone text-primary mr-3"></i>
                        <a href="tel:+97712345678" className="hover:text-primary">+977 1-234-5678</a>
                      </li>
                      <li className="flex items-center">
                        <i className="fas fa-globe text-primary mr-3"></i>
                        <a href="https://www.nepalai.com" className="hover:text-primary">www.nepalai.com</a>
                      </li>
                    </ul>
                  )}
                  
                  <div className="mt-6 pt-6 border-t border-neutral-200">
                    <h4 className="font-medium mb-3">Follow Us</h4>
                    <div className="flex space-x-4">
                      <a href="#" className="w-10 h-10 bg-neutral-100 rounded-full flex items-center justify-center text-neutral-600 hover:bg-primary hover:text-white transition-colors">
                        <i className="fab fa-facebook-f"></i>
                      </a>
                      <a href="#" className="w-10 h-10 bg-neutral-100 rounded-full flex items-center justify-center text-neutral-600 hover:bg-primary hover:text-white transition-colors">
                        <i className="fab fa-twitter"></i>
                      </a>
                      <a href="#" className="w-10 h-10 bg-neutral-100 rounded-full flex items-center justify-center text-neutral-600 hover:bg-primary hover:text-white transition-colors">
                        <i className="fab fa-linkedin-in"></i>
                      </a>
                      <a href="#" className="w-10 h-10 bg-neutral-100 rounded-full flex items-center justify-center text-neutral-600 hover:bg-primary hover:text-white transition-colors">
                        <i className="fab fa-instagram"></i>
                      </a>
                    </div>
                  </div>
                </motion.div>
                
                {/* Quick Inquiry */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  className="bg-white rounded-xl shadow-md p-6 border border-neutral-200"
                >
                  <div className="flex items-center mb-4">
                    <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center text-primary">
                      <i className="fas fa-paper-plane text-xl"></i>
                    </div>
                    <h3 className="text-xl font-semibold ml-4">Quick Inquiry</h3>
                  </div>
                  <ContactForm />
                </motion.div>
              </div>
            </div>
          </section>

          {/* Social Channels */}
          <section className="py-16 bg-neutral-50">
            <div className="container mx-auto px-4">
              <h2 className="text-3xl font-bold mb-12 text-center">Connect With Us</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
                {[
                  {
                    icon: "fab fa-whatsapp",
                    color: "#25D366",
                    platform: "WhatsApp",
                    link: "https://wa.me/1234567890"
                  },
                  {
                    icon: "fab fa-facebook-messenger",
                    color: "#0084FF",
                    platform: "Messenger",
                    link: "https://m.me/nepalai"
                  },
                  {
                    icon: "fab fa-instagram",
                    color: "#E1306C",
                    platform: "Instagram",
                    link: "https://instagram.com/nepalai"
                  },
                  {
                    icon: "fab fa-linkedin",
                    color: "#0077B5",
                    platform: "LinkedIn",
                    link: "https://linkedin.com/company/nepalai"
                  },
                  {
                    icon: "fab fa-telegram",
                    color: "#0088CC",
                    platform: "Telegram",
                    link: "https://t.me/nepalai"
                  }
                ].map((channel, index) => (
                  <motion.a
                    key={index}
                    href={channel.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="flex items-center p-4 rounded-lg hover:shadow-md transition-all"
                    style={{ backgroundColor: channel.color, color: "white" }}
                  >
                    <i className={`${channel.icon} text-2xl mr-4`}></i>
                    <div>
                      <div className="font-medium">{channel.platform}</div>
                      <div className="text-sm opacity-90">Connect with us</div>
                    </div>
                  </motion.a>
                ))}
              </div>
            </div>
          </section>

          {/* FAQ Section */}
          <section className="py-16">
            <div className="container mx-auto px-4">
              <h2 className="text-3xl font-bold mb-12 text-center">Frequently Asked Questions</h2>
              
              <div className="max-w-3xl mx-auto divide-y divide-neutral-200">
                {[
                  {
                    question: "What services does NepalAI offer?",
                    answer: "NepalAI offers a comprehensive range of AI services including AI Automation, Software Development, Consulting, and custom industry-specific solutions."
                  },
                  {
                    question: "How can I request a custom AI solution?",
                    answer: "You can request a custom AI solution through our 'Let's Discuss' page or by directly contacting our team via email or phone."
                  },
                  {
                    question: "Do you offer services internationally?",
                    answer: "Yes, while we're based in Kathmandu, Nepal, we provide AI services to clients globally with remote collaboration and support."
                  },
                  {
                    question: "What industries do you specialize in?",
                    answer: "We have experience across various industries including healthcare, finance, retail, manufacturing, and enterprise solutions."
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

export default ContactPage;
