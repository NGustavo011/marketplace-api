import { LoginContract } from '../../../../domain/usecases-contracts/user/login';
import { mockValidation } from '../../../../validation/test/mock-validation';
import { HttpRequest } from '../../../contracts/http';
import { Validation } from '../../../contracts/validation';
import { MissingParamError } from '../../../errors/missing-param-error';
import { badRequest, ok, serverError, unauthorized } from '../../../helpers/http/http-helper';
import { mockLogin } from '../../../test/mock-user';
import { LoginController } from './login-controller';


const mockRequest = (): HttpRequest => {
	return {
		body: {
			email: 'any_mail@mail.com',
			password: 'any_password'
		}
	};
};

interface SutTypes {
  sut: LoginController
  validationStub: Validation
  authenticationStub: LoginContract
}

const makeSut = (): SutTypes => {
	const authenticationStub = mockLogin();
	const validationStub = mockValidation();
	const sut = new LoginController(authenticationStub, validationStub);
	return {
		sut,
		validationStub,
		authenticationStub
	};
};

describe('Login Controller', () => {
	describe('Validation dependency', () => {
		test('Deve chamar o Validation com valores corretos', async () => {
			const { sut, validationStub } = makeSut();
			const validateSpy = jest.spyOn(validationStub, 'validate');
			const httpRequest = mockRequest();
			await sut.execute(httpRequest);
			expect(validateSpy).toHaveBeenCalledWith(httpRequest.body);
		});
		test('Retorne status 400 se o Validation retornar um erro', async () => {
			const { sut, validationStub } = makeSut();
			jest.spyOn(validationStub, 'validate').mockReturnValueOnce(new MissingParamError('any_field'));
			const httpResponse = await sut.execute(mockRequest());
			expect(httpResponse).toEqual(badRequest(new MissingParamError('any_field')));
		});
	});
	describe('Login dependency', () => {
		test('Deve chamar a autenticação com valores corretos', async () => {
			const { sut, authenticationStub } = makeSut();
			const authSpy = jest.spyOn(authenticationStub, 'auth');
			await sut.execute(mockRequest());
			expect(authSpy).toHaveBeenCalledWith({
				email: mockRequest().body.email,
				password: mockRequest().body.password
			});
		});
		test('Deve retornar 401 se a autenticação não retornar um usuário corretamente', async ()=>{
			const { sut, authenticationStub } = makeSut();
			jest.spyOn(authenticationStub, 'auth').mockReturnValueOnce(Promise.resolve(null)) ;
			const httpResponse = await sut.execute(mockRequest());
			expect(httpResponse).toEqual(unauthorized());
		});
		test('Deve retornar 500 se a autenticação lançar uma exceção', async () => {
			const { sut, authenticationStub } = makeSut();
			jest.spyOn(authenticationStub, 'auth').mockImplementationOnce(() => {
				throw new Error();
			});
			const httpResponse = await sut.execute(mockRequest());
			expect(httpResponse).toEqual(serverError(new Error()));
		});
	});
	test('Retorne status 200 se o dado provido for válido', async () => {
		const { sut } = makeSut();
		const httpResponse = await sut.execute(mockRequest());
		expect(httpResponse).toEqual(ok({ accessToken: 'any_token', name: 'any_name' }));
	});
});
