import { container } from 'tsyringe';
import { AzureProductRepository } from '@/infra/repository-impl/azure-product.repository.impl';
import { AppDependencies } from './types';

export function registerRepositoryDependencies(): void {
	container.register(AppDependencies.ProductRepository, {
		useClass: AzureProductRepository
	});
}
