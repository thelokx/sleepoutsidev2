// wrapper for querySelector...returns matching element
export function qs(selector, parent = document) {
  return parent.querySelector(selector);
}
// or a more concise version if you are into that sort of thing:
// export const qs = (selector, parent = document) => parent.querySelector(selector);

// retrieve data from localstorage
export function getLocalStorage(key) {
  return JSON.parse(localStorage.getItem(key));
}
// save data to local storage
export function setLocalStorage(key, data) {
  localStorage.setItem(key, JSON.stringify(data));
}
// set a listener for both touchend and click
export function setClick(selector, callback) {
  qs(selector).addEventListener("touchend", (event) => {
    event.preventDefault();
    callback();
  });
  qs(selector).addEventListener("click", callback);
}

//ottenre Parameters
export function getParam(param){
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const product = urlParams.get(param);
  return product;
}
//renderizzare elenco con modello
export function renderListWithTemplate(templateFn, parentElement, list, position = "afterbegin", clear = false){
  if(clear == true){
    parentElement.insertAdjacentHTML = "";
  }
  const htmlStrings = list.map(templateFn);
  parentElement.insertAdjacentHTML(position, htmlStrings.join(''));
}

export function superscriptBackpack(){
  const cartItems = getLocalStorage("so-cart")|| [];
  const htmlElemnet = qs("#superscript")
  console.log(superscript)
  if(cartItems.length > 0){
    htmlElemnet.style.display = "block";
    htmlElemnet.innerHTML = cartItems.length
  }
}
