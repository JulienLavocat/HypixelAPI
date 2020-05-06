import {default as fetch} from "node-fetch";
import { Product } from './structures/product';
import { ItemListGenerator } from './itemListGenerator';
import { itemNames } from './data/itemNames';
import { BazaarItem } from './structures/bazaarItem';

const BASE_URL = "https://api.hypixel.net";

export class HypixelAPI {

	constructor(private apiKey: string) {
		if(process.env.HYPIXEL_GENERATE_ITEM_LIST)
			new ItemListGenerator().generateFromAuctions(true);
	}

	get(url: string): Promise<any> {
		return fetch(`${BASE_URL}/${url}?key=${this.apiKey}`).then(r => r.json());
	}

	async getBazaar(withSummary = false): Promise<Product[]> {
		const res = await this.get("skyblock/bazaar");
		return Object.values(res.products).map((e: any) => new Product(e, withSummary));
	}

	async getBazaarItems(): Promise<any> {
		return (await this.getBazaar()).map(e => new BazaarItem(e));
	}

};
