# Shopify Integration Setup Guide

This guide will help you connect your Pandora's Box website to your Shopify store.

## Step 1: Get Your Shopify Storefront API Credentials

### 1.1 Create a Custom App in Shopify

1. Log into your Shopify Admin
2. Go to **Settings** → **Apps and sales channels**
3. Click **Develop apps** (or **Manage private apps** if using older Shopify)
4. Click **Create an app**
5. Name it: `Pandora's Box Storefront`
6. Click **Create app**

### 1.2 Configure Storefront API Access

1. Click **Configure Storefront API scopes**
2. Enable the following permissions:
   - ✅ `unauthenticated_read_product_listings`
   - ✅ `unauthenticated_read_product_inventory`
   - ✅ `unauthenticated_read_checkouts`
   - ✅ `unauthenticated_write_checkouts`
   - ✅ `unauthenticated_read_customers`
3. Click **Save**

### 1.3 Get Your Access Token

1. Click **API credentials** tab
2. Under **Storefront API access token**, click **Install app**
3. Copy the **Storefront API access token** (starts with `shpat_`)
4. **⚠️ Save this token securely - you won't see it again!**

## Step 2: Configure Your Website

### 2.1 Update `config/shopify.js`

Open `/config/shopify.js` and replace the placeholder values:

```javascript
const SHOPIFY_CONFIG = {
    // Replace with your store's domain
    domain: 'pandoras-box-shop.myshopify.com', // YOUR STORE HERE

    // Paste your Storefront API access token
    storefrontAccessToken: 'shpat_1234567890abcdef...', // YOUR TOKEN HERE

    // ... rest of config
};
```

## Step 3: Set Up Store Locations for BOPIS

### 3.1 Add Locations in Shopify

1. In Shopify Admin, go to **Settings** → **Locations**
2. Add all 3 store locations:
   - Kennewick, WA
   - Richland, WA
   - Pendleton, OR

### 3.2 Get Location IDs

1. For each location, click **Edit**
2. Look at the URL - it will contain the location ID
3. Example: `https://admin.shopify.com/store/your-store/settings/locations/12345678`
   - The ID is `12345678`
4. Convert to GraphQL format: `gid://shopify/Location/12345678`

### 3.3 Update Location IDs in Config

Update `config/shopify.js` with your actual location IDs:

```javascript
locations: {
    kennewick: {
        id: 'gid://shopify/Location/12345678', // YOUR ACTUAL ID
        name: 'Kennewick, WA',
        // ...
    },
    // ... other locations
}
```

## Step 4: Set Up Product Collections

### 4.1 Create Collections in Shopify

1. Go to **Products** → **Collections**
2. Create these collections:
   - E-Liquids
   - Glass Pipes
   - Kratom
   - Detox
   - Vapes
   - Accessories

### 4.2 Get Collection IDs

1. Click on each collection
2. Look at the URL: `https://admin.shopify.com/store/your-store/collections/123456789`
3. The ID is `123456789`
4. Convert to GraphQL: `gid://shopify/Collection/123456789`

### 4.3 Update Collection IDs in Config

```javascript
collections: {
    'eliquids': 'gid://shopify/Collection/123456789', // YOUR ACTUAL ID
    'glass-pipes': 'gid://shopify/Collection/987654321',
    // ... other collections
}
```

## Step 5: Configure Local Pickup in Shopify

### 5.1 Enable Local Pickup

1. Go to **Settings** → **Shipping and delivery**
2. Scroll to **Local pickup**
3. Click **Add local pickup**
4. Select your store locations
5. Set pickup instructions (optional)
6. Click **Save**

### 5.2 Test BOPIS Flow

1. Add a product to cart on your website
2. Select a pickup location
3. Go to checkout
4. Verify "Pick up" option appears at your selected location

## Step 6: Add Products to Shopify

### 6.1 Product Requirements

For each product, ensure you have:
- ✅ Product title
- ✅ Description
- ✅ Price
- ✅ At least one image
- ✅ Inventory tracked by location
- ✅ Assigned to appropriate collection

### 6.2 Age Verification Products

For age-restricted products (21+):
1. Add tag: `age-restricted` or `21+`
2. This will trigger age verification at checkout

## Step 7: Install Shopify Buy SDK

The Shopify Buy Button SDK is already referenced in your HTML files. Ensure this line is present in your `<head>`:

```html
<script src="https://sdks.shopifycdn.com/buy-button/latest/buy-button-storefront.min.js"></script>
```

## Step 8: Test Your Integration

### 8.1 Test Checklist

- [ ] Products load on products.html
- [ ] Add to cart works
- [ ] Cart displays correctly
- [ ] Location selector appears
- [ ] Checkout redirects to Shopify
- [ ] Pickup location shows in checkout
- [ ] Age verification works
- [ ] Order completes successfully

### 8.2 Test Mode

Shopify provides test mode for development:
1. Use Shopify's test credit cards
2. Enable test mode in Shopify Payments settings
3. Orders will be marked as "test"

## Step 9: Go Live

### 9.1 Pre-Launch Checklist

- [ ] All real products added to Shopify
- [ ] All 3 locations configured
- [ ] BOPIS enabled
- [ ] Payment gateway configured
- [ ] Taxes configured for WA and OR
- [ ] Shipping policies set
- [ ] Age verification app installed (optional)
- [ ] Test orders completed successfully

### 9.2 Launch!

1. Remove test products
2. Enable production mode
3. Update DNS to point to GitHub Pages
4. Announce launch!

## Troubleshooting

### Products Not Loading

**Problem**: Products don't appear on the website

**Solutions**:
1. Check browser console for errors
2. Verify Storefront API token is correct
3. Ensure products are published to "Online Store" sales channel
4. Check that collections are not empty

### Checkout Issues

**Problem**: Can't complete checkout

**Solutions**:
1. Verify payment gateway is set up
2. Check that Shopify Payments is enabled
3. Ensure local pickup locations are configured
4. Test with Shopify's test credit cards

### Location Not Showing

**Problem**: Pickup location doesn't appear at checkout

**Solutions**:
1. Verify location IDs are correct in config
2. Ensure local pickup is enabled in Shopify settings
3. Check that product has inventory at selected location
4. Verify location is active

## Support

For Shopify-specific issues:
- **Shopify Help Center**: https://help.shopify.com
- **Shopify Community**: https://community.shopify.com

For website issues:
- Email: pandorasbox_123@yahoo.com
- Phone: (509) 396-9700

## Additional Resources

- [Shopify Storefront API Docs](https://shopify.dev/docs/api/storefront)
- [Shopify Buy Button SDK](https://shopify.github.io/buy-button-js/)
- [Local Pickup Guide](https://help.shopify.com/en/manual/shipping/setting-up-and-managing-your-shipping/local-methods/local-pickup)

---

**Last Updated**: December 2024
