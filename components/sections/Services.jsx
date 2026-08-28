'use client';

import { useEffect, useRef, useState, useCallback } from 'react';
import dynamic from 'next/dynamic';
import styles from './Services.module.css';

const ScrollFloat = dynamic(() => import('@/components/react-bits/ScrollFloat'), { ssr: false });
const Ferrofluid  = dynamic(() => import('@/components/react-bits/Ferrofluid'),  { ssr: false });

const services = [
  {
    id: 'landing',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
      </svg>
    ),
    title: 'Landing Pages & Páginas de Ventas',
    tag: 'Alta Conversión',
    description: 'Páginas diseñadas estratégicamente para captar clientes y vender. Animaciones de alto impacto, propuesta de valor clara y llamadas a la acción optimizadas.',
    features: ['Diseño persuasivo', 'Optimizada para móviles', 'Velocidad de carga ultra rápida'],
    colorVariant: 'yellow',
  },
  {
    id: 'ecommerce',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <circle cx="9" cy="21" r="1" /><circle cx="20" cy="21" r="1" />
        <path d="M1 1h4l2.68 13.39a2 2 0 002 1.61h9.72a2 2 0 002-1.61L23 6H6" />
      </svg>
    ),
    title: 'E-commerce & Tiendas Online',
    tag: 'Shopify / Custom',
    description: 'Tu tienda en línea lista para recibir pagos y gestionar pedidos. Diseño a medida para destacar tus productos y maximizar ventas.',
    features: ['Pasarelas de pago integradas', 'Catálogo interactivo', 'Panel de administración fácil'],
    colorVariant: 'blue',
  },
  {
    id: 'local',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9" />
        <path d="M13.73 21a2 2 0 01-3.46 0" />
      </svg>
    ),
    title: 'Sitios para Negocios Locales',
    tag: 'Restaurantes, Clínicas, Ópticas',
    description: 'Sitios web diseñados para atraer clientes de tu ciudad. Menúes interactivos, sistemas de reservas, mapas de ubicación y reservas de turnos.',
    features: ['Integración con Google Maps', 'Menú interactivo / Reservas', 'Optimización SEO local'],
    colorVariant: 'pink',
  },
  {
    id: 'corporate',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <rect x="2" y="3" width="20" height="14" rx="2" ry="2" />
        <line x1="8" y1="21" x2="16" y2="21" /><line x1="12" y1="17" x2="12" y2="21" />
      </svg>
    ),
    title: 'Sitios Corporativos e Informativos',
    tag: 'Empresas & Servicios',
    description: 'Páginas institucionales que transmiten profesionalismo y confianza. Presentación de servicios, portafolio de trabajos y canales de soporte directo.',
    features: ['Identidad de marca profesional', 'Formularios y WhatsApp directo', 'Arquitectura SEO avanzada'],
    colorVariant: 'default',
  },
  {
    id: 'ai',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M12 2a10 10 0 0110 10c0 5.523-4.477 10-10 10S2 17.523 2 12A10 10 0 0112 2z" />
        <path d="M12 8v8M8 12h8" />
      </svg>
    ),
    title: 'Web Apps & Agentes de IA',
    tag: 'Automatización & LLMs',
    description: 'Desarrollo de aplicaciones web modernas potenciadas con inteligencia artificial, chatbots personalizados, automatizaciones e integraciones de API.',
    features: ['Modelos LLM & Chatbots', 'APIs REST & Node.js', 'Experiencias interactivas avanzadas'],
    colorVariant: 'blue',
  },
];

const easeOutCubic = x => 1 - Math.pow(1 - x, 3);
const easeInOutQuad = x => x < 0.5 ? 2 * x * x : 1 - Math.pow(-2 * x + 2, 2) / 2;

export default function Services() {
  const sectionRef = useRef(null);
  const cardRefs = useRef([]);
  const rafRef = useRef(null);

  const updateCards = useCallback(() => {
    if (!sectionRef.current) return;

    const rect = sectionRef.current.getBoundingClientRect();
    const scrollY = window.scrollY;
    const sectionTop = rect.top + scrollY;
    const sectionHeight = sectionRef.current.offsetHeight;
    const windowHeight = window.innerHeight;
    const maxScroll = sectionHeight - windowHeight;

    if (maxScroll <= 0) return;

    const scrollOffset = scrollY - sectionTop;
    const progress = Math.min(Math.max(scrollOffset / maxScroll, 0), 1);

    const N = services.length;
    // Each card occupies a slice of the global progress
    const cardStep = 1 / N;

    cardRefs.current.forEach((cardEl, i) => {
      if (!cardEl) return;

      const tIn     = i * cardStep;
      const tCenter = i * cardStep + cardStep * 0.35;
      const tHold   = i * cardStep + cardStep * 0.65;
      const tStack  = (i + 1) * cardStep;

      let scale = 0.40;
      let translateY = 100; // in vh or px
      let opacity = 0;
      let blur = 0;
      let brightness = 1;
      let pointerEvents = 'none';

      const targetStackY = -110 + i * 22; // Each next card stacks slightly lower, so header text is never covered

      if (progress < tIn) {
        // Before entering: small and low
        scale = 0.40;
        translateY = 70; // 70vh below
        opacity = 0;
      } else if (progress >= tIn && progress < tCenter) {
        // Phase 1: Rising from bottom (scale 40% -> 95%)
        const local = (progress - tIn) / (tCenter - tIn);
        const e = easeOutCubic(local);
        scale = 0.40 + (0.95 - 0.40) * e;
        translateY = 70 * (1 - e); // from 70vh to 0
        opacity = Math.min(1, 0.2 + e * 0.8);
        if (local > 0.5) pointerEvents = 'auto';
      } else if (progress >= tCenter && progress < tHold) {
        // Phase 2: Centered in Hero Focus (90-95% of usable screen)
        scale = 0.95;
        translateY = 0;
        opacity = 1;
        pointerEvents = 'auto';
      } else if (progress >= tHold && progress < tStack) {
        // Phase 3: Moving to top stack (scale 95% -> 55%, positioned at targetStackY)
        const local = (progress - tHold) / (tStack - tHold);
        const e = easeInOutQuad(local);
        scale = 0.95 - (0.95 - 0.55) * e;
        translateY = targetStackY * e; // from 0 to targetStackY
        opacity = 1;
        pointerEvents = 'auto';
      } else {
        // Phase 4: Stacked in place. Subsequent cards stack on top of it slightly lower!
        let newerCardsCount = 0;
        for (let j = i + 1; j < N; j++) {
          const jHold = j * cardStep + cardStep * 0.65;
          if (progress >= jHold) {
            const jStack = (j + 1) * cardStep;
            const jLocal = Math.min(1, (progress - jHold) / (jStack - jHold));
            newerCardsCount += easeInOutQuad(jLocal);
          }
        }

        scale = 0.55;
        translateY = targetStackY; // Stays fixed at its step, doesn't push up
        opacity = Math.max(0.6, 1 - newerCardsCount * 0.08);
        brightness = Math.max(0.75, 1 - newerCardsCount * 0.07);
        blur = Math.min(1.2, newerCardsCount * 0.3);
        pointerEvents = newerCardsCount < 0.5 ? 'auto' : 'none';
      }

      // Convert translateY unit
      const isVh = progress < tCenter;
      const transYStr = isVh ? `${translateY}vh` : `${translateY}px`;

      cardEl.style.transform = `translate3d(-50%, calc(-50% + ${transYStr}), 0) scale(${scale})`;
      cardEl.style.opacity = `${opacity}`;
      cardEl.style.pointerEvents = pointerEvents;
      cardEl.style.zIndex = `${10 + i}`;
      cardEl.style.filter = blur > 0 || brightness < 1 ? `brightness(${brightness}) blur(${blur}px)` : '';
    });
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      rafRef.current = requestAnimationFrame(updateCards);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleScroll, { passive: true });
    updateCards();

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [updateCards]);

  return (
    <section id="services" ref={sectionRef} className={styles.services}>
      {/* Ferrofluid: magnetic liquid interactive background */}
      <div className={styles.ferrofluidWrapper}>
        <Ferrofluid
          colors={['#ffffff', '#ffffff', '#ffffff']}
          speed={0.5}
          scale={1}
          turbulence={1}
          fluidity={0.1}
          rimWidth={0.2}
          sharpness={3}
          shimmer={1}
          glow={2}
          flowDirection="down"
          opacity={1}
          mouseInteraction={true}
          mouseStrength={1}
          mouseRadius={0.3}
        />
      </div>

      {/* Sticky Viewport */}
      <div className={styles.stickyViewport}>
        <div className={styles.container}>
          {/* Header */}
          <div className={styles.header}>
            <div className={styles.label}>
              <span>03 — Lo que hago</span>
            </div>
            <div className={styles.titleWrapper}>
              <ScrollFloat
                animationDuration={1}
                ease="back.inOut(2)"
                scrollStart="center bottom+=40%"
                scrollEnd="bottom bottom-=40%"
                stagger={0.03}
              >
                Soluciones Web
              </ScrollFloat>
            </div>
            <p className={styles.subtitle}>
              Diseño y construyo cualquier tipo de sitio web adaptado a tu negocio — con
              código limpio, velocidad extrema y estética de nivel superior.
            </p>
          </div>

          {/* Cards Stage: central fixed stage for the stacking animation */}
          <div className={styles.cardsStage}>
            {services.map((s, i) => (
              <div
                key={s.id}
                ref={el => (cardRefs.current[i] = el)}
                className={styles.cardWrapper}
              >
                <div className={styles.serviceCard}>
                  <div className={styles.cardInner}>
                    <div className={styles.cardHeader}>
                      <div className={styles.iconBox}>{s.icon}</div>
                      <span className={styles.tagBadge}>{s.tag}</span>
                    </div>
                    <h3 className={styles.cardTitle}>{s.title}</h3>
                    <p className={styles.cardDesc}>{s.description}</p>
                    <ul className={styles.featureList}>
                      {s.features.map(f => (
                        <li key={f}>
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#5af78e" strokeWidth="3">
                            <polyline points="20 6 9 17 4 12" />
                          </svg>
                          {f}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
