# 🔥 Contador de Rachas Diarias - Guía de Configuración

## 📋 Pasos para Configurar el Sistema Compartido

### 1️⃣ Crear un GitHub Personal Access Token

1. Ve a tu cuenta de GitHub
2. Navega a: **Settings** → **Developer settings** → **Personal access tokens** → **Tokens (classic)**
3. O usa este enlace directo: https://github.com/settings/tokens/new
4. Configura el token:
   - **Note**: "Contador de Rachas - Gist Access"
   - **Expiration**: Elige la duración que prefieras (90 días, 1 año, o sin expiración)
   - **Select scopes**: Marca únicamente **`gist`** ✓
5. Haz clic en **"Generate token"**
6. **¡IMPORTANTE!** Copia el token generado inmediatamente (solo se muestra una vez)
   - Ejemplo: `ghp_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx`

### 2️⃣ Crear un GitHub Gist PÚBLICO

1. Ve a: https://gist.github.com/
2. Crea un nuevo Gist con:
   - **Filename**: `streak-data.json`
   - **Content**: Copia y pega esto:
   ```json
   {
     "currentStreak": 0,
     "maxStreak": 0,
     "totalDays": 0,
     "lastCheckIn": null,
     "history": []
   }
   ```
3. **IMPORTANTE**: Selecciona **"Create public gist"** (NO secreto)
   - Esto permite que todos puedan leer sin autenticación
   - Solo quienes tienen el token pueden escribir
4. Copia el **ID del Gist** de la URL:
   - URL completa: `https://gist.github.com/TU-USUARIO/abc123def456...`
   - **ID del Gist**: `abc123def456...` (la parte alfanumérica después de tu usuario)

### 3️⃣ Desplegar en GitHub Pages

1. Asegúrate de que tu repositorio esté en GitHub
2. Ve a tu repositorio en GitHub
3. **Settings** → **Pages**
4. En **Source**: Selecciona `main` branch y carpeta `/ (root)`
5. Haz clic en **Save**
6. Espera unos minutos y tu app estará en:
   - `https://TU-USUARIO.github.io/Rachas-Daily`

### 4️⃣ Compartir con tu Equipo

Comparte esta información con tu equipo:

```
🔥 Contador de Rachas del Equipo

📎 Enlace: https://TU-USUARIO.github.io/Rachas-Daily
🔑 Gist ID: abc123def456...
🔐 Token (para marcar días): ghp_xxxx...

Instrucciones:
1. Abre el enlace
2. Ingresa el Gist ID cuando se solicite
3. Para solo ver: ¡Listo!
4. Para marcar días: Ingresa el token cuando lo pida
```

---

## 🎯 Cómo Funciona el Nuevo Sistema

### **Para Administradores:**
1. Crean un Gist PÚBLICO con los datos
2. Comparten el enlace de la app y el Gist ID
3. Opcionalmente comparten el token con quienes quieran que marquen días

### **Para Usuarios (Solo Ver):**
1. Abren el enlace compartido
2. Ingresan el Gist ID
3. ✅ ¡Pueden ver todo sin más configuración!

### **Para Usuarios (Ver y Marcar):**
1. Abren el enlace compartido
2. Ingresan el Gist ID
3. Al marcar un día por primera vez, ingresan el token
4. ✅ ¡Ya pueden marcar días!

### **Ventajas del Nuevo Sistema:**
- ✅ **No requiere configuración compleja**: Solo Gist ID para ver
- ✅ **Acceso instantáneo**: Cualquiera con el enlace puede ver
- ✅ **Seguridad controlada**: Solo quienes tienen token pueden escribir
- ✅ **Sincronización real**: Todos ven los mismos datos
- ✅ **Sin necesidad de código**: Todo se hace en la interfaz

---

## 🆘 Solución de Problemas

### "Necesitas el Gist ID para continuar"
- ✅ Solicita el Gist ID al administrador del equipo
- ✅ Asegúrate de copiar el ID completo (letras y números)
- ✅ El ID se guarda en tu navegador, solo lo necesitas una vez

### "Token requerido para marcar días"
- ✅ Solo necesitas token si quieres marcar días completados
- ✅ Puedes ver la racha sin token
- ✅ Solicita el token al administrador
- ✅ El token se guarda en tu navegador

### "Error al guardar. Verifica tu token y conexión"
- ✅ Verifica que el token sea correcto
- ✅ El token debe tener permisos de `gist`
- ✅ El Gist debe existir y ser accesible
- ✅ Verifica tu conexión a internet

### Los datos no se actualizan
- ✅ Espera 5 segundos (actualización automática)
- ✅ Presiona el botón "🔄 Actualizar Datos"
- ✅ Recarga la página (F5)
- ✅ Verifica que el Gist ID sea correcto

### El Gist debe ser público
- ✅ Para que todos puedan leer sin token, el Gist debe ser PÚBLICO
- ✅ Puedes cambiar un Gist secreto a público en la configuración del Gist
- ✅ Gist público NO significa que cualquiera pueda editar (solo leer)

---

## 🚀 Características del Sistema

### Lectura Pública
- Cualquiera con el Gist ID puede ver el contador
- No requiere autenticación de GitHub
- Actualizaciones en tiempo real cada 5 segundos
- Funciona en cualquier dispositivo

### Escritura Controlada
- Solo quienes tienen el token pueden marcar días
- Solo quienes tienen el token pueden reiniciar
- El token se guarda localmente en cada navegador
- Puedes compartir el token con tu equipo de confianza

### Actualización en Tiempo Real
Los datos se refrescan automáticamente cada 5 segundos para ver cambios de otros usuarios.

### Notificaciones Mejoradas
Sistema de notificaciones que muestra:
- ✅ Éxito al guardar
- ⚠️ Advertencias
- ❌ Errores de conexión

---

## 📞 Soporte Adicional

Si sigues teniendo problemas, verifica:
1. El Gist ID es correcto y completo
2. El Gist es PÚBLICO (no secreto)
3. El token tiene permisos de `gist` (si intentas escribir)
4. Tu navegador permite conexiones a la API de GitHub
5. No hay bloqueadores de contenido activos

---

**¡Disfruta compartiendo tu racha con tu equipo! 🔥**
