import { orderStatusModelTypes } from '../../../../../domain/models/order';
import { type Validation } from '../../../../../presentation/contracts/validation';
import { RequiredFieldValidation } from '../../../../../validation/validators/required-field-validation';
import { ValidationComposite } from '../../../../../validation/validators/validation-composite';
import { ValueInListValidation } from '../../../../../validation/validators/value-in-list-validation';

export const makeEditOrderStatusValidation = (): Validation => {
	const validations: Validation[] = [];
	for (const field of [
		'id',
		'status',
		'authorization'
	]) {
		validations.push(new RequiredFieldValidation(field));
	}
	validations.push(new ValueInListValidation('status', orderStatusModelTypes));
	return new ValidationComposite(validations);
};
