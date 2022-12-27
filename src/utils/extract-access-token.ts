import { Request } from 'express';

export const extractAccessToken = (req: Request): [string, string] | null => {
	const authHeader = req.headers.authorization;
	if (!authHeader) {
		return null;
	}
	return authHeader.split(' ') as [string, string];
};
