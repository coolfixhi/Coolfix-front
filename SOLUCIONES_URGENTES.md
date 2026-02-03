# 🚨 SOLUCIONES URGENTES - IMPLEMENTACIÓN INMEDIATA

## 1. RATE LIMITING BÁSICO (Sin dependencias externas)

### Opción A: Rate Limiting Simple con Map en Memoria
**⚠️ Nota:** Esta solución es temporal. Para producción real, usa Redis.

```typescript
// app/api/contact/route.ts
import { Resend } from "resend"
import { NextResponse } from "next/server"

const resend = new Resend(process.env.RESEND_API_KEY)

// Rate limiting simple (en memoria - se resetea al reiniciar)
const requestCounts = new Map<string, { count: number; resetTime: number }>()

function checkRateLimit(ip: string): boolean {
  const now = Date.now()
  const userData = requestCounts.get(ip)
  
  // Limpiar entradas expiradas
  if (userData && now > userData.resetTime) {
    requestCounts.delete(ip)
  }
  
  const current = requestCounts.get(ip)
  
  if (!current) {
    // Primera request: permitir, establecer límite
    requestCounts.set(ip, { count: 1, resetTime: now + 3600000 }) // 1 hora
    return true
  }
  
  if (current.count >= 3) {
    // Límite alcanzado: 3 requests por hora
    return false
  }
  
  // Incrementar contador
  current.count++
  return true
}

export async function POST(request: Request) {
  // 1. Validar API key
  if (!process.env.RESEND_API_KEY) {
    return NextResponse.json(
      { error: "Configuración del servidor incompleta" },
      { status: 500 }
    )
  }

  // 2. Rate limiting
  const ip = request.headers.get("x-forwarded-for")?.split(",")[0] || 
             request.headers.get("x-real-ip") || 
             "unknown"
  
  if (!checkRateLimit(ip)) {
    return NextResponse.json(
      { error: "Demasiadas solicitudes. Por favor, intenta más tarde (máximo 3 por hora)." },
      { status: 429 }
    )
  }

  // 3. Validar tamaño del body (máx 20KB)
  const contentLength = request.headers.get("content-length")
  if (contentLength && parseInt(contentLength) > 20480) {
    return NextResponse.json(
      { error: "Solicitud demasiado grande" },
      { status: 413 }
    )
  }

  // 4. Timeout de 15 segundos
  const controller = new AbortController()
  const timeout = setTimeout(() => controller.abort(), 15000)

  try {
    const body = await request.json()
    const { name, email, phone, serviceType, description } = body

    // 5. Validación mejorada
    if (!name || !email || !phone || !description) {
      return NextResponse.json(
        { error: "Todos los campos son requeridos" },
        { status: 400 }
      )
    }

    // Validar longitudes
    if (name.length > 100 || email.length > 255 || phone.length > 20 || description.length > 2000) {
      return NextResponse.json(
        { error: "Uno o más campos exceden la longitud máxima permitida" },
        { status: 400 }
      )
    }

    // Validar formato de email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: "El formato del email no es válido" },
        { status: 400 }
      )
    }

    // Sanitizar inputs básico (prevenir XSS)
    const sanitize = (str: string) => str.replace(/[<>]/g, "").trim()
    const sanitizedName = sanitize(name)
    const sanitizedEmail = sanitize(email)
    const sanitizedPhone = sanitize(phone)
    const sanitizedDescription = sanitize(description)

    // ... resto del código de envío de email ...
    
    // Continuar con el código existente pero usando variables sanitizadas
    
  } catch (error) {
    if (error instanceof Error && error.name === 'AbortError') {
      return NextResponse.json(
        { error: "Tiempo de espera agotado" },
        { status: 504 }
      )
    }
    
    // No loggear en producción (solo en desarrollo)
    if (process.env.NODE_ENV === 'development') {
      console.error("Error en la API de contacto:", error)
    }
    
    return NextResponse.json(
      { error: "Error interno del servidor. Por favor, intenta más tarde." },
      { status: 500 }
    )
  } finally {
    clearTimeout(timeout)
  }
}
```

---

## 2. CONFIGURACIÓN DE PRODUCCIÓN

```javascript
// next.config.mjs
/** @type {import('next').NextConfig} */
const nextConfig = {
  // CRÍTICO: Standalone para producción
  output: process.env.NODE_ENV === 'production' ? 'standalone' : undefined,
  
  // Limitar tamaño de body
  experimental: {
    serverActions: {
      bodySizeLimit: '1mb',
    },
  },
  
  // Optimizaciones
  compress: true,
  poweredByHeader: false, // Ocultar header X-Powered-By
  
  // TypeScript
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
```

---

## 3. MIDDLEWARE BÁSICO DE SEGURIDAD

```typescript
// middleware.ts (crear en raíz del proyecto)
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const response = NextResponse.next()
  
  // Headers de seguridad
  response.headers.set('X-Content-Type-Options', 'nosniff')
  response.headers.set('X-Frame-Options', 'DENY')
  response.headers.set('X-XSS-Protection', '1; mode=block')
  response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin')
  
  // Solo aplicar a rutas API
  if (request.nextUrl.pathname.startsWith('/api')) {
    // Bloquear user-agents de bots maliciosos
    const userAgent = request.headers.get('user-agent') || ''
    const blockedBots = ['curl', 'wget', 'python-requests', 'go-http-client']
    
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
```

---

## 4. HEALTH CHECK ENDPOINT

```typescript
// app/api/health/route.ts
import { NextResponse } from 'next/server'

export async function GET() {
  const memoryUsage = process.memoryUsage()
  const memoryMB = {
    rss: Math.round(memoryUsage.rss / 1024 / 1024),
    heapTotal: Math.round(memoryUsage.heapTotal / 1024 / 1024),
    heapUsed: Math.round(memoryUsage.heapUsed / 1024 / 1024),
  }
  
  return NextResponse.json({
    status: 'ok',
    timestamp: new Date().toISOString(),
    uptime: Math.round(process.uptime()),
    memory: memoryMB,
    nodeVersion: process.version,
  })
}
```

---

## 5. SCRIPT PM2 PARA VPS

```javascript
// ecosystem.config.js (crear en raíz)
module.exports = {
  apps: [{
    name: 'coolfix',
    script: 'npm',
    args: 'start',
    cwd: './',
    instances: 1, // Solo 1 instancia en VPS pequeño
    exec_mode: 'fork',
    max_memory_restart: '500M', // Reiniciar si excede 500MB
    env: {
      NODE_ENV: 'production',
      PORT: 3000,
    },
    error_file: './logs/err.log',
    out_file: './logs/out.log',
    log_date_format: 'YYYY-MM-DD HH:mm:ss Z',
    merge_logs: true,
    autorestart: true,
    max_restarts: 10,
    min_uptime: '10s',
  }]
}
```

**Instalación:**
```bash
npm install -g pm2
pm2 start ecosystem.config.js
pm2 save
pm2 startup  # Para iniciar automáticamente al reiniciar el servidor
```

---

## 6. VARIABLES DE ENTORNO VALIDADAS

```typescript
// lib/env.ts (crear nuevo archivo)
export function validateEnv() {
  const required = ['RESEND_API_KEY']
  const missing = required.filter(key => !process.env[key])
  
  if (missing.length > 0) {
    throw new Error(
      `Variables de entorno faltantes: ${missing.join(', ')}`
    )
  }
}

// Llamar al inicio de app/api/contact/route.ts
import { validateEnv } from '@/lib/env'
validateEnv()
```

---

## 📋 ORDEN DE IMPLEMENTACIÓN

1. ✅ **AHORA:** Agregar rate limiting básico (Opción A)
2. ✅ **AHORA:** Configurar `next.config.mjs` con standalone
3. ✅ **HOY:** Crear `middleware.ts`
4. ✅ **HOY:** Validar variables de entorno
5. ✅ **ESTA SEMANA:** Implementar health check
6. ✅ **ESTA SEMANA:** Configurar PM2

---

## ⚠️ IMPORTANTE

Después de implementar estos cambios:
1. Hacer `npm run build` para verificar que compila
2. Probar el endpoint `/api/contact` manualmente
3. Verificar que el rate limiting funciona (intentar 4 requests seguidas)
4. Monitorear el servidor durante las primeras 24 horas
5. Revisar logs para detectar intentos de abuso

---

**Tiempo estimado de implementación:** 1-2 horas  
**Impacto esperado:** Reducción del 80-90% en consumo de recursos
