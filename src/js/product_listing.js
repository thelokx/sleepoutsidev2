import ProductData from "./ProductData.mjs";
import ProductList from "./ProductList.mjs";
import { qs, getParam} from "./utils.mjs";

const category = getParam('category')
const dataSource = new ProductData();
const listElement = qs(".product-list");
const productList = new ProductList(category, dataSource, listElement);
productList.init();