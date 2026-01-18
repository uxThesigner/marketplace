/* ============================================================
 * FUNCTIONS.JS - Cérebro Central do Koda System
 * ============================================================
 * Centraliza: Navegação, Traduções, Temas, Dados e Lógica de Negócio.
 */

// --- 0. DICIONÁRIO DE TRADUÇÃO (I18N) ---
const translations = {
    "pt": {
        "nav_home": "Início", "nav_ads": "Anúncios", "nav_leads": "Leads", "nav_config": "Config",
        "welcome_sub": "Visão geral dos seus negócios.",
        "metric_sales": "Vendas Hoje", "metric_active": "Anúncios Ativos", "metric_msgs": "Mensagens",
        "chart_title": "Desempenho por Canal", "feed_title": "Últimos Cadastrados", "feed_view_all": "Ver todos", "loading": "Carregando dados...",
        "leads_title": "Central de Leads", "filter_all": "Todos", "filter_unread": "Não Lidos", "filter_hot": "Quentes 🔥", "ctx_interest": "Interesse em:", "time_yesterday": "Ontem",
        "ads_title": "Meus Anúncios", "search_placeholder": "Buscar por placa, título ou código...", 
        "filter_active": "Ativos", "filter_paused": "Pausados", "filter_nostock": "Sem Estoque", 
        "status_active": "Ativo", "status_paused": "Pausado", "status_sold": "Vendido", "status_rejected": "Reprovado", "status_review": "Em Análise", "status_incomplete": "Incompleto", "txt_on": "Em:",
        "page_config_title": "Configurações", "sec_account": "Conta", "sub_status_label": "Status:", "sub_active": "Ativo", "sub_next_invoice": "Próxima Fatura:", "sub_method": "Pagamento:",
        "item_company": "Dados da Empresa", "item_sub": "Histórico de Faturas", "item_team": "Gerenciar Equipe",
        "sec_app": "Aplicativo", "item_notif": "Notificações", "item_darkmode": "Modo Escuro", "item_theme": "Cores de Detalhe", "item_lang": "Idioma", "item_help": "Ajuda e Suporte",
        "btn_logout": "Sair do Sistema",
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
        "status_active": "Active", "status_paused": "Paused", "status_sold": "Sold", "status_rejected": "Rejected", "status_review": "In Review", "status_incomplete": "Incomplete", "txt_on": "On:",
        "page_config_title": "Settings", "sec_account": "Account", "sub_status_label": "Status:", "sub_active": "Active", "sub_next_invoice": "Next Invoice:", "sub_method": "Payment:",
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
        "status_active": "Activo", "status_paused": "Pausado", "status_sold": "Vendido", "status_rejected": "Rechazado", "status_review": "En Revisión", "status_incomplete": "Incompleto", "txt_on": "En:",
        "page_config_title": "Configuración", "sec_account": "Cuenta", "sub_status_label": "Estado:", "sub_active": "Activo", "sub_next_invoice": "Prox. Factura:", "sub_method": "Método:",
        "item_company": "Datos de Empresa", "item_sub": "Historial Facturas", "item_team": "Gestionar Equipo",
        "sec_app": "Aplicación", "item_notif": "Notificaciones", "item_darkmode": "Modo Oscuro", "item_theme": "Colores de Detalle", "item_lang": "Idioma", "item_help": "Ayuda y Soporte",
        "btn_logout": "Cerrar Sesión",
        "modal_theme_title": "Elige tu Estilo", "modal_lang_title": "Seleccionar Idioma",
        "modal_new_title": "Crear Anuncio", "modal_new_sub": "Selecciona la categoría:"
    }
};

// --- 1. INICIALIZAÇÃO E PREFERÊNCIAS ---
function initApp() {
    console.log("🚀 Koda System Ready.");
    loadSavedPreferences(); // Tema, Dark Mode, Lang
    loadUserData();         // Nome, Avatar, Logo
    
    // Identifica página atual e carrega dados específicos
    const path = window.location.pathname;
    if (path.includes('dashboard') || path === '/') loadDashboardData();
    if (path.includes('estoque')) applyInventoryFilters(); // Inicia filtro
}

function loadSavedPreferences() {
    // Cor
    const savedColor = localStorage.getItem('koda_theme_color');
    if (savedColor) changeAppTheme(savedColor);
    else if (typeof appTheme !== 'undefined') changeAppTheme(appTheme.colors.primary);

    // Dark Mode
    const savedMode = localStorage.getItem('koda_theme_mode');
    const toggleBtn = document.getElementById('dark-mode-toggle');
    if (savedMode === 'dark') {
        document.body.classList.add('dark-mode');
        if(toggleBtn) { toggleBtn.classList.remove('ph-toggle-left'); toggleBtn.classList.add('ph-toggle-right', 'active-toggle', 'on'); }
    }

    // Idioma
    const savedLang = localStorage.getItem('koda_lang') || 'pt';
    changeAppLanguage(savedLang);
}

function loadUserData() {
    if (typeof appConfig === 'undefined') return;
    
    // IDs comuns em várias páginas
    const els = {
        firstName: document.getElementById('user-first-name'),
        configName: document.getElementById('config-name'),
        headerAvatar: document.getElementById('user-avatar-header'),
        configAvatar: document.getElementById('config-avatar'),
        logo: document.getElementById('app-logo')
    };

    if (els.firstName) els.firstName.textContent = appConfig.user.firstName;
    if (els.configName) els.configName.textContent = appConfig.user.name;
    if (els.headerAvatar) els.headerAvatar.textContent = appConfig.user.avatarInitials;
    if (els.configAvatar) els.configAvatar.textContent = appConfig.user.avatarInitials;
    if (els.logo && typeof appTheme !== 'undefined') els.logo.src = appTheme.assets.logoUrl;
}

// --- 2. TEMA E IDIOMA ---
function changeAppTheme(colorHex) {
    document.documentElement.style.setProperty('--primary-color', colorHex);
    document.documentElement.style.setProperty('--primary-dark', colorHex); 
    localStorage.setItem('koda_theme_color', colorHex);
    
    const modal = document.getElementById('modal-theme-select');
    if(modal && modal.classList.contains('visible')) toggleModal('modal-theme-select');
}

function toggleDarkMode() {
    const body = document.body;
    const toggleBtn = document.getElementById('dark-mode-toggle');
    body.classList.toggle('dark-mode');
    
    if (body.classList.contains('dark-mode')) {
        localStorage.setItem('koda_theme_mode', 'dark');
        if(toggleBtn) { toggleBtn.classList.remove('ph-toggle-left'); toggleBtn.classList.add('ph-toggle-right', 'active-toggle', 'on'); }
    } else {
        localStorage.setItem('koda_theme_mode', 'light');
        if(toggleBtn) { toggleBtn.classList.remove('ph-toggle-right', 'active-toggle', 'on'); toggleBtn.classList.add('ph-toggle-left'); }
    }
}

function changeAppLanguage(langCode) {
    if (!translations[langCode]) return;
    
    // Text Content
    document.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.getAttribute('data-i18n');
        if (translations[langCode][key]) el.textContent = translations[langCode][key];
    });

    // Placeholders
    document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
        const key = el.getAttribute('data-i18n-placeholder');
        if (translations[langCode][key]) el.placeholder = translations[langCode][key];
    });

    localStorage.setItem('koda_lang', langCode);
    
    // Recarrega dados que dependem de tradução (listas)
    if (document.getElementById('full-inventory-list')) applyInventoryFilters();
    if (document.getElementById('dashboard-feed-list')) loadDashboardData();
}

function getTrans(key) {
    const lang = localStorage.getItem('koda_lang') || 'pt';
    return translations[lang][key] || key;
}

// --- 3. DADOS (DASHBOARD) ---
function loadDashboardData() {
    if (typeof statsDB === 'undefined') return;

    safeSetText('kpi-sales', `R$ ${statsDB.salesToday.toLocaleString('pt-BR', {minimumFractionDigits: 2})}`);
    safeSetText('kpi-active-ads', statsDB.activeAds);
    safeSetText('kpi-messages', statsDB.messages);

    const feedList = document.getElementById('dashboard-feed-list');
    if (feedList && typeof productsDB !== 'undefined') {
        feedList.innerHTML = '';
        productsDB.slice(0, 3).forEach(prod => { // Mostra só os 3 primeiros
            const statusLabel = getTrans('status_' + prod.status) || prod.status;
            feedList.innerHTML += `
                <div class="product-item">
                    <div class="prod-thumb"><i class="ph ${prod.image}"></i></div>
                    <div class="prod-info">
                        <div class="prod-title">${prod.title}</div>
                        <div class="prod-price">R$ ${prod.price.toLocaleString('pt-BR')}</div>
                    </div>
                    <div class="prod-status status-${prod.status}">${statusLabel}</div>
                </div>`;
        });
    }
}
function safeSetText(id, text) { const el = document.getElementById(id); if (el) el.textContent = text; }


// --- 4. LÓGICA DE ESTOQUE (FILTROS E BUSCA) ---
let currentFilter = 'all';

function setFilter(filterType) {
    currentFilter = filterType;
    document.querySelectorAll('.filter-pill').forEach(btn => btn.classList.remove('active'));
    
    const btnId = `btn-filter-${filterType}`;
    const btn = document.getElementById(btnId);
    if(btn) btn.classList.add('active');

    applyInventoryFilters();
}

function applyInventoryFilters() {
    const listEl = document.getElementById('full-inventory-list');
    const searchInput = document.getElementById('inventory-search');
    if (!listEl || typeof productsDB === 'undefined') return;

    const searchTerm = searchInput ? searchInput.value.toLowerCase() : '';
    listEl.innerHTML = '';

    const filteredData = productsDB.filter(prod => {
        let matchesStatus = (currentFilter === 'all') || 
                            (currentFilter === 'active' && prod.status === 'active') ||
                            (currentFilter === 'paused' && prod.status === 'paused') ||
                            (currentFilter === 'nostock' && prod.status === 'nostock');
        
        const matchesSearch = prod.title.toLowerCase().includes(searchTerm);
        return matchesStatus && matchesSearch;
    });

    if (filteredData.length === 0) {
        listEl.innerHTML = `<div style="padding:40px; text-align:center; color:var(--text-secondary); font-size:14px;">Nenhum item encontrado.</div>`;
        return;
    }

    filteredData.forEach(prod => {
        let txtOn = getTrans('txt_on');
        let statusLabel = getTrans('status_' + prod.status) || prod.status;
        
        listEl.innerHTML += `
            <div class="product-item">
                <div class="prod-thumb"><i class="ph ${prod.image}"></i></div>
                <div class="prod-info">
                    <div class="prod-title">${prod.title}</div>
                    <div class="prod-price">R$ ${prod.price.toLocaleString('pt-BR')}</div>
                    <div class="platform-tag">${txtOn} ${prod.platforms.join(', ')}</div>
                </div>
                <div style="display:flex; flex-direction:column; align-items:flex-end; gap:8px;">
                    <div class="prod-status status-${prod.status}">${statusLabel}</div>
                    <div class="actions-btn"><i class="ph ph-dots-three-vertical" style="font-size: 22px;"></i></div>
                </div>
            </div>`;
    });
}


// --- 5. NAVEGAÇÃO & MODAIS ---
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
    </nav>`;
    
    // Reaplica traduções na barra recém-criada
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
        setTimeout(() => {
            modal.classList.add('hidden');
            // Se for o modal de novo anúncio, reseta para o passo 1 ao fechar
            if(modalId === 'modal-new-ad') backToCategories(); 
        }, 300);
    }
}


// --- 6. SMART FORM (NOVO ANÚNCIO) ---
function selectCategory(category) {
    // Esconde passo 1, mostra passo 2
    document.getElementById('step-category-select').classList.remove('active');
    document.getElementById('step-ad-form').classList.add('active');
    document.getElementById('btn-back-step').style.display = 'block';
    
    // Muda Título
    const titles = { 'veiculos': 'Novo Veículo', 'imoveis': 'Novo Imóvel', 'eletronicos': 'Novo Eletrônico', 'agro': 'Novo Item Agro', 'servicos': 'Novo Serviço' };
    const titleEl = document.getElementById('modal-title-text');
    if(titleEl) titleEl.textContent = titles[category] || 'Novo Anúncio';

    renderDynamicFields(category);
}

function backToCategories() {
    // Esconde passo 2, volta passo 1
    document.getElementById('step-ad-form').classList.remove('active');
    document.getElementById('step-category-select').classList.add('active');
    document.getElementById('btn-back-step').style.display = 'none';
    
    const titleEl = document.getElementById('modal-title-text');
    if(titleEl) titleEl.textContent = getTrans('modal_new_title');
}

function renderDynamicFields(category) {
    const container = document.getElementById('dynamic-fields-area');
    if(!container) return;

    const priceHtml = `<div style="margin-bottom: 15px;"><label class="modal-form-label">Valor (R$)</label><input type="tel" class="modal-input" placeholder="0,00"></div>`;
    let html = '';

    if (category === 'veiculos') {
        html = `<div class="form-row-grid"><div><label class="modal-form-label">Ano</label><input type="number" class="modal-input" placeholder="Ex: 2024"></div><div><label class="modal-form-label">KM</label><input type="tel" class="modal-input" placeholder="Ex: 50.000"></div></div><div style="margin-bottom: 15px;"><label class="modal-form-label">Câmbio</label><select class="modal-input"><option>Automático</option><option>Manual</option></select></div>`;
    } else if (category === 'imoveis') {
        html = `<div class="form-row-grid"><div><label class="modal-form-label">Área (m²)</label><input type="number" class="modal-input" placeholder="Ex: 70"></div><div><label class="modal-form-label">Quartos</label><input type="number" class="modal-input" placeholder="Ex: 2"></div></div><div style="margin-bottom: 15px;"><label class="modal-form-label">Tipo</label><select class="modal-input"><option>Venda</option><option>Aluguel</option></select></div>`;
    } else if (category === 'agro') {
        html = `<div class="form-row-grid"><div><label class="modal-form-label">Peso / @</label><input type="text" class="modal-input" placeholder="Ex: 18@"></div><div><label class="modal-form-label">Qtd.</label><input type="number" class="modal-input" placeholder="Cabeças"></div></div><div style="margin-bottom: 15px;"><label class="modal-form-label">Raça</label><input type="text" class="modal-input" placeholder="Ex: Nelore..."></div>`;
    } else if (category === 'eletronicos') {
        html = `<div style="margin-bottom: 15px;"><label class="modal-form-label">Condição</label><select class="modal-input"><option>Usado - Bom</option><option>Novo</option></select></div>`;
    }

    container.innerHTML = priceHtml + html;
}

// Inicializa
window.addEventListener('load', initApp);
