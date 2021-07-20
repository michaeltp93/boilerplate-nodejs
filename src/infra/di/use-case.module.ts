import { ProductUsecase } from '@/application/use-case';
import { container } from 'tsyringe';
import { AppDependencies } from './types';

export function registerUseCase(): void {
	container.register(AppDependencies.ProductUsecase, {
		useClass: ProductUsecase
	});
}
