import {getLocalStorage, setLocalStorage, loadHeaderFooter} from "./utils.mjs"
import ExternalServices from "./ExternalServices.mjs";

export default class CheckoutProcess {
  constructor(key, outputSelector) {
    this.key = key;
    this.outputSelector = outputSelector;
    this.list = [];
    this.itemTotal = 0;
    this.shipping = 0;
    this.tax = 0;
    this.orderTotal = 0;
    this.externalServices = new ExternalServices()
  }

  init() {
    loadHeaderFooter()
    this.list = getLocalStorage(this.key);
    this.calculateItemSummary();
    this.sendInformation()
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
    this.tax = (this.itemTotal * 0.06)
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
  sendInformation(){
    document.getElementById("sendButton").addEventListener("click",(event)=>{
      event.preventDefault();
      const myForm = document.getElementById("myForm");
      const checkStatus = myForm.checkValidity();
      myForm.reportValidity();
      if(checkStatus)
      this.checkout();
      
    })
  }
  async checkout(myForm) {
  // get the form element data by the form name
  
  // convert the form data to a JSON order object using the formDataToJSON function
  const data = formDataToJSON(myForm);
  // populate the JSON order object with the order Date, orderTotal, tax, shipping, and list of items
  const order = {
    ...data,
    orderDate : Date.now(),
    orderTotal : this.orderTotal,
    tax : this.tax,
    shipping : this.shipping,
    items : packgeItems(this.list)
    
  };
  // call the checkout method in the ExternalServices module and send it the JSON order data.
  
  try{
      const response = this.externalServices.sendData(order)
      // setLocalStorage("so-cart", []);
      // location.assign("../index.html");
    }catch (err) {
      // get rid of any preexisting alerts.
      removeAllAlerts();
      for (let message in err.message) {
        alertMessage(err.message[message]);
      }
      console.log(err);
    }
  
}
}

function packgeItems(items){
  return items.map(item =>({
    id: item.Id,
    name: item.Name,
    price: item.FinalPrice,
    quantity : item.Quantity
  }))
}

function formDataToJSON(formElement) {
  const formData = new FormData(formElement),
    convertedJSON = {};

  formData.forEach((value, key)=>{
    convertedJSON[key] = value;
  });

  return convertedJSON;
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

