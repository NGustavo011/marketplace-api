import { mockCategoryModel } from '../../../data/test/mock-category';
import { mockProductModel } from '../../../data/test/mock-product';
import { mockUserModel } from '../../../data/test/mock-user';
import { prisma } from '../../../main/config/prisma';


export const mockPrismaProduct = async (): Promise<void> => {
	const userModel = mockUserModel();
	await prisma.user.createMany({
		data: [
			{
				id: 'user_id_1',
				name: userModel.name,
				email: userModel.email,
				password: userModel.password,
				role: userModel.role,
				cpf: userModel.cpf
			},
			{
				id: 'user_id_2',
				name: userModel.name,
				email: userModel.email,
				password: userModel.password,
				role: userModel.role,
				cpf: userModel.cpf
			},
		]
	});
	const users = await prisma.user.findMany({});
	const categoryModel = mockCategoryModel();
	await prisma.category.createMany({
		data: [
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
		],
	});
	const categories = await prisma.category.findMany({});
	const productModel = mockProductModel();
	await prisma.product.createMany({
		data:[
			{
				id: 'product_id_1',
				name: productModel.name,
				description: productModel.description,
				listPrice: productModel.listPrice,
				salePrice: productModel.salePrice,
				urlImage: productModel.urlImage,
				categoryId: categories[0].id,
				sellerId: users[0].id
			},
			{
				id: 'product_id_2',
				name: productModel.name,
				description: productModel.description,
				listPrice: productModel.listPrice,
				salePrice: productModel.salePrice,
				urlImage: productModel.urlImage,
				categoryId: categories[1].id,
				sellerId: users[0].id
			},
			{
				id: 'product_id_3',
				name: productModel.name,
				description: productModel.description,
				listPrice: productModel.listPrice,
				salePrice: productModel.salePrice,
				urlImage: productModel.urlImage,
				categoryId: categories[1].id,
				sellerId: users[1].id
			},
		]
	});
};
