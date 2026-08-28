'use client';

import { useState } from 'react';
import styles from './ContactForm.module.css';

export default function ContactForm() {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState('idle'); // idle | sending | sent | error

  const handleChange = e => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setStatus('sending');
    try {
      const res = await fetch('https://formspree.io/f/xdkzokyw', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify(form),
      });
      if (res.ok) {
        setStatus('sent');
        setForm({ name: '', email: '', message: '' });
      } else {
        setStatus('error');
      }
    } catch {
      setStatus('error');
    }
  };

  return (
    <form id="contact-form" className={styles.form} onSubmit={handleSubmit} noValidate>
      <div className={styles.row}>
        <div className={styles.field}>
          <label htmlFor="contact-name" className={styles.label}>Nombre</label>
          <input
            id="contact-name"
            name="name"
            type="text"
            placeholder="Tu nombre"
            required
            value={form.name}
            onChange={handleChange}
            className={styles.input}
          />
        </div>
        <div className={styles.field}>
          <label htmlFor="contact-email" className={styles.label}>Email</label>
          <input
            id="contact-email"
            name="email"
            type="email"
            placeholder="tu@email.com"
            required
            value={form.email}
            onChange={handleChange}
            className={styles.input}
          />
        </div>
      </div>

      <div className={styles.field}>
        <label htmlFor="contact-message" className={styles.label}>Mensaje</label>
        <textarea
          id="contact-message"
          name="message"
          placeholder="Cuéntame sobre tu proyecto..."
          rows={5}
          required
          value={form.message}
          onChange={handleChange}
          className={styles.textarea}
        />
      </div>

      <button
        id="contact-submit"
        type="submit"
        className={styles.submit}
        disabled={status === 'sending'}
      >
        {status === 'sending' ? (
          <span className={styles.spinner} />
        ) : status === 'sent' ? (
          '✓ Mensaje enviado'
        ) : (
          <>
            Enviar mensaje
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="22" y1="2" x2="11" y2="13" />
              <polygon points="22,2 15,22 11,13 2,9" />
            </svg>
          </>
        )}
      </button>

      {status === 'error' && (
        <p className={styles.error}>
          Algo salió mal. Escríbeme directamente a{' '}
          <a href="mailto:matiscandura2010@gmail.com">matiscandura2010@gmail.com</a>
        </p>
      )}
    </form>
  );
}
