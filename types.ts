import { type Request } from 'express';
import { type JwtPayload } from 'jsonwebtoken';

export interface AuthorizationRequest extends Request {
	credentials: JwtPayload;
}
