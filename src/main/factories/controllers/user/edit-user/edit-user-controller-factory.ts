import { Controller } from '../../../../../presentation/contracts/controller';
import { EditUserController } from '../../../../../presentation/controllers/user/edit-user/edit-user-controller';
import { makeEditUser } from '../../../usecases/user/edit-user/edit-user-factory';
import { makeValidateToken } from '../../../usecases/user/validate-token/validate-token-factory';
import { makeEditUserValidation } from './edit-user-validation-factory';

export const makeEditUserController = (): Controller => {
	const controller = new EditUserController(makeEditUser(), makeValidateToken(), makeEditUserValidation());
	return controller;
};
