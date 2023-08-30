import { mockCategoryModel } from '../../../../data/test/mock-category';
import { GetCategoryReturn } from '../../../../domain/usecases-contracts/category/get-category';
import { prisma } from '../../../../main/config/prisma';
import { mockPrismaCategory } from '../../../test/prisma/category';
import { clearDatabase } from '../../../test/prisma/clear-database';
import { CategoryPrismaRepository } from './category-prisma-repository';

const makeSut = (): CategoryPrismaRepository => {
	return new CategoryPrismaRepository();
};

describe('CategoryPrismaRepository', ()=> {
	beforeAll(async () => {
		await prisma.$connect();
	});
	afterAll(async () => {
		await prisma.$disconnect();
	});
	beforeEach(async () => {
		await clearDatabase();
		await mockPrismaCategory();
	});

	describe('get()', () => {
		test('Deve retornar todas as categorias em caso de não especificar um id', async () => {
			const sut = makeSut();
			const categories = await sut.get({}) as GetCategoryReturn;
			expect(categories).toBeTruthy();
			expect(categories).toHaveLength(2);
		});

		test('Deve retornar uma categoria em caso de especificar o id', async () => {
			const sut = makeSut();
			const categories = await sut.get({ id: 'category_id_2' }) as GetCategoryReturn;
			expect(categories).toBeTruthy();
			expect(categories).toHaveLength(1);
			expect(categories[0].name).toBe(mockCategoryModel().name);
			expect(categories[0].description).toBe(mockCategoryModel().description);
			expect(categories[0].id).toBe('category_id_2');
		});
	});
});