# 🚀 Shopify Integration - Quick Start

Get your Pandora's Box website connected to Shopify in minutes!

## ⚡ Quick Setup (5 Minutes)

### Step 1: Get Your Shopify Credentials (2 min)

1. Log into your Shopify Admin
2. Go to **Settings** → **Apps and sales channels** → **Develop apps**
3. Click **Create an app**, name it `Pandora's Box Storefront`
4. Click **Configure Storefront API scopes**
5. Enable these permissions:
   - `unauthenticated_read_product_listings`
   - `unauthenticated_read_checkouts`
   - `unauthenticated_write_checkouts`
6. Click **Save** → **Install app**
7. Copy your **Storefront API access token** (starts with `shpat_`)

### Step 2: Configure Your Website (2 min)

1. Open `config/shopify.js`
2. Replace `YOUR_STORE_NAME` with your Shopify store domain
   ```javascript
   domain: 'your-store-name.myshopify.com', // Example: pandoras-box.myshopify.com
   ```
3. Replace `YOUR_STOREFRONT_ACCESS_TOKEN` with the token you just copied
   ```javascript
   storefrontAccessToken: 'shpat_abc123...', // Paste your actual token
   ```

### Step 3: Test It! (1 min)

1. Open `shopify-products.html` in your browser
2. You should see your Shopify products loading!
3. Try adding a product to cart
4. Click "Go to Checkout" - you'll be redirected to Shopify checkout

## ✅ That's It - You're Live!

Your website is now connected to Shopify. Customers can:
- Browse your real products
- Add to cart
- Select pickup location (BOPIS)
- Checkout through Shopify
- Pay securely

## 🎯 Next Steps

### Add Store Locations for BOPIS

1. In Shopify Admin: **Settings** → **Locations**
2. Add all 4 stores (Kennewick, Richland, Umatilla, Pendleton)
3. Enable **Local pickup** in **Settings** → **Shipping**
4. Get location IDs and update `config/shopify.js`

See [SHOPIFY_SETUP.md](SHOPIFY_SETUP.md) for detailed location setup.

### Integrate into Your Main Pages

The example page `shopify-products.html` shows you how to:
- Load products from Shopify
- Add to cart functionality
- BOPIS location selector
- Checkout integration

Copy this code into your main `products.html` page to replace the static product data.

## 🧪 Test Mode

Your Shopify store is probably in test mode. Use these test credit cards:

- **Visa**: `4242 4242 4242 4242`
- **Expiry**: Any future date
- **CVV**: Any 3 digits

## 📖 Full Documentation

- **[SHOPIFY_SETUP.md](SHOPIFY_SETUP.md)** - Complete setup guide
- **Shopify Docs** - https://shopify.dev/docs/api/storefront

## ❓ Troubleshooting

### Products Not Showing?

**Check:**
1. Is your Storefront API token correct in `config/shopify.js`?
2. Are your products published to "Online Store" sales channel?
3. Check browser console for errors (F12)

### Can't Checkout?

**Check:**
1. Is Shopify Payments enabled?
2. Have you set up a payment gateway?
3. Try with a test credit card

## 🎉 You're Ready!

Your e-commerce site is now fully functional with:
- ✅ Real product inventory from Shopify
- ✅ Secure checkout
- ✅ Buy Online, Pick Up In Store (BOPIS)
- ✅ Professional design
- ✅ Age verification (21+)

**Questions?**
- Email: pandorasbox_123@yahoo.com
- Phone: (509) 396-9700
