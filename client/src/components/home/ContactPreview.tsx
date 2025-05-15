import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Link } from 'wouter';
import { MapPin, Phone, Mail, Clock, MessageCircle } from 'lucide-react';

const ContactPreview = () => {
  return (
    <section id="contact" className="py-20 md:py-32 px-4 bg-gradient-to-b from-[#0A0F1C] to-[#1A1F2C] relative overflow-hidden">
      {/* Modern gradient background */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-gradient-to-br from-blue-600/20 to-purple-600/20 rounded-full blur-[120px] transform translate-x-1/2 -translate-y-1/2"></div>
        <div className="absolute bottom-0 left-0 w-[800px] h-[800px] bg-gradient-to-tr from-emerald-600/20 to-blue-600/20 rounded-full blur-[120px] transform -translate-x-1/2 translate-y-1/2"></div>
        <div className="absolute inset-0 bg-[url('/assets/images/grid.svg')] opacity-5"></div>
      </div>

      <div className="container mx-auto relative z-10 max-w-7xl">
        <motion.div 
          className="text-center mb-20"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <h2 className="text-5xl md:text-6xl font-bold mb-8 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-indigo-500 to-purple-600 tracking-tight">
            Let's Build Something Amazing
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Ready to transform your business with cutting-edge AI solutions? Our team of experts is here to help you navigate the future of technology.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-20">
          {/* Location */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="group relative bg-gradient-to-br from-white/5 to-white/[0.02] backdrop-blur-xl p-8 rounded-3xl border border-white/10 hover:border-blue-500/30 transition-all duration-300 cursor-pointer overflow-hidden"
            onClick={() => window.open('https://g.co/kgs/afFgRqZ', '_blank')}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <div className="relative">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-500/20 to-indigo-500/20 rounded-2xl flex items-center justify-center text-blue-400 mb-6 group-hover:scale-110 transition-transform duration-300">
                <MapPin className="w-8 h-8" />
              </div>
              <h3 className="text-2xl font-semibold mb-4 text-white group-hover:text-blue-400 transition-colors">Our Location</h3>
              <p className="text-gray-400 text-lg leading-relaxed group-hover:text-gray-300 transition-colors">
                Kathmandu, Nepal<br />
                New Baneshwor, Kathmandu<br />
                Nepal
              </p>
              <div className="mt-4 text-blue-400 hover:text-blue-300 font-medium inline-flex items-center group/link">
                View on Maps
                <span className="ml-2 transform group-hover/link:translate-x-1 transition-transform">→</span>
              </div>
            </div>
          </motion.div>

          {/* Contact */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="group relative bg-gradient-to-br from-white/5 to-white/[0.02] backdrop-blur-xl p-8 rounded-3xl border border-white/10 hover:border-purple-500/30 transition-all duration-300"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-pink-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <div className="relative">
              <div className="w-16 h-16 bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-2xl flex items-center justify-center text-purple-400 mb-6 group-hover:scale-110 transition-transform duration-300">
                <Phone className="w-8 h-8" />
              </div>
              <h3 className="text-2xl font-semibold mb-4 text-white group-hover:text-purple-400 transition-colors">Contact Us</h3>
              <p className="text-gray-400 text-lg leading-relaxed group-hover:text-gray-300 transition-colors">
                Phone: +977 9767952043<br />
                WhatsApp: +977 9767952043<br />
                <a href="tel:9779767952043" className="text-purple-400 hover:text-purple-300 font-medium inline-flex items-center mt-2 group/link">
                  Call Now
                  <span className="ml-2 transform group-hover/link:translate-x-1 transition-transform">→</span>
                </a>
              </p>
            </div>
          </motion.div>

          {/* Email */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="group relative bg-gradient-to-br from-white/5 to-white/[0.02] backdrop-blur-xl p-8 rounded-3xl border border-white/10 hover:border-emerald-500/30 transition-all duration-300"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/10 to-teal-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <div className="relative">
              <div className="w-16 h-16 bg-gradient-to-br from-emerald-500/20 to-teal-500/20 rounded-2xl flex items-center justify-center text-emerald-400 mb-6 group-hover:scale-110 transition-transform duration-300">
                <Mail className="w-8 h-8" />
              </div>
              <h3 className="text-2xl font-semibold mb-4 text-white group-hover:text-emerald-400 transition-colors">Email Us</h3>
              <p className="text-gray-400 text-lg leading-relaxed group-hover:text-gray-300 transition-colors">
                info@gdaisynergy.com<br />
                
                <a href="mailto:info@gdaisynergy.com" className="text-emerald-400 hover:text-emerald-300 font-medium inline-flex items-center mt-2 group/link">
                  Send Email
                  <span className="ml-2 transform group-hover/link:translate-x-1 transition-transform">→</span>
                </a>
              </p>
            </div>
          </motion.div>

          {/* Hours */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="group relative bg-gradient-to-br from-white/5 to-white/[0.02] backdrop-blur-xl p-8 rounded-3xl border border-white/10 hover:border-amber-500/30 transition-all duration-300"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-amber-500/10 to-orange-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <div className="relative">
              <div className="w-16 h-16 bg-gradient-to-br from-amber-500/20 to-orange-500/20 rounded-2xl flex items-center justify-center text-amber-400 mb-6 group-hover:scale-110 transition-transform duration-300">
                <Clock className="w-8 h-8" />
              </div>
              <h3 className="text-2xl font-semibold mb-4 text-white group-hover:text-amber-400 transition-colors">Working Hours</h3>
              <p className="text-gray-400 text-lg leading-relaxed group-hover:text-gray-300 transition-colors">
                Sunday - Friday: 9:00 AM - 6:00 PM<br />
                Saturday: Closed
              </p>
            </div>
          </motion.div>
        </div>

        {/* Social Media Links */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="text-center"
        >
          <h3 className="text-4xl font-bold mb-12 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-indigo-500 to-purple-600">
            Connect With Us
          </h3>
          <div className="flex flex-wrap justify-center gap-8">
            {/* Facebook */}
            <a 
              href="https://www.facebook.com/share/198bKBTrCt/" 
              target="_blank"
              rel="noopener noreferrer"
              className="group relative w-20 h-20 bg-gradient-to-br from-[#1877F2]/10 to-[#1877F2]/5 rounded-2xl flex items-center justify-center backdrop-blur-xl border border-[#1877F2]/20 hover:border-[#1877F2]/40 transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-[#1877F2]/20"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-[#1877F2]/20 to-[#1877F2]/10 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <i className="fab fa-facebook-f text-3xl text-[#1877F2] transform group-hover:scale-110 transition-transform relative z-10"></i>
              <span className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 text-sm font-medium text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                Facebook
              </span>
            </a>

            {/* Twitter */}
            <a 
              href="https://x.com/GDAisynergy_" 
              target="_blank"
              rel="noopener noreferrer"
              className="group relative w-20 h-20 bg-gradient-to-br from-[#1DA1F2]/10 to-[#1DA1F2]/5 rounded-2xl flex items-center justify-center backdrop-blur-xl border border-[#1DA1F2]/20 hover:border-[#1DA1F2]/40 transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-[#1DA1F2]/20"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-[#1DA1F2]/20 to-[#1DA1F2]/10 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <i className="fab fa-twitter text-3xl text-[#1DA1F2] transform group-hover:scale-110 transition-transform relative z-10"></i>
              <span className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 text-sm font-medium text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                Twitter
              </span>
            </a>

            {/* LinkedIn */}
            <a 
              href="https://www.linkedin.com/company/gd-ai-synergy" 
              target="_blank"
              rel="noopener noreferrer"
              className="group relative w-20 h-20 bg-gradient-to-br from-[#0A66C2]/10 to-[#0A66C2]/5 rounded-2xl flex items-center justify-center backdrop-blur-xl border border-[#0A66C2]/20 hover:border-[#0A66C2]/40 transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-[#0A66C2]/20"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-[#0A66C2]/20 to-[#0A66C2]/10 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <i className="fab fa-linkedin-in text-3xl text-[#0A66C2] transform group-hover:scale-110 transition-transform relative z-10"></i>
              <span className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 text-sm font-medium text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                LinkedIn
              </span>
            </a>

            {/* Instagram */}
            <a 
              href="https://www.instagram.com/gdaisynergy_/" 
              target="_blank"
              rel="noopener noreferrer"
              className="group relative w-20 h-20 bg-gradient-to-br from-[#E4405F]/10 to-[#E4405F]/5 rounded-2xl flex items-center justify-center backdrop-blur-xl border border-[#E4405F]/20 hover:border-[#E4405F]/40 transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-[#E4405F]/20"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-[#E4405F]/20 to-[#E4405F]/10 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <i className="fab fa-instagram text-3xl text-[#E4405F] transform group-hover:scale-110 transition-transform relative z-10"></i>
              <span className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 text-sm font-medium text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                Instagram
              </span>
            </a>

            {/* WhatsApp */}
            <a 
              href="https://wa.me/9779767952043" 
              target="_blank"
              rel="noopener noreferrer"
              className="group relative w-20 h-20 bg-gradient-to-br from-[#25D366]/10 to-[#25D366]/5 rounded-2xl flex items-center justify-center backdrop-blur-xl border border-[#25D366]/20 hover:border-[#25D366]/40 transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-[#25D366]/20"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-[#25D366]/20 to-[#25D366]/10 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <i className="fab fa-whatsapp text-3xl text-[#25D366] transform group-hover:scale-110 transition-transform relative z-10"></i>
              <span className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 text-sm font-medium text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                WhatsApp
              </span>
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ContactPreview; 