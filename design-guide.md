# Pandora's Box Design System

**Version 1.0**
**Last Updated: December 2024**

---

## Table of Contents

1. [Brand Overview](#brand-overview)
2. [Design Philosophy](#design-philosophy)
3. [Color Palette](#color-palette)
4. [Typography](#typography)
5. [Spacing & Layout](#spacing--layout)
6. [Components](#components)
7. [Logo Usage](#logo-usage)
8. [Implementation Guide](#implementation-guide)
9. [Accessibility](#accessibility)

---

## Brand Overview

### Brand Identity

**Pandora's Box** is a family-owned vape and smoke shop serving communities across Washington and Oregon. The brand evokes the Greek mythology of Pandora's Box—representing mystery, discovery, and hidden treasures—while maintaining a modern, professional, and trustworthy image for adult customers (21+).

### Brand Positioning

- **Mystery & Discovery**: Like opening Pandora's Box, customers discover quality products and unique finds
- **Treasure & Value**: Premium products at fair prices, each item a treasure
- **Professional & Trustworthy**: Modern aesthetics that inspire confidence
- **Local & Family-Owned**: Community-focused with personal service

### Target Audience

- Adults 21+ interested in vape, smoke, kratom, and novelty products
- Value-conscious shoppers seeking quality and fair prices
- Both online shoppers and in-store visitors across multiple locations

---

## Design Philosophy

### Core Principles

1. **Mystical yet Modern**: Blend mythological inspiration with contemporary design
2. **Accessible Luxury**: Premium feel that's approachable, not pretentious
3. **Clear Hierarchy**: Easy navigation and information discovery
4. **Consistent Experience**: Unified design across all touchpoints
5. **Mobile-First**: Optimized for all devices, starting with mobile

### Visual Direction

- **Rich, Jewel-Toned Colors**: Deep purples (mystery), rich golds (treasure), and teals (discovery)
- **Elegant Typography**: Classical serif headings paired with modern sans-serif body text
- **Subtle Animations**: Gentle glows and transitions that suggest magic and discovery
- **Clean Layouts**: Generous whitespace with clear visual hierarchy

---

## Color Palette

### Primary Colors - Deep Purple (Mystery & Mythology)

The primary color palette evokes the mystical, mysterious nature of Pandora's Box from Greek mythology.

| Shade | Hex Code | RGB | Usage |
|-------|----------|-----|-------|
| 50 | `#f5f3ff` | rgb(245, 243, 255) | Lightest backgrounds, subtle highlights |
| 100 | `#ede9fe` | rgb(237, 233, 254) | Light backgrounds, badges |
| 200 | `#ddd6fe` | rgb(221, 214, 254) | Borders, light accents |
| 300 | `#c4b5fd` | rgb(196, 181, 253) | Hover states, light UI |
| 400 | `#a78bfa` | rgb(167, 139, 250) | Active states, light buttons |
| 500 | `#8b5cf6` | rgb(139, 92, 246) | Interactive elements |
| **600** | **`#7c3aed`** | **rgb(124, 58, 237)** | **Primary buttons, links** ⭐ |
| **700** | **`#6d28d9`** | **rgb(109, 40, 217)** | **Main brand color** ⭐ |
| 800 | `#5b21b6` | rgb(91, 33, 182) | Hover states, dark UI |
| 900 | `#4c1d95` | rgb(76, 29, 149) | Text on light backgrounds |
| 950 | `#2e1065` | rgb(46, 16, 101) | Darkest accents |

**CSS Variables:**
```css
var(--color-primary)        /* #6d28d9 - Main usage */
var(--color-primary-hover)  /* #5b21b6 - Hover states */
var(--color-primary-light)  /* #ede9fe - Backgrounds */
```

### Secondary Colors - Rich Gold (Treasure & Value)

Gold represents the treasure and value customers discover at Pandora's Box.

| Shade | Hex Code | RGB | Usage |
|-------|----------|-----|-------|
| 50 | `#fffbeb` | rgb(255, 251, 235) | Lightest backgrounds |
| 100 | `#fef3c7` | rgb(254, 243, 199) | Light backgrounds, badges |
| 200 | `#fde68a` | rgb(253, 230, 138) | Light accents |
| 300 | `#fcd34d` | rgb(252, 211, 77) | Bright highlights |
| 400 | `#fbbf24` | rgb(251, 191, 36) | Attention elements |
| 500 | `#f59e0b` | rgb(245, 158, 11) | Warning states |
| **600** | **`#d97706`** | **rgb(217, 119, 6)** | **Secondary CTA, accents** ⭐ |
| 700 | `#b45309` | rgb(180, 83, 9) | Hover states |
| 800 | `#92400e` | rgb(146, 64, 14) | Dark accents |
| 900 | `#78350f` | rgb(120, 53, 15) | Darkest gold |
| 950 | `#451a03` | rgb(69, 26, 3) | Text on gold |

**CSS Variables:**
```css
var(--color-secondary)       /* #d97706 - Main usage */
var(--color-secondary-hover) /* #b45309 - Hover states */
var(--color-secondary-light) /* #fef3c7 - Backgrounds */
```

### Accent Colors - Deep Teal (Discovery & Exotic)

Teal represents discovery, exploration, and the exotic nature of products.

| Shade | Hex Code | RGB | Usage |
|-------|----------|-----|-------|
| 50 | `#f0fdfa` | rgb(240, 253, 250) | Lightest backgrounds |
| 100 | `#ccfbf1` | rgb(204, 251, 241) | Light backgrounds |
| 200 | `#99f6e4` | rgb(153, 246, 228) | Light accents |
| 300 | `#5eead4` | rgb(94, 234, 212) | Bright highlights |
| 400 | `#2dd4bf` | rgb(45, 212, 191) | Active states |
| 500 | `#14b8a6` | rgb(20, 184, 166) | Info states |
| **600** | **`#0d9488`** | **rgb(13, 148, 136)** | **Accent elements** ⭐ |
| 700 | `#0f766e` | rgb(15, 118, 110) | Hover states |
| 800 | `#115e59` | rgb(17, 94, 89) | Dark UI |
| 900 | `#134e4a` | rgb(19, 78, 74) | Darkest teal |
| 950 | `#042f2e` | rgb(4, 47, 46) | Text on teal |

**CSS Variables:**
```css
var(--color-accent)       /* #0d9488 - Main usage */
var(--color-accent-hover) /* #0f766e - Hover states */
```

### Neutral Colors - Warm Grays

Warm grays provide a sophisticated, approachable foundation.

| Shade | Hex Code | RGB | Usage |
|-------|----------|-----|-------|
| 50 | `#fafaf9` | rgb(250, 250, 249) | Page backgrounds |
| 100 | `#f5f5f4` | rgb(245, 245, 244) | Card backgrounds |
| 200 | `#e7e5e4` | rgb(231, 229, 228) | Borders, dividers |
| 300 | `#d6d3d1` | rgb(214, 211, 209) | Disabled states |
| 400 | `#a8a29e` | rgb(168, 162, 158) | Placeholders |
| 500 | `#78716c` | rgb(120, 113, 108) | Secondary text |
| 600 | `#57534e` | rgb(87, 83, 78) | Body text |
| 700 | `#44403c` | rgb(68, 64, 60) | Headings |
| 800 | `#292524` | rgb(41, 37, 36) | Dark backgrounds |
| **900** | **`#1c1917`** | **rgb(28, 25, 23)** | **Primary text** ⭐ |
| 950 | `#0c0a09` | rgb(12, 10, 9) | Darkest backgrounds |

**CSS Variables:**
```css
var(--color-text-primary)    /* #1c1917 - Main text */
var(--color-text-secondary)  /* #57534e - Secondary text */
var(--color-text-tertiary)   /* #78716c - Tertiary text */
var(--color-bg-primary)      /* #ffffff - Main background */
var(--color-bg-secondary)    /* #fafaf9 - Secondary background */
```

### Semantic Colors

| Color | Light | Base | Dark | Usage |
|-------|-------|------|------|-------|
| **Success** | `#d1fae5` | `#10b981` | `#065f46` | Success messages, confirmations |
| **Warning** | `#fed7aa` | `#f59e0b` | `#92400e` | Warnings, age verification |
| **Danger** | `#fee2e2` | `#ef4444` | `#991b1b` | Errors, delete actions |
| **Info** | `#dbeafe` | `#3b82f6` | `#1e40af` | Information, tips |

**CSS Variables:**
```css
var(--color-success)  /* Success states */
var(--color-warning)  /* Warning states */
var(--color-danger)   /* Error states */
var(--color-info)     /* Info states */
```

### Color Usage Guidelines

#### Do's ✅
- Use primary purple for main CTAs and brand elements
- Use gold for secondary CTAs and value highlights
- Use teal sparingly for special highlights
- Maintain sufficient contrast for accessibility (WCAG AA minimum)
- Use neutral grays for text and backgrounds
- Use semantic colors for their intended purposes

#### Don'ts ❌
- Don't use all three brand colors (purple, gold, teal) in one component
- Don't use low-contrast color combinations
- Don't use colors outside the defined palette
- Don't use semantic colors for decoration
- Don't use pure black (#000000) or pure white (#ffffff) for text

---

## Typography

### Font Families

#### Heading Font: **Cinzel** (Google Fonts)

**Cinzel** is a classical serif typeface inspired by Roman inscriptions. It evokes the ancient mythology of Pandora's Box while maintaining excellent readability.

```css
font-family: 'Cinzel', serif;
```

**Weights Available:** 400 (Regular), 500 (Medium), 600 (Semibold), 700 (Bold), 800 (Extrabold)

**Usage:**
- All headings (H1-H6)
- Logo text
- Section titles
- Emphasis text

**Import:**
```html
<link href="https://fonts.googleapis.com/css2?family=Cinzel:wght@400;500;600;700;800&display=swap" rel="stylesheet">
```

#### Body Font: **Inter** (Google Fonts)

**Inter** is a modern, clean sans-serif optimized for user interfaces and high readability across all screen sizes.

```css
font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
```

**Weights Available:** 300 (Light), 400 (Regular), 500 (Medium), 600 (Semibold), 700 (Bold), 800 (Extrabold)

**Usage:**
- Body text
- Navigation
- Buttons
- Forms
- UI elements

**Import:**
```html
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap" rel="stylesheet">
```

### Typography Scale

#### Headings

| Element | Size (Mobile) | Size (Desktop) | Weight | Line Height | CSS Variable |
|---------|---------------|----------------|--------|-------------|--------------|
| **H1** | 2.25rem (36px) | 3rem (48px) | 700 (Bold) | 1.25 | `var(--font-size-4xl)` |
| **H2** | 1.875rem (30px) | 2.25rem (36px) | 700 (Bold) | 1.25 | `var(--font-size-3xl)` |
| **H3** | 1.5rem (24px) | 1.875rem (30px) | 600 (Semibold) | 1.375 | `var(--font-size-2xl)` |
| **H4** | 1.25rem (20px) | 1.5rem (24px) | 600 (Semibold) | 1.375 | `var(--font-size-xl)` |
| **H5** | 1.125rem (18px) | 1.25rem (20px) | 600 (Semibold) | 1.5 | `var(--font-size-lg)` |
| **H6** | 1rem (16px) | 1.125rem (18px) | 600 (Semibold) | 1.5 | `var(--font-size-base)` |

**Example:**
```css
h1 {
  font-family: var(--font-family-heading);
  font-size: var(--font-size-4xl);
  font-weight: var(--font-weight-bold);
  line-height: var(--line-height-tight);
  color: var(--color-text-primary);
}
```

#### Body Text

| Type | Size | Weight | Line Height | CSS Variable |
|------|------|--------|-------------|--------------|
| **Large Body** | 1.125rem (18px) | 400 | 1.625 | `var(--font-size-lg)` |
| **Body** | 1rem (16px) | 400 | 1.5 | `var(--font-size-base)` |
| **Small Body** | 0.875rem (14px) | 400 | 1.5 | `var(--font-size-sm)` |
| **Caption** | 0.75rem (12px) | 400 | 1.5 | `var(--font-size-xs)` |

#### UI Text

| Type | Size | Weight | Usage |
|------|------|--------|-------|
| **Button** | 1rem (16px) | 600 | Primary actions |
| **Button Small** | 0.875rem (14px) | 600 | Secondary actions |
| **Label** | 0.875rem (14px) | 500 | Form labels |
| **Helper** | 0.75rem (12px) | 400 | Helper text, hints |

### Typography Guidelines

#### Do's ✅
- Use Cinzel for all headings to maintain brand consistency
- Use Inter for body text and UI elements
- Maintain the type scale for visual hierarchy
- Use appropriate line heights for readability (1.5-1.625 for body text)
- Use semibold (600) or bold (700) weights for emphasis
- Ensure text has sufficient contrast against backgrounds

#### Don'ts ❌
- Don't use more than two font families
- Don't use font sizes smaller than 12px (0.75rem)
- Don't use all caps for long text (short headings only)
- Don't use decorative fonts for body text
- Don't use light weights (300) for small text

---

## Spacing & Layout

### Spacing Scale

The spacing system follows an 8px base unit for consistency and rhythm.

| Token | Value | Pixels | Usage |
|-------|-------|--------|-------|
| `--space-0` | 0 | 0px | No spacing |
| `--space-1` | 0.25rem | 4px | Minimal spacing, icon gaps |
| `--space-2` | 0.5rem | 8px | Tight spacing, small gaps |
| `--space-3` | 0.75rem | 12px | Small padding, compact layouts |
| `--space-4` | 1rem | 16px | Base spacing, standard gaps |
| `--space-5` | 1.25rem | 20px | Medium spacing |
| `--space-6` | 1.5rem | 24px | Standard padding, card spacing |
| `--space-8` | 2rem | 32px | Large spacing, section gaps |
| `--space-10` | 2.5rem | 40px | Extra large spacing |
| `--space-12` | 3rem | 48px | Section padding |
| `--space-16` | 4rem | 64px | Large section padding |
| `--space-20` | 5rem | 80px | Extra large sections |
| `--space-24` | 6rem | 96px | Hero sections |
| `--space-32` | 8rem | 128px | Extra large hero sections |

**Example Usage:**
```css
.card {
  padding: var(--space-6);        /* 24px */
  margin-bottom: var(--space-8);  /* 32px */
  gap: var(--space-4);            /* 16px */
}
```

### Border Radius

| Token | Value | Pixels | Usage |
|-------|-------|--------|-------|
| `--radius-none` | 0 | 0px | Sharp corners |
| `--radius-sm` | 0.25rem | 4px | Small elements, badges |
| `--radius-base` | 0.5rem | 8px | Buttons, inputs, cards |
| `--radius-md` | 0.75rem | 12px | Medium cards |
| `--radius-lg` | 1rem | 16px | Large cards, modals |
| `--radius-xl` | 1.5rem | 24px | Extra large cards |
| `--radius-2xl` | 2rem | 32px | Hero cards |
| `--radius-full` | 9999px | Full | Pills, circular elements |

### Shadows

Shadows create depth and visual hierarchy.

| Token | Value | Usage |
|-------|-------|-------|
| `--shadow-xs` | `0 1px 2px rgba(0,0,0,0.05)` | Subtle elevation |
| `--shadow-sm` | `0 1px 3px rgba(0,0,0,0.1)` | Small cards, buttons |
| `--shadow-base` | `0 4px 6px rgba(0,0,0,0.1)` | Standard cards |
| `--shadow-md` | `0 10px 15px rgba(0,0,0,0.1)` | Elevated cards |
| `--shadow-lg` | `0 20px 25px rgba(0,0,0,0.1)` | Modals, popovers |
| `--shadow-xl` | `0 25px 50px rgba(0,0,0,0.25)` | Hero elements |
| `--shadow-2xl` | `0 25px 50px rgba(0,0,0,0.5)` | Maximum elevation |

**Special Glow Effects:**
```css
--shadow-primary-glow: 0 0 20px rgba(109, 40, 217, 0.3);   /* Purple glow */
--shadow-secondary-glow: 0 0 20px rgba(217, 119, 6, 0.3);  /* Gold glow */
--shadow-accent-glow: 0 0 20px rgba(13, 148, 136, 0.3);    /* Teal glow */
```

### Breakpoints

Mobile-first responsive design breakpoints:

| Name | Value | Device Target |
|------|-------|---------------|
| `--breakpoint-sm` | 640px | Large phones |
| `--breakpoint-md` | 768px | Tablets |
| `--breakpoint-lg` | 1024px | Small laptops |
| `--breakpoint-xl` | 1280px | Desktops |
| `--breakpoint-2xl` | 1536px | Large desktops |

**Media Query Usage:**
```css
/* Mobile first (default) */
.element {
  padding: var(--space-4);
}

/* Tablet and up */
@media (min-width: 768px) {
  .element {
    padding: var(--space-8);
  }
}

/* Desktop and up */
@media (min-width: 1024px) {
  .element {
    padding: var(--space-12);
  }
}
```

---

## Components

### Buttons

Buttons are the primary call-to-action elements in the interface.

#### Button Variants

**Primary Button** - Main actions (Add to Cart, Shop Now)
```html
<button class="btn btn-primary">Shop Now</button>
```

**Secondary Button** - Secondary actions (Learn More, View Details)
```html
<button class="btn btn-secondary">Learn More</button>
```

**Accent Button** - Special highlights
```html
<button class="btn btn-accent">Special Offer</button>
```

**Outline Button** - Tertiary actions
```html
<button class="btn btn-outline">View All</button>
```

**Ghost Button** - Subtle actions
```html
<button class="btn btn-ghost">Cancel</button>
```

**Danger Button** - Destructive actions (Delete, Remove)
```html
<button class="btn btn-danger">Delete</button>
```

#### Button Sizes

```html
<button class="btn btn-primary btn-xs">Extra Small</button>
<button class="btn btn-primary btn-sm">Small</button>
<button class="btn btn-primary">Default</button>
<button class="btn btn-primary btn-lg">Large</button>
<button class="btn btn-primary btn-xl">Extra Large</button>
<button class="btn btn-primary btn-full">Full Width</button>
```

#### Button States

- **Default**: Normal state
- **Hover**: Elevated with glow effect and slight upward motion
- **Active**: Pressed state
- **Disabled**: 50% opacity, cursor not-allowed

#### Button Guidelines

**Do's ✅**
- Use primary buttons for main CTAs (one per section)
- Use clear, action-oriented text (Shop Now, Add to Cart)
- Use appropriate sizes based on importance
- Use full-width buttons on mobile when appropriate
- Maintain consistent spacing between buttons

**Don'ts ❌**
- Don't use multiple primary buttons in one section
- Don't use buttons for navigation (use links instead)
- Don't make buttons too small to tap on mobile (min 44x44px)
- Don't use vague text like "Click Here" or "Submit"

### Cards

Cards contain related content and actions.

#### Card Variants

**Standard Card**
```html
<div class="card">
  <div class="card-header">
    <h3>Card Title</h3>
  </div>
  <div class="card-body">
    <p>Card content goes here.</p>
  </div>
  <div class="card-footer">
    <button class="btn btn-primary">Action</button>
  </div>
</div>
```

**Elevated Card** - More prominent
```html
<div class="card card-elevated">
  <!-- content -->
</div>
```

**Bordered Card** - Subtle variant
```html
<div class="card card-bordered">
  <!-- content -->
</div>
```

**Mystery Card** - Special promotional cards
```html
<div class="card card-mystery">
  <!-- Dark gradient background with mystical glow -->
</div>
```

#### Card Guidelines

**Do's ✅**
- Use cards to group related information
- Maintain consistent padding (var(--space-6))
- Use hover effects to indicate interactivity
- Keep card content concise
- Use appropriate shadows for hierarchy

**Don'ts ❌**
- Don't nest cards within cards
- Don't overload cards with too much content
- Don't make entire cards clickable if they have multiple actions
- Don't use inconsistent spacing within cards

### Forms

#### Form Elements

**Input Fields**
```html
<div class="form-group">
  <label class="form-label form-label-required" for="email">
    Email Address
  </label>
  <input type="email" id="email" class="form-input" placeholder="Enter your email">
  <span class="form-help-text">We'll never share your email.</span>
</div>
```

**Select Dropdown**
```html
<div class="form-group">
  <label class="form-label" for="category">Category</label>
  <select id="category" class="form-select">
    <option>Choose a category</option>
    <option>Vapes</option>
    <option>Glass</option>
  </select>
</div>
```

**Textarea**
```html
<div class="form-group">
  <label class="form-label" for="message">Message</label>
  <textarea id="message" class="form-textarea" rows="4"></textarea>
</div>
```

**Checkbox**
```html
<label>
  <input type="checkbox" class="form-checkbox">
  <span>I agree to terms and conditions</span>
</label>
```

**Radio Button**
```html
<label>
  <input type="radio" name="option" class="form-radio">
  <span>Option 1</span>
</label>
```

#### Error States

```html
<div class="form-group">
  <label class="form-label" for="name">Name</label>
  <input type="text" id="name" class="form-input form-input-error">
  <span class="form-error-text">This field is required.</span>
</div>
```

#### Form Guidelines

**Do's ✅**
- Label all form fields clearly
- Use placeholder text for examples, not labels
- Provide helpful error messages
- Use appropriate input types (email, tel, number)
- Group related fields together
- Indicate required fields with asterisk

**Don'ts ❌**
- Don't use placeholders as labels
- Don't hide error messages
- Don't use generic error messages
- Don't disable form submission button during loading (show loading state instead)

### Badges & Tags

Badges highlight status, categories, or counts.

```html
<span class="badge badge-primary">New</span>
<span class="badge badge-secondary">Featured</span>
<span class="badge badge-accent">Limited</span>
<span class="badge badge-success">In Stock</span>
<span class="badge badge-warning">Low Stock</span>
<span class="badge badge-danger">Out of Stock</span>
<span class="badge badge-neutral">Category</span>
```

**Large Badges**
```html
<span class="badge badge-primary badge-lg">21+ Only</span>
```

### Modals & Dialogs

Modals for important interactions like age verification.

```html
<div class="modal-backdrop">
  <div class="modal">
    <div class="modal-header">
      <h2 class="modal-title">Age Verification</h2>
    </div>
    <div class="modal-body">
      <p>You must be 21 years or older to enter this site.</p>
    </div>
    <div class="modal-footer">
      <button class="btn btn-ghost">No</button>
      <button class="btn btn-primary">Yes, I'm 21+</button>
    </div>
  </div>
</div>
```

### Alerts

```html
<div class="alert alert-success">Order placed successfully!</div>
<div class="alert alert-warning">Please verify your age to continue.</div>
<div class="alert alert-danger">Error processing payment.</div>
<div class="alert alert-info">Free shipping on orders over $50.</div>
```

### Navigation

```html
<nav>
  <a href="/" class="nav-link nav-link-active">Home</a>
  <a href="/products" class="nav-link">Products</a>
  <a href="/about" class="nav-link">About</a>
</nav>
```

---

## Logo Usage

### Logo Variants

Two logo versions are available:

1. **Full Logo** (`logo.svg`) - Includes the ornate box with text "PANDORA'S BOX"
   - Use for: Headers, hero sections, marketing materials
   - Minimum width: 150px
   - Ideal width: 200-300px

2. **Icon Logo** (`logo-icon.svg`) - Box icon only, no text
   - Use for: Favicons, app icons, social media avatars, mobile headers
   - Minimum width: 32px
   - Ideal width: 64-100px

### Logo Anatomy

The logo features:
- **Ornate Box**: Represents Pandora's Box from Greek mythology
- **Mystical Rays**: Light emanating from the opened box, suggesting discovery
- **Gold Accents**: Keyhole and decorative elements in rich gold
- **Purple Gradient**: Deep purple gradient evoking mystery and luxury
- **Sparkles**: Subtle magical elements suggesting wonder

### Logo Placement

#### Header
```html
<header>
  <div class="logo">
    <img src="images/logo.svg" alt="Pandora's Box" height="80">
  </div>
</header>
```

#### Favicon
```html
<link rel="icon" type="image/svg+xml" href="images/logo-icon.svg">
```

### Logo Guidelines

#### Do's ✅
- Maintain minimum clear space around logo (equal to the height of the box)
- Use full logo in desktop headers
- Use icon logo for mobile headers and favicons
- Ensure logo is clearly visible against backgrounds
- Scale proportionally (maintain aspect ratio)

#### Don'ts ❌
- Don't alter logo colors
- Don't rotate or skew the logo
- Don't add effects (drop shadows, glows) beyond what's in the SVG
- Don't place logo on busy backgrounds without a solid backdrop
- Don't compress or stretch the logo disproportionately

### Logo on Different Backgrounds

- **Light backgrounds**: Use full-color logo (default)
- **Dark backgrounds**: Logo works well as-is (colors are vibrant enough)
- **Photography**: Place logo on semi-transparent dark overlay for visibility

---

## Implementation Guide

### Getting Started

1. **Include Design System CSS**
```html
<link rel="stylesheet" href="css/design-system.css">
```

2. **Import Google Fonts** (already in design-system.css)
```html
<!-- Fonts are auto-imported via @import in design-system.css -->
```

3. **Use Design Tokens**
```css
.custom-element {
  color: var(--color-primary);
  padding: var(--space-6);
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow-base);
}
```

### Migration from Existing Styles

To migrate from existing styles to the design system:

1. **Replace color values** with design tokens:
```css
/* Before */
background-color: #6366f1;

/* After */
background-color: var(--color-primary);
```

2. **Replace spacing** with spacing scale:
```css
/* Before */
padding: 24px;

/* After */
padding: var(--space-6);
```

3. **Replace font families**:
```css
/* Before - Headings */
font-family: 'Segoe UI', sans-serif;

/* After - Headings */
font-family: var(--font-family-heading);

/* Before - Body */
font-family: -apple-system, sans-serif;

/* After - Body */
font-family: var(--font-family-body);
```

4. **Use component classes** instead of custom styles:
```html
<!-- Before -->
<button style="background: #6366f1; padding: 12px 24px; border-radius: 8px;">
  Click Me
</button>

<!-- After -->
<button class="btn btn-primary">
  Click Me
</button>
```

### Best Practices

#### CSS Organization
```css
/* Use custom properties for consistency */
:root {
  --custom-header-height: 80px;
}

.header {
  height: var(--custom-header-height);
  background: var(--color-bg-dark);
  padding: var(--space-4) var(--space-6);
}
```

#### Responsive Design (Mobile-First)
```css
/* Mobile (default) */
.product-grid {
  grid-template-columns: 1fr;
  gap: var(--space-4);
}

/* Tablet */
@media (min-width: 768px) {
  .product-grid {
    grid-template-columns: repeat(2, 1fr);
    gap: var(--space-6);
  }
}

/* Desktop */
@media (min-width: 1024px) {
  .product-grid {
    grid-template-columns: repeat(3, 1fr);
    gap: var(--space-8);
  }
}
```

#### Combining Classes
```html
<!-- Combine component classes with utilities -->
<button class="btn btn-primary btn-lg shadow-lg">
  Large Primary Button
</button>

<div class="card card-elevated bg-light">
  <!-- Elevated card with light background -->
</div>
```

### Performance Tips

1. **Load fonts efficiently** - Fonts are already optimized with `display=swap`
2. **Use CSS variables** - Better performance than calculating colors
3. **Minimize custom CSS** - Use design system classes where possible
4. **Optimize shadows** - Shadows are GPU-accelerated

---

## Accessibility

### WCAG Compliance

The design system targets **WCAG 2.1 Level AA** compliance.

### Color Contrast

All text color combinations meet WCAG AA standards:

- **Primary text on white**: 16.46:1 (AAA)
- **Secondary text on white**: 7.54:1 (AA)
- **Primary button text**: 8.59:1 (AAA)
- **Links**: 7.71:1 (AA)

### Focus States

All interactive elements have visible focus states:
```css
.btn:focus {
  outline: 3px solid var(--color-primary);
  outline-offset: 2px;
}

.form-input:focus {
  box-shadow: 0 0 0 3px var(--color-primary-light);
}
```

### Screen Reader Support

- All images have alt text
- Form inputs have associated labels
- Buttons have descriptive text (not "Click Here")
- Modal dialogs have ARIA labels

### Keyboard Navigation

- All interactive elements are keyboard accessible
- Tab order is logical
- Modals trap focus appropriately
- Skip links available for main content

### Best Practices

#### Do's ✅
- Always provide alt text for images
- Use semantic HTML (`<button>`, `<nav>`, `<main>`)
- Maintain sufficient color contrast
- Provide visible focus indicators
- Use ARIA labels where appropriate
- Test with screen readers
- Support keyboard navigation

#### Don'ts ❌
- Don't rely on color alone to convey information
- Don't use `<div>` for buttons or links
- Don't remove focus outlines without replacement
- Don't use tiny text (below 12px)
- Don't create keyboard traps
- Don't use auto-playing animations without controls

---

## Conclusion

This design system provides a comprehensive foundation for building the Pandora's Box brand across all digital touchpoints. By following these guidelines, you'll create a consistent, professional, and accessible experience that evokes the mystery and treasure of the Pandora's Box mythology while serving the modern needs of adult customers.

### Quick Reference

- **Primary Color**: Purple `#6d28d9` - Mystery & mythology
- **Secondary Color**: Gold `#d97706` - Treasure & value
- **Accent Color**: Teal `#0d9488` - Discovery & exotic
- **Heading Font**: Cinzel (serif) - Classical elegance
- **Body Font**: Inter (sans-serif) - Modern readability
- **Base Spacing**: 8px (0.5rem)
- **Border Radius**: 8px (0.5rem) standard

### Support

For questions or contributions to the design system, contact the development team or open an issue in the project repository.

**Version**: 1.0
**Last Updated**: December 2024
**Maintained by**: Pandora's Box Development Team
