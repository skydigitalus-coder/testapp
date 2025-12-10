// Enhanced Cart page functionality

document.addEventListener('DOMContentLoaded', function() {
    if (!document.getElementById('cartContent')) return;
    loadCartPage();
});

function loadCartPage() {
    const cartContent = document.getElementById('cartContent');
    const items = cart.getItems();

    if (items.length === 0) {
        cartContent.innerHTML = `
            <div class="empty-cart" style="text-align: center; padding: 4rem 1rem;">
                <div class="empty-cart-icon" style="font-size: 5rem; margin-bottom: 1rem;">🛒</div>
                <h2 style="font-size: 2rem; margin-bottom: 0.5rem;">Your cart is empty</h2>
                <p style="color: #6b7280; margin-bottom: 2rem;">Add some items to get started!</p>
                <a href="products.html" class="btn btn-primary">Shop Now</a>
            </div>
        `;
        return;
    }

    let html = '<div class="cart-page-grid">';

    // Cart Items Section
    html += '<div class="cart-items-section">';
    html += '<h2 style="margin-bottom: 1.5rem;">Cart Items</h2>';

    items.forEach(item => {
        const itemSubtotal = item.price * item.quantity;
        html += `
            <div class="cart-item-row" data-key="${item.key}">
                <div class="cart-item-image-wrapper">
                    <img src="${item.image}" alt="${item.name}">
                </div>
                <div class="cart-item-info">
                    <h3>${item.name}</h3>
                    <p>Price: $${item.price.toFixed(2)}</p>
                    ${Object.keys(item.variants).length > 0 ? `
                        <p style="color: #6b7280; font-size: 0.875rem;">
                            ${Object.entries(item.variants).map(([k, v]) => `${k}: ${v}`).join(', ')}
                        </p>
                    ` : ''}
                </div>
                <div class="cart-item-price">
                    $${itemSubtotal.toFixed(2)}
                </div>
                <div class="cart-item-actions">
                    <div class="cart-item-quantity-controls">
                        <button onclick="updateCartItemQuantity('${item.key}', ${item.quantity - 1})">−</button>
                        <input type="number" value="${item.quantity}" min="1" readonly>
                        <button onclick="updateCartItemQuantity('${item.key}', ${item.quantity + 1})">+</button>
                    </div>
                    <button class="cart-item-remove-btn" onclick="removeCartItem('${item.key}')">Remove</button>
                </div>
            </div>
        `;
    });

    html += '</div>'; // End cart-items-section

    // Cart Summary Section
    const subtotal = cart.getSubtotal();
    const shipping = cart.getShipping();
    const tax = cart.getTax();
    const discount = cart.getDiscount();
    const total = cart.getTotal();

    html += `
        <div class="cart-summary-section">
            <h2>Order Summary</h2>

            <!-- Promo Code Section -->
            <div class="promo-code-section">
                <label style="display: block; margin-bottom: 0.5rem; font-weight: 600; font-size: 0.875rem;">Promo Code</label>
                ${cart.promoCode ? `
                    <div class="promo-applied">
                        <span>✓ ${cart.promoCode} applied</span>
                        <button class="promo-remove" onclick="removePromoCode()">&times;</button>
                    </div>
                ` : `
                    <div class="promo-code-input-group">
                        <input type="text" id="promoCodeInput" placeholder="Enter code" style="text-transform: uppercase">
                        <button class="btn btn-secondary" onclick="applyPromoCode()">Apply</button>
                    </div>
                    <div id="promoMessage" style="margin-top: 0.5rem; font-size: 0.75rem;"></div>
                `}
            </div>

            <!-- Summary Rows -->
            <div class="summary-row">
                <span>Subtotal:</span>
                <span>$${subtotal.toFixed(2)}</span>
            </div>
            <div class="summary-row">
                <span>Shipping:</span>
                <span>${shipping === 0 ? 'FREE' : '$' + shipping.toFixed(2)}</span>
            </div>
            ${discount > 0 ? `
                <div class="summary-row discount">
                    <span>Discount:</span>
                    <span>-$${discount.toFixed(2)}</span>
                </div>
            ` : ''}
            <div class="summary-row">
                <span>Tax (8.9%):</span>
                <span>$${tax.toFixed(2)}</span>
            </div>
            <div class="summary-row total">
                <span>Total:</span>
                <span>$${total.toFixed(2)}</span>
            </div>

            ${subtotal < 75 && shipping > 0 ? `
                <p style="text-align: center; font-size: 0.75rem; color: #059669; margin: 1rem 0;">
                    Add $${(75 - subtotal).toFixed(2)} more for free shipping!
                </p>
            ` : ''}

            <!-- Trust Badges -->
            <div class="trust-badges">
                <div class="trust-badge">
                    <span class="trust-badge-icon">✓</span>
                    <span>Secure Checkout</span>
                </div>
                <div class="trust-badge">
                    <span class="trust-badge-icon">🔒</span>
                    <span>SSL Encrypted</span>
                </div>
                <div class="trust-badge">
                    <span class="trust-badge-icon">↩️</span>
                    <span>30-Day Returns</span>
                </div>
                <div class="trust-badge">
                    <span class="trust-badge-icon">💯</span>
                    <span>Money-Back Guarantee</span>
                </div>
            </div>

            <!-- Action Buttons -->
            <a href="checkout.html" class="btn btn-primary btn-block" style="margin-bottom: 0.75rem;">Proceed to Checkout</a>
            <a href="products.html" class="btn btn-secondary btn-block">Continue Shopping</a>
        </div>
    `;

    html += '</div>'; // End cart-page-grid

    // Add Recommendations Section
    html += `
        <div class="cart-recommendations">
            <h2>You May Also Like</h2>
            <div class="recommendations-grid" id="recommendationsGrid">
                <!-- Recommendations will be loaded here -->
            </div>
        </div>
    `;

    cartContent.innerHTML = html;
    loadRecommendations();
}

function updateCartItemQuantity(key, quantity) {
    cart.updateQuantity(key, quantity);
    loadCartPage();
}

function removeCartItem(key) {
    if (confirm('Remove this item from your cart?')) {
        cart.removeItem(key);
        loadCartPage();
    }
}

function applyPromoCode() {
    const input = document.getElementById('promoCodeInput');
    const message = document.getElementById('promoMessage');
    const code = input.value.trim();

    if (!code) {
        message.textContent = 'Please enter a promo code';
        message.style.color = '#ef4444';
        return;
    }

    const result = cart.applyPromoCode(code);

    if (result.success) {
        message.textContent = result.message;
        message.style.color = '#059669';
        setTimeout(() => loadCartPage(), 500);
    } else {
        message.textContent = result.message;
        message.style.color = '#ef4444';
    }
}

function removePromoCode() {
    cart.removePromoCode();
    loadCartPage();
}

function loadRecommendations() {
    const grid = document.getElementById('recommendationsGrid');
    if (!grid) return;

    // Sample recommendations (in production, this would be dynamic based on cart items)
    const recommendations = [
        {
            id: 'rec1',
            name: 'Premium Glass Pipe',
            price: 24.99,
            image: 'https://via.placeholder.com/200x150?text=Glass+Pipe'
        },
        {
            id: 'rec2',
            name: 'Kratom Capsules - Green',
            price: 19.99,
            image: 'https://via.placeholder.com/200x150?text=Kratom'
        },
        {
            id: 'rec3',
            name: 'Disposable Vape - Mixed',
            price: 12.99,
            image: 'https://via.placeholder.com/200x150?text=Vape'
        },
        {
            id: 'rec4',
            name: 'Detox Kit - Complete',
            price: 34.99,
            image: 'https://via.placeholder.com/200x150?text=Detox'
        }
    ];

    grid.innerHTML = recommendations.map(item => `
        <div class="recommendation-card" onclick="window.location.href='product-detail.html?id=${item.id}'">
            <img src="${item.image}" alt="${item.name}">
            <h4>${item.name}</h4>
            <div class="price">$${item.price.toFixed(2)}</div>
            <button class="btn btn-primary btn-sm" style="width: 100%; margin-top: 0.5rem;"
                    onclick="event.stopPropagation(); addRecommendationToCart('${item.id}')">
                Add to Cart
            </button>
        </div>
    `).join('');
}

function addRecommendationToCart(productId) {
    // This would integrate with your product data
    alert('Product added to cart!');
}
