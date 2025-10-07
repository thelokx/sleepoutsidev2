import ExternalServices from "./ExternalServices.mjs";
import ProductList from "./ProductList.mjs";
import { qs, getParam } from "./utils.mjs";

const category = getParam("category");
const dataSource = new ExternalServices();
const listElement = qs(".product-list");
const productList = new ProductList(category, dataSource, listElement);
productList.init();
