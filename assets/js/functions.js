/* ============================================================
 * FUNCTIONS.JS - Lógica Principal
 * ============================================================
 */

// 1. RENDERIZA A NAVEGAÇÃO INFERIOR
function renderBottomNav(activePage) {
    const container = document.getElementById('bottom-nav-container');
    if (!container) return;

    const isActive = (page) => page === activePage ? 'active' : '';

    container.innerHTML = `
    <nav class="bottom-navbar">
        <a href="dashboard.html" class="nav-item ${isActive('home')}">
            <i class="ph ph-house"></i>
            <span>Início</span>
        </a>
        <a href="#" class="nav-item ${isActive('estoque')}">
            <i class="ph ph-package"></i>
            <span>Estoque</span>
        </a>
        <div class="nav-fab-container">
            <button class="fab-button" onclick="toggleModal('modal-new-ad')">
                <i class="ph ph-plus"></i>
            </button>
        </div>
        <a href="#" class="nav-item ${isActive('leads')}">
            <i class="ph ph-chat-circle"></i>
            <span>Leads</span>
        </a>
        <a href="#" class="nav-item ${isActive('config')}">
            <i class="ph ph-gear"></i>
            <span>Config</span>
        </a>
    </nav>
    `;
}

// 2. CONTROLE DE MODAL
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

// 3. INICIALIZA O DASHBOARD (PREENCHE DADOS)
function initDashboard() {
    console.log("🔄 Iniciando Dashboard...");

    // A. Preencher Dados do Usuário (_config.js)
    if (typeof appConfig !== 'undefined') {
        const nameEl = document.getElementById('user-first-name');
        const avatarEl = document.getElementById('user-avatar-header');
        
        if (nameEl) nameEl.textContent = appConfig.user.firstName;
        if (avatarEl) avatarEl.textContent = appConfig.user.avatarInitials;
        console.log("✅ Usuário carregado:", appConfig.user.firstName);
    } else {
        console.error("❌ Erro: appConfig não encontrado. Verifique o _config.js");
    }

    // B. Preencher KPIs (mock_db.js)
    if (typeof statsDB !== 'undefined') {
        document.getElementById('kpi-sales').textContent = `R$ ${statsDB.salesToday.toLocaleString('pt-BR', {minimumFractionDigits: 2})}`;
        document.getElementById('kpi-active-ads').textContent = statsDB.activeAds;
        document.getElementById('kpi-messages').textContent = statsDB.messages;
    }

    // C. Preencher Lista de Feed (mock_db.js)
    const feedList = document.getElementById('dashboard-feed-list');
    if (feedList && typeof productsDB !== 'undefined') {
        feedList.innerHTML = ''; // Limpa o "Carregando..."
        
        productsDB.forEach(prod => {
            // Cria o HTML de cada item
            const itemHTML = `
                <div class="product-item">
                    <div class="prod-thumb">
                        <i class="ph ${prod.image}"></i>
                    </div>
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
        console.log("✅ Feed atualizado com", productsDB.length, "itens.");
    }
}

function selectCategory(cat) {
    alert('Selecionado: ' + cat);
    toggleModal('modal-new-ad');
}

// 4. DISPARADORES
document.addEventListener('DOMContentLoaded', () => {
    // Garante que o Theme rode (caso não tenha rodado ainda)
    if (typeof applyTheme === 'function') applyTheme();
    
    // Inicia os dados
    initDashboard();
});
