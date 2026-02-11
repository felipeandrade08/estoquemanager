// ========================================
// PÁGINAS COMPLETAS DO DASHBOARD
// Felipe Andrade © 2026
// ========================================

// Substituir o objeto pages existente
const pagesComplete = {
    inicio: {
        title: { 'pt-BR': 'Painel de Controle', 'en-US': 'Control Panel', 'es-ES': 'Panel de Control' },
        render: () => `
            <section class="metrics-section">
                <h3>Métricas Principais</h3>
                <div class="metrics-grid">
                    ${renderMetricCards()}
                </div>
            </section>
            <section class="analytics-section">
                <div class="analytics-grid">
                    ${renderCharts()}
                </div>
            </section>
            <section class="orders-section">
                ${renderOrdersTable()}
            </section>
        `
    },
    
    clientes: {
        title: { 'pt-BR': 'Gestão de Clientes', 'en-US': 'Customer Management', 'es-ES': 'Gestión de Clientes' },
        render: () => `
            <section class="page-section">
                <div class="metrics-grid" style="margin-bottom: 2rem;">
                    <article class="metric-card">
                        <div class="metric-icon success">
                            <span class="material-symbols-outlined">group</span>
                        </div>
                        <div class="metric-content">
                            <p class="metric-label">Total de Clientes</p>
                            <h4 class="metric-value">${mockData.customers.length}</h4>
                        </div>
                    </article>
                    <article class="metric-card">
                        <div class="metric-icon warning">
                            <span class="material-symbols-outlined">star</span>
                        </div>
                        <div class="metric-content">
                            <p class="metric-label">Clientes VIP</p>
                            <h4 class="metric-value">${mockData.customers.filter(c => c.status === 'vip').length}</h4>
                        </div>
                    </article>
                </div>
                <div class="section-header">
                    <h3>Lista de Clientes</h3>
                    <button class="btn-primary" onclick="openAddCustomerModal()">
                        <span class="material-symbols-outlined">person_add</span>
                        <span>Adicionar Cliente</span>
                    </button>
                </div>
                <div class="table-container">
                    <table class="orders-table">
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Cliente</th>
                                <th>Email</th>
                                <th>Telefone</th>
                                <th>Cidade</th>
                                <th>Total Compras</th>
                                <th>Valor Gasto</th>
                                <th>Status</th>
                                <th>Ações</th>
                            </tr>
                        </thead>
                        <tbody>
                            ${mockData.customers.map(customer => `
                                <tr data-id="${customer.id}">
                                    <td>#${customer.id}</td>
                                    <td>
                                        <div class="customer-cell">
                                            <div class="customer-avatar">${getInitials(customer.name)}</div>
                                            <span>${customer.name}</span>
                                        </div>
                                    </td>
                                    <td>${customer.email}</td>
                                    <td>${customer.phone}</td>
                                    <td>${customer.city}</td>
                                    <td>${customer.totalPurchases}</td>
                                    <td>${formatCurrency(customer.totalSpent)}</td>
                                    <td><span class="status-badge ${getStatusClass(customer.status)}">${getStatusLabel(customer.status)}</span></td>
                                    <td>
                                        <div class="action-buttons">
                                            <button class="btn-icon" onclick="viewCustomer(${customer.id})" title="Visualizar">
                                                <span class="material-symbols-outlined">visibility</span>
                                            </button>
                                            <button class="btn-icon" onclick="editCustomer(${customer.id})" title="Editar">
                                                <span class="material-symbols-outlined">edit</span>
                                            </button>
                                            <button class="btn-icon" onclick="deleteCustomer(${customer.id})" title="Excluir">
                                                <span class="material-symbols-outlined">delete</span>
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            `).join('')}
                        </tbody>
                    </table>
                </div>
            </section>
        `
    },
    
produtos: {
        title: { 'pt-BR': 'Gestão de Produtos', 'en-US': 'Product Management', 'es-ES': 'Gestión de Productos' },
        render: () => `
            <section class="page-section">
                <div class="metrics-grid" style="margin-bottom: 2rem;">
                    <article class="metric-card">
                        <div class="metric-icon info">
                            <span class="material-symbols-outlined">inventory</span>
                        </div>
                        <div class="metric-content">
                            <p class="metric-label">Total de Produtos</p>
                            <h4 class="metric-value">${mockData.products.length}</h4>
                        </div>
                    </article>
                    <article class="metric-card">
                        <div class="metric-icon danger">
                            <span class="material-symbols-outlined">warning</span>
                        </div>
                        <div class="metric-content">
                            <p class="metric-label">Estoque Baixo</p>
                            <h4 class="metric-value">${mockData.products.filter(p => p.stock < p.minStock).length}</h4>
                        </div>
                    </article>
                </div>
                <div class="section-header">
                    <h3>Catálogo de Produtos</h3>
                    <button class="btn-primary" onclick="openAddProductModal()">
                        <span class="material-symbols-outlined">add_box</span>
                        <span>Adicionar Produto</span>
                    </button>
                </div>
                <div class="table-container">
                    <table class="orders-table">
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Produto</th>
                                <th>Categoria</th>
                                <th>Preço</th>
                                <th>Estoque</th>
                                <th>Vendas</th>
                                <th>Status</th>
                                <th>Ações</th>
                            </tr>
                        </thead>
                        <tbody>
                            ${mockData.products.map(product => `
                                <tr data-id="${product.id}">
                                    <td>#${product.id}</td>
                                    <td>${product.name}</td>
                                    <td>${product.category}</td>
                                    <td>${formatCurrency(product.price)}</td>
                                    <td>
                                        <span class="${product.stock < product.minStock ? 'text-danger' : ''}"}>
                                            ${product.stock} un.
                                        </span>
                                    </td>
                                    <td>${product.sales}</td>
                                    <td><span class="status-badge ${getStatusClass(product.status)}">${getStatusLabel(product.status)}</span></td>
                                    <td>
                                        <div class="action-buttons">
                                            <button class="btn-icon" onclick="viewProduct(${product.id})" title="Visualizar">
                                                <span class="material-symbols-outlined">visibility</span>
                                            </button>
                                            <button class="btn-icon" onclick="editProduct(${product.id})" title="Editar">
                                                <span class="material-symbols-outlined">edit</span>
                                            </button>
                                            <button class="btn-icon" onclick="deleteProduct(${product.id})" title="Excluir">
                                                <span class="material-symbols-outlined">delete</span>
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            `).join('')}
                        </tbody>
                    </table>
                </div>
            </section>
        `
    },
    
    pedidos: {
        title: { 'pt-BR': 'Gestão de Pedidos', 'en-US': 'Order Management', 'es-ES': 'Gestión de Pedidos' },
        render: () => `
            <section class="page-section">
                <div class="section-header">
                    <h3>Todos os Pedidos</h3>
                    <button class="btn-primary" onclick="openAddOrderModal()">
                        <span class="material-symbols-outlined">add</span>
                        <span>Novo Pedido</span>
                    </button>
                </div>
                <div class="table-container">
                    <table class="orders-table">
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Cliente</th>
                                <th>Produto</th>
                                <th>Data</th>
                                <th>Valor</th>
                                <th>Pagamento</th>
                                <th>Status</th>
                                <th>Ações</th>
                            </tr>
                        </thead>
                        <tbody>
                            ${mockData.orders.map(order => `
                                <tr data-id="${order.id}">
                                    <td>#${order.id}</td>
                                    <td>${order.customer}</td>
                                    <td>${order.product}</td>
                                    <td>${formatDate(order.date)}</td>
                                    <td>${formatCurrency(order.value)}</td>
                                    <td>${order.paymentMethod}</td>
                                    <td><span class="status-badge ${getStatusClass(order.status)}">${getStatusLabel(order.status)}</span></td>
                                    <td>
                                        <div class="action-buttons">
                                            <button class="btn-icon" onclick="viewOrder(${order.id})" title="Visualizar">
                                                <span class="material-symbols-outlined">visibility</span>
                                            </button>
                                            <button class="btn-icon" onclick="editOrder(${order.id})" title="Editar">
                                                <span class="material-symbols-outlined">edit</span>
                                            </button>
                                            <button class="btn-icon" onclick="changeOrderStatus(${order.id})" title="Alterar Status">
                                                <span class="material-symbols-outlined">sync_alt</span>
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            `).join('')}
                        </tbody>
                    </table>
                </div>
            </section>
        `
    },
    
    despesas: {
        title: { 'pt-BR': 'Controle de Despesas', 'en-US': 'Expense Control', 'es-ES': 'Control de Gastos' },
        render: () => `
            <section class="page-section">
                <div class="section-header">
                    <h3>Registro de Despesas</h3>
                    <button class="btn-primary" onclick="openAddExpenseModal()">
                        <span class="material-symbols-outlined">add_card</span>
                        <span>Adicionar Despesa</span>
                    </button>
                </div>
                
                <div class="metrics-grid" style="margin-bottom: 2rem;">
                    <article class="metric-card">
                        <div class="metric-icon expenses">
                            <span class="material-symbols-outlined">payments</span>
                        </div>
                        <div class="metric-content">
                            <p class="metric-label">Total de Despesas</p>
                            <h4 class="metric-value">${formatCurrency(mockData.expenses.reduce((sum, e) => sum + e.value, 0))}</h4>
                        </div>
                    </article>
                    <article class="metric-card">
                        <div class="metric-icon warning">
                            <span class="material-symbols-outlined">pending_actions</span>
                        </div>
                        <div class="metric-content">
                            <p class="metric-label">Total Pendente</p>
                            <h4 class="metric-value">${formatCurrency(mockData.expenses.filter(e => e.status === 'pending').reduce((sum, e) => sum + e.value, 0))}</h4>
                        </div>
                    </article>
                </div>

                <div class="table-container">
                    <table class="orders-table">
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Descrição</th>
                                <th>Categoria</th>
                                <th>Data</th>
                                <th>Valor</th>
                                <th>Status</th>
                                <th>Ações</th>
                            </tr>
                        </thead>
                        <tbody>
                            ${mockData.expenses.map(expense => `
                                <tr data-id="${expense.id}">
                                    <td>#${expense.id}</td>
                                    <td>${expense.description}</td>
                                    <td>${expense.category}</td>
                                    <td>${formatDate(expense.date)}</td>
                                    <td>${formatCurrency(expense.value)}</td>
                                    <td><span class="status-badge ${getStatusClass(expense.status)}">${getStatusLabel(expense.status)}</span></td>
                                    <td>
                                        <div class="action-buttons">
                                            <button class="btn-icon" onclick="viewExpense(${expense.id})" title="Visualizar">
                                                <span class="material-symbols-outlined">visibility</span>
                                            </button>
                                            <button class="btn-icon" onclick="editExpense(${expense.id})" title="Editar">
                                                <span class="material-symbols-outlined">edit</span>
                                            </button>
                                            <button class="btn-icon" onclick="deleteExpense(${expense.id})" title="Excluir">
                                                <span class="material-symbols-outlined">delete</span>
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            `).join('')}
                        </tbody>
                    </table>
                </div>
            </section>
        `
    },
    
    analises: {
        title: { 'pt-BR': 'Análises e Relatórios', 'en-US': 'Analytics & Reports', 'es-ES': 'Análisis e Informes' },
        render: () => `
            <section class="page-section">
                <h3>Relatórios Analíticos</h3>
                <div class="analytics-grid" style="margin-top: 2rem;">
                    <div class="chart-card">
                        <h4>Vendas por Categoria</h4>
                        <canvas id="categoryAnalysisChart"></canvas>
                    </div>
                    <div class="chart-card">
                        <h4>Tendência Mensal</h4>
                        <canvas id="trendAnalysisChart"></canvas>
                    </div>
                </div>
            </section>
        `
    },
    
    vendas: {
        title: { 'pt-BR': 'Gestão de Vendas', 'en-US': 'Sales Management', 'es-ES': 'Gestión de Ventas' },
        render: () => {
            const totalSales = mockData.orders.reduce((sum, order) => sum + order.value, 0);
            const avgTicket = mockData.orders.length > 0 ? totalSales / mockData.orders.length : 0;
            
            return `
                <section class="metrics-section">
                    <h3>Desempenho de Vendas</h3>
                    <div class="metrics-grid">
                        <article class="metric-card">
                            <div class="metric-icon sales">
                                <span class="material-symbols-outlined">show_chart</span>
                            </div>
                            <div class="metric-content">
                                <p class="metric-label">Vendas Totais</p>
                                <h4 class="metric-value">${formatCurrency(totalSales)}</h4>
                            </div>
                        </article>
                        <article class="metric-card">
                            <div class="metric-icon orders">
                                <span class="material-symbols-outlined">shopping_bag</span>
                            </div>
                            <div class="metric-content">
                                <p class="metric-label">Ticket Médio</p>
                                <h4 class="metric-value">${formatCurrency(avgTicket)}</h4>
                            </div>
                        </article>
                    </div>
                </section>
                <div class="chart-card">
                    <h3>Vendas Mensais</h3>
                    <div class="chart-container" style="height: 400px;">
                        <canvas id="monthlySalesChart"></canvas>
                    </div>
                </div>
            `;
        }
    },
    
    configuracoes: {
        title: { 'pt-BR': 'Configurações', 'en-US': 'Settings', 'es-ES': 'Configuración' },
        render: () => `
            <section class="page-section">
                <h3>Configurações do Sistema</h3>
                
                <div class="settings-container">
                    <div class="settings-section">
                        <h4>Aparência</h4>
                        <div class="setting-item">
                            <label>Tema</label>
                            <select id="themeSetting" class="filter-select">
                                <option value="auto">Automático (18h-6h)</option>
                                <option value="light">Claro</option>
                                <option value="dark">Escuro</option>
                            </select>
                        </div>
                        <div class="setting-item">
                            <label>Idioma</label>
                            <select id="languageSetting" class="filter-select">
                                <option value="pt-BR">Português (Brasil)</option>
                                <option value="en-US">English (US)</option>
                                <option value="es-ES">Español</option>
                            </select>
                        </div>
                    </div>
                    
                    <div class="settings-section">
                        <h4>Notificações</h4>
                        <div class="setting-item">
                            <label class="checkbox-label">
                                <input type="checkbox" id="emailNotifications" checked>
                                <span>Receber notificações por email</span>
                            </label>
                        </div>
                        <div class="setting-item">
                            <label class="checkbox-label">
                                <input type="checkbox" id="pushNotifications" checked>
                                <span>Notificações push no navegador</span>
                            </label>
                        </div>
                        <div class="setting-item">
                            <label class="checkbox-label">
                                <input type="checkbox" id="soundNotifications">
                                <span>Sons de notificação</span>
                            </label>
                        </div>
                    </div>
                    
                    <div class="settings-section">
                        <h4>Perfil</h4>
                        <div class="form-group">
                            <label>Nome Completo</label>
                            <input type="text" id="profileName" value="${state.userData?.name || 'Felipe Andrade'}" class="filter-select">
                        </div>
                        <div class="form-group">
                            <label>Email</label>
                            <input type="email" id="profileEmail" value="${state.userData?.email || 'felipe.andrade@email.com'}" class="filter-select">
                        </div>
                        <div class="form-group">
                            <label>Cargo</label>
                            <input type="text" id="profileRole" value="${state.userData?.role || 'Desenvolvedor'}" class="filter-select">
                        </div>
                    </div>
                    
                    <div class="settings-section">
                        <h4>Segurança</h4>
                        <button class="btn-secondary" onclick="changePassword()">
                            <span class="material-symbols-outlined">lock</span>
                            Alterar Senha
                        </button>
                        <button class="btn-secondary" onclick="enable2FA()" style="margin-top: 0.5rem;">
                            <span class="material-symbols-outlined">security</span>
                            Ativar Autenticação em 2 Fatores
                        </button>
                    </div>
                    
                    <div class="form-actions" style="margin-top: 2rem;">
                        <button class="btn-secondary" onclick="resetSettings()">Restaurar Padrões</button>
                        <button class="btn-primary" onclick="saveSettings()">
                            <span class="material-symbols-outlined">save</span>
                            Salvar Configurações
                        </button>
                    </div>
                </div>
            </section>
        `
    }
};

// Funções auxiliares de renderização
function renderMetricCards() {
    const totalSales = mockData.orders.reduce((sum, order) => sum + order.value, 0);
    const totalOrders = mockData.orders.length;
    const totalExpenses = mockData.expenses.reduce((sum, exp) => sum + exp.value, 0);
    const netProfit = totalSales - totalExpenses;

    return `
        <article class="metric-card clickable" data-metric="vendas">
            <div class="metric-icon sales">
                <span class="material-symbols-outlined">trending_up</span>
            </div>
            <div class="metric-content">
                <p class="metric-label">Vendas Totais</p>
                <h4 class="metric-value">${formatCurrency(totalSales)}</h4>
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
                <h4 class="metric-value">${totalOrders}</h4>
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
                <h4 class="metric-value">${formatCurrency(totalExpenses)}</h4>
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
                <h4 class="metric-value">${formatCurrency(netProfit)}</h4>
                <div class="metric-change positive">
                    <span class="material-symbols-outlined">arrow_upward</span>
                    <span>18,9% vs mês anterior</span>
                </div>
            </div>
        </article>
    `;
}

function renderCharts() {
    return `
        <article class="chart-card">
            <div class="card-header">
                <h3>Vendas por Categoria</h3>
            </div>
            <div class="chart-container">
                <canvas id="salesChart"></canvas>
            </div>
        </article>

        <article class="chart-card">
            <div class="card-header">
                <h3>Status de Pedidos</h3>
            </div>
            <div class="chart-container">
                <canvas id="ordersChart"></canvas>
            </div>
        </article>
    `;
}

function renderOrdersTable() {
    return `
        <div class="section-header">
            <h3>Pedidos Recentes</h3>
            <button class="btn-primary" onclick="loadPage('pedidos')">Ver Todos</button>
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
                    </tr>
                </thead>
                <tbody>
                    ${mockData.orders.slice(0, 5).map(order => `
                        <tr>
                            <td>#${order.id}</td>
                            <td>
                                <div class="customer-cell">
                                    <div class="customer-avatar">${getInitials(order.customer)}</div>
                                    <span>${order.customer}</span>
                                </div>
                            </td>
                            <td>${order.product}</td>
                            <td>${formatDate(order.date)}</td>
                            <td>${formatCurrency(order.value)}</td>
                            <td><span class="status-badge ${getStatusClass(order.status)}">${getStatusLabel(order.status)}</span></td>
                        </tr>
                    `).join('')}
                </tbody>
            </table>
        </div>
    `;
}
