"use client"

import type React from "react"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Send, User, Mail, Phone, Wrench, MessageSquare } from "lucide-react"
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Aquí iría la lógica para enviar el formulario
    console.log("Form submitted:", formData)
    alert(t.contactForm.success)
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
    <section id="contacto" className="bg-gradient-to-b from-gray-50 to-white py-16 sm:py-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-10 sm:mb-12 text-center">
          <h2 className="mb-4 text-balance text-2xl sm:text-3xl md:text-4xl font-bold text-foreground">
            {t.contactForm.title}
          </h2>
          <p className="text-pretty text-base sm:text-lg text-muted-foreground">{t.contactForm.subtitle}</p>
        </div>

        <div className="mx-auto max-w-3xl">
          <Card className="border-2 border-border/50 bg-white/80 backdrop-blur-sm p-6 sm:p-8 md:p-10 shadow-xl">
            <form onSubmit={handleSubmit} className="space-y-6 sm:space-y-8">
              <div className="grid gap-6 sm:gap-8 md:grid-cols-2">
                <div className="group space-y-2">
                  <label className="flex items-center gap-2 text-sm font-semibold text-foreground transition-colors group-focus-within:text-primary">
                    <User className="h-4 w-4" />
                    {t.contactForm.name}
                  </label>
                  <Input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="h-12 transition-all duration-200 focus:border-primary focus:ring-2 focus:ring-primary/20"
                    placeholder="Ingresa tu nombre completo"
                  />
                </div>
                <div className="group space-y-2">
                  <label className="flex items-center gap-2 text-sm font-semibold text-foreground transition-colors group-focus-within:text-primary">
                    <Mail className="h-4 w-4" />
                    {t.contactForm.email}
                  </label>
                  <Input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="h-12 transition-all duration-200 focus:border-primary focus:ring-2 focus:ring-primary/20"
                    placeholder="correo@ejemplo.com"
                  />
                </div>
              </div>

              <div className="grid gap-6 sm:gap-8 md:grid-cols-2">
                <div className="group space-y-2">
                  <label className="flex items-center gap-2 text-sm font-semibold text-foreground transition-colors group-focus-within:text-primary">
                    <Phone className="h-4 w-4" />
                    {t.contactForm.phone}
                  </label>
                  <Input
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="h-12 transition-all duration-200 focus:border-primary focus:ring-2 focus:ring-primary/20"
                    placeholder="+1234567890"
                  />
                </div>
                <div className="group space-y-2">
                  <label className="flex items-center gap-2 text-sm font-semibold text-foreground transition-colors group-focus-within:text-primary">
                    <Wrench className="h-4 w-4" />
                    {t.contactForm.serviceType}
                  </label>
                  <Select
                    value={formData.serviceType}
                    onValueChange={(value) => setFormData({ ...formData, serviceType: value })}
                  >
                    <SelectTrigger className="h-12 transition-all duration-200 focus:border-primary focus:ring-2 focus:ring-primary/20">
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

              <div className="group space-y-2">
                <label className="flex items-center gap-2 text-sm font-semibold text-foreground transition-colors group-focus-within:text-primary">
                  <MessageSquare className="h-4 w-4" />
                  {t.contactForm.description}
                </label>
                <Textarea
                  required
                  rows={5}
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="min-h-[120px] resize-none transition-all duration-200 focus:border-primary focus:ring-2 focus:ring-primary/20"
                  placeholder="Describe tu problema o necesidad..."
                />
              </div>

              <Button
                type="submit"
                size="lg"
                className="group relative w-full gap-2 overflow-hidden py-6 text-base font-semibold transition-all duration-300 hover:scale-[1.02] hover:shadow-lg active:scale-[0.98]"
              >
                <span className="relative z-10 flex items-center justify-center gap-2">
                  {t.contactForm.submit}
                  <Send className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-primary via-primary/90 to-primary opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
              </Button>
            </form>
          </Card>
        </div>
      </div>
    </section>
  )
}
