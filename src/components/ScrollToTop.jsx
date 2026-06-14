import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export default function ScrollToTop() {
  // Yeh current URL (path) ka pata lagata hai
  const { pathname } = useLocation();

  useEffect(() => {
    // Jaise hi path change hoga, window top par scroll ho jayegi
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'instant' // 'instant' se page turant top par aayega bina delay ke
    });
  }, [pathname]);

  // Yeh component screen par kuch dikhata nahi hai, bas background mein kaam karta hai
  return null; 
}