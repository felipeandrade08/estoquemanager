// ========================================
// DASHBOARD ADMINISTRATIVO - Felipe Andrade
// © 2026 - Todos os direitos reservados
// ========================================

console.log('%c🎨 Dashboard Administrativo Avançado', 'color: #0d6efd; font-size: 20px; font-weight: bold;');
console.log('%c✨ Desenvolvido por Felipe Andrade', 'color: #6c757d; font-size: 14px;');
console.log('%c📅 2026 - Todos os direitos reservados', 'color: #6c757d; font-size: 12px;');

// Elementos
const elements = {
    themeToggle: document.getElementById('themeToggle'),
    mobileToggle: document.getElementById('mobileToggle'),
    sidebar: document.getElementById('sidebar'),
    body: document.body,
    pageTitle: document.getElementById('pageTitle'),
    searchInput: document.getElementById('searchInput'),
    navItems: document.querySelectorAll('.nav-item'),
    langBtn: document.getElementById('langBtn'),
    langMenu: document.getElementById('langMenu'),
    notificationBtn: document.getElementById('notificationBtn'),
    userBtn: document.getElementById('userBtn'),
    notificationsPanel: document.getElementById('notificationsPanel'),
    userMenu: document.getElementById('userMenu'),
    loginModal: document.getElementById('loginModal'),
    loginForm: document.getElementById('loginForm'),
    logoutBtn: document.getElementById('logoutBtn'),
    newOrderBtn: document.getElementById('newOrderBtn'),
    newOrderModal: document.getElementById('newOrderModal'),
    newOrderForm: document.getElementById('newOrderForm'),
    cancelOrderBtn: document.getElementById('cancelOrderBtn'),
    toast: document.getElementById('toast'),
    appContent: document.getElementById('appContent')
};

// Estado Global
const state = {
    currentPage: 'inicio',
    currentLang: localStorage.getItem('language') || 'pt-BR',
    themeMode: localStorage.getItem('themeMode') || 'auto', // auto, light, dark
    isAuthenticated: false,
    userData: null,
    charts: {}
};

// Usuários válidos
const validUsers = {
    'admin@dashboard.com': {
        password: 'admin123',
        name: 'Felipe Andrade',
        role: 'Administrador'
    },
    'user@dashboard.com': {
        password: 'user123',
        name: 'Usuário Teste',
        role: 'Usuário'
    }
};

// ========================================
// SISTEMA DE AUTENTICAÇÃO
// ========================================

function checkSession() {
    const session = localStorage.getItem('userSession') || sessionStorage.getItem('userSession');
    if (session) {
        try {
            state.userData = JSON.parse(session);
            state.isAuthenticated = true;
            elements.loginModal.classList.remove('active');
            updateUserInfo(state.userData);
            return true;
        } catch (e) {
            return false;
        }
    }
    return false;
}

function login(email, password, remember) {
    if (validUsers[email] && validUsers[email].password === password) {
        const userData = {
            email,
            name: validUsers[email].name,
            role: validUsers[email].role,
            loginTime: new Date().toISOString()
        };
        
        const storage = remember ? localStorage : sessionStorage;
        storage.setItem('userSession', JSON.stringify(userData));
        
        state.isAuthenticated = true;
        state.userData = userData;
        
        elements.loginModal.classList.remove('active');
        updateUserInfo(userData);
        showToast('Bem-vindo!', `Login realizado com sucesso, ${userData.name}`, 'success');
        
        // Carregar página inicial
        loadPage('inicio');
        
        return true;
    }
    return false;
}

function logout() {
    localStorage.removeItem('userSession');
    sessionStorage.removeItem('userSession');
    state.isAuthenticated = false;
    state.userData = null;
    location.reload();
}

function updateUserInfo(userData) {
    document.getElementById('userName').textContent = userData.name;
    document.getElementById('userRole').textContent = userData.role;
    document.getElementById('userMenuName').textContent = userData.name;
    
    const initials = userData.name.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase();
    document.querySelectorAll('.user-avatar-small, .user-avatar-large').forEach(el => {
        el.textContent = initials;
    });
}

// Event Listeners de Autenticação
elements.loginForm?.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = document.getElementById('loginEmail').value;
    const password = document.getElementById('loginPassword').value;
    const remember = document.getElementById('rememberMe').checked;
    
    if (!login(email, password, remember)) {
        showToast('Erro', 'Email ou senha incorretos', 'error');
    }
});

elements.logoutBtn?.addEventListener('click', (e) => {
    e.preventDefault();
    logout();
});

// ========================================
// SISTEMA DE TEMAS
// ========================================

const themeStates = ['auto', 'light', 'dark'];
let themeIndex = themeStates.indexOf(state.themeMode);

function applyTheme(theme) {
    if (theme === 'dark') {
        elements.body.classList.add('dark-mode');
        elements.themeToggle.querySelector('.material-symbols-outlined').textContent = 'light_mode';
    } else {
        elements.body.classList.remove('dark-mode');
        elements.themeToggle.querySelector('.material-symbols-outlined').textContent = 'dark_mode';
    }
}

function checkAutoTheme() {
    if (state.themeMode === 'auto') {
        const hour = new Date().getHours();
        const isDarkTime = hour >= 18 || hour < 6;
        applyTheme(isDarkTime ? 'dark' : 'light');
    }
}

function cycleTheme() {
    themeIndex = (themeIndex + 1) % themeStates.length;
    state.themeMode = themeStates[themeIndex];
    localStorage.setItem('themeMode', state.themeMode);
    
    const messages = {
        'auto': 'Modo automático ativado (18h-6h = escuro)',
        'light': 'Modo claro ativado',
        'dark': 'Modo escuro ativado'
    };
    
    elements.themeToggle.title = `Modo: ${state.themeMode}`;
    
    if (state.themeMode === 'auto') {
        checkAutoTheme();
    } else {
        applyTheme(state.themeMode);
    }
    
    showToast('Tema alterado', messages[state.themeMode], 'success');
    
    // Atualizar gráficos
    updateChartsTheme();
}

elements.themeToggle?.addEventListener('click', cycleTheme);

// Verificar tema automático a cada minuto
setInterval(checkAutoTheme, 60000);

// ========================================
// SISTEMA DE IDIOMAS (i18n)
// ========================================

function changeLanguage(lang) {
    state.currentLang = lang;
    applyTranslations(lang);
    
    const langLabels = {
        'pt-BR': 'PT',
        'en-US': 'EN',
        'es-ES': 'ES'
    };
    
    document.querySelector('.lang-text').textContent = langLabels[lang];
    elements.langMenu.classList.remove('active');
    
    // Recarregar página atual com novo idioma
    loadPage(state.currentPage);
    
    showToast('Idioma alterado', 'Interface traduzida com sucesso', 'success');
}

elements.langBtn?.addEventListener('click', () => {
    elements.langMenu.classList.toggle('active');
});

document.querySelectorAll('.lang-option').forEach(btn => {
    btn.addEventListener('click', () => {
        const lang = btn.getAttribute('data-lang');
        changeLanguage(lang);
    });
});

// ========================================
// NAVEGAÇÃO
// ========================================

function toggleMobileMenu() {
    elements.sidebar.classList.toggle('active');
    
    let overlay = document.querySelector('.overlay');
    
    if (!overlay) {
        overlay = document.createElement('div');
        overlay.className = 'overlay';
        document.body.appendChild(overlay);
        overlay.addEventListener('click', toggleMobileMenu);
    }
    
    overlay.classList.toggle('active');
}

elements.mobileToggle?.addEventListener('click', toggleMobileMenu);

elements.navItems.forEach(item => {
    item.addEventListener('click', (e) => {
        e.preventDefault();
        
        const page = item.getAttribute('data-page');
        
        // Atualizar navegação ativa
        elements.navItems.forEach(nav => nav.classList.remove('active'));
        item.classList.add('active');
        
        // Carregar página
        loadPage(page);
        
        // Fechar menu mobile
        if (window.innerWidth <= 768) {
            toggleMobileMenu();
        }
        
        // Scroll para o topo
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
});

// ========================================
// SISTEMA DE NOTIFICAÇÕES
// ========================================

function toggleNotifications() {
    elements.notificationsPanel.classList.toggle('active');
    elements.userMenu.classList.remove('active');
}

function toggleUserMenu() {
    elements.userMenu.classList.toggle('active');
    elements.notificationsPanel.classList.remove('active');
}

function updateNotificationCount() {
    const badge = document.querySelector('.notification-badge');
    const unreadCount = document.querySelectorAll('.notification-item.unread').length;
    
    if (unreadCount > 0) {
        badge.textContent = unreadCount;
        badge.style.display = 'block';
    } else {
        badge.style.display = 'none';
    }
}

elements.notificationBtn?.addEventListener('click', toggleNotifications);
elements.userBtn?.addEventListener('click', toggleUserMenu);

document.getElementById('markAllRead')?.addEventListener('click', () => {
    document.querySelectorAll('.notification-item.unread').forEach(item => {
        item.classList.remove('unread');
    });
    updateNotificationCount();
    showToast('Notificações', 'Todas marcadas como lidas', 'success');
});

document.querySelectorAll('.notification-close').forEach(btn => {
    btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const item = btn.closest('.notification-item');
        item.style.animation = 'fadeOut 0.3s ease-out';
        setTimeout(() => {
            item.remove();
            updateNotificationCount();
        }, 300);
    });
});

document.querySelectorAll('.notification-item').forEach(item => {
    item.addEventListener('click', () => {
        if (item.classList.contains('unread')) {
            item.classList.remove('unread');
            updateNotificationCount();
        }
    });
});

// Fechar painéis ao clicar fora
document.addEventListener('click', (e) => {
    if (!elements.notificationBtn?.contains(e.target) && 
        !elements.notificationsPanel?.contains(e.target)) {
        elements.notificationsPanel?.classList.remove('active');
    }
    if (!elements.userBtn?.contains(e.target) && 
        !elements.userMenu?.contains(e.target)) {
        elements.userMenu?.classList.remove('active');
    }
    if (!elements.langBtn?.contains(e.target) && 
        !elements.langMenu?.contains(e.target)) {
        elements.langMenu?.classList.remove('active');
    }
});

// ========================================
// SISTEMA DE TOAST
// ========================================

function showToast(title, message, type = 'success') {
    const toastIcon = elements.toast.querySelector('.toast-icon');
    const toastTitle = elements.toast.querySelector('.toast-title');
    const toastMessage = elements.toast.querySelector('.toast-message');
    
    toastTitle.textContent = title;
    toastMessage.textContent = message;
    
    toastIcon.classList.remove('error', 'warning', 'info');
    
    const icons = {
        success: 'check_circle',
        error: 'error',
        warning: 'warning',
        info: 'info'
    };
    
    if (type !== 'success') {
        toastIcon.classList.add(type);
    }
    
    toastIcon.querySelector('.material-symbols-outlined').textContent = icons[type];
    
    elements.toast.classList.add('active');
    
    setTimeout(() => {
        elements.toast.classList.remove('active');
    }, 3000);
}

elements.toast.querySelector('.toast-close')?.addEventListener('click', () => {
    elements.toast.classList.remove('active');
});

// ========================================
// CONTINUA NO PRÓXIMO BLOCO...
// ========================================

// ========================================
// PÁGINAS DO DASHBOARD
// ========================================

const pages = {
    inicio: {
        title: {
            'pt-BR': 'Painel de Controle',
            'en-US': 'Control Panel',
            'es-ES': 'Panel de Control'
        },
        render: () => `
            <section class="metrics-section">
                <h3>Métricas Principais</h3>
                <div class="metrics-grid">
                    <article class="metric-card clickable" data-metric="vendas">
                        <div class="metric-icon sales">
                            <span class="material-symbols-outlined">trending_up</span>
                        </div>
                        <div class="metric-content">
                            <p class="metric-label">Vendas Totais</p>
                            <h4 class="metric-value">R$ 45.890,00</h4>
                            <div class="metric-change positive">
                                <span class="material-symbols-outlined">arrow_upward</span>
                                <span>12,5% vs mês anterior</span>
                            </div>
                        </div>
                    </article>
                    <article class="metric-card clickable" data-metric="pedidos">
                        <div class="metric-icon orders">
                            <span class="material-symbols-outlined">receipt_long</span>
                        </div>
                        <div class="metric-content">
                            <p class="metric-label">Pedidos</p>
                            <h4 class="metric-value">1.248</h4>
                            <div class="metric-change positive">
                                <span class="material-symbols-outlined">arrow_upward</span>
                                <span>8,3% vs mês anterior</span>
                            </div>
                        </div>
                    </article>
                    <article class="metric-card clickable" data-metric="despesas">
                        <div class="metric-icon expenses">
                            <span class="material-symbols-outlined">payments</span>
                        </div>
                        <div class="metric-content">
                            <p class="metric-label">Despesas</p>
                            <h4 class="metric-value">R$ 18.320,00</h4>
                            <div class="metric-change negative">
                                <span class="material-symbols-outlined">arrow_downward</span>
                                <span>5,2% vs mês anterior</span>
                            </div>
                        </div>
                    </article>
                    <article class="metric-card clickable" data-metric="lucro">
                        <div class="metric-icon profit">
                            <span class="material-symbols-outlined">account_balance_wallet</span>
                        </div>
                        <div class="metric-content">
                            <p class="metric-label">Lucro Líquido</p>
                            <h4 class="metric-value">R$ 27.570,00</h4>
                            <div class="metric-change positive">
                                <span class="material-symbols-outlined">arrow_upward</span>
                                <span>18,9% vs mês anterior</span>
                            </div>
                        </div>
                    </article>
                </div>
            </section>

            <section class="analytics-section">
                <div class="analytics-grid">
                    <article class="chart-card">
                        <div class="card-header">
                            <h3>Vendas por Categoria</h3>
                            <div class="card-actions">
                                <button class="btn-icon-small" id="refreshChart1">
                                    <span class="material-symbols-outlined">refresh</span>
                                </button>
                                <button class="btn-icon-small" id="exportChart1">
                                    <span class="material-symbols-outlined">download</span>
                                </button>
                            </div>
                        </div>
                        <div class="chart-container">
                            <canvas id="salesChart"></canvas>
                        </div>
                    </article>

                    <article class="chart-card">
                        <div class="card-header">
                            <h3>Status de Pedidos</h3>
                            <div class="card-actions">
                                <button class="btn-icon-small" id="refreshChart2">
                                    <span class="material-symbols-outlined">refresh</span>
                                </button>
                                <button class="btn-icon-small" id="exportChart2">
                                    <span class="material-symbols-outlined">download</span>
                                </button>
                            </div>
                        </div>
                        <div class="chart-container">
                            <canvas id="ordersChart"></canvas>
                        </div>
                    </article>
                </div>
            </section>

            <section class="orders-section">
                <div class="section-header">
                    <h3>Pedidos Recentes</h3>
                    <div class="section-actions">
                        <div class="filter-group">
                            <select id="statusFilter" class="filter-select">
                                <option value="todos">Todos os Status</option>
                                <option value="entregue">Entregue</option>
                                <option value="transito">Em Trânsito</option>
                                <option value="processando">Processando</option>
                                <option value="cancelado">Cancelado</option>
                            </select>
                            <select id="dateFilter" class="filter-select">
                                <option value="todos">Todo o Período</option>
                                <option value="hoje">Hoje</option>
                                <option value="semana">Esta Semana</option>
                                <option value="mes">Este Mês</option>
                            </select>
                        </div>
                        <div class="export-buttons">
                            <button class="btn-secondary" id="exportPDF">
                                <span class="material-symbols-outlined">picture_as_pdf</span>
                                <span class="btn-text">PDF</span>
                            </button>
                            <button class="btn-secondary" id="exportExcel">
                                <span class="material-symbols-outlined">table_chart</span>
                                <span class="btn-text">Excel</span>
                            </button>
                        </div>
                        <button class="btn-primary" id="newOrderBtn">
                            <span class="material-symbols-outlined">add</span>
                            <span class="btn-text">Novo Pedido</span>
                        </button>
                    </div>
                </div>
                <div class="table-container">
                    <table class="orders-table">
                        <thead>
                            <tr>
                                <th>ID Pedido</th>
                                <th>Cliente</th>
                                <th>Produto</th>
                                <th>Data</th>
                                <th>Valor</th>
                                <th>Status</th>
                                <th>Ações</th>
                            </tr>
                        </thead>
                        <tbody>
                            ${generateOrderRows()}
                        </tbody>
                    </table>
                </div>
                <div class="table-pagination">
                    <button class="pagination-btn" id="prevPage">
                        <span class="material-symbols-outlined">chevron_left</span>
                    </button>
                    <div class="pagination-info">
                        Página <strong>1</strong> de <strong>5</strong>
                    </div>
                    <button class="pagination-btn" id="nextPage">
                        <span class="material-symbols-outlined">chevron_right</span>
                    </button>
                </div>
            </section>
        `
    },
    vendas: {
        title: {
            'pt-BR': 'Gestão de Vendas',
            'en-US': 'Sales Management',
            'es-ES': 'Gestión de Ventas'
        },
        render: () => `
            <section class="metrics-section">
                <h3>Desempenho de Vendas</h3>
                <div class="metrics-grid">
                    <article class="metric-card">
                        <div class="metric-icon sales">
                            <span class="material-symbols-outlined">show_chart</span>
                        </div>
                        <div class="metric-content">
                            <p class="metric-label">Vendas Hoje</p>
                            <h4 class="metric-value">R$ 12.450,00</h4>
                        </div>
                    </article>
                    <article class="metric-card">
                        <div class="metric-icon orders">
                            <span class="material-symbols-outlined">shopping_bag</span>
                        </div>
                        <div class="metric-content">
                            <p class="metric-label">Ticket Médio</p>
                            <h4 class="metric-value">R$ 487,50</h4>
                        </div>
                    </article>
                </div>
            </section>
            <div class="chart-card">
                <h3>Vendas Mensais</h3>
                <canvas id="monthlySalesChart"></canvas>
            </div>
        `
    },
    produtos: {
        title: {
            'pt-BR': 'Catálogo de Produtos',
            'en-US': 'Product Catalog',
            'es-ES': 'Catálogo de Productos'
        },
        render: () => `
            <section class="metrics-section">
                <h3>Produtos</h3>
                <div class="metrics-grid">
                    <article class="metric-card">
                        <div class="metric-icon info">
                            <span class="material-symbols-outlined">inventory</span>
                        </div>
                        <div class="metric-content">
                            <p class="metric-label">Total de Produtos</p>
                            <h4 class="metric-value">2.547</h4>
                        </div>
                    </article>
                    <article class="metric-card">
                        <div class="metric-icon warning">
                            <span class="material-symbols-outlined">warning</span>
                        </div>
                        <div class="metric-content">
                            <p class="metric-label">Estoque Baixo</p>
                            <h4 class="metric-value">47</h4>
                        </div>
                    </article>
                </div>
            </section>
        `
    },
    pedidos: {
        title: {
            'pt-BR': 'Gerenciar Pedidos',
            'en-US': 'Manage Orders',
            'es-ES': 'Gestionar Pedidos'
        },
        render: () => `
            <h3>Todos os Pedidos</h3>
            <p>Lista completa de pedidos com filtros avançados.</p>
        `
    },
    despesas: {
        title: {
            'pt-BR': 'Controle de Despesas',
            'en-US': 'Expense Control',
            'es-ES': 'Control de Gastos'
        },
        render: () => `
            <section class="metrics-section">
                <h3>Despesas do Mês</h3>
                <div class="metrics-grid">
                    <article class="metric-card">
                        <div class="metric-icon expenses">
                            <span class="material-symbols-outlined">receipt</span>
                        </div>
                        <div class="metric-content">
                            <p class="metric-label">Total de Despesas</p>
                            <h4 class="metric-value">R$ 18.320,00</h4>
                        </div>
                    </article>
                </div>
            </section>
        `
    },
    analises: {
        title: {
            'pt-BR': 'Análises e Relatórios',
            'en-US': 'Analytics & Reports',
            'es-ES': 'Análisis e Informes'
        },
        render: () => `
            <h3>Relatórios Analíticos</h3>
            <p>Análises detalhadas e relatórios personalizados.</p>
        `
    },
    clientes: {
        title: {
            'pt-BR': 'Base de Clientes',
            'en-US': 'Customer Base',
            'es-ES': 'Base de Clientes'
        },
        render: () => `
            <section class="metrics-section">
                <h3>Clientes</h3>
                <div class="metrics-grid">
                    <article class="metric-card">
                        <div class="metric-icon success">
                            <span class="material-symbols-outlined">group</span>
                        </div>
                        <div class="metric-content">
                            <p class="metric-label">Total de Clientes</p>
                            <h4 class="metric-value">8.942</h4>
                        </div>
                    </article>
                </div>
            </section>
        `
    },
    configuracoes: {
        title: {
            'pt-BR': 'Configurações do Sistema',
            'en-US': 'System Settings',
            'es-ES': 'Configuración del Sistema'
        },
        render: () => `
            <h3>Preferências e Configurações</h3>
            <p>Personalize sua experiência no dashboard.</p>
        `
    }
};

function generateOrderRows() {
    const orders = [
        {id: '12845', customer: 'João Martins', initials: 'JM', product: 'Notebook Dell XPS 15', date: '05/02/2026', value: 'R$ 7.899,00', status: 'success', statusText: 'Entregue'},
        {id: '12844', customer: 'Maria Silva', initials: 'MS', product: 'iPhone 15 Pro Max', date: '04/02/2026', value: 'R$ 9.299,00', status: 'warning', statusText: 'Em Trânsito'},
        {id: '12843', customer: 'Pedro Costa', initials: 'PC', product: 'Samsung Galaxy S24', date: '03/02/2026', value: 'R$ 5.499,00', status: 'info', statusText: 'Processando'},
        {id: '12842', customer: 'Ana Ferreira', initials: 'AF', product: 'MacBook Air M3', date: '02/02/2026', value: 'R$ 10.499,00', status: 'success', statusText: 'Entregue'},
        {id: '12841', customer: 'Ricardo Lima', initials: 'RL', product: 'PlayStation 5', date: '01/02/2026', value: 'R$ 4.299,00', status: 'danger', statusText: 'Cancelado'}
    ];
    
    return orders.map(order => `
        <tr>
            <td>#${order.id}</td>
            <td>
                <div class="customer-cell">
                    <div class="customer-avatar">${order.initials}</div>
                    <span>${order.customer}</span>
                </div>
            </td>
            <td>${order.product}</td>
            <td>${order.date}</td>
            <td>${order.value}</td>
            <td><span class="status-badge ${order.status}">${order.statusText}</span></td>
            <td>
                <div class="action-buttons">
                    <button class="btn-icon" aria-label="Visualizar">
                        <span class="material-symbols-outlined">visibility</span>
                    </button>
                    <button class="btn-icon" aria-label="Editar">
                        <span class="material-symbols-outlined">edit</span>
                    </button>
                </div>
            </td>
        </tr>
    `).join('');
}

function loadPage(pageName) {
    state.currentPage = pageName;
    
    // Usar páginas completas se disponível, senão usar páginas básicas
    const page = (typeof pagesComplete !== 'undefined' ? pagesComplete[pageName] : null) || pages[pageName];
    
    if (page) {
        // Atualizar título
        elements.pageTitle.textContent = page.title[state.currentLang] || page.title['pt-BR'];
        
        // Renderizar conteúdo
        elements.appContent.innerHTML = page.render();
        
        // Inicializar componentes específicos da página
        if (pageName === 'inicio') {
            initHomePage();
        } else if (pageName === 'vendas') {
            initSalesPage();
        } else if (pageName === 'analises') {
            initAnalyticsPage();
        } else if (pageName === 'configuracoes') {
            initSettingsPage();
        }
    }
}

// Continua...

// ========================================
// GRÁFICOS COM CHART.JS
// ========================================

function getChartColors() {
    const isDark = elements.body.classList.contains('dark-mode');
    return {
        grid: isDark ? '#30363d' : '#dee2e6',
        text: isDark ? '#e6edf3' : '#212529',
        primary: '#0d6efd',
        success: '#198754',
        warning: '#ffc107',
        danger: '#dc3545',
        info: '#0dcaf0'
    };
}

function initSalesChart() {
    const ctx = document.getElementById('salesChart');
    if (!ctx) return;
    
    const colors = getChartColors();
    
    if (state.charts.sales) {
        state.charts.sales.destroy();
    }
    
    state.charts.sales = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ['Eletrônicos', 'Roupas', 'Alimentos', 'Livros'],
            datasets: [{
                label: 'Vendas (R$)',
                data: [38950, 29840, 20650, 13780],
                backgroundColor: colors.primary,
                borderRadius: 8
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: { display: false },
                tooltip: {
                    callbacks: {
                        label: (context) => `R$ ${context.parsed.y.toLocaleString('pt-BR')}`
                    }
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    grid: { color: colors.grid },
                    ticks: {
                        color: colors.text,
                        callback: (value) => `R$ ${value/1000}k`
                    }
                },
                x: {
                    grid: { display: false },
                    ticks: { color: colors.text }
                }
            }
        }
    });
}

function initOrdersChart() {
    const ctx = document.getElementById('ordersChart');
    if (!ctx) return;
    
    const colors = getChartColors();
    
    if (state.charts.orders) {
        state.charts.orders.destroy();
    }
    
    state.charts.orders = new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: ['Entregues', 'Em Trânsito', 'Processando', 'Cancelados'],
            datasets: [{
                data: [750, 250, 125, 73],
                backgroundColor: [
                    colors.success,
                    colors.warning,
                    colors.info,
                    colors.danger
                ],
                borderWidth: 0
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: 'bottom',
                    labels: { color: colors.text }
                },
                tooltip: {
                    callbacks: {
                        label: (context) => `${context.label}: ${context.parsed} (${Math.round(context.parsed/12.48)}%)`
                    }
                }
            }
        }
    });
}

function initMonthlySalesChart() {
    const ctx = document.getElementById('monthlySalesChart');
    if (!ctx) return;
    
    const colors = getChartColors();
    
    // CORREÇÃO: Destruir gráfico anterior antes de criar novo
    if (state.charts.monthly) {
        state.charts.monthly.destroy();
        state.charts.monthly = null;
    }
    
    state.charts.monthly = new Chart(ctx, {
        type: 'line',
        data: {
            labels: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun'],
            datasets: [{
                label: 'Vendas Mensais',
                data: [32000, 38000, 35000, 42000, 45000, 45890],
                borderColor: colors.primary,
                backgroundColor: colors.primary + '20',
                fill: true,
                tension: 0.4
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: { labels: { color: colors.text } }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    grid: { color: colors.grid },
                    ticks: { 
                        color: colors.text,
                        callback: (value) => `R$ ${(value/1000).toFixed(0)}k`
                    }
                },
                x: {
                    grid: { display: false },
                    ticks: { color: colors.text }
                }
            }
        }
    });
}

function updateChartsTheme() {
    Object.values(state.charts).forEach(chart => {
        if (chart && chart.update) {
            chart.update();
        }
    });
}

function initHomePage() {
    setTimeout(() => {
        initSalesChart();
        initOrdersChart();
        
        // Event listeners dos botões
        document.getElementById('refreshChart1')?.addEventListener('click', () => {
            initSalesChart();
            showToast('Atualizado', 'Gráfico de vendas atualizado', 'success');
        });
        
        document.getElementById('refreshChart2')?.addEventListener('click', () => {
            initOrdersChart();
            showToast('Atualizado', 'Gráfico de status atualizado', 'success');
        });
        
        document.getElementById('exportChart1')?.addEventListener('click', exportSalesChartData);
        document.getElementById('exportChart2')?.addEventListener('click', exportOrdersChartData);
        
        document.getElementById('exportPDF')?.addEventListener('click', exportTableToPDF);
        document.getElementById('exportExcel')?.addEventListener('click', exportTableToExcel);
        
        document.getElementById('newOrderBtn')?.addEventListener('click', () => {
            elements.newOrderModal.classList.add('active');
        });
        
        // Cards clicáveis
        document.querySelectorAll('.metric-card.clickable').forEach(card => {
            card.addEventListener('click', () => {
                const metric = card.getAttribute('data-metric');
                showToast('Detalhes', `Visualizando ${metric}`, 'info');
            });
        });
        
        // Botões de ação da tabela
        document.querySelectorAll('.btn-icon').forEach(btn => {
            btn.addEventListener('click', () => {
                const action = btn.getAttribute('aria-label');
                showToast('Ação', action, 'info');
            });
        });
    }, 100);
}

function initSalesPage() {
    setTimeout(() => {
        initMonthlySalesChart();
    }, 100);
}

// ========================================
// EXPORTAÇÕES
// ========================================

function exportTableToPDF() {
    showToast('Exportando', 'Gerando PDF...', 'info');
    
    setTimeout(() => {
        const { jsPDF } = window.jspdf;
        const doc = new jsPDF();
        
        // Título
        doc.setFontSize(18);
        doc.text('Relatório de Pedidos', 14, 22);
        doc.setFontSize(10);
        doc.setTextColor(100);
        doc.text(`Gerado em: ${new Date().toLocaleDateString('pt-BR')} às ${new Date().toLocaleTimeString('pt-BR')}`, 14, 30);
        doc.text('Desenvolvido por Felipe Andrade © 2026', 14, 36);
        
        // Dados da tabela
        const tableData = [];
        const rows = document.querySelectorAll('.orders-table tbody tr');
        
        rows.forEach(row => {
            const rowData = [];
            const cells = row.querySelectorAll('td');
            
            for (let i = 0; i < cells.length - 1; i++) { // Ignora última coluna (ações)
                let text = cells[i].textContent.trim();
                // Limpar espaços extras
                text = text.replace(/\s+/g, ' ');
                rowData.push(text);
            }
            
            tableData.push(rowData);
        });
        
        // Criar tabela
        doc.autoTable({
            head: [['ID', 'Cliente', 'Produto', 'Data', 'Valor', 'Status']],
            body: tableData,
            startY: 42,
            theme: 'grid',
            styles: { 
                fontSize: 8,
                cellPadding: 3
            },
            headStyles: {
                fillColor: [13, 110, 253],
                textColor: 255,
                fontStyle: 'bold'
            }
        });
        
        // Rodapé
        const pageCount = doc.internal.getNumberOfPages();
        for (let i = 1; i <= pageCount; i++) {
            doc.setPage(i);
            doc.setFontSize(8);
            doc.setTextColor(150);
            doc.text(`Página ${i} de ${pageCount}`, 14, doc.internal.pageSize.height - 10);
            doc.text('Dashboard Administrativo - Felipe Andrade', doc.internal.pageSize.width - 14, doc.internal.pageSize.height - 10, { align: 'right' });
        }
        
        doc.save('pedidos.pdf');
        showToast('Sucesso!', 'PDF gerado com sucesso', 'success');
    }, 500);
}

function exportTableToExcel() {
    showToast('Exportando', 'Gerando Excel...', 'info');
    
    setTimeout(() => {
        const table = document.querySelector('.orders-table');
        const wb = XLSX.utils.table_to_book(table, { sheet: 'Pedidos' });
        
        // Adicionar informações extras
        const ws = wb.Sheets['Pedidos'];
        
        XLSX.writeFile(wb, 'pedidos.xlsx');
        showToast('Sucesso!', 'Excel gerado com sucesso', 'success');
    }, 500);
}

function exportSalesChartData() {
    showToast('Exportando', 'Exportando dados de vendas...', 'info');
    
    setTimeout(() => {
        const data = [
            ['Categoria', 'Vendas (R$)'],
            ['Eletrônicos', 38950],
            ['Roupas', 29840],
            ['Alimentos', 20650],
            ['Livros', 13780]
        ];
        
        const ws = XLSX.utils.aoa_to_sheet(data);
        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, 'Vendas por Categoria');
        
        XLSX.writeFile(wb, 'vendas-categoria.xlsx');
        showToast('Sucesso!', 'Dados exportados com sucesso', 'success');
    }, 500);
}

function exportOrdersChartData() {
    showToast('Exportando', 'Exportando dados de status...', 'info');
    
    setTimeout(() => {
        const data = [
            ['Status', 'Quantidade', 'Percentual'],
            ['Entregues', 750, '60%'],
            ['Em Trânsito', 250, '20%'],
            ['Processando', 125, '10%'],
            ['Cancelados', 73, '10%']
        ];
        
        const ws = XLSX.utils.aoa_to_sheet(data);
        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, 'Status de Pedidos');
        
        XLSX.writeFile(wb, 'status-pedidos.xlsx');
        showToast('Sucesso!', 'Dados exportados com sucesso', 'success');
    }, 500);
}

// ========================================
// MODAL DE NOVO PEDIDO
// ========================================

elements.newOrderForm?.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const data = {
        customer: document.getElementById('customerName').value,
        product: document.getElementById('productName').value,
        value: document.getElementById('orderValue').value,
        status: document.getElementById('orderStatus').value
    };
    
    elements.newOrderModal.classList.remove('active');
    elements.newOrderForm.reset();
    
    showToast('Sucesso!', 'Pedido criado com sucesso', 'success');
});

elements.cancelOrderBtn?.addEventListener('click', () => {
    elements.newOrderModal.classList.remove('active');
    elements.newOrderForm.reset();
});

document.querySelector('.modal-close')?.addEventListener('click', () => {
    elements.newOrderModal.classList.remove('active');
});

elements.newOrderModal?.addEventListener('click', (e) => {
    if (e.target === elements.newOrderModal) {
        elements.newOrderModal.classList.remove('active');
    }
});

// Tecla ESC
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        elements.newOrderModal?.classList.remove('active');
        elements.notificationsPanel?.classList.remove('active');
        elements.userMenu?.classList.remove('active');
    }
});

// ========================================
// INICIALIZAÇÃO
// ========================================

window.addEventListener('DOMContentLoaded', () => {
    // Verificar sessão
    if (!checkSession()) {
        elements.loginModal.classList.add('active');
    } else {
        loadPage('inicio');
    }
    
    // Aplicar tema
    if (state.themeMode === 'auto') {
        checkAutoTheme();
    } else {
        applyTheme(state.themeMode);
    }
    
    // Aplicar idioma
    if (typeof applyTranslations === 'function') {
        applyTranslations(state.currentLang);
    }
    
    // Atualizar contador de notificações
    updateNotificationCount();
    
    // Mensagem de boas-vindas após login
    setTimeout(() => {
        if (state.isAuthenticated) {
            showToast('Bem-vindo!', 'Dashboard carregado com sucesso', 'success');
        }
    }, 1000);
});

// Responsividade
window.addEventListener('resize', () => {
    if (window.innerWidth > 768) {
        elements.sidebar?.classList.remove('active');
        const overlay = document.querySelector('.overlay');
        if (overlay) {
            overlay.classList.remove('active');
        }
    }
});

// ========================================
// FIM DO SCRIPT
// ========================================

// ========================================
// INICIALIZAÇÃO DE PÁGINAS ADICIONAIS
// ========================================

function initAnalyticsPage() {
    setTimeout(() => {
        const ctx1 = document.getElementById('categoryAnalysisChart');
        const ctx2 = document.getElementById('trendAnalysisChart');
        
        if (ctx1) {
            const colors = getChartColors();
            new Chart(ctx1, {
                type: 'pie',
                data: {
                    labels: ['Eletrônicos', 'Roupas', 'Alimentos', 'Livros'],
                    datasets: [{
                        data: [45, 28, 17, 10],
                        backgroundColor: [colors.primary, colors.success, colors.warning, colors.info]
                    }]
                },
                options: {
                    responsive: true,
                    plugins: {
                        legend: {
                            position: 'bottom',
                            labels: { color: colors.text }
                        }
                    }
                }
            });
        }
        
        if (ctx2) {
            const colors = getChartColors();
            new Chart(ctx2, {
                type: 'line',
                data: {
                    labels: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun'],
                    datasets: [{
                        label: 'Vendas',
                        data: [32000, 38000, 35000, 42000, 45000, 45890],
                        borderColor: colors.success,
                        backgroundColor: colors.success + '20',
                        fill: true,
                        tension: 0.4
                    }]
                },
                options: {
                    responsive: true,
                    plugins: {
                        legend: {
                            labels: { color: colors.text }
                        }
                    },
                    scales: {
                        y: {
                            beginAtZero: true,
                            grid: { color: colors.grid },
                            ticks: { color: colors.text }
                        },
                        x: {
                            grid: { display: false },
                            ticks: { color: colors.text }
                        }
                    }
                }
            });
        }
    }, 100);
}

function initSettingsPage() {
    setTimeout(() => {
        // Carregar configurações salvas
        const themeSetting = document.getElementById('themeSetting');
        const languageSetting = document.getElementById('languageSetting');
        
        if (themeSetting) {
            themeSetting.value = state.themeMode;
        }
        
        if (languageSetting) {
            languageSetting.value = state.currentLang;
        }
        
        // Event listeners
        themeSetting?.addEventListener('change', (e) => {
            state.themeMode = e.target.value;
            localStorage.setItem('themeMode', e.target.value);
            if (e.target.value === 'auto') {
                checkAutoTheme();
            } else {
                applyTheme(e.target.value);
            }
        });
        
        languageSetting?.addEventListener('change', (e) => {
            changeLanguage(e.target.value);
        });
    }, 100);
}

