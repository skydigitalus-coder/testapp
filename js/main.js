// Main JavaScript functionality

document.addEventListener('DOMContentLoaded', function() {
    // Age Verification
    handleAgeVerification();

    // Mobile Menu Toggle
    setupMobileMenu();

    // Update cart count
    cart.updateCartCount();

    // Load featured products on homepage
    if (document.getElementById('featuredProductsGrid')) {
        loadFeaturedProducts();
    }
});

// Age Verification Functions
function handleAgeVerification() {
    const modal = document.getElementById('ageModal');
    if (!modal) return;

    const ageVerified = localStorage.getItem('ageVerified');

    if (ageVerified === 'true') {
        modal.classList.add('hidden');
    } else {
        modal.classList.remove('hidden');
    }

    const yesBtn = document.getElementById('ageYes');
    const noBtn = document.getElementById('ageNo');

    if (yesBtn) {
        yesBtn.addEventListener('click', function() {
            localStorage.setItem('ageVerified', 'true');
            modal.classList.add('hidden');
        });
    }

    if (noBtn) {
        noBtn.addEventListener('click', function() {
            alert('Sorry, you must be 21 or older to access this site.');
            window.location.href = 'https://www.google.com';
        });
    }
}

// Mobile Menu Functions
function setupMobileMenu() {
    const menuToggle = document.getElementById('menuToggle');
    const mainNav = document.getElementById('mainNav');

    if (menuToggle && mainNav) {
        menuToggle.addEventListener('click', function() {
            menuToggle.classList.toggle('active');
            mainNav.classList.toggle('active');
        });
    }
}

// Product Display Functions
function loadFeaturedProducts() {
    const grid = document.getElementById('featuredProductsGrid');
    if (!grid) return;

    const featuredProducts = products.filter(p => p.featured);

    featuredProducts.forEach(product => {
        const productCard = createProductCard(product);
        grid.appendChild(productCard);
    });
}

function createProductCard(product) {
    const card = document.createElement('div');
    card.className = 'product-card';

    card.innerHTML = `
        <div class="product-image">${product.icon}</div>
        <div class="product-info">
            <div class="product-category">${categoryNames[product.category]}</div>
            <h3>${product.name}</h3>
            <p class="product-description">${product.description}</p>
            <div class="product-footer">
                <span class="product-price">$${product.price.toFixed(2)}</span>
                <button class="add-to-cart" data-product-id="${product.id}">Add to Cart</button>
            </div>
        </div>
    `;

    // Add click handler for add to cart button
    const addBtn = card.querySelector('.add-to-cart');
    addBtn.addEventListener('click', function(e) {
        e.preventDefault();
        const productId = parseInt(this.getAttribute('data-product-id'));
        const product = products.find(p => p.id === productId);
        if (product) {
            cart.addItem(product);
        }
    });

    return card;
}

// Utility function to get URL parameters
function getUrlParameter(name) {
    name = name.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]');
    const regex = new RegExp('[\\?&]' + name + '=([^&#]*)');
    const results = regex.exec(location.search);
    return results === null ? '' : decodeURIComponent(results[1].replace(/\+/g, ' '));
}

// Format currency
function formatCurrency(amount) {
    return '$' + amount.toFixed(2);
}
