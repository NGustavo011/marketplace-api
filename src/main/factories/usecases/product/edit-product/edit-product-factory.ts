import { EditProduct } from '../../../../../data/usecases/product/edit-product/edit-product';
import { ProductPrismaRepository } from '../../../../../infra/db/prisma/product/product-prisma-repository';

export const makeEditProduct = (): EditProduct => {
	const productPrismaRepository = new ProductPrismaRepository();
	return new EditProduct(productPrismaRepository);
};
