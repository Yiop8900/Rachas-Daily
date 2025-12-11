// PLANTILLA DE CONFIGURACIÓN
// Copia este archivo a "config.js" y reemplaza los valores

const CONFIG = {
    // 1. Crea un token en: https://github.com/settings/tokens/new
    //    - Scope necesario: "gist"
    GITHUB_TOKEN: 'TU_GITHUB_TOKEN_AQUI',
    
    // 2. Crea un Gist en: https://gist.github.com/
    //    - Archivo: streak-data.json
    //    - Contenido: {"currentStreak":0,"maxStreak":0,"totalDays":0,"lastCheckIn":null,"history":[]}
    GIST_ID: 'TU_GIST_ID_AQUI',
    
    // Nombre del archivo dentro del Gist (no cambiar)
    DATA_FILE_NAME: 'streak-data.json',
    
    // Intervalo de actualización en milisegundos (30 segundos por defecto)
    AUTO_REFRESH_INTERVAL: 30000
};

export default CONFIG;
