"use client"

import { Mail, Facebook, Instagram, MessageCircle } from "lucide-react"
import type { TranslationKey } from "@/lib/translations"

interface FooterProps {
  t: TranslationKey
}

export function Footer({ t }: FooterProps) {
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
    {
      icon: Mail,
      href: "mailto:Coolfixh.i@gmail.com",
      label: "Email",
    },
  ]

  return (
    <footer className="bg-gray-900 text-white">
      <div className="container mx-auto px-3 sm:px-4 md:px-6 py-8 sm:py-10 md:py-12">
        <div className="grid gap-6 sm:gap-8 md:grid-cols-3">
          <div>
            <div className="mb-3 sm:mb-4 flex items-center gap-2">
              <img 
                src="/img/LogoCoolfix.svg" 
                alt="COOLFIX" 
                className="h-8 sm:h-9 md:h-10 w-auto"
              />
            </div>
            <p className="text-xs sm:text-sm text-gray-400">{t.footer.description}</p>
          </div>

          <div>
            <h3 className="mb-3 sm:mb-4 text-base sm:text-lg font-bold">{t.nav.services}</h3>
            <ul className="space-y-1.5 sm:space-y-2 text-xs sm:text-sm text-gray-400">
              <li>{t.services.airConditioning.title}</li>
              <li>{t.services.domestic.laundry.title}</li>
              <li>{t.services.preventive.title}</li>
              <li>{t.why.emergency.title}</li>
            </ul>
          </div>

          <div>
            <h3 className="mb-3 sm:mb-4 text-base sm:text-lg font-bold">{t.nav.contact}</h3>
            <div className="flex gap-3 sm:gap-4">
              {socialLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-8 w-8 sm:h-9 sm:w-9 md:h-10 md:w-10 items-center justify-center rounded-full bg-gray-800 transition-colors hover:bg-primary"
                  aria-label={link.label}
                >
                  <link.icon className="h-4 w-4 sm:h-5 sm:w-5" />
                </a>
              ))}
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
