export declare class ApiError extends Error {
    readonly name = "API ERROR";
    readonly status: number;
    readonly message: string;
    constructor(status: number, message: string);
    static UnAuthorization(): ApiError;
    static NoAccess(): ApiError;
    static BadRequest(error: string): ApiError;
}
