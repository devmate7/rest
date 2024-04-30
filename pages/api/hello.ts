import multer from 'multer';

type Data = {
	done: boolean;
	info?: string;
	account?: string;
	name?: string;
};

const upload = multer();

export default function handler(
	req: import('next').NextApiRequest,
	res: import('next').NextApiResponse<Data>
) {
	if (
		req.method === 'POST' &&
		req.headers['content-type']?.startsWith('multipart/form-data')
	) {
		const { account, password } = req.body;

		upload.none()(
			req,
			res,
			err => err
				? res.status(500).json({ done: false, info: err.message })
				: res.status(200).json({ done: true, account })
		);
	}

	res.status(200).json({ done: true, name: 'John Doe' });
}
