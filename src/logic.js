/*
 * Leaf Café — pure helpers with no DOM access.
 * Loaded as a classic script in the browser (so the page also works from file://)
 * and through node:vm in tests/logic.test.js.
 */
(function (root) {
  "use strict";

  const LIMITS = Object.freeze({
    nameMin: 2,
    nameMax: 80,
    emailMax: 120,
    messageMin: 10,
    messageMax: 1000,
    quantityMax: 20,
  });

  const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  /** Look up `key` in a dictionary and fill `{placeholders}` from `vars`. */
  function translate(dictionary, key, vars = {}) {
    const template = Object.hasOwn(dictionary, key) ? dictionary[key] : key;
    return template.replace(/\{(\w+)\}/g, (match, name) =>
      Object.hasOwn(vars, name) ? String(vars[name]) : match,
    );
  }

  function formatPrice(amount, currency = "฿") {
    return `${currency}${amount.toLocaleString("en-US")}`;
  }

  function filterProducts(products, filter) {
    return filter === "all"
      ? products.slice()
      : products.filter((p) => p.category === filter);
  }

  /* Cart: a plain { productId: quantity } object. Functions return a new object. */

  function addToCart(cart, id) {
    return setQuantity(cart, id, (cart[id] ?? 0) + 1);
  }

  function setQuantity(cart, id, quantity) {
    const next = { ...cart };
    if (!Number.isFinite(quantity) || quantity <= 0) {
      delete next[id];
    } else {
      next[id] = Math.min(Math.floor(quantity), LIMITS.quantityMax);
    }
    return next;
  }

  function cartCount(cart) {
    return Object.values(cart).reduce((sum, quantity) => sum + quantity, 0);
  }

  function cartTotal(cart, products) {
    return Object.entries(cart).reduce((sum, [id, quantity]) => {
      const product = products.find((p) => p.id === id);
      return product ? sum + product.price * quantity : sum;
    }, 0);
  }

  /**
   * Validate the demo contact form.
   * Returns { valid, values, errors } where errors maps a field name to a copy key.
   */
  function validateContact(raw) {
    const values = {
      name: String(raw.name ?? "").trim(),
      email: String(raw.email ?? "").trim(),
      message: String(raw.message ?? "").trim(),
    };
    const errors = {};

    if (!values.name) errors.name = "errNameRequired";
    else if (values.name.length < LIMITS.nameMin) errors.name = "errNameShort";
    else if (values.name.length > LIMITS.nameMax) errors.name = "errTooLong";

    if (!values.email) errors.email = "errEmailRequired";
    else if (values.email.length > LIMITS.emailMax) errors.email = "errTooLong";
    else if (!EMAIL_PATTERN.test(values.email))
      errors.email = "errEmailInvalid";

    if (!values.message) errors.message = "errMessageRequired";
    else if (values.message.length < LIMITS.messageMin)
      errors.message = "errMessageShort";
    else if (values.message.length > LIMITS.messageMax)
      errors.message = "errTooLong";

    return { valid: Object.keys(errors).length === 0, values, errors };
  }

  root.LeafLogic = Object.freeze({
    LIMITS,
    translate,
    formatPrice,
    filterProducts,
    addToCart,
    setQuantity,
    cartCount,
    cartTotal,
    validateContact,
  });
})(globalThis);
