import type React from "react"
import type { Metadata } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import "./globals.css"

const _geist = Geist({ subsets: ["latin"] })
const _geistMono = Geist_Mono({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Coolfix",
  description:
    "Servicio profesional de reparación de refrigeradores, lavadoras, secadoras y equipos industriales. Atención 24/7 para emergencias. Técnicos certificados y precios justos.",
  generator: "Sebinhas & Miguel",
  keywords: [
    "Coolfix",
    "Reparación de refrigeradores",
    "Reparación de lavadoras",
    "Reparación de secadoras",
    "Reparación de equipos industriales",
    "Atención 24/7",
    "Técnicos certificados",
    "Precios justos",
  ],
  viewport: {
    width: "device-width",
    initialScale: 1,
    maximumScale: 5,
  },
  icons: {
    icon: [
      {
        url: "/img/IconCoolfix.svg",
        type: "image/svg+xml",
      },
    ],
    apple: "/img/IconCoolfix.svg",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="es">
      <body className="font-sans antialiased">
        {children}
        <Analytics />
      </body>
    </html>
  )
}
