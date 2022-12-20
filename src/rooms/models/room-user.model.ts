import {
	Column,
	ForeignKey,
	Model,
	Table,
	DataType
} from 'sequelize-typescript';
import { User } from '@/users/models';
import { Room } from './room.model';

@Table({
	tableName: 'room-user',
	createdAt: false,
	updatedAt: false,
	defaultScope: {
		where: {
			removed: false,
		},
	},
})
export class RoomUser extends Model<RoomUser> {
	@ForeignKey(() => Room)
	declare roomId: number;

	@ForeignKey(() => User)
	declare userId: number;

	@Column({
		type: DataType.BOOLEAN,
		defaultValue: false,
	})
	declare removed: boolean;
}
