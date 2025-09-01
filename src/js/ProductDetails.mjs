import { getLocalStorage, setLocalStorage } from "./utils.mjs";
export default class ProductDetails {
    constructor(productId, dataSource){
        this.productId = productId;
        this.dataSource = dataSource;
        this.product = {};
    }
    async init(){
        this.product = await this.dataSource.findProductById(this.productId);
        console.log(this.product)
        this.renderProductDetails()
        // aggiungere un pulsante aggiungi al carrello
        document.getElementById("addToCart").addEventListener("click", this.addToCart.bind(this)); 
    }
    addToCart(){
        const cartItems = getLocalStorage("so-cart") || [] ; // prendere la info dal localSotre or prendere un vettore vuoto
        cartItems.push(this.product) // aggiungere product al vettore 
        setLocalStorage("so-cart", cartItems); // impostare il vettore nell localStore
    }
    renderProductDetails(){
      document.querySelector("#main").innerHTML = productDetailsTemplate(this.product)
    }
}
//modello di dettagli del prodotto
function productDetailsTemplate(product){
        return `
        <section class="product-detail">
        <h3>${product.Brand.Name}</h3>

        <h2 class="divider">${product.NameWithoutBrand}</h2>

        <img
          class="divider"
          src=${product.Image}
          alt=${product.NameWithotBrand}
        />

        <p class="product-card__price">${product.ListPrice}</p>

        <p class="product-card__discount">discount :$${(product.SuggestedRetailPrice-product.ListPrice).toFixed(2)}</p>

        <p class="product__color">${product.Colors[0].ColorName}</p>

        <p class="product__description">
          ${product.DescriptionHtmlSimple}
        </p>

        <div class="product-detail__add">
          <button class ="addToCart-button" id="addToCart" data-id="${product.Id}">Add to Cart</button>
        </div>
      </section>
        `
    }