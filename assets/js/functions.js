/* ============================================================
 * FUNCTIONS.JS - Gerente Geral do App
 * ============================================================
 */

// --- 1. MÓDULO DE INICIALIZAÇÃO (Roda ao abrir) ---

function initApp() {
    console.log("🚀 Iniciando Koda System App...");

    // A. Força a Aplicação do TEMA
    if (typeof appTheme !== 'undefined') {
        const root = document.documentElement;
        
        // Aplica cores nas variáveis CSS
        root.style.setProperty('--primary-color', appTheme.colors.primary);
        root.style.setProperty('--primary-dark', appTheme.colors.primaryDark);
        root.style.setProperty('--bg-color', appTheme.colors.background);
        
        // Aplica Logo
        const logoEl = document.getElementById('app-logo');
        if (logoEl) logoEl.src = appTheme.assets.logoUrl;
        
        console.log("✅ Tema Aplicado:", appTheme.colors.primary);
    } else {
        console.error("❌ ERRO CRÍTICO: theme.js não foi carregado!");
    }

    // B. Força a Aplicação da CONFIGURAÇÃO (Nome do Usuário)
    if (typeof appConfig !== 'undefined') {
        const nameEl = document.getElementById('user-first-name');
        const avatarEl = document.getElementById('user-avatar-header');
        
        if (nameEl) nameEl.textContent = appConfig.user.firstName;
        if (avatarEl) avatarEl.textContent = appConfig.user.avatarInitials;
        
        console.log("✅ Configuração Aplicada:", appConfig.user.name);
    } else {
        console.error("❌ ERRO CRÍTICO: config.js não foi carregado!");
    }

    // C. Carrega os DADOS (Dashboard)
    loadDashboardData();
}

// --- 2. MÓDULO DE DADOS (Preenche a tela) ---

function loadDashboardData() {
    // Verifica se estamos na dashboard e se o banco de dados existe
    if (typeof statsDB !== 'undefined') {
        
        // KPIs
        safeSetText('kpi-sales', `R$ ${statsDB.salesToday.toLocaleString('pt-BR', {minimumFractionDigits: 2})}`);
        safeSetText('kpi-active-ads', statsDB.activeAds);
        safeSetText('kpi-messages', statsDB.messages);

        // Feed de Produtos
        const feedList = document.getElementById('dashboard-feed-list');
        if (feedList && typeof productsDB !== 'undefined') {
            feedList.innerHTML = ''; // Limpa placeholder
            
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

// Função auxiliar para não quebrar se o elemento não existir
function safeSetText(id, text) {
    const el = document.getElementById(id);
    if (el) el.textContent = text;
}

// --- 3. UI & NAVEGAÇÃO ---

function renderBottomNav(activePage) {
    const container = document.getElementById('bottom-nav-container');
    if (!container) return;

    const isActive = (page) => page === activePage ? 'active' : '';

    container.innerHTML = `
    <nav class="bottom-navbar">
        <a href="dashboard.html" class="nav-item ${isActive('home')}">
            <i class="ph ph-house"></i><span>Início</span>
        </a>
        
        <a href="estoque.html" class="nav-item ${isActive('estoque')}">
            <i class="ph ph-package"></i><span>Anúncios</span>
        </a>
        
        <div class="nav-fab-container">
            <button class="fab-button" onclick="toggleModal('modal-new-ad')">
                <i class="ph ph-plus"></i>
            </button>
        </div>
        
        <a href="leads.html" class="nav-item ${isActive('leads')}">
            <i class="ph ph-chat-circle"></i><span>Leads</span>
        </a>
        
        <a href="config.html" class="nav-item ${isActive('config')}">
            <i class="ph ph-gear"></i><span>Config</span>
        </a>
    </nav>
    `;
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

// --- 4. DISPARO AUTOMÁTICO ---

// Escuta quando o HTML terminar de carregar TUDO
window.addEventListener('load', initApp);
