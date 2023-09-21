import { throwError } from '../../../../domain/test/test-helpers';
import { CheckUserHasPixKeyRepository } from '../../../repositories-contracts/user/check-user-has-pix-key-repository';
import { mockCheckUserHasPixKeyParams, mockCheckUserHasPixKeyRepository } from '../../../test/mock-user';
import { CheckUserHasPixKey } from './check-user-has-pix-key';

interface SutTypes {
    checkUserHasPixKeyStub: CheckUserHasPixKeyRepository
    sut: CheckUserHasPixKey
  }
  
const makeSut = (): SutTypes => {
	const checkUserHasPixKeyStub = mockCheckUserHasPixKeyRepository();
	const sut = new CheckUserHasPixKey(checkUserHasPixKeyStub);
	return {
		checkUserHasPixKeyStub,
		sut
	};
};

describe('CheckUserHasPixKey usecase', ()=>{
	describe('CheckUserHasPixKeyRepository dependency', ()=>{
		test('Deve chamar CheckUserHasPixKeyRepository com os valores corretos', async ()=>{
			const { sut, checkUserHasPixKeyStub } = makeSut();
			const checkUserHasPixKeySpy = jest.spyOn(checkUserHasPixKeyStub, 'checkUserHasPixKey');
			await sut.check(mockCheckUserHasPixKeyParams());
			expect(checkUserHasPixKeySpy).toHaveBeenCalledWith(mockCheckUserHasPixKeyParams());
		});

		test('Deve repassar a exceção se o CheckUserHasPixKeyRepository lançar um erro', async () => {
			const { sut, checkUserHasPixKeyStub } = makeSut();
			jest.spyOn(checkUserHasPixKeyStub, 'checkUserHasPixKey').mockImplementationOnce(throwError);
			const promise = sut.check(mockCheckUserHasPixKeyParams());
			await expect(promise).rejects.toThrow();
		});

		test('Deve retornar null se CheckUserHasPixKeyRepository retornar null', async () => {
			const { sut, checkUserHasPixKeyStub } = makeSut();
			jest.spyOn(checkUserHasPixKeyStub, 'checkUserHasPixKey').mockReturnValueOnce(Promise.resolve(null));
			const userHasPixKey = await sut.check(mockCheckUserHasPixKeyParams());
			expect(userHasPixKey).toBeNull();
		});
	});

	test('Deve retornar um CheckUserHasPixKeyReturn com sucesso', async () => {
		const { sut } = makeSut();
		const userHasPixKey = await sut.check(mockCheckUserHasPixKeyParams());
		expect(userHasPixKey).toEqual(true);
	});
});