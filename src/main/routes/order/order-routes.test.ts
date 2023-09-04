import request from 'supertest';
import { prisma } from '../../config/prisma';
import { clearDatabase } from '../../../infra/test/prisma/clear-database';
import { app } from '../../config/app';
import env from '../../config/env';
import { sign } from 'jsonwebtoken';

type UserData = {
	token: string,
	id: string
}

type MockProductParams = {
	sellerId: string, 
	categoryId: string
}

type MockOrderParams = {
	sellerId: string,
	buyerId: string,
	categoryId: string
}

const mockBuyer = async (): Promise<UserData> => {
	const user = await prisma.user.create({
		data: {
			name: 'buyer',
			email: 'buyer@gmail.com',
			password: 'buyer',
			role: 'user'
		}
	});
	return {
		token: sign({ id: user.id }, env.jwtSecret),
		id: user.id
	};
};

const mockSeller = async (): Promise<UserData> => {
	const user = await prisma.user.create({
		data: {
			name: 'seller',
			email: 'seller@gmail.com',
			password: 'seller',
			role: 'user'
		}
	});
	return {
		token: sign({ id: user.id }, env.jwtSecret),
		id: user.id
	};
};

const mockCategory = async (): Promise<string> => {
	const category = await prisma.category.create({
		data: {
			name: 'category_test_name',
			description: 'category_test_description'
		}
	});
	return category.id;
};

const mockProduct = async ({sellerId, categoryId}: MockProductParams): Promise<string> => {
	const product = await prisma.product.create({
		data: {
			name: 'WHEY PROTEIN CONCENTRADO (1KG) - GROWTH SUPPLEMENTS',
			description: 'Whey Protein Growth é a proteína ideal para quem treina hipertrofia e quer ganhar massa muscular. Ideal porque é um suplemento de alto valor biológico com grande concentração de proteínas e aminoácidos essenciais é também rico em Glutamina, BCAA (incluindo Leucina).',
			listPrice: 99.00,
			salePrice: 120.00,
			categoryId,
			urlImage: 'https://www.gsuplementos.com.br/upload/growth-layout-personalizado/produto/185/produto-selo-topo-new-v3.png',
			sellerId
		}
	});
	return product.id;
};

const mockOrder = async ({buyerId, sellerId, categoryId}: MockOrderParams): Promise<string> => {
	const order = await prisma.order.create({
		data: {
			buyerId,
			sellerId,
			paymentMethod: 'credit',
			status: 'pending',
		}
	});
	await prisma.orderItem.create({
		data: {
			name: 'WHEY PROTEIN CONCENTRADO (1KG) - GROWTH SUPPLEMENTS',
			description: 'Whey Protein Growth é a proteína ideal para quem treina hipertrofia e quer ganhar massa muscular. Ideal porque é um suplemento de alto valor biológico com grande concentração de proteínas e aminoácidos essenciais é também rico em Glutamina, BCAA (incluindo Leucina).',
			listPrice: 99.00,
			salePrice: 120.00,
			urlImage: 'https://www.gsuplementos.com.br/upload/growth-layout-personalizado/produto/185/produto-selo-topo-new-v3.png',
			quantity: 1,
			categoryId,
			sellerId,
			orderId: order.id
		}
	});
	return order.id;
};

describe('Product Routes', () => {
	beforeAll(async () => {
		await prisma.$connect();
	});
	afterAll(async () => {
		await prisma.$disconnect();
	});
	beforeEach(async () => {
		await clearDatabase();
	});
	describe('GET /get-order', () => {
		test('Deve retornar status code 200 em caso de sucesso no GetOrder', async () => {
			const { token } = await mockBuyer();
			await request(app).get('/api/get-order').set('authorization', token).expect(200);
		});
	});
	describe('POST /add-order', () => {
		test('Deve retornar status code 200 em caso de sucesso no AddOrder', async () => {
			const { token } = await mockBuyer();
			const { id: sellerId }  = await mockSeller();
			const categoryId = await mockCategory();
			const productId = await mockProduct({
				categoryId,
				sellerId
			});
			await request(app).post('/api/add-order').set('authorization', token).send({
				paymentMethod: 'credit',
				sellerId,
				products: [
					{
						id: productId,
						quantity: 0
					}
				]
			}).expect(200);
		});
	});
	describe('PUT /edit-order-status', () => {
		test('Deve retornar status code 200 em caso de sucesso no EditOrderStatus', async () => {
			const { id: buyerId } = await mockBuyer();
			const { token, id: sellerId } = await mockSeller();
			const categoryId = await mockCategory();
			await mockProduct({
				categoryId,
				sellerId
			});
			const orderId = await mockOrder({ buyerId, sellerId, categoryId });
			await request(app).put(`/api/edit-order-status?id=${orderId}`).set('authorization', token).send({
				status: 'finished'
			}).expect(200);
		});
	});
});
