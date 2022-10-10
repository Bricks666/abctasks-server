export interface SuccessResponse<T> {
	readonly data: T;
	readonly errorMessage: null;
	readonly statusCode: number;
}

export interface FailResponse {
	readonly data: null;
	readonly errorMessage: string;
	readonly statusCode: number;
}
