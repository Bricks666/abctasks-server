import { CreateActivityQuery } from '../../repositories';
import { CreateActivityRequest } from '../contracts';

export const convertCreateActivityRequest = (
	request: CreateActivityRequest
): CreateActivityQuery => {
	const { actionName, activistId, roomId, sphereName, } = request;

	return {
		activistId,
		roomId,
		action: actionName,
		sphere: sphereName,
	};
};
