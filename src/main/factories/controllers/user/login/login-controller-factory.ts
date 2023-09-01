import { type Controller } from '../../../../../presentation/contracts/controller';
import { LoginController } from '../../../../../presentation/controllers/user/login/login-controller';
import { makeLogin } from '../../../usecases/user/login/login-factory';
import { makeLoginValidation } from './login-validation-factory';

export const makeLoginController = (): Controller => {
	const controller = new LoginController(makeLogin(), makeLoginValidation());
	return controller;
};
