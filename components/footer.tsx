"use client"

import { Facebook, Instagram, Mail, Phone } from "lucide-react"
import { toast } from "sonner"
import type { TranslationKey } from "@/lib/translations"

interface FooterProps {
  t: TranslationKey
}

export function Footer({ t }: FooterProps) {
  const email = "coolfixh.i@gmail.com"
  const whatsappNumber = "3018520511"
  
  const socialLinks = [
    {
      icon: Facebook,
      href: "https://www.facebook.com/share/1721huCFZU/?mibextid=wwXIfr",
      label: "Facebook",
    },
    {
      icon: Instagram,
      href: "https://www.instagram.com/coolfix_h.i?igsh=MXd2aWM0MTVkazd1Yg%3D%3D&utm_source=qr",
      label: "Instagram",
    },
  ]

  const copyToClipboard = (text: string, type: string) => {
    navigator.clipboard.writeText(text).then(() => {
      toast.success(`${type} copiado`, {
        description: text,
        duration: 2000,
      })
    }).catch(() => {
      toast.error("Error al copiar", {
        description: "Por favor, copia manualmente",
        duration: 2000,
      })
    })
  }

  return (
    <footer className="bg-gray-900 text-white">
      <div className="container mx-auto px-3 sm:px-4 md:px-6 py-8 sm:py-10 md:py-12">
        <div className="grid gap-8 sm:gap-10 md:grid-cols-2 md:gap-12">
          {/* Columna izquierda: Logo y descripción */}
          <div className="flex flex-col justify-center">
            <div className="mb-4 sm:mb-5 flex items-center gap-2">
              <img 
                src="/img/LogoCoolfix.svg" 
                alt="COOLFIX" 
                className="h-8 sm:h-9 md:h-10 w-auto"
              />
            </div>
            <p className="text-sm sm:text-base text-gray-400 leading-relaxed max-w-md">{t.footer.description}</p>
          </div>

          {/* Columna derecha: Contacto */}
          <div className="flex flex-col justify-center">
            <h3 className="mb-4 sm:mb-5 text-base sm:text-lg font-bold">{t.nav.contact}</h3>
            
            {/* Redes sociales */}
            <div className="mb-5 flex gap-3 sm:gap-4">
              {socialLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-9 w-9 sm:h-10 sm:w-10 items-center justify-center rounded-full bg-gray-800 transition-all hover:bg-primary hover:scale-110"
                  aria-label={link.label}
                >
                  <link.icon className="h-4 w-4 sm:h-5 sm:w-5" />
                </a>
              ))}
            </div>

            {/* Contacto directo */}
            <div className="space-y-3">
              {/* Email copiable */}
              <div className="flex items-center gap-3 text-sm sm:text-base text-gray-300">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-gray-800">
                  <Mail className="h-4 w-4" />
                </div>
                <span 
                  className="cursor-pointer hover:text-white transition-colors select-all break-all"
                  onClick={() => copyToClipboard(email, "Email")}
                  title="Haz clic para copiar"
                >
                  {email}
                </span>
              </div>

              {/* WhatsApp copiable */}
              <div className="flex items-center gap-3 text-sm sm:text-base text-gray-300">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-gray-800">
                  <Phone className="h-4 w-4" />
                </div>
                <span 
                  className="cursor-pointer hover:text-white transition-colors select-all"
                  onClick={() => copyToClipboard(whatsappNumber, "WhatsApp")}
                  title="Haz clic para copiar"
                >
                  {whatsappNumber}
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-6 sm:mt-8 border-t border-gray-800 pt-6 sm:pt-8 text-center text-xs sm:text-sm text-gray-400">
          <p>
            © {new Date().getFullYear()} COOLFIX. {t.footer.rights}
          </p>
        </div>
      </div>
    </footer>
  )
}
