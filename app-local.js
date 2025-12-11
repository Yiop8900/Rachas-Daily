// Versión LOCAL - Solo usa localStorage (sin GitHub)
class StreakStorage {
    constructor() {
        this.storageKey = 'streakData';
        this.data = this.loadData();
    }

    loadData() {
        try {
            const stored = localStorage.getItem(this.storageKey);
            if (stored) {
                return JSON.parse(stored);
            }
        } catch (error) {
            console.error('Error al cargar datos:', error);
        }
        
        return this.getEmptyData();
    }

    saveData() {
        try {
            localStorage.setItem(this.storageKey, JSON.stringify(this.data));
            return true;
        } catch (error) {
            console.error('Error al guardar datos:', error);
            return false;
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

    checkIn() {
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

        const saved = this.saveData();

        return { 
            success: saved, 
            message: saved 
                ? `¡Excelente! Racha de ${this.data.currentStreak} días 🔥`
                : '⚠️ Error al guardar',
            streak: this.data.currentStreak
        };
    }

    reset() {
        this.data = this.getEmptyData();
        this.saveData();
    }
}

// Clase principal de la aplicación
class StreakApp {
    constructor() {
        this.storage = new StreakStorage();
        this.initElements();
        this.attachEvents();
        this.updateUI();
        this.checkStreakStatus();
    }

    initElements() {
        this.currentStreakEl = document.getElementById('currentStreak');
        this.maxStreakEl = document.getElementById('maxStreak');
        this.totalDaysEl = document.getElementById('totalDays');
        this.lastUpdateEl = document.getElementById('lastUpdate');
        this.checkInBtn = document.getElementById('checkInBtn');
        this.resetBtn = document.getElementById('resetBtn');
        this.flameEl = document.getElementById('flame');
        this.notificationEl = document.getElementById('notification');
        this.notificationTextEl = document.getElementById('notificationText');
        this.historyListEl = document.getElementById('historyList');
    }

    attachEvents() {
        this.checkInBtn.addEventListener('click', () => this.handleCheckIn());
        this.resetBtn.addEventListener('click', () => this.handleReset());
    }

    updateUI() {
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

    handleCheckIn() {
        const result = this.storage.checkIn();
        
        if (result.success) {
            this.showNotification(result.message, 'success');
            this.igniteFlame();
            this.updateUI();
            this.animateValue(this.currentStreakEl, result.streak - 1, result.streak, 500);
        } else {
            this.showNotification(result.message, 'error');
        }
    }

    handleReset() {
        if (confirm('¿Estás seguro de que quieres reiniciar todas las rachas? Esta acción no se puede deshacer.')) {
            this.storage.reset();
            this.flameEl.classList.remove('active', 'ignite');
            this.updateUI();
            this.showNotification('Rachas reiniciadas', 'success');
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
