import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { RoomsService } from './rooms.service';
import { RoomsController } from './rooms.controller';
import { Room, RoomUser } from './models';
import { AuthModule } from '@/auth/auth.module';

@Module({
	imports: [SequelizeModule.forFeature([Room, RoomUser]), AuthModule],
	providers: [RoomsService],
	controllers: [RoomsController],
})
export class RoomsModule {}
