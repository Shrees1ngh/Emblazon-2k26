import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

export default function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);

    /* After route change, give the new page a frame to mount,
       then tell ScrollTrigger the world has changed. */
    const id = requestAnimationFrame(() => {
      ScrollTrigger.refresh(true);
    });

    return () => cancelAnimationFrame(id);
  }, [pathname]);

  return null;
}
