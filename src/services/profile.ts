import { UsersTable } from '@/database';
import { SecureUserModel } from '@/models';
import { ApiError } from './error';

export class ProfileServices {
	public static getUser = async (userId: number) => {
		const user = (
			await UsersTable.select<SecureUserModel>({
				filters: { userId: { operator: '=', value: userId } },
				excludes: ['password'],
			})
		)[0];

		if (!user) {
			throw ApiError.BadRequest('User not found');
		}
		return user;
	};

	public static updateUser = async (userId: number, user: Omit<SecureUserModel, 'userId'>) => {
		await UsersTable.update<Partial<SecureUserModel>>(user, {
			filters: {
				userId: {
					operator: '=',
					value: userId,
				},
			},
		});
		return UsersTable.selectOne<SecureUserModel>({
			filters: { userId: { operator: '=', value: userId } },
			excludes: ['password'],
		});
	};
}
