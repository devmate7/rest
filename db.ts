import { JSONFilePreset } from 'lowdb/node';

const template = {
	users: [
		{ id: '', account: '', password: '', name: '', mail: '', head: '' }
	],
	products: [
		{ id: '', title: '', price: 0, stock: 0, createTime: 0 }
	]
};
const db = await JSONFilePreset('db.json', template);

await db.read();
export default db;
