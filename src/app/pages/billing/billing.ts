import { Bank } from "../bank/bank";
import { Customers } from "../customers/customers";
import { Sellers } from "../sellers/sellers";
import { Taxes } from "../taxes/taxes";
import { BillingDetails } from "./billingDetails";

export class Billing {
    public id: number = 0;
    public amount_tax: number = 0;
    public date!: Date;
    public description: string = "";
    public subtotal: number = 0;
    public total: number = 0;
    public bank: Bank = new Bank;
    public customer: Customers = new Customers;
    public seller: Sellers = new Sellers;
    public taxes: Taxes = new Taxes;
    public billingDetails: BillingDetails[] = [];
    public constructor() {}
}