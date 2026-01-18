/* ============================================================
 * FUNCTIONS.JS - Gerente Geral + Tradução + Temas Avançados
 * ============================================================
 */

// ... (Dicionário de Tradução continua igual, pode manter o anterior) ...
// Vou resumir aqui para focar na lógica nova, mas mantenha o seu dicionário completo!
const translations = {
    "pt": { 
        // ... mantenha suas traduções ...
        "item_darkmode": "Modo Escuro (Dark Mode)" // Adicione essa chave
    },
    // ...
};

// --- 1. MÓDULO DE INICIALIZAÇÃO ---

function initApp() {
    console.log("🚀 Iniciando Koda System App...");
    loadSavedPreferences(); // Agora carrega Cor E Modo Escuro
    
    // Configurações de Usuário
    if (typeof appConfig !== 'undefined') {
        const nameEl = document.getElementById('user-first-name');
        const avatarEl = document.getElementById('user-avatar-header');
        if (nameEl) nameEl.textContent = appConfig.user.firstName;
        if (avatarEl) avatarEl.textContent = appConfig.user.avatarInitials;
    }
    loadDashboardData();
}

// --- 2. GERENCIADOR DE PREFERÊNCIAS (Cor + Dark Mode) ---

function loadSavedPreferences() {
    // A. Carrega Cor de Destaque
    const savedColor = localStorage.getItem('koda_theme_color');
    if (savedColor) {
        changeAppTheme(savedColor);
    } else if (typeof appTheme !== 'undefined') {
        changeAppTheme(appTheme.colors.primary);
    }

    // B. Carrega Modo Escuro
    const savedMode = localStorage.getItem('koda_theme_mode');
    const toggleBtn = document.getElementById('dark-mode-toggle');
    
    if (savedMode === 'dark') {
        document.body.classList.add('dark-mode');
        if(toggleBtn) toggleBtn.classList.remove('ph-toggle-left');
        if(toggleBtn) toggleBtn.classList.add('ph-toggle-right', 'active-toggle');
    }

    // C. Carrega Idioma
    const savedLang = localStorage.getItem('koda_lang') || 'pt';
    changeAppLanguage(savedLang);
}

// Função 1: Troca a Cor de Destaque (Accent)
function changeAppTheme(colorHex) {
    const root = document.documentElement;
    root.style.setProperty('--primary-color', colorHex);
    root.style.setProperty('--primary-dark', colorHex); 
    localStorage.setItem('koda_theme_color', colorHex);
    
    // Fecha o modal se estiver aberto
    const modal = document.getElementById('modal-theme-select');
    if(modal) {
        modal.classList.remove('visible');
        setTimeout(() => modal.classList.add('hidden'), 300);
    }
}

// Função 2: Alterna entre Claro e Escuro
function toggleDarkMode() {
    const body = document.body;
    const toggleBtn = document.getElementById('dark-mode-toggle');
    
    body.classList.toggle('dark-mode');
    
    // Atualiza visual do botão
    if (body.classList.contains('dark-mode')) {
        localStorage.setItem('koda_theme_mode', 'dark');
        toggleBtn.classList.remove('ph-toggle-left');
        toggleBtn.classList.add('ph-toggle-right', 'active-toggle'); // Fica colorido
    } else {
        localStorage.setItem('koda_theme_mode', 'light');
        toggleBtn.classList.remove('ph-toggle-right', 'active-toggle');
        toggleBtn.classList.add('ph-toggle-left');
    }
}

// ... (O resto das funções changeAppLanguage, loadDashboardData, renderBottomNav continuam iguais) ...

// Apenas lembre de adicionar a chamada initApp no final
window.addEventListener('load', initApp);
