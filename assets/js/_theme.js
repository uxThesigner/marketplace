const appTheme = {
    colors: {
        primary: "#4D5D53",      // Verde Koda
        primaryDark: "#3A463F",  
        secondary: "#8C9E93",    
        surface: "#FFFFFF",      
        background: "#F2F4F3"    
    },
    assets: {
        // Logo gerada dinamicamente
        logoUrl: "https://placehold.co/400x120/4D5D53/ffffff?text=Koda+Shop&font=montserrat",
        fontFamily: "'Inter', sans-serif"
    }
};

function applyTheme() {
    console.log("🎨 Iniciando motor de tema...");
    const root = document.documentElement;

    // 1. Aplica as cores na raiz (CSS Variables)
    root.style.setProperty('--primary-color', appTheme.colors.primary);
    root.style.setProperty('--primary-dark', appTheme.colors.primaryDark);
    root.style.setProperty('--bg-color', appTheme.colors.background);

    // 2. Tenta aplicar a logo (Verifica se o elemento existe primeiro)
    const logoEl = document.getElementById('app-logo');
    if (logoEl) {
        logoEl.src = appTheme.assets.logoUrl;
        console.log("✅ Logo aplicada.");
    } else {
        console.warn("⚠️ Elemento 'app-logo' não encontrado ainda.");
    }
}

// GARANTIA: Só roda quando o HTML estiver 100% pronto
document.addEventListener('DOMContentLoaded', applyTheme);
