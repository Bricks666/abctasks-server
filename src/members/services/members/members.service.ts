import {
	ConflictException,
	Injectable,
	NotFoundException
} from '@nestjs/common';
import { SecurityUserDto } from '@/users/dto';
import { MembersRepository } from '../../repositories';
import {
	GetUsersParams as GetMembersParams,
	RemoveUserParams,
	IsExistsParams,
	AddMemberParams,
	ExitMemberParams
} from './types';

@Injectable()
export class MembersService {
	constructor(private readonly membersRepository: MembersRepository) {}

	async getMembers(params: GetMembersParams): Promise<SecurityUserDto[]> {
		const users = await this.membersRepository.getAllActivated(params);

		if (!users) {
			throw new NotFoundException('Room was not found');
		}

		return users;
	}

	async addMember(params: AddMemberParams): Promise<SecurityUserDto> {
		try {
			return await this.membersRepository.create({
				roomId: params.roomId,
				userId: params.userId,
			});
		} catch {
			return this.membersRepository.update({
				roomId: params.roomId,
				userId: params.userId,
				status: 'activated',
			});
		}
	}

	async exit(params: ExitMemberParams): Promise<boolean> {
		const exited = await this.membersRepository.remove({
			roomId: params.roomId,
			userId: params.userId,
		});

		if (!exited) {
			throw new ConflictException('You are not in room');
		}

		return exited;
	}

	async removeUser(params: RemoveUserParams): Promise<boolean> {
		const isSuccess = await this.membersRepository.remove(params);

		if (!isSuccess) {
			throw new ConflictException('User is not already in room');
		}

		return isSuccess;
	}

	async isExists(params: IsExistsParams): Promise<boolean> {
		return this.membersRepository.existsActivated(params);
	}
}
