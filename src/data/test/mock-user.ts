import { UserModel } from '../../domain/models/user';
import { CheckUserHasPixKeyParams, CheckUserHasPixKeyReturn } from '../../domain/usecases-contracts/user/check-user-has-pix-key';
import { LoginParams } from '../../domain/usecases-contracts/user/login';
import { RegisterParams } from '../../domain/usecases-contracts/user/register';
import { CheckUserHasPixKeyRepository } from '../repositories-contracts/user/check-user-has-pix-key-repository';
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

export const mockCheckUserHasPixKeyParams = (): CheckUserHasPixKeyParams => ('any_id');

export const mockUserModel = (): UserModel => ({
	id: 'any_id',
	name: 'any_name',
	email: 'any_email',
	password: 'any_password',
	role: 'user',
	cpf: '986.208.638-60',
	pixKey: 'any_pix_key'
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

export const mockCheckUserHasPixKeyRepository = (): CheckUserHasPixKeyRepository => {
	class CheckUserHasPixKeyRepositoryStub implements CheckUserHasPixKeyRepository {
		async checkUserHasPixKey (): Promise<CheckUserHasPixKeyReturn | null>{
			return await Promise.resolve(true);
		}
	}
	return new CheckUserHasPixKeyRepositoryStub();
};