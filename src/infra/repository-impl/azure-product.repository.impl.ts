import { Product } from '@/domain/entities';
import { ProductRepository } from '@/domain/repositories';
import { injectable } from 'tsyringe';

@injectable()
export class AzureProductRepository implements ProductRepository {
	async find(): Promise<Product[]> {
		const aProductsDTO: Record<string, any>[] = [];
		[1, 2, 3, 4, 5].forEach((number) => {
			aProductsDTO.push({
				name: `Product ${number}`,
				description: `Description for Prodcut nº ${number}`,
				hasStock: Math.random() > 0.5 ? true : false
			});
		});

		const aProducts = aProductsDTO.map((oProductDTO, index) => {
			return new Product(
				oProductDTO.name,
				oProductDTO.description,
				index.toString(),
				oProductDTO.hasStock
			);
		});
		return aProducts;
	}

	async findProductsWithLimit(): Promise<Product[]> {
		throw new Error('Method not implemented.');
	}
}
