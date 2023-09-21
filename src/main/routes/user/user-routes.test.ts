import request from 'supertest';
import { prisma } from '../../config/prisma';
import { clearDatabase } from '../../../infra/test/prisma/clear-database';
import { hash } from 'bcrypt';
import { app } from '../../config/app';
import { sign } from 'jsonwebtoken';
import env from '../../config/env';

type UserData = {
	token: string,
	userId: string
}

const mockToken = async (): Promise<UserData> => {
	const user = await prisma.user.create({
		data: {
			name: 'test',
			email: 'test@gmail.com',
			password: 'test',
			role: 'user',
			cpf: '986.208.638-60',
			pixKey: 'test_pix_key'
		}
	});
	return {
		token: sign({ id: user.id }, env.jwtSecret),
		userId: user.id
	};
};

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
	describe('PATCH /edit-user', () => {
		test('Deve retornar status code 200 em caso de sucesso no EditUser', async () => {
			const { token }  = await mockToken();
			await request(app).patch('/api/edit-user').set('authorization', token).send({
				pixKey: 'b51951f8-3f0c-4876-8433-e0020e958b98'
			}).expect(200);
		});
	});
});
