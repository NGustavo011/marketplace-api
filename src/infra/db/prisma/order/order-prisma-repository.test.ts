import { mockCategoryModel } from '../../../../data/test/mock-category';
import { mockAddOrderParams } from '../../../../data/test/mock-order';
import { mockProductModel } from '../../../../data/test/mock-product';
import { mockUserModel } from '../../../../data/test/mock-user';
import { AddOrderReturn } from '../../../../domain/usecases-contracts/order/add-order';
import { EditOrderStatusParams, EditOrderStatusReturn } from '../../../../domain/usecases-contracts/order/edit-order-status';
import { GetOrderReturn } from '../../../../domain/usecases-contracts/order/get-order';
import { ValidateOrderSellerReturn } from '../../../../domain/usecases-contracts/order/validate-order-seller';
import { prisma } from '../../../../main/config/prisma';
import { clearDatabase } from '../../../test/prisma/clear-database';
import { mockPrismaOrder } from '../../../test/prisma/order';
import { OrderPrismaRepository } from './order-prisma-repository';

const makeSut = (): OrderPrismaRepository => {
	return new OrderPrismaRepository();
};

describe('OrderPrismaRepository', ()=>{
	beforeAll(async () => {
		await prisma.$connect();
	});
	afterAll(async () => {
		await prisma.$disconnect();
	});
	beforeEach(async () => {
		await clearDatabase();
	});
    
	describe('add()', ()=>{
		test('Deve retornar um pedido em caso de sucesso no método de add', async () => {
			const sut = makeSut();
			const addOrderParams = mockAddOrderParams();
			const userModel = mockUserModel();
			const user = await prisma.user.create({
				data: {
					id: addOrderParams.buyerId,
					name: userModel.name,
					email: userModel.email,
					password: userModel.password,
					role: userModel.role,
					cpf: userModel.cpf
				}
			});
			const categoryModel = mockCategoryModel();
			const category = await prisma.category.create({
				data: {
					id: 'category_id',
					name: categoryModel.name,
					description: categoryModel.description
				}
			});
			const productModel = mockProductModel();
			const product = await prisma.product.create({
				data: {
					id: addOrderParams.products[0].id,
					name: productModel.name,
					description: productModel.description,
					listPrice: productModel.listPrice,
					salePrice: productModel.salePrice,
					urlImage: productModel.urlImage,
					categoryId: category.id,
					sellerId: user.id
				}
			});
			const order = await sut.add(addOrderParams) as AddOrderReturn;
			expect(order).toBeTruthy();
			expect(order.id).toBeTruthy();
			expect(order.buyerId).toBe(user.id);
			expect(order.paymentMethod).toBe(addOrderParams.paymentMethod);
			expect(order.orderItems[0].name).toBe(product.name);
			expect(order.orderItems[0].sellerId).toBe(product.sellerId);
			expect(order.orderItems[0].categoryId).toBe(product.categoryId);
			const newOrders = await prisma.order.findMany({});
			expect(newOrders[0].id).toBe(order.id);
		});

		test('Deve criar o pedido sem um item passado se o mesmo não for localizado no banco', async () => {
			const sut = makeSut();
			const addOrderParams = mockAddOrderParams();
			addOrderParams.products = [...addOrderParams.products, {id: 'invalidId', quantity: 1}];
			const userModel = mockUserModel();
			const user = await prisma.user.create({
				data: {
					id: addOrderParams.buyerId,
					name: userModel.name,
					email: userModel.email,
					password: userModel.password,
					role: userModel.role,
					cpf: userModel.cpf
				}
			});
			const categoryModel = mockCategoryModel();
			const category = await prisma.category.create({
				data: {
					id: 'category_id',
					name: categoryModel.name,
					description: categoryModel.description
				}
			});
			const productModel = mockProductModel();
			await prisma.product.create({
				data: {
					id: addOrderParams.products[0].id,
					name: productModel.name,
					description: productModel.description,
					listPrice: productModel.listPrice,
					salePrice: productModel.salePrice,
					urlImage: productModel.urlImage,
					categoryId: category.id,
					sellerId: user.id
				}
			});
			const order = await sut.add(addOrderParams) as AddOrderReturn;
			expect(addOrderParams.products).toHaveLength(2);
			expect(order.orderItems).toHaveLength(1);
		});
	});

	describe('edit()', ()=>{
		test('Deve retornar um pedido em caso de sucesso no método de edit', async () => {
			const sut = makeSut();
			await mockPrismaOrder();
			const oldOrders = await prisma.order.findMany({});
			const editOrderStatusParams: EditOrderStatusParams = { 
				id: oldOrders[0].id,
				userId: oldOrders[0].sellerId,
				type: 'canceled'
			};
			const editedOrder = await sut.edit(editOrderStatusParams) as EditOrderStatusReturn;
			expect(editedOrder.id).toBe(oldOrders[0].id);
			expect(editedOrder.status).toBe('canceled');
			const editedOrderInBd = await prisma.order.findUnique({ where: {id: editedOrder.id }});
			expect(editedOrderInBd?.id).toBe(editedOrder.id);
			expect(editedOrderInBd?.status).toBe('canceled');
		});
	});

	describe('get()', ()=>{
		test('Deve retornar todos os pedidos em caso de não especificar parâmetros de filtro', async () => {
			const sut = makeSut();
			await mockPrismaOrder();
			const orders = await sut.get({userId: 'user_id_1'}) as GetOrderReturn;
			expect(orders).toBeTruthy();
			expect(orders).toHaveLength(3);
		});
		test('Deve retornar dois pedidos em caso de especificar o sellerId', async () => {
			const sut = makeSut();
			await mockPrismaOrder();
			const orders = await sut.get({ userId: 'user_id_1', sellerId: 'user_id_2' }) as GetOrderReturn;
			expect(orders).toBeTruthy();
			expect(orders).toHaveLength(2);
			expect(orders[0].id).toBe('order_id_1');
			expect(orders[1].id).toBe('order_id_2');
		});
		test('Deve retornar um pedido em caso de especificar o buyerId', async () => {
			const sut = makeSut();
			await mockPrismaOrder();
			const orders = await sut.get({ userId: 'user_id_1', buyerId: 'user_id_2' }) as GetOrderReturn;
			expect(orders).toBeTruthy();
			expect(orders).toHaveLength(1);
			expect(orders[0].id).toBe('order_id_3');
		});
		test('Deve retornar um pedido em caso de especificar o paymentMethod', async () => {
			const sut = makeSut();
			await mockPrismaOrder();
			const orders = await sut.get({ userId: 'user_id_1', paymentMethod: 'pix' }) as GetOrderReturn;
			expect(orders).toBeTruthy();
			expect(orders).toHaveLength(3);
			expect(orders[0].id).toBe('order_id_1');
		});
		test('Deve retornar dois pedidos em caso de especificar o status', async () => {
			const sut = makeSut();
			await mockPrismaOrder();
			const orders = await sut.get({ userId: 'user_id_1', status: 'finished' }) as GetOrderReturn;
			expect(orders).toBeTruthy();
			expect(orders).toHaveLength(2);
			expect(orders[0].id).toBe('order_id_2');
			expect(orders[1].id).toBe('order_id_3');
		});
		test('Deve retornar um único pedido em caso de especificar o id', async () => {
			const sut = makeSut();
			await mockPrismaOrder();
			const orders = await sut.get({ userId: 'user_id_1', id: 'order_id_1' }) as GetOrderReturn;
			expect(orders).toBeTruthy();
			expect(orders).toHaveLength(1);
			expect(orders[0].id).toBe('order_id_1');
			expect(orders[0].paymentMethod).toBe('pix');
			expect(orders[0].status).toBe('pending');
		});
	});

	describe('validateSeller()', ()=>{
		test('Deve retornar true em caso de sucesso no método de validateSeller', async () => {
			const sut = makeSut();
			const addOrderParams = mockAddOrderParams();
			const userModel = mockUserModel();
			const user = await prisma.user.create({
				data: {
					id: addOrderParams.buyerId,
					name: userModel.name,
					email: userModel.email,
					password: userModel.password,
					role: userModel.role,
					cpf: userModel.cpf
				}
			});
			const categoryModel = mockCategoryModel();
			const category = await prisma.category.create({
				data: {
					id: 'category_id',
					name: categoryModel.name,
					description: categoryModel.description
				}
			});
			const productModel = mockProductModel();
			await prisma.product.create({
				data: {
					id: addOrderParams.products[0].id,
					name: productModel.name,
					description: productModel.description,
					listPrice: productModel.listPrice,
					salePrice: productModel.salePrice,
					urlImage: productModel.urlImage,
					categoryId: category.id,
					sellerId: user.id
				}
			});
			const isOrderSellerValidate = await sut.validateSeller({
				sellerId: user.id,
				products: [
					{
						id: addOrderParams.products[0].id,
						quantity: 1
					}
				]
			}) as ValidateOrderSellerReturn;
			expect(isOrderSellerValidate).toBeTruthy();
		});
		test('Deve retornar false em caso de validateSeller encontrar um produto que não pertence ao sellerId especificado', async () => {
			const sut = makeSut();
			const addOrderParams = mockAddOrderParams();
			addOrderParams.products = [...addOrderParams.products, {id: 'product_id_2', quantity: 1}];
			const userModel = mockUserModel();
			await prisma.user.createMany({
				data: 
				[
					{
						id: addOrderParams.buyerId,
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
					}
				]
			});
			const users = await prisma.user.findMany({});
			const categoryModel = mockCategoryModel();
			const category = await prisma.category.create({
				data: {
					id: 'category_id',
					name: categoryModel.name,
					description: categoryModel.description
				}
			});
			const productModel = mockProductModel();
			await prisma.product.createMany({
				data: [
					{
						id: addOrderParams.products[0].id,
						name: productModel.name,
						description: productModel.description,
						listPrice: productModel.listPrice,
						salePrice: productModel.salePrice,
						urlImage: productModel.urlImage,
						categoryId: category.id,
						sellerId: users[0].id
					},
					{
						id: addOrderParams.products[1].id,
						name: productModel.name,
						description: productModel.description,
						listPrice: productModel.listPrice,
						salePrice: productModel.salePrice,
						urlImage: productModel.urlImage,
						categoryId: category.id,
						sellerId: users[1].id
					}
				],

			});
			const isOrderSellerValidate = await sut.validateSeller({
				sellerId: addOrderParams.buyerId,
				products: addOrderParams.products
			}) as ValidateOrderSellerReturn;
			expect(isOrderSellerValidate).toBeFalsy();
		});
		
	});
});