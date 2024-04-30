import db from '../db';

export function remove(req: import('../types').AuthorizationRequest): Promise<Error> {
	const { credentials, params } = req;

	return new Promise((res, rej) => {
		if (credentials.id !== params.id) {
			return rej(new Error());
		}
	});
}

export function search(req: import('../types').AuthorizationRequest): Promise<Error> {
	const { credentials, params } = req;

	return new Promise((res, rej) => {
		if (credentials.id !== params.id) {
			return rej(new Error());
		}
	});
}

export function select(id: string): Promise<object[] | Error> {
	const users = id
		? db.data.users.filter(x => x.id === id)
		: db.data.users;

	return new Promise(
		(res, rej) => users ? res(users) : rej(new Error())
	);
}
