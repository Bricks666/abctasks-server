import {
	PersonalRoomInvitation,
	RoomInvitation
} from '../room-invitations-tokens';

export const isPersonalInvitation = (
	invitation: RoomInvitation
): invitation is PersonalRoomInvitation => {
	return 'userId' in invitation;
};
