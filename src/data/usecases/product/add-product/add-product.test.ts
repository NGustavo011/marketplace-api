import { throwError } from '../../../../domain/test/test-helpers';
import { AddProductRepository } from '../../../repositories-contracts/product/add-product-repository';
import { mockAddProductParams, mockAddProductRepository, mockProductModel } from '../../../test/mock-product';
import { AddProduct } from './add-product';



interface SutTypes {
    addProductRepositoryStub: AddProductRepository
    sut: AddProduct
  }
  
const makeSut = (): SutTypes => {
	const addProductRepositoryStub = mockAddProductRepository();
	const sut = new AddProduct(addProductRepositoryStub);
	return {
		addProductRepositoryStub,
		sut
	};
};

describe('AddProduct usecase', ()=>{
	describe('AddProductRepository dependency', ()=>{
		test('Deve chamar AddProductRepository com os valores corretos', async ()=>{
			const { sut, addProductRepositoryStub } = makeSut();
			const addSpy = jest.spyOn(addProductRepositoryStub, 'add');
			await sut.add(mockAddProductParams());
			expect(addSpy).toHaveBeenCalledWith(mockAddProductParams());
		});

		test('Deve repassar a exceção se o AddProductRepository lançar um erro', async () => {
			const { sut, addProductRepositoryStub } = makeSut();
			jest.spyOn(addProductRepositoryStub, 'add').mockImplementationOnce(throwError);
			const promise = sut.add(mockAddProductParams());
			await expect(promise).rejects.toThrow();
		});

		test('Deve retornar null se AddProductRepository retornar null', async () => {
			const { sut, addProductRepositoryStub } = makeSut();
			jest.spyOn(addProductRepositoryStub, 'add').mockReturnValueOnce(Promise.resolve(null));
			const products = await sut.add(mockAddProductParams());
			expect(products).toBeNull();
		});
	});

	test('Deve retornar um AddProductReturn com sucesso', async () => {
		const { sut } = makeSut();
		const products = await sut.add(mockAddProductParams());
		expect(products).toEqual(mockProductModel());
	});
});