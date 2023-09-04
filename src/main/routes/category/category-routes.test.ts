import request from 'supertest';
import { prisma } from '../../config/prisma';
import { clearDatabase } from '../../../infra/test/prisma/clear-database';
import { app } from '../../config/app';

describe('Account Routes', () => {
	beforeAll(async () => {
		await prisma.$connect();
	});
	afterAll(async () => {
		await prisma.$disconnect();
	});
	beforeEach(async () => {
		await clearDatabase();
	});
	describe('GET /category', () => {
		test('Deve retornar status code 200 em caso de sucesso no SignUp', async () => {
			await request(app).get('/api/category').expect(200);
		});
	});
});
