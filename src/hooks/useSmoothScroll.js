import { useEffect, useRef, useState } from 'react';

export const useSmoothScroll = (smoothness = 0.1) => {
  const [scrollY, setScrollY] = useState(0);
  const currentScroll = useRef(0);
  const targetScroll = useRef(0);
  const rafId = useRef(null);

  useEffect(() => {
    let scrolling = false;

    const handleWheel = (e) => {
      e.preventDefault();
      targetScroll.current += e.deltaY * 1.5; // Scroll multiplier
      targetScroll.current = Math.max(
        0,
        Math.min(
          targetScroll.current,
          document.documentElement.scrollHeight - window.innerHeight
        )
      );
      
      if (!scrolling) {
        scrolling = true;
        smoothScroll();
      }
    };

    const smoothScroll = () => {
      // Lerp: current += (target - current) * smoothness
      currentScroll.current += (targetScroll.current - currentScroll.current) * smoothness;

      // Apply scroll
      window.scrollTo(0, currentScroll.current);
      setScrollY(currentScroll.current);

      // Continue if not close enough to target
      if (Math.abs(targetScroll.current - currentScroll.current) > 0.5) {
        rafId.current = requestAnimationFrame(smoothScroll);
      } else {
        scrolling = false;
        currentScroll.current = targetScroll.current;
        window.scrollTo(0, currentScroll.current);
        setScrollY(currentScroll.current);
      }
    };

    // Initial scroll position
    targetScroll.current = window.scrollY;
    currentScroll.current = window.scrollY;

    // Listen to wheel events
    window.addEventListener('wheel', handleWheel, { passive: false });

    // Handle manual scrollbar dragging
    const handleScroll = () => {
      if (!scrolling) {
        targetScroll.current = window.scrollY;
        currentScroll.current = window.scrollY;
        setScrollY(window.scrollY);
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('wheel', handleWheel);
      window.removeEventListener('scroll', handleScroll);
      if (rafId.current) {
        cancelAnimationFrame(rafId.current);
      }
    };
  }, [smoothness]);

  return scrollY;
};

