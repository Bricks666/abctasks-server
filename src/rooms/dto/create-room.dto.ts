import { PickType } from '@nestjs/swagger';
import { RoomDto } from './room.dto';

export class CreateRoomDto extends PickType(RoomDto, ['name', 'description']) {}
