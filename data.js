// ========================================
// DADOS DE EXEMPLO (MOCK DATA)
// Dashboard Administrativo - Felipe Andrade
// ========================================

const mockData = {
    // Clientes
    customers: [
        { id: 1, name: 'João Martins', email: 'joao.m@email.com', phone: '(11) 98765-4321', city: 'São Paulo', totalPurchases: 15, totalSpent: 45890.00, status: 'active' },
        { id: 2, name: 'Maria Silva', email: 'maria.s@email.com', phone: '(21) 97654-3210', city: 'Rio de Janeiro', totalPurchases: 8, totalSpent: 28340.00, status: 'active' },
        { id: 3, name: 'Pedro Costa', email: 'pedro.c@email.com', phone: '(11) 96543-2109', city: 'São Paulo', totalPurchases: 12, totalSpent: 38750.00, status: 'active' },
        { id: 4, name: 'Ana Ferreira', email: 'ana.f@email.com', phone: '(47) 95432-1098', city: 'Florianópolis', totalPurchases: 20, totalSpent: 67890.00, status: 'vip' },
        { id: 5, name: 'Ricardo Lima', email: 'ricardo.l@email.com', phone: '(31) 94321-0987', city: 'Belo Horizonte', totalPurchases: 3, totalSpent: 12450.00, status: 'inactive' },
        { id: 6, name: 'Juliana Santos', email: 'juliana.s@email.com', phone: '(85) 93210-9876', city: 'Fortaleza', totalPurchases: 18, totalSpent: 52340.00, status: 'vip' },
        { id: 7, name: 'Carlos Oliveira', email: 'carlos.o@email.com', phone: '(41) 92109-8765', city: 'Curitiba', totalPurchases: 6, totalSpent: 19870.00, status: 'active' },
        { id: 8, name: 'Fernanda Alves', email: 'fernanda.a@email.com', phone: '(71) 91098-7654', city: 'Salvador', totalPurchases: 11, totalSpent: 34560.00, status: 'active' }
    ],
    
    // Produtos
    products: [
        { id: 1, name: 'Notebook Dell XPS 15', category: 'Eletrônicos', price: 7899.00, stock: 15, minStock: 5, sales: 87, status: 'active' },
        { id: 2, name: 'iPhone 15 Pro Max', category: 'Eletrônicos', price: 9299.00, stock: 8, minStock: 10, sales: 142, status: 'active' },
        { id: 3, name: 'Samsung Galaxy S24', category: 'Eletrônicos', price: 5499.00, stock: 23, minStock: 10, sales: 96, status: 'active' },
        { id: 4, name: 'MacBook Air M3', category: 'Eletrônicos', price: 10499.00, stock: 12, minStock: 5, sales: 64, status: 'active' },
        { id: 5, name: 'PlayStation 5', category: 'Eletrônicos', price: 4299.00, stock: 3, minStock: 8, sales: 201, status: 'low-stock' },
        { id: 6, name: 'Camisa Polo Ralph Lauren', category: 'Roupas', price: 389.00, stock: 45, minStock: 20, sales: 156, status: 'active' },
        { id: 7, name: 'Tênis Nike Air Max', category: 'Roupas', price: 899.00, stock: 28, minStock: 15, sales: 189, status: 'active' },
        { id: 8, name: 'Relógio Apple Watch', category: 'Eletrônicos', price: 3499.00, stock: 18, minStock: 10, sales: 78, status: 'active' },
        { id: 9, name: 'Fone Sony WH-1000XM5', category: 'Eletrônicos', price: 2199.00, stock: 31, minStock: 15, sales: 134, status: 'active' },
        { id: 10, name: 'Kindle Paperwhite', category: 'Livros', price: 549.00, stock: 67, minStock: 30, sales: 298, status: 'active' }
    ],
    
    // Pedidos
    orders: [
        { id: 12845, customer: 'João Martins', product: 'Notebook Dell XPS 15', date: '2026-02-05', value: 7899.00, status: 'delivered', paymentMethod: 'Cartão de Crédito' },
        { id: 12844, customer: 'Maria Silva', product: 'iPhone 15 Pro Max', date: '2026-02-04', value: 9299.00, status: 'shipping', paymentMethod: 'PIX' },
        { id: 12843, customer: 'Pedro Costa', product: 'Samsung Galaxy S24', date: '2026-02-03', value: 5499.00, status: 'processing', paymentMethod: 'Boleto' },
        { id: 12842, customer: 'Ana Ferreira', product: 'MacBook Air M3', date: '2026-02-02', value: 10499.00, status: 'delivered', paymentMethod: 'Cartão de Crédito' },
        { id: 12841, customer: 'Ricardo Lima', product: 'PlayStation 5', date: '2026-02-01', value: 4299.00, status: 'cancelled', paymentMethod: 'Cartão de Débito' },
        { id: 12840, customer: 'Juliana Santos', product: 'Apple Watch', date: '2026-01-31', value: 3499.00, status: 'delivered', paymentMethod: 'PIX' },
        { id: 12839, customer: 'Carlos Oliveira', product: 'Fone Sony WH-1000XM5', date: '2026-01-30', value: 2199.00, status: 'shipping', paymentMethod: 'Cartão de Crédito' },
        { id: 12838, customer: 'Fernanda Alves', product: 'Kindle Paperwhite', date: '2026-01-29', value: 549.00, status: 'delivered', paymentMethod: 'PIX' }
    ],
    
    // Despesas
    expenses: [
        { id: 1, description: 'Aluguel do Escritório', category: 'Infraestrutura', date: '2026-02-01', value: 5500.00, status: 'paid' },
        { id: 2, description: 'Salários Funcionários', category: 'Pessoal', date: '2026-02-05', value: 28000.00, status: 'paid' },
        { id: 3, description: 'Energia Elétrica', category: 'Utilidades', date: '2026-02-03', value: 1250.00, status: 'paid' },
        { id: 4, description: 'Internet e Telefonia', category: 'Comunicação', date: '2026-02-02', value: 890.00, status: 'paid' },
        { id: 5, description: 'Material de Escritório', category: 'Suprimentos', date: '2026-02-04', value: 670.00, status: 'paid' },
        { id: 6, description: 'Marketing Digital', category: 'Marketing', date: '2026-02-06', value: 3500.00, status: 'pending' },
        { id: 7, description: 'Manutenção Equipamentos', category: 'Infraestrutura', date: '2026-01-28', value: 1890.00, status: 'paid' },
        { id: 8, description: 'Contador', category: 'Serviços', date: '2026-02-01', value: 2200.00, status: 'paid' }
    ],
    
    // Status traduzidos
    statusLabels: {
        // Pedidos
        'delivered': { 'pt-BR': 'Entregue', 'en-US': 'Delivered', 'es-ES': 'Entregado', class: 'success' },
        'shipping': { 'pt-BR': 'Em Trânsito', 'en-US': 'Shipping', 'es-ES': 'En Tránsito', class: 'warning' },
        'processing': { 'pt-BR': 'Processando', 'en-US': 'Processing', 'es-ES': 'Procesando', class: 'info' },
        'cancelled': { 'pt-BR': 'Cancelado', 'en-US': 'Cancelled', 'es-ES': 'Cancelado', class: 'danger' },
        
        // Clientes
        'active': { 'pt-BR': 'Ativo', 'en-US': 'Active', 'es-ES': 'Activo', class: 'success' },
        'inactive': { 'pt-BR': 'Inativo', 'en-US': 'Inactive', 'es-ES': 'Inactivo', class: 'danger' },
        'vip': { 'pt-BR': 'VIP', 'en-US': 'VIP', 'es-ES': 'VIP', class: 'warning' },
        
        // Produtos
        'low-stock': { 'pt-BR': 'Estoque Baixo', 'en-US': 'Low Stock', 'es-ES': 'Stock Bajo', class: 'danger' },
        
        // Despesas
        'paid': { 'pt-BR': 'Pago', 'en-US': 'Paid', 'es-ES': 'Pagado', class: 'success' },
        'pending': { 'pt-BR': 'Pendente', 'en-US': 'Pending', 'es-ES': 'Pendiente', class: 'warning' }
    }
};

// Função para obter label traduzido de status
function getStatusLabel(status, lang = 'pt-BR') {
    return mockData.statusLabels[status]?.[lang] || status;
}

// Função para obter classe CSS do status
function getStatusClass(status) {
    return mockData.statusLabels[status]?.class || 'info';
}

// Função para formatar moeda
function formatCurrency(value) {
    return new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL'
    }).format(value);
}

// Função para formatar data
function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString('pt-BR');
}

// Função para obter iniciais do nome
function getInitials(name) {
    return name.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase();
}
