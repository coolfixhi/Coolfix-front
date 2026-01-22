# 🛠️ Coolfix - Sitio Web de Servicios de Reparación

Sitio web profesional para servicios de reparación de refrigeradores, lavadoras, secadoras y equipos industriales. Desarrollado con Next.js 16 y React 19, con soporte multiidioma y diseño responsive.

## ✨ Características

- 🌐 **Multiidioma**: Soporte para español e inglés con cambio dinámico de idioma
- 🎨 **Modo Oscuro/Claro**: Tema adaptable con soporte para preferencias del sistema
- 📱 **Diseño Responsive**: Optimizado para todos los dispositivos (móvil, tablet, desktop)
- ⚡ **Rendimiento Optimizado**: Construido con Next.js 16 y Turbopack para máxima velocidad
- 🎯 **UI Moderna**: Componentes de Radix UI con Tailwind CSS 4
- 📧 **Formulario de Contacto**: Validación con React Hook Form y Zod
- 💬 **WhatsApp Flotante**: Botón flotante para contacto directo
- 📊 **Analytics**: Integración con Vercel Analytics
- ♿ **Accesible**: Componentes accesibles siguiendo las mejores prácticas

## 🚀 Tecnologías Utilizadas

### Core
- **[Next.js 16.0.3](https://nextjs.org/)** - Framework React con App Router
- **[React 19.2.0](https://react.dev/)** - Biblioteca de UI
- **[TypeScript 5](https://www.typescriptlang.org/)** - Tipado estático

### Estilos
- **[Tailwind CSS 4.1.9](https://tailwindcss.com/)** - Framework CSS utility-first
- **[PostCSS](https://postcss.org/)** - Procesador de CSS
- **[Autoprefixer](https://github.com/postcss/autoprefixer)** - Prefijos CSS automáticos

### UI Components
- **[Radix UI](https://www.radix-ui.com/)** - Componentes primitivos accesibles
- **[Lucide React](https://lucide.dev/)** - Iconos modernos
- **[Class Variance Authority](https://cva.style/)** - Utilidades para variantes de componentes

### Formularios y Validación
- **[React Hook Form](https://react-hook-form.com/)** - Gestión de formularios
- **[Zod](https://zod.dev/)** - Validación de esquemas
- **[@hookform/resolvers](https://github.com/react-hook-form/resolvers)** - Resolvers para validación

### Otras Librerías
- **[next-themes](https://github.com/pacocoursey/next-themes)** - Gestión de temas
- **[date-fns](https://date-fns.org/)** - Manipulación de fechas
- **[Sonner](https://sonner.emilkowal.ski/)** - Notificaciones toast
- **[Vercel Analytics](https://vercel.com/analytics)** - Analytics de rendimiento

## 📋 Requisitos Previos

Antes de comenzar, asegúrate de tener instalado:

- **Node.js** 18.17 o superior
- **npm** 9.x o superior (o **pnpm** / **yarn**)

## 🛠️ Instalación

1. **Clona el repositorio**
   ```bash
   git clone https://github.com/coolfixhi/Coolfix-front.git
   cd Coolfix-front
   ```

2. **Instala las dependencias**
   ```bash
   npm install
   # o
   pnpm install
   # o
   yarn install
   ```

3. **Inicia el servidor de desarrollo**
   ```bash
   npm run dev
   # o
   pnpm dev
   # o
   yarn dev
   ```

4. **Abre tu navegador**
   Navega a [http://localhost:3000](http://localhost:3000) para ver la aplicación.

## 📜 Scripts Disponibles

```bash
# Desarrollo
npm run dev          # Inicia el servidor de desarrollo en http://localhost:3000

# Producción
npm run build        # Construye la aplicación para producción
npm run start        # Inicia el servidor de producción

# Calidad de Código
npm run lint         # Ejecuta ESLint para verificar el código
```

## 📁 Estructura del Proyecto

```
coolfix-front/
├── app/                    # App Router de Next.js
│   ├── layout.tsx         # Layout principal con metadata
│   ├── page.tsx           # Página principal
│   └── globals.css        # Estilos globales
├── components/            # Componentes React
│   ├── ui/               # Componentes de UI reutilizables (Radix UI)
│   ├── navbar.tsx        # Barra de navegación
│   ├── hero-section.tsx  # Sección hero
│   ├── services-section.tsx
│   ├── why-section.tsx
│   ├── testimonials-section.tsx
│   ├── hours-section.tsx
│   ├── contact-form-section.tsx
│   ├── footer.tsx
│   ├── floating-whatsapp.tsx
│   └── theme-provider.tsx
├── hooks/                # Custom hooks
│   ├── use-mobile.ts
│   └── use-toast.ts
├── lib/                  # Utilidades y configuraciones
│   ├── translations.ts   # Traducciones (es/en)
│   └── utils.ts         # Funciones utilitarias
├── public/              # Archivos estáticos
│   ├── icon-*.png       # Iconos de la aplicación
│   └── img/             # Imágenes del sitio
├── styles/              # Estilos adicionales
├── next.config.mjs      # Configuración de Next.js
├── tailwind.config.js   # Configuración de Tailwind CSS
├── tsconfig.json        # Configuración de TypeScript
└── package.json         # Dependencias y scripts
```

## ⚙️ Configuración

### Variables de Entorno

Actualmente el proyecto no requiere variables de entorno, pero puedes agregar un archivo `.env.local` si necesitas configurar:

```env
# Ejemplo de variables de entorno
NEXT_PUBLIC_SITE_URL=https://coolfix.com
NEXT_PUBLIC_WHATSAPP_NUMBER=+1234567890
```

### Personalización

- **Traducciones**: Edita `lib/translations.ts` para modificar los textos
- **Estilos**: Modifica `app/globals.css` o los componentes individuales
- **Tema**: Configura los colores en `tailwind.config.js`

## 🚀 Despliegue

### Vercel (Recomendado)

El proyecto está optimizado para desplegarse en Vercel:

1. Conecta tu repositorio de GitHub a Vercel
2. Vercel detectará automáticamente Next.js
3. El despliegue se realizará automáticamente en cada push

### Otros Proveedores

El proyecto puede desplegarse en cualquier plataforma que soporte Next.js:

- **Netlify**
- **AWS Amplify**
- **Railway**
- **DigitalOcean App Platform**

## 🎨 Características de UI

- **Componentes Accesibles**: Todos los componentes siguen las mejores prácticas de accesibilidad
- **Animaciones Suaves**: Transiciones y animaciones optimizadas
- **Responsive Design**: Diseño mobile-first
- **Dark Mode**: Soporte completo para modo oscuro
- **Formularios Validados**: Validación en tiempo real con mensajes de error claros

## 📱 Secciones del Sitio

1. **Hero Section**: Presentación principal con CTAs
2. **Servicios**: Catálogo de servicios ofrecidos
3. **Por Qué Elegirnos**: Ventajas y beneficios
4. **Testimonios**: Reseñas de clientes
5. **Horarios**: Información de disponibilidad
6. **Contacto**: Formulario de contacto funcional
7. **Footer**: Información adicional y enlaces

## 🤝 Contribución

Las contribuciones son bienvenidas. Por favor:

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## 📝 Licencia

Este proyecto es privado. Todos los derechos reservados.

## 👥 Autores

- **Sebinhas & Miguel** - Desarrollo y diseño

---

**Desarrollado con ❤️ usando Next.js y React**
