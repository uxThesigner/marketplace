/* ============================================================
 * FUNCTIONS.JS - Gerente Geral + Tradução + Temas
 * ============================================================
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
        "item_theme": "Aparência (Tema)",
        "item_lang": "Idioma (Language)",
        "item_help": "Ajuda e Suporte",
        "btn_logout": "Sair do Sistema",
        "modal_theme_title": "Escolha um Tema",
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
        "item_theme": "Appearance (Theme)",
        "item_lang": "Language (Idioma)",
        "item_help": "Help & Support",
        "btn_logout": "Logout",
        "modal_theme_title": "Choose a Theme",
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
        "item_theme": "Apariencia (Tema)",
        "item_lang": "Idioma (Language)",
        "item_help": "Ayuda y Soporte",
        "btn_logout": "Cerrar Sesión",
        "modal_theme_title": "Elige un Tema",
        "modal_lang_title": "Seleccionar Idioma"
    }
};

// --- 1. MÓDULO DE INICIALIZAÇÃO ---

function initApp() {
    console.log("🚀 Iniciando Koda System App...");

    // A. Carrega Preferências Salvas (Tema e Idioma)
    loadSavedPreferences();

    // B. Aplica Configuração do Usuário
    if (typeof appConfig !== 'undefined') {
        const nameEl = document.getElementById('user-first-name');
        const avatarEl = document.getElementById('user-avatar-header');
        
        if (nameEl) nameEl.textContent = appConfig.user.firstName;
        if (avatarEl) avatarEl.textContent = appConfig.user.avatarInitials;
    }

    // C. Carrega Dados do Dashboard
    loadDashboardData();
}

// --- 2. GERENCIADOR DE PREFERÊNCIAS (Tema e Idioma) ---

function loadSavedPreferences() {
    // 1. Verifica se tem cor salva no navegador
    const savedColor = localStorage.getItem('koda_theme_color');
    if (savedColor) {
        changeAppTheme(savedColor);
    } else if (typeof appTheme !== 'undefined') {
        // Se não tiver salvo, usa o do theme.js (Padrão Koda)
        changeAppTheme(appTheme.colors.primary);
    }

    // 2. Verifica se tem idioma salvo
    const savedLang = localStorage.getItem('koda_lang') || 'pt';
    changeAppLanguage(savedLang);
}

function changeAppTheme(colorHex) {
    const root = document.documentElement;
    root.style.setProperty('--primary-color', colorHex);
    // Cria uma versão mais escura simples para o hover
    // (Num app real usaria manipulação de cor, aqui vamos manter simples)
    root.style.setProperty('--primary-dark', colorHex); 
    
    // Salva na memória do navegador
    localStorage.setItem('koda_theme_color', colorHex);
}

function changeAppLanguage(langCode) {
    if (!translations[langCode]) return;

    // Busca todos os elementos com a tag 'data-i18n'
    const elementsToTranslate = document.querySelectorAll('[data-i18n]');
    
    elementsToTranslate.forEach(el => {
        const key = el.getAttribute('data-i18n');
        if (translations[langCode][key]) {
            el.textContent = translations[langCode][key];
        }
    });

    // Salva na memória
    localStorage.setItem('koda_lang', langCode);

    // Atualiza visualmente qual língua está selecionada (se houver UI para isso)
    document.querySelectorAll('.lang-option').forEach(btn => {
        btn.classList.remove('selected');
        if(btn.dataset.lang === langCode) btn.classList.add('selected');
    });
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

    // Note os atributos data-i18n adicionados aqui para tradução da barra
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
    
    // Reaplica a tradução atual na barra recém-criada
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

// Inicializador Global
window.addEventListener('load', initApp);
