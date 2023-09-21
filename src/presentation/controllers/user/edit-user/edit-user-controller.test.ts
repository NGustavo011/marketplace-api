import { mockUserModel } from '../../../../data/test/mock-user';
import { throwError } from '../../../../domain/test/test-helpers';
import { EditUserContract } from '../../../../domain/usecases-contracts/user/edit-user';
import { ValidateTokenContract } from '../../../../domain/usecases-contracts/user/validate-token';
import { mockValidation } from '../../../../validation/test/mock-validation';
import { HttpRequest } from '../../../contracts/http';
import { Validation } from '../../../contracts/validation';
import { InvalidParamError } from '../../../errors/invalid-param-error';
import { MissingParamError } from '../../../errors/missing-param-error';
import { badRequest, ok, serverError, unauthorized } from '../../../helpers/http/http-helper';
import { mockEditUser, mockValidateToken } from '../../../test/mock-user';
import { EditUserController } from './edit-user-controller';


const mockRequest = (): HttpRequest => {
	return {
		body: {
			name: 'any_name',
			description: 'any_description',
			listPrice: 0,
			salePrice: 0,
			categoryId: 'any_category_id',
			urlImage: 'any_url_image'
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
  editUserStub: EditUserContract
  sut: EditUserController
}

const makeSut = (): SutTypes => {
	const validationStub = mockValidation();
	const validateTokenStub = mockValidateToken();
	const editUserStub = mockEditUser();
	const sut = new EditUserController(editUserStub, validateTokenStub, validationStub);
	return {
		validationStub,
		validateTokenStub,
		editUserStub,
		sut
	};
};

describe('EditUser Controller', () => {
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
	describe('EditUser dependency', () => {
		test('Deve chamar EditUser com valores corretos', async () => {
			const { sut, editUserStub } = makeSut();
			const editSpy = jest.spyOn(editUserStub, 'edit');
			await sut.execute(mockRequest());
			const httpRequest = mockRequest();
			expect(editSpy).toHaveBeenCalledWith({
				id: 'any_user_id',
				pixKey: httpRequest.body.pixKey,
			});
		});
		test('Deve retornar 400 se EditUser retornar null', async () => {
			const { sut, editUserStub } = makeSut();
			jest.spyOn(editUserStub, 'edit').mockReturnValueOnce(Promise.resolve(null));
			const httpResponse = await sut.execute(mockRequest());
			expect(httpResponse).toEqual(badRequest(new InvalidParamError('User not found')));
		});
		test('Deve retornar 500 se EditUser lançar uma exceção', async () => {
			const { sut, editUserStub } = makeSut();
			jest.spyOn(editUserStub, 'edit').mockImplementationOnce(throwError);
			const httpResponse = await sut.execute(mockRequest());
			expect(httpResponse).toEqual(serverError(new Error()));
		});
	});
	test('Retorne status 200 se o dado provido for válido', async () => {
		const { sut } = makeSut();
		const httpResponse = await sut.execute(mockRequest());
		expect(httpResponse).toEqual(ok(mockUserModel()));
	});
});
