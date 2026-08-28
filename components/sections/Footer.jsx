import styles from './Footer.module.css';

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        {/* Top bar */}
        <div className={styles.top}>
          <div className={styles.brand}>
            <span className={styles.logoMark}>MS</span>
            <span className={styles.name}>Matias Scandura</span>
          </div>
          <p className={styles.tagline}>Hecho con código y curiosidad</p>
        </div>

        {/* Divider */}
        <div className={styles.divider} />

        {/* Bottom row */}
        <div className={styles.bottom}>
          <span className={styles.copy}>© {year} Matias Scandura. Todos los derechos reservados.</span>

          {/* Terminal blink */}
          <span className={styles.terminal} aria-hidden="true">
            <span className={styles.prompt}>&gt;</span>
            <span className={styles.cursor}>_</span>
          </span>
        </div>
      </div>
    </footer>
  );
}
