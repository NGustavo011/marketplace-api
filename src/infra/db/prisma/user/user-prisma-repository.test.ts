import { mockRegisterParams } from '../../../../data/test/mock-user';
import { prisma } from '../../../../main/config/prisma';
import { mockPrismaUser, mockPrismaUserWithPixKey } from '../../../test/prisma/user';
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
	describe('checkUserHasPixKey()', () => {
		test('Deve retornar null em caso de não encontrar o usuário pelo id no método de checkUserHasPixKey', async () => {
			const sut = makeSut();
			const user = await sut.checkUserHasPixKey('any_id');
			expect(user).toBeNull();
		});
		test('Deve retornar false em caso de o usuário não possuir pixKey no método de checkUserHasPixKey', async () => {
			const sut = makeSut();
			await mockPrismaUser();
			const userHasPixKey = await sut.checkUserHasPixKey('user_id');
			expect(userHasPixKey).toBeFalsy();
		});
		test('Deve retornar true em caso de o usuário possuir pixKey no método de checkUserHasPixKey', async () => {
			const sut = makeSut();
			await mockPrismaUserWithPixKey();
			const userHasPixKey = await sut.checkUserHasPixKey('user_id_with_pix_key');
			expect(userHasPixKey).toBeTruthy();
		});
		
	});
});
