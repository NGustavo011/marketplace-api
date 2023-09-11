import { mockCategoryModel } from '../../../../data/test/mock-category';
import { mockAddProductParams, mockProductModel } from '../../../../data/test/mock-product';
import { mockUserModel } from '../../../../data/test/mock-user';
import { AddProductReturn } from '../../../../domain/usecases-contracts/product/add-product';
import { EditProductParams, EditProductReturn } from '../../../../domain/usecases-contracts/product/edit-product';
import { GetProductReturn } from '../../../../domain/usecases-contracts/product/get-product';
import { prisma } from '../../../../main/config/prisma';
import { clearDatabase } from '../../../test/prisma/clear-database';
import { mockPrismaProduct } from '../../../test/prisma/product';
import { ProductPrismaRepository } from './product-prisma-repository';

const makeSut = (): ProductPrismaRepository => {
	return new ProductPrismaRepository();
};

describe('ProductPrismaRepository', () => {
	beforeAll(async () => {
		await prisma.$connect();
	});
	afterAll(async () => {
		await prisma.$disconnect();
	});
	beforeEach(async () => {
		await clearDatabase();
	});

	describe('add()', () => {
		test('Deve retornar um produto em caso de sucesso no método de add', async () => {
			const sut = makeSut();
			const addProductParams = mockAddProductParams();
			const userModel = mockUserModel();
			await prisma.user.create({
				data: {
					id: addProductParams.userId,
					name: userModel.name,
					email: userModel.email,
					password: userModel.password,
					role: userModel.role,
					cpf: userModel.cpf
				}
			});
			const categoryModel = mockCategoryModel();
			await prisma.category.create({
				data: {
					id: addProductParams.categoryId,
					name: categoryModel.name,
					description: categoryModel.description
				}
			});
			const product = await sut.add(addProductParams) as AddProductReturn;
			expect(product).toBeTruthy();
			expect(product.id).toBeTruthy();
			expect(product.name).toBe(addProductParams.name);
			expect(product.urlImage).toBe(addProductParams.urlImage);
			expect(product.listPrice).toBe(addProductParams.listPrice);
			const newProducts = await prisma.product.findMany({});
			expect(newProducts[0].id).toBe(product.id);
		});
	});

	describe('delete()', () => {
		test('Deve retornar true em caso de sucesso no método delete', async () => {
			const sut = makeSut();
			await mockPrismaProduct();
			const oldProducts = await prisma.product.findMany({});
			const isProductDeleted = await sut.delete({id: oldProducts[0].id, userId: oldProducts[0].sellerId}) as boolean;
			const newProducts = await prisma.product.findMany({});
			expect(isProductDeleted).toBeTruthy();
			expect(oldProducts).toHaveLength(3);
			expect(newProducts).toHaveLength(2);
		});

		test('Deve retornar false em caso de não encontrar o registro para deletar no método delete', async () => {
			const sut = makeSut();
			await mockPrismaProduct();
			const oldProducts = await prisma.product.findMany({});
			const isProductDeleted = await sut.delete({id: 'invalid_id', userId: oldProducts[0].sellerId}) as boolean;
			const newProducts = await prisma.product.findMany({});
			expect(isProductDeleted).toBeFalsy();
			expect(oldProducts).toHaveLength(3);
			expect(newProducts).toHaveLength(3);
		});
	});

	describe('edit()', ()=>{
		test('Deve retornar um produto em caso de sucesso no método de edit', async () => {
			const sut = makeSut();
			await mockPrismaProduct();
			const oldProducts = await prisma.product.findMany({});
			const editProductParams: EditProductParams = { 
				id: oldProducts[0].id,
				userId: oldProducts[0].sellerId,
				product: {
					name: 'new_name',
					description: oldProducts[0].description,
					listPrice: Number(oldProducts[0].listPrice),
					salePrice: Number(oldProducts[0].salePrice),
					urlImage: oldProducts[0].urlImage,
					categoryId: oldProducts[0].categoryId
				}
			};
			const editedProduct = await sut.edit(editProductParams) as EditProductReturn;
			expect(editedProduct.id).toBe(oldProducts[0].id);
			expect(editedProduct.name).toBe('new_name');
			const editedProductInBd = await prisma.product.findUnique({ where: {id: editedProduct.id }});
			expect(editedProductInBd?.id).toBe(editedProduct.id);
			expect(editedProductInBd?.name).toBe('new_name');
		});
	});

	describe('get()', ()=>{
		test('Deve retornar todos os produtos em caso de não especificar parâmetros de filtro', async () => {
			const sut = makeSut();
			await mockPrismaProduct();
			const products = await sut.get({}) as GetProductReturn;
			expect(products).toBeTruthy();
			expect(products).toHaveLength(3);
		});

		test('Deve retornar dois produtos em caso de especificar o sellerId', async () => {
			const sut = makeSut();
			await mockPrismaProduct();
			const products = await sut.get({ sellerId: 'user_id_1'}) as GetProductReturn;
			expect(products).toBeTruthy();
			expect(products).toHaveLength(2);
			expect(products[0].id).toBe('product_id_1');
			expect(products[1].id).toBe('product_id_2');
		});

		test('Deve retornar dois produtos em caso de especificar o categoryId', async () => {
			const sut = makeSut();
			await mockPrismaProduct();
			const products = await sut.get({ categoryId: 'category_id_2'}) as GetProductReturn;
			expect(products).toBeTruthy();
			expect(products).toHaveLength(2);
			expect(products[0].id).toBe('product_id_2');
			expect(products[1].id).toBe('product_id_3');
		});

		test('Deve retornar um único produto em caso de especificar o id', async () => {
			const sut = makeSut();
			await mockPrismaProduct();
			const products = await sut.get({ id: 'product_id_1'}) as GetProductReturn;
			expect(products).toBeTruthy();
			expect(products).toHaveLength(1);
			expect(products[0].name).toBe(mockProductModel().name);
			expect(products[0].description).toBe(mockProductModel().description);
			expect(products[0].id).toBe('product_id_1');
		});
	});
});