import { qs, renderListWithTemplate } from "./utils.mjs"
export default class Alert{
    constructor(){

    }

    Init(){
        this.showAlert()
        getPath()

    }
    async showAlert(){
        const htmlElement = qs("main")
        const list = await getPath()
        renderListWithTemplate(modelloDiAvisso, htmlElement, list, "afterbegin", false );
    }
}

function modelloDiAvisso(list){
    return `<section><p>${list.message}</p> </section>`
}
async function getPath(){
    const response = await fetch(`../public/json/alerts.json`)
    const data = convertToJson(response);
    return data;
}

function convertToJson(res) {
  if (res.ok) {
    return res.json();
  } else {
    throw new Error("Bad Response");
  }
}
