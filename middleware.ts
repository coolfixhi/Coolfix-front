import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const response = NextResponse.next()
  
  // Headers de seguridad
  response.headers.set('X-Content-Type-Options', 'nosniff')
  response.headers.set('X-Frame-Options', 'DENY')
  response.headers.set('X-XSS-Protection', '1; mode=block')
  response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin')
  
  // Solo aplicar protecciones adicionales a rutas API
  if (request.nextUrl.pathname.startsWith('/api')) {
    // Bloquear user-agents de bots maliciosos comunes
    const userAgent = request.headers.get('user-agent') || ''
    const blockedBots = ['curl', 'wget', 'python-requests', 'go-http-client', 'scrapy']
    
    if (blockedBots.some(bot => userAgent.toLowerCase().includes(bot))) {
      return new NextResponse('Forbidden', { status: 403 })
    }
  }
  
  return response
}

export const config = {
  matcher: [
    '/api/:path*',
  ],
}
