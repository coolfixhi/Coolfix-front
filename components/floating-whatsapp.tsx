"use client"

import { MessageCircle } from "lucide-react"

export function FloatingWhatsApp() {
  const handleWhatsAppClick = () => {
    // Reemplazar con el número real de WhatsApp
    const phoneNumber = "1234567890"
    const message = encodeURIComponent("Hola, me gustaría solicitar información sobre sus servicios.")
    window.open(`https://wa.me/${phoneNumber}?text=${message}`, "_blank")
  }

  return (
    <button
      onClick={handleWhatsAppClick}
      className="fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg transition-transform hover:scale-110 hover:shadow-xl"
      aria-label="Contact via WhatsApp"
    >
      <MessageCircle className="h-7 w-7" />
    </button>
  )
}
