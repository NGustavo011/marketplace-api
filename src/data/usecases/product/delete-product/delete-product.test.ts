import { throwError } from '../../../../domain/test/test-helpers';
import { DeleteProductRepository } from '../../../repositories-contracts/product/delete-product-repository';
import { mockDeleteProductParams, mockDeleteProductRepository } from '../../../test/mock-product';
import { DeleteProduct } from './delete-product';



interface SutTypes {
    deleteProductRepositoryStub: DeleteProductRepository
    sut: DeleteProduct
  }
  
const makeSut = (): SutTypes => {
	const deleteProductRepositoryStub = mockDeleteProductRepository();
	const sut = new DeleteProduct(deleteProductRepositoryStub);
	return {
		deleteProductRepositoryStub,
		sut
	};
};

describe('DeleteProduct usecase', ()=>{
	describe('DeleteProductRepository dependency', ()=>{
		test('Deve chamar DeleteProductRepository com os valores corretos', async ()=>{
			const { sut, deleteProductRepositoryStub } = makeSut();
			const deleteSpy = jest.spyOn(deleteProductRepositoryStub, 'delete');
			await sut.delete(mockDeleteProductParams());
			expect(deleteSpy).toHaveBeenCalledWith(mockDeleteProductParams());
		});

		test('Deve repassar a exceção se o DeleteProductRepository lançar um erro', async () => {
			const { sut, deleteProductRepositoryStub } = makeSut();
			jest.spyOn(deleteProductRepositoryStub, 'delete').mockImplementationOnce(throwError);
			const promise = sut.delete(mockDeleteProductParams());
			await expect(promise).rejects.toThrow();
		});

		test('Deve retornar null se DeleteProductRepository retornar null', async () => {
			const { sut, deleteProductRepositoryStub } = makeSut();
			jest.spyOn(deleteProductRepositoryStub, 'delete').mockReturnValueOnce(Promise.resolve(null));
			const products = await sut.delete(mockDeleteProductParams());
			expect(products).toBeNull();
		});
	});

	test('Deve retornar um DeleteProductReturn com sucesso', async () => {
		const { sut } = makeSut();
		const products = await sut.delete(mockDeleteProductParams());
		expect(products).toEqual(true);
	});
});