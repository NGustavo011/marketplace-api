import { type Validation } from '../../../../../presentation/contracts/validation';
import { RequiredFieldValidation } from '../../../../../validation/validators/required-field-validation';
import { ValidationComposite } from '../../../../../validation/validators/validation-composite';

export const makeAddOrderValidation = (): Validation => {
	const validations: Validation[] = [];
	for (const field of [
		'sellerId',
		'products',
		'authorization'
	]) {
		validations.push(new RequiredFieldValidation(field));
	}
	return new ValidationComposite(validations);
};
