import { Pagination } from '@/utils';

export interface ServiceParams<
	Data extends Record<string, any>,
	Query extends Record<string, any> = never
> {
	readonly data: Data;
	readonly query?: Query;
}

export interface RepositoryParams<
	Filters extends Record<string, any> = never,
	Sort extends Record<string, any> = never,
	P extends Pagination = never
> {
	readonly filters?: Filters;
	readonly sort?: Sort;
	readonly pagination?: P;
}

export interface RepositoryParamsWithData<
	Data extends Record<string, any>,
	Filters extends Record<string, any> = never,
	Sort extends Record<string, any> = never,
	P extends Pagination = never
> extends RepositoryParams<Filters, Sort, P> {
	readonly data: Data;
}
