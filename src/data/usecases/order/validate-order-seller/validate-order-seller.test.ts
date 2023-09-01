import { throwError } from '../../../../domain/test/test-helpers';
import { ValidateOrderSellerRepository } from '../../../repositories-contracts/order/validate-order-seller-repository';
import { mockValidateOrderSellerParams, mockValidateOrderSellerRepository } from '../../../test/mock-order';
import { ValidateOrderSeller } from './validate-order-seller';


interface SutTypes {
    validateOrderSellerRepositoryStub: ValidateOrderSellerRepository
    sut: ValidateOrderSeller
  }
  
const makeSut = (): SutTypes => {
	const validateOrderSellerRepositoryStub = mockValidateOrderSellerRepository();
	const sut = new ValidateOrderSeller(validateOrderSellerRepositoryStub);
	return {
		validateOrderSellerRepositoryStub,
		sut
	};
};

describe('ValidateOrderSeller usecase', ()=>{
	describe('ValidateOrderSellerRepository dependency', ()=>{
		test('Deve chamar ValidateOrderSellerRepository com os valores corretos', async ()=>{
			const { sut, validateOrderSellerRepositoryStub } = makeSut();
			const validateSellerSpy = jest.spyOn(validateOrderSellerRepositoryStub, 'validateSeller');
			await sut.validate(mockValidateOrderSellerParams());
			expect(validateSellerSpy).toHaveBeenCalledWith(mockValidateOrderSellerParams());
		});

		test('Deve repassar a exceção se o ValidateOrderSellerRepository lançar um erro', async () => {
			const { sut, validateOrderSellerRepositoryStub } = makeSut();
			jest.spyOn(validateOrderSellerRepositoryStub, 'validateSeller').mockImplementationOnce(throwError);
			const promise = sut.validate(mockValidateOrderSellerParams());
			await expect(promise).rejects.toThrow();
		});

		test('Deve retornar null se ValidateOrderSellerRepository retornar null', async () => {
			const { sut, validateOrderSellerRepositoryStub } = makeSut();
			jest.spyOn(validateOrderSellerRepositoryStub, 'validateSeller').mockReturnValueOnce(Promise.resolve(null));
			const isOrderSellerValid = await sut.validate(mockValidateOrderSellerParams());
			expect(isOrderSellerValid).toBeNull();
		});
	});

	test('Deve retornar um ValidateOrderSellerReturn com sucesso', async () => {
		const { sut } = makeSut();
		const isOrderSellerValid = await sut.validate(mockValidateOrderSellerParams());
		expect(isOrderSellerValid).toEqual(true);
	});
});