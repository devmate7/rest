import { JSONFilePreset } from 'lowdb/node';

const format = [
	{
		id: '',
		username: '',
		password: '',
		name: '',
		mail: '',
		headshot: ''
	}
];

const db = await JSONFilePreset('./data/users.json', format);

await db.read();

export default db;
