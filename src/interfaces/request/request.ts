import { VerifyUserModel } from "@/models";

export interface RequestWithUser {
	readonly user: VerifyUserModel;
}
