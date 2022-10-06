import { ApiError } from './error';
import { hash, verify } from 'argon2';
import { SecureUserModel, UserModel } from '@/models';
import { UsersTable } from '@/database';

export class AuthServices {
	public static registrationUser = async (
		login: string,
		password: string,
		photo?: string
	) => {
		const user = await UsersTable.select({
			filters: {
				login: {
					operator: '=',
					value: login,
				},
			},
		});
		if (user[0]) {
			throw ApiError.BadRequest('User already exists');
		}

		const hashedPassword = await hash(password);

		await UsersTable.insert({
			login,
			password: hashedPassword,
			photo,
		});
	};

	public static loginUser = async (login: string, password: string) => {
		const user: UserModel = (
			await UsersTable.select({
				filters: {
					login: {
						operator: '=',
						value: login,
					},
				},
			})
		)[0];

		if (!user) {
			throw ApiError.BadRequest('User not found');
		}

		const isCorrectPassword = await verify(user.password, password);

		if (!isCorrectPassword) {
			throw ApiError.BadRequest('Password is incorrect');
		}
		const secureUser: SecureUserModel = {
			login: user.login,
			userId: user.userId,
			photo: user.photo,
		};

		return secureUser;
	};
}
