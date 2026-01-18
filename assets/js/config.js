<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
    <meta name="theme-color" content="#ffffff">
    <title>Configurações | Koda White-Label</title>
    <link rel="stylesheet" href="assets/css/style.css">
    
    <style>
        .profile-card {
            background: var(--surface-color);
            padding: 24px;
            border-radius: var(--radius-lg);
            text-align: center;
            margin-bottom: 20px;
            box-shadow: 0 4px 12px rgba(0,0,0,0.03);
            transition: background 0.3s;
        }
        .profile-avatar-large {
            width: 80px; height: 80px;
            background: var(--bg-color); color: var(--primary-color);
            font-size: 32px; font-weight: 700; border-radius: 50%;
            display: flex; align-items: center; justify-content: center;
            margin: 0 auto 15px auto;
            border: 3px solid var(--surface-color);
            box-shadow: 0 0 0 2px var(--primary-color);
        }
        .profile-name { font-size: 18px; font-weight: 700; margin-bottom: 4px; }
        .profile-email { font-size: 14px; color: var(--text-secondary); }
        .plan-badge {
            display: inline-block; margin-top: 12px; padding: 6px 12px;
            background: var(--bg-color); color: var(--text-primary);
            border-radius: 20px; font-size: 12px; font-weight: 600;
        }

        /* CARD DE ASSINATURA (NOVO) */
        .subscription-card {
            background: var(--surface-color);
            border-radius: var(--radius-md);
            padding: 15px;
            margin-bottom: 24px;
            border: 1px solid var(--border-color);
            display: flex;
            flex-direction: column;
            gap: 10px;
        }
        .sub-row { display: flex; justify-content: space-between; font-size: 13px; }
        .sub-label { color: var(--text-secondary); }
        .sub-value { font-weight: 600; color: var(--text-primary); }
        .status-active-text { color: #166534; font-weight: 700; }
        body.dark-mode .status-active-text { color: #4ade80; }

        .settings-group {
            background: var(--surface-color);
            border-radius: var(--radius-md);
            overflow: hidden; margin-bottom: 20px;
            border: 1px solid var(--border-color);
            transition: background 0.3s;
        }
        .settings-item {
            display: flex; align-items: center; padding: 16px;
            border-bottom: 1px solid var(--border-color);
            cursor: pointer; transition: background 0.2s;
        }
        .settings-item:last-child { border-bottom: none; }
        .settings-item:active { background: var(--bg-color); }
        
        .settings-icon {
            width: 36px; height: 36px; border-radius: 8px;
            background: var(--bg-color); color: var(--primary-color);
            display: flex; align-items: center; justify-content: center;
            font-size: 18px; margin-right: 15px;
        }
        .settings-text { flex: 1; font-size: 14px; font-weight: 500; }
        .settings-arrow { color: var(--text-secondary); font-size: 16px; }
        .toggle-icon { font-size: 28px; color: var(--text-secondary); transition: 0.3s; }
        .toggle-icon.active-toggle { color: var(--primary-color); }

        .btn-logout {
            width: 100%; padding: 16px; background: #fee2e2; color: #ef4444;
            font-weight: 600; border-radius: var(--radius-md); font-size: 14px;
            display: flex; align-items: center; justify-content: center; gap: 8px;
        }
        .version-text { text-align: center; margin-top: 20px; font-size: 12px; color: var(--text-secondary); }

        .theme-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 15px; margin-top: 15px; }
        .theme-option { width: 45px; height: 45px; border-radius: 50%; margin: 0 auto; cursor: pointer; box-shadow: 0 2px 5px rgba(0,0,0,0.2); border: 2px solid var(--surface-color); }
        .theme-option:active { transform: scale(0.9); }
        
        .modal-overlay { position: fixed; top: 0; left: 0; width: 100%; height: 100%; background: rgba(0,0,0,0.5); z-index: 2000; display: flex; align-items: flex-end; opacity: 0; visibility: hidden; transition: all 0.3s ease; }
        .modal-content { background: var(--surface-color); width: 100%; max-width: 600px; margin: 0 auto; border-radius: var(--radius-lg) var(--radius-lg) 0 0; padding: 24px; transform: translateY(100%); transition: transform 0.3s; }
        .modal-overlay.visible { opacity: 1; visibility: visible; }
        .modal-overlay.visible .modal-content { transform: translateY(0); }
        .modal-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px; }
        .btn-icon { width: 32px; height: 32px; background: var(--bg-color); border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 18px; color: var(--text-primary); }

        .lang-list { display: flex; flex-direction: column; gap: 10px; margin-top: 10px; }
        .lang-option { padding: 15px; background: var(--bg-color); border-radius: var(--radius-md); display: flex; align-items: center; gap: 15px; font-weight: 600; color: var(--text-primary); }
    </style>
    <script src="https://unpkg.com/@phosphor-icons/web"></script>
</head>
<body>

    <header class="app-header">
        <div class="header-left">
            <span style="font-weight: 700; font-size: 18px; margin-left: 0;" data-i18n="page_config_title">Configurações</span>
        </div>
    </header>

    <main class="app-content" style="padding-top: 20px;">
        
        <div class="profile-card">
            <div class="profile-avatar-large" id="config-avatar">--</div>
            <h2 class="profile-name" id="config-name">...</h2>
            <p class="profile-email">admin@kodashop.com</p>
            <div class="plan-badge"><i class="ph ph-crown-simple"></i> Enterprise</div>
        </div>

        <div class="subscription-card">
            <div class="sub-row">
                <span class="sub-label" data-i18n="sub_status_label">Status:</span>
                <span class="sub-value status-active-text" data-i18n="sub_active">Ativo</span>
            </div>
            <div class="sub-row">
                <span class="sub-label" data-i18n="sub_next_invoice">Próxima Fatura:</span>
                <span class="sub-value">15 Fev, 2026</span>
            </div>
            <div class="sub-row">
                <span class="sub-label" data-i18n="sub_method">Pagamento:</span>
                <span class="sub-value">MasterCard •••• 8899</span>
            </div>
        </div>

        <h3 style="font-size: 14px; color: var(--text-secondary); margin-bottom: 10px; padding-left: 5px;" data-i18n="sec_account">Conta</h3>
        <div class="settings-group">
            <div class="settings-item">
                <div class="settings-icon"><i class="ph ph-buildings"></i></div>
                <div class="settings-text" data-i18n="item_company">Dados da Empresa</div>
                <i class="ph ph-caret-right settings-arrow"></i>
            </div>
            <div class="settings-item">
                <div class="settings-icon"><i class="ph ph-users"></i></div>
                <div class="settings-text" data-i18n="item_team">Gerenciar Equipe</div>
                <i class="ph ph-caret-right settings-arrow"></i>
            </div>
            <div class="settings-item">
                <div class="settings-icon"><i class="ph ph-receipt"></i></div>
                <div class="settings-text" data-i18n="item_sub">Histórico de Faturas</div>
                <i class="ph ph-caret-right settings-arrow"></i>
            </div>
        </div>

        <h3 style="font-size: 14px; color: var(--text-secondary); margin-bottom: 10px; padding-left: 5px;" data-i18n="sec_app">Aplicativo</h3>
        <div class="settings-group">
            
            <div class="settings-item" onclick="toggleDarkMode()">
                <div class="settings-icon"><i class="ph ph-moon"></i></div>
                <div class="settings-text" data-i18n="item_darkmode">Modo Escuro</div>
                <i id="dark-mode-toggle" class="ph ph-toggle-left toggle-icon"></i>
            </div>

            <div class="settings-item" onclick="toggleModal('modal-theme-select')">
                <div class="settings-icon"><i class="ph ph-paint-bucket"></i></div>
                <div class="settings-text" data-i18n="item_theme">Cores de Detalhe</div>
                <div style="width: 20px; height: 20px; border-radius: 50%; background: var(--primary-color); border: 1px solid #ccc;"></div>
            </div>

            <div class="settings-item" onclick="toggleModal('modal-lang-select')">
                <div class="settings-icon"><i class="ph ph-globe"></i></div>
                <div class="settings-text" data-i18n="item_lang">Idioma</div>
                <i class="ph ph-caret-right settings-arrow"></i>
            </div>
            
             <div class="settings-item">
                <div class="settings-icon"><i class="ph ph-bell"></i></div>
                <div class="settings-text" data-i18n="item_notif">Notificações</div>
                <i class="ph ph-caret-right settings-arrow"></i>
            </div>

             <div class="settings-item">
                <div class="settings-icon"><i class="ph ph-lifebuoy"></i></div>
                <div class="settings-text" data-i18n="item_help">Ajuda e Suporte</div>
                <i class="ph ph-caret-right settings-arrow"></i>
            </div>
        </div>

        <button class="btn-logout" onclick="doLogout()">
            <i class="ph ph-sign-out"></i>
            <span data-i18n="btn_logout">Sair do Sistema</span>
        </button>

        <p class="version-text">Versão MVP 1.1.2 • Koda System</p>
        <div class="spacer-bottom"></div>
    </main>

    <div id="modal-theme-select" class="modal-overlay hidden">
        <div class="modal-content bottom-sheet">
            <div class="modal-header">
                <h2 data-i18n="modal_theme_title">Escolha sua Vibe</h2>
                <button class="btn-icon" onclick="toggleModal('modal-theme-select')"><i class="ph ph-x"></i></button>
            </div>
            <div class="modal-body">
                <div class="theme-grid">
                    <div class="theme-option" style="background: #4D5D53;" onclick="changeAppTheme('#4D5D53')"></div>
                    <div class="theme-option" style="background: #2563EB;" onclick="changeAppTheme('#2563EB')"></div>
                    <div class="theme-option" style="background: #7C3AED;" onclick="changeAppTheme('#7C3AED')"></div>
                    <div class="theme-option" style="background: #EA580C;" onclick="changeAppTheme('#EA580C')"></div>
                    <div class="theme-option" style="background: #EF4444;" onclick="changeAppTheme('#EF4444')"></div>
                    <div class="theme-option" style="background: #F59E0B;" onclick="changeAppTheme('#F59E0B')"></div>
                    <div class="theme-option" style="background: #10B981;" onclick="changeAppTheme('#10B981')"></div>
                    <div class="theme-option" style="background: #06B6D4;" onclick="changeAppTheme('#06B6D4')"></div>
                    <div class="theme-option" style="background: #EC4899;" onclick="changeAppTheme('#EC4899')"></div>
                    <div class="theme-option" style="background: #6366F1;" onclick="changeAppTheme('#6366F1')"></div>
                    <div class="theme-option" style="background: #84CC16;" onclick="changeAppTheme('#84CC16')"></div>
                    <div class="theme-option" style="background: #111827;" onclick="changeAppTheme('#111827')"></div>
                </div>
            </div>
        </div>
    </div>

    <div id="modal-lang-select" class="modal-overlay hidden">
        <div class="modal-content bottom-sheet">
            <div class="modal-header">
                <h2 data-i18n="modal_lang_title">Selecione o Idioma</h2>
                <button class="btn-icon" onclick="toggleModal('modal-lang-select')"><i class="ph ph-x"></i></button>
            </div>
            <div class="modal-body">
                <div class="lang-list">
                    <button class="lang-option" onclick="changeAppLanguage('pt'); toggleModal('modal-lang-select')">🇧🇷 Português</button>
                    <button class="lang-option" onclick="changeAppLanguage('en'); toggleModal('modal-lang-select')">🇺🇸 English</button>
                    <button class="lang-option" onclick="changeAppLanguage('es'); toggleModal('modal-lang-select')">🇪🇸 Español</button>
                </div>
            </div>
        </div>
    </div>
    
    <div id="modal-new-ad" class="modal-overlay hidden">
        <div class="modal-content bottom-sheet">
            <div class="modal-header">
                <h2>Adicionar Novo Item</h2>
                <button class="btn-icon" onclick="toggleModal('modal-new-ad')"><i class="ph ph-x"></i></button>
            </div>
            <div class="modal-body">
                <div class="category-grid">
                    <button class="cat-card" onclick="selectCategory('veiculos')">
                        <div class="cat-icon"><i class="ph ph-car"></i></div><span>Veículos</span>
                    </button>
                    <button class="cat-card" onclick="selectCategory('imoveis')">
                        <div class="cat-icon"><i class="ph ph-house"></i></div><span>Imóveis</span>
                    </button>
                    <button class="cat-card" onclick="selectCategory('eletronicos')">
                        <div class="cat-icon"><i class="ph ph-device-mobile"></i></div><span>Eletrônicos</span>
                    </button>
                    <button class="cat-card" onclick="selectCategory('agro')">
                        <div class="cat-icon"><i class="ph ph-plant"></i></div><span>Agro</span>
                    </button>
                </div>
            </div>
        </div>
    </div>

    <div id="bottom-nav-container"></div>

    <script src="assets/js/config.js"></script> 
    <script src="assets/js/mock_db.js"></script>
    <script src="assets/js/theme.js"></script>
    <script src="assets/js/functions.js"></script>
    
    <script>
        renderBottomNav('config');
        function doLogout() {
            if(confirm("Deseja realmente sair?")) window.location.href = "index.html";
        }
    </script>
</body>
</html>
