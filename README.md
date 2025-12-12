# 🔥 Contador de Rachas Diarias

Una aplicación web simple y elegante para hacer seguimiento de rachas diarias **compartidas en equipo** con animaciones de llama y almacenamiento persistente en la nube.

## ✨ Características

- **Contador de Rachas Compartido**: Todos en el equipo ven la misma racha en tiempo real
- **Acceso Sin Configuración**: Los usuarios solo necesitan el enlace para ver la racha
- **Sincronización Automática**: Los datos se actualizan cada 5 segundos
- **Animaciones de Llama**: Llama animada que se enciende cuando se marca un día completado
- **Almacenamiento en la Nube**: Los datos se guardan en GitHub Gist (accesible para todos)
- **Respaldo Local**: Funciona offline con datos guardados localmente
- **Historial Completo**: Ve todas las entradas pasadas del equipo
- **Diseño Responsivo**: Funciona perfectamente en móviles y escritorio
- **Compatible con GitHub Pages**: Lista para desplegar y compartir

## 🚀 Configuración Rápida (Administrador)

### **Paso 1: Crear Token de GitHub**

1. Ve a: https://github.com/settings/tokens/new
2. Nombre: "Contador de Rachas"
3. Permisos: Marca solo **`gist`**
4. Genera y **GUARDA** el token (lo necesitarás para configurar)

### **Paso 2: Crear Gist PÚBLICO**

1. Ve a: https://gist.github.com/
2. Filename: `streak-data.json`
3. Contenido:
```json
{"currentStreak":0,"maxStreak":0,"totalDays":0,"lastCheckIn":null,"history":[]}
```
4. **IMPORTANTE**: Crea un **Gist PÚBLICO** (no secreto)
5. Copia el **ID del Gist** de la URL (ej: `abc123def456...`)

### **Paso 3: Compartir con tu Equipo**

1. Despliega en GitHub Pages (ver abajo)
2. Comparte con tu equipo:
   - 📎 **Enlace de la app**: `https://TU-USUARIO.github.io/Rachas-Daily`
   - 🔑 **Gist ID**: El ID que copiaste en el Paso 2
   - 🔐 **Token** (opcional): Solo lo necesitan quienes marquen días

### **Paso 4: Desplegar en GitHub Pages**

```bash
git add .
git commit -m "Configurar contador compartido"
git push origin main
```

Luego en GitHub: **Settings** → **Pages** → Source: `main` branch → **Save**

Tu app estará en: `https://TU-USUARIO.github.io/Rachas-Daily`

**📖 Ver [CONFIGURACION.md](CONFIGURACION.md) para guía detallada paso a paso**

## 📖 Cómo Usar (Para Usuarios)

### **Primera Vez:**
1. Abre el enlace compartido por el administrador
2. Ingresa el **Gist ID** cuando se te solicite
3. ¡Listo! Ya puedes ver la racha compartida 🔥

### **Uso Diario:**
1. **Ver la Racha**: Abre el enlace, todos ven lo mismo en tiempo real
2. **Marcar Día Completado**: 
   - Clic en "✓ Marcar Día Completado"
   - Si es tu primera vez marcando, ingresa el **token** compartido
   - ¡La llama se encenderá para todos! 🔥
3. **Ver Historial**: Revisa todas las contribuciones del equipo
4. **Actualización Automática**: Los cambios se sincronizan cada 5 segundos

### **Botones Disponibles:**
- **✓ Marcar Día Completado**: Suma un día a la racha (requiere token)
- **🔄 Actualizar Datos**: Refresca los datos inmediatamente
- **↻ Reiniciar Racha**: Reinicia todo para el equipo (requiere token)
- **⚙️ Configurar**: Cambiar Gist ID o token

## 💾 Almacenamiento de Datos

Los datos se almacenan de manera compartida:

1. **GitHub Gist Público (Principal)**: 
   - Todos pueden LEER sin autenticación
   - Solo quienes tienen el token pueden ESCRIBIR
   - Actualizaciones visibles para todos en tiempo real
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

## 🔒 Seguridad y Privacidad

### **Modelo de Acceso:**
- ✅ **Leer datos**: Cualquiera con el Gist ID (gist público)
- ✅ **Marcar días**: Solo quienes tienen el token compartido
- ✅ **Reiniciar**: Solo quienes tienen el token compartido

### **⚠️ Token de GitHub:**
- Comparte el token **solo con tu equipo de confianza**
- No lo publiques en lugares públicos
- Usa tokens con permisos mínimos (solo `gist`)
- Puedes revocar el token en cualquier momento

### **Opciones de Privacidad:**
1. **Gist Público**: Cualquiera con el ID puede ver (recomendado)
2. **Gist Secreto**: Solo quienes tienen el enlace directo pueden ver

## 👥 Uso en Equipo

### Para el Administrador:
1. Crea el token y Gist público
2. Despliega en GitHub Pages  
3. Comparte con el equipo:
   - 📎 Enlace de la app
   - 🔑 Gist ID
   - 🔐 Token (para quienes marquen días)

### Para los Miembros del Equipo:
1. Abre el enlace compartido
2. Ingresa el Gist ID (solo la primera vez)
3. **Para solo ver**: ¡Ya está! No necesitas nada más
4. **Para marcar días**: Ingresa el token cuando lo solicite

### Funcionalidades Colaborativas:
- **Actualización automática**: Los datos se refrescan cada 5 segundos
- **Sincronización en tiempo real**: Cuando alguien marca un día, todos lo ven
- **Historial compartido**: Todos ven las contribuciones del equipo
- **Vista simultánea**: Múltiples usuarios pueden ver al mismo tiempo

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

### "Necesitas el Gist ID para continuar"
- Solicita el Gist ID al administrador
- Asegúrate de copiar el ID completo (sin espacios)

### "Token requerido para marcar días"
- Solo necesitas token si quieres marcar días
- Solicita el token al administrador de tu equipo
- Puedes ver la racha sin token

### "Error al guardar. Verifica tu token y conexión"
- Verifica que el token sea correcto
- Confirma que el token tenga permisos `gist`
- Revisa tu conexión a internet

### "Los datos no se actualizan"
- Espera 5 segundos (auto-refresh)
- Presiona "🔄 Actualizar Datos"
- Verifica tu conexión a internet

### "Conflictos de sincronización"
- La app usa el sistema "último en escribir gana"
- Evita que múltiples personas marquen simultáneamente
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
