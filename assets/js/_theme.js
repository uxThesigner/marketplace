/* ============================================================
 * TEMA E IDENTIDADE VISUAL (WHITE-LABEL ENGINE)
 * ============================================================
 * Este arquivo controla a "pele" do aplicativo.
 * Altere as cores aqui e o CSS (:root) obedecerá instantaneamente.
 */

const appTheme = {
    // A Paleta de Cores da "Koda Shop"
    colors: {
        primary: "#4D5D53",      // Cor solicitada (Verde Ardósia)
        primaryDark: "#3A463F",  // Variação 20% mais escura (para Hover/Clique)
        secondary: "#8C9E93",    // Uma cor de apoio mais clara
        surface: "#FFFFFF",      // Cor dos cards
        background: "#F2F4F3"    // Um cinza levemente esverdeado para harmonizar
    },
    
    // Configurações de Ativos (Assets)
    assets: {
        // Gerador de logo dinâmica com a cor da marca (apenas para o MVP)
        logoUrl: "https://placehold.co/400x120/4D5D53/ffffff?text=Koda+Shop&font=montserrat",
        fontFamily: "'Inter', sans-serif"
    }
};

/**
 * Função: applyTheme
 * Responsabilidade: Pegar o objeto acima e injetar no CSS do navegador.
 * Isso permite troca de tema em tempo real (runtime).
 */
function applyTheme() {
    const root = document.documentElement; // Pega o elemento <html>
    
    // 1. Injeta as Cores nas Variáveis CSS (sobrescreve o style.css)
    root.style.setProperty('--primary-color', appTheme.colors.primary);
    root.style.setProperty('--primary-dark', appTheme.colors.primaryDark);
    root.style.setProperty('--bg-color', appTheme.colors.background);
    
    // 2. Aplica a Logo
    const logoEl = document.getElementById('app-logo');
    if (logoEl) {
        logoEl.src = appTheme.assets.logoUrl;
    }

    // 3. (Opcional) Ajusta cores das plataformas para harmonizar, se quiser
    // Ex: root.style.setProperty('--color-olx', '#...'); 
    
    console.log(`%c [Theme Engine] Tema aplicado: ${appConfig.business.name}`, `color: ${appTheme.colors.primary}`);
}

// Executa a aplicação do tema assim que este script carregar
// (Garante que o usuário não veja a cor errada piscando)
applyTheme();
