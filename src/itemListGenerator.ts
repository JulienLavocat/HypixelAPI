import {default as fetch} from "node-fetch";
import { writeFile } from "fs";

const BASE_URL = "https://api.hypixel.net";

export class ItemListGenerator {

	private items: any[] = [];

	async generateFromAuctions() {
		const first = await this.get("skyblock/auctions");
		this.explorePage(first);
		for(let i = 1; i < first.totalPages; i++) {
			const page = await this.get("skyblock/auctions?page=" + i);
			this.explorePage(page);
		}

		this.items = this.items.filter((thing, index, self) =>
  			index === self.findIndex((t) => (
    		t.category === thing.category && t.name === thing.name
 		)));

		writeFile("./itemList.json", JSON.stringify(this.items.sort((a: any, b: any) => {
			if(a.name < b.name) { return -1; }
			if(a.name > b.name) { return 1; }
			return 0;
		}), null, 2), (err) => {
			if(err)
				throw err;
		});
	}

	explorePage(page: any) {
		page.auctions.forEach((e: any) => this.createItemData(e));
	}

 	createItemData(data: any) {
		this.items.push({
			name: data.item_name,
			category: data.category,
			tier: data.tier
		});
	}

	get(url: string): Promise<any> {
		return fetch(`${BASE_URL}/${url}${url.includes("?") ? "&" : "?"}key=${process.env.HYPIXEL_API_KEY}`).then(r => r.json());
	}
}
