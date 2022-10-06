import { join } from 'path';

export const DOMAIN = 'localhost';
export const PORT = 5000;
export const FULL_URL = `http://${DOMAIN}:${PORT}/`;
export const COOKIE_NAME = 'beautifulTodo';
export const COOKIE_TIME = 30 * 24 * 60 * 60 * 1000;
export const PATHS = {
	AVATARS: join('uploads', 'avatars'),
};
export const getStaticRoute = (path: string) => {
	return FULL_URL + join('static', path);
};
