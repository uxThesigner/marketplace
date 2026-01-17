/* ============================================================
 * FUNCTIONS.JS - O "CÉREBRO" DO FRONTEND
 * ============================================================
 * Responsável pela interatividade, navegação e manipulação do DOM.
 */

// --- 1. GERADOR DE NAVEGAÇÃO (Bottom Navigation) ---

function renderBottomNav(activePage) {
    const container = document.getElementById('bottom-nav-container');
    if (!container) return;

    // Função auxiliar para marcar o ícone ativo
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


// --- 2. CONTROLE DE MODAIS (Abrir e Fechar Telas) ---

function toggleModal(modalId) {
    const modal = document.getElementById(modalId);
    if (!modal) return;

    if (modal.classList.contains('hidden')) {
        // ABRIR
        modal.classList.remove('hidden');
        // Pequeno delay para permitir que o navegador processe o display:block antes da opacidade
        setTimeout(() => {
            modal.classList.add('visible');
        }, 10);
    } else {
        // FECHAR
        modal.classList.remove('visible');
        // Espera a animação do CSS (0.3s) terminar para esconder de vez
        setTimeout(() => {
            modal.classList.add('hidden');
        }, 300);
    }
}


// --- 3. SIMULADOR DE SELEÇÃO DE CATEGORIA ---

function selectCategory(categoryType) {
    alert(`Demonstração: Você escolheu a categoria "${categoryType}". \n\nNo sistema final, isso carregaria os campos específicos.`);
    // Aqui fecharíamos o modal ou iríamos para o passo 2
    toggleModal('modal-new-ad');
}


// --- 4. INICIALIZAÇÃO DE DADOS (Preenche Nome e KPIs) ---

function initDashboard() {
    // Busca dados do _config.js (se ele foi carregado)
    if (typeof appConfig !== 'undefined') {
        // Preenche o nome do usuário
        const nameEl = document.getElementById('user-first-name');
        const avatarEl = document.getElementById('user-avatar-header');
        
        if (nameEl) nameEl.textContent = appConfig.user.firstName;
        if (avatarEl) avatarEl.textContent = appConfig.user.avatarInitials;
    }
    
    // (Opcional) Poderia buscar dados do mock_db.js aqui também
}

// Executa assim que a página terminar de carregar
window.addEventListener('DOMContentLoaded', initDashboard);
