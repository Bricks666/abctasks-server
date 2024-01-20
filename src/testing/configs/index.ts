import { User } from '@prisma/client';

export const DEFAULT_USER: Omit<User, 'id'> = {
	activated: true,
	email: 'testing@test.com',
	password: 'some-password',
	photo:
		'https://srv.carbonads.net/static/30242/214e19ab24dfe618f5372f2a8430b9872569ed23',
	username: 'testing user name',
};
