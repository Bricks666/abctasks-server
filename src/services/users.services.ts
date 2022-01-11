import { ApiError, createTokens } from ".";
import { hash, verify } from "argon2";
import { todoDB } from "../database";
import { SecureUserModel, UserModel } from "../models";

export const registrationUser = async (
	login: string,
	password: string,
	photo?: string
) => {
	const user = await todoDB.Users.getUsers({ filters: { login } });
	if (user[0]) {
		throw ApiError.BadRequest("User already exists");
	}

	const hashedPassword = await hash(password);

	await todoDB.Users.addUser({
		login,
		password: hashedPassword,
		photo,
	});

	const createdUser: SecureUserModel = (
		await todoDB.Users.getUsers({
			filters: { login },
			excludes: ["password"],
		})
	)[0];

	return {
		user: createdUser,
	};
};

export const loginUser = async (login: string, password: string) => {
	const user: UserModel = (
		await todoDB.Users.getUsers({ filters: { login } })
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
	const tokens = createTokens(secureUser);

	return {
		user: secureUser,
		...tokens,
	};
};

export const getUser = async (userId: number) => {
	const user = (
		await todoDB.Users.getUsers<SecureUserModel>({
			filters: { userId },
			excludes: ["password"],
		})
	)[0];

	if (!user) {
		throw ApiError.BadRequest("User not found");
	}
	return user;
};
