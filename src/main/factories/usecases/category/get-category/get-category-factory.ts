import { GetCategory } from '../../../../../data/usecases/category/get-category/get-category';
import { CategoryPrismaRepository } from '../../../../../infra/db/prisma/category/category-prisma-repository';

export const makeGetCategory = (): GetCategory => {
	const categoryPrismaRepository = new CategoryPrismaRepository();
	return new GetCategory(categoryPrismaRepository);
};
