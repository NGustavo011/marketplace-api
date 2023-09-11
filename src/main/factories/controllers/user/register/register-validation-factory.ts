import { CpfValidatorAdapter } from '../../../../../infra/validators/cpf-validator/cpf-validator-adapter';
import { EmailValidatorAdapter } from '../../../../../infra/validators/email-validator/email-validator-adapter';
import { Validation } from '../../../../../presentation/contracts/validation';
import { CompareFieldsValidation } from '../../../../../validation/validators/compare-fields-validation';
import { CpfValidation } from '../../../../../validation/validators/cpf-validation';
import { EmailValidation } from '../../../../../validation/validators/email-validation';
import { RequiredFieldValidation } from '../../../../../validation/validators/required-field-validation';
import { ValidationComposite } from '../../../../../validation/validators/validation-composite';


export const makeRegisterValidation = (): Validation => {
	const validations: Validation[] = [];
	for (const field of ['name', 'email', 'password', 'passwordConfirmation', 'cpf']) {
		validations.push(new RequiredFieldValidation(field));
	}
	validations.push(new CompareFieldsValidation('password', 'passwordConfirmation'));
	validations.push(new EmailValidation('email', new EmailValidatorAdapter()));
	validations.push(new CpfValidation('cpf', new CpfValidatorAdapter()));
	return new ValidationComposite(validations);
};
