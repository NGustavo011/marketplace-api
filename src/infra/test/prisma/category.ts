import { mockCategoryModel } from '../../../data/test/mock-category';
import { prisma } from '../../../main/config/prisma';


export const mockPrismaCategory = async (): Promise<void> => {
	const categoryModel = mockCategoryModel();
	await prisma.category.createMany({
		data:[
			{
				id: 'category_id_1',
				name: categoryModel.name,
				description: categoryModel.description
			},
			{
				id: 'category_id_2',
				name: categoryModel.name,
				description: categoryModel.description
			}
		]
	});
};
