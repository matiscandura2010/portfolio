import './globals.css';

export const metadata = {
  title: 'Matias Scandura — Desarrollador Web',
  description:
    'Portfolio de Matias Scandura. Desarrollo web completo con inteligencia artificial y agentes LLM. Creador de experiencias digitales únicas.',
  keywords: ['desarrollador web', 'next.js', 'react', 'inteligencia artificial', 'LLM', 'portfolio', 'Matias Scandura'],
  authors: [{ name: 'Matias Scandura' }],
  openGraph: {
    title: 'Matias Scandura — Desarrollador Web',
    description: 'Desarrollo web completo con inteligencia artificial y agentes LLM.',
    type: 'website',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <body>{children}</body>
    </html>
  );
}
