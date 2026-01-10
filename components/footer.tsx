"use client"

import { Snowflake, Mail, Facebook, MessageCircle } from "lucide-react"
import type { TranslationKey } from "@/lib/translations"

interface FooterProps {
  t: TranslationKey
}

export function Footer({ t }: FooterProps) {
  const socialLinks = [
    {
      icon: Mail,
      href: "mailto:contacto@coolfix.com",
      label: "Email",
    },
    {
      icon: Facebook,
      href: "https://facebook.com",
      label: "Facebook",
    },
    {
      icon: MessageCircle,
      href: "https://wa.me/1234567890",
      label: "WhatsApp",
    },
  ]

  return (
    <footer className="bg-gray-900 text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid gap-8 md:grid-cols-3">
          <div>
            <div className="mb-4 flex items-center gap-2">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary">
                <Snowflake className="h-6 w-6 text-white" />
              </div>
              <span className="text-2xl font-bold">COOLFIX</span>
            </div>
            <p className="text-sm text-gray-400">{t.footer.description}</p>
          </div>

          <div>
            <h3 className="mb-4 text-lg font-bold">{t.nav.services}</h3>
            <ul className="space-y-2 text-sm text-gray-400">
              <li>Refrigeración</li>
              <li>Lavandería</li>
              <li>Mantenimiento</li>
              <li>Emergencias 24/7</li>
            </ul>
          </div>

          <div>
            <h3 className="mb-4 text-lg font-bold">{t.nav.contact}</h3>
            <div className="flex gap-4">
              {socialLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-800 transition-colors hover:bg-primary"
                  aria-label={link.label}
                >
                  <link.icon className="h-5 w-5" />
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-8 border-t border-gray-800 pt-8 text-center text-sm text-gray-400">
          <p>
            © {new Date().getFullYear()} COOLFIX. {t.footer.rights}
          </p>
        </div>
      </div>
    </footer>
  )
}
