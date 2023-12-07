import {
	PersonalRoomInvitationTokenPayload,
	RoomInvitationTokenPayload
} from '../room-invitations-tokens';

export const isPersonalInvitation = (
	invitation: RoomInvitationTokenPayload
): invitation is PersonalRoomInvitationTokenPayload => {
	return 'userId' in invitation;
};
