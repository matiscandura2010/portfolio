'use client';

import { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';

const SplashCursor = dynamic(() => import('@/components/react-bits/SplashCursor'), { ssr: false });

export default function ScrollSplashCursor() {
  const [showSplash, setShowSplash] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const el = document.getElementById('projects');
      if (el) {
        const rect = el.getBoundingClientRect();
        // Activate SplashCursor ONLY when user is scrolling over the Projects ("Mis Obras") section
        const isVisible = rect.top < window.innerHeight * 0.8 && rect.bottom > window.innerHeight * 0.2;
        setShowSplash(isVisible);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleScroll);
    handleScroll(); // Initial check

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
    };
  }, []);

  if (!showSplash) return null;

  return (
    <SplashCursor
      SIM_RESOLUTION={128}
      DYE_RESOLUTION={1024}
      DENSITY_DISSIPATION={3.5}
      VELOCITY_DISSIPATION={2}
      PRESSURE={0.1}
      PRESSURE_ITERATIONS={20}
      CURL={3}
      SPLAT_RADIUS={0.2}
      SPLAT_FORCE={6000}
      SHADING={true}
      COLOR_UPDATE_SPEED={10}
      RAINBOW_MODE={true}
    />
  );
}
