import { renderListWithTemplate, superscriptBackpack} from "./utils.mjs";
console.log(superscriptBackpack())
function productCardTemplate(product) {
  return `<li class="product-card">
    <a href="product_pages/?product=${product.Id}">
      <img src="${product.Image}" alt="Image of${product.Name}">
      <h2 class="card__brand">${product.Brand.Name}</h2>
      <h3 class="card__name">${product.NameWithoutBrand}</h3>
      <p class="product-card__price">$${product.FinalPrice}</p>
      <p class="product-card__discount">${getDiscount(product)}% Off</p>
    </a>
  </li>`
}
function getDiscount(product){
      if (product.FinalPrice < product.SuggestedRetailPrice){
        return ((product.SuggestedRetailPrice-product.FinalPrice)/product.SuggestedRetailPrice * 100).toFixed()
      }
    }

export default class ProductList{
    constructor(category, dataSource, listElement){
        this.category = category;
        this.dataSource = dataSource;
        this.listElement = listElement;
    }
    async init(){
        const list = await this.dataSource.getData();
        console.log(list)
        renderListWithTemplate(productCardTemplate, this.listElement, list)
    }
    
}