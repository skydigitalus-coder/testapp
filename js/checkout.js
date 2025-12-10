// Checkout Page Logic

let checkoutData = {
    customer: {},
    shipping: {},
    shippingMethod: 'standard',
    payment: {},
    paymentMethod: 'card'
};

document.addEventListener('DOMContentLoaded', function() {
    if (!document.getElementById('checkoutForm')) return;

    // Check if cart is empty
    if (cart.getItemCount() === 0) {
        window.location.href = 'cart.html';
        return;
    }

    initializeCheckout();
});

function initializeCheckout() {
    renderCheckoutSummary();
    setupFormListeners();
    loadSavedData();
}

function renderCheckoutSummary() {
    const items = cart.getItems();
    const cartItemsContainer = document.getElementById('checkoutCartItems');

    if (cartItemsContainer) {
        cartItemsContainer.innerHTML = items.map(item => `
            <div class="order-review-item">
                <img src="${item.image}" alt="${item.name}">
                <div class="order-review-details">
                    <h4>${item.name}</h4>
                    <p>Qty: ${item.quantity}</p>
                    ${Object.keys(item.variants).length > 0 ? `
                        <p>${Object.entries(item.variants).map(([k, v]) => `${k}: ${v}`).join(', ')}</p>
                    ` : ''}
                </div>
                <div class="order-review-price">$${(item.price * item.quantity).toFixed(2)}</div>
            </div>
        `).join('');
    }

    updateCheckoutTotals();
}

function updateCheckoutTotals() {
    const subtotal = cart.getSubtotal();
    const shipping = cart.getShipping();
    const tax = cart.getTax();
    const discount = cart.getDiscount();
    const total = cart.getTotal();

    document.getElementById('checkoutSubtotal').textContent = `$${subtotal.toFixed(2)}`;
    document.getElementById('checkoutShipping').textContent = shipping === 0 ? 'FREE' : `$${shipping.toFixed(2)}`;
    document.getElementById('checkoutTax').textContent = `$${tax.toFixed(2)}`;
    document.getElementById('checkoutTotal').textContent = `$${total.toFixed(2)}`;

    // Update standard shipping price display
    const standardPriceEl = document.getElementById('standard-price');
    if (standardPriceEl) {
        standardPriceEl.textContent = subtotal >= 75 ? 'FREE' : '$5.99';
    }

    if (discount > 0) {
        document.getElementById('checkoutDiscountRow').style.display = 'flex';
        document.getElementById('checkoutDiscount').textContent = `-$${discount.toFixed(2)}`;
    } else {
        document.getElementById('checkoutDiscountRow').style.display = 'none';
    }
}

function setupFormListeners() {
    // Create account checkbox
    const createAccountCheckbox = document.getElementById('createAccount');
    if (createAccountCheckbox) {
        createAccountCheckbox.addEventListener('change', function() {
            document.getElementById('passwordFields').style.display = this.checked ? 'block' : 'none';
        });
    }

    // Form submission
    const form = document.getElementById('checkoutForm');
    if (form) {
        form.addEventListener('submit', handleCheckoutSubmit);
    }

    // Real-time validation
    setupRealTimeValidation();
}

function setupRealTimeValidation() {
    const inputs = document.querySelectorAll('input[required], select[required]');

    inputs.forEach(input => {
        input.addEventListener('blur', function() {
            validateField(this);
        });

        input.addEventListener('input', function() {
            if (this.classList.contains('error')) {
                validateField(this);
            }
        });
    });

    // Card number formatting
    const cardNumber = document.getElementById('cardNumber');
    if (cardNumber) {
        cardNumber.addEventListener('input', function(e) {
            let value = e.target.value.replace(/\s/g, '');
            let formattedValue = value.match(/.{1,4}/g)?.join(' ') || value;
            e.target.value = formattedValue;
        });
    }

    // Expiry date formatting
    const cardExpiry = document.getElementById('cardExpiry');
    if (cardExpiry) {
        cardExpiry.addEventListener('input', function(e) {
            let value = e.target.value.replace(/\D/g, '');
            if (value.length >= 2) {
                value = value.substring(0, 2) + '/' + value.substring(2, 4);
            }
            e.target.value = value;
        });
    }

    // Phone number formatting
    const phone = document.getElementById('phone');
    if (phone) {
        phone.addEventListener('input', function(e) {
            let value = e.target.value.replace(/\D/g, '');
            if (value.length >= 10) {
                value = `(${value.substring(0, 3)}) ${value.substring(3, 6)}-${value.substring(6, 10)}`;
            }
            e.target.value = value;
        });
    }
}

function validateField(field) {
    const value = field.value.trim();
    const errorMessage = field.parentElement.querySelector('.error-message');
    let isValid = true;

    if (field.required && !value) {
        isValid = false;
    }

    if (field.type === 'email' && value && !isValidEmail(value)) {
        isValid = false;
    }

    if (field.id === 'zipCode' && value && !/^\d{5}$/.test(value)) {
        isValid = false;
    }

    if (field.id === 'cardNumber' && value && !isValidCardNumber(value)) {
        isValid = false;
    }

    if (field.id === 'cardCvv' && value && !/^\d{3,4}$/.test(value.replace(/\D/g, ''))) {
        isValid = false;
    }

    if (isValid) {
        field.classList.remove('error');
        if (errorMessage) errorMessage.classList.remove('show');
    } else {
        field.classList.add('error');
        if (errorMessage) errorMessage.classList.add('show');
    }

    return isValid;
}

function isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function isValidCardNumber(cardNumber) {
    const cleaned = cardNumber.replace(/\s/g, '');
    return /^\d{13,19}$/.test(cleaned);
}

function nextStep(stepName) {
    const currentStep = document.querySelector('.checkout-step.active');

    // Validate current step
    if (!validateCurrentStep(currentStep)) {
        return;
    }

    // Save current step data
    saveStepData(currentStep);

    // Hide current step
    currentStep.classList.remove('active');

    // Show next step
    const nextStepEl = document.getElementById(`step-${stepName}`);
    if (nextStepEl) {
        nextStepEl.classList.add('active');

        // Update progress indicator
        updateProgressIndicator(stepName);

        // Scroll to top
        window.scrollTo({ top: 0, behavior: 'smooth' });

        // Special handling for review step
        if (stepName === 'review') {
            populateReviewStep();
        }
    }
}

function prevStep(stepName) {
    const currentStep = document.querySelector('.checkout-step.active');
    currentStep.classList.remove('active');

    const prevStepEl = document.getElementById(`step-${stepName}`);
    if (prevStepEl) {
        prevStepEl.classList.add('active');
        updateProgressIndicator(stepName);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }
}

function validateCurrentStep(stepElement) {
    const inputs = stepElement.querySelectorAll('input[required], select[required]');
    let isValid = true;

    inputs.forEach(input => {
        if (!validateField(input)) {
            isValid = false;
        }
    });

    if (!isValid) {
        alert('Please fill in all required fields correctly.');
    }

    return isValid;
}

function saveStepData(stepElement) {
    const stepId = stepElement.id;

    if (stepId === 'step-customer') {
        checkoutData.customer = {
            email: document.getElementById('email').value,
            createAccount: document.getElementById('createAccount').checked,
            password: document.getElementById('password')?.value || ''
        };
    } else if (stepId === 'step-shipping') {
        checkoutData.shipping = {
            firstName: document.getElementById('firstName').value,
            lastName: document.getElementById('lastName').value,
            address: document.getElementById('address').value,
            apartment: document.getElementById('apartment').value,
            city: document.getElementById('city').value,
            state: document.getElementById('state').value,
            zipCode: document.getElementById('zipCode').value,
            phone: document.getElementById('phone').value
        };
    } else if (stepId === 'step-shipping-method') {
        const selectedMethod = document.querySelector('input[name="shippingMethod"]:checked').value;
        checkoutData.shippingMethod = selectedMethod;
        cart.setShippingMethod(selectedMethod);
        updateCheckoutTotals();
    } else if (stepId === 'step-payment') {
        if (checkoutData.paymentMethod === 'card') {
            checkoutData.payment = {
                cardNumber: document.getElementById('cardNumber').value.replace(/\s/g, ''),
                cardName: document.getElementById('cardName').value,
                cardExpiry: document.getElementById('cardExpiry').value,
                cardCvv: document.getElementById('cardCvv').value,
                billingAddressSame: document.getElementById('billingAddressSame').checked
            };
        }
    }
}

function updateProgressIndicator(stepName) {
    const steps = {
        'customer': 2,
        'shipping': 2,
        'shipping-method': 2,
        'payment': 3,
        'review': 3
    };

    const stepNumber = steps[stepName] || 2;

    // Reset all steps
    for (let i = 2; i <= 4; i++) {
        const step = document.getElementById(`progress-step-${i}`);
        if (step) {
            step.classList.remove('active', 'completed');
            if (i < stepNumber) {
                step.classList.add('completed');
            } else if (i === stepNumber) {
                step.classList.add('active');
            }
        }
    }
}

function selectShipping(method, element) {
    document.querySelectorAll('.shipping-method').forEach(el => {
        el.classList.remove('selected');
    });
    element.classList.add('selected');

    cart.setShippingMethod(method);
    updateCheckoutTotals();
}

function selectPayment(method, button) {
    checkoutData.paymentMethod = method;

    document.querySelectorAll('.payment-method-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    button.classList.add('active');

    // Hide all payment forms
    document.querySelectorAll('.payment-form').forEach(form => {
        form.style.display = 'none';
    });

    // Show selected payment form
    const formId = `${method}-payment`;
    const form = document.getElementById(formId);
    if (form) {
        form.style.display = 'block';
    }
}

function populateReviewStep() {
    // Render order items
    const items = cart.getItems();
    const reviewItemsContainer = document.getElementById('reviewOrderItems');

    reviewItemsContainer.innerHTML = items.map(item => `
        <div class="order-review-item">
            <img src="${item.image}" alt="${item.name}">
            <div class="order-review-details">
                <h4>${item.name}</h4>
                <p>Quantity: ${item.quantity}</p>
                ${Object.keys(item.variants).length > 0 ? `
                    <p style="color: #6b7280;">${Object.entries(item.variants).map(([k, v]) => `${k}: ${v}`).join(', ')}</p>
                ` : ''}
            </div>
            <div class="order-review-price">$${(item.price * item.quantity).toFixed(2)}</div>
        </div>
    `).join('');

    // Populate shipping address
    const shipping = checkoutData.shipping;
    document.getElementById('reviewShippingAddress').innerHTML = `
        <strong>${shipping.firstName} ${shipping.lastName}</strong><br>
        ${shipping.address}${shipping.apartment ? ', ' + shipping.apartment : ''}<br>
        ${shipping.city}, ${shipping.state} ${shipping.zipCode}<br>
        ${shipping.phone}
    `;

    // Populate payment method
    let paymentText = 'Credit/Debit Card';
    if (checkoutData.paymentMethod === 'paypal') {
        paymentText = 'PayPal';
    } else if (checkoutData.paymentMethod === 'applepay') {
        paymentText = 'Apple Pay';
    } else if (checkoutData.payment.cardNumber) {
        const lastFour = checkoutData.payment.cardNumber.slice(-4);
        paymentText = `Card ending in ${lastFour}`;
    }

    document.getElementById('reviewPaymentMethod').textContent = paymentText;
}

function handleCheckoutSubmit(e) {
    e.preventDefault();

    // Validate terms agreement
    if (!document.getElementById('agreeToTerms').checked) {
        alert('Please agree to the Terms of Service and Privacy Policy to continue.');
        return;
    }

    // Show loading state
    const submitBtn = document.getElementById('placeOrderBtn');
    const originalText = submitBtn.textContent;
    submitBtn.disabled = true;
    submitBtn.textContent = 'Processing...';

    // Simulate order processing
    setTimeout(() => {
        // Generate order number
        const orderNumber = generateOrderNumber();

        // Save order to localStorage
        const order = {
            orderNumber,
            date: new Date().toISOString(),
            items: cart.getItems(),
            customer: checkoutData.customer,
            shipping: checkoutData.shipping,
            shippingMethod: checkoutData.shippingMethod,
            paymentMethod: checkoutData.paymentMethod,
            subtotal: cart.getSubtotal(),
            shipping: cart.getShipping(),
            tax: cart.getTax(),
            discount: cart.getDiscount(),
            total: cart.getTotal()
        };

        localStorage.setItem('lastOrder', JSON.stringify(order));

        // Clear cart
        cart.clearCart();

        // Redirect to confirmation page
        window.location.href = `order-confirmation.html?order=${orderNumber}`;
    }, 2000);
}

function generateOrderNumber() {
    const timestamp = Date.now();
    const random = Math.floor(Math.random() * 1000);
    return `PB${timestamp}${random}`.substring(0, 16);
}

function loadSavedData() {
    // Load shipping method from cart if already set
    if (cart.shippingMethod && cart.shippingMethod.method) {
        const radio = document.querySelector(`input[value="${cart.shippingMethod.method}"]`);
        if (radio) {
            radio.checked = true;
            const method = radio.closest('.shipping-method');
            if (method) {
                document.querySelectorAll('.shipping-method').forEach(m => m.classList.remove('selected'));
                method.classList.add('selected');
            }
        }
    }
}
