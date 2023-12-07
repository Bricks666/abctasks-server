import { RoomInvitationDto } from '../../dto';

export const isPersonalInvitation = (
	invitation: RoomInvitationDto
): invitation is Required<RoomInvitationDto> => {
	return 'user' in invitation;
};

export const isThisPersonInvitation = (
	invitation: Required<RoomInvitationDto>,
	userId: number
): boolean => {
	return invitation.user.id === userId;
};
