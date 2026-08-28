'use client';

import { useRef } from 'react';
import dynamic from 'next/dynamic';
import LiveCodeEditor from '@/components/ui/LiveCodeEditor';
import styles from './About.module.css';

const ScrollFloat = dynamic(() => import('@/components/react-bits/ScrollFloat'), { ssr: false });
const LiquidEther = dynamic(() => import('@/components/react-bits/LiquidEther'), { ssr: false });
const ProfileCard = dynamic(() => import('@/components/react-bits/ProfileCard'), { ssr: false });

const skills = [
  'Next.js', 'React', 'Node.js', 'JavaScript', 'CSS', 'Shopify',
  'Agentes LLM', 'Prompt Engineering', 'UI/UX', 'SEO', 'Liquid', 'APIs REST',
];

export default function About() {
  return (
    <section id="about" className={styles.about}>
      {/* Background LiquidEther fluid simulation */}
      <div className={styles.liquidWrapper}>
        <LiquidEther
          colors={['#5227FF', '#FF9FFC', '#B497CF']}
          mouseForce={20}
          cursorSize={100}
          isViscous={false}
          viscous={30}
          iterationsViscous={32}
          iterationsPoisson={32}
          resolution={0.5}
          isBounce={false}
          autoDemo={true}
          autoSpeed={0.5}
          autoIntensity={2.2}
          takeoverDuration={0.25}
          autoResumeDelay={2000}
          autoRampDuration={0.6}
        />
      </div>

      <div className={styles.container}>
        {/* Section label */}
        <div className={styles.label}>
          <span>02 — Sobre mí</span>
        </div>

        {/* Title with ScrollFloat */}
        <div className={styles.titleWrapper}>
          <ScrollFloat
            animationDuration={1}
            ease="back.inOut(2)"
            scrollStart="center bottom+=50%"
            scrollEnd="bottom bottom-=40%"
            stagger={0.03}
          >
            Quien soy
          </ScrollFloat>
        </div>

        {/* Content grid */}
        <div className={styles.grid}>
          {/* Left: Interactive Live Code Editor + Output Box + Stats */}
          <div className={styles.textBlock}>
            <div className={styles.headerInfo}>
              <h3 className={styles.sectionSubtitle}>
                Desarrollo web a medida
              </h3>
              <p className={styles.para}>
                Creo experiencias digitales interactivas y memorables combinando diseño moderno,
                animaciones fluidas e integración con agentes de inteligencia artificial.
              </p>
            </div>

            {/* Live Interactive Code Sandbox & Preview */}
            <LiveCodeEditor />

            {/* Stats */}
            <div className={styles.stats}>
              <div className={styles.stat}>
                <span className={styles.statNum}>3+</span>
                <span className={styles.statLabel}>Proyectos listos</span>
              </div>
              <div className={styles.stat}>
                <span className={styles.statNum}>IA</span>
                <span className={styles.statLabel}>Asistido por LLM</span>
              </div>
              <div className={styles.stat}>
                <span className={styles.statNum}>100%</span>
                <span className={styles.statLabel}>Custom code</span>
              </div>
            </div>
          </div>

          {/* Right: Holographic ProfileCard with matias.jpeg + Skills */}
          <div className={styles.rightColumn}>
            <div className={styles.photoWrapper}>
              <ProfileCard
                name="Matias Scandura"
                title="Desarrollador Web"
                handle="matias.scandura"
                status="Disponible"
                contactText="Hablemos"
                avatarUrl="/matias_cutout.png"
                miniAvatarUrl="/matias.jpeg"
                showUserInfo={true}
                enableTilt={true}
                enableMobileTilt={false}
                behindGlowEnabled={true}
                behindGlowColor="rgba(125, 190, 255, 0.67)"
                innerGradient="linear-gradient(145deg, #60496e8c 0%, #71C4FF44 100%)"
              />
            </div>

            <div className={styles.skillsBlock}>
              <p className={styles.skillsTitle}>Stack &amp; Herramientas</p>
              <div className={styles.tags}>
                {skills.map((skill, i) => (
                  <span
                    key={skill}
                    className={styles.tag}
                    style={{ animationDelay: `${i * 0.06}s` }}
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Divider line */}
        <div className={styles.divider} />
      </div>
    </section>
  );
}
