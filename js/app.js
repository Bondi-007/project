/* ==================== JQUERY APP.JS ==================== */

$(document).ready(function() {
    // Initialize dashboard
    initDashboard();
    initSidebar();
    initDataTables();
    initEventListeners();
    initCharts();
});

// ==================== DASHBOARD INITIALIZATION ====================

function initDashboard() {
    // Show dashboard page by default
    showPage('dashboard');
}

// ==================== SIDEBAR FUNCTIONALITY ====================

function initSidebar() {
    // Sidebar toggle for mobile
    $('.sidebar-toggle').on('click', function() {
        $('.sidebar').toggleClass('open');
    });

    $('.sidebar-close').on('click', function() {
        $('.sidebar').removeClass('open');
    });

    // Menu link click handler
    $('.menu-link[data-page]').on('click', function(e) {
        e.preventDefault();
        const page = $(this).data('page');
        showPage(page);

        // Close sidebar on mobile
        if ($(window).width() < 768) {
            $('.sidebar').removeClass('open');
        }

        // Set active menu item
        $('.menu-link[data-page]').removeClass('active');
        $(this).addClass('active');
    });

    // Handle collapse/expand for submenu
    $('[data-toggle="collapse"]').on('click', function(e) {
        e.preventDefault();
        const target = $(this).data('target');
        $(target).collapse('toggle');
    });
}

// ==================== PAGE NAVIGATION ====================

function showPage(pageName) {
    // Hide all sections
    $('.page-section').removeClass('active');
    
    // Show selected page
    $('#' + pageName).addClass('active');

    // Handle generic pages
    if (!$('#' + pageName).length) {
        $('#generic-page').addClass('active');
        updateGenericPage(pageName);
    }

    // Reinitialize DataTables if they exist on page
    setTimeout(function() {
        $.fn.dataTable.tables({visible: true, api: true}).columns.adjust();
    }, 100);
}

function updateGenericPage(pageName) {
    const pageInfo = {
        'user-roles': {
            title: 'User Roles',
            desc: 'Manage user roles and permissions'
        },
        'user-groups': {
            title: 'User Groups',
            desc: 'Create and manage user groups'
        },
        'categories': {
            title: 'Categories',
            desc: 'Manage product categories'
        },
        'pending-orders': {
            title: 'Pending Orders',
            desc: 'View and process pending orders'
        },
        'completed-orders': {
            title: 'Completed Orders',
            desc: 'View completed orders'
        },
        'statistics': {
            title: 'Statistics',
            desc: 'View detailed statistics and metrics'
        },
        'account': {
            title: 'Account Settings',
            desc: 'Manage your account settings'
        },
        'security': {
            title: 'Security Settings',
            desc: 'Configure security options'
        },
        'preferences': {
            title: 'Preferences',
            desc: 'Customize your preferences'
        },
        'bulk-update': {
            title: 'Bulk Update',
            desc: 'Update multiple items at once'
        },
        'batch-delete': {
            title: 'Batch Delete',
            desc: 'Delete multiple items in batch'
        },
        'export-import': {
            title: 'Import/Export',
            desc: 'Import and export data'
        }
    };

    const info = pageInfo[pageName] || {
        title: 'Page Title',
        desc: 'Page description'
    };

    $('#genericTitle').text(info.title);
    $('#genericDesc').text(info.desc);
}

// ==================== DATATABLES INITIALIZATION ====================

function initDataTables() {
    // Dashboard Users Table
    if ($('#usersTable').length) {
        initUsersTable('#usersTable', usersData.slice(0, 5));
    }

    // All Users Table
    if ($('#allUsersTable').length) {
        initUsersTable('#allUsersTable', usersData);
    }

    // Products Table
    if ($('#productsTable').length) {
        initProductsTable('#productsTable', productsData);
    }

    // Orders Table
    if ($('#ordersTable').length) {
        initOrdersTable('#ordersTable', ordersData);
    }
}

function initUsersTable(tableId, data) {
    $(tableId).DataTable({
        data: data,
        columns: [
            { data: 'id' },
            { data: 'name' },
            { data: 'email' },
            { 
                data: 'role',
                render: function(data) {
                    return getRoleIcon(data) + ' ' + data;
                }
            },
            { 
                data: 'status',
                render: function(data) {
                    return getStatusBadge(data);
                }
            },
            { 
                data: 'joinDate',
                render: function(data) {
                    return formatDate(data);
                }
            },
            { 
                data: null,
                render: function(data) {
                    return `
                        <button class="btn btn-sm btn-info" onclick="editUser(${data.id})">
                            <i class="bi bi-pencil-fill"></i>
                        </button>
                        <button class="btn btn-sm btn-danger" onclick="deleteUser(${data.id})">
                            <i class="bi bi-trash3-fill"></i>
                        </button>
                    `;
                }
            }
        ],
        pageLength: 10,
        lengthChange: true,
        searching: true,
        ordering: true,
        info: true,
        paging: true,
        responsive: true,
        dom: 'lftip',
        language: {
            lengthMenu: "Show _MENU_ entries",
            search: "Search users...",
            paginate: {
                first: "First",
                last: "Last",
                next: "Next",
                previous: "Previous"
            }
        }
    });
}

function initProductsTable(tableId, data) {
    $(tableId).DataTable({
        data: data,
        columns: [
            { data: 'id' },
            { data: 'name' },
            { data: 'category' },
            { 
                data: 'price',
                render: function(data) {
                    return formatCurrency(data);
                }
            },
            { data: 'stock' },
            { 
                data: 'status',
                render: function(data) {
                    return getStatusBadge(data);
                }
            },
            { 
                data: null,
                render: function(data) {
                    return `
                        <button class="btn btn-sm btn-info" onclick="editProduct(${data.id})">
                            <i class="bi bi-pencil-fill"></i>
                        </button>
                        <button class="btn btn-sm btn-danger" onclick="deleteProduct(${data.id})">
                            <i class="bi bi-trash3-fill"></i>
                        </button>
                    `;
                }
            }
        ],
        pageLength: 10,
        responsive: true,
        dom: 'lftip',
        language: {
            lengthMenu: "Show _MENU_ entries",
            search: "Search products..."
        }
    });
}

function initOrdersTable(tableId, data) {
    $(tableId).DataTable({
        data: data,
        columns: [
            { data: 'id' },
            { data: 'customer' },
            { 
                data: 'amount',
                render: function(data) {
                    return formatCurrency(data);
                }
            },
            { 
                data: 'status',
                render: function(data) {
                    return getStatusBadge(data);
                }
            },
            { 
                data: 'date',
                render: function(data) {
                    return formatDate(data);
                }
            },
            { 
                data: null,
                render: function(data) {
                    return `
                        <button class="btn btn-sm btn-info" onclick="viewOrder('${data.id}')">
                            <i class="bi bi-eye-fill"></i>
                        </button>
                        <button class="btn btn-sm btn-danger" onclick="deleteOrder('${data.id}')">
                            <i class="bi bi-trash3-fill"></i>
                        </button>
                    `;
                }
            }
        ],
        pageLength: 10,
        responsive: true,
        dom: 'lftip',
        language: {
            lengthMenu: "Show _MENU_ entries",
            search: "Search orders..."
        }
    });
}

// ==================== EVENT LISTENERS ====================

function initEventListeners() {
    // This is where you can add additional event listeners
}

// ==================== USER CRUD OPERATIONS ====================

function addNewUser() {
    Swal.fire({
        title: 'Add New User',
        html: `
            <div class="mb-3 text-start">
                <label class="form-label">Full Name</label>
                <input type="text" id="userName" class="form-control" placeholder="Enter full name">
            </div>
            <div class="mb-3 text-start">
                <label class="form-label">Email</label>
                <input type="email" id="userEmail" class="form-control" placeholder="Enter email">
            </div>
            <div class="mb-3 text-start">
                <label class="form-label">Role</label>
                <select id="userRole" class="form-select">
                    <option value="">Select Role</option>
                    <option value="Admin">Admin</option>
                    <option value="Manager">Manager</option>
                    <option value="Editor">Editor</option>
                    <option value="Viewer">Viewer</option>
                </select>
            </div>
        `,
        icon: 'info',
        confirmButtonText: 'Add User',
        confirmButtonColor: '#6366f1',
        cancelButtonText: 'Cancel',
        showCancelButton: true,
        preConfirm: () => {
            const name = $('#userName').val();
            const email = $('#userEmail').val();
            const role = $('#userRole').val();

            if (!name || !email || !role) {
                Swal.showValidationMessage('Please fill all fields');
                return false;
            }

            return { name, email, role };
        }
    }).then((result) => {
        if (result.isConfirmed) {
            Swal.fire({
                icon: 'success',
                title: 'User Added!',
                text: `${result.value.name} has been added successfully.`,
                confirmButtonColor: '#6366f1'
            });
        }
    });
}

function editUser(userId) {
    const user = usersData.find(u => u.id === userId);
    if (!user) return;

    Swal.fire({
        title: 'Edit User',
        html: `
            <div class="mb-3 text-start">
                <label class="form-label">Full Name</label>
                <input type="text" id="editUserName" class="form-control" value="${user.name}">
            </div>
            <div class="mb-3 text-start">
                <label class="form-label">Email</label>
                <input type="email" id="editUserEmail" class="form-control" value="${user.email}">
            </div>
            <div class="mb-3 text-start">
                <label class="form-label">Role</label>
                <select id="editUserRole" class="form-select">
                    <option value="Admin" ${user.role === 'Admin' ? 'selected' : ''}>Admin</option>
                    <option value="Manager" ${user.role === 'Manager' ? 'selected' : ''}>Manager</option>
                    <option value="Editor" ${user.role === 'Editor' ? 'selected' : ''}>Editor</option>
                    <option value="Viewer" ${user.role === 'Viewer' ? 'selected' : ''}>Viewer</option>
                </select>
            </div>
        `,
        icon: 'info',
        confirmButtonText: 'Update',
        confirmButtonColor: '#6366f1',
        cancelButtonText: 'Cancel',
        showCancelButton: true,
        preConfirm: () => {
            const name = $('#editUserName').val();
            const email = $('#editUserEmail').val();
            const role = $('#editUserRole').val();

            if (!name || !email || !role) {
                Swal.showValidationMessage('Please fill all fields');
                return false;
            }

            return { name, email, role };
        }
    }).then((result) => {
        if (result.isConfirmed) {
            Swal.fire({
                icon: 'success',
                title: 'Updated!',
                text: 'User has been updated successfully.',
                confirmButtonColor: '#6366f1'
            });
        }
    });
}

function deleteUser(userId) {
    Swal.fire({
        title: 'Delete User?',
        text: 'Are you sure you want to delete this user?',
        icon: 'warning',
        confirmButtonText: 'Yes, Delete',
        confirmButtonColor: '#ef4444',
        cancelButtonText: 'Cancel',
        showCancelButton: true
    }).then((result) => {
        if (result.isConfirmed) {
            Swal.fire({
                icon: 'success',
                title: 'Deleted!',
                text: 'User has been deleted successfully.',
                confirmButtonColor: '#6366f1'
            });
        }
    });
}

// ==================== PRODUCT CRUD OPERATIONS ====================

function addNewProduct() {
    Swal.fire({
        title: 'Add New Product',
        html: `
            <div class="mb-3 text-start">
                <label class="form-label">Product Name</label>
                <input type="text" id="productName" class="form-control" placeholder="Enter product name">
            </div>
            <div class="mb-3 text-start">
                <label class="form-label">Category</label>
                <input type="text" id="productCategory" class="form-control" placeholder="Enter category">
            </div>
            <div class="mb-3 text-start">
                <label class="form-label">Price</label>
                <input type="number" id="productPrice" class="form-control" placeholder="Enter price" step="0.01">
            </div>
            <div class="mb-3 text-start">
                <label class="form-label">Stock</label>
                <input type="number" id="productStock" class="form-control" placeholder="Enter stock quantity">
            </div>
        `,
        icon: 'info',
        confirmButtonText: 'Add Product',
        confirmButtonColor: '#6366f1',
        cancelButtonText: 'Cancel',
        showCancelButton: true,
        preConfirm: () => {
            const name = $('#productName').val();
            const category = $('#productCategory').val();
            const price = $('#productPrice').val();
            const stock = $('#productStock').val();

            if (!name || !category || !price || !stock) {
                Swal.showValidationMessage('Please fill all fields');
                return false;
            }

            return { name, category, price, stock };
        }
    }).then((result) => {
        if (result.isConfirmed) {
            Swal.fire({
                icon: 'success',
                title: 'Product Added!',
                text: `${result.value.name} has been added successfully.`,
                confirmButtonColor: '#6366f1'
            });
        }
    });
}

function editProduct(productId) {
    const product = productsData.find(p => p.id === productId);
    if (!product) return;

    Swal.fire({
        title: 'Edit Product',
        html: `
            <div class="mb-3 text-start">
                <label class="form-label">Product Name</label>
                <input type="text" id="editProductName" class="form-control" value="${product.name}">
            </div>
            <div class="mb-3 text-start">
                <label class="form-label">Price</label>
                <input type="number" id="editProductPrice" class="form-control" value="${product.price}" step="0.01">
            </div>
            <div class="mb-3 text-start">
                <label class="form-label">Stock</label>
                <input type="number" id="editProductStock" class="form-control" value="${product.stock}">
            </div>
        `,
        icon: 'info',
        confirmButtonText: 'Update',
        confirmButtonColor: '#6366f1',
        cancelButtonText: 'Cancel',
        showCancelButton: true
    }).then((result) => {
        if (result.isConfirmed) {
            Swal.fire({
                icon: 'success',
                title: 'Updated!',
                text: 'Product has been updated successfully.',
                confirmButtonColor: '#6366f1'
            });
        }
    });
}

function deleteProduct(productId) {
    Swal.fire({
        title: 'Delete Product?',
        text: 'Are you sure you want to delete this product?',
        icon: 'warning',
        confirmButtonText: 'Yes, Delete',
        confirmButtonColor: '#ef4444',
        cancelButtonText: 'Cancel',
        showCancelButton: true
    }).then((result) => {
        if (result.isConfirmed) {
            Swal.fire({
                icon: 'success',
                title: 'Deleted!',
                text: 'Product has been deleted successfully.',
                confirmButtonColor: '#6366f1'
            });
        }
    });
}

// ==================== ORDER CRUD OPERATIONS ====================

function addNewOrder() {
    Swal.fire({
        title: 'Create New Order',
        html: `
            <div class="mb-3 text-start">
                <label class="form-label">Customer Name</label>
                <input type="text" id="orderCustomer" class="form-control" placeholder="Enter customer name">
            </div>
            <div class="mb-3 text-start">
                <label class="form-label">Order Amount</label>
                <input type="number" id="orderAmount" class="form-control" placeholder="Enter amount" step="0.01">
            </div>
            <div class="mb-3 text-start">
                <label class="form-label">Status</label>
                <select id="orderStatus" class="form-select">
                    <option value="">Select Status</option>
                    <option value="Pending">Pending</option>
                    <option value="Processing">Processing</option>
                    <option value="Shipped">Shipped</option>
                    <option value="Completed">Completed</option>
                </select>
            </div>
        `,
        icon: 'info',
        confirmButtonText: 'Create Order',
        confirmButtonColor: '#6366f1',
        cancelButtonText: 'Cancel',
        showCancelButton: true,
        preConfirm: () => {
            const customer = $('#orderCustomer').val();
            const amount = $('#orderAmount').val();
            const status = $('#orderStatus').val();

            if (!customer || !amount || !status) {
                Swal.showValidationMessage('Please fill all fields');
                return false;
            }

            return { customer, amount, status };
        }
    }).then((result) => {
        if (result.isConfirmed) {
            Swal.fire({
                icon: 'success',
                title: 'Order Created!',
                text: `Order for ${result.value.customer} has been created successfully.`,
                confirmButtonColor: '#6366f1'
            });
        }
    });
}

function viewOrder(orderId) {
    const order = ordersData.find(o => o.id === orderId);
    if (!order) return;

    Swal.fire({
        title: 'Order Details',
        html: `
            <div class="text-start">
                <p><strong>Order ID:</strong> ${order.id}</p>
                <p><strong>Customer:</strong> ${order.customer}</p>
                <p><strong>Amount:</strong> ${formatCurrency(order.amount)}</p>
                <p><strong>Status:</strong> ${getStatusBadge(order.status)}</p>
                <p><strong>Date:</strong> ${formatDate(order.date)}</p>
            </div>
        `,
        icon: 'info',
        confirmButtonText: 'Close',
        confirmButtonColor: '#6366f1'
    });
}

function deleteOrder(orderId) {
    Swal.fire({
        title: 'Delete Order?',
        text: 'Are you sure you want to delete this order?',
        icon: 'warning',
        confirmButtonText: 'Yes, Delete',
        confirmButtonColor: '#ef4444',
        cancelButtonText: 'Cancel',
        showCancelButton: true
    }).then((result) => {
        if (result.isConfirmed) {
            Swal.fire({
                icon: 'success',
                title: 'Deleted!',
                text: 'Order has been deleted successfully.',
                confirmButtonColor: '#6366f1'
            });
        }
    });
}

// ==================== CHARTS INITIALIZATION ====================

function initCharts() {
    // Sales Chart
    const salesCtx = document.getElementById('salesChart');
    if (salesCtx) {
        new Chart(salesCtx, {
            type: 'line',
            data: salesChartData,
            options: {
                responsive: true,
                maintainAspectRatio: true,
                plugins: {
                    legend: {
                        display: true,
                        position: 'top'
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        ticks: {
                            callback: function(value) {
                                return '$' + value.toLocaleString();
                            }
                        }
                    }
                }
            }
        });
    }

    // User Chart
    const userCtx = document.getElementById('userChart');
    if (userCtx) {
        new Chart(userCtx, {
            type: 'doughnut',
            data: userChartData,
            options: {
                responsive: true,
                maintainAspectRatio: true,
                plugins: {
                    legend: {
                        display: true,
                        position: 'bottom'
                    }
                }
            }
        });
    }
}

// ==================== RESPONSIVE HANDLERS ====================

$(window).resize(function() {
    if ($(window).width() > 768) {
        $('.sidebar').removeClass('open');
    }
});

// ==================== UTILITY FUNCTIONS ====================

// Format numbers with commas
function formatNumber(num) {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}
