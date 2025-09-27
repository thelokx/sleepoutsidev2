import {getLocalStorage} from "./utils.mjs"
export default class CheckoutProcess {
  constructor(key, outputSelector) {
    this.key = key;
    this.outputSelector = outputSelector;
    this.list = [];
    this.itemTotal = 0;
    this.shipping = 0;
    this.tax = 0;
    this.orderTotal = 0;
  }

  init() {
    this.list = getLocalStorage(this.key);
    this.calculateItemSummary();
  }

  calculateItemSubTotal() {
    let subtotal = 0;
    this.list.forEach(item => { 
      subtotal += item.FinalPrice
    })
    this.itemTotal = subtotal;
    
  }

  calculateOrderTotal() {
    // calculate the tax and shipping amounts. Add those to the cart total to figure out the order total
    this.tax = (this.itemTotal * 0.18)
    this.shipping = 15
    this.orderTotal = this.itemTotal + this.tax + this.shipping

    // display the totals.
    this.displayOrderTotals();
  }

  displayOrderTotals() {
    // once the totals are all calculated display them in the order summary page
    const itemTotal = document.querySelector(`.${this.outputSelector} #subtotal`);
    const tax = document.querySelector(`.${this.outputSelector} #tax`);
    const shipping = document.querySelector(`.${this.outputSelector} #shipping`);
    const orderTotal = document.querySelector(`.${this.outputSelector} #order-total`);

    itemTotal.innerText = `$${this.itemTotal.toFixed(2)}`;
    tax.innerText = `$${this.tax.toFixed(2)}`;
    shipping.innerText = `$${this.shipping.toFixed(2)}`;
    orderTotal.innerText = `$${this.orderTotal.toFixed(2)}`;
  }
  calculateItemSummary(){
    this.calculateItemSubTotal()
    this.calculateOrderTotal()
  }
}
































// import { getLocalStorage, qs, loadHeaderFooter} from "./utils.mjs"

// export default class CheckOutProcess{
//     constructor(cartItems, htmlElemet){
//         this.cartItems = getLocalStorage(cartItems) || [];
//         this.htmlElemet = qs(`.${htmlElemet}`);
//         this.subtotal = this.getSubtotal();
//         this.tax = this.getTax();
//         this.shipping = 15;
//         this.total = this.getTotal()

//     }
//     Init(){
//         loadHeaderFooter()
        
//         this.showTax()
        

//     }
//     renderSummary(){
//         this.htmlElemet.innerHTML = this.summaryTemplate()
//     }
//     fillInformation(){
//         this.getSubtotal()
//     }
//     getSubtotal(){
//        let subtotal = 0;
//        this.cartItems.forEach(item =>{
//         subtotal += item.FinalPrice
//        })
//        return subtotal.toFixed(2)
//     }
//     getTax(){
//         const tax = this.getSubtotal() * 0.18
//         return tax.toFixed(2)
//     }
//     getTotal(){
//         const total = Number(this.getSubtotal()) + Number(this.getTax()) + this.shipping;
//         return total
//     }

//     showTax(){
//         document.getElementById("cap").addEventListener("input", ()=>{
//             document.getElementById("shipping").innerHTML = this.shipping;
//         })
//     }

// }

