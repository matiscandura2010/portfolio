const projects = [
  {
    id: '01',
    name: 'Antenas y Redes',
    tagline: 'Servicios técnicos de instalación y mantenimiento',
    description:
      'Sitio web profesional para empresa de servicios técnicos en Chile. Diseño orientado a conversión con información clara de servicios, zona de cobertura y contacto directo.',
    url: 'https://antenasyredes.cl',
    previewImage: null, // uses iframe
    tags: ['Next.js', 'React', 'CSS', 'SEO', 'Diseño Web'],
    number: '01',
  },
  {
    id: '02',
    name: 'FullDeportes',
    tagline: 'Tienda online de artículos deportivos',
    description:
      'E-commerce completo construido sobre Shopify con diseño personalizado. Experiencia de compra optimizada, catálogo de productos y sistema de pagos integrado.',
    url: 'https://fulldeportes-2.myshopify.com/',
    previewImage: '/fulldeportes.png', // static image (Shopify blocks iframes)
    tags: ['Shopify', 'Liquid', 'E-commerce', 'UX/UI', 'Diseño Web'],
    number: '02',
  },
  {
    id: '03',
    name: 'Óptica San Antonio',
    tagline: 'Web para óptica local en Valencia, España',
    description:
      'Página web completa para óptica local en San Antonio de Benagéber. Incluye hero cinematográfico, sección de servicios, FAQ, formulario de contacto con mapa interactivo y diseño premium.',
    url: null,
    videoUrl: '/optica_san_antonio.mp4',
    isUnpublished: true,
    statusNote: 'Sitio no publicado (Demo en video)',
    tags: ['Next.js', 'React', 'CSS', 'Google Maps', 'Diseño Web'],
    number: '03',
  },
];

export default projects;
