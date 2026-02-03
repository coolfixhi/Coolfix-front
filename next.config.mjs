/** @type {import('next').NextConfig} */
const nextConfig = {
  // CRÍTICO: Standalone para producción (reduce tamaño y mejora rendimiento)
  output: process.env.NODE_ENV === 'production' ? 'standalone' : undefined,
  
  // Limitar tamaño de body
  experimental: {
    serverActions: {
      bodySizeLimit: '1mb',
    },
  },
  
  // Optimizaciones
  compress: true,
  poweredByHeader: false, // Ocultar header X-Powered-By por seguridad
  
  // TypeScript (solo ignorar errores en desarrollo)
  typescript: {
    ignoreBuildErrors: process.env.NODE_ENV === 'development',
  },
  
  images: {
    unoptimized: true,
  },
  
  // Desactivar indicadores en producción
  devIndicators: false,
  
  // Logging solo en desarrollo
  logging: {
    fetches: {
      fullUrl: process.env.NODE_ENV === 'development',
    },
  },
}

export default nextConfig
