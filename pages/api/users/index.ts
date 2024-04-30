import type { NextApiRequest, NextApiResponse } from 'next';
import type { ResponseData } from '@/lib/api';

import db from '@/lib/database';
import multer from 'multer';
import { createRouter } from 'next-connect';
import { ApiException, onError, onNoMatch } from '@/lib/api';

const router = createRouter<NextApiRequest, NextApiResponse<ResponseData>>();
const upload = multer();

router.use(upload.none()).post(async (req, res) => {
	const { account, password, name, mail, head } = req.body;

	if (db.data.users.find(user => user.account === account)) {
		throw new ApiException(500, 'The username has been taken.');
	}

	const id = crypto.randomUUID();
	const user = { id, account, password, name, mail, head };

	await db.update(({ users }) => users.push(user));

	res.status(201).json({ done: true, data: { id } });
});

router.get((req, res) => {
	try {
		const data = db.data.users.map(user => {
			const { password, ...data } = user;

			return data;
		});

		res.status(200).json({ done: true, data });
	} catch (err) {
		res.status(500).json({ done: false });
	}
});

router.post(
	(req, res) => {}
);

export default router.handler({ onError, onNoMatch });
