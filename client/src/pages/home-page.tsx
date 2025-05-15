import { useEffect } from "react";
import { Helmet } from "react-helmet";
import Navbar from "@/components/layout/Navbar";
import Hero from "@/components/home/Hero";
import ServicesPreview from "@/components/home/ServicesPreview";
import SolutionsPreview from "@/components/home/SolutionsPreview";
import ResourcesPreview from "@/components/home/ResourcesPreview";
import AboutPreview from "@/components/home/AboutPreview";
import AIStatsPreview from "@/components/home/AIStatsPreview";
import ContactPreview from "@/components/home/ContactPreview";

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
        <title>GD AI Synergy - Pioneering AI Solutions from Kathmandu</title>
        <meta name="description" content="GD AI Synergy transforms businesses through cutting-edge AI automation, custom software development, and strategic consulting. Build your future with Nepal's premier AI innovation partner." />
        <meta property="og:title" content="GD AI Synergy - Pioneering AI Solutions from Kathmandu" />
        <meta property="og:description" content="Transform your business with cutting-edge AI solutions from Nepal's premier AI innovation partner." />
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
          <AIStatsPreview />
          <ContactPreview />
        </main>
      </div>
    </>
  );
};

export default HomePage;
