import { throwError } from '../../../../domain/test/test-helpers';
import env from '../../../../main/config/env';
import { AddOrderRepository } from '../../../repositories-contracts/order/add-order-repository';
import { GeneratePixRepository } from '../../../repositories-contracts/order/generate-pix-repository';
import { CalculateTotalValueRepository } from '../../../repositories-contracts/product/calculate-total-value-repository';
import { mockAddOrderParams, mockAddOrderRepository, mockGeneratePixRepository, mockOrderModel } from '../../../test/mock-order';
import { mockCalculateTotalValueRepository } from '../../../test/mock-product';
import { AddOrder } from './add-order';
import MockDate from 'mockdate';

interface SutTypes {
	generatePixRepositoryStub: GeneratePixRepository
	calculateTotalValueRepositoryStub: CalculateTotalValueRepository
    addOrderRepositoryStub: AddOrderRepository
    sut: AddOrder
  }
  
const makeSut = (): SutTypes => {
	const generatePixRepositoryStub = mockGeneratePixRepository();
	const calculateTotalValueRepositoryStub = mockCalculateTotalValueRepository();
	const addOrderRepositoryStub = mockAddOrderRepository();
	const sut = new AddOrder(calculateTotalValueRepositoryStub, generatePixRepositoryStub, addOrderRepositoryStub);
	return {
		calculateTotalValueRepositoryStub,
		generatePixRepositoryStub,
		addOrderRepositoryStub,
		sut
	};
};

describe('AddOrder usecase', ()=>{
	beforeAll(() => {
		MockDate.set(new Date());
	});
	afterAll(() => {
		MockDate.reset();
	});
	describe('GeneratePixRepository dependency', ()=>{
		test('Deve chamar GeneratePixRepository.createChargePix com os valores corretos', async ()=>{
			const { sut, generatePixRepositoryStub, calculateTotalValueRepositoryStub } = makeSut();
			const createChargePixSpy = jest.spyOn(generatePixRepositoryStub, 'createChargePix');
			const calculateSpy = jest.spyOn(calculateTotalValueRepositoryStub, 'calculate');
			const value = 50;
			calculateSpy.mockReturnValueOnce(Promise.resolve(value));
			await sut.add(mockAddOrderParams());
			expect(createChargePixSpy).toHaveBeenCalledWith({
				duration: env.pixDuration,
				value
			});
		});

		test('Deve repassar a exceção se o GeneratePixRepository.createChargePix lançar um erro', async () => {
			const { sut, generatePixRepositoryStub } = makeSut();
			jest.spyOn(generatePixRepositoryStub, 'createChargePix').mockImplementationOnce(throwError);
			const promise = sut.add(mockAddOrderParams());
			await expect(promise).rejects.toThrow();
		});

		test('Deve chamar GeneratePixRepository.generateQrCode com os valores corretos', async ()=>{
			const { sut, generatePixRepositoryStub } = makeSut();
			const generateQrCodeSpy = jest.spyOn(generatePixRepositoryStub, 'generateQrCode');
			const createChargePixSpy = jest.spyOn(generatePixRepositoryStub, 'createChargePix');
			const locId = 'any_loc_id';
			createChargePixSpy.mockReturnValueOnce(Promise.resolve(locId));
			await sut.add(mockAddOrderParams());
			expect(generateQrCodeSpy).toHaveBeenCalledWith(locId);
		});

		test('Deve repassar a exceção se o GeneratePixRepository.generateQrCode lançar um erro', async () => {
			const { sut, generatePixRepositoryStub } = makeSut();
			jest.spyOn(generatePixRepositoryStub, 'generateQrCode').mockImplementationOnce(throwError);
			const promise = sut.add(mockAddOrderParams());
			await expect(promise).rejects.toThrow();
		});
	});

	describe('AddOrderRepository dependency', ()=>{
		test('Deve chamar AddOrderRepository com os valores corretos', async ()=>{
			const { sut, addOrderRepositoryStub } = makeSut();
			const addSpy = jest.spyOn(addOrderRepositoryStub, 'add');
			await sut.add(mockAddOrderParams());
			const { buyerId, sellerId, products, status, paymentMethod } = mockAddOrderParams();
			const duration = Number(env.pixDuration);
			expect(addSpy).toHaveBeenCalledWith({
				buyerId,
				sellerId,
				products,
				status,
				paymentMethod,
				txId: 'any_tx_id',
				qrCode: 'any_qr_code',
				qrCodeImage: 'any_qr_code_image',
				qrCodeExpiration: new Date(new Date().getTime() + duration)
			});
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