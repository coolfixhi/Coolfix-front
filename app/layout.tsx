import type React from "react"
import type { Metadata, Viewport } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import { Toaster } from "@/components/ui/sonner"
import { StructuredData } from "@/components/structured-data"
import "./globals.css"

const _geist = Geist({ subsets: ["latin"] })
const _geistMono = Geist_Mono({ subsets: ["latin"] })

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
}

export const metadata: Metadata = {
  title: {
    default: "Coolfix - Reparación profesional de equipos industriales y domésticos",
    template: "%s | Coolfix",
  },
  description:
    "Coolfix: Servicio profesional de reparación, mantenimiento e instalación de refrigeradores, lavadoras, secadoras, aires acondicionados y equipos industriales. Atención 24/7 para emergencias. Técnicos certificados, respuesta rápida en menos de 30 minutos. Precios justos y garantía total.",
  keywords: [
    "Coolfix",
    "reparación de refrigeradores",
    "reparación de lavadoras",
    "reparación de secadoras",
    "reparación de aires acondicionados",
    "mantenimiento de equipos industriales",
    "mantenimiento preventivo",
    "reparación de equipos domésticos",
    "técnico en refrigeración",
    "servicio de emergencia 24/7",
    "reparación de neveras",
    "reparación de nevecones",
    "mantenimiento de cuartos fríos",
    "reparación de chillers",
    "servicio técnico especializado",
    "refrigeración comercial",
    "refrigeración industrial",
    "reparación de equipos de cocina",
    "calentadores de agua",
    "dispensadores de agua",
    "granizadoras",
    "máquinas de gelato",
    "técnicos certificados",
    "precios justos",
    "garantía total",
    "respuesta rápida",
  ],
  authors: [{ name: "Coolfix" }],
  creator: "Coolfix",
  publisher: "Coolfix",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "https://coolfix.com"),
  alternates: {
    canonical: "/",
    languages: {
      "es": "/",
      "en": "/",
    },
  },
  openGraph: {
    type: "website",
    locale: "es_ES",
    url: "/",
    siteName: "Coolfix",
    title: "Coolfix - Reparación Profesional de Equipos Industriales y Domésticos",
    description:
      "Servicio profesional de reparación, mantenimiento e instalación de refrigeradores, lavadoras, secadoras y equipos industriales. Atención 24/7, técnicos certificados, respuesta en menos de 30 minutos.",
    images: [
      {
        url: "/img/LogoCoolfix.svg",
        width: 1200,
        height: 630,
        alt: "Coolfix - Servicio Profesional de Reparación",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Coolfix - Reparación Profesional de Equipos",
    description:
      "Servicio profesional de reparación, mantenimiento e instalación. Atención 24/7, técnicos certificados, respuesta rápida.",
    images: ["/img/LogoCoolfix.svg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
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
    <html lang="es" suppressHydrationWarning>
      <body className="font-sans antialiased" suppressHydrationWarning>
        <StructuredData />
        {children}
        <Analytics />
        <Toaster />
      </body>
    </html>
  )
}
