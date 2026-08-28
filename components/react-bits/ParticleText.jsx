'use client';

import { useEffect, useRef, useState } from 'react';

/**
 * ParticleText – canvas-based particle text animation.
 * Particles form the text shape, scatter on trigger, and drift gently at rest.
 */
export default function ParticleText({
  text = 'Hello',
  particleSize = 2,
  density = 4,
  color = '#afafaf',
  highlightColor = '#ffffff',
  scatter = 180,
  gatherDuration = 1600,
  stagger = 420,
  pointerRepel = 40,
  repelRadius = 120,
  idleDrift = 0.3,
  trigger = 'hover',
  fontSize = 'clamp(3rem, 12vw, 8rem)',
  fontWeight = 800,
  fontFamily = 'inherit',
  glow = false,
}) {
  const canvasRef = useRef(null);
  const containerRef = useRef(null);
  const stateRef = useRef({
    particles: [],
    animId: null,
    mouse: { x: -9999, y: -9999 },
    gathered: true,
    scatterTimeout: null,
  });

  // Resolve clamp / CSS value to a pixel number for canvas
  function resolvePixelFontSize(cssFontSize) {
    const el = document.createElement('div');
    el.style.position = 'absolute';
    el.style.visibility = 'hidden';
    el.style.fontSize = cssFontSize;
    document.body.appendChild(el);
    const computed = parseFloat(getComputedStyle(el).fontSize);
    document.body.removeChild(el);
    return isNaN(computed) ? 80 : computed;
  }

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;
    const ctx = canvas.getContext('2d');
    const s = stateRef.current;

    let dpr = window.devicePixelRatio || 1;

    function buildParticles() {
      const rect = container.getBoundingClientRect();
      const W = rect.width || window.innerWidth;
      const H = rect.height || 200;

      canvas.style.width = W + 'px';
      canvas.style.height = H + 'px';
      canvas.width = W * dpr;
      canvas.height = H * dpr;
      ctx.scale(dpr, dpr);

      // Resolve font size
      const pxSize = resolvePixelFontSize(fontSize);
      const fontStr = `${fontWeight} ${pxSize}px ${fontFamily === 'inherit' ? 'sans-serif' : fontFamily}`;

      // Draw text off-screen to sample particle positions
      const offCanvas = document.createElement('canvas');
      offCanvas.width = W;
      offCanvas.height = H;
      const offCtx = offCanvas.getContext('2d');
      offCtx.fillStyle = '#fff';
      offCtx.font = fontStr;
      offCtx.textAlign = 'center';
      offCtx.textBaseline = 'middle';
      offCtx.fillText(text, W / 2, H / 2);

      const imageData = offCtx.getImageData(0, 0, W, H);
      const data = imageData.data;
      const step = Math.max(1, Math.round(6 / density));

      const particles = [];
      for (let y = 0; y < H; y += step) {
        for (let x = 0; x < W; x += step) {
          const idx = (y * W + x) * 4;
          if (data[idx + 3] > 128) {
            const offsetX = (Math.random() - 0.5) * scatter;
            const offsetY = (Math.random() - 0.5) * scatter;
            particles.push({
              // final resting position (gathered)
              tx: x,
              ty: y,
              // current position (scattered at start)
              x: x + offsetX,
              y: y + offsetY,
              // velocity for drift
              vx: 0,
              vy: 0,
              // random drift phase
              phase: Math.random() * Math.PI * 2,
              delay: Math.random() * stagger,
              gathered: false,
              t: 0,
            });
          }
        }
      }
      s.particles = particles;
      s.gathered = false;

      // After a short stagger start gathering
      setTimeout(() => {
        s.gathered = true;
      }, 100);
    }

    function easeOutExpo(t) {
      return t === 1 ? 1 : 1 - Math.pow(2, -10 * t);
    }

    let startTime = null;
    function animate(ts) {
      if (!startTime) startTime = ts;
      const elapsed = ts - startTime;

      ctx.clearRect(0, 0, canvas.width / dpr, canvas.height / dpr);

      const mouse = s.mouse;

      for (let i = 0; i < s.particles.length; i++) {
        const p = s.particles[i];

        if (s.gathered) {
          // Ease particle toward its target position
          const progress = Math.max(0, Math.min(1, (elapsed - p.delay) / gatherDuration));
          const ease = easeOutExpo(progress);
          p.x += (p.tx - p.x) * ease * 0.15;
          p.y += (p.ty - p.y) * ease * 0.15;
        } else {
          // Scatter: move toward scattered position
          p.x += p.vx;
          p.y += p.vy;
          p.vx *= 0.92;
          p.vy *= 0.92;
        }

        // Idle drift
        if (idleDrift > 0) {
          p.phase += 0.012;
          p.x += Math.sin(p.phase) * idleDrift * 0.3;
          p.y += Math.cos(p.phase * 0.7) * idleDrift * 0.2;
        }

        // Mouse repel
        const dx = p.x - mouse.x;
        const dy = p.y - mouse.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < repelRadius && dist > 0) {
          const force = (repelRadius - dist) / repelRadius;
          p.x += (dx / dist) * force * pointerRepel * 0.5;
          p.y += (dy / dist) * force * pointerRepel * 0.5;
        }

        // Draw particle
        const dx2 = p.x - p.tx;
        const dy2 = p.y - p.ty;
        const distFromHome = Math.sqrt(dx2 * dx2 + dy2 * dy2);
        const isClose = distFromHome < 4;

        ctx.beginPath();
        ctx.arc(p.x, p.y, particleSize, 0, Math.PI * 2);
        ctx.fillStyle = isClose ? highlightColor : color;

        if (glow) {
          ctx.shadowBlur = 6;
          ctx.shadowColor = isClose ? highlightColor : color;
        }
        ctx.fill();
        ctx.shadowBlur = 0;
      }

      s.animId = requestAnimationFrame(animate);
    }

    buildParticles();
    s.animId = requestAnimationFrame(animate);

    // --- Event handlers ---
    function onMouseMove(e) {
      const rect = canvas.getBoundingClientRect();
      s.mouse.x = e.clientX - rect.left;
      s.mouse.y = e.clientY - rect.top;
    }

    function onMouseLeave() {
      s.mouse.x = -9999;
      s.mouse.y = -9999;
    }

    function onPointerEnter() {
      if (trigger === 'hover') {
        // Scatter on hover
        s.gathered = false;
        s.particles.forEach((p) => {
          p.vx = (Math.random() - 0.5) * 4;
          p.vy = (Math.random() - 0.5) * 4;
        });
        clearTimeout(s.scatterTimeout);
        s.scatterTimeout = setTimeout(() => {
          startTime = null;
          s.gathered = true;
        }, 300);
      }
    }

    canvas.addEventListener('mousemove', onMouseMove);
    canvas.addEventListener('mouseleave', onMouseLeave);
    canvas.addEventListener('pointerenter', onPointerEnter);

    const ro = new ResizeObserver(() => {
      dpr = window.devicePixelRatio || 1;
      startTime = null;
      buildParticles();
    });
    ro.observe(container);

    return () => {
      cancelAnimationFrame(s.animId);
      canvas.removeEventListener('mousemove', onMouseMove);
      canvas.removeEventListener('mouseleave', onMouseLeave);
      canvas.removeEventListener('pointerenter', onPointerEnter);
      ro.disconnect();
      clearTimeout(s.scatterTimeout);
    };
  }, [text, particleSize, density, color, highlightColor, scatter, gatherDuration, stagger, pointerRepel, repelRadius, idleDrift, trigger, fontSize, fontWeight, fontFamily, glow]);

  return (
    <div
      ref={containerRef}
      style={{
        width: '100%',
        height: '100%',
        minHeight: '120px',
        position: 'relative',
      }}
    >
      <canvas
        ref={canvasRef}
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          display: 'block',
        }}
      />
    </div>
  );
}
