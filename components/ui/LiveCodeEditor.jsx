'use client';

import { useState, useMemo } from 'react';
import styles from './LiveCodeEditor.module.css';

const INITIAL_HTML = `<div class="bio-card">
  <div class="badge">PERFIL &amp; BIO</div>
  <ul>
    <li><span class="label">Nombre:</span> Matias Scandura</li>
    <li><span class="label">Nacionalidad:</span> Chile 🇨🇱</li>
    <li><span class="label">Edad:</span> ¿?</li>
    <li><span class="label">Cada sitio:</span> una experiencia nueva ✨</li>
  </ul>
</div>`;

const INITIAL_CSS = `.bio-card {
  padding: 1.5rem 1.6rem;
  background: #000000;
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 14px;
  color: #ffffff;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.8);
}

.badge {
  font-size: 11px;
  font-weight: 800;
  letter-spacing: 0.15em;
  color: #a78bfa;
  margin-bottom: 1rem;
  display: inline-flex;
  align-items: center;
  gap: 5px;
}

ul {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

li {
  font-size: 15px;
  font-weight: 700;
  line-height: 1.4;
  color: #ffffff;
  display: flex;
  align-items: baseline;
  gap: 8px;
}

.label {
  color: #94a3b8;
  font-weight: 800;
  font-size: 14px;
  min-width: 85px;
}`;

export default function LiveCodeEditor() {
  const [activeTab, setActiveTab] = useState('html'); // 'html' | 'css'
  const [htmlCode, setHtmlCode] = useState(INITIAL_HTML);
  const [cssCode, setCssCode] = useState(INITIAL_CSS);
  const [isCopied, setIsCopied] = useState(false);

  const previewDoc = useMemo(() => {
    return `
      <!DOCTYPE html>
      <html>
        <head>
          <style>
            * { box-sizing: border-box; margin: 0; padding: 0; }
            html, body {
              background: #000000 !important;
              font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
              padding: 12px;
              color: #ffffff;
              display: flex;
              align-items: center;
              justify-content: center;
              min-height: 100%;
              overflow: hidden;
            }
            ${cssCode}
          </style>
        </head>
        <body>
          ${htmlCode}
        </body>
      </html>
    `;
  }, [htmlCode, cssCode]);

  const handleReset = () => {
    setHtmlCode(INITIAL_HTML);
    setCssCode(INITIAL_CSS);
  };

  const handleCopy = () => {
    const codeToCopy = activeTab === 'html' ? htmlCode : cssCode;
    navigator.clipboard.writeText(codeToCopy);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  return (
    <div className={styles.editorContainer}>
      {/* Editor Header / Title bar */}
      <div className={styles.titleBar}>
        <div className={styles.windowDots}>
          <span className={`${styles.dot} ${styles.dotRed}`} />
          <span className={`${styles.dot} ${styles.dotYellow}`} />
          <span className={`${styles.dot} ${styles.dotGreen}`} />
        </div>

        {/* Tab Switcher */}
        <div className={styles.tabGroup}>
          <button
            type="button"
            className={`${styles.tabBtn} ${activeTab === 'html' ? styles.tabActive : ''}`}
            onClick={() => setActiveTab('html')}
          >
            <span className={styles.htmlIcon}>&lt;/&gt;</span> index.html
          </button>
          <button
            type="button"
            className={`${styles.tabBtn} ${activeTab === 'css' ? styles.tabActive : ''}`}
            onClick={() => setActiveTab('css')}
          >
            <span className={styles.cssIcon}>#</span> style.css
          </button>
        </div>

        <div className={styles.actions}>
          <button
            type="button"
            className={styles.actionBtn}
            onClick={handleCopy}
            title="Copiar código"
          >
            {isCopied ? '✓ Copiado' : 'Copiar'}
          </button>
          <button
            type="button"
            className={styles.actionBtn}
            onClick={handleReset}
            title="Restaurar código inicial"
          >
            Reset
          </button>
        </div>
      </div>

      {/* Split Workstation: Left Code Editor | Right Live Preview */}
      <div className={styles.workspace}>
        {/* Left Pane: Code Editor Area */}
        <div className={styles.codePane}>
          <div className={styles.codeHeader}>
            <span className={styles.paneLabel}>
              {activeTab === 'html' ? 'HTML5 Source' : 'CSS3 Stylesheet'}
            </span>
            <span className={styles.liveTag}>
              <span className={styles.pulseDot} /> Editable
            </span>
          </div>

          <div className={styles.editorTextareaWrapper}>
            {activeTab === 'html' ? (
              <textarea
                value={htmlCode}
                onChange={(e) => setHtmlCode(e.target.value)}
                className={styles.codeTextarea}
                spellCheck="false"
                rows={12}
                aria-label="Editor de código HTML"
              />
            ) : (
              <textarea
                value={cssCode}
                onChange={(e) => setCssCode(e.target.value)}
                className={styles.codeTextarea}
                spellCheck="false"
                rows={12}
                aria-label="Editor de código CSS"
              />
            )}
          </div>
        </div>

        {/* Right Pane: Real-time Render Output */}
        <div className={styles.previewPane}>
          <div className={styles.previewHeader}>
            <span className={styles.paneLabel}>Live Preview</span>
            <span className={styles.previewUrl}>localhost:3000/bio</span>
          </div>

          <div className={styles.previewFrameWrapper}>
            <iframe
              srcDoc={previewDoc}
              title="Resultado en vivo"
              className={styles.previewIframe}
              sandbox="allow-scripts"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
