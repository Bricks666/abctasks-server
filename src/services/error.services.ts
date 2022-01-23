export class ApiError extends Error {
	public readonly name = "API ERROR";
	public readonly status: number;
	public readonly message: string;

	public constructor(status: number, message: string) {
		super(message);
		this.message = message;
		this.status = status;
	}

	public static UnAuthorization() {
		return new ApiError(401, "Пользователь не авторизован");
	}

  public static NoAccess() {
    return new ApiError(403, "У пользователя нет доступа")
  }

	public static BadRequest(error: string) {
		return new ApiError(400, error);
	}
}
