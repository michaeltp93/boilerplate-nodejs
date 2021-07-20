import { injectable, inject } from 'tsyringe';
import { ProductUsecase } from '@/application/use-case';
import { Request, Response } from 'express';
import { ok, serverError } from '@/infra/helpers';

@injectable()
export class ProductController {
	constructor(@inject('ProductUsecase') private readonly productUsecase: ProductUsecase) {}

	public findAll = async (_: Request, res: Response): Promise<void> => {
		try {
			const aProducts = await this.productUsecase.getProducts();
			return ok(res, aProducts);
		} catch (err) {
			return serverError(res, err as Error);
		}
	};

	public findAllWithLimit = async (_: Request, res: Response): Promise<void> => {
		try {
			const aProducts = await this.productUsecase.getProductsWithLimit();
			return ok(res, aProducts);
		} catch (err) {
			return serverError(res, err as Error);
		}
	};
}
