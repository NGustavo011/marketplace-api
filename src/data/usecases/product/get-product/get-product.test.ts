import { throwError } from '../../../../domain/test/test-helpers';
import { GetProductRepository } from '../../../repositories-contracts/product/get-product-repository';
import { mockGetProductParams, mockGetProductRepository, mockProductModel } from '../../../test/mock-product';
import { GetProduct } from './get-product';


interface SutTypes {
    getProductRepositoryStub: GetProductRepository
    sut: GetProduct
  }
  
const makeSut = (): SutTypes => {
	const getProductRepositoryStub = mockGetProductRepository();
	const sut = new GetProduct(getProductRepositoryStub);
	return {
		getProductRepositoryStub,
		sut
	};
};

describe('GetProduct usecase', ()=>{
	describe('GetProductRepository dependency', ()=>{
		test('Deve chamar GetProductRepository com os valores corretos', async ()=>{
			const { sut, getProductRepositoryStub } = makeSut();
			const getSpy = jest.spyOn(getProductRepositoryStub, 'get');
			await sut.get(mockGetProductParams());
			expect(getSpy).toHaveBeenCalledWith(mockGetProductParams());
		});

		test('Deve repassar a exceção se o GetProductRepository lançar um erro', async () => {
			const { sut, getProductRepositoryStub } = makeSut();
			jest.spyOn(getProductRepositoryStub, 'get').mockImplementationOnce(throwError);
			const promise = sut.get(mockGetProductParams());
			await expect(promise).rejects.toThrow();
		});

		test('Deve retornar null se GetProductRepository retornar null', async () => {
			const { sut, getProductRepositoryStub } = makeSut();
			jest.spyOn(getProductRepositoryStub, 'get').mockReturnValueOnce(Promise.resolve(null));
			const products = await sut.get(mockGetProductParams());
			expect(products).toBeNull();
		});
	});

	test('Deve retornar um GetProductReturn com sucesso', async () => {
		const { sut } = makeSut();
		const products = await sut.get(mockGetProductParams());
		expect(products).toEqual([mockProductModel()]);
	});
});