import { Product } from './product';
export class BazaarItem {
	id: string;
	name: string | null;
	tier: string | null;
	category: string | null;
	isEnchanted: boolean

	constructor(p: Product) {
		this.id = p.id;
		this.name = p.name;
		this.tier = p.rarity;
		this.category = p.category;
		this.isEnchanted = p.isEnchanted;
	}

}