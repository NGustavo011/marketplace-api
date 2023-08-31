import { throwError } from '../../../../domain/test/test-helpers';
import { DeleteProductContract } from '../../../../domain/usecases-contracts/product/delete-product';
import { ValidateTokenContract } from '../../../../domain/usecases-contracts/user/validate-token';
import { mockValidation } from '../../../../validation/test/mock-validation';
import { HttpRequest } from '../../../contracts/http';
import { Validation } from '../../../contracts/validation';
import { InvalidParamError } from '../../../errors/invalid-param-error';
import { MissingParamError } from '../../../errors/missing-param-error';
import { badRequest, noContent, serverError, unauthorized } from '../../../helpers/http/http-helper';
import { mockDeleteProduct } from '../../../test/mock-product';
import { mockValidateToken } from '../../../test/mock-user';
import { DeleteProductController } from './delete-product-controller';


const mockRequest = (): HttpRequest => {
	return {
		headers: {
			authorization: 'any_token'
		},
		query: {
			id: 'any_id'
		}
	};
};

interface SutTypes {
  deleteProductStub: DeleteProductContract
  validateTokenStub: ValidateTokenContract
  validationStub: Validation
  sut: DeleteProductController
}

const makeSut = (): SutTypes => {
	const deleteProductStub = mockDeleteProduct();
	const validateTokenStub = mockValidateToken();
	const validationStub = mockValidation();
	const sut = new DeleteProductController(deleteProductStub, validateTokenStub, validationStub);
	return {
		validationStub,
		validateTokenStub,
		deleteProductStub,
		sut
	};
};

describe('DeleteProduct Controller', () => {
	describe('Validation dependency', () => {
		test('Deve chamar o Validation com valores corretos', async () => {
			const { sut, validationStub } = makeSut();
			const validateSpy = jest.spyOn(validationStub, 'validate');
			const httpRequest = mockRequest();
			await sut.execute(httpRequest);
			expect(validateSpy).toHaveBeenLastCalledWith(Object.assign({}, httpRequest.headers, httpRequest.query));
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
	describe('DeleteProduct dependency', () => {
		test('Deve chamar DeleteProduct com valores corretos', async () => {
			const { sut, deleteProductStub } = makeSut();
			const deleteSpy = jest.spyOn(deleteProductStub, 'delete');
			await sut.execute(mockRequest());
			expect(deleteSpy).toHaveBeenCalledWith({
				id: mockRequest().query.id,
				userId: 'any_user_id'
			});
		});
		test('Deve retornar 400 se DeleteProduct retornar null', async () => {
			const { sut, deleteProductStub } = makeSut();
			jest.spyOn(deleteProductStub, 'delete').mockReturnValueOnce(Promise.resolve(false));
			const httpResponse = await sut.execute(mockRequest());
			expect(httpResponse).toEqual(badRequest(new InvalidParamError('Product not found to user specified')));
		});
		test('Deve retornar 500 se DeleteProduct lançar uma exceção', async () => {
			const { sut, deleteProductStub } = makeSut();
			jest.spyOn(deleteProductStub, 'delete').mockImplementationOnce(throwError);
			const httpResponse = await sut.execute(mockRequest());
			expect(httpResponse).toEqual(serverError(new Error()));
		});
	});
	test('Retorne status 204 se o dado provido for válido', async () => {
		const { sut } = makeSut();
		const httpResponse = await sut.execute(mockRequest());
		expect(httpResponse).toEqual(noContent());
	});
});
