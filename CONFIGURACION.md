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

### 2️⃣ Crear un GitHub Gist

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
3. Decide si será:
   - **Secret gist**: Solo visible para quienes tengan el enlace
   - **Public gist**: Visible para todos en tu perfil
4. Haz clic en **"Create secret gist"** o **"Create public gist"**
5. Copia el **ID del Gist** de la URL:
   - URL completa: `https://gist.github.com/TU-USUARIO/abc123def456...`
   - **ID del Gist**: `abc123def456...` (la parte alfanumérica después de tu usuario)

### 3️⃣ Configurar la Aplicación

1. Abre el archivo `config.js` en tu proyecto
2. Reemplaza los valores:

```javascript
const CONFIG = {
    GITHUB_TOKEN: 'ghp_TU_TOKEN_AQUI',  // ← Pega tu token aquí
    GIST_ID: 'abc123def456...',          // ← Pega tu Gist ID aquí
    DATA_FILE_NAME: 'streak-data.json',
    AUTO_REFRESH_INTERVAL: 30000
};
```

### 4️⃣ Subir a GitHub

```bash
# Desde la carpeta del proyecto
git add .
git commit -m "Configurar sistema compartido de rachas"
git push origin main
```

### 5️⃣ Activar GitHub Pages

1. Ve a tu repositorio en GitHub
2. **Settings** → **Pages**
3. En **Source**: Selecciona `main` branch y carpeta `/ (root)`
4. Haz clic en **Save**
5. Espera unos minutos y tu app estará en:
   - `https://TU-USUARIO.github.io/Rachas-Daily`

### 6️⃣ Compartir con tus Compañeros

Comparte el enlace de GitHub Pages con tus compañeros:
- `https://TU-USUARIO.github.io/Rachas-Daily`

**¡Todos verán y compartirán la misma racha!** 🎉

---

## 🔒 Seguridad del Token

### ⚠️ IMPORTANTE: NO subas el token a GitHub

El archivo `config.js` contiene tu token. Para protegerlo:

**Opción A: Usar Variables de Entorno (Recomendado para producción)**

Crea un archivo `config.js` vacío en GitHub y usa este método:

```javascript
// config.js (versión pública)
const CONFIG = {
    GITHUB_TOKEN: prompt('Ingresa tu GitHub Token:'),
    GIST_ID: prompt('Ingresa tu Gist ID:'),
    DATA_FILE_NAME: 'streak-data.json',
    AUTO_REFRESH_INTERVAL: 30000
};
export default CONFIG;
```

**Opción B: Archivo Local No Rastreado**

1. Agrega `config.js` al `.gitignore`:
```bash
echo "config.js" >> .gitignore
```

2. Crea `config.example.js` para compartir:
```javascript
// config.example.js
const CONFIG = {
    GITHUB_TOKEN: 'TU_GITHUB_TOKEN_AQUI',
    GIST_ID: 'TU_GIST_ID_AQUI',
    DATA_FILE_NAME: 'streak-data.json',
    AUTO_REFRESH_INTERVAL: 30000
};
export default CONFIG;
```

3. Cada usuario copia `config.example.js` → `config.js` y agrega sus valores

---

## 🎯 Cómo Funciona

1. **Datos Centralizados**: Todos los datos se guardan en el GitHub Gist
2. **Actualización Automática**: La app refresca los datos cada 30 segundos
3. **Sincronización**: Cuando alguien marca un día, todos lo ven
4. **Respaldo Local**: Si falla la conexión, usa datos guardados localmente

---

## 🆘 Solución de Problemas

### Error: "Error al cargar datos"
- ✅ Verifica que el token sea correcto
- ✅ Confirma que el Gist ID sea el correcto
- ✅ Asegúrate que el token tenga permisos de `gist`

### Error: "Error al guardar datos"
- ✅ Verifica tu conexión a internet
- ✅ El token debe tener permisos de escritura en gists
- ✅ El Gist debe existir y ser accesible

### Los datos no se actualizan
- ✅ Espera 30 segundos (actualización automática)
- ✅ Presiona el botón "🔄 Actualizar Datos"
- ✅ Recarga la página (F5)

---

## 🚀 Características Adicionales

### Botón de Actualización Manual
Agrega un botón para refrescar datos instantáneamente sin esperar los 30 segundos.

### Actualización en Tiempo Real
Los datos se refrescan automáticamente cada 30 segundos para ver cambios de otros usuarios.

### Notificaciones Mejoradas
Sistema de notificaciones que muestra:
- ✅ Éxito al guardar
- ⚠️ Advertencias
- ❌ Errores de conexión

---

## 📞 Soporte

Si tienes problemas, verifica:
1. El token de GitHub es válido
2. El Gist ID es correcto
3. El navegador permite conexiones a la API de GitHub
4. No hay bloqueadores de contenido activos

---

**¡Disfruta compartiendo tu racha con tu equipo! 🔥**
