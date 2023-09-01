import { AddProduct } from '../../../../../data/usecases/product/add-product/add-product';
import { ProductPrismaRepository } from '../../../../../infra/db/prisma/product/product-prisma-repository';

export const makeAddProduct = (): AddProduct => {
	const productPrismaRepository = new ProductPrismaRepository();
	return new AddProduct(productPrismaRepository);
};
