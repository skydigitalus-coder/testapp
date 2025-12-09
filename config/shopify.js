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
            id: 'gid://shopify/Location/KENNEWICK_LOCATION_ID',
            name: 'Kennewick, WA',
            address: '5300 W. Clearwater Avenue, Suite B, Kennewick, WA 99336',
            phone: '(509) 396-9700'
        },
        richland: {
            id: 'gid://shopify/Location/RICHLAND_LOCATION_ID',
            name: 'Richland, WA',
            address: '960 George Washington Way, Richland, WA',
            phone: '(509) 396-9700'
        },
        umatilla: {
            id: 'gid://shopify/Location/UMATILLA_LOCATION_ID',
            name: 'Umatilla, OR',
            address: 'Umatilla, Oregon',
            phone: '(509) 396-9700'
        },
        pendleton: {
            id: 'gid://shopify/Location/PENDLETON_LOCATION_ID',
            name: 'Pendleton, OR',
            address: 'Pendleton, Oregon',
            phone: '(509) 396-9700'
        }
    },

    // Collection IDs for product categories
    // Get these from your Shopify collections
    collections: {
        'eliquids': 'gid://shopify/Collection/E_LIQUIDS_COLLECTION_ID',
        'glass-pipes': 'gid://shopify/Collection/GLASS_PIPES_COLLECTION_ID',
        'kratom': 'gid://shopify/Collection/KRATOM_COLLECTION_ID',
        'detox': 'gid://shopify/Collection/DETOX_COLLECTION_ID',
        'vapes': 'gid://shopify/Collection/VAPES_COLLECTION_ID',
        'accessories': 'gid://shopify/Collection/ACCESSORIES_COLLECTION_ID'
    }
};

// Export configuration
if (typeof module !== 'undefined' && module.exports) {
    module.exports = SHOPIFY_CONFIG;
}
