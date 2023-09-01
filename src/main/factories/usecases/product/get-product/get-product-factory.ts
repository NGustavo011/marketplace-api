import { GetProduct } from '../../../../../data/usecases/product/get-product/get-product';
import { ProductPrismaRepository } from '../../../../../infra/db/prisma/product/product-prisma-repository';

export const makeGetProduct = (): GetProduct => {
	const productPrismaRepository = new ProductPrismaRepository();
	return new GetProduct(productPrismaRepository);
};
