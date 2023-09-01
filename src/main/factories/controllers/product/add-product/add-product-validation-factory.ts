import { type Validation } from '../../../../../presentation/contracts/validation';
import { RequiredFieldValidation } from '../../../../../validation/validators/required-field-validation';
import { ValidationComposite } from '../../../../../validation/validators/validation-composite';

export const makeAddProductValidation = (): Validation => {
	const validations: Validation[] = [];
	for (const field of [
		'name',
		'description',
		'listPrice',
		'salePrice',
		'categoryId',
		'urlImage',
		'authorization'
	]) {
		validations.push(new RequiredFieldValidation(field));
	}
	return new ValidationComposite(validations);
};
