import { useEffect } from "react";
import { Helmet } from "react-helmet";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Hero from "@/components/home/Hero";
import ServicesPreview from "@/components/home/ServicesPreview";
import SolutionsPreview from "@/components/home/SolutionsPreview";
import ResourcesPreview from "@/components/home/ResourcesPreview";
import AboutPreview from "@/components/home/AboutPreview";

const HomePage = () => {
  // Scroll to section if hash is present in URL
  useEffect(() => {
    const hash = window.location.hash;
    if (hash) {
      const element = document.querySelector(hash);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  }, []);

  return (
    <>
      <Helmet>
        <title>NepalAI - Pioneering AI Solutions from Kathmandu</title>
        <meta name="description" content="NepalAI transforms businesses through cutting-edge AI automation, custom software development, and strategic consulting. Build your future with Nepal's premier AI innovation partner." />
        <meta property="og:title" content="NepalAI - Pioneering AI Solutions from Kathmandu" />
        <meta property="og:description" content="Transform your business with cutting-edge AI solutions developed by Nepal's premier AI innovation partner." />
        <meta property="og:type" content="website" />
      </Helmet>

      <div className="min-h-screen flex flex-col">
        <Navbar />
        
        <main className="flex-grow">
          <Hero />
          <ServicesPreview />
          <SolutionsPreview />
          <ResourcesPreview />
          <AboutPreview />
        </main>
        
        <Footer />
      </div>
    </>
  );
};

export default HomePage;
