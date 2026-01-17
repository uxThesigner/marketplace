/* ============================================================
 * _THEME.JS - VERSÃO DE DEBUG
 * ============================================================
 */
console.log("🚀 ARQUIVO _THEME.JS FOI CARREGADO COM SUCESSO!");

const appTheme = {
    colors: {
        primary: "#4D5D53",      // Verde Koda (Obrigatório)
        primaryDark: "#3A463F",  // Verde Escuro
        bg: "#F2F4F3",           // Fundo
        surface: "#FFFFFF"       // Cards
    },
    assets: {
        // Logo Koda Shop
        logoUrl: "https://placehold.co/400x120/4D5D53/ffffff?text=Koda+Shop&font=montserrat"
    }
};

function applyTheme() {
    console.log("🎨 Iniciando aplicação das cores...");
    
    // 1. Pega o elemento raiz do HTML
    const root = document.documentElement;

    // 2. Força a mudança das variáveis CSS
    root.style.setProperty('--primary-color', appTheme.colors.primary);
    root.style.setProperty('--primary-dark', appTheme.colors.primaryDark);
    root.style.setProperty('--bg-color', appTheme.colors.bg);
    
    // 3. Troca a logo (se existir na tela)
    const logoEl = document.getElementById('app-logo');
    if (logoEl) {
        logoEl.src = appTheme.assets.logoUrl;
        console.log("✅ Logo Trocada para Koda Shop.");
    } else {
        console.warn("⚠️ Elemento da Logo ainda não existe na tela.");
    }

    console.log("✅ Cores aplicadas: ", appTheme.colors.primary);
}

// Tenta rodar imediatamente (caso o script esteja no final do body)
applyTheme();

// E garante rodar de novo quando a página terminar de carregar tudo
document.addEventListener("DOMContentLoaded", applyTheme);
