import { mockOrderModel } from '../../../../data/test/mock-order';
import { throwError } from '../../../../domain/test/test-helpers';
import { AddOrderContract } from '../../../../domain/usecases-contracts/order/add-order';
import { ValidateOrderSellerContract } from '../../../../domain/usecases-contracts/order/validate-order-seller';
import { ValidateTokenContract } from '../../../../domain/usecases-contracts/user/validate-token';
import { mockValidation } from '../../../../validation/test/mock-validation';
import { HttpRequest } from '../../../contracts/http';
import { Validation } from '../../../contracts/validation';
import { InvalidOrderSellerError } from '../../../errors/invalid-order-seller-error';
import { MissingParamError } from '../../../errors/missing-param-error';
import { badRequest, ok, serverError, unauthorized } from '../../../helpers/http/http-helper';
import { mockAddOrder, mockValidateOrderSeller } from '../../../test/mock-order';
import { mockValidateToken } from '../../../test/mock-user';
import { AddOrderController } from './add-order-controller';

const mockRequest = (): HttpRequest => {
	return {
		body: {
			paymentMethod: 'credit',
			sellerId: 'any_seller_id',
			products: [ 
				{
					id: '1',
					quantity: 1
				},
				{
					id: '2',
					quantity: 1
				}
			]
		},
		headers: {
			authorization: 'any_token'
		}
	};
};

interface SutTypes {
  sut: AddOrderController
  addOrderStub: AddOrderContract
  validateOrderSellerStub: ValidateOrderSellerContract
  validateTokenStub: ValidateTokenContract
  validationStub: Validation
}

const makeSut = (): SutTypes => {
	const addOrderStub = mockAddOrder();
	const validateOrderSellerStub = mockValidateOrderSeller();
	const validateTokenStub = mockValidateToken();
	const validationStub = mockValidation(); 
	const sut = new AddOrderController(addOrderStub, validateOrderSellerStub, validateTokenStub, validationStub);
	return {
		sut,
		addOrderStub,
		validateOrderSellerStub,
		validateTokenStub,
		validationStub
	};
};

describe('AddOrder Controller', () => {
	describe('Validation dependency', () => {
		test('Deve chamar o Validation com valores corretos', async () => {
			const { sut, validationStub } = makeSut();
			const validateSpy = jest.spyOn(validationStub, 'validate');
			const httpRequest = mockRequest();
			await sut.execute(httpRequest);
			expect(validateSpy).toHaveBeenLastCalledWith(Object.assign({}, httpRequest.headers, httpRequest.body));
		});
		test('Retorne status 400 se o Validation retornar um erro', async () => {
			const { sut, validationStub } = makeSut();
			jest.spyOn(validationStub, 'validate').mockReturnValueOnce(new MissingParamError('any_field'));
			const httpResponse = await sut.execute(mockRequest());
			expect(httpResponse).toEqual(badRequest(new MissingParamError('any_field')));
		});
	});
	describe('ValidateToken dependency', () => {
		test('Deve chamar o ValidateToken com valores corretos', async () => {
			const { sut, validateTokenStub } = makeSut();
			const validateTokenSpy = jest.spyOn(validateTokenStub, 'validateToken');
			const httpRequest = mockRequest();
			await sut.execute(httpRequest);
			expect(validateTokenSpy).toHaveBeenCalledWith(httpRequest.headers.authorization);
		});
		test('Retorne status 401 se o ValidateToken retornar null', async () => {
			const { sut, validateTokenStub } = makeSut();
			jest.spyOn(validateTokenStub, 'validateToken').mockReturnValueOnce(Promise.resolve(null));
			const httpResponse = await sut.execute(mockRequest());
			expect(httpResponse).toEqual(unauthorized());
		});
	});
	describe('ValidateOrderSeller dependency', () => {
		test('Deve chamar o ValidateOrderSeller com valores corretos', async () => {
			const { sut, validateOrderSellerStub } = makeSut();
			const validateSpy = jest.spyOn(validateOrderSellerStub, 'validate');
			const httpRequest = mockRequest();
			await sut.execute(httpRequest);
			expect(validateSpy).toHaveBeenCalledWith({
				products: httpRequest.body.products,
				sellerId: httpRequest.body.sellerId
			});
		});
		test('Retorne status 400 se o ValidateOrderSeller retornar false', async () => {
			const { sut, validateOrderSellerStub } = makeSut();
			jest.spyOn(validateOrderSellerStub, 'validate').mockReturnValueOnce(Promise.resolve(false));
			const httpResponse = await sut.execute(mockRequest());
			expect(httpResponse).toEqual(badRequest(new InvalidOrderSellerError()));
		});
	});
	describe('AddOrder dependency', () => {
		test('Deve chamar AddOrder com valores corretos', async () => {
			const { sut, addOrderStub } = makeSut();
			const addSpy = jest.spyOn(addOrderStub, 'add');
			const httpRequest = mockRequest();
			await sut.execute(httpRequest);
			expect(addSpy).toHaveBeenCalledWith({
				products: httpRequest.body.products,
				status: 'pending',
				paymentMethod: httpRequest.body.paymentMethod,
				buyerId: 'any_user_id',
				sellerId: httpRequest.body.sellerId,
				txId: 'tx_id',
				qrCode: 'qr_code',
				qrCodeImage: 'qr_code_image',
			});
		});
		test('Deve retornar 500 se AddOrder lançar uma exceção', async () => {
			const { sut, addOrderStub } = makeSut();
			jest.spyOn(addOrderStub, 'add').mockImplementationOnce(throwError);
			const httpResponse = await sut.execute(mockRequest());
			expect(httpResponse).toEqual(serverError(new Error()));
		});
	});
	test('Retorne status 200 se o dado provido for válido', async () => {
		const { sut } = makeSut();
		const httpResponse = await sut.execute(mockRequest());
		expect(httpResponse).toEqual(ok(mockOrderModel()));
	});
});