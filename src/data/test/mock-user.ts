import { UserModel } from '../../domain/models/user';
import { LoginParams } from '../../domain/usecases-contracts/user/login';
import { RegisterParams } from '../../domain/usecases-contracts/user/register';
import { LoadAccountByEmailRepository } from '../repositories-contracts/user/load-account-by-email-repository';
import { RegisterRepository } from '../repositories-contracts/user/register-repository';

export const mockAuthentication = (): LoginParams => ({
	email: 'any_mail@mail.com',
	password: 'any_password'
});

export const mockRegisterParams = (): RegisterParams => ({
	name: 'any_name',
	email: 'any_email',
	password: 'any_password',
	cpf: '986.208.638-60'
});

export const mockUserModel = (): UserModel => ({
	id: 'any_id',
	name: 'any_name',
	email: 'any_email',
	password: 'any_password',
	role: 'user',
	cpf: '986.208.638-60'
});

export const mockRegisterRepository = (): RegisterRepository => {
	class RegisterRepositoryStub implements RegisterRepository {
		async add (): Promise<UserModel> {
			return await Promise.resolve(mockUserModel());
		}
	}
	return new RegisterRepositoryStub();
};

export const mockLoadAccountByEmailRepository = (): LoadAccountByEmailRepository => {
	class LoadAccountByEmailRepositoryStub implements LoadAccountByEmailRepository {
		async loadByEmail (): Promise<UserModel> {
			return await Promise.resolve(mockUserModel());
		}
	}
	return new LoadAccountByEmailRepositoryStub();
};
