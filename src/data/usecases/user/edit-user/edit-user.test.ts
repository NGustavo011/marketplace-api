import { throwError } from '../../../../domain/test/test-helpers';
import { EditUserRepository } from '../../../repositories-contracts/user/edit-user-repository';
import { mockEditUserParams, mockEditUserRepository, mockUserModel } from '../../../test/mock-user';
import { EditUser } from './edit-user';

interface SutTypes {
    editUserStub: EditUserRepository
    sut: EditUser
  }
  
const makeSut = (): SutTypes => {
	const editUserStub = mockEditUserRepository();
	const sut = new EditUser(editUserStub);
	return {
		editUserStub,
		sut
	};
};

describe('EditUser usecase', ()=>{
	describe('EditUserRepository dependency', ()=>{
		test('Deve chamar EditUserRepository com os valores corretos', async ()=>{
			const { sut, editUserStub } = makeSut();
			const editUserSpy = jest.spyOn(editUserStub, 'edit');
			await sut.edit(mockEditUserParams());
			expect(editUserSpy).toHaveBeenCalledWith(mockEditUserParams());
		});

		test('Deve repassar a exceção se o EditUserRepository lançar um erro', async () => {
			const { sut, editUserStub } = makeSut();
			jest.spyOn(editUserStub, 'edit').mockImplementationOnce(throwError);
			const promise = sut.edit(mockEditUserParams());
			await expect(promise).rejects.toThrow();
		});

		test('Deve retornar null se EditUserRepository retornar null', async () => {
			const { sut, editUserStub } = makeSut();
			jest.spyOn(editUserStub, 'edit').mockReturnValueOnce(Promise.resolve(null));
			const userEdited = await sut.edit(mockEditUserParams());
			expect(userEdited).toBeNull();
		});
	});

	test('Deve retornar um EditUserReturn com sucesso', async () => {
		const { sut } = makeSut();
		const userEdited = await sut.edit(mockEditUserParams());
		expect(userEdited).toEqual(mockUserModel());
	});
});