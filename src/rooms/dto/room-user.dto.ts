import { PickType } from '@nestjs/swagger';
import { RoomUser } from '../models';

export class RoomUserDto extends PickType(RoomUser, ['userId']) {}
