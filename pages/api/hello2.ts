import { createRouter } from 'next-connect';

import type { NextApiRequest, NextApiResponse } from 'next';

type Data = {
	done: boolean;
	info?: string;
	account?: string;
	name?: string;
};

const router = createRouter<NextApiRequest, NextApiResponse<Data>>();

router.get((req, res) => {});
router.post((req, res) => {});
router.delete((req, res) => {});
router.put((req, res) => {});

export default router.handler({
	onError(err: Error, req, res) {
		console.error(err);
		res.status(err.statusCode || 500).json({ done: false, info: err.message });
	},

	onNoMatch(req, res) {
		res.status(404).json({ done: false, info: 'Page not found' });
	}
});
