import Alert from "./Alert";
import { loadHeaderFooter } from "./utils.mjs";
loadHeaderFooter()

const alert = new Alert()
alert.Init()



function searchBox(){
  const searchElement = document.querySelector("#searchBar")
  console.log(searchElement)
  searchElement.addEventListener("sumit", (e) => console.log(e.target.value)) 

    }

searchBox()