// ========================================
// SISTEMA DE INTERNACIONALIZAÇÃO (i18n)
// ========================================

const translations = {
    'pt-BR': {
        // Menu
        'nav-home': 'Início',
        'nav-sales': 'Vendas',
        'nav-products': 'Produtos',
        'nav-orders': 'Pedidos',
        'nav-expenses': 'Despesas',
        'nav-analytics': 'Análises',
        'nav-customers': 'Clientes',
        'nav-settings': 'Configurações',
        
        // Header
        'page-title-home': 'Painel de Controle',
        'page-title-sales': 'Gestão de Vendas',
        'page-title-products': 'Catálogo de Produtos',
        'page-title-orders': 'Gerenciar Pedidos',
        'page-title-expenses': 'Controle de Despesas',
        'page-title-analytics': 'Análises e Relatórios',
        'page-title-customers': 'Base de Clientes',
        'page-title-settings': 'Configurações do Sistema',
        'search-placeholder': 'Buscar pedidos, clientes, produtos...',
        
        // Métricas
        'metric-sales': 'Vendas Totais',
        'metric-orders': 'Pedidos',
        'metric-expenses': 'Despesas',
        'metric-profit': 'Lucro Líquido',
        'vs-last-month': 'vs mês anterior',
        
        // Botões
        'btn-new-order': 'Novo Pedido',
        'btn-export-pdf': 'Exportar PDF',
        'btn-export-excel': 'Exportar Excel',
        'btn-save': 'Salvar',
        'btn-cancel': 'Cancelar',
        'btn-login': 'Entrar',
        'btn-logout': 'Sair',
        
        // Gráficos
        'chart-sales-category': 'Vendas por Categoria',
        'chart-order-status': 'Status de Pedidos',
        
        // Tabela
        'table-recent-orders': 'Pedidos Recentes',
        'table-id': 'ID Pedido',
        'table-customer': 'Cliente',
        'table-product': 'Produto',
        'table-date': 'Data',
        'table-value': 'Valor',
        'table-status': 'Status',
        'table-actions': 'Ações',
        
        // Status
        'status-all': 'Todos os Status',
        'status-delivered': 'Entregue',
        'status-shipping': 'Em Trânsito',
        'status-processing': 'Processando',
        'status-cancelled': 'Cancelado',
        
        // Período
        'period-all': 'Todo o Período',
        'period-today': 'Hoje',
        'period-week': 'Esta Semana',
        'period-month': 'Este Mês',
        
        // Toast Messages
        'toast-welcome': 'Bem-vindo!',
        'toast-dashboard-loaded': 'Dashboard carregado com sucesso',
        'toast-theme-changed': 'Tema alterado',
        'toast-dark-mode': 'Modo escuro ativado',
        'toast-light-mode': 'Modo claro ativado',
        'toast-auto-mode': 'Modo automático ativado',
        
        // Login
        'login-title': 'Dashboard Admin',
        'login-subtitle': 'Desenvolvido por Felipe Andrade',
        'login-email': 'E-mail',
        'login-password': 'Senha',
        'login-remember': 'Lembrar de mim',
        'login-hint': 'Dica: admin@dashboard.com / admin123',
        
        // Idiomas
        'current-lang': 'PT',
        'lang-pt': 'Português',
        'lang-en': 'English',
        'lang-es': 'Español'
    },
    
    'en-US': {
        // Menu
        'nav-home': 'Home',
        'nav-sales': 'Sales',
        'nav-products': 'Products',
        'nav-orders': 'Orders',
        'nav-expenses': 'Expenses',
        'nav-analytics': 'Analytics',
        'nav-customers': 'Customers',
        'nav-settings': 'Settings',
        
        // Header
        'page-title-home': 'Control Panel',
        'page-title-sales': 'Sales Management',
        'page-title-products': 'Product Catalog',
        'page-title-orders': 'Manage Orders',
        'page-title-expenses': 'Expense Control',
        'page-title-analytics': 'Analytics & Reports',
        'page-title-customers': 'Customer Base',
        'page-title-settings': 'System Settings',
        'search-placeholder': 'Search orders, customers, products...',
        
        // Metrics
        'metric-sales': 'Total Sales',
        'metric-orders': 'Orders',
        'metric-expenses': 'Expenses',
        'metric-profit': 'Net Profit',
        'vs-last-month': 'vs last month',
        
        // Buttons
        'btn-new-order': 'New Order',
        'btn-export-pdf': 'Export PDF',
        'btn-export-excel': 'Export Excel',
        'btn-save': 'Save',
        'btn-cancel': 'Cancel',
        'btn-login': 'Login',
        'btn-logout': 'Logout',
        
        // Charts
        'chart-sales-category': 'Sales by Category',
        'chart-order-status': 'Order Status',
        
        // Table
        'table-recent-orders': 'Recent Orders',
        'table-id': 'Order ID',
        'table-customer': 'Customer',
        'table-product': 'Product',
        'table-date': 'Date',
        'table-value': 'Value',
        'table-status': 'Status',
        'table-actions': 'Actions',
        
        // Status
        'status-all': 'All Status',
        'status-delivered': 'Delivered',
        'status-shipping': 'Shipping',
        'status-processing': 'Processing',
        'status-cancelled': 'Cancelled',
        
        // Period
        'period-all': 'All Period',
        'period-today': 'Today',
        'period-week': 'This Week',
        'period-month': 'This Month',
        
        // Toast Messages
        'toast-welcome': 'Welcome!',
        'toast-dashboard-loaded': 'Dashboard loaded successfully',
        'toast-theme-changed': 'Theme changed',
        'toast-dark-mode': 'Dark mode activated',
        'toast-light-mode': 'Light mode activated',
        'toast-auto-mode': 'Auto mode activated',
        
        // Login
        'login-title': 'Admin Dashboard',
        'login-subtitle': 'Developed by Felipe Andrade',
        'login-email': 'Email',
        'login-password': 'Password',
        'login-remember': 'Remember me',
        'login-hint': 'Hint: admin@dashboard.com / admin123',
        
        // Languages
        'current-lang': 'EN',
        'lang-pt': 'Português',
        'lang-en': 'English',
        'lang-es': 'Español'
    },
    
    'es-ES': {
        // Menu
        'nav-home': 'Inicio',
        'nav-sales': 'Ventas',
        'nav-products': 'Productos',
        'nav-orders': 'Pedidos',
        'nav-expenses': 'Gastos',
        'nav-analytics': 'Análisis',
        'nav-customers': 'Clientes',
        'nav-settings': 'Configuración',
        
        // Header
        'page-title-home': 'Panel de Control',
        'page-title-sales': 'Gestión de Ventas',
        'page-title-products': 'Catálogo de Productos',
        'page-title-orders': 'Gestionar Pedidos',
        'page-title-expenses': 'Control de Gastos',
        'page-title-analytics': 'Análisis e Informes',
        'page-title-customers': 'Base de Clientes',
        'page-title-settings': 'Configuración del Sistema',
        'search-placeholder': 'Buscar pedidos, clientes, productos...',
        
        // Metrics
        'metric-sales': 'Ventas Totales',
        'metric-orders': 'Pedidos',
        'metric-expenses': 'Gastos',
        'metric-profit': 'Beneficio Neto',
        'vs-last-month': 'vs mes anterior',
        
        // Buttons
        'btn-new-order': 'Nuevo Pedido',
        'btn-export-pdf': 'Exportar PDF',
        'btn-export-excel': 'Exportar Excel',
        'btn-save': 'Guardar',
        'btn-cancel': 'Cancelar',
        'btn-login': 'Entrar',
        'btn-logout': 'Salir',
        
        // Charts
        'chart-sales-category': 'Ventas por Categoría',
        'chart-order-status': 'Estado de Pedidos',
        
        // Table
        'table-recent-orders': 'Pedidos Recientes',
        'table-id': 'ID Pedido',
        'table-customer': 'Cliente',
        'table-product': 'Producto',
        'table-date': 'Fecha',
        'table-value': 'Valor',
        'table-status': 'Estado',
        'table-actions': 'Acciones',
        
        // Status
        'status-all': 'Todos los Estados',
        'status-delivered': 'Entregado',
        'status-shipping': 'En Tránsito',
        'status-processing': 'Procesando',
        'status-cancelled': 'Cancelado',
        
        // Period
        'period-all': 'Todo el Período',
        'period-today': 'Hoy',
        'period-week': 'Esta Semana',
        'period-month': 'Este Mes',
        
        // Toast Messages
        'toast-welcome': '¡Bienvenido!',
        'toast-dashboard-loaded': 'Dashboard cargado con éxito',
        'toast-theme-changed': 'Tema cambiado',
        'toast-dark-mode': 'Modo oscuro activado',
        'toast-light-mode': 'Modo claro activado',
        'toast-auto-mode': 'Modo automático activado',
        
        // Login
        'login-title': 'Dashboard Admin',
        'login-subtitle': 'Desarrollado por Felipe Andrade',
        'login-email': 'Correo electrónico',
        'login-password': 'Contraseña',
        'login-remember': 'Recordarme',
        'login-hint': 'Pista: admin@dashboard.com / admin123',
        
        // Languages
        'current-lang': 'ES',
        'lang-pt': 'Português',
        'lang-en': 'English',
        'lang-es': 'Español'
    }
};

// Função para traduzir
function translate(key, lang = null) {
    const currentLang = lang || localStorage.getItem('language') || 'pt-BR';
    return translations[currentLang][key] || key;
}

// Aplicar traduções na página
function applyTranslations(lang) {
    document.querySelectorAll('[data-i18n]').forEach(element => {
        const key = element.getAttribute('data-i18n');
        const translation = translate(key, lang);
        
        if (element.tagName === 'INPUT' && element.hasAttribute('placeholder')) {
            element.placeholder = translation;
        } else {
            element.textContent = translation;
        }
    });
    
    localStorage.setItem('language', lang);
}
