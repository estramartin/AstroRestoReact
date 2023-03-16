const PRODUCT_CART = "productsCart";

export function getProductCart() {
  const response = localStorage.getItem(PRODUCT_CART);
  return JSON.parse(response || "[]");
}

export function addProductcart(id) {
  const products = getProductCart();
  products.push(id);
  localStorage.setItem(PRODUCT_CART, JSON.stringify(products));
}

export function removeProductCart(index) {
  const idProducts = getProductCart();
  idProducts.splice(index, 1);
  localStorage.setItem(PRODUCT_CART, JSON.stringify(idProducts));
}

export function cleanProductCart() {
  localStorage.removeItem(PRODUCT_CART);
}
