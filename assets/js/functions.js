/* ============================================================
 * FUNCTIONS.JS - Cérebro com Tradução Completa (Dashboard/Leads/Ads)
 * ============================================================
 */

// --- 0. DICIONÁRIO DE TRADUÇÃO EXPANDIDO ---
const translations = {
    "pt": {
        // Navegação
        "nav_home": "Início", "nav_ads": "Anúncios", "nav_leads": "Leads", "nav_config": "Config",
        
        // Dashboard (Home)
        "welcome_sub": "Visão geral dos seus negócios.",
        "metric_sales": "Vendas Hoje",
        "metric_active": "Anúncios Ativos",
        "metric_msgs": "Mensagens",
        "chart_title": "Desempenho por Canal",
        "feed_title": "Últimos Cadastrados",
        "feed_view_all": "Ver todos",
        "loading": "Carregando dados...",
        
        // Leads
        "leads_title": "Central de Leads",
        "filter_all": "Todos", "filter_unread": "Não Lidos", "filter_hot": "Quentes 🔥",
        "ctx_interest": "Interesse em:",
        "time_yesterday": "Ontem",

        // Estoque / Anúncios
        "ads_title": "Anúncios",
        "search_placeholder": "Buscar por placa, título ou código...",
        "filter_active": "Ativos", "filter_paused": "Pausados", "filter_nostock": "Sem Estoque",
        "status_active": "Ativo", "status_paused": "Pausado",
        "txt_on": "Em:",

        // Config e Modais
        "page_config_title": "Configurações",
        "sec_account": "Conta", "item_company": "Dados da Empresa", "item_sub": "Assinatura & Faturas",
        "sec_app": "Aplicativo", "item_notif": "Notificações", "item_darkmode": "Modo Escuro",
        "item_theme": "Cores de Detalhe", "item_lang": "Idioma (Language)", "item_help": "Ajuda e Suporte",
        "btn_logout": "Sair do Sistema",
        "modal_theme_title": "Escolha sua Vibe", "modal_lang_title": "Selecione o Idioma",
        "modal_new_title": "Adicionar Novo Item", "modal_new_sub": "O que você deseja cadastrar hoje?"
    },
    "en": {
        "nav_home": "Home", "nav_ads": "Listings", "nav_leads": "Leads", "nav_config": "Settings",
        "welcome_sub": "Overview of your business.",
        "metric_sales": "Sales Today",
        "metric_active": "Active Ads",
        "metric_msgs": "Messages",
        "chart_title": "Performance by Channel",
        "feed_title": "Recent Listings",
        "feed_view_all": "View all",
        "loading": "Loading data...",
        
        "leads_title": "Leads Center",
        "filter_all": "All", "filter_unread": "Unread", "filter_hot": "Hot 🔥",
        "ctx_interest": "Interested in:",
        "time_yesterday": "Yesterday",

        "ads_title": "My Listings",
        "search_placeholder": "Search by plate, title or ID...",
        "filter_active": "Active", "filter_paused": "Paused", "filter_nostock": "Out of Stock",
        "status_active": "Active", "status_paused": "Paused",
        "txt_on": "On:",

        "page_config_title": "Settings",
        "sec_account": "Account", "item_company": "Company Data", "item_sub": "Subscription & Billing",
        "sec_app": "Application", "item_notif": "Notifications", "item_darkmode": "Dark Mode",
        "item_theme": "Accent Colors", "item_lang": "Language", "item_help": "Help & Support",
        "btn_logout": "Logout",
        "modal_theme_title": "Choose your Vibe", "modal_lang_title": "Select Language",
        "modal_new_title": "Add New Item", "modal_new_sub": "What are you listing today?"
    },
    "es": {
        "nav_home": "Inicio", "nav_ads": "Anuncios", "nav_leads": "Clientes", "nav_config": "Ajustes",
        "welcome_sub": "Resumen de su negocio.",
        "metric_sales": "Ventas Hoy",
        "metric_active": "Activos",
        "metric_msgs": "Mensajes",
        "chart_title": "Rendimiento por Canal",
        "feed_title": "Recientes",
        "feed_view_all": "Ver todos",
        "loading": "Cargando datos...",

        "leads_title": "Central de Clientes",
        "filter_all": "Todos", "filter_unread": "No Leídos", "filter_hot": "Calientes 🔥",
        "ctx_interest": "Interesado en:",
        "time_yesterday": "Ayer",

        "ads_title": "Mis Anuncios",
        "search_placeholder": "Buscar por placa, título o ID...",
        "filter_active": "Activos", "filter_paused": "Pausados", "filter_nostock": "Sin Stock",
        "status_active": "Activo", "status_paused": "Pausado",
        "txt_on": "En:",

        "page_config_title": "Configuración",
        "sec_account": "Cuenta", "item_company": "Datos de Empresa", "item_sub": "Suscripción y Pagos",
        "sec_app": "Aplicación", "item_notif": "Notificaciones", "item_darkmode": "Modo Oscuro",
        "item_theme": "Colores de Detalle", "item_lang": "Idioma", "item_help": "Ayuda y Soporte",
        "btn_logout": "Cerrar Sesión",
        "modal_theme_title": "Elige tu Estilo", "modal_lang_title": "Seleccionar Idioma",
        "modal_new_title": "Agregar Nuevo", "modal_new_sub": "¿Qué vas a publicar hoy?"
    }
};

// --- 1. MÓDULO DE INICIALIZAÇÃO ---
function initApp() {
    console.log("🚀 Iniciando Koda System App...");
    loadSavedPreferences();
    
    if (typeof appConfig !== 'undefined') {
        const nameEl = document.getElementById('user-first-name');
        const avatarEl = document.getElementById('user-avatar-header');
        if (nameEl) nameEl.textContent = appConfig.user.firstName;
        if (avatarEl) avatarEl.textContent = appConfig.user.avatarInitials;
        const logoEl = document.getElementById('app-logo');
        if (logoEl && typeof appTheme !== 'undefined') logoEl.src = appTheme.assets.logoUrl;
    }

    loadDashboardData();
}

// --- 2. GERENCIADOR DE PREFERÊNCIAS ---
function loadSavedPreferences() {
    const savedColor = localStorage.getItem('koda_theme_color');
    if (savedColor) changeAppTheme(savedColor);
    else if (typeof appTheme !== 'undefined') changeAppTheme(appTheme.colors.primary);

    const savedMode = localStorage.getItem('koda_theme_mode');
    const toggleBtn = document.getElementById('dark-mode-toggle');
    if (savedMode === 'dark') {
        document.body.classList.add('dark-mode');
        if(toggleBtn) {
            toggleBtn.classList.remove('ph-toggle-left');
            toggleBtn.classList.add('ph-toggle-right', 'active-toggle');
        }
    }

    const savedLang = localStorage.getItem('koda_lang') || 'pt';
    changeAppLanguage(savedLang);
}

function changeAppTheme(colorHex) {
    const root = document.documentElement;
    root.style.setProperty('--primary-color', colorHex);
    root.style.setProperty('--primary-dark', colorHex);
    localStorage.setItem('koda_theme_color', colorHex);
    const modal = document.getElementById('modal-theme-select');
    if(modal) toggleModal('modal-theme-select');
}

function toggleDarkMode() {
    const body = document.body;
    const toggleBtn = document.getElementById('dark-mode-toggle');
    body.classList.toggle('dark-mode');
    if (body.classList.contains('dark-mode')) {
        localStorage.setItem('koda_theme_mode', 'dark');
        if(toggleBtn) { toggleBtn.classList.remove('ph-toggle-left'); toggleBtn.classList.add('ph-toggle-right', 'active-toggle'); }
    } else {
        localStorage.setItem('koda_theme_mode', 'light');
        if(toggleBtn) { toggleBtn.classList.remove('ph-toggle-right', 'active-toggle'); toggleBtn.classList.add('ph-toggle-left'); }
    }
}

// Helper: Pega texto traduzido via JS (para uso dentro de loops)
function getTrans(key) {
    const lang = localStorage.getItem('koda_lang') || 'pt';
    return translations[lang][key] || key;
}

function changeAppLanguage(langCode) {
    if (!translations[langCode]) return;
    
    // 1. Traduz elementos estáticos (HTML)
    const elementsToTranslate = document.querySelectorAll('[data-i18n]');
    elementsToTranslate.forEach(el => {
        const key = el.getAttribute('data-i18n');
        if (translations[langCode][key]) el.textContent = translations[langCode][key];
    });

    // 2. Atualiza placeholders de inputs
    const inputsToTranslate = document.querySelectorAll('[data-i18n-placeholder]');
    inputsToTranslate.forEach(el => {
        const key = el.getAttribute('data-i18n-placeholder');
        if (translations[langCode][key]) el.placeholder = translations[langCode][key];
    });

    localStorage.setItem('koda_lang', langCode);
    
    // 3. Força recarregamento de dados dinâmicos (para traduzir a lista de produtos)
    loadDashboardData();
    // Se estiver na tela de estoque, recarrega a lista completa
    if (typeof loadFullInventory === 'function') loadFullInventory();
}

// --- 3. MÓDULO DE DADOS ---
function loadDashboardData() {
    if (typeof statsDB !== 'undefined') {
        safeSetText('kpi-sales', `R$ ${statsDB.salesToday.toLocaleString('pt-BR', {minimumFractionDigits: 2})}`);
        safeSetText('kpi-active-ads', statsDB.activeAds);
        safeSetText('kpi-messages', statsDB.messages);

        const feedList = document.getElementById('dashboard-feed-list');
        if (feedList && typeof productsDB !== 'undefined') {
            feedList.innerHTML = '';
            productsDB.forEach(prod => {
                // TRADUÇÃO DINÂMICA AQUI:
                const statusLabel = prod.status === 'active' ? getTrans('status_active') : getTrans('status_paused');
                
                const itemHTML = `
                    <div class="product-item">
                        <div class="prod-thumb"><i class="ph ${prod.image}"></i></div>
                        <div class="prod-info">
                            <div class="prod-title">${prod.title}</div>
                            <div class="prod-price">R$ ${prod.price.toLocaleString('pt-BR')}</div>
                        </div>
                        <div class="prod-status ${prod.status === 'active' ? 'status-active' : 'status-paused'}">
                            ${statusLabel}
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

    container.innerHTML = `
    <nav class="bottom-navbar">
        <a href="dashboard.html" class="nav-item ${isActive('home')}">
            <i class="ph ph-house"></i><span data-i18n="nav_home">Início</span>
        </a>
        <a href="estoque.html" class="nav-item ${isActive('estoque')}">
            <i class="ph ph-package"></i><span data-i18n="nav_ads">Anúncios</span>
        </a>
        <div class="nav-fab-container">
            <button class="fab-button" onclick="toggleModal('modal-new-ad')"><i class="ph ph-plus"></i></button>
        </div>
        <a href="leads.html" class="nav-item ${isActive('leads')}">
            <i class="ph ph-chat-circle"></i><span data-i18n="nav_leads">Leads</span>
        </a>
        <a href="config.html" class="nav-item ${isActive('config')}">
            <i class="ph ph-gear"></i><span data-i18n="nav_config">Config</span>
        </a>
    </nav>
    `;
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
    alert('Categoria: ' + cat);
    toggleModal('modal-new-ad');
}

window.addEventListener('load', initApp);
