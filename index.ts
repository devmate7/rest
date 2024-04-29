import cors from 'cors';
import express, { type Request } from 'express';
import moment from 'moment';
import multer from 'multer';
import { Low } from 'lowdb';
import { JSONFilePreset } from 'lowdb/node';
import { v4 as uuidv4 } from 'uuid';
import jwt from 'jsonwebtoken';

interface AuthorizationRequest extends Request {
	credentials: object;
}

const secret = process.argv[2];
const db = await JSONFilePreset('db.json', { user: {}, products: [] });
const upload = multer();

await db.read();
const app = express();
const whitelist = ['http://localhost:5500', 'http://localhost:3000', undefined];
const middleware = {
	cors: cors({
		credentials: true,
		origin: (origin, callback) =>
			whitelist.includes(origin) ? callback(null, true) : callback(new Error())
	})
};
app.use(middleware.cors);

app.get('/', (req, res) => res.send('Home'));

app.listen(3000, () => console.log('Serve on http://localhost:3000'));

async function authorize(
	req: AuthorizationRequest,
	res: import('express').Response,
	next: import('express').NextFunction
) {
	const header = req.get('Authorization') ?? '';

	if (!header.startsWith('Bearer')) {
		return res.status(401).json({ done: false });
	}

	const token = header.slice(7);

	try {
		// req.credentials = jwt.verify(token, secret);

		next();
	} catch (e) {
		return res.status(401).json({ done: false });
	}
}
