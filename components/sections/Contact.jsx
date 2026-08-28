'use client';

import { useState } from 'react';
import dynamic from 'next/dynamic';
import ContactForm from '@/components/ui/ContactForm';
import GradualBlur from '@/components/react-bits/GradualBlur';
import PixelCard from '@/components/react-bits/PixelCard';
import styles from './Contact.module.css';

const BlurText = dynamic(() => import('@/components/react-bits/BlurText'), { ssr: false });
const ScrollFloat = dynamic(() => import('@/components/react-bits/ScrollFloat'), { ssr: false });

const WHATSAPP = 'https://wa.me/34610550530';
const EMAIL = 'matiscandura2010@gmail.com';
const INSTAGRAM = 'https://instagram.com/matiscandura';

export default function Contact() {
  const [copied, setCopied] = useState(false);

  const copyEmail = async () => {
    await navigator.clipboard.writeText(EMAIL);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section id="contact" className={styles.contact}>
      {/* GradualBlur top transition */}
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
          <span>04 — Contacto</span>
        </div>

        {/* Title */}
        <div className={styles.titleWrapper}>
          <ScrollFloat
            animationDuration={1}
            ease="back.inOut(2)"
            scrollStart="center bottom+=40%"
            scrollEnd="bottom bottom-=40%"
            stagger={0.04}
          >
            Hablemos
          </ScrollFloat>
        </div>

        {/* Invitation text */}
        <BlurText
          text="¿Tienes un proyecto en mente? Cuéntamelo."
          delay={40}
          animateBy="words"
          direction="bottom"
          stepDuration={0.35}
          className={styles.invite}
        />

        {/* Gmail PixelCard */}
        <div className={styles.emailWrapper}>
          <PixelCard
            colors="#EA4335,#4285F4,#FBBC05,#34A853"
            gap={6}
            speed={40}
            className={styles.emailPixelCard}
          >
            <button
              id="copy-email-btn"
              className={`${styles.emailChip} ${copied ? styles.emailCopied : ''}`}
              onClick={copyEmail}
              title="Copiar email"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                <polyline points="22,6 12,12 2,6" />
              </svg>
              <span>{copied ? '¡Email Copiado!' : EMAIL}</span>
              {!copied && (
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
                  <path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1" />
                </svg>
              )}
            </button>
          </PixelCard>
        </div>

        {/* Contact channels with PixelCard */}
        <div className={styles.channels}>
          {/* WhatsApp PixelCard */}
          <PixelCard
            colors="#25D366,#128C7E,#5AF78E,#075E54"
            gap={8}
            speed={45}
            className={styles.channelPixelCard}
          >
            <a
              id="contact-whatsapp"
              href={WHATSAPP}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.channel}
            >
              <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
              </svg>
              <div>
                <span className={styles.channelLabel}>WhatsApp</span>
                <span className={styles.channelValue}>+34 610 550 530</span>
              </div>
            </a>
          </PixelCard>

          {/* Instagram PixelCard */}
          <PixelCard
            colors="#E1306C,#FD1D1D,#F56040,#C13584"
            gap={8}
            speed={45}
            className={styles.channelPixelCard}
          >
            <a
              id="contact-instagram"
              href={INSTAGRAM}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.channel}
            >
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                <path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37z" />
                <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
              </svg>
              <div>
                <span className={styles.channelLabel}>Instagram</span>
                <span className={styles.channelValue}>@matiscandura</span>
              </div>
            </a>
          </PixelCard>
        </div>

        {/* Divider */}
        <div className={styles.divider}>
          <span>o envíame un mensaje</span>
        </div>

        {/* Form */}
        <ContactForm />
      </div>
    </section>
  );
}
