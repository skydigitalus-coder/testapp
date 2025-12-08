/**
 * CATALOG MANAGER
 * Handles product filtering, sorting, pagination, and display
 */

class CatalogManager {
    constructor(categorySlug) {
        this.category = categorySlug;
        this.allProducts = [];
        this.filteredProducts = [];
        this.currentPage = 1;
        this.productsPerPage = 12;
        this.currentView = 'grid';
        this.currentSort = 'featured';

        this.filters = {
            brands: [],
            inStock: false,
            priceMin: 0,
            priceMax: 1000,
            rating: 0,
            custom: {} // For category-specific filters
        };

        this.init();
    }

    init() {
        this.loadProducts();
        this.setupEventListeners();
        this.buildFilterUI();
        this.applyFiltersAndSort();
    }

    loadProducts() {
        // Filter products by category
        this.allProducts = products.filter(p => p.category === this.category);
        this.filteredProducts = [...this.allProducts];
    }

    setupEventListeners() {
        // Sort dropdown
        const sortSelect = document.getElementById('sortSelect');
        if (sortSelect) {
            sortSelect.addEventListener('change', (e) => {
                this.currentSort = e.target.value;
                this.applyFiltersAndSort();
            });
        }

        // View toggle
        document.querySelectorAll('.view-toggle-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const view = e.currentTarget.dataset.view;
                this.setView(view);
            });
        });

        // Mobile filter toggle
        const mobileFilterToggle = document.getElementById('mobileFilterToggle');
        const filterDrawer = document.getElementById('filterDrawer');
        const filterDrawerOverlay = document.getElementById('filterDrawerOverlay');
        const filterDrawerClose = document.getElementById('filterDrawerClose');

        if (mobileFilterToggle && filterDrawer) {
            mobileFilterToggle.addEventListener('click', () => {
                filterDrawer.classList.add('active');
                filterDrawerOverlay.classList.add('active');
                document.body.style.overflow = 'hidden';
            });

            const closeDrawer = () => {
                filterDrawer.classList.remove('active');
                filterDrawerOverlay.classList.remove('active');
                document.body.style.overflow = '';
            };

            filterDrawerClose?.addEventListener('click', closeDrawer);
            filterDrawerOverlay?.addEventListener('click', closeDrawer);
        }

        // Clear all filters
        const clearAllBtn = document.getElementById('clearAllFilters');
        if (clearAllBtn) {
            clearAllBtn.addEventListener('click', () => this.clearAllFilters());
        }

        // In stock filter
        const inStockCheckbox = document.getElementById('inStockOnly');
        if (inStockCheckbox) {
            inStockCheckbox.addEventListener('change', (e) => {
                this.filters.inStock = e.target.checked;
                this.applyFiltersAndSort();
            });
        }

        // Price range
        const minPrice = document.getElementById('minPrice');
        const maxPrice = document.getElementById('maxPrice');
        const priceSlider = document.getElementById('priceRangeSlider');

        if (minPrice && maxPrice) {
            minPrice.addEventListener('change', (e) => {
                this.filters.priceMin = parseFloat(e.target.value) || 0;
                this.applyFiltersAndSort();
            });

            maxPrice.addEventListener('change', (e) => {
                this.filters.priceMax = parseFloat(e.target.value) || 1000;
                this.applyFiltersAndSort();
            });
        }

        if (priceSlider) {
            priceSlider.addEventListener('input', (e) => {
                if (maxPrice) maxPrice.value = e.target.value;
                this.filters.priceMax = parseFloat(e.target.value);
                this.applyFiltersAndSort();
            });
        }

        // Filter group toggles
        document.querySelectorAll('.filter-group-header').forEach(header => {
            header.addEventListener('click', () => {
                const group = header.closest('.filter-group');
                group.classList.toggle('collapsed');
            });
        });
    }

    buildFilterUI() {
        // Build brand filters
        const brands = [...new Set(this.allProducts.map(p => p.brand))].sort();
        this.buildCheckboxFilters('brandFilters', brands, 'brand', (value, checked) => {
            if (checked) {
                this.filters.brands.push(value);
            } else {
                this.filters.brands = this.filters.brands.filter(b => b !== value);
            }
            this.applyFiltersAndSort();
        });

        // Build category-specific filters
        const config = categoryConfig[this.category];
        if (config && config.filters) {
            // Flavor Profile (for e-liquids)
            if (config.filters.flavorProfile) {
                const flavors = config.filters.flavorProfile.options;
                this.buildCheckboxFilters('flavorFilters', flavors, 'flavorProfile', (value, checked) => {
                    if (!this.filters.custom.flavorProfile) this.filters.custom.flavorProfile = [];
                    if (checked) {
                        this.filters.custom.flavorProfile.push(value);
                    } else {
                        this.filters.custom.flavorProfile = this.filters.custom.flavorProfile.filter(f => f !== value);
                    }
                    this.applyFiltersAndSort();
                });
            }

            // Nicotine Strength (for e-liquids)
            if (config.filters.nicotineStrength) {
                const strengths = config.filters.nicotineStrength.options;
                this.buildCheckboxFilters('nicotineFilters', strengths, 'nicotineStrength', (value, checked) => {
                    if (!this.filters.custom.nicotineStrength) this.filters.custom.nicotineStrength = [];
                    if (checked) {
                        this.filters.custom.nicotineStrength.push(value);
                    } else {
                        this.filters.custom.nicotineStrength = this.filters.custom.nicotineStrength.filter(n => n !== value);
                    }
                    this.applyFiltersAndSort();
                });
            }

            // Bottle Size (for e-liquids)
            if (config.filters.bottleSize) {
                const sizes = config.filters.bottleSize.options;
                this.buildCheckboxFilters('bottleSizeFilters', sizes, 'bottleSize', (value, checked) => {
                    if (!this.filters.custom.bottleSize) this.filters.custom.bottleSize = [];
                    if (checked) {
                        this.filters.custom.bottleSize.push(value);
                    } else {
                        this.filters.custom.bottleSize = this.filters.custom.bottleSize.filter(s => s !== value);
                    }
                    this.applyFiltersAndSort();
                });
            }

            // Glass Type (for glass pipes)
            if (config.filters.glassType) {
                const types = config.filters.glassType.options;
                this.buildCheckboxFilters('glassTypeFilters', types, 'glassType', (value, checked) => {
                    if (!this.filters.custom.glassType) this.filters.custom.glassType = [];
                    if (checked) {
                        this.filters.custom.glassType.push(value);
                    } else {
                        this.filters.custom.glassType = this.filters.custom.glassType.filter(t => t !== value);
                    }
                    this.applyFiltersAndSort();
                });
            }

            // Height (for glass pipes)
            if (config.filters.height) {
                const heights = config.filters.height.options;
                this.buildCheckboxFilters('heightFilters', heights, 'height', (value, checked) => {
                    if (!this.filters.custom.height) this.filters.custom.height = [];
                    if (checked) {
                        this.filters.custom.height.push(value);
                    } else {
                        this.filters.custom.height = this.filters.custom.height.filter(h => h !== value);
                    }
                    this.applyFiltersAndSort();
                });
            }

            // Vein Color (for kratom)
            if (config.filters.veinColor) {
                const colors = config.filters.veinColor.options;
                this.buildCheckboxFilters('veinColorFilters', colors, 'veinColor', (value, checked) => {
                    if (!this.filters.custom.veinColor) this.filters.custom.veinColor = [];
                    if (checked) {
                        this.filters.custom.veinColor.push(value);
                    } else {
                        this.filters.custom.veinColor = this.filters.custom.veinColor.filter(c => c !== value);
                    }
                    this.applyFiltersAndSort();
                });
            }

            // Form (for kratom)
            if (config.filters.form) {
                const forms = config.filters.form.options;
                this.buildCheckboxFilters('formFilters', forms, 'form', (value, checked) => {
                    if (!this.filters.custom.form) this.filters.custom.form = [];
                    if (checked) {
                        this.filters.custom.form.push(value);
                    } else {
                        this.filters.custom.form = this.filters.custom.form.filter(f => f !== value);
                    }
                    this.applyFiltersAndSort();
                });
            }

            // Strain (for kratom)
            if (config.filters.strain) {
                // Build strain filter dynamically from products
                const strains = [...new Set(this.allProducts.filter(p => p.strain).map(p => p.strain))].sort();
                this.buildCheckboxFilters('strainFilters', strains, 'strain', (value, checked) => {
                    if (!this.filters.custom.strain) this.filters.custom.strain = [];
                    if (checked) {
                        this.filters.custom.strain.push(value);
                    } else {
                        this.filters.custom.strain = this.filters.custom.strain.filter(s => s !== value);
                    }
                    this.applyFiltersAndSort();
                });
            }
        }
    }

    buildCheckboxFilters(containerId, options, filterType, onChange) {
        const container = document.getElementById(containerId);
        if (!container) return;

        container.innerHTML = '';

        options.forEach((option, index) => {
            const id = `${filterType}-${index}`;
            const wrapper = document.createElement('div');
            wrapper.className = 'filter-option';

            const checkbox = document.createElement('input');
            checkbox.type = 'checkbox';
            checkbox.id = id;
            checkbox.value = option;
            checkbox.className = 'form-checkbox';
            checkbox.addEventListener('change', (e) => onChange(option, e.target.checked));

            const label = document.createElement('label');
            label.htmlFor = id;
            label.className = 'filter-option-label';
            label.textContent = option;

            wrapper.appendChild(checkbox);
            wrapper.appendChild(label);
            container.appendChild(wrapper);
        });
    }

    applyFiltersAndSort() {
        // Start with all products
        let filtered = [...this.allProducts];

        // Apply brand filter
        if (this.filters.brands.length > 0) {
            filtered = filtered.filter(p => this.filters.brands.includes(p.brand));
        }

        // Apply in-stock filter
        if (this.filters.inStock) {
            filtered = filtered.filter(p => p.stock === 'in-stock');
        }

        // Apply price filter
        filtered = filtered.filter(p => {
            const price = p.salePrice || p.price;
            return price >= this.filters.priceMin && price <= this.filters.priceMax;
        });

        // Apply rating filter
        if (this.filters.rating > 0) {
            filtered = filtered.filter(p => p.rating >= this.filters.rating);
        }

        // Apply custom filters
        if (this.filters.custom.flavorProfile && this.filters.custom.flavorProfile.length > 0) {
            filtered = filtered.filter(p => this.filters.custom.flavorProfile.includes(p.flavorProfile));
        }

        if (this.filters.custom.nicotineStrength && this.filters.custom.nicotineStrength.length > 0) {
            filtered = filtered.filter(p => {
                if (!p.nicotineStrength) return false;
                return p.nicotineStrength.some(strength => this.filters.custom.nicotineStrength.includes(strength));
            });
        }

        if (this.filters.custom.bottleSize && this.filters.custom.bottleSize.length > 0) {
            filtered = filtered.filter(p => this.filters.custom.bottleSize.includes(p.bottleSize));
        }

        if (this.filters.custom.glassType && this.filters.custom.glassType.length > 0) {
            filtered = filtered.filter(p => this.filters.custom.glassType.includes(p.glassType));
        }

        if (this.filters.custom.height && this.filters.custom.height.length > 0) {
            filtered = filtered.filter(p => this.filters.custom.height.includes(p.height));
        }

        if (this.filters.custom.veinColor && this.filters.custom.veinColor.length > 0) {
            filtered = filtered.filter(p => this.filters.custom.veinColor.includes(p.veinColor));
        }

        if (this.filters.custom.form && this.filters.custom.form.length > 0) {
            filtered = filtered.filter(p => this.filters.custom.form.includes(p.form));
        }

        if (this.filters.custom.strain && this.filters.custom.strain.length > 0) {
            filtered = filtered.filter(p => this.filters.custom.strain.includes(p.strain));
        }

        // Sort products
        filtered = this.sortProducts(filtered);

        this.filteredProducts = filtered;
        this.currentPage = 1;
        this.renderProducts();
        this.renderPagination();
        this.updateResultsCount();
        this.updateActiveFilters();
    }

    sortProducts(products) {
        const sorted = [...products];

        switch (this.currentSort) {
            case 'price-low':
                return sorted.sort((a, b) => (a.salePrice || a.price) - (b.salePrice || b.price));
            case 'price-high':
                return sorted.sort((a, b) => (b.salePrice || b.price) - (a.salePrice || a.price));
            case 'newest':
                return sorted.sort((a, b) => (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0));
            case 'rating':
                return sorted.sort((a, b) => b.rating - a.rating);
            case 'name':
                return sorted.sort((a, b) => a.name.localeCompare(b.name));
            case 'featured':
            default:
                return sorted;
        }
    }

    renderProducts() {
        const grid = document.getElementById('productsGrid');
        if (!grid) return;

        const start = (this.currentPage - 1) * this.productsPerPage;
        const end = start + this.productsPerPage;
        const pageProducts = this.filteredProducts.slice(start, end);

        if (pageProducts.length === 0) {
            grid.innerHTML = `
                <div class="empty-state" style="grid-column: 1 / -1;">
                    <div class="empty-state-icon">🔍</div>
                    <h2 class="empty-state-title">No Products Found</h2>
                    <p class="empty-state-description">
                        We couldn't find any products matching your filters.
                        Try adjusting your search criteria.
                    </p>
                    <button class="btn btn-primary" onclick="window.catalogManager.clearAllFilters()">
                        Clear All Filters
                    </button>
                </div>
            `;
            return;
        }

        grid.innerHTML = pageProducts.map(product => this.renderProductCard(product)).join('');

        // Add event listeners to product cards
        this.attachProductEventListeners();
    }

    renderProductCard(product) {
        const price = product.salePrice || product.price;
        const hasDiscount = product.salePrice !== null;
        const stars = this.renderStars(product.rating);
        const stockClass = product.stock === 'in-stock' ? 'in-stock' : (product.stock === 'low-stock' ? 'low-stock' : 'out-of-stock');
        const stockText = product.stock === 'in-stock' ? 'In Stock' : (product.stock === 'low-stock' ? 'Low Stock' : 'Out of Stock');

        return `
            <article class="product-card" data-product-id="${product.id}">
                <div class="product-card-image-wrapper">
                    <img src="${product.images[0]}" alt="${product.name}" class="product-card-image primary" loading="lazy">
                    ${product.images[1] ? `<img src="${product.images[1]}" alt="${product.name}" class="product-card-image secondary" loading="lazy">` : ''}

                    <div class="product-badges">
                        ${product.isNew ? '<span class="product-badge new">New</span>' : ''}
                        ${hasDiscount ? '<span class="product-badge sale">Sale</span>' : ''}
                        ${product.stock === 'low-stock' ? '<span class="product-badge low-stock">Low Stock</span>' : ''}
                    </div>

                    <div class="product-quick-actions">
                        <button class="quick-action-btn btn-wishlist" aria-label="Add to wishlist" title="Add to wishlist">
                            ♡
                        </button>
                        <button class="quick-action-btn btn-quick-view-icon" data-product-id="${product.id}" aria-label="Quick view" title="Quick view">
                            👁
                        </button>
                    </div>
                </div>

                <div class="product-card-body">
                    <div class="product-brand">${product.brand}</div>
                    <h3 class="product-name">
                        <a href="product-detail.html?id=${product.id}">${product.name}</a>
                    </h3>

                    <div class="product-rating">
                        <div class="rating-stars">${stars}</div>
                        <span class="rating-count">(${product.reviewCount})</span>
                    </div>

                    <div class="product-price">
                        <span class="price-current">$${price.toFixed(2)}</span>
                        ${hasDiscount ? `<span class="price-original">$${product.price.toFixed(2)}</span>` : ''}
                    </div>

                    <div class="stock-status ${stockClass}">${stockText}</div>

                    <div class="product-card-actions">
                        <button class="btn btn-primary btn-sm btn-add-to-cart" data-product-id="${product.id}" ${product.stock === 'out-of-stock' ? 'disabled' : ''}>
                            Add to Cart
                        </button>
                        <button class="btn btn-outline btn-sm btn-quick-view" data-product-id="${product.id}">
                            Quick View
                        </button>
                    </div>
                </div>
            </article>
        `;
    }

    renderStars(rating) {
        const fullStars = Math.floor(rating);
        const hasHalfStar = rating % 1 >= 0.5;
        const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);

        let stars = '';
        for (let i = 0; i < fullStars; i++) stars += '<span class="star">★</span>';
        if (hasHalfStar) stars += '<span class="star">★</span>';
        for (let i = 0; i < emptyStars; i++) stars += '<span class="star empty">★</span>';

        return stars;
    }

    attachProductEventListeners() {
        // Quick view buttons
        document.querySelectorAll('.btn-quick-view, .btn-quick-view-icon').forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                const productId = e.currentTarget.dataset.productId;
                this.showQuickView(productId);
            });
        });

        // Add to cart buttons
        document.querySelectorAll('.btn-add-to-cart').forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                const productId = e.currentTarget.dataset.productId;
                this.addToCart(productId);
            });
        });
    }

    showQuickView(productId) {
        const product = this.allProducts.find(p => p.id === productId);
        if (!product) return;

        const backdrop = document.getElementById('quickViewBackdrop');
        const content = document.getElementById('quickViewContent');

        if (!backdrop || !content) return;

        const price = product.salePrice || product.price;
        const hasDiscount = product.salePrice !== null;
        const stars = this.renderStars(product.rating);

        content.innerHTML = `
            <div class="quick-view-images">
                <img src="${product.images[0]}" alt="${product.name}" class="quick-view-main-image" id="quickViewMainImage">
                ${product.images.length > 1 ? `
                    <div class="quick-view-thumbnails">
                        ${product.images.map((img, idx) => `
                            <img src="${img}" alt="${product.name}" class="quick-view-thumbnail ${idx === 0 ? 'active' : ''}" data-index="${idx}">
                        `).join('')}
                    </div>
                ` : ''}
            </div>

            <div class="quick-view-info">
                <div class="product-brand quick-view-brand">${product.brand}</div>
                <h2 class="quick-view-name">${product.name}</h2>

                <div class="quick-view-rating product-rating">
                    <div class="rating-stars">${stars}</div>
                    <span class="rating-count">(${product.reviewCount} reviews)</span>
                </div>

                <p class="quick-view-description">${product.description}</p>

                <div class="quick-view-features">
                    <h4>Key Features:</h4>
                    <ul>
                        ${product.features.map(feature => `<li>${feature}</li>`).join('')}
                    </ul>
                </div>

                <div class="quick-view-price product-price">
                    <span class="price-current">$${price.toFixed(2)}</span>
                    ${hasDiscount ? `<span class="price-original">$${product.price.toFixed(2)}</span>` : ''}
                </div>

                <div class="quick-view-quantity">
                    <label>Quantity:</label>
                    <div class="quantity-selector">
                        <button class="quantity-btn" id="qtyMinus">-</button>
                        <input type="number" class="quantity-input" id="qtyInput" value="1" min="1" max="10">
                        <button class="quantity-btn" id="qtyPlus">+</button>
                    </div>
                </div>

                <div class="quick-view-actions">
                    <button class="btn btn-primary btn-full" id="quickViewAddToCart" data-product-id="${product.id}">
                        Add to Cart
                    </button>
                </div>

                <div class="quick-view-link">
                    <a href="product-detail.html?id=${product.id}">View Full Product Details →</a>
                </div>
            </div>
        `;

        backdrop.classList.add('active');
        document.body.style.overflow = 'hidden';

        // Quick view event listeners
        this.setupQuickViewListeners();
    }

    setupQuickViewListeners() {
        // Close button
        const closeBtn = document.getElementById('quickViewClose');
        const backdrop = document.getElementById('quickViewBackdrop');

        const closeQuickView = () => {
            backdrop.classList.remove('active');
            document.body.style.overflow = '';
        };

        closeBtn?.addEventListener('click', closeQuickView);
        backdrop?.addEventListener('click', (e) => {
            if (e.target === backdrop) closeQuickView();
        });

        // Thumbnail clicks
        document.querySelectorAll('.quick-view-thumbnail').forEach(thumb => {
            thumb.addEventListener('click', (e) => {
                const index = e.currentTarget.dataset.index;
                const mainImg = document.getElementById('quickViewMainImage');
                if (mainImg) {
                    mainImg.src = e.currentTarget.src;
                }
                document.querySelectorAll('.quick-view-thumbnail').forEach(t => t.classList.remove('active'));
                e.currentTarget.classList.add('active');
            });
        });

        // Quantity buttons
        const qtyInput = document.getElementById('qtyInput');
        const qtyMinus = document.getElementById('qtyMinus');
        const qtyPlus = document.getElementById('qtyPlus');

        qtyMinus?.addEventListener('click', () => {
            const current = parseInt(qtyInput.value) || 1;
            if (current > 1) qtyInput.value = current - 1;
        });

        qtyPlus?.addEventListener('click', () => {
            const current = parseInt(qtyInput.value) || 1;
            if (current < 10) qtyInput.value = current + 1;
        });

        // Add to cart from quick view
        const addToCartBtn = document.getElementById('quickViewAddToCart');
        addToCartBtn?.addEventListener('click', () => {
            const productId = addToCartBtn.dataset.productId;
            const quantity = parseInt(qtyInput.value) || 1;
            this.addToCart(productId, quantity);
            closeQuickView();
        });
    }

    addToCart(productId, quantity = 1) {
        const product = this.allProducts.find(p => p.id === productId);
        if (!product) return;

        // Use existing cart functionality
        if (typeof addToCart === 'function') {
            for (let i = 0; i < quantity; i++) {
                addToCart(product);
            }
        }

        // Show feedback
        this.showNotification(`Added ${product.name} to cart!`);
    }

    showNotification(message) {
        // Simple notification (you can enhance this)
        const notification = document.createElement('div');
        notification.className = 'alert alert-success';
        notification.textContent = message;
        notification.style.position = 'fixed';
        notification.style.top = '20px';
        notification.style.right = '20px';
        notification.style.zIndex = '10000';
        notification.style.animation = 'slideIn 0.3s ease-out';

        document.body.appendChild(notification);

        setTimeout(() => {
            notification.remove();
        }, 3000);
    }

    renderPagination() {
        const pagination = document.getElementById('pagination');
        if (!pagination) return;

        const totalPages = Math.ceil(this.filteredProducts.length / this.productsPerPage);

        if (totalPages <= 1) {
            pagination.innerHTML = '';
            return;
        }

        let html = '';

        // Previous button
        html += `
            <button class="pagination-btn" ${this.currentPage === 1 ? 'disabled' : ''}
                onclick="window.catalogManager.goToPage(${this.currentPage - 1})">
                ← Previous
            </button>
        `;

        // Page numbers
        const maxVisible = 5;
        let startPage = Math.max(1, this.currentPage - Math.floor(maxVisible / 2));
        let endPage = Math.min(totalPages, startPage + maxVisible - 1);

        if (endPage - startPage < maxVisible - 1) {
            startPage = Math.max(1, endPage - maxVisible + 1);
        }

        if (startPage > 1) {
            html += `<button class="pagination-btn" onclick="window.catalogManager.goToPage(1)">1</button>`;
            if (startPage > 2) html += `<span class="pagination-ellipsis">...</span>`;
        }

        for (let i = startPage; i <= endPage; i++) {
            html += `
                <button class="pagination-btn ${i === this.currentPage ? 'active' : ''}"
                    onclick="window.catalogManager.goToPage(${i})">
                    ${i}
                </button>
            `;
        }

        if (endPage < totalPages) {
            if (endPage < totalPages - 1) html += `<span class="pagination-ellipsis">...</span>`;
            html += `<button class="pagination-btn" onclick="window.catalogManager.goToPage(${totalPages})">${totalPages}</button>`;
        }

        // Next button
        html += `
            <button class="pagination-btn" ${this.currentPage === totalPages ? 'disabled' : ''}
                onclick="window.catalogManager.goToPage(${this.currentPage + 1})">
                Next →
            </button>
        `;

        pagination.innerHTML = html;
    }

    goToPage(page) {
        this.currentPage = page;
        this.renderProducts();
        this.renderPagination();
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    updateResultsCount() {
        const countElement = document.getElementById('resultsCount');
        if (countElement) {
            const count = this.filteredProducts.length;
            countElement.innerHTML = `<strong>${count}</strong> Product${count !== 1 ? 's' : ''}`;
        }
    }

    updateActiveFilters() {
        const container = document.getElementById('activeFilters');
        if (!container) return;

        const activeTags = [];

        // Brand filters
        this.filters.brands.forEach(brand => {
            activeTags.push({ label: brand, type: 'brand', value: brand });
        });

        // Custom filters
        Object.entries(this.filters.custom).forEach(([key, values]) => {
            if (Array.isArray(values) && values.length > 0) {
                values.forEach(value => {
                    activeTags.push({ label: value, type: key, value: value });
                });
            }
        });

        if (activeTags.length === 0) {
            container.innerHTML = '';
            return;
        }

        container.innerHTML = activeTags.map(tag => `
            <div class="active-filter-tag">
                <span>${tag.label}</span>
                <button class="active-filter-remove" data-type="${tag.type}" data-value="${tag.value}"
                    onclick="window.catalogManager.removeFilter('${tag.type}', '${tag.value}')">
                    ×
                </button>
            </div>
        `).join('');
    }

    removeFilter(type, value) {
        if (type === 'brand') {
            this.filters.brands = this.filters.brands.filter(b => b !== value);
            const checkbox = document.querySelector(`input[value="${value}"][type="checkbox"]`);
            if (checkbox) checkbox.checked = false;
        } else if (this.filters.custom[type]) {
            this.filters.custom[type] = this.filters.custom[type].filter(v => v !== value);
            const checkbox = document.querySelector(`#${type}Filters input[value="${value}"]`);
            if (checkbox) checkbox.checked = false;
        }

        this.applyFiltersAndSort();
    }

    clearAllFilters() {
        this.filters = {
            brands: [],
            inStock: false,
            priceMin: 0,
            priceMax: 1000,
            rating: 0,
            custom: {}
        };

        // Reset all checkboxes
        document.querySelectorAll('.filter-sidebar input[type="checkbox"]').forEach(cb => cb.checked = false);

        // Reset price inputs
        const minPrice = document.getElementById('minPrice');
        const maxPrice = document.getElementById('maxPrice');
        const priceSlider = document.getElementById('priceRangeSlider');
        if (minPrice) minPrice.value = 0;
        if (maxPrice) maxPrice.value = 50;
        if (priceSlider) priceSlider.value = 50;

        this.applyFiltersAndSort();
    }

    setView(view) {
        this.currentView = view;
        const grid = document.getElementById('productsGrid');

        document.querySelectorAll('.view-toggle-btn').forEach(btn => {
            btn.classList.toggle('active', btn.dataset.view === view);
        });

        if (view === 'list') {
            grid.classList.add('list-view');
        } else {
            grid.classList.remove('list-view');
        }
    }
}

// Make it globally accessible
window.CatalogManager = CatalogManager;
