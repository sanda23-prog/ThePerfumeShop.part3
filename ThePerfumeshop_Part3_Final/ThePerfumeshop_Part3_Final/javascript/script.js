/* ================================================================
   THE PERFUME SHOP — PART 3 FUNCTIONALITY
   Plain JavaScript only. No framework is required for the assessment.
   Features: theme persistence, dynamic catalogue, search/sort/filter,
   cart + live totals, motion, lightbox, FAQ, form validation/AJAX,
   checkout, printable receipt and small accessibility enhancements.
   ================================================================ */
(() => {
  'use strict';

  const PRODUCTS = Array.isArray(window.PERFUME_PRODUCTS) ? window.PERFUME_PRODUCTS : [];
  const PRODUCT_MAP = new Map(PRODUCTS.map(product => [String(product.id), product]));
  const CART_KEY = 'thePerfumeShop.cart.v3';
  const SHIPPING_KEY = 'thePerfumeShop.shipping.v3';
  const ORDER_KEY = 'thePerfumeShop.lastOrder.v3';
  const THEME_KEY = 'thePerfumeShop.theme.v3';
  const MAX_QTY = 20;
  const SHIPPING = {
    standard: { label: 'Standard delivery (5–7 business days)', price: 8000 },
    express: { label: 'Express delivery (2–3 business days)', price: 12000 },
    collection: { label: 'Collect in store', price: 0 }
  };

  const $ = (selector, root = document) => root.querySelector(selector);
  const $$ = (selector, root = document) => [...root.querySelectorAll(selector)];

  function money(cents) {
    return new Intl.NumberFormat('en-ZA', {
      style: 'currency', currency: 'ZAR', minimumFractionDigits: 2
    }).format((Number(cents) || 0) / 100);
  }

  function escapeHtml(value) {
    return String(value ?? '').replace(/[&<>"']/g, character => ({
      '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'
    }[character]));
  }

  function safeRead(key, fallback) {
    try {
      const value = JSON.parse(localStorage.getItem(key));
      return value ?? fallback;
    } catch {
      return fallback;
    }
  }

  function safeWrite(key, value) {
    try {
      localStorage.setItem(key, JSON.stringify(value));
      return true;
    } catch {
      toast('Browser storage is unavailable. Changes may reset after refresh.');
      return false;
    }
  }

  function getCart() {
    const stored = safeRead(CART_KEY, {});
    const clean = {};
    if (!stored || typeof stored !== 'object' || Array.isArray(stored)) return clean;
    for (const [id, quantity] of Object.entries(stored)) {
      const qty = Number(quantity);
      if (PRODUCT_MAP.has(id) && Number.isInteger(qty) && qty >= 1 && qty <= MAX_QTY) clean[id] = qty;
    }
    return clean;
  }

  function saveCart(cart) {
    safeWrite(CART_KEY, cart);
    updateCartCount(cart);
  }

  function cartLines(cart = getCart()) {
    return Object.entries(cart)
      .map(([id, quantity]) => ({ ...PRODUCT_MAP.get(id), quantity }))
      .filter(line => line.name);
  }

  function shippingMethod() {
    const stored = safeRead(SHIPPING_KEY, 'standard');
    return Object.hasOwn(SHIPPING, stored) ? stored : 'standard';
  }

  function calculateTotals(cart = getCart(), method = shippingMethod()) {
    const subtotal = cartLines(cart).reduce((sum, line) => sum + line.price * line.quantity, 0);
    const shipping = subtotal > 0 ? SHIPPING[method].price : 0;
    const total = subtotal + shipping;
    // South African retail prices are treated as VAT-inclusive in this demo.
    const vatIncluded = Math.round(total * 15 / 115);
    return { subtotal, shipping, vatIncluded, total };
  }

  function updateCartCount(cart = getCart()) {
    const count = Object.values(cart).reduce((sum, qty) => sum + Number(qty || 0), 0);
    $$('.cart-count').forEach(element => { element.textContent = String(count); });
    $$('.cart-icon a').forEach(link => link.setAttribute('aria-label', `Shopping cart with ${count} item${count === 1 ? '' : 's'}`));
  }

  let toastTimer;
  function toast(message) {
    let box = $('#shop-toast');
    if (!box) {
      box = document.createElement('div');
      box.id = 'shop-toast';
      box.className = 'shop-toast';
      box.setAttribute('role', 'status');
      box.setAttribute('aria-live', 'polite');
      document.body.append(box);
    }
    box.textContent = message;
    box.hidden = false;
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => { box.hidden = true; }, 3200);
  }

  /* ------------------------- THEME ------------------------- */
  function preferredTheme() {
    const stored = localStorage.getItem(THEME_KEY);
    if (stored === 'light' || stored === 'dark') return stored;
    return window.matchMedia?.('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  }

  function setTheme(theme, persist = true) {
    document.documentElement.dataset.theme = theme;
    if (persist) {
      try { localStorage.setItem(THEME_KEY, theme); } catch { /* non-critical */ }
    }
    $$('.theme-toggle').forEach(button => {
      const dark = theme === 'dark';
      button.setAttribute('aria-pressed', String(dark));
      button.setAttribute('aria-label', dark ? 'Switch to light mode' : 'Switch to dark mode');
      button.title = dark ? 'Switch to light mode' : 'Switch to dark mode';
      const icon = $('.theme-icon', button);
      const text = $('.theme-text', button);
      if (icon) icon.textContent = dark ? '☀' : '☾';
      if (text) text.textContent = dark ? 'Light' : 'Dark';
    });
  }

  function setupTheme() {
    setTheme(preferredTheme(), false);
    $$('.theme-toggle').forEach(button => {
      button.addEventListener('click', () => {
        setTheme(document.documentElement.dataset.theme === 'dark' ? 'light' : 'dark');
      });
    });
  }

  /* ---------------------- CATALOGUE ------------------------ */
  function productCard(product) {
    return `<article class="product-card" data-product-id="${escapeHtml(product.id)}" data-category="${escapeHtml(product.category)}">
      <a class="product-image-link" href="product-detail.html?id=${encodeURIComponent(product.id)}" aria-label="View ${escapeHtml(product.name)} details">
        <img src="${escapeHtml(product.image)}" alt="${escapeHtml(product.alt)}" width="520" height="520" loading="lazy" class="product-image">
      </a>
      <div class="product-info">
        <h3 class="product-name"><a href="product-detail.html?id=${encodeURIComponent(product.id)}">${escapeHtml(product.name)}</a></h3>
        <p class="product-category">${escapeHtml(product.categoryLabel)}</p>
        <p class="product-description">${escapeHtml(product.description)}</p>
        <div class="product-footer">
          <span class="product-price">${money(product.price)}</span>
          <button class="btn btn-add-cart" type="button" data-add-cart="${escapeHtml(product.id)}">Add to Cart</button>
        </div>
      </div>
    </article>`;
  }

  function currentShopProducts() {
    const query = ($('#search-products')?.value || '').trim().toLowerCase();
    const category = $('#category-filter')?.value || '';
    const sort = $('#sort-select')?.value || 'name-asc';
    const list = PRODUCTS.filter(product => {
      const searchable = `${product.name} ${product.categoryLabel} ${product.description} ${product.notes}`.toLowerCase();
      return (!query || searchable.includes(query)) && (!category || product.category === category);
    });
    list.sort((a, b) => {
      if (sort === 'price-low') return a.price - b.price;
      if (sort === 'price-high') return b.price - a.price;
      if (sort === 'name-desc') return b.name.localeCompare(a.name);
      return a.name.localeCompare(b.name);
    });
    return list;
  }

  function renderCatalogue() {
    const grid = $('#products-grid');
    if (!grid) return;
    const list = currentShopProducts();
    grid.innerHTML = list.map(productCard).join('');
    const status = $('#catalog-search-status');
    if (status) status.textContent = `${list.length} ${list.length === 1 ? 'product' : 'products'} found`;
    const empty = $('#catalog-empty');
    if (empty) empty.hidden = list.length > 0;
  }

  function renderFeaturedProducts() {
    const grid = $('#featured-products');
    if (!grid) return;
    const featured = PRODUCTS.filter(product => product.featured).slice(0, 4);
    grid.innerHTML = featured.map(productCard).join('');
  }

  function addToCart(id, quantity = 1, sourceButton = null) {
    const product = PRODUCT_MAP.get(String(id));
    if (!product) return;
    const qty = Number(quantity);
    if (!Number.isInteger(qty) || qty < 1 || qty > MAX_QTY) {
      toast(`Choose a whole quantity from 1 to ${MAX_QTY}.`);
      return;
    }
    const cart = getCart();
    const next = (cart[product.id] || 0) + qty;
    if (next > MAX_QTY) {
      toast(`Maximum quantity is ${MAX_QTY} per product.`);
      return;
    }
    cart[product.id] = next;
    saveCart(cart);
    toast(`${product.name} added to your cart.`);
    if (sourceButton) {
      const original = sourceButton.textContent;
      sourceButton.textContent = 'Added ✓';
      sourceButton.classList.add('is-added');
      setTimeout(() => {
        if (sourceButton.isConnected) {
          sourceButton.textContent = original;
          sourceButton.classList.remove('is-added');
        }
      }, 900);
      const card = sourceButton.closest('.product-card');
      const image = card?.querySelector('.product-image') || $('#detail-main-image');
      flyToCart(image, sourceButton);
    }
  }

  function flyToCart(image, sourceButton) {
    const cartLink = $('.cart-icon a');
    if (!image || !cartLink || !Element.prototype.animate || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const startRect = image.getBoundingClientRect();
    const endRect = cartLink.getBoundingClientRect();
    const ghost = image.cloneNode(true);
    ghost.className = 'flying-product';
    ghost.alt = '';
    ghost.setAttribute('aria-hidden', 'true');
    const startX = startRect.left + startRect.width / 2;
    const startY = startRect.top + startRect.height / 2;
    const endX = endRect.left + endRect.width / 2;
    const endY = endRect.top + endRect.height / 2;
    ghost.style.left = `${startX - 32}px`;
    ghost.style.top = `${startY - 40}px`;
    document.body.append(ghost);
    const dx = endX - startX;
    const dy = endY - startY;
    const animation = ghost.animate([
      { transform: 'translate(0, 0) scale(1) rotate(0deg)', opacity: 1 },
      { transform: `translate(${dx * 0.5}px, ${dy * 0.35 - 90}px) scale(.72) rotate(10deg)`, opacity: .95, offset: .55 },
      { transform: `translate(${dx}px, ${dy}px) scale(.12) rotate(20deg)`, opacity: 0 }
    ], { duration: 650, easing: 'cubic-bezier(.22,.7,.2,1)' });
    animation.finished.then(() => {
      ghost.remove();
      cartLink.animate([
        { transform: 'scale(1) rotate(0)' },
        { transform: 'scale(1.13) rotate(-6deg)' },
        { transform: 'scale(1.08) rotate(5deg)' },
        { transform: 'scale(1) rotate(0)' }
      ], { duration: 360, easing: 'ease-out' });
    }).catch(() => ghost.remove());
  }

  function setupCatalogue() {
    renderCatalogue();
    renderFeaturedProducts();
    $('#search-products')?.addEventListener('input', renderCatalogue);
    $('#category-filter')?.addEventListener('change', renderCatalogue);
    $('#sort-select')?.addEventListener('change', renderCatalogue);
    $('#clear-filters')?.addEventListener('click', () => {
      if ($('#search-products')) $('#search-products').value = '';
      if ($('#category-filter')) $('#category-filter').value = '';
      if ($('#sort-select')) $('#sort-select').value = 'name-asc';
      renderCatalogue();
    });
  }

  /* --------------------- PRODUCT DETAIL -------------------- */
  function setupProductDetail() {
    const root = $('#product-detail-root');
    if (!root) return;
    const id = new URLSearchParams(location.search).get('id') || PRODUCTS[0]?.id;
    const product = PRODUCT_MAP.get(String(id));
    if (!product) {
      root.innerHTML = '<div class="empty-state"><h2>Product not found</h2><p>Please return to the catalogue.</p><a class="btn btn-primary" href="shop.html">Back to Shop</a></div>';
      return;
    }
    document.title = `${product.name} | The Perfume Shop`;
    const meta = $('meta[name="description"]');
    if (meta) meta.content = `${product.name} at The Perfume Shop. ${product.description}`;
    const image = $('#detail-main-image');
    if (image) { image.src = product.image; image.alt = product.alt; }
    if ($('#detail-product-name')) $('#detail-product-name').textContent = product.name;
    if ($('#detail-category')) $('#detail-category').textContent = product.categoryLabel;
    if ($('#detail-description')) $('#detail-description').textContent = product.description;
    if ($('#detail-notes')) $('#detail-notes').textContent = product.notes;
    if ($('#detail-price')) $('#detail-price').textContent = money(product.price);
    const button = $('#detail-add-cart');
    if (button) button.dataset.productId = product.id;
  }

  /* ------------------------- CART -------------------------- */
  function renderCartPage() {
    const list = $('#cart-items-list');
    if (!list) return;
    const cart = getCart();
    const lines = cartLines(cart);
    list.innerHTML = lines.map(line => `<tr>
      <td class="cart-product">
        <a href="product-detail.html?id=${encodeURIComponent(line.id)}">
          <img src="${escapeHtml(line.image)}" alt="" width="58" height="68">
          <span>${escapeHtml(line.name)}</span>
        </a>
      </td>
      <td data-label="Price">${money(line.price)}</td>
      <td data-label="Quantity">
        <div class="quantity-control">
          <button type="button" data-qty-step="-1" data-product-id="${escapeHtml(line.id)}" aria-label="Decrease ${escapeHtml(line.name)} quantity">−</button>
          <input type="number" min="1" max="${MAX_QTY}" step="1" value="${line.quantity}" data-cart-quantity="${escapeHtml(line.id)}" aria-label="Quantity for ${escapeHtml(line.name)}">
          <button type="button" data-qty-step="1" data-product-id="${escapeHtml(line.id)}" aria-label="Increase ${escapeHtml(line.name)} quantity">+</button>
        </div>
      </td>
      <td data-label="Subtotal">${money(line.price * line.quantity)}</td>
      <td><button type="button" class="text-button" data-remove-cart="${escapeHtml(line.id)}">Remove</button></td>
    </tr>`).join('');
    const table = $('.cart-table');
    const empty = $('#empty-cart-message');
    if (table) table.hidden = lines.length === 0;
    if (empty) empty.hidden = lines.length > 0;
    const method = shippingMethod();
    const select = $('#shipping-method');
    if (select) select.value = method;
    renderTotals(cart, method);
    const checkout = $('#checkout-button');
    if (checkout) {
      const emptyCart = lines.length === 0;
      checkout.classList.toggle('is-disabled', emptyCart);
      checkout.setAttribute('aria-disabled', String(emptyCart));
      checkout.href = emptyCart ? '#' : 'checkout.html';
      checkout.tabIndex = emptyCart ? -1 : 0;
    }
  }

  function renderTotals(cart = getCart(), method = shippingMethod()) {
    const totals = calculateTotals(cart, method);
    const values = {
      subtotal: totals.subtotal,
      shipping: totals.shipping,
      'vat-included': totals.vatIncluded,
      total: totals.total,
      'checkout-subtotal': totals.subtotal,
      'checkout-shipping': totals.shipping,
      'checkout-vat': totals.vatIncluded,
      'checkout-total': totals.total
    };
    for (const [id, value] of Object.entries(values)) {
      const element = document.getElementById(id);
      if (element) element.textContent = money(value);
    }
  }

  function changeCartQuantity(id, nextQuantity) {
    const cart = getCart();
    if (!cart[id]) return;
    const qty = Number(nextQuantity);
    if (!Number.isInteger(qty) || qty < 1 || qty > MAX_QTY) {
      toast(`Quantity must be between 1 and ${MAX_QTY}.`);
      renderCartPage();
      return;
    }
    cart[id] = qty;
    saveCart(cart);
    renderCartPage();
    renderCheckoutSummary();
  }

  function setupCart() {
    renderCartPage();
    $('#shipping-method')?.addEventListener('change', event => {
      safeWrite(SHIPPING_KEY, event.target.value);
      renderTotals(getCart(), event.target.value);
    });
  }

  /* ------------------------ CHECKOUT ----------------------- */
  function renderCheckoutSummary() {
    const container = $('#checkout-items-list');
    if (!container) return;
    const lines = cartLines();
    container.innerHTML = lines.map(line => `<div class="checkout-item">
      <span>${escapeHtml(line.name)} <small>× ${line.quantity}</small></span>
      <strong>${money(line.price * line.quantity)}</strong>
    </div>`).join('');
    renderTotals();
    const submit = $('#checkout-form button[type="submit"]');
    if (submit) submit.disabled = lines.length === 0;
    const empty = $('#checkout-empty');
    if (empty) empty.hidden = lines.length > 0;
  }

  function setupCheckout() {
    renderCheckoutSummary();
    const form = $('#checkout-form');
    if (!form) return;
    const method = shippingMethod();
    const shippingInput = form.elements.shippingMethod;
    if (shippingInput) shippingInput.value = method;
    shippingInput?.addEventListener('change', () => {
      safeWrite(SHIPPING_KEY, shippingInput.value);
      renderCheckoutSummary();
      toggleDeliveryFields();
    });
    toggleDeliveryFields();

    form.addEventListener('submit', event => {
      event.preventDefault();
      clearFormErrors(form);
      if (!validateForm(form)) return;
      const lines = cartLines();
      if (!lines.length) {
        toast('Your cart is empty. Add a fragrance before checkout.');
        return;
      }
      const selectedShipping = shippingInput?.value || shippingMethod();
      safeWrite(SHIPPING_KEY, selectedShipping);
      const totals = calculateTotals(getCart(), selectedShipping);
      const order = {
        id: makeOrderNumber(),
        date: new Date().toISOString(),
        shippingMethod: selectedShipping,
        customerName: String(form.elements.fullName.value).trim(),
        email: String(form.elements.email.value).trim(),
        items: lines.map(line => ({ id: line.id, name: line.name, price: line.price, quantity: line.quantity })),
        ...totals
      };
      safeWrite(ORDER_KEY, order);
      safeWrite(CART_KEY, {});
      updateCartCount({});
      location.href = 'confirmation.html';
    });
  }

  function toggleDeliveryFields() {
    const form = $('#checkout-form');
    const fields = $('#delivery-fields');
    if (!form || !fields) return;
    const collection = form.elements.shippingMethod?.value === 'collection';
    fields.hidden = collection;
    $$('input, select', fields).forEach(input => {
      input.disabled = collection;
      if (input.dataset.deliveryRequired === 'true') input.required = !collection;
    });
  }

  function makeOrderNumber() {
    const date = new Date();
    const ymd = date.toISOString().slice(0, 10).replaceAll('-', '');
    const suffix = window.crypto?.randomUUID ? crypto.randomUUID().slice(0, 6).toUpperCase() : Math.random().toString(36).slice(2, 8).toUpperCase();
    return `TPS-${ymd}-${suffix}`;
  }

  /* ---------------------- CONFIRMATION --------------------- */
  function setupConfirmation() {
    const receipt = $('#receipt-items');
    if (!receipt) return;
    const order = safeRead(ORDER_KEY, null);
    if (!order?.items?.length) {
      const container = $('.confirmation-container');
      if (container) container.innerHTML = '<h2>No recent order found</h2><p>Your demo receipt will appear here after checkout.</p><a class="btn btn-primary" href="shop.html">Go to Shop</a>';
      return;
    }
    $('#order-number').textContent = order.id;
    $('#order-date').textContent = new Date(order.date).toLocaleString('en-ZA', { dateStyle: 'long', timeStyle: 'short' });
    $('#order-total').textContent = money(order.total);
    $('#delivery-date').textContent = SHIPPING[order.shippingMethod]?.label || 'Delivery method selected at checkout';
    receipt.innerHTML = order.items.map(item => `<div class="checkout-item">
      <span>${escapeHtml(item.name)} <small>${item.quantity} × ${money(item.price)}</small></span>
      <strong>${money(item.price * item.quantity)}</strong>
    </div>`).join('') + `
      <div class="summary-line"><span>Subtotal</span><strong>${money(order.subtotal)}</strong></div>
      <div class="summary-line"><span>Delivery / collection</span><strong>${money(order.shipping)}</strong></div>
      <div class="summary-line"><span>VAT included</span><strong>${money(order.vatIncluded)}</strong></div>
      <div class="summary-line total"><span>Total</span><strong>${money(order.total)}</strong></div>`;
  }

  /* ---------------------- LIGHTBOX ------------------------- */
  function setupLightbox() {
    const dialog = $('#lightbox-dialog');
    if (!dialog) return;
    const image = $('#lightbox-image');
    const caption = $('#lightbox-caption');
    document.addEventListener('click', event => {
      const trigger = event.target.closest('[data-lightbox]');
      if (!trigger) return;
      event.preventDefault();
      const source = trigger.dataset.lightbox;
      image.src = source;
      image.alt = trigger.dataset.lightboxAlt || '';
      caption.textContent = trigger.dataset.lightboxCaption || image.alt;
      if (typeof dialog.showModal === 'function') dialog.showModal();
      else dialog.setAttribute('open', '');
    });
    $('#lightbox-close')?.addEventListener('click', () => dialog.close());
    dialog.addEventListener('click', event => {
      if (event.target === dialog) dialog.close();
    });
  }

  /* ------------------------- FAQ --------------------------- */
  function setupFaq() {
    $$('.faq-question').forEach(button => {
      button.addEventListener('click', () => {
        const item = button.closest('.faq-item');
        const answer = $('.faq-answer', item);
        const expanded = button.getAttribute('aria-expanded') === 'true';
        button.setAttribute('aria-expanded', String(!expanded));
        answer.hidden = expanded;
        item.classList.toggle('is-open', !expanded);
      });
    });
  }

  /* -------------------- FORM VALIDATION -------------------- */
  function clearFieldError(field) {
    field.removeAttribute('aria-invalid');
    const holder = field.closest('.form-field');
    const error = holder?.querySelector('.field-error');
    if (error) error.textContent = '';
  }

  function setFieldError(field, message) {
    field.setAttribute('aria-invalid', 'true');
    const holder = field.closest('.form-field');
    const error = holder?.querySelector('.field-error');
    if (error) error.textContent = message;
  }

  function clearFormErrors(form) {
    $$('input, select, textarea', form).forEach(clearFieldError);
  }

  function validationMessage(field) {
    const value = String(field.value || '').trim();
    if (field.validity.valueMissing) return 'Please complete this field.';
    if (field.validity.typeMismatch && field.type === 'email') return 'Enter a valid email address, for example name@example.com.';
    if (field.validity.patternMismatch && field.type === 'tel') return 'Enter a valid South African phone number, for example 0821234567 or +27821234567.';
    if (field.validity.tooShort) return `Please enter at least ${field.minLength} characters.`;
    if (field.validity.rangeUnderflow) return `The minimum allowed value is ${field.min}.`;
    if (field.validity.rangeOverflow) return `The maximum allowed value is ${field.max}.`;
    if (!field.checkValidity()) return field.validationMessage || 'Please check this value.';
    if (field.name === 'confirmPassword') {
      const password = field.form.elements.password?.value || '';
      if (value !== password) return 'Passwords do not match.';
    }
    return '';
  }

  function validateForm(form) {
    let valid = true;
    let firstInvalid = null;
    $$('input, select, textarea', form).filter(field => !field.disabled).forEach(field => {
      clearFieldError(field);
      const message = validationMessage(field);
      if (message) {
        valid = false;
        firstInvalid ||= field;
        setFieldError(field, message);
      }
    });
    firstInvalid?.focus();
    return valid;
  }

  function setupValidationUI() {
    $$('[data-validated-form]').forEach(form => {
      form.setAttribute('novalidate', '');
      form.addEventListener('input', event => {
        const field = event.target;
        if (field.matches('input, select, textarea') && field.getAttribute('aria-invalid') === 'true') {
          clearFieldError(field);
          const message = validationMessage(field);
          if (message) setFieldError(field, message);
        }
      });
      form.addEventListener('blur', event => {
        const field = event.target;
        if (!field.matches('input, select, textarea') || field.disabled) return;
        clearFieldError(field);
        if (String(field.value || '').trim()) {
          const message = validationMessage(field);
          if (message) setFieldError(field, message);
        }
      }, true);
    });
  }

  async function submitFormAjax(form) {
    if (!/^https?:$/.test(location.protocol)) return { submitted: false, reason: 'local-preview' };
    const data = new FormData(form);
    try {
      const response = await fetch(form.action || '/', {
        method: form.method || 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams(data).toString()
      });
      return { submitted: response.ok, reason: response.ok ? 'ok' : `http-${response.status}` };
    } catch {
      return { submitted: false, reason: 'network' };
    }
  }

  function setupEnquiryForm() {
    const form = $('#enquiry-form');
    if (!form) return;
    const select = form.elements.product;
    if (select && select.options.length <= 1) {
      PRODUCTS.forEach(product => {
        const option = document.createElement('option');
        option.value = product.id;
        option.textContent = `${product.name} — ${money(product.price)}`;
        select.append(option);
      });
    }
    form.addEventListener('submit', async event => {
      event.preventDefault();
      clearFormErrors(form);
      if (!validateForm(form)) return;
      const data = new FormData(form);
      const product = PRODUCT_MAP.get(String(data.get('product')));
      const quantity = Number(data.get('quantity')) || 1;
      const fulfilment = String(data.get('fulfilment'));
      const shipping = fulfilment === 'collection' ? 0 : SHIPPING.standard.price;
      const total = (product?.price || 0) * quantity + shipping;
      const budgetRaw = Number(String(data.get('budget') || '').replace(/[^0-9.]/g, ''));
      const budgetMessage = Number.isFinite(budgetRaw) && budgetRaw > 0
        ? (budgetRaw * 100 >= total ? 'This selection is within your stated budget.' : `This is ${money(total - budgetRaw * 100)} above your stated budget.`)
        : 'No budget comparison was requested.';
      const response = $('#enquiry-response');
      response.hidden = false;
      response.innerHTML = `<h3>Enquiry response</h3>
        <p><strong>${escapeHtml(product?.name || 'Selected product')}</strong> is ${product?.stock ? 'currently marked as available' : 'currently marked as unavailable'} in this demo catalogue.</p>
        <p>Estimated ${fulfilment === 'collection' ? 'collection' : 'standard-delivery'} total for ${quantity}: <strong>${money(total)}</strong>.</p>
        <p>${escapeHtml(budgetMessage)}</p>
        <p class="form-processing-status">Sending your enquiry…</p>`;
      const result = await submitFormAjax(form);
      const status = $('.form-processing-status', response);
      if (status) status.textContent = result.submitted
        ? 'Enquiry submitted successfully. A response can now be followed up from the deployed site.'
        : 'Enquiry processed in this demo. On Netlify, the same form is submitted asynchronously to Netlify Forms.';
      response.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    });
  }

  function setupContactForm() {
    const form = $('#contact-form');
    if (!form) return;
    form.addEventListener('submit', async event => {
      event.preventDefault();
      clearFormErrors(form);
      if (!validateForm(form)) return;
      const data = new FormData(form);
      const recipient = 'support@theperfumeshop.co.za';
      const subject = `[${data.get('messageType')}] Message from ${data.get('name')}`;
      const body = `Name: ${data.get('name')}\nEmail: ${data.get('email')}\nPhone: ${data.get('phone') || 'Not supplied'}\n\n${data.get('message')}`;
      const mailto = `mailto:${recipient}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
      const response = $('#contact-response');
      response.hidden = false;
      response.innerHTML = `<h3>Message ready</h3><p>Your information passed client-side validation.</p><p class="form-processing-status">Submitting securely…</p><a class="btn btn-primary" href="${escapeHtml(mailto)}">Open prepared email</a>`;
      const result = await submitFormAjax(form);
      const status = $('.form-processing-status', response);
      if (status) status.textContent = result.submitted
        ? 'Your form was submitted asynchronously. You can also open the prepared email below.'
        : 'Local/GitHub Pages preview: use the prepared email below. Netlify deployment enables asynchronous form capture.';
      response.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    });
  }

  function setupAuthForms() {
    $$('.auth-form[data-demo-auth]').forEach(form => {
      form.addEventListener('submit', event => {
        event.preventDefault();
        clearFormErrors(form);
        if (!validateForm(form)) return;
        const response = $('.auth-response', form.parentElement);
        if (response) {
          response.hidden = false;
          response.textContent = form.dataset.demoAuth === 'register'
            ? 'Demo registration validated successfully. No password is stored because this static site has no secure authentication backend.'
            : 'Demo login form validated successfully. Real authentication requires a secure backend and database.';
        }
      });
    });
  }

  /* --------------------- GLOBAL EVENTS --------------------- */
  function setupGlobalEvents() {
    document.addEventListener('click', event => {
      const add = event.target.closest('[data-add-cart]');
      if (add) addToCart(add.dataset.addCart, 1, add);

      const detailAdd = event.target.closest('#detail-add-cart');
      if (detailAdd) {
        const qty = Number($('#detail-quantity')?.value || 1);
        addToCart(detailAdd.dataset.productId, qty, detailAdd);
      }

      const step = event.target.closest('[data-qty-step]');
      if (step) {
        const id = step.dataset.productId;
        const cart = getCart();
        changeCartQuantity(id, (cart[id] || 1) + Number(step.dataset.qtyStep));
      }

      const remove = event.target.closest('[data-remove-cart]');
      if (remove) {
        const cart = getCart();
        const product = PRODUCT_MAP.get(remove.dataset.removeCart);
        delete cart[remove.dataset.removeCart];
        saveCart(cart);
        renderCartPage();
        renderCheckoutSummary();
        toast(`${product?.name || 'Item'} removed from your cart.`);
      }

      if (event.target.closest('[data-print-receipt]')) window.print();
    });

    document.addEventListener('change', event => {
      const field = event.target.closest('[data-cart-quantity]');
      if (field) changeCartQuantity(field.dataset.cartQuantity, Number(field.value));
    });

    window.addEventListener('storage', event => {
      if ([CART_KEY, SHIPPING_KEY, THEME_KEY].includes(event.key)) {
        updateCartCount();
        renderCartPage();
        renderCheckoutSummary();
        if (event.key === THEME_KEY) setTheme(preferredTheme(), false);
      }
    });
  }

  function setupNavigationState() {
    const current = location.pathname.split('/').pop() || 'index.html';
    $$('.nav-menu a').forEach(link => {
      const href = link.getAttribute('href')?.split('?')[0].split('#')[0];
      if (href === current) link.setAttribute('aria-current', 'page');
    });
    const year = $('#copyright-year');
    if (year) year.textContent = String(new Date().getFullYear());
  }

  /* ------------------------- START ------------------------- */
  document.addEventListener('DOMContentLoaded', () => {
    setupTheme();
    setupNavigationState();
    updateCartCount();
    setupCatalogue();
    setupProductDetail();
    setupCart();
    setupCheckout();
    setupConfirmation();
    setupLightbox();
    setupFaq();
    setupValidationUI();
    setupEnquiryForm();
    setupContactForm();
    setupAuthForms();
    setupGlobalEvents();
  });
})();
