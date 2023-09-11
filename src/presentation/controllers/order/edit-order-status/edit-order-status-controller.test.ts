import { mockOrderModel } from '../../../../data/test/mock-order';
import { throwError } from '../../../../domain/test/test-helpers';
import { EditOrderStatusContract } from '../../../../domain/usecases-contracts/order/edit-order-status';
import { ValidateTokenContract } from '../../../../domain/usecases-contracts/user/validate-token';
import { mockValidation } from '../../../../validation/test/mock-validation';
import { HttpRequest } from '../../../contracts/http';
import { Validation } from '../../../contracts/validation';
import { InvalidParamError } from '../../../errors/invalid-param-error';
import { MissingParamError } from '../../../errors/missing-param-error';
import { badRequest, unauthorized, serverError, ok } from '../../../helpers/http/http-helper';
import { mockEditOrderStatus } from '../../../test/mock-order';
import { mockValidateToken } from '../../../test/mock-user';
import { EditOrderStatusController } from './edit-order-status-controller';
import MockDate from 'mockdate';

const mockRequest = (): HttpRequest => {
	return {
		body: {
			status: 'finished'
		},
		headers: {
			authorization: 'any_token'
		},
		query: {
			id: 'any_id'
		}
	};
};

interface SutTypes {
  validationStub: Validation
  validateTokenStub: ValidateTokenContract
  editOrderStatusStub: EditOrderStatusContract
  sut: EditOrderStatusController
}

const makeSut = (): SutTypes => {
	const validationStub = mockValidation();
	const validateTokenStub = mockValidateToken();
	const editOrderStatusStub = mockEditOrderStatus();
	const sut = new EditOrderStatusController(editOrderStatusStub, validateTokenStub, validationStub);
	return {
		validationStub,
		validateTokenStub,
		editOrderStatusStub,
		sut
	};
};

describe('EditOrderStatus Controller', () => {
	beforeAll(() => {
		MockDate.set(new Date());
	});
	afterAll(() => {
		MockDate.reset();
	});
	describe('Validation dependency', () => {
		test('Deve chamar o Validation com valores corretos', async () => {
			const { sut, validationStub } = makeSut();
			const validateSpy = jest.spyOn(validationStub, 'validate');
			const httpRequest = mockRequest();
			await sut.execute(httpRequest);
			expect(validateSpy).toHaveBeenLastCalledWith(Object.assign({}, httpRequest.headers, httpRequest.body, httpRequest.query));
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
	describe('EditOrderStatus dependency', () => {
		test('Deve chamar EditOrderStatus com valores corretos', async () => {
			const { sut, editOrderStatusStub } = makeSut();
			const editSpy = jest.spyOn(editOrderStatusStub, 'edit');
			const httpRequest = mockRequest();
			await sut.execute(httpRequest);
			expect(editSpy).toHaveBeenCalledWith({
				type: httpRequest.body.status,
				id: httpRequest.query.id,
				userId: 'any_user_id'
			});
		});
		test('Deve retornar 400 se EditOrderStatus retornar null', async () => {
			const { sut, editOrderStatusStub } = makeSut();
			jest.spyOn(editOrderStatusStub, 'edit').mockReturnValueOnce(Promise.resolve(null));
			const httpResponse = await sut.execute(mockRequest());
			expect(httpResponse).toEqual(badRequest(new InvalidParamError('Order not found to user specified')));
		});
		test('Deve retornar 500 se EditOrderStatus lançar uma exceção', async () => {
			const { sut, editOrderStatusStub } = makeSut();
			jest.spyOn(editOrderStatusStub, 'edit').mockImplementationOnce(throwError);
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
