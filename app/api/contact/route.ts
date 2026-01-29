import { Resend } from "resend"
import { NextResponse } from "next/server"

const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { name, email, phone, serviceType, description } = body

    // Validar que todos los campos requeridos estén presentes
    if (!name || !email || !phone || !description) {
      return NextResponse.json(
        { error: "Todos los campos son requeridos" },
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

    // Preparar el contenido del email (versión texto plano)
    const emailContent = `
NUEVA SOLICITUD DE SERVICIO - COOLFIX

Un cliente ha solicitado un servicio a través del formulario de contacto del sitio web.

═══════════════════════════════════════════════════════
INFORMACIÓN DEL CLIENTE
═══════════════════════════════════════════════════════

Nombre: ${name}
Email: ${email}
Teléfono: ${phone}
Tipo de Servicio: ${serviceType || "No especificado"}

═══════════════════════════════════════════════════════
DESCRIPCIÓN DEL PROBLEMA
═══════════════════════════════════════════════════════

${description}

═══════════════════════════════════════════════════════

Fecha y Hora: ${new Date().toLocaleString("es-ES", { 
      weekday: "long", 
      year: "numeric", 
      month: "long", 
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      timeZone: "America/Mexico_City" 
    })}

Este email fue enviado automáticamente desde el formulario de contacto de Coolfix.
    `.trim()

    // Enviar el email usando Resend
    const { data, error } = await resend.emails.send({
      from: "Coolfix Contacto <onboarding@resend.dev>", // Cambia esto por tu dominio verificado en Resend
      to: ["coolfixh.i@gmail.com"],
      replyTo: email, // Permite responder directamente al cliente
      subject: `Nueva Solicitud de Servicio - ${serviceType || "Sin especificar"}`,
      text: emailContent,
      html: `
        <!DOCTYPE html>
        <html lang="es">
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
        </head>
        <body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; background-color: #f5f5f5;">
          <table role="presentation" style="width: 100%; border-collapse: collapse; background-color: #f5f5f5; padding: 20px;">
            <tr>
              <td align="center">
                <table role="presentation" style="max-width: 600px; width: 100%; background-color: #ffffff; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);">
                  
                  <!-- Header corporativo -->
                  <tr>
                    <td style="background: linear-gradient(135deg, #1e40af 0%, #3b82f6 100%); padding: 50px 30px; text-align: center; border-bottom: 3px solid #1e3a8a;">
                      <h1 style="color: #ffffff; margin: 0; font-size: 32px; font-weight: 700; letter-spacing: -0.5px; text-transform: uppercase;">
                        Nueva Solicitud de Servicio
                      </h1>
                      <div style="width: 60px; height: 3px; background-color: #ffffff; margin: 20px auto 15px;"></div>
                      <p style="color: rgba(255, 255, 255, 0.95); margin: 0; font-size: 16px; font-weight: 400;">
                        Un cliente ha solicitado un servicio a través del formulario de contacto
                      </p>
                    </td>
                  </tr>
                  
                  <!-- Información del Cliente -->
                  <tr>
                    <td style="padding: 30px;">
                      <div style="background: linear-gradient(to right, #eff6ff, #dbeafe); border-left: 4px solid #1e40af; padding: 25px; border-radius: 8px; margin-bottom: 25px;">
                        <h2 style="color: #1e40af; margin: 0 0 25px; font-size: 18px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px;">
                          Información del Cliente
                        </h2>
                        
                        <table role="presentation" style="width: 100%; border-collapse: collapse;">
                          <tr>
                            <td style="padding: 14px 0; border-bottom: 1px solid rgba(30, 64, 175, 0.1);">
                              <div>
                                <div style="color: #6b7280; font-size: 11px; text-transform: uppercase; letter-spacing: 0.8px; font-weight: 600; margin-bottom: 6px;">Nombre Completo</div>
                                <div style="color: #1f2937; font-size: 16px; font-weight: 500; line-height: 1.5;">${name}</div>
                              </div>
                            </td>
                          </tr>
                          <tr>
                            <td style="padding: 14px 0; border-bottom: 1px solid rgba(30, 64, 175, 0.1);">
                              <div>
                                <div style="color: #6b7280; font-size: 11px; text-transform: uppercase; letter-spacing: 0.8px; font-weight: 600; margin-bottom: 6px;">Correo Electrónico</div>
                                <div style="color: #1e40af; font-size: 16px;">
                                  <a href="mailto:${email}" style="color: #1e40af; text-decoration: none; font-weight: 500;">${email}</a>
                                </div>
                              </div>
                            </td>
                          </tr>
                          <tr>
                            <td style="padding: 14px 0; border-bottom: 1px solid rgba(30, 64, 175, 0.1);">
                              <div>
                                <div style="color: #6b7280; font-size: 11px; text-transform: uppercase; letter-spacing: 0.8px; font-weight: 600; margin-bottom: 6px;">Teléfono</div>
                                <div style="color: #1f2937; font-size: 16px; font-weight: 500;">
                                  <a href="tel:${phone}" style="color: #1f2937; text-decoration: none;">${phone}</a>
                                </div>
                              </div>
                            </td>
                          </tr>
                          <tr>
                            <td style="padding: 14px 0;">
                              <div>
                                <div style="color: #6b7280; font-size: 11px; text-transform: uppercase; letter-spacing: 0.8px; font-weight: 600; margin-bottom: 6px;">Tipo de Servicio</div>
                                <div style="display: inline-block; background-color: #1e40af; color: #ffffff; padding: 8px 16px; border-radius: 4px; font-size: 14px; font-weight: 600; letter-spacing: 0.3px;">
                                  ${serviceType || "No especificado"}
                                </div>
                              </div>
                            </td>
                          </tr>
                        </table>
                      </div>
                      
                      <!-- Descripción del Problema -->
                      <div style="background-color: #ffffff; border: 1px solid #e5e7eb; border-radius: 8px; padding: 25px; margin-bottom: 25px;">
                        <h2 style="color: #1f2937; margin: 0 0 20px; font-size: 18px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px;">
                          Descripción del Problema
                        </h2>
                        <div style="background-color: #f9fafb; padding: 20px; border-radius: 6px; border-left: 4px solid #3b82f6;">
                          <p style="color: #4b5563; margin: 0; font-size: 15px; line-height: 1.7; white-space: pre-wrap; font-family: 'Georgia', serif;">${description}</p>
                        </div>
                      </div>
                      
                      <!-- Botón de acción -->
                      <table role="presentation" style="width: 100%; border-collapse: collapse; margin-top: 30px;">
                        <tr>
                          <td align="center">
                            <a href="mailto:${email}?subject=Re: Nueva Solicitud de Servicio - ${serviceType || "Sin especificar"}" 
                               style="display: inline-block; background-color: #1e40af; color: #ffffff; text-decoration: none; padding: 14px 32px; border-radius: 4px; font-weight: 600; font-size: 15px; letter-spacing: 0.3px; text-transform: uppercase; box-shadow: 0 2px 4px rgba(30, 64, 175, 0.2);">
                              Responder al Cliente
                            </a>
                          </td>
                        </tr>
                      </table>
                    </td>
                  </tr>
                  
                  <!-- Footer -->
                  <tr>
                    <td style="background-color: #f9fafb; padding: 25px 30px; text-align: center; border-top: 1px solid #e5e7eb;">
                      <p style="color: #6b7280; margin: 0 0 8px; font-size: 13px; line-height: 1.6;">
                        <strong style="color: #1e40af; font-size: 14px;">COOLFIX</strong><br>
                        <span style="color: #9ca3af; font-size: 12px;">Servicio Profesional de Reparación</span>
                      </p>
                      <p style="color: #9ca3af; margin: 12px 0 0; font-size: 11px; line-height: 1.6; border-top: 1px solid #e5e7eb; padding-top: 12px;">
                        Fecha y Hora: ${new Date().toLocaleString("es-ES", { 
                          weekday: "long", 
                          year: "numeric", 
                          month: "long", 
                          day: "numeric",
                          hour: "2-digit",
                          minute: "2-digit",
                          timeZone: "America/Mexico_City" 
                        })}<br>
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
      console.error("Error al enviar email con Resend:", error)
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
    console.error("Error en la API de contacto:", error)
    return NextResponse.json(
      { error: "Error interno del servidor. Por favor, intenta más tarde." },
      { status: 500 }
    )
  }
}
