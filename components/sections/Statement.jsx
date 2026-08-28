'use client';

import { useEffect, useRef } from 'react';
import styles from './Statement.module.css';

export default function Statement() {
  const sectionRef = useRef(null);
  const phase1Ref = useRef(null);
  const phase2Ref = useRef(null);
  const rafRef = useRef(null);

  useEffect(() => {
    const onScroll = () => {
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

      // Hide navbar when user enters this pure black statement section
      const isInside = rect.top <= 100 && rect.bottom >= windowHeight * 0.4;
      if (isInside) {
        document.body.setAttribute('data-statement-active', 'true');
      } else {
        document.body.removeAttribute('data-statement-active');
      }

      // ─── Phase 1: "¿No tienes página? — La creo." (progress 0.0 -> 0.48) ───
      if (phase1Ref.current) {
        let opacity1 = 0;
        let scale1 = 0.9;
        let blur1 = 8;
        let transY1 = 40;

        if (progress < 0.45) {
          if (progress < 0.12) {
            // Rising in & unblurring
            const t = progress / 0.12;
            opacity1 = t;
            scale1 = 0.9 + t * 0.1;
            blur1 = (1 - t) * 8;
            transY1 = (1 - t) * 30;
          } else if (progress < 0.32) {
            // Full spotlight hold
            opacity1 = 1;
            scale1 = 1.0;
            blur1 = 0;
            transY1 = 0;
          } else {
            // Rapid exit upwards
            const t = (progress - 0.32) / 0.13;
            opacity1 = 1 - t;
            scale1 = 1.0 + t * 0.08;
            blur1 = t * 10;
            transY1 = -t * 40;
          }
        } else {
          opacity1 = 0;
        }

        phase1Ref.current.style.opacity = `${opacity1}`;
        phase1Ref.current.style.transform = `translate3d(0, ${transY1}px, 0) scale(${scale1})`;
        phase1Ref.current.style.filter = blur1 > 0.1 ? `blur(${blur1}px)` : 'none';
        phase1Ref.current.style.pointerEvents = opacity1 > 0.5 ? 'auto' : 'none';
      }

      // ─── Phase 2: "¿Sí tienes? — Yo la mejoro." (progress 0.50 -> 0.98) ───
      if (phase2Ref.current) {
        let opacity2 = 0;
        let scale2 = 0.9;
        let blur2 = 8;
        let transY2 = 40;

        if (progress >= 0.48) {
          if (progress < 0.62) {
            // Rapid entrance
            const t = (progress - 0.48) / 0.14;
            opacity2 = t;
            scale2 = 0.9 + t * 0.1;
            blur2 = (1 - t) * 8;
            transY2 = (1 - t) * 30;
          } else if (progress < 0.84) {
            // Full spotlight hold
            opacity2 = 1;
            scale2 = 1.0;
            blur2 = 0;
            transY2 = 0;
          } else {
            // Smooth exit into Projects section
            const t = (progress - 0.84) / 0.16;
            opacity2 = 1 - t;
            scale2 = 1.0 + t * 0.06;
            blur2 = t * 8;
            transY2 = -t * 30;
          }
        } else {
          opacity2 = 0;
        }

        phase2Ref.current.style.opacity = `${opacity2}`;
        phase2Ref.current.style.transform = `translate3d(0, ${transY2}px, 0) scale(${scale2})`;
        phase2Ref.current.style.filter = blur2 > 0.1 ? `blur(${blur2}px)` : 'none';
        phase2Ref.current.style.pointerEvents = opacity2 > 0.5 ? 'auto' : 'none';
      }
    };

    const handleScroll = () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      rafRef.current = requestAnimationFrame(onScroll);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleScroll, { passive: true });
    onScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
      document.body.removeAttribute('data-statement-active');
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return (
    <section id="statement" ref={sectionRef} className={styles.statementSection}>
      <div className={styles.stickyTrack}>
        <div className={styles.overlayBlack} />

        <div className={styles.container}>
          {/* Statement Phase 1 */}
          <div ref={phase1Ref} className={styles.statementBox}>
            <p className={styles.question}>¿No tienes página?</p>
            <h2 className={styles.punchline}>
              La creo<span className={styles.accentDot}>.</span>
            </h2>
          </div>

          {/* Statement Phase 2 */}
          <div ref={phase2Ref} className={styles.statementBox}>
            <p className={styles.question}>¿Sí tienes?</p>
            <h2 className={styles.punchline}>
              Yo la mejoro<span className={styles.accentDot}>.</span>
            </h2>
          </div>
        </div>
      </div>
    </section>
  );
}
