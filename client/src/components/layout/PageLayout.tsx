import { ReactNode } from 'react';
import { useScrollToTop } from '@/hooks/use-scroll-to-top';
import Navbar from './Navbar';
import Footer from './Footer';

type PageLayoutProps = {
  children: ReactNode;
};

const PageLayout = ({ children }: PageLayoutProps) => {
  // This will handle scrolling to top on navigation
  useScrollToTop();

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        {children}
      </main>
      <Footer />
    </div>
  );
};

export default PageLayout; 