export function StructuredData() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": "https://coolfix.com/#organization",
    name: "Coolfix",
    description: "Servicio profesional de reparación, mantenimiento e instalación de refrigeradores, lavadoras, secadoras, aires acondicionados y equipos industriales.",
    url: "https://coolfix.com",
    logo: "https://coolfix.com/img/LogoCoolfix.svg",
    image: "https://coolfix.com/img/LogoCoolfix.svg",
    telephone: "3018520511", // Actualiza con tu teléfono real
    email: "coolfixh.i@gmail.com",
    address: {
      "@type": "PostalAddress",
      addressCountry: "CO", // Actualiza con tu país
      // addressLocality: "Ciudad", // Descomenta y agrega tu ciudad
      // addressRegion: "Estado", // Descomenta y agrega tu estado
      // streetAddress: "Dirección" // Descomenta y agrega tu dirección
    },
    priceRange: "$$",
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        opens: "08:00",
        closes: "17:00",
      },
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: "Saturday",
        opens: "08:00",
        closes: "14:00",
      },
    ],
    areaServed: {
      "@type": "Country",
      name: "Colombia", // Actualiza con tu país/región
    },
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Servicios de Reparación",
      itemListElement: [
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Reparación de Refrigeradores",
            description: "Mantenimiento, reparación e instalación de refrigeradores y nevecones.",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Reparación de Lavadoras y Secadoras",
            description: "Mantenimiento, reparación e instalación de lavadoras y secadoras domésticas e industriales.",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Reparación de Aires Acondicionados",
            description: "Mantenimiento, reparación e instalación de sistemas de aire acondicionado.",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Refrigeración industrial",
            description: "Mantenimiento y reparación de equipos de refrigeración industrial: cuartos fríos, cavas, túneles de congelación, chillers.",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Mantenimiento preventivo",
            description: "Planes de mantenimiento para mantener sus equipos en óptimas condiciones.",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Servicio de emergencia 24/7",
            description: "Atención de emergencias las 24 horas del día, los 7 días de la semana.",
          },
        },
      ],
    },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "5",
      reviewCount: "3",
    },
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  )
}
