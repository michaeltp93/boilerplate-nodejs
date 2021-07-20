export interface BaseRepository<T> {
	create?: (item: T) => Promise<boolean>;
	find?: () => Promise<T[]>;
	findOne?: (id: string) => Promise<T>;
	update?: (id: string, item: T) => Promise<boolean>;
	delete?: (id: string) => Promise<boolean>;
}
