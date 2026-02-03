# 🔍 AUDITORÍA DE PRODUCCIÓN - SITIO WEB COOLFIX
**Fecha:** $(date)  
**Objetivo:** Detectar causas de uso excesivo de CPU/RAM en VPS  
**Estado:** ⚠️ **NO SEGURO PARA PRODUCCIÓN** - Requiere correcciones críticas

---

## 🚨 PROBLEMAS CRÍTICOS ENCONTRADOS

### 1. **API ROUTE SIN PROTECCIÓN CONTRA SPAM/ABUSO** ⚠️ CRÍTICO
**Archivo:** `app/api/contact/route.ts`  
**Líneas:** 6-224  
**Severidad:** 🔴 CRÍTICA

#### Problema:
- **NO tiene rate limiting** - Un bot puede hacer miles de requests por segundo
- **NO tiene CAPTCHA** - Fácil de automatizar
- **NO tiene validación de origen** - Cualquiera puede llamar la API
- **NO tiene límite de tamaño de body** - Puede recibir payloads enormes
- **NO tiene timeout** - Requests pueden quedarse colgados
- **Cada request envía un email** - Costo inmediato en recursos y dinero

#### Impacto:
- Un atacante puede saturar el servidor con requests masivos
- Cada request consume CPU para procesar el email HTML (muy pesado)
- Resend puede bloquear tu cuenta por exceso de requests
- El servidor puede quedarse sin memoria procesando emails

#### Solución:
```typescript
// app/api/contact/route.ts
import { Ratelimit } from "@upstash/ratelimit"
import { Redis } from "@upstash/redis"

const ratelimit = new Ratelimit({
  redis: Redis.fromEnv(),
  limiter: Ratelimit.slidingWindow(3, "1 h"), // 3 requests por hora por IP
})

export async function POST(request: Request) {
  // 1. Rate limiting
  const ip = request.headers.get("x-forwarded-for") || "unknown"
  const { success } = await ratelimit.limit(ip)
  if (!success) {
    return NextResponse.json(
      { error: "Demasiadas solicitudes. Intenta más tarde." },
      { status: 429 }
    )
  }

  // 2. Validar tamaño del body (máx 10KB)
  const contentLength = request.headers.get("content-length")
  if (contentLength && parseInt(contentLength) > 10240) {
    return NextResponse.json({ error: "Payload demasiado grande" }, { status: 413 })
  }

  // 3. Timeout de 10 segundos
  const controller = new AbortController()
  const timeout = setTimeout(() => controller.abort(), 10000)

  try {
    const body = await request.json()
    // ... resto del código
  } finally {
    clearTimeout(timeout)
  }
}
```

---

### 2. **CONFIGURACIÓN DE PRODUCCIÓN INCOMPLETA** ⚠️ ALTO
**Archivo:** `next.config.mjs`  
**Líneas:** 1-12  
**Severidad:** 🟠 ALTA

#### Problemas:
- **NO tiene `output: 'standalone'`** - Next.js no optimiza para producción
- **NO tiene límites de memoria** - Puede consumir RAM ilimitada
- **NO tiene configuración de logging** - Logs excesivos en producción
- **`ignoreBuildErrors: true`** - Puede ocultar problemas reales

#### Impacto:
- Build de producción más pesado y lento
- Mayor consumo de memoria
- Logs innecesarios consumen disco y CPU
- Errores ocultos pueden causar crashes

#### Solución:
```javascript
// next.config.mjs
/** @type {import('next').NextConfig} */
const nextConfig = {
  // Producción standalone (más eficiente)
  output: process.env.NODE_ENV === 'production' ? 'standalone' : undefined,
  
  // Limitar tamaño de body
  experimental: {
    serverActions: {
      bodySizeLimit: '1mb',
    },
  },
  
  // Optimizaciones
  compress: true,
  poweredByHeader: false,
  
  // TypeScript (solo en desarrollo)
  typescript: {
    ignoreBuildErrors: process.env.NODE_ENV === 'development',
  },
  
  images: {
    unoptimized: true, // OK si no usas imágenes optimizadas
  },
  
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

### 3. **PROCESAMIENTO PESADO DE EMAIL EN CADA REQUEST** ⚠️ ALTO
**Archivo:** `app/api/contact/route.ts`  
**Líneas:** 71-198  
**Severidad:** 🟠 ALTA

#### Problema:
- Genera HTML complejo inline en cada request (200+ líneas)
- Múltiples llamadas a `new Date().toLocaleString()` (operación costosa)
- Template string enorme procesado en memoria
- No hay caché ni optimización

#### Impacto:
- CPU alto procesando HTML en cada request
- Memoria temporal alta por strings grandes
- Lento si hay muchos requests simultáneos

#### Solución:
```typescript
// lib/email-templates.ts - Separar templates
export const getEmailTemplate = (data: ContactData) => {
  // Usar template engine o al menos separar el HTML
  // Considerar usar React Email: https://react.email
}

// En route.ts
import { getEmailTemplate } from '@/lib/email-templates'
const html = getEmailTemplate({ name, email, phone, serviceType, description })
```

---

### 4. **CONSOLE.ERROR EN PRODUCCIÓN** ⚠️ MEDIO
**Archivos:** 
- `app/api/contact/route.ts` (líneas 202, 218)
- `components/contact-form-section.tsx` (línea 63)

**Severidad:** 🟡 MEDIA

#### Problema:
- `console.error` en producción consume recursos
- No hay sistema de logging estructurado
- Errores no se monitorean

#### Solución:
```typescript
// lib/logger.ts
const logger = {
  error: (message: string, error?: unknown) => {
    if (process.env.NODE_ENV === 'production') {
      // Enviar a servicio de logging (Sentry, LogRocket, etc.)
      // O al menos no hacer console.error
    } else {
      console.error(message, error)
    }
  }
}
```

---

### 5. **FALTA DE VALIDACIÓN DE INPUT ROBUSTA** ⚠️ MEDIO
**Archivo:** `app/api/contact/route.ts`  
**Líneas:** 11-26  
**Severidad:** 🟡 MEDIA

#### Problema:
- Validación básica de email (regex simple)
- No valida longitud de campos
- No sanitiza inputs (XSS potencial en HTML)
- No valida formato de teléfono

#### Solución:
```typescript
import { z } from 'zod'

const contactSchema = z.object({
  name: z.string().min(2).max(100),
  email: z.string().email().max(255),
  phone: z.string().regex(/^\+?[1-9]\d{1,14}$/),
  serviceType: z.string().max(50).optional(),
  description: z.string().min(10).max(2000),
})

// En POST:
const validation = contactSchema.safeParse(body)
if (!validation.success) {
  return NextResponse.json(
    { error: "Datos inválidos", details: validation.error },
    { status: 400 }
  )
}
```

---

### 6. **NO HAY MIDDLEWARE DE SEGURIDAD** ⚠️ MEDIO
**Archivo:** No existe `middleware.ts`  
**Severidad:** 🟡 MEDIA

#### Problema:
- No hay protección CORS
- No hay headers de seguridad
- No hay validación de user-agent
- No hay protección contra bots básicos

#### Solución:
```typescript
// middleware.ts
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  // Headers de seguridad
  const response = NextResponse.next()
  response.headers.set('X-Content-Type-Options', 'nosniff')
  response.headers.set('X-Frame-Options', 'DENY')
  response.headers.set('X-XSS-Protection', '1; mode=block')
  
  // Bloquear user-agents sospechosos
  const userAgent = request.headers.get('user-agent') || ''
  if (userAgent.includes('bot') && !userAgent.includes('Googlebot')) {
    return new NextResponse('Forbidden', { status: 403 })
  }
  
  return response
}

export const config = {
  matcher: '/api/:path*',
}
```

---

### 7. **VARIABLES DE ENTORNO NO VALIDADAS** ⚠️ MEDIO
**Archivo:** `app/api/contact/route.ts`  
**Línea:** 4  
**Severidad:** 🟡 MEDIA

#### Problema:
- `RESEND_API_KEY` puede ser undefined
- No valida al inicio si existe
- Puede causar errores en runtime

#### Solución:
```typescript
// Al inicio del archivo
if (!process.env.RESEND_API_KEY) {
  throw new Error('RESEND_API_KEY no está configurada')
}

const resend = new Resend(process.env.RESEND_API_KEY!)
```

---

## ✅ ASPECTOS POSITIVOS

1. ✅ Next.js y React actualizados a versiones seguras (16.1.6 y 19.0.0)
2. ✅ No hay loops infinitos en componentes
3. ✅ No hay fetch en render (solo en eventos)
4. ✅ No hay middleware pesado ejecutándose
5. ✅ Componentes client-side bien estructurados
6. ✅ No hay memory leaks obvios en componentes

---

## 📋 RECOMENDACIONES ADICIONALES

### Para VPS Pequeño:

1. **Configurar límites de Node.js:**
```bash
# En package.json scripts
"start": "NODE_OPTIONS='--max-old-space-size=512' next start"
```

2. **Usar PM2 con límites:**
```javascript
// ecosystem.config.js
module.exports = {
  apps: [{
    name: 'coolfix',
    script: 'npm',
    args: 'start',
    max_memory_restart: '500M',
    instances: 1, // Solo 1 instancia en VPS pequeño
  }]
}
```

3. **Monitoreo básico:**
```typescript
// Agregar health check endpoint
// app/api/health/route.ts
export async function GET() {
  return NextResponse.json({ 
    status: 'ok',
    memory: process.memoryUsage(),
    uptime: process.uptime()
  })
}
```

4. **Considerar usar Vercel/Netlify** en lugar de VPS para este tipo de proyecto

---

## 🎯 PRIORIDAD DE CORRECCIONES

### 🔴 CRÍTICO (Hacer AHORA):
1. ✅ Implementar rate limiting en `/api/contact`
2. ✅ Agregar validación robusta con Zod
3. ✅ Configurar `output: 'standalone'` en next.config

### 🟠 ALTO (Esta semana):
4. ✅ Separar templates de email
5. ✅ Agregar middleware de seguridad
6. ✅ Configurar logging estructurado

### 🟡 MEDIO (Próximas semanas):
7. ✅ Validar variables de entorno
8. ✅ Optimizar procesamiento de emails
9. ✅ Agregar monitoreo

---

## 📊 CONCLUSIÓN

**Estado actual:** ⚠️ **NO SEGURO PARA PRODUCCIÓN**

El proyecto tiene vulnerabilidades críticas que pueden causar:
- Ataques de denegación de servicio (DoS)
- Consumo excesivo de recursos
- Costos elevados en Resend
- Suspensión del VPS

**Tiempo estimado para correcciones críticas:** 2-4 horas

**Después de las correcciones:** ✅ SEGURO para VPS pequeño

---

## 📝 CHECKLIST DE IMPLEMENTACIÓN

- [ ] Instalar `@upstash/ratelimit` y `@upstash/redis`
- [ ] Implementar rate limiting en API route
- [ ] Agregar validación con Zod
- [ ] Configurar `output: 'standalone'`
- [ ] Crear middleware.ts con headers de seguridad
- [ ] Separar templates de email
- [ ] Configurar logging estructurado
- [ ] Validar variables de entorno
- [ ] Agregar health check endpoint
- [ ] Configurar PM2 con límites de memoria
- [ ] Probar carga con herramienta de stress testing

---

**Generado por:** Auditoría Automática  
**Última actualización:** $(date)
