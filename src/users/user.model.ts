import { Column, DataType, Model, Table } from 'sequelize-typescript';

interface CreateUser {
	readonly login: string;
	readonly password: string;
	readonly photo?: string | null;
}

@Table({
	tableName: 'users',
	createdAt: false,
	updatedAt: false,
})
export class User extends Model<User, CreateUser> {
	@Column({
		type: DataType.INTEGER,
		primaryKey: true,
		autoIncrement: true,
	})
	declare userId: number;

	@Column({
		type: DataType.STRING,
		unique: true,
	})
	declare login: string;

	@Column({
		type: DataType.STRING,
	})
	declare password: string;

	@Column({
		type: DataType.STRING,
		allowNull: true,
		defaultValue: null,
	})
	declare photo?: string | null;
}
