import { Category } from "../category/category";
import { ItemPrice } from "./ItemPrice";
import { ItemStock } from "./ItemStock";

export class Item {
    public id: number = 0;
    public description: string = "";
    public category: Category = new Category;
    public stock: ItemStock = new ItemStock;
    public price: ItemPrice = new ItemPrice;
    public constructor() {}
}