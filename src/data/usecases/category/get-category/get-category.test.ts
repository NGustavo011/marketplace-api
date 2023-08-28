import { throwError } from '../../../../domain/test/test-helpers';
import { GetCategoryRepository } from '../../../repositories-contracts/category/get-category-repository';
import { mockCategoryModel, mockGetCategoryParams, mockGetCategoryRepository } from '../../../test/mock-category';
import { GetCategory } from './get-category';

interface SutTypes {
    getCategoryRepositoryStub: GetCategoryRepository
    sut: GetCategory
  }
  
const makeSut = (): SutTypes => {
	const getCategoryRepositoryStub = mockGetCategoryRepository();
	const sut = new GetCategory(getCategoryRepositoryStub);
	return {
		getCategoryRepositoryStub,
		sut
	};
};

describe('GetCategory usecase', ()=>{
	describe('GetCategoryRepository dependency', ()=>{
		test('Deve chamar GetCategoryRepository com os valores corretos', async ()=>{
			const { sut, getCategoryRepositoryStub } = makeSut();
			const getSpy = jest.spyOn(getCategoryRepositoryStub, 'get');
			await sut.get(mockGetCategoryParams());
			expect(getSpy).toHaveBeenCalledWith(mockGetCategoryParams());
		});

		test('Deve repassar a exceção se o GetCategoryRepository lançar um erro', async () => {
			const { sut, getCategoryRepositoryStub } = makeSut();
			jest.spyOn(getCategoryRepositoryStub, 'get').mockImplementationOnce(throwError);
			const promise = sut.get(mockGetCategoryParams());
			await expect(promise).rejects.toThrow();
		});

		test('Deve retornar null se GetCategoryRepository retornar null', async () => {
			const { sut, getCategoryRepositoryStub } = makeSut();
			jest.spyOn(getCategoryRepositoryStub, 'get').mockReturnValueOnce(Promise.resolve(null));
			const categories = await sut.get(mockGetCategoryParams());
			expect(categories).toBeNull();
		});
	});

	test('Deve retornar um GetCategoryReturn com sucesso', async () => {
		const { sut } = makeSut();
		const categories = await sut.get(mockGetCategoryParams());
		expect(categories).toEqual([mockCategoryModel()]);
	});
});