import { test } from "node:test";
import assert from "node:assert/strict";
import { loadScripts } from "./load-scripts.js";

const { LeafLogic: L, LeafContent } = loadScripts("content.js", "logic.js");
const products = LeafContent.products;

test("translate fills placeholders and falls back to the key", () => {
  const dict = { hi: "Hello {name}", plain: "Plain" };
  assert.equal(L.translate(dict, "hi", { name: "Mali" }), "Hello Mali");
  assert.equal(L.translate(dict, "plain"), "Plain");
  assert.equal(L.translate(dict, "missing"), "missing");
  assert.equal(
    L.translate(dict, "hi"),
    "Hello {name}",
    "unknown placeholders stay visible",
  );
});

test("formatPrice uses baht and thousands separators", () => {
  assert.equal(L.formatPrice(135), "฿135");
  assert.equal(L.formatPrice(1250), "฿1,250");
});

test("filterProducts returns 3 drinks, 3 desserts and all 6", () => {
  assert.equal(L.filterProducts(products, "all").length, 6);
  assert.equal(L.filterProducts(products, "drink").length, 3);
  assert.equal(L.filterProducts(products, "dessert").length, 3);
});

test("cart add, change quantity, remove and totals", () => {
  let cart = {};
  cart = L.addToCart(cart, "matcha");
  cart = L.addToCart(cart, "matcha");
  cart = L.addToCart(cart, "cookies");
  assert.equal(L.cartCount(cart), 3);
  assert.equal(L.cartTotal(cart, products), 135 * 2 + 85);

  cart = L.setQuantity(cart, "matcha", 1);
  assert.equal(L.cartTotal(cart, products), 135 + 85);

  cart = L.setQuantity(cart, "cookies", 0);
  assert.equal(
    Object.hasOwn(cart, "cookies"),
    false,
    "quantity 0 removes the item",
  );
  assert.equal(L.cartCount(cart), 1);
});

test("cart functions do not mutate the input", () => {
  const cart = Object.freeze({ matcha: 1 });
  const next = L.addToCart(cart, "matcha");
  assert.equal(cart.matcha, 1);
  assert.equal(next.matcha, 2);
});

test("cart quantity is capped and ignores unknown products in totals", () => {
  const cart = L.setQuantity({}, "matcha", 999);
  assert.equal(cart.matcha, L.LIMITS.quantityMax);
  assert.equal(L.cartTotal({ ghost: 3 }, products), 0);
  assert.deepEqual(
    { ...L.setQuantity({ matcha: 2 }, "matcha", Number.NaN) },
    {},
  );
});

test("validateContact accepts a valid message and trims values", () => {
  const result = L.validateContact({
    name: "  Mali ",
    email: " mali@example.com ",
    message: "  Hello from the demo form  ",
  });
  assert.equal(result.valid, true);
  assert.equal(result.values.name, "Mali");
  assert.equal(result.values.email, "mali@example.com");
});

test("validateContact reports one copy key per invalid field", () => {
  assert.deepEqual(
    { ...L.validateContact({ name: "", email: "", message: "" }).errors },
    {
      name: "errNameRequired",
      email: "errEmailRequired",
      message: "errMessageRequired",
    },
  );
  assert.deepEqual(
    {
      ...L.validateContact({ name: "A", email: "wrong@", message: "short" })
        .errors,
    },
    {
      name: "errNameShort",
      email: "errEmailInvalid",
      message: "errMessageShort",
    },
  );
  const tooLong = L.validateContact({
    name: "x".repeat(81),
    email: `${"a".repeat(115)}@x.com`,
    message: "m".repeat(1001),
  });
  assert.deepEqual(
    { ...tooLong.errors },
    { name: "errTooLong", email: "errTooLong", message: "errTooLong" },
  );
});

test("validateContact handles missing fields without throwing", () => {
  const result = L.validateContact({});
  assert.equal(result.valid, false);
  assert.equal(Object.keys(result.errors).length, 3);
});

test("every error key returned by validation exists in both languages", () => {
  const keys = [
    "errNameRequired",
    "errNameShort",
    "errEmailRequired",
    "errEmailInvalid",
  ];
  keys.push("errMessageRequired", "errMessageShort", "errTooLong");
  for (const lang of ["th", "en"]) {
    for (const key of keys)
      assert.ok(LeafContent.copy[lang][key], `${lang}.${key} missing`);
  }
});
