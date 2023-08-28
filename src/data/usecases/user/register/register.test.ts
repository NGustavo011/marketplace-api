import { throwError } from '../../../../domain/test/test-helpers';
import { HasherRepository } from '../../../repositories-contracts/cryptography/hasher-repository';
import { LoadAccountByEmailRepository } from '../../../repositories-contracts/user/load-account-by-email-repository';
import { RegisterRepository } from '../../../repositories-contracts/user/register-repository';
import { mockHasherRepository } from '../../../test/mock-cryptography';
import { mockLoadAccountByEmailRepository, mockRegisterParams, mockRegisterRepository, mockUserModel } from '../../../test/mock-user';
import { Register } from './register';


interface SutTypes {
  hasherRepositoryStub: HasherRepository
  registerRepositoryStub: RegisterRepository
  loadAccountByEmailRepositoryStub: LoadAccountByEmailRepository
  sut: Register
}

const makeSut = (): SutTypes => {
	const hasherRepositoryStub = mockHasherRepository();
	const registerRepositoryStub = mockRegisterRepository();
	const loadAccountByEmailRepositoryStub = mockLoadAccountByEmailRepository();
	jest.spyOn(loadAccountByEmailRepositoryStub, 'loadByEmail').mockReturnValue(new Promise(resolve => { resolve(null); }));
	const sut = new Register(hasherRepositoryStub, registerRepositoryStub, loadAccountByEmailRepositoryStub);
	return {
		hasherRepositoryStub,
		registerRepositoryStub,
		loadAccountByEmailRepositoryStub,
		sut
	};
};

describe('Register usecase', () => {
	describe('HasherRepository dependency', () => {
		test('Deve chamar o HasherRepository com a senha correta', async () => {
			const { sut, hasherRepositoryStub } = makeSut();
			const hashSpy = jest.spyOn(hasherRepositoryStub, 'hash');
			await sut.add(mockRegisterParams());
			expect(hashSpy).toHaveBeenCalledWith(mockRegisterParams().password);
		});
		test('Deve propagar o erro caso o HasherRepository lance um erro', async () => {
			const { sut, hasherRepositoryStub } = makeSut();
			jest.spyOn(hasherRepositoryStub, 'hash').mockImplementationOnce(throwError);
			const promise = sut.add(mockRegisterParams());
			await expect(promise).rejects.toThrow();
		});
	});
	describe('RegisterRepository dependency', () => {
		test('Deve chamar o RegisterRepository com o valor correto', async () => {
			const { sut, registerRepositoryStub } = makeSut();
			const addSpy = jest.spyOn(registerRepositoryStub, 'add');
			await sut.add(mockRegisterParams());
			expect(addSpy).toHaveBeenCalledWith(Object.assign({}, mockRegisterParams(), { password: 'hashed_value' }));
		});
		test('Deve propagar o erro caso o RegisterRepository lance um erro', async () => {
			const { sut, registerRepositoryStub } = makeSut();
			jest.spyOn(registerRepositoryStub, 'add').mockImplementationOnce(throwError);
			const promise = sut.add(mockRegisterParams());
			await expect(promise).rejects.toThrow();
		});
	});
	describe('LoadAccountByEmailRepository dependency', () => {
		test('Deve chamar o LoadAccountByEmailRepository com o valor correto', async () => {
			const { sut, loadAccountByEmailRepositoryStub } = makeSut();
			const loadSpy = jest.spyOn(loadAccountByEmailRepositoryStub, 'loadByEmail');
			await sut.add(mockRegisterParams());
			expect(loadSpy).toHaveBeenCalledWith(mockRegisterParams().email);
		});
		test('Deve propagar o erro caso o LoadAccountByEmailRepository lance um erro', async () => {
			const { sut, loadAccountByEmailRepositoryStub } = makeSut();
			jest.spyOn(loadAccountByEmailRepositoryStub, 'loadByEmail').mockImplementationOnce(throwError);
			const promise = sut.add(mockRegisterParams());
			await expect(promise).rejects.toThrow();
		});
		test('Deve retornar null caso LoadAccountByEmailRepository não retorne null', async () => {
			const { sut, loadAccountByEmailRepositoryStub } = makeSut();
			jest.spyOn(loadAccountByEmailRepositoryStub, 'loadByEmail').mockReturnValueOnce(Promise.resolve(mockUserModel()));
			const user = await sut.add(mockRegisterParams());
			expect(user).toBeNull();
		});
	});
	test('Deve retornar uma UserModel com sucesso', async () => {
		const { sut } = makeSut();
		const user = await sut.add(mockRegisterParams());
		expect(user).toEqual(mockUserModel());
	});
});
