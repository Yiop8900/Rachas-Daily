# 🔥 Contador de Rachas Diarias

Una aplicación web simple y elegante para hacer seguimiento de tus rachas diarias con animaciones de llama y almacenamiento persistente.

## ✨ Características

- **Contador de Rachas**: Mantén un seguimiento de tu racha actual y máxima
- **Animaciones de Llama**: Llama animada que se enciende cuando marcas un día completado
- **Almacenamiento Persistente**: Los datos se guardan automáticamente en el navegador
- **Historial Completo**: Ve todas tus entradas pasadas
- **Exportación de Datos**: Los datos se pueden exportar a JSON para respaldar
- **Diseño Responsivo**: Funciona perfectamente en móviles y escritorio
- **Compatible con GitHub Pages**: Lista para desplegar en GitHub

## 🚀 Inicio Rápido

### Uso Local

1. Clona este repositorio:
```bash
git clone https://github.com/TU-USUARIO/Rachas-Daily.git
cd Rachas-Daily
```

2. Abre `index.html` en tu navegador favorito

¡Eso es todo! No se requiere instalación ni dependencias.

### Despliegue en GitHub Pages

1. Sube el código a tu repositorio de GitHub
2. Ve a Settings → Pages
3. En "Source", selecciona la rama `main` y carpeta `/root`
4. Haz clic en "Save"
5. Tu aplicación estará disponible en `https://TU-USUARIO.github.io/Rachas-Daily`

## 📖 Cómo Usar

1. **Marcar Día Completado**: Haz clic en el botón "✓ Marcar Día Completado" cada día que completes tu objetivo
2. **Ver Estadísticas**: Observa tu racha actual, racha máxima y total de días
3. **Animación de Llama**: La llama se encenderá con una animación cada vez que marques un día
4. **Historial**: Revisa todas tus entradas en la sección de historial
5. **Reiniciar**: Si necesitas empezar de nuevo, usa el botón "↻ Reiniciar Racha"

## 💾 Almacenamiento de Datos

Los datos se almacenan de dos maneras:

1. **LocalStorage del Navegador**: Los datos persisten automáticamente entre sesiones
2. **Archivo JSON**: Se puede exportar a `streak-data.json` para respaldo

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
├── index.html          # Estructura HTML principal
├── styles.css          # Estilos y animaciones
├── app.js              # Lógica de la aplicación
├── data/
│   └── streak-data.json  # Datos de ejemplo
└── README.md           # Este archivo
```

## 🛠️ Tecnologías

- HTML5
- CSS3 (Animaciones, Grid, Flexbox)
- JavaScript (ES6+)
- LocalStorage API

## 🤝 Contribuir

Las contribuciones son bienvenidas:

1. Haz un Fork del proyecto
2. Crea una rama para tu característica (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## 📝 Ideas para Mejoras

- [ ] Agregar diferentes tipos de rachas (ejercicio, estudio, etc.)
- [ ] Implementar sistema de recompensas/logros
- [ ] Añadir gráficos de progreso
- [ ] Modo oscuro
- [ ] Recordatorios con notificaciones del navegador
- [ ] Sincronización con la nube
- [ ] Exportar a CSV/Excel

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
