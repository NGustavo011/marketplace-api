import { throwError } from '../../../../domain/test/test-helpers';
import { EditProductRepository } from '../../../repositories-contracts/product/edit-product-repository';
import { mockEditProductParams, mockEditProductRepository, mockProductModel } from '../../../test/mock-product';
import { EditProduct } from './edit-product';


interface SutTypes {
    editProductRepositoryStub: EditProductRepository
    sut: EditProduct
  }
  
const makeSut = (): SutTypes => {
	const editProductRepositoryStub = mockEditProductRepository();
	const sut = new EditProduct(editProductRepositoryStub);
	return {
		editProductRepositoryStub,
		sut
	};
};

describe('EditProduct usecase', ()=>{
	describe('EditProductRepository dependency', ()=>{
		test('Deve chamar EditProductRepository com os valores corretos', async ()=>{
			const { sut, editProductRepositoryStub } = makeSut();
			const editSpy = jest.spyOn(editProductRepositoryStub, 'edit');
			await sut.edit(mockEditProductParams());
			expect(editSpy).toHaveBeenCalledWith(mockEditProductParams());
		});

		test('Deve repassar a exceção se o EditProductRepository lançar um erro', async () => {
			const { sut, editProductRepositoryStub } = makeSut();
			jest.spyOn(editProductRepositoryStub, 'edit').mockImplementationOnce(throwError);
			const promise = sut.edit(mockEditProductParams());
			await expect(promise).rejects.toThrow();
		});

		test('Deve retornar null se EditProductRepository retornar null', async () => {
			const { sut, editProductRepositoryStub } = makeSut();
			jest.spyOn(editProductRepositoryStub, 'edit').mockReturnValueOnce(Promise.resolve(null));
			const products = await sut.edit(mockEditProductParams());
			expect(products).toBeNull();
		});
	});

	test('Deve retornar um EditProductReturn com sucesso', async () => {
		const { sut } = makeSut();
		const products = await sut.edit(mockEditProductParams());
		expect(products).toEqual(mockProductModel());
	});
});