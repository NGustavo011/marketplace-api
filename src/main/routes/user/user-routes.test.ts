import request from 'supertest';
import { prisma } from '../../config/prisma';
import { clearDatabase } from '../../../infra/test/prisma/clear-database';
import { hash } from 'bcrypt';
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
	describe('POST /register', () => {
		test('Deve retornar status code 200 em caso de sucesso no SignUp', async () => {
			await request(app).post('/api/register').send({
				name: 'Gustavo',
				email: 'gustavo.nogueira@gmail.com',
				password: '123',
				passwordConfirmation: '123',
				cpf: '986.208.638-60'
			}).expect(200);
		});
	});
	describe('POST /login', () => {
		test('Deve retornar status code 200 em caso de sucesso no Login', async () => {
			const password = await hash('123', 12);
			await prisma.user.create({
				data: {
					name: 'Gustavo',
					email: 'gustavo.nogueira@gmail.com',
					password,
					role: 'user',
					cpf: '986.208.638-60'
				}
			});
			await request(app).post('/api/login').send({
				email: 'gustavo.nogueira@gmail.com',
				password: '123'
			}).expect(200);
		});
		test('Deve retornar status code 401 em caso de falha no Login', async () => {
			await request(app).post('/api/login').send({
				email: 'gustavo.nogueira@gmail.com',
				password: '123'
			}).expect(401);
		});
	});
});
