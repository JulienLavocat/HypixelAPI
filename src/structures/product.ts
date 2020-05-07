import { OrderSummary } from './orderSummary';
import { itemNames } from '../data/itemNames';
import { items } from '../data/itemList';
export class Product {

	id: string;
	name: string | null;
	rarity: string | null;
	category: string | null;
	sellSummary!: OrderSummary[];
	buySummary!: OrderSummary[];
	sellPrice: string;
	sellVolume: number;
	sellMovingWeek: number;
	sellOrders: number;
	buyPrice: string;
	buyVolume: number;
	buyMovingWeek: number;
	buyOrders: number;
	isEnchanted: boolean;

	constructor(obj: any, withSummary: boolean) {

		const data = obj.quick_status;

		this.id = data.productId;
		this.name = itemNames[this.id] ?? null;

		const itemData = items.find(e => e.name === this.name);

		this.rarity = itemData?.tier ?? null;
		this.category = itemData?.category ?? null;
		this.sellPrice = data.sellPrice.toFixed(2);
		this.sellVolume = data.sellVolume;
		this.sellMovingWeek = data.sellMovingWeek;
		this.sellOrders = data.sellOrders;

		this.buyPrice = data.buyPrice.toFixed(2);
		this.buyVolume = data.buyVolume;
		this.buyMovingWeek = data.buyMovingWeek;
		this.buyOrders = data.buyOrders;

		this.isEnchanted = data.productId.startsWith("ENCHANTED_");

		if(withSummary) {
			this.sellSummary = obj.sell_summary.map((e: any) => new OrderSummary(e));
			this.buySummary = obj.buy_summary.map((e: any) => new OrderSummary(e));
		}
	}

	search(term: string) {
		return this.id.toLowerCase().includes(term) || (this.name?.toLowerCase().includes(term) ?? false);
	}

}