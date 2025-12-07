# VapeHub - Mobile-First Vape & Novelty Store

A fully responsive, mobile-first retail website for a vape and novelty store built with vanilla HTML, CSS, and JavaScript.

## Features

### 🔒 Age Verification
- Required age gate (21+) on first visit
- Stores verification in localStorage
- Compliant with vaping product regulations

### 📱 Mobile-First Design
- Fully responsive layout optimized for mobile devices
- Works seamlessly on tablets and desktops
- Touch-friendly navigation and interactions
- Sticky header for easy navigation

### 🛍️ Shopping Experience
- Browse products by category (Vapes, E-Liquids, Accessories, Novelties)
- Search functionality
- Filter by category
- Sort by name or price
- Featured products section
- 24 sample products included

### 🛒 Shopping Cart
- Add/remove items
- Adjust quantities
- LocalStorage persistence (cart survives page refreshes)
- Real-time cart count badge
- Automatic tax calculation (8%)
- Subtotal and total calculations
- Toast notifications when items are added

### 🎨 Modern UI/UX
- Clean, professional design
- Gradient hero sections
- Category cards with icons
- Product cards with hover effects
- Smooth animations and transitions
- Intuitive mobile menu

## Pages

1. **Homepage (index.html)**
   - Hero section with call-to-action
   - Category browsing
   - Featured products
   - Info banner (shipping, security, quality)

2. **Products (products.html)**
   - Full product catalog
   - Search bar
   - Category filter
   - Sort options
   - Responsive product grid

3. **Shopping Cart (cart.html)**
   - Cart items with quantities
   - Remove items
   - Order summary with tax
   - Checkout button
   - Empty cart state

4. **About (about.html)**
   - Company information
   - Contact details
   - Store location
   - FAQ section
   - Business hours

## Technology Stack

- **HTML5** - Semantic markup
- **CSS3** - Custom responsive design with CSS Grid and Flexbox
- **JavaScript (ES6+)** - Vanilla JS, no frameworks
- **LocalStorage** - For cart persistence and age verification

## Project Structure

```
/
├── index.html          # Homepage
├── products.html       # Product catalog
├── cart.html          # Shopping cart
├── about.html         # About & contact
├── css/
│   └── styles.css     # All styles (mobile-first)
├── js/
│   ├── main.js        # Core functionality
│   ├── cart.js        # Cart management
│   ├── products.js    # Product filtering/sorting
│   ├── cart-page.js   # Cart page logic
│   └── products-data.js # Product database
└── images/            # Image assets
```

## Key Features Implementation

### Age Verification
- Modal overlay on first visit
- localStorage flag to remember verification
- Redirects if user declines

### Responsive Design
- Mobile-first CSS approach
- Breakpoints: 768px (tablet), 1024px (desktop)
- Flexible grid layouts
- Collapsible mobile menu

### Shopping Cart
- Object-oriented Cart class
- LocalStorage for persistence
- Quantity management
- Price calculations with tax
- Toast notifications

### Product Management
- 24 pre-loaded products across 4 categories
- Featured products system
- Search by name/description
- Category filtering
- Multi-criteria sorting

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## Getting Started

Simply open `index.html` in a web browser. No build process or dependencies required!

## Customization

### Adding Products
Edit `js/products-data.js` to add/modify products:

```javascript
{
    id: 25,
    name: "Product Name",
    category: "vapes", // or eliquids, accessories, novelties
    price: 49.99,
    description: "Product description",
    icon: "💨", // Emoji icon
    featured: true // Show on homepage
}
```

### Changing Colors
Edit CSS variables in `css/styles.css`:

```css
:root {
    --primary-color: #6366f1;
    --secondary-color: #ec4899;
    /* etc. */
}
```

### Tax Rate
Modify in `js/cart.js`:

```javascript
getTax() {
    return this.getSubtotal() * 0.08; // Change 0.08 to your rate
}
```

## Legal Compliance

This website includes:
- Age verification gate (21+)
- Age verification disclaimer in footer
- Clear categorization of vaping products
- Placeholder for terms of service and privacy policy

**Note**: This is a demonstration website. For a production vaping retail site, ensure compliance with all federal, state, and local laws regarding online vape sales, including proper age verification, shipping restrictions, and tax collection.

## Future Enhancements

Potential additions:
- Backend integration for real checkout
- User accounts and order history
- Product reviews and ratings
- Email newsletter signup
- Advanced age verification (ID verification)
- Inventory management
- Payment gateway integration
- Order tracking
- Wishlist functionality

## License

This is a demonstration project. Feel free to use and modify as needed.
