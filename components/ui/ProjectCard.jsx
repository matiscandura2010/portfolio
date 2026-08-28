'use client';

import { useRef, useState } from 'react';
import Image from 'next/image';
import styles from './ProjectCard.module.css';

export default function ProjectCard({ project }) {
  const cardRef = useRef(null);
  const videoRef = useRef(null);
  const [glow, setGlow] = useState({ x: 50, y: 50 });
  const [hovered, setHovered] = useState(false);
  const [isPlaying, setIsPlaying] = useState(true);

  const handleMouseMove = e => {
    const rect = cardRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setGlow({ x, y });
  };

  const toggleVideoPlay = () => {
    if (!videoRef.current) return;
    if (videoRef.current.paused) {
      videoRef.current.play();
      setIsPlaying(true);
    } else {
      videoRef.current.pause();
      setIsPlaying(false);
    }
  };

  return (
    <article
      ref={cardRef}
      className={`${styles.card} ${hovered ? styles.hovered : ''}`}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        '--glow-x': `${glow.x}%`,
        '--glow-y': `${glow.y}%`,
      }}
    >
      {/* Glow border that follows mouse */}
      <div className={styles.glowBorder} aria-hidden="true" />

      {/* Project number */}
      <span className={styles.number}>{project.number}</span>

      <div className={styles.inner}>
        {/* Left: info */}
        <div className={styles.info}>
          <div className={styles.tags}>
            {project.tags.map(tag => (
              <span key={tag} className={styles.tag}>{tag}</span>
            ))}
          </div>

          <h3 className={styles.name}>{project.name}</h3>
          <p className={styles.tagline}>{project.tagline}</p>
          <p className={styles.desc}>{project.description}</p>

          {/* Action Link / Video Action */}
          {project.url ? (
            <a
              id={`project-link-${project.id}`}
              href={project.url}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.link}
            >
              <span>Ver proyecto</span>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M7 17L17 7M17 7H7M17 7v10" />
              </svg>
            </a>
          ) : project.videoUrl ? (
            <div className={styles.videoLinkContainer}>
              <a
                id={`project-link-${project.id}`}
                href={project.videoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.videoActionLink}
                title="Abrir video demo"
              >
                <span className={styles.playIconWrapper}>
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M8 5v14l11-7z" />
                  </svg>
                </span>
                <span>Ver video demo</span>
              </a>
              <div className={styles.unpublishedNotice}>
                <span className={styles.unpublishedDot} />
                <span>Web no publicada en línea</span>
              </div>
            </div>
          ) : (
            <span className={styles.linkDisabled}>Próximamente online</span>
          )}
        </div>

        {/* Right: preview */}
        <div className={styles.preview}>
          {project.videoUrl ? (
            /* Video preview for unpublished project */
            <div
              className={styles.videoWrapper}
              onClick={toggleVideoPlay}
              title={isPlaying ? 'Click para pausar' : 'Click para reproducir'}
            >
              <video
                ref={videoRef}
                src={project.videoUrl}
                autoPlay
                loop
                muted
                playsInline
                className={styles.previewVideo}
              />
              <div className={styles.videoOverlay}>
                <div className={styles.videoControlsBadge}>
                  <span className={styles.recordDot} />
                  <span>Demo Video · No publicada</span>
                </div>
                {!isPlaying && (
                  <div className={styles.pausedBadge}>
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M8 5v14l11-7z" />
                    </svg>
                  </div>
                )}
              </div>
            </div>
          ) : project.previewImage ? (
            /* Static image preview (e.g. Shopify that blocks iframes) */
            <a
              href={project.url}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.imageWrapper}
            >
              <Image
                src={project.previewImage}
                alt={`Preview de ${project.name}`}
                fill
                sizes="(max-width: 900px) 100vw, 50vw"
                className={styles.previewImg}
                style={{ objectFit: 'cover', objectPosition: 'top' }}
              />
              <div className={styles.iframeOverlay}>
                <span className={styles.iframeLabel}>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6" />
                    <polyline points="15,3 21,3 21,9" />
                    <line x1="10" y1="14" x2="21" y2="3" />
                  </svg>
                  Abrir sitio
                </span>
              </div>
            </a>
          ) : project.url ? (
            /* Live iframe preview */
            <div className={styles.iframeWrapper}>
              <iframe
                src={project.url}
                title={`Preview de ${project.name}`}
                className={styles.iframe}
                loading="lazy"
                sandbox="allow-same-origin allow-scripts"
              />
              <div className={styles.iframeOverlay}>
                <span className={styles.iframeLabel}>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6" />
                    <polyline points="15,3 21,3 21,9" />
                    <line x1="10" y1="14" x2="21" y2="3" />
                  </svg>
                  Abrir sitio
                </span>
              </div>
            </div>
          ) : (
            <div className={styles.noPreview}>
              <div className={styles.mockBrowser}>
                <div className={styles.mockBar}>
                  <div className={styles.mockDots}>
                    <span /><span /><span />
                  </div>
                  <div className={styles.mockUrl}>opticasanantonio.local</div>
                </div>
                <div className={styles.mockContent}>
                  <div className={styles.mockHero} />
                  <div className={styles.mockLines}>
                    <div /><div /><div style={{ width: '70%' }} />
                  </div>
                  <div className={styles.mockGrid}>
                    <div /><div /><div />
                  </div>
                </div>
              </div>
              <span className={styles.comingLabel}>En construcción · Próximamente</span>
            </div>
          )}
        </div>
      </div>
    </article>
  );
}
