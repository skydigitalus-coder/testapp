/**
 * Shopify Storefront API Client
 * Handles all interactions with Shopify for products, cart, and checkout
 */

class ShopifyClient {
    constructor() {
        this.client = null;
        this.checkout = null;
        this.selectedLocation = null;
        this.initializeClient();
    }

    /**
     * Initialize Shopify Buy SDK
     */
    initializeClient() {
        // Check if config is loaded
        if (typeof SHOPIFY_CONFIG === 'undefined') {
            console.error('Shopify configuration not loaded. Please include config/shopify.js');
            return;
        }

        // Initialize Shopify Buy SDK
        this.client = ShopifyBuy.buildClient({
            domain: SHOPIFY_CONFIG.domain,
            storefrontAccessToken: SHOPIFY_CONFIG.storefrontAccessToken
        });

        console.log('Shopify client initialized');

        // Load existing checkout from localStorage
        this.loadCheckout();
    }

    /**
     * Fetch all products
     */
    async fetchAllProducts() {
        try {
            const products = await this.client.product.fetchAll();
            return this.formatProducts(products);
        } catch (error) {
            console.error('Error fetching products:', error);
            return [];
        }
    }

    /**
     * Fetch products by collection
     */
    async fetchProductsByCollection(collectionHandle) {
        try {
            const collectionId = SHOPIFY_CONFIG.collections[collectionHandle];
            if (!collectionId) {
                console.warn(`Collection ${collectionHandle} not found in config`);
                return [];
            }

            const collection = await this.client.collection.fetchWithProducts(collectionId);
            return this.formatProducts(collection.products);
        } catch (error) {
            console.error('Error fetching collection:', error);
            return [];
        }
    }

    /**
     * Search products
     */
    async searchProducts(query) {
        try {
            const products = await this.fetchAllProducts();
            return products.filter(product =>
                product.name.toLowerCase().includes(query.toLowerCase()) ||
                (product.description && product.description.toLowerCase().includes(query.toLowerCase()))
            );
        } catch (error) {
            console.error('Error searching products:', error);
            return [];
        }
    }

    /**
     * Format Shopify products to match our UI structure
     */
    formatProducts(shopifyProducts) {
        return shopifyProducts.map(product => {
            const variant = product.variants[0]; // Use first variant

            return {
                id: product.id,
                variantId: variant.id,
                name: product.title,
                description: product.description,
                price: parseFloat(variant.price.amount),
                comparePrice: variant.compareAtPrice ? parseFloat(variant.compareAtPrice.amount) : null,
                images: product.images.map(img => img.src),
                image: product.images[0]?.src || 'https://via.placeholder.com/400x400/8b5cf6/ffffff?text=No+Image',
                available: variant.available,
                stock: variant.available ? 'in-stock' : 'out-of-stock',
                tags: product.tags || [],
                productType: product.productType,
                vendor: product.vendor,
                handle: product.handle,
                // For age verification
                requiresAgeVerification: true
            };
        });
    }

    /**
     * Create or load checkout
     */
    async loadCheckout() {
        const checkoutId = localStorage.getItem('shopifyCheckoutId');

        if (checkoutId) {
            try {
                this.checkout = await this.client.checkout.fetch(checkoutId);

                // If checkout is completed, create a new one
                if (this.checkout.completedAt) {
                    this.checkout = await this.client.checkout.create();
                    localStorage.setItem('shopifyCheckoutId', this.checkout.id);
                }
            } catch (error) {
                // If checkout doesn't exist, create new one
                this.checkout = await this.client.checkout.create();
                localStorage.setItem('shopifyCheckoutId', this.checkout.id);
            }
        } else {
            this.checkout = await this.client.checkout.create();
            localStorage.setItem('shopifyCheckoutId', this.checkout.id);
        }

        return this.checkout;
    }

    /**
     * Add item to cart
     */
    async addToCart(variantId, quantity = 1) {
        try {
            if (!this.checkout) {
                await this.loadCheckout();
            }

            const lineItemsToAdd = [{
                variantId: variantId,
                quantity: quantity,
                customAttributes: []
            }];

            // Add selected location as custom attribute if BOPIS
            if (this.selectedLocation) {
                lineItemsToAdd[0].customAttributes.push({
                    key: 'Pickup Location',
                    value: this.selectedLocation
                });
            }

            this.checkout = await this.client.checkout.addLineItems(this.checkout.id, lineItemsToAdd);

            // Trigger cart update event
            this.triggerCartUpdate();

            return this.checkout;
        } catch (error) {
            console.error('Error adding to cart:', error);
            throw error;
        }
    }

    /**
     * Remove item from cart
     */
    async removeFromCart(lineItemId) {
        try {
            this.checkout = await this.client.checkout.removeLineItems(this.checkout.id, [lineItemId]);
            this.triggerCartUpdate();
            return this.checkout;
        } catch (error) {
            console.error('Error removing from cart:', error);
            throw error;
        }
    }

    /**
     * Update line item quantity
     */
    async updateLineItem(lineItemId, quantity) {
        try {
            const lineItemsToUpdate = [{
                id: lineItemId,
                quantity: quantity
            }];

            this.checkout = await this.client.checkout.updateLineItems(this.checkout.id, lineItemsToUpdate);
            this.triggerCartUpdate();
            return this.checkout;
        } catch (error) {
            console.error('Error updating line item:', error);
            throw error;
        }
    }

    /**
     * Get current cart
     */
    async getCart() {
        if (!this.checkout) {
            await this.loadCheckout();
        }
        return this.checkout;
    }

    /**
     * Get cart item count
     */
    async getCartCount() {
        const cart = await this.getCart();
        return cart.lineItems.reduce((total, item) => total + item.quantity, 0);
    }

    /**
     * Set pickup location for BOPIS
     */
    setPickupLocation(locationKey) {
        const location = SHOPIFY_CONFIG.locations[locationKey];
        if (location) {
            this.selectedLocation = location.name;
            localStorage.setItem('selectedPickupLocation', locationKey);
            return location;
        }
        return null;
    }

    /**
     * Get selected pickup location
     */
    getPickupLocation() {
        const locationKey = localStorage.getItem('selectedPickupLocation');
        return locationKey ? SHOPIFY_CONFIG.locations[locationKey] : null;
    }

    /**
     * Go to checkout
     */
    async goToCheckout() {
        if (!this.checkout) {
            await this.loadCheckout();
        }

        // Add pickup location note if set
        if (this.selectedLocation) {
            await this.client.checkout.updateAttributes(this.checkout.id, {
                customAttributes: [{
                    key: 'Pickup Location',
                    value: this.selectedLocation
                }],
                note: `BOPIS - Pick up at: ${this.selectedLocation}`
            });
        }

        // Redirect to Shopify checkout
        window.location.href = this.checkout.webUrl;
    }

    /**
     * Trigger cart update event for UI updates
     */
    triggerCartUpdate() {
        const event = new CustomEvent('shopifyCartUpdated', {
            detail: { checkout: this.checkout }
        });
        window.dispatchEvent(event);
    }

    /**
     * Clear cart
     */
    async clearCart() {
        try {
            const lineItemIds = this.checkout.lineItems.map(item => item.id);
            if (lineItemIds.length > 0) {
                this.checkout = await this.client.checkout.removeLineItems(this.checkout.id, lineItemIds);
                this.triggerCartUpdate();
            }
            return this.checkout;
        } catch (error) {
            console.error('Error clearing cart:', error);
            throw error;
        }
    }
}

// Initialize global Shopify client
let shopifyClient;

// Wait for Shopify Buy SDK to load
if (typeof ShopifyBuy !== 'undefined') {
    shopifyClient = new ShopifyClient();
} else {
    console.warn('Shopify Buy SDK not loaded yet. Client will initialize when SDK is ready.');
}

// Export for use in other scripts
if (typeof module !== 'undefined' && module.exports) {
    module.exports = ShopifyClient;
}
