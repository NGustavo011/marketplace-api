import request from 'supertest';
import { prisma } from '../../config/prisma';
import { clearDatabase } from '../../../infra/test/prisma/clear-database';
import { app } from '../../config/app';

describe('Category Routes', () => {
	beforeAll(async () => {
		await prisma.$connect();
	});
	afterAll(async () => {
		await prisma.$disconnect();
	});
	beforeEach(async () => {
		await clearDatabase();
	});
	describe('GET /get-category', () => {
		test('Deve retornar status code 200 em caso de sucesso no GetCategory', async () => {
			await request(app).get('/api/get-category').expect(200);
		});
	});
});
