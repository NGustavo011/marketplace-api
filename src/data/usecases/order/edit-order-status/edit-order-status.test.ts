import { throwError } from '../../../../domain/test/test-helpers';
import { EditOrderStatusRepository } from '../../../repositories-contracts/order/edit-order-status-repository';
import { mockEditOrderStatusParams, mockEditOrderStatusRepository, mockOrderModel } from '../../../test/mock-order';
import { EditOrderStatus } from './edit-order-status';




interface SutTypes {
    editOrderStatusRepositoryStub: EditOrderStatusRepository
    sut: EditOrderStatus
  }
  
const makeSut = (): SutTypes => {
	const editOrderStatusRepositoryStub = mockEditOrderStatusRepository();
	const sut = new EditOrderStatus(editOrderStatusRepositoryStub);
	return {
		editOrderStatusRepositoryStub,
		sut
	};
};

describe('EditOrderStatus usecase', ()=>{
	describe('EditOrderStatusRepository dependency', ()=>{
		test('Deve chamar EditOrderStatusRepository com os valores corretos', async ()=>{
			const { sut, editOrderStatusRepositoryStub } = makeSut();
			const editSpy = jest.spyOn(editOrderStatusRepositoryStub, 'edit');
			await sut.edit(mockEditOrderStatusParams());
			expect(editSpy).toHaveBeenCalledWith(mockEditOrderStatusParams());
		});

		test('Deve repassar a exceção se o EditOrderStatusRepository lançar um erro', async () => {
			const { sut, editOrderStatusRepositoryStub } = makeSut();
			jest.spyOn(editOrderStatusRepositoryStub, 'edit').mockImplementationOnce(throwError);
			const promise = sut.edit(mockEditOrderStatusParams());
			await expect(promise).rejects.toThrow();
		});

		test('Deve retornar null se EditOrderStatusRepository retornar null', async () => {
			const { sut, editOrderStatusRepositoryStub } = makeSut();
			jest.spyOn(editOrderStatusRepositoryStub, 'edit').mockReturnValueOnce(Promise.resolve(null));
			const orders = await sut.edit(mockEditOrderStatusParams());
			expect(orders).toBeNull();
		});
	});

	test('Deve retornar um EditOrderStatusReturn com sucesso', async () => {
		const { sut } = makeSut();
		const orders = await sut.edit(mockEditOrderStatusParams());
		expect(orders).toEqual(mockOrderModel());
	});
});