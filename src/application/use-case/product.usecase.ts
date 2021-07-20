import { Product } from '@/domain/entities';
import { injectable, inject } from 'tsyringe';
import { ProductRepository } from '@/domain/repositories';

@injectable()
export class ProductUsecase {
	constructor(
		@inject('ProductRepository') private readonly productRepository: ProductRepository
	) {}

	public getProducts = async (): Promise<Product[]> => {
		return await this.productRepository.find!();
	};

	public getProductsWithLimit = async (): Promise<Product[]> => {
		return await this.productRepository.findProductsWithLimit();
	};
}
