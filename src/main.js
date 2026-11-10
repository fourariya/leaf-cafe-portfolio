/*
 * Leaf Café — page wiring (DOM only).
 * Content lives in content.js and pure logic in logic.js.
 * Nothing on this page makes a network request: the bag and the form are demos.
 */
(function () {
  "use strict";

  const { copy, products } = window.LeafContent;
  const Logic = window.LeafLogic;

  const LANG_STORAGE_KEY = "leaf-cafe-lang";
  const FORM_FIELDS = ["name", "email", "message"];
  const DESKTOP_NAV_QUERY = window.matchMedia("(min-width: 941px)");

  const $ = (selector, scope = document) => scope.querySelector(selector);
  const $$ = (selector, scope = document) =>
    Array.from(scope.querySelectorAll(selector));

  const els = {
    langButtons: $$("[data-lang]"),
    menuToggle: $("#menu-toggle"),
    mobileNav: $("#mobile-nav"),
    header: $(".site-header"),
    filterButtons: $$("[data-filter]"),
    grid: $("#product-grid"),
    menuStatus: $("#menu-status"),
    bagOpen: $("#bag-open"),
    bagCount: $("#bag-count"),
    bagDrawer: $("#bag-drawer"),
    bagBackdrop: $("#drawer-backdrop"),
    bagClose: $("#bag-close"),
    bagContinue: $("#bag-continue"),
    bagItems: $("#bag-items"),
    bagTotal: $("#bag-total"),
    bagStatus: $("#bag-status"),
    form: $("#contact-form"),
    formFeedback: $("#form-feedback"),
    toast: $("#toast"),
    year: $("#copyright-year"),
  };

  const state = {
    lang: readSavedLanguage(),
    filter: "all",
    cart: {},
    menuOpen: false,
    bagOpen: false,
    /** Last form validation result, kept so messages can be re-translated. */
    form: null,
  };

  let toastTimer = 0;
  let focusBeforeBag = null;

  /* ---------- helpers ---------- */

  function t(key, vars) {
    return Logic.translate(copy[state.lang], key, vars);
  }

  function price(amount) {
    return Logic.formatPrice(amount);
  }

  function createEl(tag, className, text) {
    const node = document.createElement(tag);
    if (className) node.className = className;
    if (text !== undefined) node.textContent = text;
    return node;
  }

  /** The standalone build inlines images into window.__LEAF_ASSETS__. */
  function assetUrl(filename) {
    return window.__LEAF_ASSETS__?.[filename] ?? `assets/${filename}`;
  }

  function readSavedLanguage() {
    try {
      return localStorage.getItem(LANG_STORAGE_KEY) === "en" ? "en" : "th";
    } catch {
      return "th"; // storage can be blocked (private mode, file://)
    }
  }

  function saveLanguage(lang) {
    try {
      localStorage.setItem(LANG_STORAGE_KEY, lang);
    } catch {
      /* the choice still applies until the page reloads */
    }
  }

  function showToast(message) {
    els.toast.textContent = message;
    els.toast.classList.add("is-visible");
    clearTimeout(toastTimer);
    toastTimer = setTimeout(
      () => els.toast.classList.remove("is-visible"),
      2400,
    );
  }

  /* ---------- language ---------- */

  function applyLanguage() {
    document.documentElement.lang = state.lang;
    document.title = t("pageTitle");

    for (const node of $$("[data-i18n]"))
      node.textContent = t(node.dataset.i18n);
    for (const node of $$("[data-i18n-placeholder]"))
      node.placeholder = t(node.dataset.i18nPlaceholder);
    for (const node of $$("[data-i18n-alt]"))
      node.alt = t(node.dataset.i18nAlt);
    for (const node of $$("[data-i18n-label]"))
      node.setAttribute("aria-label", t(node.dataset.i18nLabel));

    for (const button of els.langButtons) {
      button.setAttribute(
        "aria-pressed",
        String(button.dataset.lang === state.lang),
      );
    }

    updateMenuToggleLabel();
    renderProducts();
    renderBag();
    renderFormMessages();
  }

  function setLanguage(lang) {
    if (lang === state.lang || !Object.hasOwn(copy, lang)) return;
    state.lang = lang;
    saveLanguage(lang);
    applyLanguage();
  }

  /* ---------- mobile navigation ---------- */

  function updateMenuToggleLabel() {
    els.menuToggle.setAttribute(
      "aria-label",
      t(state.menuOpen ? "menuClose" : "menuOpen"),
    );
  }

  function setMenuOpen(open, { returnFocus = false } = {}) {
    state.menuOpen = open;
    els.mobileNav.hidden = !open;
    els.menuToggle.setAttribute("aria-expanded", String(open));
    updateMenuToggleLabel();
    if (!open && returnFocus) els.menuToggle.focus();
  }

  /* ---------- menu ---------- */

  function renderProducts() {
    const visible = Logic.filterProducts(products, state.filter);
    els.grid.replaceChildren(...visible.map(createProductCard));
    return visible.length;
  }

  function createProductCard(product) {
    const content = product[state.lang];
    const card = createEl("article", "product-card");

    const media = createEl("div", "product-media");
    const img = createEl("img");
    img.src = assetUrl(product.image);
    img.alt = ""; // decorative: the product name follows as a heading
    img.width = 500;
    img.height = 420;
    img.loading = "lazy";
    img.decoding = "async";
    media.append(img);
    if (product.label) {
      media.append(
        createEl(
          "span",
          "product-chip",
          t(product.label === "new" ? "badgeNew" : "badgePopular"),
        ),
      );
    }

    const body = createEl("div", "product-body");
    const category = createEl(
      "p",
      "product-category",
      t(product.category === "drink" ? "categoryDrink" : "categoryDessert"),
    );
    const title = createEl("h3", "product-title", content.name);
    const desc = createEl("p", "product-desc", content.desc);

    const footer = createEl("div", "product-footer");
    const amount = createEl("p", "product-price", price(product.price));
    const add = createEl("button", "add-button");
    add.type = "button";
    add.setAttribute("aria-label", t("addToBag", { name: content.name }));
    add.innerHTML =
      '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 5v14M5 12h14"/></svg>';
    add.addEventListener("click", () => {
      state.cart = Logic.addToCart(state.cart, product.id);
      renderBag();
      showToast(t("addToast", { name: content.name }));
    });
    footer.append(amount, add);

    body.append(category, title, desc, footer);
    card.append(media, body);
    return card;
  }

  function setFilter(filter) {
    state.filter = filter;
    for (const button of els.filterButtons) {
      button.setAttribute(
        "aria-pressed",
        String(button.dataset.filter === filter),
      );
    }
    const count = renderProducts();
    els.menuStatus.textContent = t("menuStatus", { count });
  }

  /* ---------- sample bag ---------- */

  function renderBag() {
    const count = Logic.cartCount(state.cart);
    els.bagCount.textContent = String(count);
    els.bagCount.hidden = count === 0;
    els.bagOpen.setAttribute("aria-label", t("bagOpen", { count }));
    els.bagTotal.textContent = price(Logic.cartTotal(state.cart, products));

    // Re-rendering replaces the buttons, so remember which one had focus.
    const focusKey = document.activeElement?.dataset?.focusKey;

    const rows = Object.entries(state.cart)
      .map(([id, quantity]) => createBagRow(id, quantity))
      .filter(Boolean);

    if (rows.length) {
      const list = createEl("ul", "bag-list");
      list.append(...rows);
      els.bagItems.replaceChildren(list);
    } else {
      els.bagItems.replaceChildren(createEl("p", "bag-empty", t("bagEmpty")));
    }

    if (focusKey && state.bagOpen) {
      const target =
        $(`[data-focus-key="${focusKey}"]`, els.bagItems) ?? els.bagClose;
      target.focus();
    }
  }

  function createBagRow(id, quantity) {
    const product = products.find((p) => p.id === id);
    if (!product) return null;
    const name = product[state.lang].name;

    const row = createEl("li", "bag-item");
    const img = createEl("img");
    img.src = assetUrl(product.image);
    img.alt = "";
    img.width = 64;
    img.height = 64;

    const info = createEl("div", "bag-info");
    info.append(
      createEl("p", "bag-name", name),
      createEl("p", "bag-each", t("bagEach", { price: price(product.price) })),
    );

    const stepper = createEl("div", "stepper");
    stepper.setAttribute("role", "group");
    stepper.setAttribute("aria-label", t("bagQuantity", { name }));
    const minus = stepButton("−", t("bagDecrease", { name }), `${id}:dec`, () =>
      changeQuantity(id, quantity - 1),
    );
    const value = createEl("span", "stepper-value", String(quantity));
    const plus = stepButton("+", t("bagIncrease", { name }), `${id}:inc`, () =>
      changeQuantity(id, quantity + 1),
    );
    plus.disabled = quantity >= Logic.LIMITS.quantityMax;
    stepper.append(minus, value, plus);

    const remove = createEl("button", "bag-remove", t("bagRemove"));
    remove.type = "button";
    remove.dataset.focusKey = `${id}:remove`;
    remove.setAttribute("aria-label", t("bagRemoveLabel", { name }));
    remove.addEventListener("click", () => changeQuantity(id, 0));

    const subtotal = createEl(
      "p",
      "bag-subtotal",
      price(product.price * quantity),
    );

    row.append(img, info, stepper, subtotal, remove);
    return row;
  }

  function stepButton(symbol, label, focusKey, onClick) {
    const button = createEl("button", "stepper-button", symbol);
    button.type = "button";
    button.dataset.focusKey = focusKey;
    button.setAttribute("aria-label", label);
    button.addEventListener("click", onClick);
    return button;
  }

  function changeQuantity(id, quantity) {
    const product = products.find((p) => p.id === id);
    state.cart = Logic.setQuantity(state.cart, id, quantity);
    renderBag();
    if (!product) return;
    const name = product[state.lang].name;
    const now = state.cart[id] ?? 0;
    els.bagStatus.textContent = now
      ? t("bagQtyStatus", { name, count: now })
      : t("bagRemoved", { name });
  }

  function setBagOpen(open) {
    if (open === state.bagOpen) return;
    state.bagOpen = open;
    const { bagDrawer: drawer, bagBackdrop: backdrop } = els;

    if (open) {
      focusBeforeBag = document.activeElement;
      setMenuOpen(false);
      els.toast.classList.remove("is-visible"); // it would cover the drawer's total
      backdrop.hidden = false;
      drawer.inert = false;
      drawer.setAttribute("aria-hidden", "false");
      document.body.classList.add("no-scroll");
      requestAnimationFrame(() => {
        drawer.classList.add("is-open");
        backdrop.classList.add("is-open");
        els.bagClose.focus();
      });
      return;
    }

    drawer.classList.remove("is-open");
    backdrop.classList.remove("is-open");
    drawer.inert = true;
    drawer.setAttribute("aria-hidden", "true");
    document.body.classList.remove("no-scroll");
    setTimeout(() => {
      if (!state.bagOpen) backdrop.hidden = true;
    }, 300);
    if (focusBeforeBag?.isConnected) focusBeforeBag.focus();
  }

  /** Keep Tab focus inside the open drawer. */
  function trapFocus(event) {
    const focusable = $$("button:not(:disabled), a[href]", els.bagDrawer);
    if (!focusable.length) return;
    const first = focusable[0];
    const last = focusable.at(-1);
    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault();
      last.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault();
      first.focus();
    }
  }

  /* ---------- demo contact form ---------- */

  function readForm() {
    const { elements } = els.form;
    return Object.fromEntries(
      FORM_FIELDS.map((field) => [field, elements[field].value]),
    );
  }

  function renderFormMessages() {
    const result = state.form;
    for (const field of FORM_FIELDS) {
      const input = els.form.elements[field];
      const message = $(`#form-${field}-error`);
      const errorKey = result?.errors[field];
      message.textContent = errorKey ? t(errorKey) : "";
      message.hidden = !errorKey;
      if (errorKey) input.setAttribute("aria-invalid", "true");
      else input.removeAttribute("aria-invalid");
    }

    const feedback = els.formFeedback;
    feedback.classList.toggle("is-error", Boolean(result && !result.valid));
    if (!result) feedback.textContent = "";
    else if (result.valid) feedback.textContent = t("formSuccess");
    else
      feedback.textContent = t("formErrorSummary", {
        count: Object.keys(result.errors).length,
      });
  }

  function handleSubmit(event) {
    event.preventDefault(); // demo only: never submit anywhere
    const result = Logic.validateContact(readForm());
    state.form = result;
    renderFormMessages();

    if (result.valid) {
      els.form.reset();
      return;
    }
    const firstInvalid = FORM_FIELDS.find((field) => result.errors[field]);
    els.form.elements[firstInvalid].focus();
  }

  /** While fixing errors, clear a field's message as soon as it becomes valid. */
  function handleFormInput(event) {
    const field = event.target.name;
    if (!state.form || !FORM_FIELDS.includes(field)) return;
    if (state.form.valid) {
      state.form = null;
      renderFormMessages();
      return;
    }
    if (!state.form.errors[field]) return;
    const fresh = Logic.validateContact(readForm());
    if (fresh.errors[field]) return;

    const errors = { ...state.form.errors };
    delete errors[field];
    state.form = Object.keys(errors).length ? { ...state.form, errors } : null;
    renderFormMessages();
  }

  /* ---------- events ---------- */

  for (const button of els.langButtons) {
    button.addEventListener("click", () => setLanguage(button.dataset.lang));
  }

  for (const button of els.filterButtons) {
    button.addEventListener("click", () => setFilter(button.dataset.filter));
  }

  els.menuToggle.addEventListener("click", () => setMenuOpen(!state.menuOpen));
  for (const link of $$("a", els.mobileNav)) {
    link.addEventListener("click", () => setMenuOpen(false));
  }
  document.addEventListener("click", (event) => {
    if (state.menuOpen && !els.header.contains(event.target))
      setMenuOpen(false);
  });
  DESKTOP_NAV_QUERY.addEventListener("change", (event) => {
    if (event.matches) setMenuOpen(false);
  });

  els.bagOpen.addEventListener("click", () => setBagOpen(true));
  els.bagClose.addEventListener("click", () => setBagOpen(false));
  els.bagBackdrop.addEventListener("click", () => setBagOpen(false));
  els.bagContinue.addEventListener("click", () => setBagOpen(false));

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      if (state.bagOpen) setBagOpen(false);
      else if (state.menuOpen) setMenuOpen(false, { returnFocus: true });
    } else if (event.key === "Tab" && state.bagOpen) {
      trapFocus(event);
    }
  });

  els.form.addEventListener("submit", handleSubmit);
  els.form.addEventListener("input", handleFormInput);

  els.year.textContent = String(new Date().getFullYear());
  applyLanguage();
})();
