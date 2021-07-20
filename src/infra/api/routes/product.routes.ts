import { ProductController } from '@/infra/controllers';
import { Router } from 'express';
import { DependencyContainer } from 'tsyringe';

export class ProductRouter {
	private router: Router;
	private productController: ProductController;

	constructor(container: DependencyContainer) {
		this.productController = container.resolve(ProductController);
		this.router = Router();
	}

	public routes(): Router {
		this.router.get('/', this.productController.findAll);
		this.router.get('/limit', this.productController.findAllWithLimit);

		return this.router;
	}
}
