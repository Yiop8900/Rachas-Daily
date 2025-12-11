# 🔥 Contador de Rachas Diarias

Una aplicación web simple y elegante para hacer seguimiento de rachas diarias **compartidas en equipo** con animaciones de llama y almacenamiento persistente en la nube.

## ✨ Características

- **Contador de Rachas Compartido**: Todos en el equipo ven la misma racha
- **Sincronización Automática**: Los datos se actualizan cada 30 segundos
- **Animaciones de Llama**: Llama animada que se enciende cuando se marca un día completado
- **Almacenamiento en la Nube**: Los datos se guardan en GitHub Gist (accesible para todos)
- **Respaldo Local**: Funciona offline con datos guardados localmente
- **Historial Completo**: Ve todas las entradas pasadas del equipo
- **Diseño Responsivo**: Funciona perfectamente en móviles y escritorio
- **Compatible con GitHub Pages**: Lista para desplegar y compartir

## 🚀 Configuración Rápida

### **Paso 1: Crear Token de GitHub**

1. Ve a: https://github.com/settings/tokens/new
2. Nombre: "Contador de Rachas"
3. Permisos: Marca solo **`gist`**
4. Genera y copia el token

### **Paso 2: Crear Gist**

1. Ve a: https://gist.github.com/
2. Filename: `streak-data.json`
3. Contenido:
```json
{"currentStreak":0,"maxStreak":0,"totalDays":0,"lastCheckIn":null,"history":[]}
```
4. Crea el Gist y copia su ID de la URL

### **Paso 3: Configurar**

1. Abre `config.js`
2. Reemplaza:
```javascript
GITHUB_TOKEN: 'tu-token-aqui',
GIST_ID: 'tu-gist-id-aqui',
```

### **Paso 4: Desplegar**

```bash
git add .
git commit -m "Configurar contador compartido"
git push origin main
```

Activa GitHub Pages en Settings → Pages → Source: `main` branch

**📖 Ver [CONFIGURACION.md](CONFIGURACION.md) para guía detallada paso a paso**

## 📖 Cómo Usar

1. **Marcar Día Completado**: Haz clic en "✓ Marcar Día Completado" cada día que completen su objetivo
2. **Ver Estadísticas**: Observa la racha actual, racha máxima y total de días del equipo
3. **Animación de Llama**: La llama se encenderá con una animación cada vez que alguien marque un día
4. **Actualizar Datos**: Usa "🔄 Actualizar Datos" para ver cambios inmediatos
5. **Historial**: Revisa todas las entradas del equipo en la sección de historial
6. **Reiniciar**: El botón "↻ Reiniciar Racha" reinicia para todo el equipo

## 💾 Almacenamiento de Datos

Los datos se almacenan de manera compartida:

1. **GitHub Gist (Principal)**: Almacenamiento en la nube accesible para todos
2. **LocalStorage (Respaldo)**: Copia local para funcionar sin conexión

### Estructura de Datos

```json
{
  "currentStreak": 5,
  "maxStreak": 10,
  "totalDays": 25,
  "lastCheckIn": "2025-12-11",
  "history": [
    {
      "date": "2025-12-11",
      "streak": 5,
      "timestamp": "2025-12-11T10:30:00.000Z"
    }
  ]
}
```

## 🔒 Seguridad

**⚠️ IMPORTANTE**: No subas tu `config.js` con el token a GitHub público

Opciones de seguridad:
1. Agrega `config.js` al `.gitignore`
2. Usa variables de entorno
3. Solicita el token con `prompt()` al cargar la página

Ver [CONFIGURACION.md](CONFIGURACION.md) para más detalles.

## 🎨 Personalización

### Cambiar Colores

Edita las variables de color en `styles.css`:

```css
/* Gradiente principal */
background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);

/* Color de la llama */
background: linear-gradient(to top, #ff6b00 0%, #ff8800 30%, #ffbb00 60%, #ffe100 100%);
```

### Modificar Animaciones

Las animaciones de la llama se pueden ajustar en `styles.css`:

```css
@keyframes flameMove {
  /* Ajusta la velocidad y movimiento aquí */
}
```

## 📁 Estructura del Proyecto

```
Rachas-Daily/
│
├── index.html              # Estructura HTML principal
├── styles.css              # Estilos y animaciones
├── app.js                  # Lógica de la aplicación con sincronización
├── config.js               # Configuración de GitHub (NO SUBIR CON TOKEN)
├── config.example.js       # Plantilla de configuración
├── data/
│   └── streak-data.json    # Datos de ejemplo (se guarda en Gist)
├── CONFIGURACION.md        # Guía detallada de configuración
└── README.md               # Este archivo
```

## 🛠️ Tecnologías

- HTML5
- CSS3 (Animaciones, Grid, Flexbox)
- JavaScript (ES6+ Modules)
- GitHub Gist API
- LocalStorage API (respaldo)

## 👥 Uso en Equipo

### Para el Administrador:
1. Configura el token y Gist ID
2. Despliega en GitHub Pages
3. Comparte el enlace con el equipo

### Para los Miembros del Equipo:
1. Accede al enlace compartido
2. ¡Eso es todo! No necesitas configurar nada
3. Todos ven y comparten la misma racha

### Funcionalidades Colaborativas:
- **Actualización automática**: Los datos se refrescan cada 30 segundos
- **Sincronización**: Cuando alguien marca un día, todos lo ven
- **Historial compartido**: Todos ven las contribuciones del equipo

## 🤝 Contribuir

Las contribuciones son bienvenidas:

1. Haz un Fork del proyecto
2. Crea una rama para tu característica (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## 📝 Ideas para Mejoras

- [ ] Sistema de autenticación para identificar quién marcó cada día
- [ ] Diferentes tipos de rachas por categoría (ejercicio, estudio, etc.)
- [ ] Implementar sistema de recompensas/logros por equipo
- [ ] Añadir gráficos de progreso con charts
- [ ] Modo oscuro
- [ ] Notificaciones push del navegador
- [ ] Exportar a CSV/Excel
- [ ] Chat o comentarios por día
- [ ] Rankings individuales dentro del equipo

## 🆘 Soporte y Problemas Comunes

### "Error al cargar datos"
- Verifica el token y Gist ID en `config.js`
- Asegúrate que el token tenga permisos `gist`
- Revisa que el Gist exista y sea accesible

### "Los datos no se actualizan"
- Espera 30 segundos (auto-refresh)
- Presiona "🔄 Actualizar Datos"
- Verifica tu conexión a internet

### "Conflictos de sincronización"
- La app usa el sistema "último en escribir gana"
- Evita que múltiples personas hagan check-in simultáneamente
- El respaldo local protege contra pérdida de datos

**Ver [CONFIGURACION.md](CONFIGURACION.md) para más detalles**

## 📄 Licencia

Este proyecto está bajo la Licencia MIT - mira el archivo [LICENSE](LICENSE) para más detalles.

## 👤 Autor

Tu Nombre - [@tu-usuario](https://github.com/tu-usuario)

## 🙏 Agradecimientos

- Inspirado en aplicaciones de seguimiento de hábitos como Duolingo
- Iconos de emojis nativos del sistema
- Comunidad de GitHub por el hosting gratuito

---

**¡Mantén tu racha viva! 🔥**
