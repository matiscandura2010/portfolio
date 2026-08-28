'use client';

import dynamic from 'next/dynamic';
import ProjectCard from '@/components/ui/ProjectCard';
import GradualBlur from '@/components/react-bits/GradualBlur';
import projects from '@/data/projects';
import styles from './Projects.module.css';

const ScrollFloat = dynamic(() => import('@/components/react-bits/ScrollFloat'), { ssr: false });

export default function Projects() {
  return (
    <section id="projects" className={styles.projects}>
      {/* GradualBlur top transition from Hero */}
      <GradualBlur
        target="parent"
        position="top"
        height="8rem"
        strength={2}
        divCount={6}
        curve="bezier"
        opacity={0.9}
      />

      <div className={styles.container}>
        {/* Section label */}
        <div className={styles.label}>
          <span>03 — Proyectos</span>
        </div>

        {/* Title */}
        <div className={styles.titleWrapper}>
          <ScrollFloat
            animationDuration={1}
            ease="back.inOut(2)"
            scrollStart="center bottom+=40%"
            scrollEnd="bottom bottom-=40%"
            stagger={0.03}
          >
            Mis obras
          </ScrollFloat>
        </div>

        {/* Subtitle */}
        <p className={styles.subtitle}>
          Cada proyecto, una solución única. Desde tiendas online hasta sitios de servicios
          locales — diseñados para destacar y convertir.
        </p>

        {/* Project cards */}
        <div className={styles.cards}>
          {projects.map(project => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      </div>

      {/* GradualBlur bottom */}
      <GradualBlur
        target="parent"
        position="bottom"
        height="8rem"
        strength={2}
        divCount={6}
        curve="bezier"
        opacity={0.9}
      />
    </section>
  );
}
