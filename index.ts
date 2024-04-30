import cors from 'cors';
import express from 'express';
import moment from 'moment';
import multer from 'multer';
import { v4 as uuidv4 } from 'uuid';
import jwt from 'jsonwebtoken';
import cookieParser from 'cookie-parser';
import { router as Users } from './routes/api/users';

const whitelist = [
	'http://localhost:5500',
	'http://localhost:3000'
];
const app = express();
const secret = crypto.randomUUID();

app.use(cors({
	credentials: true,
	origin: (origin, callback) => origin && whitelist.includes(origin)
		? callback(null, true)
		: callback(new Error())
}));
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/users', Users);

app.get('/', (req, res) => res.send('Home'));

app.listen(3000, () => console.log('Serve on http://localhost:3000'));

async function authorize(
	req: import('./types').AuthorizationRequest,
	res: import('express').Response,
	next: import('express').NextFunction
) {
	const header = req.get('Authorization') ?? '';

	if (header.length === 0 || !header.startsWith('Bearer')) {
		return res.status(401).json({ done: false });
	}

	const token = header.slice(7);

	try {
		req.credentials = jwt.verify(
			token,
			secret
		) as import('jsonwebtoken').JwtPayload;

		next();
	} catch (e) {
		return res.status(401).json({ done: false });
	}
}
