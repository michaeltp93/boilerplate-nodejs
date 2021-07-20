import { Product } from '@/domain/entities';
import { BaseRepository } from './base.repository';

export interface ProductRepository extends BaseRepository<Product> {
	findProductsWithLimit(): Promise<Product[]>;
}
