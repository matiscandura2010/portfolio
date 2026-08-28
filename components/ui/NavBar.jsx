'use client';

import { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import styles from './NavBar.module.css';

const GooeyNav = dynamic(() => import('@/components/react-bits/GooeyNav'), { ssr: false });

const SECTIONS = ['hero', 'about', 'services', 'projects', 'contact'];

export default function NavBar() {
  const [scrolled, setScrolled] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);

  const handleClick = (e, href) => {
    e.preventDefault();
    const id = href.replace('#', '');
    const targetEl = document.getElementById(id);
    if (targetEl) {
      targetEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const navItems = [
    { label: 'Inicio', href: '#hero', onClick: e => handleClick(e, '#hero') },
    { label: 'Sobre mí', href: '#about', onClick: e => handleClick(e, '#about') },
    { label: 'Servicios', href: '#services', onClick: e => handleClick(e, '#services') },
    { label: 'Proyectos', href: '#projects', onClick: e => handleClick(e, '#projects') },
    { label: 'Contacto', href: '#contact', onClick: e => handleClick(e, '#contact') },
  ];

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 60);

      // Track active section based on scroll position
      const scrollPos = window.scrollY + 280;
      for (let i = SECTIONS.length - 1; i >= 0; i--) {
        const el = document.getElementById(SECTIONS[i]);
        if (el && scrollPos >= el.offsetTop) {
          setActiveIndex(i);
          break;
        }
      }
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll(); // initial check

    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header className={`${styles.nav} ${scrolled ? styles.scrolled : ''}`}>
      <div className={styles.inner}>
        <a href="#hero" className={styles.logo} onClick={e => handleClick(e, '#hero')}>
          <span className={styles.logoMark}>MS</span>
          <span className={styles.logoInfo}>
            <span className={styles.logoName}>Matias Scandura</span>
            <span className={styles.disponible}>
              <span className={styles.disponibleDot} />
              Disponible ahora
            </span>
          </span>
        </a>

        <div className={styles.gooeyWrapper}>
          <GooeyNav
            items={navItems}
            activeIndex={activeIndex}
            onIndexChange={setActiveIndex}
            particleCount={12}
            particleDistances={[80, 10]}
            particleR={90}
            animationTime={500}
            timeVariance={250}
            colors={[1, 2, 3, 1, 2, 4]}
          />
        </div>

        <a href="#contact" className={styles.cta} onClick={e => handleClick(e, '#contact')}>
          Hablemos
        </a>
      </div>
    </header>
  );
}
