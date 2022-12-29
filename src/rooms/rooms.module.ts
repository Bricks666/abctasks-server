import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { RoomsService } from './rooms.service';
import { RoomsController } from './rooms.controller';
import { Room, RoomUser } from './models';
import { AuthModule } from '@/auth/auth.module';
import { old_User } from '@/users/models';

@Module({
	imports: [SequelizeModule.forFeature([Room, RoomUser, old_User]), AuthModule],
	providers: [RoomsService],
	controllers: [RoomsController],
	exports: [RoomsService],
})
export class RoomsModule {}
