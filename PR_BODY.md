## Summary
This PR completes the Shopify e-commerce integration for Pandora's Box Smoke Shop, enabling real-time product loading, shopping cart functionality, and Buy Online Pick Up In Store (BOPIS) capabilities across all 4 store locations.

## What's Included

### 1. Shopify Configuration (3f03918)
- **File**: `config/shopify.js`
- Configured store credentials for `fsqf5y-4r.myshopify.com`
- Added Storefront API access token
- Mapped all 4 store locations (Kennewick, Richland, Umatilla, Pendleton)
- Set up product collection IDs structure

### 2. Products Page Integration (5c47350)
- **File**: `products.html`
- Integrated Shopify Buy Button SDK
- Added BOPIS location selector with visual feedback
- Implemented real-time product loading from Shopify API
- Added loading spinner and empty state handling
- Built product card rendering with:
  - Product images with fallback
  - Pricing (including compare-at pricing for sales)
  - Stock status
  - "Add to Cart" buttons
- Implemented product filtering:
  - Search by name/description
  - Filter by category
  - Sort by name/price (ascending/descending)
- Cart count badge updates across navigation
- Pickup location persistence in localStorage

### 3. Diagnostic Tool (ef63c1d)
- **File**: `shopify-test.html`
- Built comprehensive diagnostic page to troubleshoot Shopify connection
- Tests configuration, SDK loading, API connection, and product fetching
- Displays detailed error messages and solutions
- Helps identify common issues:
  - Products not published to "Online Store" channel
  - Missing API permissions
  - Configuration errors

## Technical Details

**Shopify Integration:**
- Uses Shopify Buy Button SDK for client-side integration
- Storefront API for reading products and managing cart
- Custom ShopifyClient class (`js/shopify-client.js`) handles all API interactions
- Cart persists across page loads using Shopify checkout sessions

**BOPIS Implementation:**
- Location selector UI with radio buttons
- Selected location saved to localStorage
- Location attached to cart items as custom attribute
- Location included in checkout notes for store fulfillment

**Features:**
- ✅ Real-time product inventory from Shopify
- ✅ Shopping cart with persistent checkout
- ✅ BOPIS location selection
- ✅ Product search and filtering
- ✅ Responsive design (mobile & desktop)
- ✅ Loading states and error handling
- ✅ Age verification (21+)

## Testing Instructions

### Basic Test Flow:
1. Open `products.html` in browser
2. Select a pickup location
3. Verify products load from Shopify
4. Test search/filter functionality
5. Add product to cart
6. Verify cart count updates
7. Check that location persists on refresh

### Troubleshooting:
If products don't load, open `shopify-test.html` to diagnose:
- Verify configuration is correct
- Check API connection
- See detailed error messages
- Get step-by-step solutions

## Known Limitations

1. **Location IDs**: Currently using placeholder IDs in config. Need to be updated with actual Shopify location IDs once set up in Shopify Admin.

2. **Collection IDs**: Placeholder IDs for product collections. Update when collections are created in Shopify.

3. **Products Must Be Published**: Products must be published to "Online Store" sales channel to appear on the site.

## Next Steps After Merge

1. **In Shopify Admin**:
   - Add store locations (Settings → Locations)
   - Enable local pickup (Settings → Shipping)
   - Create product collections
   - Ensure products are published to "Online Store"
   - Update `config/shopify.js` with actual location and collection IDs

2. **Test Checkout Flow**:
   - Complete a test order
   - Verify BOPIS location appears at checkout
   - Test payment processing

3. **Import Full Inventory**:
   - Add all products to Shopify
   - Organize into collections
   - Set inventory levels by location

## Files Changed
- `config/shopify.js` - Shopify configuration
- `products.html` - Full Shopify integration
- `shopify-test.html` - Diagnostic tool (new file)

## Dependencies
- Shopify Buy Button SDK (loaded via CDN)
- Existing: `js/shopify-client.js`, `config/shopify.js`

## Preview
The products page now:
- Loads real products from Shopify store
- Allows customers to select pickup location
- Provides working shopping cart
- Redirects to Shopify checkout for payment
- Filters and sorts products client-side

---

**Store**: fsqf5y-4r.myshopify.com
**Integration**: Storefront API
**Locations**: 4 stores (WA & OR)
