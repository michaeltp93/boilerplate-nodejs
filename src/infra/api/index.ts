import { Router } from 'express';
import { DependencyContainer } from 'tsyringe';
import { ProductRouter } from './routes/product.routes';

export class APIRouter {
	private router: Router;
	private product: ProductRouter;

	constructor(container: DependencyContainer) {
		this.router = Router({ mergeParams: true });
		this.product = new ProductRouter(container);
	}

	public routes(): Router {
		this.router.use('/products', this.product.routes());
		return this.router;
	}
}
