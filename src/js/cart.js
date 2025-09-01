import { setLocalStorage, getLocalStorage, qs } from "./utils.mjs";

//mostrare il totale del carello
function displayTotal() {
  const htmlElemt = qs(".cart-footer");
  const cartItems = getLocalStorage("so-cart") || [];
  if (cartItems.length > 0) {
    htmlElemt.style.display = "block";
    let total = 0;
    cartItems.forEach((product) => {
      total += product.FinalPrice;
    });
    htmlElemt.innerHTML = `<p class="total-cart">Total: $${total.toFixed(2)}</p>`;
  } else {
    htmlElemt.style.display = "none";
  }
}

function renderCartContents() {
  const cartItems = getLocalStorage("so-cart") || [];
  const htmlItems = cartItems.map((item) => cartItemTemplate(item));
  document.querySelector(".product-list").innerHTML = htmlItems.join("");
  removeCartItem(cartItems);
  displayTotal();
}

function cartItemTemplate(item) {
  const newItem = `<li class="cart-card divider">
  <a href="#" class="cart-card__image">
    <img
      src="${item.Image}"
      alt="${item.Name}"
    />
  </a>
  <a href="#">
    <h2 class="card__name">${item.Name}</h2>
  </a>
  <p class="cart-card__color">${item.Colors[0].ColorName}</p>
  <p class="cart-card__quantity">qty: 1</p>
  <p class="cart-card__price">$${item.FinalPrice}</p>
  <button id="+${item.Id}">➕</button> <button id="-${item.Id}">➖</button> <button id="d${item.Id}">🗑️</button>
</li>`;
  return newItem;
}
// <span></span> <span></span>
function removeCartItem(product) {
  product.forEach((item) => {
    document.getElementById(`d${item.Id}`).addEventListener("click", () => {
      const newCartItems = product.filter((i) => i.Id != item.Id);
      setLocalStorage("so-cart", newCartItems);
      renderCartContents();
    });
  });
}
renderCartContents();
