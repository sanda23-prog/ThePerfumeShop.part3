# The Perfume Shop

A multi-page e-commerce website for a Durban-based fragrance and home-fragrance retailer, built with **plain HTML, CSS and JavaScript** (no frameworks, no build step). It is the Part 3 submission of an academic web development project and includes a working product catalogue, shopping cart, checkout with printable receipt, validated forms, an interactive map, a gallery lightbox, light/dark mode and a full SEO setup.

> **Live site:** _add your deployed Netlify URL here_
> **Repository:** _add your GitHub repository URL here_

---

## Table of Contents

1. [Features](#features)
2. [Pages](#pages)
3. [Tech Stack](#tech-stack)
4. [Project Structure](#project-structure)
5. [Getting Started](#getting-started)
6. [How It Works](#how-it-works)
7. [Forms and Validation](#forms-and-validation)
8. [SEO](#seo)
9. [Accessibility](#accessibility)
10. [Deployment](#deployment)
11. [Testing Checklist](#testing-checklist)
12. [Known Limitations](#known-limitations)
13. [Documentation Files](#documentation-files)
14. [References](#references)

---

## Features

**Shopping**
- Product catalogue of 10 items (8 fragrances, 2 home fragrances) rendered dynamically from a single data file
- Live search (name, category, description and scent notes), category filter, and sort by name or price
- Live result count and a "clear filters" control
- Dynamic product-detail page driven by a URL parameter (`product-detail.html?id=3`)
- Cart with add, remove and quantity controls (maximum 20 per item)
- "Fly to cart" animation, cart badge update and toast notifications
- Delivery options with live totals: Standard (R80), Express (R120) or Collect in store (free)
- VAT-inclusive pricing with the 15% VAT portion shown on the cart, checkout and receipt
- Cart and delivery choice persist across pages and browser tabs

**Checkout**
- Validated customer, delivery and payment-method fields
- Delivery address fields are automatically hidden and not required for in-store collection
- Demo order creation with an order number (`TPS-YYYYMMDD-XXXX`) and timestamp
- Order confirmation page with a digital receipt and a **Print Receipt** button (print-specific CSS)

**Interactive elements**
- Light/dark mode toggle that remembers the visitor's choice
- FAQ accordion on the Support page
- Responsive fragrance gallery with an accessible lightbox (`<dialog>`) on the Shop page
- Interactive Google Map embed for the Durban store, with a directions link

**Forms**
- Product Enquiry form with an instant on-page response (availability, estimated total, budget comparison)
- Contact form that also generates a prepared `mailto:` email
- Demo Login and Registration forms with validation
- Both Netlify-enabled forms submit asynchronously when deployed

---

## Pages

| Page | File | Purpose |
|---|---|---|
| Home | `index.html` | Landing page and featured products |
| About Us | `about.html` | Brand story |
| Shop | `shop.html` | Searchable, filterable catalogue and gallery lightbox |
| Product Details | `product-detail.html` | Single product view (`?id=`) |
| Cart | `cart.html` | Cart lines, quantity controls, delivery selection, totals |
| Checkout | `checkout.html` | Customer details, delivery and demo payment |
| Confirmation | `confirmation.html` | Order confirmation and printable receipt |
| Support | `support.html` | Customer support and FAQ accordion |
| Enquiry | `enquiry.html` | Product enquiry form |
| Contact | `contact.html` | General contact form |
| Store | `store.html` | Durban store details, opening hours and Google Map |
| Login | `login.html` | Demo login form |
| Register | `register.html` | Demo registration form |
| 404 | `404.html` | Custom "page not found" page |

---

## Tech Stack

- **HTML5**: semantic markup, ARIA attributes, JSON-LD structured data
- **CSS3**: custom properties (design tokens), Grid/Flexbox, responsive breakpoints at 1080px, 760px and 460px, print stylesheet, `prefers-reduced-motion` support
- **JavaScript (ES2022, vanilla)**: DOM manipulation, `localStorage`, `Intl.NumberFormat`, `fetch`, `<dialog>` API
- **Netlify**: static hosting and Netlify Forms
- **Google Maps embed**: store location (no API key required)

Visual direction: cinematic black, wine red and soft gold on a cream background.

---

## Project Structure

```
ThePerfumeshop_Part3_Final/
├── index.html
├── about.html
├── shop.html
├── product-detail.html
├── cart.html
├── checkout.html
├── confirmation.html
├── support.html
├── enquiry.html
├── contact.html
├── store.html
├── login.html
├── register.html
├── 404.html
├── css/
│   └── stylesheet.css          # All styling, including print and dark-mode rules
├── javascript/
│   ├── products.js             # Single source of truth for the product catalogue
│   └── script.js               # All site behaviour (cart, search, forms, etc.)
├── images/                     # Product and gallery images (descriptive filenames)
├── robots.txt
├── sitemap.xml
├── netlify.toml                # Netlify publish settings and redirect
├── _headers                    # Security headers
├── CHANGELOG.md
├── DEPLOYMENT-GUIDE.md
├── PART3-RUBRIC-CHECKLIST.md
├── SEO-PART3-NOTES.md
└── REFERENCES.md
```

---

## Getting Started

There is nothing to install or build.

### Run locally

**Option 1: VS Code Live Server (recommended)**
1. Open the project folder in VS Code.
2. Install the **Live Server** extension.
3. Right-click `index.html` and choose **Open with Live Server**.

**Option 2: Python**
```bash
cd ThePerfumeshop_Part3_Final
python3 -m http.server 8000
# open http://localhost:8000
```

**Option 3: Node**
```bash
npx serve .
```

Serving over HTTP is recommended over opening files with `file://`, because the forms only attempt their asynchronous Netlify submission on `http(s)` pages.

---

## How It Works

### Shared product catalogue
`javascript/products.js` defines `window.PERFUME_PRODUCTS`, an array of product objects. The catalogue, product-detail page, cart, checkout and enquiry form all read from it, so names, prices and images can never drift out of sync.

```js
{
  id: '1',
  name: 'Art of Universe',
  category: 'fragrances',          // 'fragrances' | 'home-fragrances'
  categoryLabel: 'Fragrances',
  price: 85000,                    // in cents (R850.00)
  image: 'images/art-of-universe-perfume.jpg',
  alt: 'Descriptive alt text',
  description: '...',
  notes: 'Vanilla · Sandalwood · Warm woods',
  stock: true,
  featured: true
}
```

**To add a product:** add an object to the array with a unique `id`, put the image in `images/`, and it will appear in the shop, search, detail page, cart and enquiry dropdown automatically.

> Prices are stored in **cents** to avoid floating-point rounding errors and formatted as South African rand (`R850.00`) via `Intl.NumberFormat('en-ZA')`.

### Product list
| ID | Product | Category | Price |
|---|---|---|---|
| 1 | Art of Universe | Fragrances | R850.00 |
| 2 | Atlantis | Fragrances | R750.00 |
| 3 | Club de Nuit | Fragrances | R950.00 |
| 4 | Art of Arabia III | Fragrances | R1,200.00 |
| 5 | Khamrah Lattafa | Fragrances | R680.00 |
| 6 | Proud of You Amber | Fragrances | R620.00 |
| 7 | Scentemy | Fragrances | R550.00 |
| 8 | Asad | Fragrances | R700.00 |
| 9 | Amber Room Diffuser | Home Fragrances | R420.00 |
| 10 | Vanilla Oud Home Fragrance | Home Fragrances | R390.00 |

### Cart, totals and storage
The cart is stored in `localStorage` as `{ productId: quantity }`. Totals are calculated by a single function:

```
subtotal    = Σ (price × quantity)
shipping    = 0 if cart is empty, otherwise the chosen delivery price
total       = subtotal + shipping
VAT included = total × 15 / 115
```

| Delivery option | Price | Timeframe |
|---|---|---|
| Standard | R80.00 | 5–7 business days |
| Express | R120.00 | 2–3 business days |
| Collect in store | Free | Durban store |

`localStorage` keys (all versioned `v3`):

| Key | Contents |
|---|---|
| `thePerfumeShop.cart.v3` | Cart contents |
| `thePerfumeShop.shipping.v3` | Selected delivery method |
| `thePerfumeShop.lastOrder.v3` | Most recent demo order, used for the receipt |
| `thePerfumeShop.theme.v3` | `light` or `dark` |

All storage access is wrapped in `try/catch`, so the site still works if storage is blocked (e.g. private browsing). A `storage` event listener keeps multiple open tabs in sync.

### Script organisation
`script.js` is a single IIFE in strict mode. On `DOMContentLoaded` it runs one `setup…()` function per feature (`setupTheme`, `setupCatalogue`, `setupProductDetail`, `setupCart`, `setupCheckout`, `setupConfirmation`, `setupLightbox`, `setupFaq`, `setupEnquiryForm`, `setupContactForm`, `setupAuthForms`, …). Each one exits immediately if its elements are not on the current page, so one script file is shared by every page.

User-supplied text is passed through `escapeHtml()` before being inserted into the DOM.

---

## Forms and Validation

All forms use `data-validated-form`, which switches off the browser's default bubbles in favour of custom, accessible inline errors (`aria-invalid`, `aria-live="polite"`). Validation runs on submit, on blur, and re-checks live once a field has been flagged. The first invalid field receives focus.

| Form | File | Fields | Behaviour on success |
|---|---|---|---|
| Enquiry | `enquiry.html` | name, email, phone, product, quantity, fulfilment, budget, message | Shows availability, estimated total and budget comparison, then submits to Netlify Forms |
| Contact | `contact.html` | name, email, phone (optional), message type, message | Shows a "Message ready" panel with a prepared email to `support@theperfumeshop.co.za`, and submits to Netlify Forms |
| Checkout | `checkout.html` | full name, email, phone, delivery method, address, city, province, postal code, payment method | Creates a demo order and redirects to `confirmation.html` |
| Login | `login.html` | email, password (min 8 chars) | Validation message only |
| Register | `register.html` | name, email, phone, password, confirm password | Validation message only |

South African mobile numbers are validated with the pattern `(?:\+27|0)[6-8][0-9]{8}` (e.g. `0821234567` or `+27821234567`).

**Netlify Forms:** the enquiry and contact forms carry `data-netlify="true"` and a hidden `form-name` field. When served over `http(s)`, `submitFormAjax()` posts them as `application/x-www-form-urlencoded`. When previewed locally the site falls back gracefully and tells the user what would happen on Netlify.

---

## SEO

- Unique, descriptive `<title>` and meta description on every page
- Meta keywords on each main page (included because the assessment rubric asks for them)
- One `<h1>` per page with a logical H2/H3 hierarchy
- Canonical URLs and Open Graph metadata
- Descriptive image filenames (e.g. `khamrah-lattafa-perfume.jpg`) and meaningful `alt` text
- Lazy-loaded gallery images
- `robots.txt` and `sitemap.xml`
- `Store` structured data (JSON-LD) on the Store page, including address, phone and opening hours
- Internal links between Shop, Store, Support, Enquiry, Contact and Cart
- Mobile-responsive layouts

See [`SEO-PART3-NOTES.md`](SEO-PART3-NOTES.md) for the keyword strategy and the off-page SEO plan.

---

## Accessibility

- Semantic landmarks and a single `<h1>` per page
- Labelled form controls with `aria-live` error messages and focus moved to the first error
- Lightbox built on the native `<dialog>` element with a close button, backdrop click and Escape support
- FAQ buttons use `aria-expanded`; the current page is marked with `aria-current="page"`
- Cart link announces its item count (`aria-label`)
- Toast and status messages use live regions
- `prefers-reduced-motion` respected in CSS
- Descriptive alt text on meaningful images

---

## Deployment

The site is a static folder, so it deploys anywhere. **Netlify** is recommended because it also captures the two form submissions.

**Drag and drop**
1. Sign in to Netlify and choose to deploy a site manually.
2. Drag the entire project folder in (the root must contain `index.html`).
3. In **Forms**, enable form detection and redeploy once so the `enquiry` and `contact` forms are picked up.
4. Submit one test enquiry and one test contact message.

**Connected to GitHub**
1. Push the project to GitHub.
2. In Netlify choose **Import an existing project** and select the repository.
3. Leave the build command empty and set the publish directory to `.` (where `index.html` lives).

`netlify.toml` publishes the project root and redirects `/home` to `/index.html`. `_headers` adds `X-Content-Type-Options`, `Referrer-Policy`, `X-Frame-Options` and `Permissions-Policy`.

Full steps and a post-deploy test list are in [`DEPLOYMENT-GUIDE.md`](DEPLOYMENT-GUIDE.md). If you attach a custom domain such as `www.theperfumeshop.co.za`, update the canonical URLs, `sitemap.xml` and `robots.txt` to match.

---

## Testing Checklist

- [ ] Home page loads with no console errors; all nav links work
- [ ] Search, category filter and sort update the catalogue and result count
- [ ] Add to Cart plays the animation, shows a toast and updates the cart badge
- [ ] Quantity changes and removals recalculate totals immediately
- [ ] Switching delivery method updates shipping, VAT and total
- [ ] Checkout rejects invalid input, then creates an order and receipt
- [ ] Print Receipt opens the print dialog with a clean receipt layout
- [ ] Dark mode persists after a refresh
- [ ] Gallery lightbox opens and closes (button, backdrop, Escape)
- [ ] FAQ accordion opens and closes
- [ ] Enquiry and Contact forms show errors for bad input and a response for valid input
- [ ] Google Map loads on the Store page
- [ ] Layout checked at mobile width in browser developer tools
- [ ] Enquiry and Contact submissions appear in Netlify Forms after deployment

---

## Known Limitations

This is an academic demonstration, not a production store.

- **No real payments.** Checkout is a demo; no card or banking details are collected.
- **No real authentication.** Login and Register only validate input. No account or password is stored, because a static site has no secure backend or database.
- **Orders are local to the browser.** The "order" and receipt live in `localStorage` and are not sent to a server or emailed.
- **Stock is a static flag** in `products.js`, not live inventory.
- **Placeholder business details.** The store address (123 Main Street, Durban 4001), phone number, social links and support email are demo data and should be replaced with real details before any real-world use.
- **Map location** is centred on Durban generally, not a specific street address.
- **Shared images:** the Vanilla Oud and Amber Room home-fragrance products use illustrative collection/ambient imagery rather than dedicated product photos.

---

## Documentation Files

| File | Contents |
|---|---|
| [`CHANGELOG.md`](CHANGELOG.md) | Part 3 corrections and enhancements, grouped by feature |
| [`DEPLOYMENT-GUIDE.md`](DEPLOYMENT-GUIDE.md) | Step-by-step Netlify deployment and final test list |
| [`SEO-PART3-NOTES.md`](SEO-PART3-NOTES.md) | Keyword set, on-page and local SEO, off-page plan |
| [`PART3-RUBRIC-CHECKLIST.md`](PART3-RUBRIC-CHECKLIST.md) | Pre-submission checklist against the assessment rubric |
| [`REFERENCES.md`](REFERENCES.md) | Technical references |

---

## References

- Netlify (2026) *Create deploys*. https://docs.netlify.com/deploy/create-deploys/
- Netlify (2026) *Forms setup*. https://docs.netlify.com/manage/forms/setup/
- MDN Web Docs *Client-side form validation*. https://developer.mozilla.org/en-US/docs/Learn_web_development/Extensions/Forms/Form_validation
- MDN Web Docs *Web Storage API*. https://developer.mozilla.org/en-US/docs/Web/API/Web_Storage_API
- MDN Web Docs *HTMLDialogElement*. https://developer.mozilla.org/en-US/docs/Web/API/HTMLDialogElement
- Schema.org *Store*. https://schema.org/Store
- Google Maps Platform *Maps URLs*. https://developers.google.com/maps/documentation/urls/get-started

See [`REFERENCES.md`](REFERENCES.md) for the full Harvard-style entries.

---

## Author


Lusanda Bulelwa Radebe, ST10512932, WEB DEVELOPMENT 5020
