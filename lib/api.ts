import type { NextApiRequest, NextApiResponse } from 'next';

export type ExceptedResponseData = {
	done: false;
	message: string;
};

export type ExpectedResponseData = {
	done: true,
	data: object;
};

export type ResponseData = ExceptedResponseData | ExpectedResponseData;

export function onError(
	err: Exception,
	_: NextApiRequest,
	res: NextApiResponse<ResponseData>
) {
	console.error(err);
	res.status(err.code).json({ done: false, message: err.message });
}

export function onNoMatch(
	_: NextApiRequest,
	res: NextApiResponse<ResponseData>
) {
	res.status(404).json({ done: false, message: 'Page not found' });
}

export class ApiException extends Error {
	code: number = 500;

	constructor(code: number, message: string) {
		super(message);

		this.code = code;
	}
}
