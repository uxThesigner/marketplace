/* ============================================================
 * FUNCTIONS.JS - O Cérebro do Koda System
 * ============================================================
 * Gerencia: Dados, Temas (Cor/Dark), Tradução e Navegação.
 */

// --- 0. DICIONÁRIO DE TRADUÇÃO (I18N) ---
const translations = {
    "pt": {
        // Navegação
        "nav_home": "Início", "nav_ads": "Anúncios", "nav_leads": "Leads", "nav_config": "Config",
        
        // Dashboard (Home)
        "welcome_sub": "Visão geral dos seus negócios.",
        "metric_sales": "Vendas Hoje", "metric_active": "Anúncios Ativos", "metric_msgs": "Mensagens",
        "chart_title": "Desempenho por Canal", "feed_title": "Últimos Cadastrados", "feed_view_all": "Ver todos", "loading": "Carregando dados...",
        
        // Leads
        "leads_title": "Central de Leads", "filter_all": "Todos", "filter_unread": "Não Lidos", "filter_hot": "Quentes 🔥", "ctx_interest": "Interesse em:", "time_yesterday": "Ontem",

        // Estoque / Anúncios
        "ads_title": "Meus Anúncios", "search_placeholder": "Buscar por placa, título ou código...", 
        "filter_active": "Ativos", "filter_paused": "Pausados", "filter_nostock": "Sem Estoque", 
        "status_active": "Ativo", "status_paused": "Pausado", "txt_on": "Em:",

        // Configurações
        "page_config_title": "Configurações",
        "sec_account": "Conta", 
        "sub_status_label": "Status:", "sub_active": "Ativo",
        "sub_next_invoice": "Próxima Fatura:", "sub_method": "Pagamento:",
        "item_company": "Dados da Empresa", "item_sub": "Histórico de Faturas", "item_team": "Gerenciar Equipe",
        "sec_app": "Aplicativo", "item_notif": "Notificações", "item_darkmode": "Modo Escuro", "item_theme": "Cores de Detalhe", "item_lang": "Idioma (Language)", "item_help": "Ajuda e Suporte",
        "btn_logout": "Sair do Sistema",
        
        // Modais
        "modal_theme_title": "Escolha sua Vibe", "modal_lang_title": "Selecione o Idioma",
        "modal_new_title": "Criar Anúncio", "modal_new_sub": "Selecione a categoria do produto:"
    },
    "en": {
        "nav_home": "Home", "nav_ads": "Listings", "nav_leads": "Leads", "nav_config": "Settings",
        "welcome_sub": "Overview of your business.",
        "metric_sales": "Sales Today", "metric_active": "Active Ads", "metric_msgs": "Messages",
        "chart_title": "Performance by Channel", "feed_title": "Recent Listings", "feed_view_all": "View all", "loading": "Loading data...",
        
        "leads_title": "Leads Center", "filter_all": "All", "filter_unread": "Unread", "filter_hot": "Hot 🔥", "ctx_interest": "Interested in:", "time_yesterday": "Yesterday",

        "ads_title": "My Listings", "search_placeholder": "Search by plate, title or ID...",
        "filter_active": "Active", "filter_paused": "Paused", "filter_nostock": "Out of Stock",
        "status_active": "Active", "status_paused": "Paused", "txt_on": "On:",

        "page_config_title": "Settings",
        "sec_account": "Account", 
        "sub_status_label": "Status:", "sub_active": "Active",
        "sub_next_invoice": "Next Invoice:", "sub_method": "Payment:",
        "item_company": "Company Data", "item_sub": "Invoice History", "item_team": "Manage Team",
        "sec_app": "Application", "item_notif": "Notifications", "item_darkmode": "Dark Mode", "item_theme": "Accent Colors", "item_lang": "Language", "item_help": "Help & Support",
        "btn_logout": "Logout",
        "modal_theme_title": "Choose your Vibe", "modal_lang_title": "Select Language",
        "modal_new_title": "Create Listing", "modal_new_sub": "Select product category:"
    },
    "es": {
        "nav_home": "Inicio", "nav_ads": "Anuncios", "nav_leads": "Clientes", "nav_config": "Ajustes",
        "welcome_sub": "Resumen de su negocio.",
        "metric_sales": "Ventas Hoy", "metric_active": "Activos", "metric_msgs": "Mensajes",
        "chart_title": "Rendimiento por Canal", "feed_title": "Recientes", "feed_view_all": "Ver todos", "loading": "Cargando datos...",

        "leads_title": "Central de Clientes", "filter_all": "Todos", "filter_unread": "No Leídos", "filter_hot": "Calientes 🔥", "ctx_interest": "Interesado en:", "time_yesterday": "Ayer",

        "ads_title": "Mis Anuncios", "search_placeholder": "Buscar por placa, título o ID...",
        "filter_active": "Activos", "filter_paused": "Pausados", "filter_nostock": "Sin Stock",
        "status_active": "Activo", "status_paused": "Pausado", "txt_on": "En:",

        "page_config_title": "Configuración",
        "sec_account": "Cuenta", 
        "sub_status_label": "Estado:", "sub_active": "Activo",
        "sub_next_invoice": "Prox. Factura:", "sub_method": "Método:",
        "item_company": "Datos de Empresa", "item_sub": "Historial Facturas", "item_team": "Gestionar Equipo",
        "sec_app": "Aplicación", "item_notif": "Notificaciones", "item_darkmode": "Modo Oscuro", "item_theme": "Colores de Detalle", "item_lang": "Idioma", "item_help": "Ayuda y Soporte",
        "btn_logout": "Cerrar Sesión",
        "modal_theme_title": "Elige tu Estilo", "modal_lang_title": "Seleccionar Idioma",
        "modal_new_title": "Crear Anuncio", "modal_new_sub": "Selecciona la categoría:"
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
        const configNameEl = document.getElementById('config-name');
        const avatarEl = document.getElementById('user-avatar-header');
        const configAvatarEl = document.getElementById('config-avatar');
        
        // Dashboard / Home
        if (nameEl) nameEl.textContent = appConfig.user.firstName;
        if (avatarEl) avatarEl.textContent = appConfig.user.avatarInitials;

        // Tela de Configuração
        if (configNameEl) configNameEl.textContent = appConfig.user.name;
        if (configAvatarEl) configAvatarEl.textContent = appConfig.user.avatarInitials;
        
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
            toggleBtn.classList.add('ph-toggle-right', 'active-toggle', 'on');
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
    root.style.setProperty('--primary-dark', colorHex); 
    
    localStorage.setItem('koda_theme_color', colorHex);
    
    // CORREÇÃO: Fecha modal se aberto
    const modal = document.getElementById('modal-theme-select');
    if(modal && modal.classList.contains('visible')) {
        toggleModal('modal-theme-select');
    }
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
            toggleBtn.classList.add('ph-toggle-right', 'active-toggle', 'on');
        }
    } else {
        localStorage.setItem('koda_theme_mode', 'light');
        if(toggleBtn) {
            toggleBtn.classList.remove('ph-toggle-right', 'active-toggle', 'on');
            toggleBtn.classList.add('ph-toggle-left');
        }
    }
}

// Helper: Pega texto traduzido via JS
function getTrans(key) {
    const lang = localStorage.getItem('koda_lang') || 'pt';
    return translations[lang][key] || key;
}

// Função: Trocar Idioma
function changeAppLanguage(langCode) {
    if (!translations[langCode]) return;

    // 1. Traduz HTML estático
    const elementsToTranslate = document.querySelectorAll('[data-i18n]');
    elementsToTranslate.forEach(el => {
        const key = el.getAttribute('data-i18n');
        if (translations[langCode][key]) {
            el.textContent = translations[langCode][key];
        }
    });

    // 2. Traduz Placeholders
    const inputsToTranslate = document.querySelectorAll('[data-i18n-placeholder]');
    inputsToTranslate.forEach(el => {
        const key = el.getAttribute('data-i18n-placeholder');
        if (translations[langCode][key]) el.placeholder = translations[langCode][key];
    });

    localStorage.setItem('koda_lang', langCode);
    
    // 3. Recarrega dados dinâmicos (para traduzir a lista)
    loadDashboardData();
    // Se estiver no estoque, recarrega a lista
    if (typeof loadFullInventory === 'function') loadFullInventory();
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
    
    // Reaplica o idioma atual
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
    alert('Categoria selecionada: ' + cat);
    toggleModal('modal-new-ad');
}

// Dispara tudo assim que a página carrega
window.addEventListener('load', initApp);
