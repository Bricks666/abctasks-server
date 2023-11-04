import { PersonalRoomInvitation, RoomInvitation } from '../members-tokens';

export const isPersonalInvitation = (
	invitation: RoomInvitation
): invitation is PersonalRoomInvitation => {
	return 'userId' in invitation;
};
