import { CookieOptions } from 'express';

export const BASE_COOKIE_OPTIONS: CookieOptions = {
	httpOnly: true,
	secure: true,
};

export const COOKIE_TIME: number = 30 * 24 * 60 * 60;

export const COOKIE_NAME = process.env.COOKIE_NAME || 'todo';
