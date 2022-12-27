import { Column, DataType, Model, Table } from 'sequelize-typescript';

@Table({
	tableName: 'activity-sphere',
	createdAt: false,
	updatedAt: false,
})
export class ActivitySphere extends Model<ActivitySphere> {
	@Column({
		type: DataType.INTEGER,
		autoIncrement: true,
		primaryKey: true,
	})
	declare id: number;

	@Column({
		type: DataType.STRING,
		unique: true,
	})
	declare name: string;
}
