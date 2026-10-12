[README.md](https://github.com/user-attachments/files/32281166/README.md)
# The Perfume Shop - E-Commerce Website

A sophisticated, modern e-commerce platform for fragrance products built with vanilla HTML, CSS, and JavaScript. Features a cinematic design aesthetic with wine red, soft gold, and ink black color scheme.

**Live Demo/Project Site:** [The Perfume Shop](https://www.theperfumeshop.co.za)

---

## 📋 Table of Contents

1. [Project Overview](#project-overview)
2. [Features](#features)
3. [Technology Stack](#technology-stack)
4. [File Structure](#file-structure)
5. [Design System](#design-system)
6. [Installation & Setup](#installation--setup)
7. [Component Documentation](#component-documentation)
8. [Pages & Sections](#pages--sections)
9. [JavaScript Functionality](#javascript-functionality)
10. [Responsive Design](#responsive-design)
11. [Customization Guide](#customization-guide)
12. [Browser Support](#browser-support)
13. [Performance & Accessibility](#performance--accessibility)
14. [Future Enhancements](#future-enhancements)

---

## 🎯 Project Overview

The Perfume Shop is a full-featured e-commerce website specializing in luxury fragrances. It provides a seamless shopping experience with product browsing, filtering, cart management, and checkout functionality. The design emphasizes elegance and sophistication through cinematic visual effects and premium typography.

**Key Characteristics:**
- Single-page application (SPA) architecture with hash-based navigation
- Guest checkout and user authentication support
- Dynamic product catalog with search and filtering
- Responsive design for desktop, tablet, and mobile devices
- Smooth animations and transitions
- Accessibility-compliant interactive elements

---

## ✨ Features

### Core Shopping Features
- **Product Catalog**: Browse 8+ luxury fragrances with detailed product cards
- **Search & Filter**: Find products by name, category, or sort by price/name
- **Product Details**: Full product pages with images, descriptions, specifications, and ratings
- **Shopping Cart**: Add/remove items, view cart totals with tax and shipping calculations
- **Guest Checkout**: Shop without creating an account; session-based cart persistence
- **User Authentication**: Login and registration pages for customer accounts
- **Order Confirmation**: Post-purchase order summary and digital receipt generation

### Additional Pages
- **Home/Welcome**: Cinematic hero section with animated background elements
- **About Us**: Company mission, values, and team information
- **Physical Store**: Location details, hours, and embedded Google Maps
- **Customer Support**: FAQ section, contact form, and customer service information

### Design & UX Features
- **Cinematic Animations**: Animated perfume bottles streaming across hero section
- **Smooth Page Transitions**: Fade-in animations when navigating between pages
- **Interactive Hover States**: Product cards, buttons, and navigation links respond to user interaction
- **Sticky Navigation**: Header remains accessible while scrolling
- **Mobile-First Responsive Design**: Optimized layouts for all screen sizes
- **Premium Typography**: Georgia serif for headings, Inter sans-serif for body text

---

## 🛠 Technology Stack

### Core Technologies
- **HTML5**: Semantic markup with ARIA labels for accessibility
- **CSS3**: Advanced features including CSS Grid, Flexbox, and CSS Variables
- **JavaScript**: Vanilla JS for interactivity (external file: `script.js`, `catalog-controls.js`)

### Key CSS Features
- CSS Custom Properties (variables) for design token management
- CSS Grid and Flexbox for layout
- CSS Gradients and backdrop filters for visual effects
- CSS Animations and transitions for smooth interactions
- Media queries for responsive design

### External Dependencies
- **Google Maps**: Embedded map for store location
- **Unsplash Images**: Free high-quality images for hero animations (via direct URLs)
- **Font Integration**: System fonts with fallbacks (Georgia, Inter)

---

## 📁 File Structure

```
the-perfumeshop/
│
├── index.html                 # Main HTML file (all pages included)
├── css/
│   └── stylesheet.css        # Complete stylesheet with design system
├── js/
│   ├── script.js             # Core functionality (cart, navigation, etc.)
│   └── catalog-controls.js   # Search, filter, sort functionality
│
├── images/
│   ├── Art of arabia 3.jpg
│   ├── Atlantis perfume.jpg
│   ├── Club de nuit perfume.jpg
│   ├── Khamrah lattafa.jpg
│   ├── Proud of you amber.webp
│   ├── Scentemy.jpg
│   ├── asad.jpg
│   ├── Perfumeshop thumbnails.jpg
│   ├── The perfumes multiple.jpg
│   └── more perfumes thumbnails.jpg
│
└── README.md                 # This file
```

---

## 🎨 Design System

### Color Palette

| Token | Color | Usage |
|-------|-------|-------|
| `--ink` | `#100d0f` | Primary dark text and accents |
| `--ink-soft` | `#21191d` | Secondary dark color |
| `--wine` | `#651c32` | Primary brand color (buttons, accents) |
| `--wine-deep` | `#3e0f20` | Darker wine shade for depth |
| `--wine-light` | `#8b2e4c` | Lighter wine for hover states |
| `--gold` | `#c8a66a` | Premium accent and highlights |
| `--gold-light` | `#ead6ad` | Light gold for contrast |
| `--cream` | `#f7f2e9` | Off-white background |
| `--paper` | `#fffdf9` | Brightest background |
| `--muted` | `#746a6f` | Secondary text color |

### Typography

**Headings**
- Font: Georgia, Times New Roman, serif
- Font Weight: 500-700
- Line Height: 1.08 (tight)
- Letter Spacing: -0.025em to -0.065em

**Body Text**
- Font: Inter, system UI fonts, sans-serif
- Font Weight: 400-700
- Font Size: 16px base
- Line Height: 1.65

**Navigation**
- Font Weight: 700
- Letter Spacing: 0.08-0.36em (uppercase)
- Font Size: 0.72-0.82rem

### Spacing Scale

```
--radius-sm:    10px    (small elements)
--radius-md:    18px    (cards, containers)
--radius-lg:    30px    (large sections)
--radius-pill:  999px   (buttons, pills)
```

### Shadow System

```
--shadow-sm:    0 8px 24px rgba(24, 12, 17, 0.08)
--shadow-md:    0 18px 48px rgba(24, 12, 17, 0.13)
--shadow-lg:    0 30px 80px rgba(10, 5, 8, 0.24)
```

---

## 🚀 Installation & Setup

### Prerequisites
- Modern web browser (Chrome, Firefox, Safari, Edge)
- Web server (for local development)
- Text editor or IDE

### Basic Setup

1. **Clone or Download**
   ```bash
   git clone <repository-url>
   cd the-perfumeshop
   ```

2. **Organize Files**
   - Place all HTML in root directory
   - Store CSS in `/css` folder
   - Store JS in `/js` folder
   - Store images in `/images` folder

3. **Run Locally**
   ```bash
   # Using Python 3
   python -m http.server 8000
   
   # Using Node.js (http-server)
   npx http-server
   
   # Using PHP
   php -S localhost:8000
   ```

4. **Access in Browser**
   ```
   http://localhost:8000
   ```

### Production Deployment

1. Upload all files to your web hosting server
2. Ensure file permissions are correct (644 for files, 755 for directories)
3. Update Google Maps embed code with your own API key
4. Configure backend for checkout processing (currently frontend-only)
5. Set up email service for order confirmations

---

## 🧩 Component Documentation

### Header & Navigation

**File:** `stylesheet.css` - Lines 118-261

```html
<header class="header">
  <div class="navbar">
    <div class="logo"><h1>Fragrance beyond ordinary</h1></div>
    <nav class="nav-menu"><!-- Navigation links --></nav>
    <div class="cart-icon"><!-- Cart counter --></div>
  </div>
</header>
```

**Features:**
- Sticky positioning (stays at top while scrolling)
- Dynamic cart count badge
- Hover animations on links
- Gold underline animation on hover

---

### Product Cards

**File:** `stylesheet.css` - Lines 1078-1159

```html
<div class="product-card" data-product-id="1" data-category="fragrances">
  <img src="images/product.jpg" alt="Product Name" class="product-image">
  <div class="product-info">
    <h3 class="product-name">Product Name</h3>
    <p class="product-category">Fragrances</p>
    <p class="product-description">Description...</p>
    <div class="product-footer">
      <span class="product-price">R 700.00</span>
      <button class="btn btn-add-cart" onclick="addToCart(1)">Add to Cart</button>
    </div>
  </div>
</div>
```

**Features:**
- Hover lift effect with shadow increase
- Image zoom on hover
- Category badge overlay
- Price display with currency

---

### Button System

**File:** `stylesheet.css` - Lines 622-711

**Button Types:**
- `.btn-primary` - Wine red background, elevated effect
- `.btn-secondary` - Transparent with border
- `.btn-add-cart` - Dark ink background for product cards
- `.btn-large` - Larger padding for prominent CTAs
- `.btn-full` - Full width for forms

```html
<!-- Primary Button -->
<button class="btn btn-primary">Start Shopping</button>

<!-- Secondary Button -->
<button class="btn btn-secondary">Continue as Guest</button>

<!-- Add to Cart -->
<button class="btn btn-add-cart" onclick="addToCart(1)">Add to Cart</button>
```

---

### Form Elements

**File:** `stylesheet.css` - Lines 713-796

All forms use consistent styling:
- Cream background with focus state enhancement
- Wine border on focus
- Rounded corners (10px)
- Smooth transitions

```html
<input type="email" placeholder="Email Address" required>
<select aria-label="Filter by category">
  <option value="">All Categories</option>
  <option value="fragrances">Fragrances</option>
</select>
<textarea placeholder="Your Message" rows="5"></textarea>
```

---

### Hero Section

**File:** `stylesheet.css` - Lines 530-611

Features cinematic animated background with streaming product images:

```html
<section class="welcome-page">
  <div class="hero">
    <h2>Welcome to the perfumeshop</h2>
    <p>Discover amazing scents at great prices</p>
    <div class="hero-buttons">
      <button class="btn btn-primary">Start Shopping</button>
      <button class="btn btn-secondary">Continue as Guest</button>
    </div>
  </div>
</section>
```

**Animations:**
- Pseudo-elements create animated image cards
- `streamLeft` and `streamRight` keyframe animations
- 3D transform effects with perspective
- Images flow from center outward

---

### Shopping Cart Table

**File:** `stylesheet.css` - Lines 1361-1405

```html
<table class="cart-table">
  <thead>
    <tr>
      <th>Product</th>
      <th>Price</th>
      <th>Quantity</th>
      <th>Subtotal</th>
      <th>Action</th>
    </tr>
  </thead>
  <tbody id="cart-items-list">
    <!-- Populated by JavaScript -->
  </tbody>
</table>
```

**Features:**
- Dark header with white text
- Sticky cart summary sidebar
- Responsive scrolling on mobile

---

## 📄 Pages & Sections

### 1. Home/Welcome Page (ID: `home`)
- Full-height hero with cinematic animations
- Two CTA buttons: "Start Shopping" and "Continue as Guest"
- Default landing page for the website

### 2. Login Page (ID: `login`)
- Email and password input fields
- Link to registration page
- Single-form layout

### 3. Registration Page (ID: `register`)
- Full name, email, password, phone number inputs
- Password confirmation field
- Link back to login

### 4. Guest Checkout (ID: `guest`)
- Simple information message
- CTA to proceed to catalog
- For users who prefer not to create account

### 5. Product Catalog (ID: `catalog`)
- 8 luxury fragrance products displayed in grid
- Search box for product names
- Category filter (currently: Fragrances, Home Fragrances)
- Sort options (name A-Z/Z-A, price low-to-high/high-to-low)
- Responsive grid: 4 columns (desktop), 2 columns (tablet), 1 column (mobile)

**Products Included:**
1. Art of Universe - R 700.00
2. Atlantis - R 980.00
3. Club de Nuit - R 780.00
4. Art of Arabia III - R 1100.00
5. Khamrah Lattafa - R 680.00
6. Proud of You Amber - R 400.00
7. Scentemy NO xxx - R 1500.00
8. Asad - R 700.00

### 6. Product Details Page (ID: `product-detail`)
- Large product image with thumbnail carousel
- Product name, category, rating
- Full description and specifications
- Quantity selector
- "Add to Cart" and "Add to Wishlist" buttons
- Sticky sidebar with pricing and stock status

### 7. Shopping Cart (ID: `cart`)
- Table view of cart items
- Remove/edit quantity functionality
- Order summary sidebar with:
  - Subtotal
  - Shipping cost
  - Tax calculation
  - Total
- "Proceed to Checkout" and "Continue Shopping" buttons

### 8. Checkout (ID: `checkout`)
- Shipping information form (name, address, city, etc.)
- Billing information (with "same as shipping" toggle)
- Shipping method selection (Standard, Express, Overnight)
- Payment information (card details)
- Order summary sidebar

### 9. Order Confirmation (ID: `confirmation`)
- Success message with checkmark
- Order details (number, date, total, estimated delivery)
- Digital receipt with download button
- Actions to return home or continue shopping

### 10. About Us (ID: `about`)
- Company introduction
- Mission statement
- Why Choose Us (benefits list)
- Team information

### 11. Customer Support (ID: `support`)
- FAQ section with 4 common questions
- Contact information (email, phone, hours)
- Contact form for customer inquiries
- Hours of operation (Monday-Friday 9AM-6PM SAST)

### 12. Physical Store (ID: `store`)
- Store location and address (123 Main Street, Durban, KZN)
- Embedded Google Maps
- Hours of operation table
- Phone number link

---

## 💻 JavaScript Functionality

### Required External Files

**`script.js`** - Core functionality must handle:
- Page navigation with `navigateTo()` function
- Shopping cart management with `addToCart()` function
- Cart display and updates
- Order processing
- Form validation and submission

**`catalog-controls.js`** - Catalog management must handle:
- Product search by name
- Category filtering
- Sorting (by name and price)
- Live search status updates
- Dynamic product display

### Key JavaScript Functions Referenced in HTML

```javascript
// Navigation
navigateTo('catalog')          // Navigate to catalog page
navigateTo('checkout')         // Navigate to checkout
navigateTo('home')             // Back to home

// Cart Operations
addToCart(productId)           // Add product to cart
addToCartFromDetail()          // Add from product detail page
removeFromCart(productId)      // Remove from cart
updateQuantity(productId, qty) // Update quantity

// Utility
downloadReceipt()              // Download PDF receipt
```

### Data Structure

**Product Object:**
```javascript
{
  id: 1,
  name: "Art of Universe",
  category: "fragrances",
  price: 700,
  description: "Art of the Universe is a creative expression...",
  image: "images/Art of arabia 3.jpg",
  stock: true,
  rating: 5,
  reviews: 120
}
```

**Cart Item Object:**
```javascript
{
  productId: 1,
  name: "Art of Universe",
  price: 700,
  quantity: 2,
  subtotal: 1400
}
```

---

## 📱 Responsive Design

### Breakpoints

| Breakpoint | Width | Devices |
|-----------|-------|---------|
| Desktop | > 1080px | Large screens, desktops |
| Tablet | 761px - 1080px | iPad, tablets |
| Mobile | 460px - 760px | Phones, small tablets |
| Small Mobile | < 460px | Small phones (iPhone SE, etc.) |

### Key Responsive Changes

**Desktop (Default)**
- Navigation displays horizontally
- 4-column product grid
- Two-column layouts for cart/checkout

**Tablet (max-width: 1080px)**
- Navigation wraps to secondary row
- 2-column product grid
- Adjusted spacing and font sizes

**Mobile (max-width: 760px)**
- Full vertical navigation
- Single-column product grid
- Stacked layouts for forms and checkout
- Larger touch targets (min-height: 42-56px for buttons)
- Reduced padding and margins

**Small Phones (max-width: 460px)**
- Further reduced spacing
- Simpler layouts
- Single-column everything
- Optimized image sizes
- Full-width buttons

### Mobile-First Features
- `clamp()` for fluid typography sizing
- `min()` and `max()` for responsive spacing
- `@media (prefers-reduced-motion)` for accessibility
- Touch-friendly button sizes (minimum 44px)
- Scrollable table overflow handling

---

## 🎨 Customization Guide

### Changing Brand Colors

Edit the CSS variables in `stylesheet.css` (lines 3-20):

```css
:root {
    --wine: #651c32;        /* Change primary brand color */
    --gold: #c8a66a;        /* Change accent color */
    --ink: #100d0f;         /* Change dark text color */
    --cream: #f7f2e9;       /* Change light background */
}
```

### Adding New Products

In the HTML, duplicate a product card and update:

```html
<div class="product-card" data-product-id="9" data-category="fragrances">
    <img src="images/new-product.jpg" alt="New Product" class="product-image">
    <div class="product-info">
        <h3 class="product-name">New Product Name</h3>
        <p class="product-category">Fragrances</p>
        <p class="product-description">New description here...</p>
        <div class="product-footer">
            <span class="product-price">R XXX.00</span>
            <button class="btn btn-add-cart" onclick="addToCart(9)">Add to Cart</button>
        </div>
    </div>
</div>
```

### Modifying Typography

Change font families in CSS variables or directly:

```css
h1, h2, h3, h4 {
    font-family: "Your Font Name", serif;
}

body {
    font-family: "Your Font Name", sans-serif;
}
```

### Adjusting Spacing

Modify the content width and padding:

```css
:root {
    --content-width: 1240px;  /* Change max container width */
}

.page {
    padding: 4rem 1.25rem;    /* Change page padding */
}
```

### Custom Store Location

Update the Google Maps embed code:

```html
<iframe
    src="https://www.google.com/maps/embed?pb=YOUR_NEW_EMBED_CODE"
    width="100%"
    height="400"
    style="border:0;"
    allowfullscreen=""
    loading="lazy">
</iframe>
```

Get embed code from: https://www.google.com/maps → Share → Embed Map

### Disabling Animations

For reduced motion or simpler design, hide animated elements:

```css
.welcome-page::before,
.welcome-page::after,
.hero::before,
.hero::after {
    display: none; /* Hides streaming animation */
}

* {
    transition: none !important;
    animation: none !important;
}
```

---

## 🌐 Browser Support

### Fully Supported
- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

### Features by Browser

| Feature | Chrome | Firefox | Safari | Edge |
|---------|--------|---------|--------|------|
| CSS Grid | ✅ | ✅ | ✅ | ✅ |
| Flexbox | ✅ | ✅ | ✅ | ✅ |
| CSS Variables | ✅ | ✅ | ✅ | ✅ |
| Backdrop Filter | ✅ | ⚠️ | ✅ | ✅ |
| CSS Animations | ✅ | ✅ | ✅ | ✅ |
| CSS Gradients | ✅ | ✅ | ✅ | ✅ |

### Mobile Browsers
- iOS Safari 12+
- Chrome Mobile 90+
- Firefox Mobile 88+
- Samsung Internet 14+

### Known Issues
- Backdrop filter not fully supported in Firefox (degrades gracefully)
- Some older phones may not show animated hero effects

---

## ♿ Performance & Accessibility

### Accessibility Features

**ARIA Labels:**
- Navigation: `aria-label="Main navigation"`
- Cart region: `role="region" aria-label="Shopping cart items"`
- Search status: `role="status" aria-live="polite"`
- Filter controls: `aria-label` on all select elements

**Keyboard Navigation:**
- All interactive elements are keyboard accessible
- Focus states clearly visible (gold outline)
- Tab order follows visual hierarchy
- Form inputs properly labeled

**Color Contrast:**
- All text meets WCAG AA standards (4.5:1 minimum)
- Sufficient contrast in buttons and links
- Color not sole means of conveying information

**Semantic HTML:**
- Proper heading hierarchy (h1 → h2 → h3)
- Semantic form elements with labels
- List elements for navigation and product lists
- Table markup for cart and store hours

### Performance Optimizations

**CSS Optimization:**
- Minimal CSS file size (~35KB)
- Critical CSS inline in header
- Efficient selectors avoiding specificity issues
- Hardware-accelerated animations (transform, opacity)

**Image Optimization:**
- Images properly sized with width/height attributes
- Aspect ratio declarations to prevent layout shift
- `.webp` support for modern browsers
- Lazy loading ready for images

**Loading Strategy:**
- CSS loaded in head (render-blocking)
- JavaScript loaded at end of body (deferred)
- No external font loading (system fonts used)
- Minimal HTTP requests

**Animation Performance:**
- Use of `transform` and `opacity` for animations
- Avoid animating layout properties
- GPU-accelerated 3D transforms
- Respect `prefers-reduced-motion` setting

---

## 🔮 Future Enhancements

### Planned Features

1. **Backend Integration**
   - Product database integration
   - User authentication with persistent sessions
   - Real shopping cart persistence
   - Payment gateway integration (Stripe, PayFast)
   - Email order confirmation system

2. **Advanced Features**
   - Product wishlist functionality
   - Customer reviews and ratings
   - Product recommendation engine
   - Discount codes and promotions
   - Inventory management
   - Order tracking system

3. **User Experience**
   - Wishlist page
   - Account dashboard
   - Order history
   - Customer reviews section
   - Live chat support
   - Advanced product filtering (scent notes, family)

4. **Performance**
   - Image lazy loading
   - Service worker for offline support
   - Progressive Web App (PWA) capabilities
   - Minified and compiled assets
   - Content Delivery Network (CDN)

5. **Analytics & Marketing**
   - Google Analytics integration
   - Heat mapping for user behavior
   - Email newsletter signup
   - Social media integration
   - Product recommendations based on browsing

6. **Internationalization**
   - Multi-language support
   - Multiple currency options
   - Region-specific shipping costs
   - Local payment methods

---

## 🐛 Troubleshooting

### Issue: Images not loading
**Solution:** Verify image paths in the HTML match actual file locations. Use relative paths: `images/filename.jpg`

### Issue: Styles not applying
**Solution:** Ensure `css/stylesheet.css` path is correct. Clear browser cache (Ctrl+Shift+Delete)

### Issue: JavaScript not working
**Solution:** Verify `script.js` and `catalog-controls.js` files exist and are linked at bottom of HTML

### Issue: Responsive design broken
**Solution:** Check viewport meta tag exists: `<meta name="viewport" content="width=device-width, initial-scale=1.0">`

### Issue: Animations lagging
**Solution:** Check `prefers-reduced-motion` setting on device. Disable in browser if test needed.

### Issue: Forms not submitting
**Solution:** Implement backend form handling in `script.js`. Currently frontend-only.

---

## 📞 Support & Contact

**Website:** https://www.theperfumeshop.co.za  
**Email:** support@theperfumeshope.com  
**Phone:** +27 (0) 67 073 7096  
**Hours:** Monday - Friday, 9AM - 6PM SAST

---

## 📄 License

This project is proprietary and confidential. All rights reserved to The Perfume Shop (2025).

---

## 🙏 Credits

**Design & Development:** The Perfume Shop Team  
**Icons & Assets:** Unsplash (photography)  
**Fonts:** Google Fonts (Inter), System Fonts (Georgia)  
**Maps:** Google Maps API

---

**Last Updated:** August 2026  
**Version:** 1.0.0

