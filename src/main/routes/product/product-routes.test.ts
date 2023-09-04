import request from 'supertest';
import { prisma } from '../../config/prisma';
import { clearDatabase } from '../../../infra/test/prisma/clear-database';
import { app } from '../../config/app';
import env from '../../config/env';
import { sign } from 'jsonwebtoken';

type UserData = {
	token: string,
	userId: string
}

type ProductData = {
	token: string,
	categoryId: string,
	productId: string
}

const mockToken = async (): Promise<UserData> => {
	const user = await prisma.user.create({
		data: {
			name: 'test',
			email: 'test@gmail.com',
			password: 'test',
			role: 'user'
		}
	});
	return {
		token: sign({ id: user.id }, env.jwtSecret),
		userId: user.id
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

const mockProduct = async (): Promise<ProductData> => {
	const { userId, token } = await mockToken();
	const categoryId = await mockCategory();
	const product = await prisma.product.create({
		data: {
			name: 'WHEY PROTEIN CONCENTRADO (1KG) - GROWTH SUPPLEMENTS',
			description: 'Whey Protein Growth é a proteína ideal para quem treina hipertrofia e quer ganhar massa muscular. Ideal porque é um suplemento de alto valor biológico com grande concentração de proteínas e aminoácidos essenciais é também rico em Glutamina, BCAA (incluindo Leucina).',
			listPrice: 99.00,
			salePrice: 120.00,
			categoryId: categoryId,
			urlImage: 'https://www.gsuplementos.com.br/upload/growth-layout-personalizado/produto/185/produto-selo-topo-new-v3.png',
			sellerId: userId
		}
	});
	return {
		token,
		categoryId,
		productId: product.id
	};
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
	describe('GET /get-product', () => {
		test('Deve retornar status code 200 em caso de sucesso no GetProduct', async () => {
			await request(app).get('/api/get-product').expect(200);
		});
	});
	describe('POST /add-product', () => {
		test('Deve retornar status code 200 em caso de sucesso no AddProduct', async () => {
			const { token }  = await mockToken();
			const categoryId = await mockCategory();
			await request(app).post('/api/add-product').set('authorization', token).send({
				name: 'WHEY PROTEIN CONCENTRADO (1KG) - GROWTH SUPPLEMENTS',
				description: 'Whey Protein Growth é a proteína ideal para quem treina hipertrofia e quer ganhar massa muscular. Ideal porque é um suplemento de alto valor biológico com grande concentração de proteínas e aminoácidos essenciais é também rico em Glutamina, BCAA (incluindo Leucina).',
				listPrice: 99.00,
				salePrice: 120.00,
				categoryId: categoryId,
				urlImage: 'https://www.gsuplementos.com.br/upload/growth-layout-personalizado/produto/185/produto-selo-topo-new-v3.png'
			}).expect(200);
		});
	});
	describe('PUT /edit-product', () => {
		test('Deve retornar status code 200 em caso de sucesso no EditProduct', async () => {
			const { productId, token, categoryId } = await mockProduct();
			await request(app).put(`/api/edit-product?id=${productId}`).set('authorization', token).send({
				name: 'ATUALIZADO - WHEY PROTEIN CONCENTRADO (1KG) - GROWTH SUPPLEMENTS',
				description: 'ATUALIZADO - Whey Protein Growth é a proteína ideal para quem treina hipertrofia e quer ganhar massa muscular. Ideal porque é um suplemento de alto valor biológico com grande concentração de proteínas e aminoácidos essenciais é também rico em Glutamina, BCAA (incluindo Leucina).',
				listPrice: 120.00,
				salePrice: 140.00,
				categoryId: categoryId,
				urlImage: 'https://www.gsuplementos.com.br/upload/growth-layout-personalizado/produto/185/produto-selo-topo-new-v3.png'
			}).expect(200);
		});
	});
	describe('DELETE /delete-product', () => {
		test('Deve retornar status code 200 em caso de sucesso no DeleteProduct', async () => {
			const { productId, token } = await mockProduct();
			await request(app).delete(`/api/delete-product?id=${productId}`).set('authorization', token).expect(204);
		});
	});

});
