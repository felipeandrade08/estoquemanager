// ========================================
// FUNÇÕES CRUD - Felipe Andrade © 2026
// ========================================

// ========== CLIENTES ==========

function viewCustomer(id) {
    const customer = mockData.customers.find(c => c.id === id);
    if (!customer) return;
    
    const content = `
        <div class="detail-view">
            <h4>Detalhes do Cliente</h4>
            <div class="detail-grid">
                <div class="detail-item">
                    <strong>Nome:</strong> ${customer.name}
                </div>
                <div class="detail-item">
                    <strong>Email:</strong> ${customer.email}
                </div>
                <div class="detail-item">
                    <strong>Telefone:</strong> ${customer.phone}
                </div>
                <div class="detail-item">
                    <strong>Cidade:</strong> ${customer.city}
                </div>
                <div class="detail-item">
                    <strong>Total de Compras:</strong> ${customer.totalPurchases}
                </div>
                <div class="detail-item">
                    <strong>Valor Gasto:</strong> ${formatCurrency(customer.totalSpent)}
                </div>
                <div class="detail-item">
                    <strong>Status:</strong> <span class="status-badge ${getStatusClass(customer.status)}">${getStatusLabel(customer.status)}</span>
                </div>
            </div>
        </div>
    `;
    
    showDetailModal('Cliente #' + id, content);
}

function editCustomer(id) {
    const customer = mockData.customers.find(c => c.id === id);
    if (!customer) return;
    
    const content = `
        <form id="editCustomerForm" onsubmit="saveCustomer(${id}); return false;">
            <div class="form-group">
                <label>Nome Completo</label>
                <input type="text" id="editCustomerName" value="${customer.name}" required>
            </div>
            <div class="form-group">
                <label>Email</label>
                <input type="email" id="editCustomerEmail" value="${customer.email}" required>
            </div>
            <div class="form-group">
                <label>Telefone</label>
                <input type="tel" id="editCustomerPhone" value="${customer.phone}" required>
            </div>
            <div class="form-group">
                <label>Cidade</label>
                <input type="text" id="editCustomerCity" value="${customer.city}" required>
            </div>
            <div class="form-group">
                <label>Status</label>
                <select id="editCustomerStatus" required>
                    <option value="active" ${customer.status === 'active' ? 'selected' : ''}>Ativo</option>
                    <option value="inactive" ${customer.status === 'inactive' ? 'selected' : ''}>Inativo</option>
                    <option value="vip" ${customer.status === 'vip' ? 'selected' : ''}>VIP</option>
                </select>
            </div>
            <div class="form-actions">
                <button type="button" class="btn-secondary" onclick="closeModal()">Cancelar</button>
                <button type="submit" class="btn-primary">Salvar Alterações</button>
            </div>
        </form>
    `;
    
    showDetailModal('Editar Cliente', content);
}

function saveCustomer(id) {
    const customer = mockData.customers.find(c => c.id === id);
    if (!customer) return;
    
    customer.name = document.getElementById('editCustomerName').value;
    customer.email = document.getElementById('editCustomerEmail').value;
    customer.phone = document.getElementById('editCustomerPhone').value;
    customer.city = document.getElementById('editCustomerCity').value;
    customer.status = document.getElementById('editCustomerStatus').value;
    
    closeModal();
    showToast('Sucesso', 'Cliente atualizado com sucesso!', 'success');
    loadPage('clientes');
}

function deleteCustomer(id) {
    if (confirm('Tem certeza que deseja excluir este cliente?')) {
        const index = mockData.customers.findIndex(c => c.id === id);
        if (index > -1) {
            mockData.customers.splice(index, 1);
            showToast('Sucesso', 'Cliente excluído com sucesso!', 'success');
            loadPage('clientes');
        }
    }
}

function openAddCustomerModal() {
    const content = `
        <form id="addCustomerForm" onsubmit="addCustomer(); return false;">
            <div class="form-group">
                <label>Nome Completo</label>
                <input type="text" id="newCustomerName" required>
            </div>
            <div class="form-group">
                <label>Email</label>
                <input type="email" id="newCustomerEmail" required>
            </div>
            <div class="form-group">
                <label>Telefone</label>
                <input type="tel" id="newCustomerPhone" required>
            </div>
            <div class="form-group">
                <label>Cidade</label>
                <input type="text" id="newCustomerCity" required>
            </div>
            <div class="form-actions">
                <button type="button" class="btn-secondary" onclick="closeModal()">Cancelar</button>
                <button type="submit" class="btn-primary">Adicionar Cliente</button>
            </div>
        </form>
    `;
    
    showDetailModal('Novo Cliente', content);
}

function addCustomer() {
    const newId = Math.max(...mockData.customers.map(c => c.id)) + 1;
    const newCustomer = {
        id: newId,
        name: document.getElementById('newCustomerName').value,
        email: document.getElementById('newCustomerEmail').value,
        phone: document.getElementById('newCustomerPhone').value,
        city: document.getElementById('newCustomerCity').value,
        totalPurchases: 0,
        totalSpent: 0,
        status: 'active'
    };
    
    mockData.customers.push(newCustomer);
    closeModal();
    showToast('Sucesso', 'Cliente adicionado com sucesso!', 'success');
    loadPage('clientes');
}

// ========== PRODUTOS ==========

function viewProduct(id) {
    const product = mockData.products.find(p => p.id === id);
    if (!product) return;
    
    const content = `
        <div class="detail-view">
            <h4>Detalhes do Produto</h4>
            <div class="detail-grid">
                <div class="detail-item"><strong>Nome:</strong> ${product.name}</div>
                <div class="detail-item"><strong>Categoria:</strong> ${product.category}</div>
                <div class="detail-item"><strong>Preço:</strong> ${formatCurrency(product.price)}</div>
                <div class="detail-item"><strong>Estoque:</strong> ${product.stock} unidades</div>
                <div class="detail-item"><strong>Estoque Mínimo:</strong> ${product.minStock} unidades</div>
                <div class="detail-item"><strong>Total Vendido:</strong> ${product.sales} unidades</div>
                <div class="detail-item"><strong>Status:</strong> <span class="status-badge ${getStatusClass(product.status)}">${getStatusLabel(product.status)}</span></div>
            </div>
        </div>
    `;
    
    showDetailModal('Produto #' + id, content);
}

function editProduct(id) {
    const product = mockData.products.find(p => p.id === id);
    if (!product) return;
    
    const content = `
        <form id="editProductForm" onsubmit="saveProduct(${id}); return false;">
            <div class="form-group">
                <label>Nome do Produto</label>
                <input type="text" id="editProductName" value="${product.name}" required>
            </div>
            <div class="form-group">
                <label>Categoria</label>
                <select id="editProductCategory" required>
                    <option value="Eletrônicos" ${product.category === 'Eletrônicos' ? 'selected' : ''}>Eletrônicos</option>
                    <option value="Roupas" ${product.category === 'Roupas' ? 'selected' : ''}>Roupas</option>
                    <option value="Livros" ${product.category === 'Livros' ? 'selected' : ''}>Livros</option>
                    <option value="Alimentos" ${product.category === 'Alimentos' ? 'selected' : ''}>Alimentos</option>
                </select>
            </div>
            <div class="form-row">
                <div class="form-group">
                    <label>Preço</label>
                    <input type="number" step="0.01" id="editProductPrice" value="${product.price}" required>
                </div>
                <div class="form-group">
                    <label>Estoque</label>
                    <input type="number" id="editProductStock" value="${product.stock}" required>
                </div>
            </div>
            <div class="form-actions">
                <button type="button" class="btn-secondary" onclick="closeModal()">Cancelar</button>
                <button type="submit" class="btn-primary">Salvar Alterações</button>
            </div>
        </form>
    `;
    
    showDetailModal('Editar Produto', content);
}

function saveProduct(id) {
    const product = mockData.products.find(p => p.id === id);
    if (!product) return;
    
    product.name = document.getElementById('editProductName').value;
    product.category = document.getElementById('editProductCategory').value;
    product.price = parseFloat(document.getElementById('editProductPrice').value);
    product.stock = parseInt(document.getElementById('editProductStock').value);
    product.status = product.stock < product.minStock ? 'low-stock' : 'active';
    
    closeModal();
    showToast('Sucesso', 'Produto atualizado com sucesso!', 'success');
    loadPage('produtos');
}

function deleteProduct(id) {
    if (confirm('Tem certeza que deseja excluir este produto?')) {
        const index = mockData.products.findIndex(p => p.id === id);
        if (index > -1) {
            mockData.products.splice(index, 1);
            showToast('Sucesso', 'Produto excluído com sucesso!', 'success');
            loadPage('produtos');
        }
    }
}

function openAddProductModal() {
    const content = `
        <form id="addProductForm" onsubmit="addProduct(); return false;">
            <div class="form-group">
                <label>Nome do Produto</label>
                <input type="text" id="newProductName" required>
            </div>
            <div class="form-group">
                <label>Categoria</label>
                <select id="newProductCategory" required>
                    <option value="Eletrônicos">Eletrônicos</option>
                    <option value="Roupas">Roupas</option>
                    <option value="Livros">Livros</option>
                    <option value="Alimentos">Alimentos</option>
                </select>
            </div>
            <div class="form-row">
                <div class="form-group">
                    <label>Preço</label>
                    <input type="number" step="0.01" id="newProductPrice" required>
                </div>
                <div class="form-group">
                    <label>Estoque Inicial</label>
                    <input type="number" id="newProductStock" required>
                </div>
            </div>
            <div class="form-actions">
                <button type="button" class="btn-secondary" onclick="closeModal()">Cancelar</button>
                <button type="submit" class="btn-primary">Adicionar Produto</button>
            </div>
        </form>
    `;
    
    showDetailModal('Novo Produto', content);
}

function addProduct() {
    const newId = Math.max(...mockData.products.map(p => p.id)) + 1;
    const newProduct = {
        id: newId,
        name: document.getElementById('newProductName').value,
        category: document.getElementById('newProductCategory').value,
        price: parseFloat(document.getElementById('newProductPrice').value),
        stock: parseInt(document.getElementById('newProductStock').value),
        minStock: 10,
        sales: 0,
        status: 'active'
    };
    
    mockData.products.push(newProduct);
    closeModal();
    showToast('Sucesso', 'Produto adicionado com sucesso!', 'success');
    loadPage('produtos');
}

// ========== PEDIDOS ==========

function viewOrder(id) {
    const order = mockData.orders.find(o => o.id === id);
    if (!order) return;
    
    const content = `
        <div class="detail-view">
            <h4>Detalhes do Pedido</h4>
            <div class="detail-grid">
                <div class="detail-item"><strong>ID:</strong> #${order.id}</div>
                <div class="detail-item"><strong>Cliente:</strong> ${order.customer}</div>
                <div class="detail-item"><strong>Produto:</strong> ${order.product}</div>
                <div class="detail-item"><strong>Data:</strong> ${formatDate(order.date)}</div>
                <div class="detail-item"><strong>Valor:</strong> ${formatCurrency(order.value)}</div>
                <div class="detail-item"><strong>Pagamento:</strong> ${order.paymentMethod}</div>
                <div class="detail-item"><strong>Status:</strong> <span class="status-badge ${getStatusClass(order.status)}">${getStatusLabel(order.status)}</span></div>
            </div>
        </div>
    `;
    
    showDetailModal('Pedido #' + id, content);
}

function editOrder(id) {
    const order = mockData.orders.find(o => o.id === id);
    if (!order) return;
    
    const content = `
        <form id="editOrderForm" onsubmit="saveOrder(${id}); return false;">
            <div class="form-group">
                <label>Cliente</label>
                <input type="text" id="editOrderCustomer" value="${order.customer}" required>
            </div>
            <div class="form-group">
                <label>Produto</label>
                <input type="text" id="editOrderProduct" value="${order.product}" required>
            </div>
            <div class="form-group">
                <label>Valor</label>
                <input type="number" step="0.01" id="editOrderValue" value="${order.value}" required>
            </div>
            <div class="form-group">
                <label>Forma de Pagamento</label>
                <select id="editOrderPayment" required>
                    <option value="Cartão de Crédito" ${order.paymentMethod === 'Cartão de Crédito' ? 'selected' : ''}>Cartão de Crédito</option>
                    <option value="Cartão de Débito" ${order.paymentMethod === 'Cartão de Débito' ? 'selected' : ''}>Cartão de Débito</option>
                    <option value="PIX" ${order.paymentMethod === 'PIX' ? 'selected' : ''}>PIX</option>
                    <option value="Boleto" ${order.paymentMethod === 'Boleto' ? 'selected' : ''}>Boleto</option>
                </select>
            </div>
            <div class="form-group">
                <label>Status</label>
                <select id="editOrderStatus" required>
                    <option value="processing" ${order.status === 'processing' ? 'selected' : ''}>Processando</option>
                    <option value="shipping" ${order.status === 'shipping' ? 'selected' : ''}>Em Trânsito</option>
                    <option value="delivered" ${order.status === 'delivered' ? 'selected' : ''}>Entregue</option>
                    <option value="cancelled" ${order.status === 'cancelled' ? 'selected' : ''}>Cancelado</option>
                </select>
            </div>
            <div class="form-actions">
                <button type="button" class="btn-secondary" onclick="closeModal()">Cancelar</button>
                <button type="submit" class="btn-primary">Salvar Alterações</button>
            </div>
        </form>
    `;
    
    showDetailModal('Editar Pedido', content);
}

function saveOrder(id) {
    const order = mockData.orders.find(o => o.id === id);
    if (!order) return;
    
    order.customer = document.getElementById('editOrderCustomer').value;
    order.product = document.getElementById('editOrderProduct').value;
    order.value = parseFloat(document.getElementById('editOrderValue').value);
    order.paymentMethod = document.getElementById('editOrderPayment').value;
    order.status = document.getElementById('editOrderStatus').value;
    
    closeModal();
    showToast('Sucesso', 'Pedido atualizado com sucesso!', 'success');
    loadPage('pedidos');
}

function changeOrderStatus(id) {
    const order = mockData.orders.find(o => o.id === id);
    if (!order) return;
    
    const statuses = [
        { value: 'processing', label: 'Processando' },
        { value: 'shipping', label: 'Em Trânsito' },
        { value: 'delivered', label: 'Entregue' },
        { value: 'cancelled', label: 'Cancelado' }
    ];
    
    const content = `
        <form id="changeStatusForm" onsubmit="updateOrderStatus(${id}); return false;">
            <div class="form-group">
                <label>Novo Status</label>
                <select id="newOrderStatus" required>
                    ${statuses.map(s => `<option value="${s.value}" ${order.status === s.value ? 'selected' : ''}>${s.label}</option>`).join('')}
                </select>
            </div>
            <div class="form-actions">
                <button type="button" class="btn-secondary" onclick="closeModal()">Cancelar</button>
                <button type="submit" class="btn-primary">Alterar Status</button>
            </div>
        </form>
    `;
    
    showDetailModal('Alterar Status do Pedido', content);
}

function updateOrderStatus(id) {
    const order = mockData.orders.find(o => o.id === id);
    if (!order) return;
    
    order.status = document.getElementById('newOrderStatus').value;
    
    closeModal();
    showToast('Sucesso', 'Status atualizado com sucesso!', 'success');
    loadPage('pedidos');
}

function openAddOrderModal() {
    elements.newOrderModal.classList.add('active');
}

// ========== DESPESAS ==========

function viewExpense(id) {
    const expense = mockData.expenses.find(e => e.id === id);
    if (!expense) return;
    
    const content = `
        <div class="detail-view">
            <h4>Detalhes da Despesa</h4>
            <div class="detail-grid">
                <div class="detail-item"><strong>Descrição:</strong> ${expense.description}</div>
                <div class="detail-item"><strong>Categoria:</strong> ${expense.category}</div>
                <div class="detail-item"><strong>Data:</strong> ${formatDate(expense.date)}</div>
                <div class="detail-item"><strong>Valor:</strong> ${formatCurrency(expense.value)}</div>
                <div class="detail-item"><strong>Status:</strong> <span class="status-badge ${getStatusClass(expense.status)}">${getStatusLabel(expense.status)}</span></div>
            </div>
        </div>
    `;
    
    showDetailModal('Despesa #' + id, content);
}

function editExpense(id) {
    const expense = mockData.expenses.find(e => e.id === id);
    if (!expense) return;
    
    const content = `
        <form id="editExpenseForm" onsubmit="saveExpense(${id}); return false;">
            <div class="form-group">
                <label>Descrição</label>
                <input type="text" id="editExpenseDesc" value="${expense.description}" required>
            </div>
            <div class="form-group">
                <label>Categoria</label>
                <select id="editExpenseCategory" required>
                    <option value="Infraestrutura" ${expense.category === 'Infraestrutura' ? 'selected' : ''}>Infraestrutura</option>
                    <option value="Pessoal" ${expense.category === 'Pessoal' ? 'selected' : ''}>Pessoal</option>
                    <option value="Marketing" ${expense.category === 'Marketing' ? 'selected' : ''}>Marketing</option>
                    <option value="Utilidades" ${expense.category === 'Utilidades' ? 'selected' : ''}>Utilidades</option>
                    <option value="Serviços" ${expense.category === 'Serviços' ? 'selected' : ''}>Serviços</option>
                </select>
            </div>
            <div class="form-row">
                <div class="form-group">
                    <label>Valor</label>
                    <input type="number" step="0.01" id="editExpenseValue" value="${expense.value}" required>
                </div>
                <div class="form-group">
                    <label>Status</label>
                    <select id="editExpenseStatus" required>
                        <option value="paid" ${expense.status === 'paid' ? 'selected' : ''}>Pago</option>
                        <option value="pending" ${expense.status === 'pending' ? 'selected' : ''}>Pendente</option>
                    </select>
                </div>
            </div>
            <div class="form-actions">
                <button type="button" class="btn-secondary" onclick="closeModal()">Cancelar</button>
                <button type="submit" class="btn-primary">Salvar Alterações</button>
            </div>
        </form>
    `;
    
    showDetailModal('Editar Despesa', content);
}

function saveExpense(id) {
    const expense = mockData.expenses.find(e => e.id === id);
    if (!expense) return;
    
    expense.description = document.getElementById('editExpenseDesc').value;
    expense.category = document.getElementById('editExpenseCategory').value;
    expense.value = parseFloat(document.getElementById('editExpenseValue').value);
    expense.status = document.getElementById('editExpenseStatus').value;
    
    closeModal();
    showToast('Sucesso', 'Despesa atualizada com sucesso!', 'success');
    loadPage('despesas');
}

function deleteExpense(id) {
    if (confirm('Tem certeza que deseja excluir esta despesa?')) {
        const index = mockData.expenses.findIndex(e => e.id === id);
        if (index > -1) {
            mockData.expenses.splice(index, 1);
            showToast('Sucesso', 'Despesa excluída com sucesso!', 'success');
            loadPage('despesas');
        }
    }
}

function openAddExpenseModal() {
    const content = `
        <form id="addExpenseForm" onsubmit="addExpense(); return false;">
            <div class="form-group">
                <label>Descrição</label>
                <input type="text" id="newExpenseDesc" required>
            </div>
            <div class="form-group">
                <label>Categoria</label>
                <select id="newExpenseCategory" required>
                    <option value="Infraestrutura">Infraestrutura</option>
                    <option value="Pessoal">Pessoal</option>
                    <option value="Marketing">Marketing</option>
                    <option value="Utilidades">Utilidades</option>
                    <option value="Serviços">Serviços</option>
                </select>
            </div>
            <div class="form-group">
                <label>Valor</label>
                <input type="number" step="0.01" id="newExpenseValue" required>
            </div>
            <div class="form-actions">
                <button type="button" class="btn-secondary" onclick="closeModal()">Cancelar</button>
                <button type="submit" class="btn-primary">Adicionar Despesa</button>
            </div>
        </form>
    `;
    
    showDetailModal('Nova Despesa', content);
}

function addExpense() {
    const newId = Math.max(...mockData.expenses.map(e => e.id)) + 1;
    const newExpense = {
        id: newId,
        description: document.getElementById('newExpenseDesc').value,
        category: document.getElementById('newExpenseCategory').value,
        date: new Date().toISOString().split('T')[0],
        value: parseFloat(document.getElementById('newExpenseValue').value),
        status: 'pending'
    };
    
    mockData.expenses.push(newExpense);
    closeModal();
    showToast('Sucesso', 'Despesa adicionada com sucesso!', 'success');
    loadPage('despesas');
}

// ========== CONFIGURAÇÕES ==========

function saveSettings() {
    const theme = document.getElementById('themeSetting').value;
    const language = document.getElementById('languageSetting').value;
    const name = document.getElementById('profileName').value;
    const email = document.getElementById('profileEmail').value;
    const role = document.getElementById('profileRole').value;
    
    // Aplicar tema
    state.themeMode = theme;
    localStorage.setItem('themeMode', theme);
    if (theme === 'auto') {
        checkAutoTheme();
    } else {
        applyTheme(theme);
    }
    
    // Aplicar idioma
    if (language !== state.currentLang) {
        changeLanguage(language);
    }
    
    // Atualizar perfil
    if (state.userData) {
        state.userData.name = name;
        state.userData.role = role;
        updateUserInfo(state.userData);
        const storage = localStorage.getItem('userSession') ? localStorage : sessionStorage;
        storage.setItem('userSession', JSON.stringify(state.userData));
    }
    
    showToast('Sucesso', 'Configurações salvas com sucesso!', 'success');
}

function resetSettings() {
    if (confirm('Deseja restaurar todas as configurações para os valores padrão?')) {
        document.getElementById('themeSetting').value = 'auto';
        document.getElementById('languageSetting').value = 'pt-BR';
        document.getElementById('emailNotifications').checked = true;
        document.getElementById('pushNotifications').checked = true;
        document.getElementById('soundNotifications').checked = false;
        
        showToast('Sucesso', 'Configurações restauradas!', 'success');
    }
}

function changePassword() {
    showToast('Funcionalidade', 'Alteração de senha em desenvolvimento', 'info');
}

function enable2FA() {
    showToast('Funcionalidade', 'Autenticação 2FA em desenvolvimento', 'info');
}

// ========== MODAL GENÉRICO ==========

let currentModal = null;

function showDetailModal(title, content) {
    // Criar modal se não existir
    if (!currentModal) {
        currentModal = document.createElement('div');
        currentModal.className = 'modal';
        currentModal.innerHTML = `
            <div class="modal-content">
                <div class="modal-header">
                    <h3 id="modalTitle"></h3>
                    <button class="modal-close" onclick="closeModal()">
                        <span class="material-symbols-outlined">close</span>
                    </button>
                </div>
                <div class="modal-body" id="modalBody"></div>
            </div>
        `;
        document.body.appendChild(currentModal);
        
        // Fechar ao clicar fora
        currentModal.addEventListener('click', (e) => {
            if (e.target === currentModal) {
                closeModal();
            }
        });
    }
    
    document.getElementById('modalTitle').textContent = title;
    document.getElementById('modalBody').innerHTML = content;
    currentModal.classList.add('active');
}

function closeModal() {
    if (currentModal) {
        currentModal.classList.remove('active');
    }
}
