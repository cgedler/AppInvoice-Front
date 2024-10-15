export class Billing {
    public id: number = 0;
    public amount_tax: number = 0;
    public date!: Date;
    public description: string = "";
    public subtotal: number = 0;
    public total: number = 0;
    public bank_id: number = 0;
    public customer_id: number = 0;
    public seller_id: number = 0;
    public taxes_id: number = 0;
    public constructor() {}
}