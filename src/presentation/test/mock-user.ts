import { mockUserModel } from '../../data/test/mock-user';
import { CheckUserHasPixKeyContract } from '../../domain/usecases-contracts/user/check-user-has-pix-key';
import { EditUserContract, EditUserReturn } from '../../domain/usecases-contracts/user/edit-user';
import { LoginContract, LoginReturn } from '../../domain/usecases-contracts/user/login';
import { RegisterContract, RegisterReturn } from '../../domain/usecases-contracts/user/register';
import { DecrypterPayload, ValidateTokenContract } from '../../domain/usecases-contracts/user/validate-token';


export const mockRegister = (): RegisterContract => {
	class RegisterStub implements RegisterContract {
		async add (): Promise<RegisterReturn | null> {
			return await Promise.resolve(mockUserModel());
		}
	}
	return new RegisterStub();
};

export const mockLogin = (): LoginContract => {
	class LoginStub implements LoginContract {
		async auth (): Promise<LoginReturn> {
			return await Promise.resolve({ accessToken: 'any_token', name: 'any_name' });
		}
	}
	return new LoginStub();
};

export const mockValidateToken = (): ValidateTokenContract => {
	class ValidateTokenStub implements ValidateTokenContract {
		async validateToken (): Promise<DecrypterPayload | null> {
			return await Promise.resolve({ userId: 'any_user_id' });
		}
	}
	return new ValidateTokenStub();
};

export const mockCheckUserHasPixKey = (): CheckUserHasPixKeyContract => {
	class CheckUserHasPixKeyStub implements CheckUserHasPixKeyContract {
		async check (): Promise<boolean | null>{
			return await Promise.resolve(true);
		}
	}
	return new CheckUserHasPixKeyStub();
}; 

export const mockEditUser = (): EditUserContract =>{
	class EditUserStub implements EditUserContract {
		async edit (): Promise<EditUserReturn | null>{
			return await Promise.resolve(mockUserModel());
		}
	}
	return new EditUserStub();
};