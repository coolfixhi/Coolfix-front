"use client"

import type React from "react"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Send, User, Mail, Phone, Wrench, MessageSquare, Loader2 } from "lucide-react"
import { toast } from "sonner"
import type { TranslationKey } from "@/lib/translations"

interface ContactFormSectionProps {
  t: TranslationKey
}

export function ContactFormSection({ t }: ContactFormSectionProps) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    serviceType: "",
    description: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    // Validar teléfono: mínimo 10 dígitos
    const phoneDigits = formData.phone.replace(/\D/g, '') // Remover todo excepto números
    if (phoneDigits.length < 10) {
      toast.error("Teléfono inválido", {
        description: "El teléfono debe tener al menos 10 dígitos.",
        duration: 5000,
      })
      return
    }

    setIsSubmitting(true)

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || t.contactForm.error)
      }

      // Mostrar mensaje de éxito
      toast.success(t.contactForm.success, {
        description: "Nos pondremos en contacto contigo pronto.",
        duration: 5000,
      })

      // Limpiar el formulario
      setFormData({
        name: "",
        email: "",
        phone: "",
        serviceType: "",
        description: "",
      })
    } catch (error) {
      console.error("Error al enviar formulario:", error)
      toast.error(t.contactForm.error, {
        description: error instanceof Error ? error.message : "Por favor, intenta nuevamente más tarde.",
        duration: 5000,
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  const services = [
    "Refrigeradores",
    "Lavadoras",
    "Secadoras",
    "Refrigeración Industrial",
    "Mantenimiento Preventivo",
    "Emergencia",
  ]

  return (
    <section id="contacto" className="bg-linear-to-b from-gray-50 to-white py-12 sm:py-16 md:py-20">
      <div className="container mx-auto px-3 sm:px-4 md:px-6 lg:px-8">
        <div className="mb-8 sm:mb-10 md:mb-12 text-center">
          <h2 className="mb-3 sm:mb-4 text-balance text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-foreground">
            {t.contactForm.title}
          </h2>
          <p className="text-pretty text-sm sm:text-base md:text-lg text-muted-foreground px-2">{t.contactForm.subtitle}</p>
        </div>

        <div className="mx-auto max-w-3xl">
          <Card className="border-2 border-border/50 bg-white/95 backdrop-blur-sm p-4 sm:p-6 md:p-8 lg:p-10 shadow-xl transition-shadow duration-300 hover:shadow-2xl">
            <form onSubmit={handleSubmit} className="space-y-5 sm:space-y-6 md:space-y-8">
              <div className="grid gap-5 sm:gap-6 md:gap-8 md:grid-cols-2">
                <div className="group space-y-2.5">
                  <label className="flex items-center gap-2 text-xs sm:text-sm font-semibold text-foreground transition-colors group-focus-within:text-primary">
                    <User className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-muted-foreground group-focus-within:text-primary transition-colors" />
                    {t.contactForm.name}
                  </label>
                  <Input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="h-11 sm:h-12 text-sm sm:text-base transition-all duration-200 focus:border-primary focus:ring-2 focus:ring-primary/20 border-border/60"
                    placeholder="Ingresa tu nombre completo"
                  />
                </div>
                <div className="group space-y-2.5">
                  <label className="flex items-center gap-2 text-xs sm:text-sm font-semibold text-foreground transition-colors group-focus-within:text-primary">
                    <Mail className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-muted-foreground group-focus-within:text-primary transition-colors" />
                    {t.contactForm.email}
                  </label>
                  <Input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="h-11 sm:h-12 text-sm sm:text-base transition-all duration-200 focus:border-primary focus:ring-2 focus:ring-primary/20 border-border/60"
                    placeholder="correo@ejemplo.com"
                  />
                </div>
              </div>

              <div className="grid gap-5 sm:gap-6 md:gap-8 md:grid-cols-2">
                <div className="group space-y-2.5">
                  <label className="flex items-center gap-2 text-xs sm:text-sm font-semibold text-foreground transition-colors group-focus-within:text-primary">
                    <Phone className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-muted-foreground group-focus-within:text-primary transition-colors" />
                    {t.contactForm.phone}
                  </label>
                  <Input
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="h-11 sm:h-12 text-sm sm:text-base transition-all duration-200 focus:border-primary focus:ring-2 focus:ring-primary/20 border-border/60"
                    placeholder="+1234567890"
                  />
                </div>
                <div className="group space-y-2.5">
                  <label className="flex items-center gap-2 text-xs sm:text-sm font-semibold text-foreground transition-colors group-focus-within:text-primary">
                    <Wrench className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-muted-foreground group-focus-within:text-primary transition-colors" />
                    {t.contactForm.serviceType}
                  </label>
                  <Select
                    value={formData.serviceType}
                    onValueChange={(value) => setFormData({ ...formData, serviceType: value })}
                  >
                    <SelectTrigger 
                      size="default"
                      className="w-full h-11 sm:h-12 text-sm sm:text-base transition-all duration-200 focus:border-primary focus:ring-2 focus:ring-primary/20 border-border/60 data-[placeholder]:text-muted-foreground px-3 py-1 [&[data-size=default]]:h-11 sm:[&[data-size=default]]:h-12"
                    >
                      <SelectValue placeholder={t.contactForm.selectService} />
                    </SelectTrigger>
                    <SelectContent>
                      {services.map((service) => (
                        <SelectItem key={service} value={service}>
                          {service}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="group space-y-2.5">
                <label className="flex items-center gap-2 text-xs sm:text-sm font-semibold text-foreground transition-colors group-focus-within:text-primary">
                  <MessageSquare className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-muted-foreground group-focus-within:text-primary transition-colors" />
                  {t.contactForm.description}
                </label>
                <Textarea
                  required
                  rows={5}
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="min-h-[100px] sm:min-h-[120px] resize-none text-sm sm:text-base transition-all duration-200 focus:border-primary focus:ring-2 focus:ring-primary/20 border-border/60"
                  placeholder="Describe tu problema o necesidad..."
                />
              </div>

              <div className="pt-2">
                <Button
                  type="submit"
                  size="lg"
                  disabled={isSubmitting}
                  className="group relative w-full gap-2 overflow-hidden py-4 sm:py-5 md:py-6 text-sm sm:text-base font-semibold transition-all duration-300 hover:scale-[1.01] hover:shadow-xl active:scale-[0.99] disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
                >
                  <span className="relative z-10 flex items-center justify-center gap-2">
                    {isSubmitting ? (
                      <>
                        <Loader2 className="h-5 w-5 animate-spin" />
                        {t.contactForm.sending}
                      </>
                    ) : (
                      <>
                        {t.contactForm.submit}
                        <Send className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
                      </>
                    )}
                  </span>
                  <div className="absolute inset-0 bg-linear-to-r from-primary via-primary/90 to-primary opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                </Button>
              </div>
            </form>
          </Card>
        </div>
      </div>
    </section>
  )
}
