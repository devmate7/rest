import type { NextApiRequest, NextApiResponse } from 'next';
import type { ResponseData } from '@/lib/api';

import db from '@/lib/database';
import multer from 'multer';
import jwt from 'jsonwebtoken';
import { createRouter } from 'next-connect';
import { ApiException, onError, onNoMatch } from '@/lib/api';

const router = createRouter<NextApiRequest, NextApiResponse<ResponseData>>();
const upload = multer();
const secret = process.env.APP_KEY;

router.use(multer.none()).post(async (req, res) => {
	const { account, password, name, mail, head } = req.body;

	if (db.data.users.find(user => user.account === account)) {
		throw new ApiException(500, 'The username has been taken.');
	}

	if (db.data.users.find(user => user.mail === account)) {
		throw new ApiException(500, 'The e-mail address has been taken.');
	}

	const id = crypto.randomUUID();
	const user = { id, account, password, name, mail, head };

	await db.update(({ users }) => users.push(user));

	res.status(201).json({ done: true, data: { id } });
});

router.post(
	(req, res) => {}
);

export default router.handler({ onError, onNoMatch });
