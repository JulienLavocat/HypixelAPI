export class OrderSummary {

	amount: number;
	pricePerUnit: number;
	orders: number;

	constructor(obj: any) {
		this.amount = obj.amount;
		this.pricePerUnit = obj.pricePerUnit;
		this.orders = obj.orders;
	}

}