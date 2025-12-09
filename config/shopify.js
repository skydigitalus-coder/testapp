// Shopify Store Configuration
// Replace these values with your actual Shopify store credentials

const SHOPIFY_CONFIG = {
    // Your Shopify store domain (without https://)
    // Example: 'your-store-name.myshopify.com'
    domain: 'fsqf5y-4r.myshopify.com',

    // Storefront API Access Token
    // Generate this in Shopify Admin > Apps > Develop apps > Create an app
    // Then enable Storefront API and copy the access token
    storefrontAccessToken: 'c1ab5f37faaee7f24ffff71a810d314f',

    // Store location IDs for BOPIS
    // Get these from Shopify Admin > Settings > Locations
    locations: {
        kennewick: {
            id: 'gid://shopify/Location/80352051252',
            name: 'Kennewick, WA',
            address: '5300 W. Clearwater Avenue, Suite B, Kennewick, WA 99336',
            phone: '(509) 396-9700'
        },
        richland: {
            id: 'gid://shopify/Location/80342089780',
            name: 'Richland, WA',
            address: '960 George Washington Way, Richland, WA',
            phone: '(509) 396-9700'
        },
        pendleton: {
            id: 'gid://shopify/Location/80352247860',
            name: 'Pendleton, OR',
            address: 'Pendleton, Oregon',
            phone: '(509) 396-9700'
        }
    },

    // Collection IDs for product categories
    // Get these from your Shopify collections
    collections: {
        // Vape Products
        'eliquids': 'gid://shopify/Collection/305974968372',
        'disposable-vapes': 'gid://shopify/Collection/305980670004',
        'flum-vapes': 'gid://shopify/Collection/305980473396',
        'lost-mary-vapes': 'gid://shopify/Collection/305980375092',
        'elf-bar-vapes': 'gid://shopify/Collection/305980342324',
        'geek-bar-vapes': 'gid://shopify/Collection/305980244020',
        'pods-pod-mods': 'gid://shopify/Collection/305975033308',
        'box-mods-kits': 'gid://shopify/Collection/305975001140',
        'coils-accessories': 'gid://shopify/Collection/305975066676',

        // Smoking Accessories
        'glass-pipes': 'gid://shopify/Collection/305977393204',
        'silicone-pipes': 'gid://shopify/Collection/305977425972',
        'smoking-accessories': 'gid://shopify/Collection/305977262132',
        'lighters-torches': 'gid://shopify/Collection/305977524276',
        'scales': 'gid://shopify/Collection/305977491508',

        // Specialty Products
        'kratom': 'gid://shopify/Collection/305977229364',
        'detox-kits': 'gid://shopify/Collection/305977458740',

        // Other Categories
        'clothing': 'gid://shopify/Collection/305980604468',
        'seasonal-limited': 'gid://shopify/Collection/305975230516',
        'customer-favorites': 'gid://shopify/Collection/305975164980',
        'new-arrivals': 'gid://shopify/Collection/305975132212',
        'top-picks': 'gid://shopify/Collection/305968807988'
    }
};

// Export configuration
if (typeof module !== 'undefined' && module.exports) {
    module.exports = SHOPIFY_CONFIG;
}
