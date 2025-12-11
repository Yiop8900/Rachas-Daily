// Configuración - Los usuarios deben ingresar estos valores
let CONFIG = {
    GITHUB_TOKEN: localStorage.getItem('github_token') || '',
    GIST_ID: localStorage.getItem('gist_id') || '',
    DATA_FILE_NAME: 'streak-data.json',
    AUTO_REFRESH_INTERVAL: 30000
};

// Función para configurar credenciales
function setupCredentials() {
    if (!CONFIG.GITHUB_TOKEN || !CONFIG.GIST_ID) {
        const token = prompt('Ingresa tu GitHub Personal Access Token:\n(Se guardará en tu navegador)');
        const gistId = prompt('Ingresa tu Gist ID:\n(Se guardará en tu navegador)');
        
        if (token && gistId) {
            localStorage.setItem('github_token', token);
            localStorage.setItem('gist_id', gistId);
            CONFIG.GITHUB_TOKEN = token;
            CONFIG.GIST_ID = gistId;
            return true;
        }
        return false;
    }
    return true;
}

// Clase para manejar el almacenamiento de datos compartido via GitHub Gist
class StreakStorage {
    constructor() {
        this.storageKey = 'streakData';
        this.gistAPI = `https://api.github.com/gists/${CONFIG.GIST_ID}`;
        this.headers = {
            'Authorization': `token ${CONFIG.GITHUB_TOKEN}`,
            'Accept': 'application/vnd.github.v3+json'
        };
        this.data = null;
        this.isLoading = false;
    }

    // Cargar datos desde GitHub Gist (compartido entre todos)
    async loadData() {
        if (this.isLoading) {
            // Esperar si ya hay una carga en proceso
            await new Promise(resolve => {
                const checkLoading = setInterval(() => {
                    if (!this.isLoading) {
                        clearInterval(checkLoading);
                        resolve();
                    }
                }, 100);
            });
            return this.data;
        }

        this.isLoading = true;

        try {
            console.log('Cargando datos desde GitHub Gist...');
            console.log('URL:', this.gistAPI);
            
            const response = await fetch(this.gistAPI, {
                headers: this.headers
            });

            if (!response.ok) {
                const errorData = await response.json().catch(() => ({}));
                console.error('Error de GitHub:', errorData);
                throw new Error(`Error al cargar datos: ${response.status} - ${errorData.message || 'Error desconocido'}`);
            }

            const gist = await response.json();
            const fileContent = gist.files[CONFIG.DATA_FILE_NAME].content;
            this.data = JSON.parse(fileContent);
            
            // También guardar copia local como respaldo
            localStorage.setItem(this.storageKey, fileContent);
            console.log('Datos cargados exitosamente desde GitHub');
            
        } catch (error) {
            console.error('Error al cargar datos desde Gist:', error);
            console.log('Intentando cargar desde localStorage...');
            
            // Intentar cargar desde localStorage como respaldo
            try {
                const stored = localStorage.getItem(this.storageKey);
                if (stored) {
                    this.data = JSON.parse(stored);
                    console.log('Datos cargados desde localStorage');
                } else {
                    this.data = this.getEmptyData();
                    console.log('Usando datos vacíos por defecto');
                }
            } catch (e) {
                this.data = this.getEmptyData();
                console.log('Error al cargar localStorage, usando datos vacíos');
            }
        } finally {
            this.isLoading = false;
        }

        return this.data;
    }

    // Guardar datos en GitHub Gist (disponible para todos)
    async saveData() {
        try {
            const content = JSON.stringify(this.data, null, 2);
            
            console.log('Intentando guardar en GitHub Gist...');
            
            const response = await fetch(this.gistAPI, {
                method: 'PATCH',
                headers: this.headers,
                body: JSON.stringify({
                    files: {
                        [CONFIG.DATA_FILE_NAME]: {
                            content: content
                        }
                    }
                })
            });

            if (!response.ok) {
                const errorData = await response.json().catch(() => ({}));
                console.error('Error de GitHub:', errorData);
                throw new Error(`Error al guardar datos: ${response.status} - ${errorData.message || 'Error desconocido'}`);
            }

            // También guardar copia local
            localStorage.setItem(this.storageKey, content);
            console.log('Datos guardados exitosamente en GitHub y localmente');
            
            return true;
        } catch (error) {
            console.error('Error al guardar datos en Gist:', error);
            
            // Guardar al menos localmente
            try {
                localStorage.setItem(this.storageKey, JSON.stringify(this.data));
                console.log('Datos guardados solo localmente como respaldo');
                return true; // Retornar true porque al menos se guardó localmente
            } catch (e) {
                console.error('Error al guardar en localStorage:', e);
                return false;
            }
        }
    }

    getEmptyData() {
        return {
            currentStreak: 0,
            maxStreak: 0,
            totalDays: 0,
            lastCheckIn: null,
            history: []
        };
    }

    getCurrentStreak() {
        return this.data.currentStreak;
    }

    getMaxStreak() {
        return this.data.maxStreak;
    }

    getTotalDays() {
        return this.data.totalDays;
    }

    getLastCheckIn() {
        return this.data.lastCheckIn;
    }

    getHistory() {
        return this.data.history;
    }

    async checkIn() {
        // Recargar datos más recientes antes de hacer check-in
        await this.loadData();
        
        const today = new Date().toISOString().split('T')[0];
        const lastCheckIn = this.data.lastCheckIn;

        // Verificar si ya se hizo check-in hoy
        if (lastCheckIn === today) {
            return { success: false, message: '¡Ya registraste tu día de hoy!' };
        }

        // Calcular si la racha continúa
        if (lastCheckIn) {
            const lastDate = new Date(lastCheckIn);
            const todayDate = new Date(today);
            const diffTime = todayDate - lastDate;
            const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

            if (diffDays === 1) {
                // Racha continúa
                this.data.currentStreak++;
            } else if (diffDays > 1) {
                // Racha se rompió
                this.data.currentStreak = 1;
            }
        } else {
            // Primera vez
            this.data.currentStreak = 1;
        }

        // Actualizar racha máxima
        if (this.data.currentStreak > this.data.maxStreak) {
            this.data.maxStreak = this.data.currentStreak;
        }

        // Actualizar total de días
        this.data.totalDays++;

        // Actualizar última fecha
        this.data.lastCheckIn = today;

        // Agregar al historial
        this.data.history.unshift({
            date: today,
            streak: this.data.currentStreak,
            timestamp: new Date().toISOString()
        });

        // Limitar historial a 100 entradas
        if (this.data.history.length > 100) {
            this.data.history = this.data.history.slice(0, 100);
        }

        const saved = await this.saveData();

        return { 
            success: saved, 
            message: saved 
                ? `¡Excelente! Racha de ${this.data.currentStreak} días 🔥`
                : '⚠️ Error al guardar, pero racha registrada localmente',
            streak: this.data.currentStreak
        };
    }

    async reset() {
        this.data = this.getEmptyData();
        await this.saveData();
    }
}

// Clase principal de la aplicación
class StreakApp {
    constructor() {
        this.storage = new StreakStorage();
        this.initElements();
        this.attachEvents();
        this.init();
    }

    async init() {
        // Verificar y solicitar credenciales si es necesario
        if (!setupCredentials()) {
            this.showNotification('⚠️ Configuración cancelada. Usando modo local.', 'error');
            // Intentar cargar datos locales
            await this.storage.loadData();
            this.updateUI();
            return;
        }
        
        // Mostrar estado de carga
        this.showNotification('Cargando datos compartidos...', 'info');
        
        try {
            await this.storage.loadData();
            this.updateUI();
            this.checkStreakStatus();
            this.showNotification('¡Datos cargados correctamente!', 'success');
            
            // Iniciar actualización automática
            this.startAutoRefresh();
        } catch (error) {
            console.error('Error al inicializar:', error);
            this.showNotification('Error al cargar datos. Usando datos locales.', 'error');
        }
    }

    startAutoRefresh() {
        // Refrescar datos cada cierto tiempo para ver cambios de otros usuarios
        setInterval(async () => {
            try {
                await this.storage.loadData();
                this.updateUI();
            } catch (error) {
                console.error('Error al refrescar datos:', error);
            }
        }, CONFIG.AUTO_REFRESH_INTERVAL);
    }

    initElements() {
        this.currentStreakEl = document.getElementById('currentStreak');
        this.maxStreakEl = document.getElementById('maxStreak');
        this.totalDaysEl = document.getElementById('totalDays');
        this.lastUpdateEl = document.getElementById('lastUpdate');
        this.checkInBtn = document.getElementById('checkInBtn');
        this.resetBtn = document.getElementById('resetBtn');
        this.refreshBtn = document.getElementById('refreshBtn');
        this.configBtn = document.getElementById('configBtn');
        this.flameEl = document.getElementById('flame');
        this.notificationEl = document.getElementById('notification');
        this.notificationTextEl = document.getElementById('notificationText');
        this.historyListEl = document.getElementById('historyList');
    }

    attachEvents() {
        this.checkInBtn.addEventListener('click', () => this.handleCheckIn());
        this.resetBtn.addEventListener('click', () => this.handleReset());
        if (this.refreshBtn) {
            this.refreshBtn.addEventListener('click', () => this.handleRefresh());
        }
        if (this.configBtn) {
            this.configBtn.addEventListener('click', () => this.handleConfig());
        }
    }

    handleConfig() {
        if (confirm('¿Deseas reconfigurar tus credenciales de GitHub?')) {
            localStorage.removeItem('github_token');
            localStorage.removeItem('gist_id');
            location.reload();
        }
    }

    async handleRefresh() {
        this.showNotification('Actualizando datos...', 'info');
        try {
            await this.storage.loadData();
            this.updateUI();
            this.showNotification('¡Datos actualizados!', 'success');
        } catch (error) {
            this.showNotification('Error al actualizar', 'error');
        }
    }

    updateUI() {
        if (!this.storage.data) return;
        
        this.currentStreakEl.textContent = this.storage.getCurrentStreak();
        this.maxStreakEl.textContent = this.storage.getMaxStreak();
        this.totalDaysEl.textContent = this.storage.getTotalDays();
        
        const lastCheckIn = this.storage.getLastCheckIn();
        if (lastCheckIn) {
            this.lastUpdateEl.textContent = `Última actualización: ${this.formatDate(lastCheckIn)}`;
        }

        this.updateFlame();
        this.renderHistory();
    }

    updateFlame() {
        const currentStreak = this.storage.getCurrentStreak();
        if (currentStreak > 0) {
            this.flameEl.classList.add('active');
        } else {
            this.flameEl.classList.remove('active');
        }
    }

    igniteFlame() {
        this.flameEl.classList.remove('ignite');
        this.flameEl.classList.add('active');
        
        // Forzar reflow para reiniciar animación
        void this.flameEl.offsetWidth;
        
        this.flameEl.classList.add('ignite');
        
        setTimeout(() => {
            this.flameEl.classList.remove('ignite');
        }, 1000);
    }

    async handleCheckIn() {
        this.checkInBtn.disabled = true;
        this.showNotification('Registrando...', 'info');
        
        const result = await this.storage.checkIn();
        
        if (result.success) {
            this.showNotification(result.message, 'success');
            this.igniteFlame();
            this.updateUI();
            this.animateValue(this.currentStreakEl, result.streak - 1, result.streak, 500);
        } else {
            this.showNotification(result.message, 'error');
        }
        
        this.checkInBtn.disabled = false;
    }

    async handleReset() {
        if (confirm('¿Estás seguro de que quieres reiniciar todas las rachas? Esta acción afectará a todos los usuarios y no se puede deshacer.')) {
            this.resetBtn.disabled = true;
            this.showNotification('Reiniciando...', 'info');
            
            await this.storage.reset();
            this.flameEl.classList.remove('active', 'ignite');
            this.updateUI();
            this.showNotification('Rachas reiniciadas para todos', 'success');
            
            this.resetBtn.disabled = false;
        }
    }

    showNotification(message, type = 'success') {
        this.notificationTextEl.textContent = message;
        this.notificationEl.className = `notification ${type} show`;
        
        setTimeout(() => {
            this.notificationEl.classList.remove('show');
        }, 3000);
    }

    formatDate(dateString) {
        const date = new Date(dateString);
        return date.toLocaleDateString('es-ES', { 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric' 
        });
    }

    renderHistory() {
        const history = this.storage.getHistory();
        
        if (history.length === 0) {
            this.historyListEl.innerHTML = '<p style="text-align: center; color: #888;">No hay historial aún. ¡Comienza tu racha!</p>';
            return;
        }

        this.historyListEl.innerHTML = history.map(entry => `
            <div class="history-item">
                <span class="history-date">${this.formatDate(entry.date)}</span>
                <span class="history-streak">🔥 ${entry.streak} día${entry.streak !== 1 ? 's' : ''}</span>
            </div>
        `).join('');
    }

    animateValue(element, start, end, duration) {
        const startTime = performance.now();
        
        const animate = (currentTime) => {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            
            const value = Math.floor(start + (end - start) * progress);
            element.textContent = value;
            
            if (progress < 1) {
                requestAnimationFrame(animate);
            }
        };
        
        requestAnimationFrame(animate);
    }

    checkStreakStatus() {
        const lastCheckIn = this.storage.getLastCheckIn();
        if (!lastCheckIn) return;

        const today = new Date().toISOString().split('T')[0];
        const yesterday = new Date();
        yesterday.setDate(yesterday.getDate() - 1);
        const yesterdayStr = yesterday.toISOString().split('T')[0];

        // Si el último check-in no fue hoy ni ayer, la racha se perdió
        if (lastCheckIn !== today && lastCheckIn !== yesterdayStr) {
            const lastDate = new Date(lastCheckIn);
            const todayDate = new Date(today);
            const diffDays = Math.floor((todayDate - lastDate) / (1000 * 60 * 60 * 24));
            
            if (diffDays > 1) {
                this.showNotification(`Tu racha se perdió hace ${diffDays - 1} días. ¡Empieza una nueva hoy!`, 'error');
            }
        }
    }
}

// Inicializar la aplicación cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', () => {
    new StreakApp();
});
