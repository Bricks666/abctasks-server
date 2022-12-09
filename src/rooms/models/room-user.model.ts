import { ForeignKey, Model, Table } from 'sequelize-typescript';
import { User } from '@/users/models';
import { Room } from './room.model';

@Table({
	tableName: 'room-user',
	createdAt: false,
	updatedAt: false,
})
export class RoomUser extends Model<RoomUser> {
	@ForeignKey(() => Room)
	declare roomId: number;

	@ForeignKey(() => User)
	declare userId: number;
}
