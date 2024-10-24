import { Item } from "../items/item";

export class BillingDetails {
    public id: number = 0;
    public billing_id: number = 0;
    public item: Item = new Item();
    public description: string = "";
    public quantity: number = 0;
    public price: number = 0;
    public amount: number = 0;
    public constructor() {}
}