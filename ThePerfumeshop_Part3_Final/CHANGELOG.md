# The Perfume Shop — Part 3 Changelog

This changelog records the Part 3 corrections and enhancements. Use these entries as the basis for your GitHub commit history and expand them with any lecturer feedback from Part 2.

## 2026-09-30 — Catalogue and cart correction
- Replaced disconnected product values with one shared JavaScript product catalogue (`javascript/products.js`).
- Corrected the mismatch between catalogue items and cart items by using the same product ID, name, image and price everywhere.
- Added live cart quantity controls, remove-item controls and cart count updates.
- Added live subtotal, delivery, VAT-included information and final total calculations in South African rand.
- Added persistent cart and delivery selection using browser local storage.

## 2026-09-30 — JavaScript interactivity and motion
- Added dynamic product rendering using DOM manipulation.
- Added live search, category filtering and name/price sorting.
- Added add-to-cart motion where the selected product image moves toward the cart and the cart reacts on arrival.
- Added toast feedback after cart actions.
- Added interactive FAQ accordions.
- Added persistent light/dark mode with an accessible theme toggle.

## 2026-09-30 — Gallery and lightbox
- Added a responsive fragrance gallery to the Shop page.
- Added an accessible lightbox dialog that opens gallery images in a larger view.
- Added keyboard-friendly close controls and descriptive image alternative text.

## 2026-09-30 — Store and local functionality
- Replaced the placeholder map embed with an interactive Google Maps embed for Durban, KwaZulu-Natal.
- Added a directions link and local store information.
- Added LocalBusiness/Store structured data for local SEO.

## 2026-09-30 — Required enquiry form
- Added `enquiry.html` with text, email, telephone, select, number and textarea controls.
- Added HTML5 and JavaScript validation with field-specific error messages.
- Added an immediate JavaScript response showing selected-product availability and an estimated cost.
- Added asynchronous form-submission code for Netlify Forms when deployed.

## 2026-09-30 — Required contact form
- Added `contact.html` with contact information, message type and full-message controls.
- Added HTML5 and JavaScript validation with user-friendly error messages.
- Added asynchronous form-submission code for Netlify Forms when deployed.
- Added generation of a prepared email to `support@theperfumeshop.co.za` as a fallback/contact workflow.

## 2026-09-30 — Checkout and printable receipt
- Added a functional `checkout.html` page.
- Added delivery/collection switching and live checkout totals.
- Added validated customer/contact and delivery fields.
- Added demo order creation with an order number and timestamp.
- Added a working confirmation page with a digital receipt.
- Added a Print Receipt button and print-specific CSS.

## 2026-09-30 — SEO improvements
- Added unique title tags and page-specific meta descriptions.
- Added relevant meta keywords to each page.
- Added canonical URLs and Open Graph metadata.
- Renamed catalogue image files using descriptive, search-friendly filenames.
- Added descriptive `alt` text to meaningful images.
- Improved heading structure and internal linking between pages.
- Added `robots.txt` and `sitemap.xml`.
- Added local store structured data.
- Retained responsive layouts for mobile friendliness.

## 2026-09-30 — Deployment preparation
- Added `netlify.toml` for a simple static Netlify deployment.
- Added `_headers` with basic browser security headers.
- Added `DEPLOYMENT-GUIDE.md` with step-by-step deployment instructions.
- Added `PART3-RUBRIC-CHECKLIST.md` to help verify the assessment criteria before submission.
