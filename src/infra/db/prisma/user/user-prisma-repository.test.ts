import { mockRegisterParams } from '../../../../data/test/mock-user';
import { prisma } from '../../../../main/config/prisma';
import { mockPrismaUser } from '../../../test/prisma/account';
import { clearDatabase } from '../../../test/prisma/clear-database';
import { UserPrismaRepository } from './user-prisma-repository';

const makeSut = (): UserPrismaRepository => {
	return new UserPrismaRepository();
};

describe('UserPrismaRepository', () => {
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
		test('Deve retornar uma conta em caso de sucesso no método de add', async () => {
			const sut = makeSut();
			const user = await sut.add(mockRegisterParams());
			expect(user).toBeTruthy();
			expect(user.id).toBeTruthy();
			expect(user.name).toBe('any_name');
			expect(user.email).toBe('any_email');
			expect(user.password).toBe('any_password');
		});
	});
	describe('loadByEmail()', () => {
		test('Deve retornar uma conta em caso de sucesso no método de loadByEmail', async () => {
			const sut = makeSut();
			await mockPrismaUser();
			const user = await sut.loadByEmail('any_email');
			expect(user).toBeTruthy();
			expect(user?.id).toBeTruthy();
			expect(user?.name).toBe('any_name');
			expect(user?.email).toBe('any_email');
			expect(user?.password).toBe('any_password');
		});
		test('Deve retornar null em caso de falha no método de loadByEmail', async () => {
			const sut = makeSut();
			const user = await sut.loadByEmail('any_email');
			expect(user).toBeNull();
		});
	});
});
