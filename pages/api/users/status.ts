import { createRouter } from 'next-connect';
import { onError, onNoMatch } from '@/lib/api/handler';

import type { NextApiRequest, NextApiResponse } from 'next';

type Data = {
	done: boolean;
	info?: string;
	account?: string;
	name?: string;
};

const router = createRouter<NextApiRequest, NextApiResponse<Data>>();

router.get(
	(req, res) => {}
);

export default router.handler({ onError, onNoMatch });
