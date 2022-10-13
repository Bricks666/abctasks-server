import { CookieOptions } from 'express';

export const BASE_COOKIE_OPTIONS: CookieOptions = {
	httpOnly: true,
	secure: true,
	sameSite: 'none',
	domain: '',
};

export const COOKIE_TIME: number = 30 * 24 * 60 * 60 * 1000;

export const COOKIE_NAME = process.env.COOKIE_NAME || 'beautifulTodo';
