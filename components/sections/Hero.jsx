'use client';

import dynamic from 'next/dynamic';
import styles from './Hero.module.css';

const BlurText = dynamic(() => import('@/components/react-bits/BlurText'), { ssr: false });
const Galaxy = dynamic(() => import('@/components/react-bits/Galaxy'), { ssr: false });
const ShapeGrid = dynamic(() => import('@/components/react-bits/ShapeGrid'), { ssr: false });
const WarpText = dynamic(() => import('@/components/react-bits/WarpText'), { ssr: false });

export default function Hero() {
  const scrollToProjects = () => {
    document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="hero" className={styles.hero}>
      {/* Background Layer 1: Galaxy */}
      <div className={styles.bgGalaxy}>
        <Galaxy
          mouseRepulsion={true}
          mouseInteraction={true}
          density={1.2}
          glowIntensity={0.6}
          saturation={0.8}
          hueShift={240}
          transparent={false}
        />
      </div>

      {/* Background Layer 2: ShapeGrid */}
      <div className={styles.bgShapeGrid}>
        <ShapeGrid
          speed={0.5}
          squareSize={40}
          direction="diagonal"
          borderColor="rgba(255, 255, 255, 0.05)"
          hoverFillColor="rgba(255, 255, 255, 0.12)"
          shape="square"
          hoverTrailAmount={5}
        />
      </div>

      {/* Blur overlay — only blurs Galaxy + ShapeGrid layers behind it */}
      <div className={styles.backgroundBlur} />

      {/* Content — z-index above blur overlay */}
      <div className={styles.content}>
        {/* Main headline — Desktop WebGL WarpText / Mobile Clean Static Typography */}
        <h1 className={styles.headline}>
          <div className={styles.desktopHeadline}>
            <WarpText
              text={"Matias\nScandura"}
              color="#f8f5ff"
              warpStrength={0.08}
              warpScale={1.7}
              speed={0.55}
              pointerInfluence={0.42}
              pointerStrength={0.38}
              refraction={0.018}
              ripple
              fontSize="clamp(4rem, 17vw, 15rem)"
              fontWeight={800}
              lineHeight={0.95}
              letterSpacing="-0.02em"
              style={{ height: '520px', width: '100%' }}
            />
          </div>
          <div className={styles.mobileHeadline}>
            <span className={styles.mobileName}>
              Matias<br />Scandura
            </span>
          </div>
        </h1>

        {/* Sub headline */}
        <BlurText
          text="Sitios web de alto nivel: Landing pages de venta, e-commerce, restaurantes, negocios locales e inteligencia artificial"
          delay={25}
          animateBy="words"
          direction="bottom"
          stepDuration={0.35}
          className={styles.sub}
        />

        {/* CTA buttons */}
        <div className={styles.actions}>
          <button id="hero-cta-projects" className={styles.btnPrimary} onClick={scrollToProjects}>
            Ver mi trabajo
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </button>
          <a
            id="hero-cta-contact"
            href="#contact"
            className={styles.btnSecondary}
            onClick={e => {
              e.preventDefault();
              document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
            }}
          >
            Hablemos
          </a>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className={styles.scrollIndicator} aria-hidden="true">
        <div className={styles.scrollLine} />
        <span className={styles.scrollLabel}>scroll</span>
      </div>
    </section>
  );
}
