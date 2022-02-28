import { ApiError, TokensService } from ".";
import { hash, verify } from "argon2";
import { SecureUserModel, UserModel } from "../models";
import { UsersTable } from "../database";

export class UserService {
	public static registrationUser = async (
		login: string,
		password: string,
		photo?: string
	) => {
		const user = await UsersTable.select({
			filters: {
				login: {
					operator: "=",
					value: login,
				},
			},
		});
		if (user[0]) {
			throw ApiError.BadRequest("User already exists");
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
						operator: "=",
						value: login,
					},
				},
			})
		)[0];

		if (!user) {
			throw ApiError.BadRequest("User not found");
		}

		const isCorrectPassword = await verify(user.password, password);

		if (!isCorrectPassword) {
			throw ApiError.BadRequest("Password is incorrect");
		}
		const secureUser: SecureUserModel = {
			login: user.login,
			userId: user.userId,
			photo: user.photo,
		};
		const tokens = TokensService.createTokens({ userId: user.userId });

		return {
			user: secureUser,
			...tokens,
		};
	};

	public static getUser = async (userId: number) => {
		const user = (
			await UsersTable.select<SecureUserModel>({
				filters: { userId: { operator: "=", value: userId } },
				excludes: ["password"],
			})
		)[0];

		if (!user) {
			throw ApiError.BadRequest("User not found");
		}
		return user;
	};
}
