import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export default function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    // Jaise hi URL (pathname) change hoga, window top par scroll ho jayegi
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth' // Smooth scroll ke liye (optional, agar instant chahiye to 'auto' kar dein)
    });
  }, [pathname]);

  // Ye component UI me kuch render nahi karega, bas background me kaam karega
  return null; 
}