/* ==================== SAMPLE DATA ==================== */

// Sample Users Data
const usersData = [
    {
        id: 1,
        name: 'John Doe',
        email: 'john@example.com',
        role: 'Admin',
        status: 'active',
        joinDate: '2025-01-15'
    },
    {
        id: 2,
        name: 'Jane Smith',
        email: 'jane@example.com',
        role: 'Manager',
        status: 'active',
        joinDate: '2025-02-20'
    },
    {
        id: 3,
        name: 'Mike Johnson',
        email: 'mike@example.com',
        role: 'Editor',
        status: 'active',
        joinDate: '2025-03-10'
    },
    {
        id: 4,
        name: 'Sarah Williams',
        email: 'sarah@example.com',
        role: 'Viewer',
        status: 'inactive',
        joinDate: '2025-04-05'
    },
    {
        id: 5,
        name: 'Tom Brown',
        email: 'tom@example.com',
        role: 'Admin',
        status: 'active',
        joinDate: '2025-04-22'
    },
    {
        id: 6,
        name: 'Emily Davis',
        email: 'emily@example.com',
        role: 'Manager',
        status: 'active',
        joinDate: '2025-05-01'
    },
    {
        id: 7,
        name: 'Chris Wilson',
        email: 'chris@example.com',
        role: 'Editor',
        status: 'active',
        joinDate: '2025-05-05'
    },
    {
        id: 8,
        name: 'Lisa Anderson',
        email: 'lisa@example.com',
        role: 'Viewer',
        status: 'active',
        joinDate: '2025-05-10'
    }
];

// Sample Products Data
const productsData = [
    {
        id: 101,
        name: 'Laptop Pro',
        category: 'Electronics',
        price: 1299.99,
        stock: 45,
        status: 'In Stock'
    },
    {
        id: 102,
        name: 'Wireless Mouse',
        category: 'Accessories',
        price: 29.99,
        stock: 150,
        status: 'In Stock'
    },
    {
        id: 103,
        name: 'USB-C Cable',
        category: 'Accessories',
        price: 12.99,
        stock: 0,
        status: 'Out of Stock'
    },
    {
        id: 104,
        name: 'Monitor 4K',
        category: 'Electronics',
        price: 499.99,
        stock: 23,
        status: 'In Stock'
    },
    {
        id: 105,
        name: 'Keyboard Mechanical',
        category: 'Accessories',
        price: 129.99,
        stock: 67,
        status: 'In Stock'
    },
    {
        id: 106,
        name: 'Headphones Pro',
        category: 'Electronics',
        price: 299.99,
        stock: 34,
        status: 'In Stock'
    },
    {
        id: 107,
        name: 'Phone Stand',
        category: 'Accessories',
        price: 19.99,
        stock: 200,
        status: 'In Stock'
    },
    {
        id: 108,
        name: 'Portable Speaker',
        category: 'Electronics',
        price: 99.99,
        stock: 12,
        status: 'Low Stock'
    }
];

// Sample Orders Data
const ordersData = [
    {
        id: 'ORD-001',
        customer: 'John Doe',
        amount: 1299.99,
        status: 'Completed',
        date: '2026-05-05'
    },
    {
        id: 'ORD-002',
        customer: 'Jane Smith',
        amount: 529.98,
        status: 'Pending',
        date: '2026-05-08'
    },
    {
        id: 'ORD-003',
        customer: 'Mike Johnson',
        amount: 399.99,
        status: 'Shipped',
        date: '2026-05-09'
    },
    {
        id: 'ORD-004',
        customer: 'Sarah Williams',
        amount: 149.97,
        status: 'Completed',
        date: '2026-05-10'
    },
    {
        id: 'ORD-005',
        customer: 'Tom Brown',
        amount: 1799.98,
        status: 'Processing',
        date: '2026-05-10'
    },
    {
        id: 'ORD-006',
        customer: 'Emily Davis',
        amount: 299.99,
        status: 'Completed',
        date: '2026-05-09'
    },
    {
        id: 'ORD-007',
        customer: 'Chris Wilson',
        amount: 859.98,
        status: 'Cancelled',
        date: '2026-05-08'
    },
    {
        id: 'ORD-008',
        customer: 'Lisa Anderson',
        amount: 449.99,
        status: 'Pending',
        date: '2026-05-11'
    }
];

// Utility Functions

/**
 * Format currency
 */
function formatCurrency(amount) {
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD'
    }).format(amount);
}

/**
 * Format date
 */
function formatDate(dateString) {
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options);
}

/**
 * Get status badge
 */
function getStatusBadge(status) {
    const statusMap = {
        'active': 'badge-success',
        'inactive': 'badge-danger',
        'completed': 'badge-success',
        'pending': 'badge-warning',
        'shipped': 'badge-info',
        'processing': 'badge-primary',
        'cancelled': 'badge-danger',
        'in stock': 'badge-success',
        'low stock': 'badge-warning',
        'out of stock': 'badge-danger'
    };
    
    const badgeClass = statusMap[status.toLowerCase()] || 'badge-secondary';
    return `<span class="badge ${badgeClass}">${status}</span>`;
}

/**
 * Get role icon
 */
function getRoleIcon(role) {
    const roleMap = {
        'Admin': '<i class="bi bi-shield-fill" style="color: #6366f1;"></i>',
        'Manager': '<i class="bi bi-briefcase-fill" style="color: #8b5cf6;"></i>',
        'Editor': '<i class="bi bi-pencil-fill" style="color: #f59e0b;"></i>',
        'Viewer': '<i class="bi bi-eye-fill" style="color: #3b82f6;"></i>'
    };
    return roleMap[role] || '<i class="bi bi-person-fill"></i>';
}

/**
 * Chart data for sales
 */
const salesChartData = {
    labels: ['January', 'February', 'March', 'April', 'May', 'June'],
    datasets: [{
        label: 'Sales',
        data: [12000, 19000, 3000, 5000, 2000, 3000],
        borderColor: '#6366f1',
        backgroundColor: 'rgba(99, 102, 241, 0.1)',
        tension: 0.4,
        fill: true,
        pointBackgroundColor: '#6366f1',
        pointBorderColor: '#fff',
        pointBorderWidth: 2,
        pointRadius: 5,
        pointHoverRadius: 7
    }]
};

/**
 * Chart data for users
 */
const userChartData = {
    labels: ['Active', 'Inactive', 'Pending'],
    datasets: [{
        data: [65, 20, 15],
        backgroundColor: [
            'rgba(16, 185, 129, 0.8)',
            'rgba(239, 68, 68, 0.8)',
            'rgba(245, 158, 11, 0.8)'
        ],
        borderColor: [
            '#10b981',
            '#ef4444',
            '#f59e0b'
        ],
        borderWidth: 2
    }]
};
