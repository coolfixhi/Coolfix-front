# 📧 Configuración de Resend para Formulario de Contacto

Esta guía te ayudará a configurar Resend para que el formulario de contacto envíe emails automáticamente.

## 🔑 Paso 1: Obtener tu API Key de Resend

1. Ve a [https://resend.com](https://resend.com) e inicia sesión (o crea una cuenta si no tienes una)
2. Ve a la sección **API Keys** en tu dashboard
3. Haz clic en **Create API Key**
4. Dale un nombre descriptivo (ej: "Coolfix Production")
5. Copia la API key que se genera (empieza con `re_`)

⚠️ **Importante**: Guarda esta key de forma segura, solo se muestra una vez.

## 🔧 Paso 2: Configurar Variables de Entorno

1. Crea un archivo `.env.local` en la raíz del proyecto (si no existe)
2. Agrega tu API key:

```env
RESEND_API_KEY=re_tu_api_key_aqui
```

3. **NUNCA** subas el archivo `.env.local` a Git (ya está en `.gitignore`)

## 📧 Paso 3: Configurar Dominio (Opcional para Producción)

### Para Desarrollo/Pruebas:
- Puedes usar el email por defecto: `onboarding@resend.dev`
- Este email funciona solo para pruebas y tiene limitaciones

### Para Producción:
1. Ve a **Domains** en tu dashboard de Resend
2. Agrega tu dominio (ej: `coolfix.com`)
3. Configura los registros DNS que Resend te proporciona
4. Espera a que Resend verifique tu dominio
5. Una vez verificado, actualiza el email en `app/api/contact/route.ts`:

```typescript
from: "Coolfix Contacto <contacto@tudominio.com>",
```

## 🚀 Paso 4: Probar el Formulario

1. Inicia el servidor de desarrollo:
   ```bash
   npm run dev
   ```

2. Ve a `http://localhost:3000` y llena el formulario de contacto

3. Verifica que recibas el email en `coolfixh.i@gmail.com`

## 🔍 Solución de Problemas

### Error: "Invalid API Key"
- Verifica que copiaste la API key completa
- Asegúrate de que no hay espacios antes o después de la key
- Verifica que el archivo `.env.local` está en la raíz del proyecto

### Error: "Domain not verified"
- Si estás usando un dominio personalizado, asegúrate de haberlo verificado en Resend
- Para pruebas, usa `onboarding@resend.dev`

### No recibo los emails
- Revisa la carpeta de spam
- Verifica que el email `coolfixh.i@gmail.com` está correcto en `app/api/contact/route.ts`
- Revisa los logs del servidor para ver si hay errores

## 📝 Notas Importantes

- **Límites de Resend**: El plan gratuito tiene límites de envío. Revisa tu plan en el dashboard
- **Seguridad**: Nunca expongas tu API key en el código o en el repositorio
- **Producción**: Para producción, configura un dominio verificado para mejor deliverability

## 🆘 Soporte

Si tienes problemas:
1. Revisa los logs del servidor (`npm run dev`)
2. Revisa el dashboard de Resend para ver el estado de los envíos
3. Consulta la documentación de Resend: https://resend.com/docs
