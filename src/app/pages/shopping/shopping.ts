import { Bank } from "../bank/bank";
import { Suppliers } from "../suppliers/suppliers";
import { Taxes } from "../taxes/taxes";

export class Shopping {
    public id: number = 0;
    public amount_tax: number = 0;
    public date!: Date;
    public description: string = "";
    public subtotal: number = 0;
    public total: number = 0;
    public bank: Bank = new Bank;
    public suppliers: Suppliers = new Suppliers;
    public taxes: Taxes = new Taxes;
    public constructor() {}
}