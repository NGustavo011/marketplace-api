import { type Validation } from '../../../../../presentation/contracts/validation';
import { RequiredFieldValidation } from '../../../../../validation/validators/required-field-validation';
import { ValidationComposite } from '../../../../../validation/validators/validation-composite';

export const makeEditProductValidation = (): Validation => {
	const validations: Validation[] = [];
	for (const field of [
		'id',
		'authorization',
		'name',
		'description',
		'listPrice',
		'salePrice',
		'categoryId',
		'urlImage'
	]) {
		validations.push(new RequiredFieldValidation(field));
	}
	return new ValidationComposite(validations);
};
