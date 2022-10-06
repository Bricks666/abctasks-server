import { JwtModule } from '@nestjs/jwt';
import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { User } from './models';

@Module({
	imports: [SequelizeModule.forFeature([User]), JwtModule],
	providers: [UsersService],
	controllers: [UsersController],
	exports: [UsersService],
})
export class UsersModule {}
