import {HypixelAPI} from ".";
import {config} from "dotenv";

config();

const API_KEY = process.env.API_KEY + "";

const api = new HypixelAPI(API_KEY);

async function start() {
	const res = await api.getBazaarItems();
	console.log(res[0]);
}

start();