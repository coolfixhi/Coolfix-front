import { Resend } from "resend"
import { NextResponse } from "next/server"

// Inicializar Resend (validación se hace en runtime)
const getResend = () => {
  if (!process.env.RESEND_API_KEY) {
    throw new Error("RESEND_API_KEY no está configurada")
  }
  return new Resend(process.env.RESEND_API_KEY)
}

// Rate limiting simple (en memoria - se resetea al reiniciar)
// ⚠️ Para producción real, usar Redis con @upstash/ratelimit
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
    // Primera request: permitir, establecer límite (3 por hora)
    requestCounts.set(ip, { count: 1, resetTime: now + 3600000 })
    return true
  }
  
  if (current.count >= 3) {
    // Límite alcanzado
    return false
  }
  
  // Incrementar contador
  current.count++
  return true
}

export async function POST(request: Request) {
  // 1. Validar API key
  let resend
  try {
    resend = getResend()
  } catch (error) {
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
    const { name, email, phone, serviceType, description, acceptDataTreatment, acceptPromotions } = body

    // 5. Validación mejorada
    if (!name || !email || !phone || !description) {
      return NextResponse.json(
        { error: "Todos los campos son requeridos" },
        { status: 400 }
      )
    }

    // Validar aceptación de tratamiento de datos (OBLIGATORIO)
    if (!acceptDataTreatment) {
      return NextResponse.json(
        { error: "Debes aceptar el tratamiento de datos personales para enviar la solicitud" },
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
    const sanitizedServiceType = serviceType ? sanitize(serviceType) : ""
    const sanitizedDescription = sanitize(description)

    // Preparar el contenido del email (versión texto plano)
    const emailContent = `
Nueva Solicitud de Servicio - COOLFIX

INFORMACIÓN DEL CLIENTE
───────────────────────
Nombre: ${sanitizedName}
Email: ${sanitizedEmail}
Teléfono: ${sanitizedPhone}
Servicio: ${sanitizedServiceType || "No especificado"}

DESCRIPCIÓN
───────────
${sanitizedDescription}

AUTORIZACIONES
──────────────
Tratamiento de Datos: ACEPTADO
Promociones: ${acceptPromotions ? "ACEPTADO" : "NO ACEPTADO"}

───────────────────────
Fecha: ${new Date().toLocaleString("es-ES", { 
      day: "numeric",
      month: "long", 
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      timeZone: "America/Mexico_City" 
    })}
    `.trim()

    // Enviar el email usando Resend
    const { data, error } = await resend.emails.send({
      from: "Coolfix Contacto <onboarding@resend.dev>", // Cambia esto por tu dominio verificado en Resend
      to: ["coolfixh.i@gmail.com"],
      replyTo: sanitizedEmail, // Permite responder directamente al cliente
      subject: `Nueva Solicitud de Servicio - ${sanitizedServiceType || "Sin especificar"}`,
      text: emailContent,
      html: `
<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
<body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; background-color: #f9fafb;">
  <table role="presentation" style="width: 100%; border-collapse: collapse; padding: 40px 20px;">
    <tr>
      <td align="center">
        <table role="presentation" style="max-width: 600px; width: 100%; background-color: #ffffff; border-radius: 8px; border: 1px solid #e5e7eb;">
          
          <!-- Header -->
          <tr>
            <td style="padding: 30px; border-bottom: 2px solid #1e40af; background-color: #1e40af;">
              <h1 style="color: #ffffff; margin: 0; font-size: 24px; font-weight: 600;">Nueva Solicitud de Servicio</h1>
            </td>
          </tr>
          
          <!-- Contenido -->
          <tr>
            <td style="padding: 30px;">
              
              <!-- Información del Cliente -->
              <h2 style="color: #1f2937; margin: 0 0 20px; font-size: 18px; font-weight: 600;">Información del Cliente</h2>
              <table role="presentation" style="width: 100%; border-collapse: collapse; margin-bottom: 30px;">
                <tr>
                  <td style="padding: 8px 0; color: #6b7280; font-size: 14px; width: 120px;">Nombre:</td>
                  <td style="padding: 8px 0; color: #1f2937; font-size: 14px; font-weight: 500;">${sanitizedName}</td>
                </tr>
                <tr>
                  <td style="padding: 8px 0; color: #6b7280; font-size: 14px;">Email:</td>
                  <td style="padding: 8px 0;">
                    <a href="mailto:${sanitizedEmail}" style="color: #1e40af; text-decoration: none; font-size: 14px;">${sanitizedEmail}</a>
                  </td>
                </tr>
                <tr>
                  <td style="padding: 8px 0; color: #6b7280; font-size: 14px;">Teléfono:</td>
                  <td style="padding: 8px 0;">
                    <a href="tel:${sanitizedPhone}" style="color: #1f2937; text-decoration: none; font-size: 14px;">${sanitizedPhone}</a>
                  </td>
                </tr>
                <tr>
                  <td style="padding: 8px 0; color: #6b7280; font-size: 14px;">Servicio:</td>
                  <td style="padding: 8px 0; color: #1f2937; font-size: 14px; font-weight: 500;">${sanitizedServiceType || "No especificado"}</td>
                </tr>
              </table>
              
              <!-- Descripción -->
              <h2 style="color: #1f2937; margin: 30px 0 15px; font-size: 18px; font-weight: 600;">Descripción</h2>
              <div style="background-color: #f9fafb; padding: 20px; border-radius: 6px; border-left: 3px solid #1e40af; margin-bottom: 30px;">
                <p style="color: #4b5563; margin: 0; font-size: 14px; line-height: 1.6; white-space: pre-wrap;">${sanitizedDescription}</p>
              </div>
              
              <!-- Autorizaciones -->
              <h2 style="color: #1f2937; margin: 30px 0 15px; font-size: 18px; font-weight: 600;">Autorizaciones</h2>
              <table role="presentation" style="width: 100%; border-collapse: collapse; margin-bottom: 30px;">
                <tr>
                  <td style="padding: 8px 0; color: #6b7280; font-size: 14px;">Tratamiento de Datos:</td>
                  <td style="padding: 8px 0; color: #15803d; font-size: 14px; font-weight: 500;">ACEPTADO</td>
                </tr>
                <tr>
                  <td style="padding: 8px 0; color: #6b7280; font-size: 14px;">Promociones:</td>
                  <td style="padding: 8px 0; color: ${acceptPromotions ? '#15803d' : '#dc2626'}; font-size: 14px; font-weight: 500;">${acceptPromotions ? 'ACEPTADO' : 'NO ACEPTADO'}</td>
                </tr>
              </table>
              
              <!-- Botón Responder -->
              <table role="presentation" style="width: 100%; border-collapse: collapse;">
                <tr>
                  <td align="center" style="padding-top: 20px; border-top: 1px solid #e5e7eb;">
                    <a href="mailto:${sanitizedEmail}?subject=Re: Nueva Solicitud de Servicio - ${sanitizedServiceType || "Sin especificar"}" 
                       style="display: inline-block; background-color: #1e40af; color: #ffffff; text-decoration: none; padding: 12px 24px; border-radius: 6px; font-weight: 500; font-size: 14px;">
                      Responder al Cliente
                    </a>
                  </td>
                </tr>
              </table>
              
            </td>
          </tr>
          
          <!-- Footer -->
          <tr>
            <td style="padding: 20px 30px; background-color: #f9fafb; border-top: 1px solid #e5e7eb; text-align: center;">
              <p style="color: #6b7280; margin: 0; font-size: 12px;">
                <strong style="color: #1e40af;">COOLFIX</strong> | 
                ${new Date().toLocaleString("es-ES", { 
                  day: "numeric",
                  month: "long", 
                  year: "numeric",
                  hour: "2-digit",
                  minute: "2-digit",
                  timeZone: "America/Mexico_City" 
                })}
              </p>
            </td>
          </tr>
          
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
      `,
    })

    if (error) {
      // Solo loggear en desarrollo
      if (process.env.NODE_ENV === 'development') {
        console.error("Error al enviar email con Resend:", error)
      }
      return NextResponse.json(
        { error: "Error al enviar el email. Por favor, intenta nuevamente." },
        { status: 500 }
      )
    }

    return NextResponse.json(
      { 
        success: true, 
        message: "Email enviado correctamente",
        id: data?.id 
      },
      { status: 200 }
    )
  } catch (error) {
    // Manejar timeout
    if (error instanceof Error && error.name === 'AbortError') {
      return NextResponse.json(
        { error: "Tiempo de espera agotado" },
        { status: 504 }
      )
    }
    
    // Solo loggear en desarrollo
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
