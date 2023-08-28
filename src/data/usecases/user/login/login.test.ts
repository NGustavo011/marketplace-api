import { throwError } from '../../../../domain/test/test-helpers';
import { LoginReturn } from '../../../../domain/usecases-contracts/user/login';
import { EncrypterRepository } from '../../../repositories-contracts/cryptography/encrypter-repository';
import { HashComparerRepository } from '../../../repositories-contracts/cryptography/hash-comparer-repository';
import { LoadAccountByEmailRepository } from '../../../repositories-contracts/user/load-account-by-email-repository';
import { mockEncrypterRepository, mockHashComparerRepository } from '../../../test/mock-cryptography';
import { mockAuthentication, mockLoadAccountByEmailRepository, mockUserModel } from '../../../test/mock-user';
import { Login } from './login';


interface SutTypes {
  encrypterRepositoryStub: EncrypterRepository
  hashComparerRepositoryStub: HashComparerRepository
  loadAccountByEmailRepositoryStub: LoadAccountByEmailRepository
  sut: Login
}

const makeSut = (): SutTypes => {
	const encrypterRepositoryStub = mockEncrypterRepository();
	const hashComparerRepositoryStub = mockHashComparerRepository();
	const loadAccountByEmailRepositoryStub = mockLoadAccountByEmailRepository();
	const sut = new Login(loadAccountByEmailRepositoryStub, hashComparerRepositoryStub, encrypterRepositoryStub);
	return {
		encrypterRepositoryStub,
		hashComparerRepositoryStub,
		loadAccountByEmailRepositoryStub,
		sut
	};
};

describe('Login usecase', () => {
	describe('LoadAccountByEmailRepository dependency', () => {
		test('Deve chamar o LoadAccountByEmailRepository com o valor correto', async () => {
			const { sut, loadAccountByEmailRepositoryStub } = makeSut();
			const loadSpy = jest.spyOn(loadAccountByEmailRepositoryStub, 'loadByEmail');
			await sut.auth(mockAuthentication());
			expect(loadSpy).toHaveBeenCalledWith(mockAuthentication().email);
		});
		test('Deve propagar o erro caso o LoadAccountByEmailRepository lance um erro', async () => {
			const { sut, loadAccountByEmailRepositoryStub } = makeSut();
			jest.spyOn(loadAccountByEmailRepositoryStub, 'loadByEmail').mockImplementationOnce(throwError);
			const promise = sut.auth(mockAuthentication());
			await expect(promise).rejects.toThrow();
		});
		test('Deve retornar null caso LoadAccountByEmailRepository retorne null', async () => {
			const { sut, loadAccountByEmailRepositoryStub } = makeSut();
			jest.spyOn(loadAccountByEmailRepositoryStub, 'loadByEmail').mockReturnValueOnce(Promise.resolve(null));
			const account = await sut.auth(mockAuthentication());
			expect(account).toBeNull();
		});
	});
	describe('HashComparerRepository dependency', () => {
		test('Deve chamar HashComparerRepository com valores corretos', async () => {
			const { sut, hashComparerRepositoryStub } = makeSut();
			const compareSpy = jest.spyOn(hashComparerRepositoryStub, 'compare');
			await sut.auth(mockAuthentication());
			expect(compareSpy).toHaveBeenCalledWith(mockAuthentication().password, mockUserModel().password);
		});
		test('Deve repassar a exceção se o HashComparerRepository lançar um erro', async () => {
			const { sut, hashComparerRepositoryStub } = makeSut();
			jest.spyOn(hashComparerRepositoryStub, 'compare').mockImplementationOnce(throwError);
			const promise = sut.auth(mockAuthentication());
			await expect(promise).rejects.toThrow();
		});
		test('Deve retornar vázio se o HashComparerRepository retornar falso', async () => {
			const { sut, hashComparerRepositoryStub } = makeSut();
			jest.spyOn(hashComparerRepositoryStub, 'compare').mockReturnValueOnce(new Promise(resolve => { resolve(false); }));
			const model = await sut.auth(mockAuthentication());
			expect(model).toBeNull();
		});
	});
	describe('EncrypterRepository dependency', () => {
		test('Deve chamar EncrypterRepository com um id correto', async () => {
			const { sut, encrypterRepositoryStub } = makeSut();
			const encryptSpy = jest.spyOn(encrypterRepositoryStub, 'encrypt');
			await sut.auth(mockAuthentication());
			expect(encryptSpy).toHaveBeenCalledWith(mockUserModel().id);
		});
		test('Deve repassar a exceção se o EncrypterRepository lançar um erro', async () => {
			const { sut, encrypterRepositoryStub } = makeSut();
			jest.spyOn(encrypterRepositoryStub, 'encrypt').mockImplementationOnce(throwError);
			const promise = sut.auth(mockAuthentication());
			await expect(promise).rejects.toThrow();
		});
	});
	test('Deve retornar um LoginReturn com sucesso', async () => {
		const { sut } = makeSut();
		const { accessToken, name } = await sut.auth(mockAuthentication()) as LoginReturn;
		expect(accessToken).toBe('any_token');
		expect(name).toBe('any_name');
	});
});
