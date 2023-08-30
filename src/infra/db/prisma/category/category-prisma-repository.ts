import { GetCategoryRepository } from '../../../../data/repositories-contracts/category/get-category-repository';
import { GetCategoryParams, GetCategoryReturn } from '../../../../domain/usecases-contracts/category/get-category';
import { prisma } from '../../../../main/config/prisma';

export class CategoryPrismaRepository implements GetCategoryRepository {
	async get(getCategoryParams: GetCategoryParams): Promise<GetCategoryReturn | null>{
		const categories = prisma.category.findMany({where: getCategoryParams});
		return categories;
	}
}