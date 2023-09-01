import { DeleteProduct } from '../../../../../data/usecases/product/delete-product/delete-product';
import { ProductPrismaRepository } from '../../../../../infra/db/prisma/product/product-prisma-repository';

export const makeDeleteProduct = (): DeleteProduct => {
	const productPrismaRepository = new ProductPrismaRepository();
	return new DeleteProduct(productPrismaRepository);
};
