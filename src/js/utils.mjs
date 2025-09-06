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
  const htmlElement = qs(".superscript");
  if(cartItems.length > 0){
    htmlElement.innerHTML = cartItems.length
    htmlElement.style.display = "block";
  }
}

export function renderWithTemplate(template, parentElement, callback){
  parentElement.innerHTML = template;
  if (callback){
    callback()
  }
}

export async function loadTemplate(path){
  const res = await fetch(path);
  const template = await res.text();
  return template;
}

export async function loadHeaderFooter(){
  const headerTemplate = await loadTemplate("../partials/header.html");
  const headerElement = qs("#main-header");
  renderWithTemplate(headerTemplate, headerElement, superscriptBackpack);

  const footerTemplate = await loadTemplate("../partials/footer.html");
  const footerElement = qs("#main-footer");
  renderWithTemplate(footerTemplate, footerElement);
}
