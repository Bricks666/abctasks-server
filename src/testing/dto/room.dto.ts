import { PartialType } from '@nestjs/swagger';
import { RoomDto } from '@/rooms';

export class TestingRoomDto extends PartialType(RoomDto) {}
