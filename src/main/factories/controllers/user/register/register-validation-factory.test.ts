
import { type Validation } from '../../../../../presentation/contracts/validation';
import { type EmailValidator } from '../../../../../validation/contracts/email-validator';
import { CompareFieldsValidation } from '../../../../../validation/validators/compare-fields-validation';
import { EmailValidation } from '../../../../../validation/validators/email-validation';
import { RequiredFieldValidation } from '../../../../../validation/validators/required-field-validation';
import { ValidationComposite } from '../../../../../validation/validators/validation-composite';
import { makeRegisterValidation } from './register-validation-factory';

jest.mock('../../../../../validation/validators/validation-composite');

const makeEmailValidator = (): EmailValidator => {
	class EmailValidatorStub implements EmailValidator {
		isValid (): boolean {
			return true;
		}
	}
	return new EmailValidatorStub();
};

describe('Register Validation Factory', () => {
	test('Deve chamar o ValidationComposite com todas os validadores', () => {
		makeRegisterValidation();
		const validations: Validation[] = [];
		for (const field of ['name', 'email', 'password', 'passwordConfirmation']) {
			validations.push(new RequiredFieldValidation(field));
		}
		validations.push(new CompareFieldsValidation('password', 'passwordConfirmation'));
		validations.push(new EmailValidation('email', makeEmailValidator()));
		expect(ValidationComposite).toHaveBeenCalledWith(validations);
	});
});
