// Enhanced Cart management with localStorage persistence

class ShoppingCart {
    constructor() {
        this.items = this.loadCart();
        this.promoCode = this.loadPromoCode();
        this.shippingMethod = this.loadShippingMethod();
        this.cartExpiry = 30 * 24 * 60 * 60 * 1000; // 30 days in milliseconds
        this.initializeCartDrawer();
    }

    loadCart() {
        const savedCart = localStorage.getItem('pandorasCart');
        const cartTimestamp = localStorage.getItem('pandorasCartTimestamp');

        if (savedCart && cartTimestamp) {
            const now = Date.now();
            const elapsed = now - parseInt(cartTimestamp);

            if (elapsed < this.cartExpiry) {
                return JSON.parse(savedCart);
            } else {
                localStorage.removeItem('pandorasCart');
                localStorage.removeItem('pandorasCartTimestamp');
            }
        }

        return [];
    }

    loadPromoCode() {
        return localStorage.getItem('pandorasPromoCode') || null;
    }

    loadShippingMethod() {
        const saved = localStorage.getItem('pandorasShipping');
        return saved ? JSON.parse(saved) : { method: 'standard', cost: 0 };
    }

    saveCart() {
        localStorage.setItem('pandorasCart', JSON.stringify(this.items));
        localStorage.setItem('pandorasCartTimestamp', Date.now().toString());
        this.updateCartCount();
        this.updateCartDrawer();
    }

    savePromoCode() {
        if (this.promoCode) {
            localStorage.setItem('pandorasPromoCode', this.promoCode);
        } else {
            localStorage.removeItem('pandorasPromoCode');
        }
    }

    saveShippingMethod() {
        localStorage.setItem('pandorasShipping', JSON.stringify(this.shippingMethod));
    }

    addItem(product, quantity = 1, variants = {}) {
        const itemKey = this.generateItemKey(product.id, variants);
        const existingItem = this.items.find(item => item.key === itemKey);

        if (existingItem) {
            existingItem.quantity += quantity;
        } else {
            this.items.push({
                key: itemKey,
                id: product.id,
                name: product.name,
                price: product.price,
                image: product.image || product.icon || 'https://via.placeholder.com/100',
                quantity: quantity,
                variants: variants
            });
        }

        this.saveCart();
        this.showNotification(`${product.name} added to cart!`);
        this.openCartDrawer();
    }

    generateItemKey(productId, variants) {
        const variantString = Object.entries(variants)
            .sort(([a], [b]) => a.localeCompare(b))
            .map(([key, value]) => `${key}:${value}`)
            .join('|');
        return `${productId}${variantString ? `-${variantString}` : ''}`;
    }

    removeItem(itemKey) {
        this.items = this.items.filter(item => item.key !== itemKey);
        this.saveCart();
    }

    updateQuantity(itemKey, quantity) {
        const item = this.items.find(item => item.key === itemKey);
        if (item) {
            if (quantity <= 0) {
                this.removeItem(itemKey);
            } else {
                item.quantity = quantity;
                this.saveCart();
            }
        }
    }

    getItems() {
        return this.items;
    }

    getItemCount() {
        return this.items.reduce((total, item) => total + item.quantity, 0);
    }

    getSubtotal() {
        return this.items.reduce((total, item) => total + (item.price * item.quantity), 0);
    }

    getShipping() {
        const subtotal = this.getSubtotal();

        if (this.shippingMethod.method === 'local-pickup') {
            return 0;
        } else if (subtotal >= 75) {
            return 0; // Free shipping over $75
        }

        switch(this.shippingMethod.method) {
            case 'standard':
                return 5.99;
            case 'expedited':
                return 12.99;
            case 'next-day':
                return 24.99;
            default:
                return 5.99;
        }
    }

    getTax() {
        return (this.getSubtotal() + this.getShipping()) * 0.089; // 8.9% WA tax
    }

    getDiscount() {
        if (!this.promoCode) return 0;

        const subtotal = this.getSubtotal();
        const promoCodes = {
            'WELCOME15': subtotal * 0.15,
            'SAVE10': subtotal * 0.10,
            'SAVE20': subtotal * 0.20,
            'FREESHIP': this.getShipping()
        };

        return promoCodes[this.promoCode] || 0;
    }

    applyPromoCode(code) {
        const upperCode = code.toUpperCase();
        const validCodes = ['WELCOME15', 'SAVE10', 'SAVE20', 'FREESHIP'];

        if (validCodes.includes(upperCode)) {
            this.promoCode = upperCode;
            this.savePromoCode();
            return { success: true, message: 'Promo code applied!' };
        }

        return { success: false, message: 'Invalid promo code' };
    }

    removePromoCode() {
        this.promoCode = null;
        this.savePromoCode();
    }

    setShippingMethod(method) {
        this.shippingMethod = { method, cost: this.getShipping() };
        this.saveShippingMethod();
    }

    getTotal() {
        return this.getSubtotal() + this.getShipping() + this.getTax() - this.getDiscount();
    }

    clearCart() {
        this.items = [];
        this.promoCode = null;
        this.saveCart();
        this.savePromoCode();
    }

    updateCartCount() {
        const cartBadges = document.querySelectorAll('.cart-badge');
        const count = this.getItemCount();

        cartBadges.forEach(badge => {
            if (count > 0) {
                badge.textContent = count;
                badge.style.display = 'inline-block';
            } else {
                badge.style.display = 'none';
            }
        });
    }

    showNotification(message) {
        const notification = document.createElement('div');
        notification.className = 'cart-notification';
        notification.textContent = message;
        notification.style.cssText = `
            position: fixed;
            top: 80px;
            right: 20px;
            background-color: #10b981;
            color: white;
            padding: 1rem 1.5rem;
            border-radius: 8px;
            box-shadow: 0 4px 12px rgba(0,0,0,0.2);
            z-index: 10001;
            animation: slideIn 0.3s ease;
        `;

        const style = document.createElement('style');
        if (!document.getElementById('cart-notification-styles')) {
            style.id = 'cart-notification-styles';
            style.textContent = `
                @keyframes slideIn {
                    from { transform: translateX(400px); opacity: 0; }
                    to { transform: translateX(0); opacity: 1; }
                }
                @keyframes slideOut {
                    from { transform: translateX(0); opacity: 1; }
                    to { transform: translateX(400px); opacity: 0; }
                }
            `;
            document.head.appendChild(style);
        }

        document.body.appendChild(notification);

        setTimeout(() => {
            notification.style.animation = 'slideOut 0.3s ease';
            setTimeout(() => notification.remove(), 300);
        }, 3000);
    }

    // Cart Drawer Functionality
    initializeCartDrawer() {
        if (document.getElementById('cartDrawer')) return;

        const drawer = document.createElement('div');
        drawer.id = 'cartDrawer';
        drawer.className = 'cart-drawer';
        drawer.innerHTML = `
            <div class="cart-drawer-overlay"></div>
            <div class="cart-drawer-content">
                <div class="cart-drawer-header">
                    <h2>Shopping Cart (<span id="drawerCartCount">0</span>)</h2>
                    <button class="cart-drawer-close" aria-label="Close cart">&times;</button>
                </div>
                <div class="cart-drawer-body" id="cartDrawerBody">
                    <!-- Cart items will be rendered here -->
                </div>
                <div class="cart-drawer-footer">
                    <div class="cart-drawer-totals">
                        <div class="cart-drawer-subtotal">
                            <span>Subtotal:</span>
                            <span id="drawerSubtotal">$0.00</span>
                        </div>
                        <div class="cart-drawer-shipping">
                            <span>Shipping:</span>
                            <span id="drawerShipping">$0.00</span>
                        </div>
                        <div class="cart-drawer-tax">
                            <span>Tax:</span>
                            <span id="drawerTax">$0.00</span>
                        </div>
                        <div class="cart-drawer-total">
                            <span>Total:</span>
                            <span id="drawerTotal">$0.00</span>
                        </div>
                    </div>
                    <div class="cart-drawer-actions">
                        <a href="cart.html" class="btn btn-secondary btn-block">View Cart</a>
                        <a href="checkout.html" class="btn btn-primary btn-block">Checkout</a>
                        <button class="btn-link" id="continueShopping">Continue Shopping</button>
                    </div>
                </div>
            </div>
        `;

        document.body.appendChild(drawer);

        // Event listeners
        drawer.querySelector('.cart-drawer-close').addEventListener('click', () => this.closeCartDrawer());
        drawer.querySelector('.cart-drawer-overlay').addEventListener('click', () => this.closeCartDrawer());
        drawer.querySelector('#continueShopping').addEventListener('click', () => this.closeCartDrawer());

        // Add click event to cart icons
        document.addEventListener('click', (e) => {
            const cartLink = e.target.closest('a[href="cart.html"]');
            if (cartLink && !e.ctrlKey && !e.metaKey) {
                e.preventDefault();
                this.openCartDrawer();
            }
        });

        this.updateCartDrawer();
    }

    openCartDrawer() {
        const drawer = document.getElementById('cartDrawer');
        if (drawer) {
            drawer.classList.add('open');
            document.body.style.overflow = 'hidden';
        }
    }

    closeCartDrawer() {
        const drawer = document.getElementById('cartDrawer');
        if (drawer) {
            drawer.classList.remove('open');
            document.body.style.overflow = '';
        }
    }

    updateCartDrawer() {
        const drawerBody = document.getElementById('cartDrawerBody');
        const drawerCount = document.getElementById('drawerCartCount');
        const drawerSubtotal = document.getElementById('drawerSubtotal');
        const drawerShipping = document.getElementById('drawerShipping');
        const drawerTax = document.getElementById('drawerTax');
        const drawerTotal = document.getElementById('drawerTotal');

        if (!drawerBody) return;

        const items = this.getItems();
        drawerCount.textContent = this.getItemCount();

        if (items.length === 0) {
            drawerBody.innerHTML = `
                <div class="cart-drawer-empty">
                    <div class="empty-cart-icon">🛒</div>
                    <p>Your cart is empty</p>
                    <a href="products.html" class="btn btn-primary">Shop Now</a>
                </div>
            `;
        } else {
            drawerBody.innerHTML = items.map(item => `
                <div class="cart-drawer-item" data-key="${item.key}">
                    <img src="${item.image}" alt="${item.name}" class="cart-drawer-item-image">
                    <div class="cart-drawer-item-details">
                        <h4>${item.name}</h4>
                        ${Object.keys(item.variants).length > 0 ? `
                            <p class="cart-drawer-item-variants">
                                ${Object.entries(item.variants).map(([k, v]) => `${k}: ${v}`).join(', ')}
                            </p>
                        ` : ''}
                        <div class="cart-drawer-item-price">$${item.price.toFixed(2)}</div>
                        <div class="cart-drawer-item-quantity">
                            <button class="qty-btn" onclick="cart.updateQuantity('${item.key}', ${item.quantity - 1})">-</button>
                            <span>${item.quantity}</span>
                            <button class="qty-btn" onclick="cart.updateQuantity('${item.key}', ${item.quantity + 1})">+</button>
                        </div>
                    </div>
                    <button class="cart-drawer-item-remove" onclick="cart.removeItem('${item.key}')" aria-label="Remove item">&times;</button>
                </div>
            `).join('');
        }

        drawerSubtotal.textContent = `$${this.getSubtotal().toFixed(2)}`;
        drawerShipping.textContent = this.getShipping() === 0 ? 'FREE' : `$${this.getShipping().toFixed(2)}`;
        drawerTax.textContent = `$${this.getTax().toFixed(2)}`;
        drawerTotal.textContent = `$${this.getTotal().toFixed(2)}`;
    }
}

// Initialize global cart instance
const cart = new ShoppingCart();

// Update cart count on page load
document.addEventListener('DOMContentLoaded', () => {
    cart.updateCartCount();
});
