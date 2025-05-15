import { useEffect } from 'react';
import { useLocation } from 'wouter';

export const useScrollToTop = () => {
  const [location] = useLocation();

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  }, [location]); // This will run whenever the location changes
}; 