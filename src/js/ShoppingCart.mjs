import { getLocalStorage, qs, loadHeaderFooter, setLocalStorage } from "./utils.mjs";


function cartItemTemplate(item) {
  const newItem = `<li class="cart-card divider">
  <a href="#" class="cart-card__image">
    <img
      src="${item.Images.PrimarySmall}"
      alt="${item.Name}"
    />
  </a>
  <a href="#">
    <h2 class="card__name">${item.Name}</h2>
  </a>
  <p class="cart-card__color">${item.Colors[0].ColorName}</p>
  <p class="cart-card__quantity">qty: ${item.Quantity}</p>
  <p class="cart-card__price">$${item.FinalPrice.toFixed(2)}</p>
  <button id="+${item.Id}">➕</button> <button id="-${item.Id}">➖</button> <button id="d${item.Id}">🗑️</button>
  <a href="../checkout/index.html"><button>Chech Out</button></a>
</li>`;
  return newItem;
}

export default class ShoppingCart{
    constructor(cartItems, listElement){
        this.cartItems = getLocalStorage(cartItems) || [];
        this.listElement = document.querySelector(listElement);
    }

    Init(){
        loadHeaderFooter()
        this.renderCartContents();
    }
    renderCartContents() {
        const htmlItems = this.cartItems.map((item) => cartItemTemplate(item));
        this.listElement.innerHTML = htmlItems.join("");
        this.removeCartItem(this.cartItems);
        this.controlQuantity(this.cartItems);
        this.displayTotal();
    }
    displayTotal() {
        const htmlElemt = qs(".cart-footer");
        if (this.cartItems.length > 0) {
            htmlElemt.style.display = "block";
            let total = 0;
            this.cartItems.forEach((product) => {
            total += (product.FinalPrice * product.Quantity);
            });
            htmlElemt.innerHTML = `<p class="total-cart">Total: $${total.toFixed(2)}</p>`;
        } else {
            htmlElemt.style.display = "none";
        }
    }
    removeCartItem(product) {
        product.forEach((item) => {
        document.getElementById(`d${item.Id}`).addEventListener("click", () => {
        this.cartItems = product.filter((i) => i.Id != item.Id);
        setLocalStorage("so-cart", this.cartItems);
        this.upDateData()
    })})};
    controlQuantity(product){
      product.forEach((item) => {
        document.getElementById(`+${item.Id}`).addEventListener("click", ()=>{
          item.Quantity++
          setLocalStorage("so-cart", this.cartItems);
          this.upDateData()
        })
      });
       product.forEach((item) => {
        if(item.Quantity < 2){
            document.getElementById(`-${item.Id}`).disabled = true;
          }
        document.getElementById(`-${item.Id}`).addEventListener("click", ()=>{ 
          item.Quantity--
          setLocalStorage("so-cart", this.cartItems);
          this.upDateData()
        })
      });
    }

    upDateData(){
      loadHeaderFooter();
      this.renderCartContents();
      this.displayTotal();
    }
}






