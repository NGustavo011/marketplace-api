import { type Validation } from '../../../../../presentation/contracts/validation';
import { RequiredFieldValidation } from '../../../../../validation/validators/required-field-validation';
import { ValidationComposite } from '../../../../../validation/validators/validation-composite';
import { makeEditUserValidation } from './edit-user-validation-factory';

jest.mock('../../../../../validation/validators/validation-composite');

describe('EditUser Validation Factory', () => {
	test('Deve chamar o ValidationComposite com todas os validadores', () => {
		makeEditUserValidation();
		const validations: Validation[] = [];
		for (const field of [
			'authorization',
			'pixKey'
		]) {
			validations.push(new RequiredFieldValidation(field));
		}
		expect(ValidationComposite).toHaveBeenCalledWith(validations);
	});
});
