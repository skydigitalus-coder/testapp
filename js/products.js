// Products page functionality

let currentProducts = [...products];
let filters = {
    search: '',
    category: '',
    sort: 'name-asc'
};

document.addEventListener('DOMContentLoaded', function() {
    // Check if we're on the products page
    if (!document.getElementById('productsGrid')) return;

    // Setup filters
    setupFilters();

    // Check for category from URL
    const urlCategory = getUrlParameter('category');
    if (urlCategory) {
        filters.category = urlCategory;
        const categorySelect = document.getElementById('categoryFilter');
        if (categorySelect) {
            categorySelect.value = urlCategory;
        }
    }

    // Initial load
    filterAndDisplayProducts();
});

function setupFilters() {
    const searchInput = document.getElementById('searchInput');
    const categoryFilter = document.getElementById('categoryFilter');
    const sortFilter = document.getElementById('sortFilter');

    if (searchInput) {
        searchInput.addEventListener('input', function(e) {
            filters.search = e.target.value.toLowerCase();
            filterAndDisplayProducts();
        });
    }

    if (categoryFilter) {
        categoryFilter.addEventListener('change', function(e) {
            filters.category = e.target.value;
            filterAndDisplayProducts();
        });
    }

    if (sortFilter) {
        sortFilter.addEventListener('change', function(e) {
            filters.sort = e.target.value;
            filterAndDisplayProducts();
        });
    }
}

function filterAndDisplayProducts() {
    // Start with all products
    let filtered = [...products];

    // Apply search filter
    if (filters.search) {
        filtered = filtered.filter(product =>
            product.name.toLowerCase().includes(filters.search) ||
            product.description.toLowerCase().includes(filters.search)
        );
    }

    // Apply category filter
    if (filters.category) {
        filtered = filtered.filter(product => product.category === filters.category);
    }

    // Apply sorting
    filtered.sort((a, b) => {
        switch (filters.sort) {
            case 'name-asc':
                return a.name.localeCompare(b.name);
            case 'name-desc':
                return b.name.localeCompare(a.name);
            case 'price-asc':
                return a.price - b.price;
            case 'price-desc':
                return b.price - a.price;
            default:
                return 0;
        }
    });

    currentProducts = filtered;
    displayProducts();
    updateProductCount();
}

function displayProducts() {
    const grid = document.getElementById('productsGrid');
    if (!grid) return;

    grid.innerHTML = '';

    if (currentProducts.length === 0) {
        grid.innerHTML = `
            <div class="empty-cart" style="grid-column: 1 / -1;">
                <div class="empty-cart-icon">🔍</div>
                <p>No products found matching your criteria.</p>
                <a href="products.html" class="btn btn-primary">View All Products</a>
            </div>
        `;
        return;
    }

    currentProducts.forEach(product => {
        const productCard = createProductCard(product);
        grid.appendChild(productCard);
    });
}

function updateProductCount() {
    const countElement = document.getElementById('productCount');
    if (countElement) {
        const count = currentProducts.length;
        countElement.textContent = `${count} product${count !== 1 ? 's' : ''}`;
    }
}
