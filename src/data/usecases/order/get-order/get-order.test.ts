import { throwError } from '../../../../domain/test/test-helpers';
import { GetOrderRepository } from '../../../repositories-contracts/order/get-order-repository';
import { mockGetOrderParams, mockGetOrderRepository, mockOrderModel } from '../../../test/mock-order';
import { GetOrder } from './get-order';
import MockDate from 'mockdate';

interface SutTypes {
    getOrderRepositoryStub: GetOrderRepository
    sut: GetOrder
  }
  
const makeSut = (): SutTypes => {
	const getOrderRepositoryStub = mockGetOrderRepository();
	const sut = new GetOrder(getOrderRepositoryStub);
	return {
		getOrderRepositoryStub,
		sut
	};
};

describe('GetOrder usecase', ()=>{
	beforeAll(() => {
		MockDate.set(new Date());
	});
	afterAll(() => {
		MockDate.reset();
	});
	describe('GetOrderRepository dependency', ()=>{
		test('Deve chamar GetOrderRepository com os valores corretos', async ()=>{
			const { sut, getOrderRepositoryStub } = makeSut();
			const getSpy = jest.spyOn(getOrderRepositoryStub, 'get');
			await sut.get(mockGetOrderParams());
			expect(getSpy).toHaveBeenCalledWith(mockGetOrderParams());
		});

		test('Deve repassar a exceção se o GetOrderRepository lançar um erro', async () => {
			const { sut, getOrderRepositoryStub } = makeSut();
			jest.spyOn(getOrderRepositoryStub, 'get').mockImplementationOnce(throwError);
			const promise = sut.get(mockGetOrderParams());
			await expect(promise).rejects.toThrow();
		});

		test('Deve retornar null se GetOrderRepository retornar null', async () => {
			const { sut, getOrderRepositoryStub } = makeSut();
			jest.spyOn(getOrderRepositoryStub, 'get').mockReturnValueOnce(Promise.resolve(null));
			const orders = await sut.get(mockGetOrderParams());
			expect(orders).toBeNull();
		});
	});

	test('Deve retornar um GetOrderReturn com sucesso', async () => {
		const { sut } = makeSut();
		const orders = await sut.get(mockGetOrderParams());
		expect(orders).toEqual([mockOrderModel()]);
	});
});