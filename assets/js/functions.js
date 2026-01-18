/* ============================================================
 * FUNCTIONS.JS - O Cérebro do Koda System
 * ============================================================
 * Gerencia: Dados, Temas (Cor/Dark), Tradução e Navegação.
 */

// --- 0. DICIONÁRIO DE TRADUÇÃO (I18N) ---
const translations = {
    "pt": {
        "nav_home": "Início",
        "nav_ads": "Anúncios",
        "nav_leads": "Leads",
        "nav_config": "Config",
        "page_config_title": "Configurações",
        "sec_account": "Conta",
        "item_company": "Dados da Empresa",
        "item_sub": "Assinatura & Faturas",
        "sec_app": "Aplicativo",
        "item_notif": "Notificações",
        "item_darkmode": "Modo Escuro",
        "item_theme": "Cores de Detalhe",
        "item_lang": "Idioma (Language)",
        "item_help": "Ajuda e Suporte",
        "btn_logout": "Sair do Sistema",
        "modal_theme_title": "Escolha sua Vibe",
        "modal_lang_title": "Selecione o Idioma"
    },
    "en": {
        "nav_home": "Home",
        "nav_ads": "Listings",
        "nav_leads": "Leads",
        "nav_config": "Settings",
        "page_config_title": "Settings",
        "sec_account": "Account",
        "item_company": "Company Data",
        "item_sub": "Subscription & Billing",
        "sec_app": "Application",
        "item_notif": "Notifications",
        "item_darkmode": "Dark Mode",
        "item_theme": "Accent Colors",
        "item_lang": "Language (Idioma)",
        "item_help": "Help & Support",
        "btn_logout": "Logout",
        "modal_theme_title": "Choose your Vibe",
        "modal_lang_title": "Select Language"
    },
    "es": {
        "nav_home": "Inicio",
        "nav_ads": "Anuncios",
        "nav_leads": "Clientes",
        "nav_config": "Ajustes",
        "page_config_title": "Configuración",
        "sec_account": "Cuenta",
        "item_company": "Datos de Empresa",
        "item_sub": "Suscripción y Pagos",
        "sec_app": "Aplicación",
        "item_notif": "Notificaciones",
        "item_darkmode": "Modo Oscuro",
        "item_theme": "Colores de Detalle",
        "item_lang": "Idioma (Language)",
        "item_help": "Ayuda y Soporte",
        "btn_logout": "Cerrar Sesión",
        "modal_theme_title": "Elige tu Estilo",
        "modal_lang_title": "Seleccionar Idioma"
    }
};

// --- 1. MÓDULO DE INICIALIZAÇÃO (Roda ao abrir qualquer página) ---

function initApp() {
    console.log("🚀 Iniciando Koda System App...");

    // A. Carrega Preferências Visuais (Cor, Dark Mode, Idioma)
    loadSavedPreferences();

    // B. Aplica Configuração do Usuário (Nome/Avatar)
    if (typeof appConfig !== 'undefined') {
        const nameEl = document.getElementById('user-first-name');
        const avatarEl = document.getElementById('user-avatar-header');
        
        if (nameEl) nameEl.textContent = appConfig.user.firstName;
        if (avatarEl) avatarEl.textContent = appConfig.user.avatarInitials;
        
        // Carrega logo se disponível
        const logoEl = document.getElementById('app-logo');
        if (logoEl && typeof appTheme !== 'undefined') {
            logoEl.src = appTheme.assets.logoUrl;
        }
    }

    // C. Carrega Dados do Dashboard (Se estiver na tela certa)
    loadDashboardData();
}

// --- 2. GERENCIADOR DE PREFERÊNCIAS ---

function loadSavedPreferences() {
    // 1. Cor de Destaque
    const savedColor = localStorage.getItem('koda_theme_color');
    if (savedColor) {
        changeAppTheme(savedColor);
    } else if (typeof appTheme !== 'undefined') {
        // Se não tiver salvo, usa o padrão do theme.js
        changeAppTheme(appTheme.colors.primary);
    }

    // 2. Modo Escuro
    const savedMode = localStorage.getItem('koda_theme_mode');
    const toggleBtn = document.getElementById('dark-mode-toggle');
    
    if (savedMode === 'dark') {
        document.body.classList.add('dark-mode');
        // Atualiza a chavinha visualmente
        if(toggleBtn) {
            toggleBtn.classList.remove('ph-toggle-left');
            toggleBtn.classList.add('ph-toggle-right', 'active-toggle');
        }
    }

    // 3. Idioma
    const savedLang = localStorage.getItem('koda_lang') || 'pt';
    changeAppLanguage(savedLang);
}

// Função: Trocar Cor (Accent)
function changeAppTheme(colorHex) {
    const root = document.documentElement;
    root.style.setProperty('--primary-color', colorHex);
    root.style.setProperty('--primary-dark', colorHex); // Simplificado para MVP
    
    localStorage.setItem('koda_theme_color', colorHex);
    
    // Fecha modal se aberto
    const modal = document.getElementById('modal-theme-select');
    if(modal) toggleModal('modal-theme-select');
}

// Função: Alternar Dark Mode
function toggleDarkMode() {
    const body = document.body;
    const toggleBtn = document.getElementById('dark-mode-toggle');
    
    body.classList.toggle('dark-mode');
    
    if (body.classList.contains('dark-mode')) {
        localStorage.setItem('koda_theme_mode', 'dark');
        if(toggleBtn) {
            toggleBtn.classList.remove('ph-toggle-left');
            toggleBtn.classList.add('ph-toggle-right', 'active-toggle');
        }
    } else {
        localStorage.setItem('koda_theme_mode', 'light');
        if(toggleBtn) {
            toggleBtn.classList.remove('ph-toggle-right', 'active-toggle');
            toggleBtn.classList.add('ph-toggle-left');
        }
    }
}

// Função: Trocar Idioma
function changeAppLanguage(langCode) {
    if (!translations[langCode]) return;

    const elementsToTranslate = document.querySelectorAll('[data-i18n]');
    
    elementsToTranslate.forEach(el => {
        const key = el.getAttribute('data-i18n');
        if (translations[langCode][key]) {
            el.textContent = translations[langCode][key];
        }
    });

    localStorage.setItem('koda_lang', langCode);
}


// --- 3. MÓDULO DE DADOS ---

function loadDashboardData() {
    // Só executa se o banco de dados fake foi carregado
    if (typeof statsDB !== 'undefined') {
        
        // Preenche KPIs
        safeSetText('kpi-sales', `R$ ${statsDB.salesToday.toLocaleString('pt-BR', {minimumFractionDigits: 2})}`);
        safeSetText('kpi-active-ads', statsDB.activeAds);
        safeSetText('kpi-messages', statsDB.messages);

        // Preenche Feed (Dashboard)
        const feedList = document.getElementById('dashboard-feed-list');
        if (feedList && typeof productsDB !== 'undefined') {
            feedList.innerHTML = '';
            productsDB.forEach(prod => {
                const itemHTML = `
                    <div class="product-item">
                        <div class="prod-thumb"><i class="ph ${prod.image}"></i></div>
                        <div class="prod-info">
                            <div class="prod-title">${prod.title}</div>
                            <div class="prod-price">R$ ${prod.price.toLocaleString('pt-BR')}</div>
                        </div>
                        <div class="prod-status ${prod.status === 'active' ? 'status-active' : 'status-paused'}">
                            ${prod.status === 'active' ? 'Ativo' : 'Pausado'}
                        </div>
                    </div>
                `;
                feedList.innerHTML += itemHTML;
            });
        }
    }
}

function safeSetText(id, text) {
    const el = document.getElementById(id);
    if (el) el.textContent = text;
}


// --- 4. UI & NAVEGAÇÃO ---

function renderBottomNav(activePage) {
    const container = document.getElementById('bottom-nav-container');
    if (!container) return;

    const isActive = (page) => page === activePage ? 'active' : '';

    // Gera o HTML da barra (já com tags data-i18n)
    container.innerHTML = `
    <nav class="bottom-navbar">
        <a href="dashboard.html" class="nav-item ${isActive('home')}">
            <i class="ph ph-house"></i><span data-i18n="nav_home">Início</span>
        </a>
        <a href="estoque.html" class="nav-item ${isActive('estoque')}">
            <i class="ph ph-package"></i><span data-i18n="nav_ads">Anúncios</span>
        </a>
        <div class="nav-fab-container">
            <button class="fab-button" onclick="toggleModal('modal-new-ad')">
                <i class="ph ph-plus"></i>
            </button>
        </div>
        <a href="leads.html" class="nav-item ${isActive('leads')}">
            <i class="ph ph-chat-circle"></i><span data-i18n="nav_leads">Leads</span>
        </a>
        <a href="config.html" class="nav-item ${isActive('config')}">
            <i class="ph ph-gear"></i><span data-i18n="nav_config">Config</span>
        </a>
    </nav>
    `;
    
    // Reaplica o idioma atual (pois acabamos de injetar HTML novo)
    const currentLang = localStorage.getItem('koda_lang') || 'pt';
    changeAppLanguage(currentLang);
}

function toggleModal(modalId) {
    const modal = document.getElementById(modalId);
    if (!modal) return;

    if (modal.classList.contains('hidden')) {
        modal.classList.remove('hidden');
        setTimeout(() => modal.classList.add('visible'), 10);
    } else {
        modal.classList.remove('visible');
        setTimeout(() => modal.classList.add('hidden'), 300);
    }
}

function selectCategory(cat) {
    alert('Categoria selecionada: ' + cat + '\n(Aqui abriria o formulário detalhado)');
    toggleModal('modal-new-ad');
}

// Dispara tudo assim que a página carrega
window.addEventListener('load', initApp);
