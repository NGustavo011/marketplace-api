import { throwError } from '../../../../domain/test/test-helpers';
import { AddOrderRepository } from '../../../repositories-contracts/order/add-order-repository';
import { mockAddOrderParams, mockAddOrderRepository, mockOrderModel } from '../../../test/mock-order';
import { AddOrder } from './add-order';

interface SutTypes {
    addOrderRepositoryStub: AddOrderRepository
    sut: AddOrder
  }
  
const makeSut = (): SutTypes => {
	const addOrderRepositoryStub = mockAddOrderRepository();
	const sut = new AddOrder(addOrderRepositoryStub);
	return {
		addOrderRepositoryStub,
		sut
	};
};

describe('AddOrder usecase', ()=>{
	describe('AddOrderRepository dependency', ()=>{
		test('Deve chamar AddOrderRepository com os valores corretos', async ()=>{
			const { sut, addOrderRepositoryStub } = makeSut();
			const addSpy = jest.spyOn(addOrderRepositoryStub, 'add');
			await sut.add(mockAddOrderParams());
			expect(addSpy).toHaveBeenCalledWith(mockAddOrderParams());
		});

		test('Deve repassar a exceção se o AddOrderRepository lançar um erro', async () => {
			const { sut, addOrderRepositoryStub } = makeSut();
			jest.spyOn(addOrderRepositoryStub, 'add').mockImplementationOnce(throwError);
			const promise = sut.add(mockAddOrderParams());
			await expect(promise).rejects.toThrow();
		});

		test('Deve retornar null se AddOrderRepository retornar null', async () => {
			const { sut, addOrderRepositoryStub } = makeSut();
			jest.spyOn(addOrderRepositoryStub, 'add').mockReturnValueOnce(Promise.resolve(null));
			const orders = await sut.add(mockAddOrderParams());
			expect(orders).toBeNull();
		});
	});

	test('Deve retornar um AddOrderReturn com sucesso', async () => {
		const { sut } = makeSut();
		const orders = await sut.add(mockAddOrderParams());
		expect(orders).toEqual(mockOrderModel());
	});
});