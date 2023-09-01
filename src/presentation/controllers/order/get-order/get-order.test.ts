import { mockOrderModel } from '../../../../data/test/mock-order';
import { throwError } from '../../../../domain/test/test-helpers';
import { GetOrderContract } from '../../../../domain/usecases-contracts/order/get-order';
import { ValidateTokenContract } from '../../../../domain/usecases-contracts/user/validate-token';
import { mockValidation } from '../../../../validation/test/mock-validation';
import { HttpRequest } from '../../../contracts/http';
import { Validation } from '../../../contracts/validation';
import { MissingParamError } from '../../../errors/missing-param-error';
import { badRequest, ok, serverError, unauthorized } from '../../../helpers/http/http-helper';
import { mockGetOrder } from '../../../test/mock-order';
import { mockValidateToken } from '../../../test/mock-user';
import { GetOrderController } from './get-order';



const mockRequest = (): HttpRequest => {
	return {
		query: {
			id: 'any_id',
			buyerId: 'any_buyer_id',
			sellerId: 'any_seller_id',
			paymentMethod: 'any_payment_method',
			status: 'pending'
		},
		headers: {
			authorization: 'any_token'
		},
	};
};

interface SutTypes {
  validationStub: Validation
  validateTokenStub: ValidateTokenContract
  getOrderStub: GetOrderContract
  sut: GetOrderController
}

const makeSut = (): SutTypes => {
	const validationStub = mockValidation();
	const validateTokenStub = mockValidateToken();
	const getOrderStub = mockGetOrder();
	const sut = new GetOrderController(getOrderStub, validateTokenStub, validationStub);
	return {
		validationStub,
		validateTokenStub,
		getOrderStub,
		sut
	};
};

describe('GetOrder Controller', () => {
	describe('Validation dependency', () => {
		test('Deve chamar o Validation com valores corretos', async () => {
			const { sut, validationStub } = makeSut();
			const validateSpy = jest.spyOn(validationStub, 'validate');
			const httpRequest = mockRequest();
			await sut.execute(httpRequest);
			expect(validateSpy).toHaveBeenLastCalledWith(httpRequest.headers);
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
	describe('GetOrder dependency', () => {
		test('Deve chamar GetOrder com valores corretos', async () => {
			const { sut, getOrderStub } = makeSut();
			const getSpy = jest.spyOn(getOrderStub, 'get');
			const httpRequest = mockRequest();
			await sut.execute(mockRequest());
			expect(getSpy).toHaveBeenCalledWith({
				id: httpRequest.query.id,
				buyerId: httpRequest.query.buyerId,
				sellerId: httpRequest.query.sellerId,
				paymentMethod: httpRequest.query.paymentMethod,
				status: httpRequest.query.status,
				userId: 'any_user_id'
			});
		});
		test('Deve retornar 500 se GetOrder lançar uma exceção', async () => {
			const { sut, getOrderStub } = makeSut();
			jest.spyOn(getOrderStub, 'get').mockImplementationOnce(throwError);
			const httpResponse = await sut.execute(mockRequest());
			expect(httpResponse).toEqual(serverError(new Error()));
		});
	});
	test('Retorne status 200 se o dado provido for válido', async () => {
		const { sut } = makeSut();
		const httpResponse = await sut.execute(mockRequest());
		expect(httpResponse).toEqual(ok([mockOrderModel()]));
	});
});
