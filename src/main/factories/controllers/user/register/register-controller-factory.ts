import { Controller } from '../../../../../presentation/contracts/controller';
import { RegisterController } from '../../../../../presentation/controllers/user/register/register-controller';
import { makeLogin } from '../../../usecases/user/login/login-factory';
import { makeRegister } from '../../../usecases/user/register/register-factory';
import { makeRegisterValidation } from './register-validation-factory';


export const makeRegisterController = (): Controller => {
	const controller = new RegisterController(makeRegister(), makeRegisterValidation(), makeLogin());
	return controller;
};
