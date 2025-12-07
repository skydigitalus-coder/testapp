// Cart page functionality

document.addEventListener('DOMContentLoaded', function() {
    if (!document.getElementById('cartContent')) return;

    loadCartPage();
});

function loadCartPage() {
    const cartContent = document.getElementById('cartContent');
    const items = cart.getItems();

    if (items.length === 0) {
        cartContent.innerHTML = `
            <div class="empty-cart">
                <div class="empty-cart-icon">🛒</div>
                <h2>Your cart is empty</h2>
                <p>Add some items to get started!</p>
                <a href="products.html" class="btn btn-primary">Shop Now</a>
            </div>
        `;
        return;
    }

    let html = '<div class="cart-items">';

    items.forEach(item => {
        html += `
            <div class="cart-item" data-item-id="${item.id}">
                <div class="cart-item-image">${item.icon}</div>
                <div class="cart-item-details">
                    <div class="cart-item-name">${item.name}</div>
                    <div class="cart-item-price">${formatCurrency(item.price)}</div>
                    <div class="cart-item-quantity">
                        <button class="quantity-btn decrease-qty" data-item-id="${item.id}">-</button>
                        <span class="quantity-value">${item.quantity}</span>
                        <button class="quantity-btn increase-qty" data-item-id="${item.id}">+</button>
                    </div>
                </div>
                <button class="remove-item" data-item-id="${item.id}">×</button>
            </div>
        `;
    });

    html += '</div>';

    // Add cart summary
    const subtotal = cart.getSubtotal();
    const tax = cart.getTax();
    const total = cart.getTotal();

    html += `
        <div class="cart-summary">
            <h3>Order Summary</h3>
            <div class="summary-row">
                <span>Subtotal:</span>
                <span>${formatCurrency(subtotal)}</span>
            </div>
            <div class="summary-row">
                <span>Tax (8%):</span>
                <span>${formatCurrency(tax)}</span>
            </div>
            <div class="summary-row total">
                <span>Total:</span>
                <span>${formatCurrency(total)}</span>
            </div>
            <button class="btn btn-primary checkout-btn">Proceed to Checkout</button>
            <a href="products.html" class="btn btn-secondary" style="width: 100%; margin-top: 0.5rem;">Continue Shopping</a>
        </div>
    `;

    cartContent.innerHTML = html;

    // Add event listeners
    setupCartEventListeners();
}

function setupCartEventListeners() {
    // Increase quantity buttons
    document.querySelectorAll('.increase-qty').forEach(btn => {
        btn.addEventListener('click', function() {
            const itemId = parseInt(this.getAttribute('data-item-id'));
            const item = cart.getItems().find(i => i.id === itemId);
            if (item) {
                cart.updateQuantity(itemId, item.quantity + 1);
                loadCartPage();
            }
        });
    });

    // Decrease quantity buttons
    document.querySelectorAll('.decrease-qty').forEach(btn => {
        btn.addEventListener('click', function() {
            const itemId = parseInt(this.getAttribute('data-item-id'));
            const item = cart.getItems().find(i => i.id === itemId);
            if (item) {
                cart.updateQuantity(itemId, item.quantity - 1);
                loadCartPage();
            }
        });
    });

    // Remove item buttons
    document.querySelectorAll('.remove-item').forEach(btn => {
        btn.addEventListener('click', function() {
            const itemId = parseInt(this.getAttribute('data-item-id'));
            if (confirm('Remove this item from your cart?')) {
                cart.removeItem(itemId);
                loadCartPage();
            }
        });
    });

    // Checkout button
    const checkoutBtn = document.querySelector('.checkout-btn');
    if (checkoutBtn) {
        checkoutBtn.addEventListener('click', function() {
            alert('Checkout functionality would be implemented here.\n\nTotal: ' + formatCurrency(cart.getTotal()));
        });
    }
}
