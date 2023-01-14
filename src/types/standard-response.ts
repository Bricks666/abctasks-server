export interface SuccessResponse<T> {
	readonly data: T;
	readonly statusCode: number;
}
