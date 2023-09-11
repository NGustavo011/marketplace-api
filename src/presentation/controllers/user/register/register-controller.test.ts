import { throwError } from '../../../../domain/test/test-helpers';
import { LoginContract } from '../../../../domain/usecases-contracts/user/login';
import { RegisterContract } from '../../../../domain/usecases-contracts/user/register';
import { mockValidation } from '../../../../validation/test/mock-validation';
import { HttpRequest } from '../../../contracts/http';
import { Validation } from '../../../contracts/validation';
import { EmailInUseError } from '../../../errors/email-in-use-error';
import { MissingParamError } from '../../../errors/missing-param-error';
import { ServerError } from '../../../errors/server-error';
import { badRequest, forbidden, ok, serverError } from '../../../helpers/http/http-helper';
import { mockLogin, mockRegister } from '../../../test/mock-user';
import { RegisterController } from './register-controller';

const mockRequest = (): HttpRequest => {
	return {
		body: {
			name: 'any_name',
			email: 'any_mail@mail.com',
			password: 'any_password',
			passwordConfirmation: 'any_password',
			cpf: '986.208.638-60'
		}
	};
};

interface SutTypes {
  sut: RegisterController
  registerStub: RegisterContract
  validationStub: Validation
  loginStub: LoginContract
}

const makeSut = (): SutTypes => {
	const registerStub = mockRegister();
	const validationStub = mockValidation();
	const loginStub = mockLogin();
	const sut = new RegisterController(registerStub, validationStub, loginStub);
	return {
		sut, registerStub, validationStub, loginStub
	};
};

describe('Register Controller', () => {
	describe('Register dependency', () => {
		test('Deve chamar Register utilizando os valores corretos', async () => {
			const { sut, registerStub } = makeSut();
			const addSpy = jest.spyOn(registerStub, 'add');
			await sut.execute(mockRequest());
			expect(addSpy).toHaveBeenCalledWith({
				name: mockRequest().body.name,
				email: mockRequest().body.email,
				password: mockRequest().body.password,
				cpf: mockRequest().body.cpf
			});
		});
		test('Retorne status de erro 500 se o execute lançar um erro', async () => {
			const { sut, registerStub } = makeSut();
			jest.spyOn(registerStub, 'add').mockImplementationOnce(throwError);
			const httpResponse = await sut.execute(mockRequest());
			expect(httpResponse).toEqual(serverError(new ServerError()));
		});
		test('Retorne status 403 se o Register retornar null', async () => {
			const { sut, registerStub } = makeSut();
			jest.spyOn(registerStub, 'add').mockReturnValueOnce(new Promise(resolve => { resolve(null); }));
			const httpResponse = await sut.execute(mockRequest());
			expect(httpResponse).toEqual(forbidden(new EmailInUseError()));
		});
	});
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
			const { sut, loginStub } = makeSut();
			const authSpy = jest.spyOn(loginStub, 'auth');
			await sut.execute(mockRequest());
			expect(authSpy).toHaveBeenCalledWith({
				email: mockRequest().body.email,
				password: mockRequest().body.password
			});
		});
		test('Deve retornar 500 se a autenticação lançar uma exceção', async () => {
			const { sut, loginStub } = makeSut();
			jest.spyOn(loginStub, 'auth').mockImplementationOnce(() => {
				throw new Error();
			});
			const httpResponse = await sut.execute(mockRequest());
			expect(httpResponse).toEqual(serverError(new Error()));
		});
	});
	test('Retorne status 200 se o dado provido for válido', async () => {
		const { sut } = makeSut();
		const httpResponse = await sut.execute(mockRequest());
		expect(httpResponse).toEqual(ok({ accessToken: 'any_token', name: mockRequest().body.name }));
	});
});
