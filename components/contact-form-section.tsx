"use client"

import type React from "react"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Send } from "lucide-react"
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
    <section id="contacto" className="bg-white py-20">
      <div className="container mx-auto px-4">
        <div className="mb-12 text-center">
          <h2 className="mb-4 text-balance text-3xl font-bold text-foreground md:text-4xl">{t.contactForm.title}</h2>
          <p className="text-pretty text-lg text-muted-foreground">{t.contactForm.subtitle}</p>
        </div>

        <Card className="mx-auto max-w-2xl border-2 p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid gap-6 md:grid-cols-2">
              <div>
                <label className="mb-2 block text-sm font-medium text-foreground">{t.contactForm.name}</label>
                <Input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full"
                />
              </div>
              <div>
                <label className="mb-2 block text-sm font-medium text-foreground">{t.contactForm.email}</label>
                <Input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full"
                />
              </div>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
              <div>
                <label className="mb-2 block text-sm font-medium text-foreground">{t.contactForm.phone}</label>
                <Input
                  type="tel"
                  required
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full"
                />
              </div>
              <div>
                <label className="mb-2 block text-sm font-medium text-foreground">{t.contactForm.serviceType}</label>
                <Select
                  value={formData.serviceType}
                  onValueChange={(value) => setFormData({ ...formData, serviceType: value })}
                >
                  <SelectTrigger className="w-full">
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

            <div>
              <label className="mb-2 block text-sm font-medium text-foreground">{t.contactForm.description}</label>
              <Textarea
                required
                rows={5}
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                className="w-full resize-none"
              />
            </div>

            <Button type="submit" size="lg" className="w-full gap-2">
              {t.contactForm.submit}
              <Send className="h-4 w-4" />
            </Button>
          </form>
        </Card>
      </div>
    </section>
  )
}
