'use client';

import { useEffect, useRef } from 'react';
import styles from './CursorGlow.module.css';

export default function CursorGlow() {
  const glowRef = useRef(null);
  const pos = useRef({ x: -500, y: -500 });
  const raf = useRef(null);

  useEffect(() => {
    const move = e => {
      pos.current = { x: e.clientX, y: e.clientY };
    };
    window.addEventListener('mousemove', move);

    const tick = () => {
      if (glowRef.current) {
        glowRef.current.style.transform = `translate(${pos.current.x - 200}px, ${pos.current.y - 200}px)`;
      }
      raf.current = requestAnimationFrame(tick);
    };
    raf.current = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener('mousemove', move);
      cancelAnimationFrame(raf.current);
    };
  }, []);

  return <div ref={glowRef} className={styles.glow} aria-hidden="true" />;
}
