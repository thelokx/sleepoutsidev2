import { renderListWithTemplate, loadHeaderFooter, qs, showBreadCrumb, renderWithTemplate} from "./utils.mjs";

function productCardTemplate(product) {
  return `<li class="product-card">
    <a href="../product_pages/?product=${product.Id}">
      <img src="${product.Images.PrimaryMedium}" alt="Image of${product.Name}">
      <h2 class="card__brand">${product.Brand.Name}</h2>
      <h3 class="card__name">${product.NameWithoutBrand}</h3>
      <p class="product-card__price">$${product.FinalPrice.toFixed(2)}</p>
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
      loadHeaderFooter()
      this.getTitle()
      this.productList = await this.dataSource.getData(this.category);
      renderListWithTemplate(productCardTemplate, this.listElement, this.productList);
      showBreadCrumb(this.productList)
      this.sortControls()
      

    }
    getTitle(){
      const titleElement = qs(".category-title");
      titleElement.innerHTML = `Top Products: ${this.category}`;
    }
    sortControls(){
      const sortByElement = document.getElementById("sort-by");
      if (sortByElement){
        sortByElement.addEventListener("change", (e) => this.ordinareElenco(e.target.value))
      }
      
    }
    ordinareElenco(value){
      let sortedList = this.productList;
      switch (value) {
        
      case "name-asc":
        sortedList.sort((a, b) => a.Name.localeCompare(b.Name));
        break;
      case "name-desc":
        sortedList.sort((a, b) => b.Name.localeCompare(a.Name));
        break;
      case "price-asc":
        sortedList.sort((a, b) => a.FinalPrice - b.FinalPrice);
        break;
      case "price-desc":
        sortedList.sort((a, b) => b.FinalPrice - a.FinalPrice);
        break;
    }
    renderListWithTemplate(productCardTemplate, this.listElement, sortedList, "afterbegin", true);
    }
    searchBox(){
      console.log("funca")

    }
}

