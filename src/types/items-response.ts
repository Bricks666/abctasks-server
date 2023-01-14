export class ItemsResponse<T> {
	declare readonly items: T[];

	declare readonly totalCount: number;

	declare readonly limit: number;
}
