import { orderStatusModelTypes, } from '../../../../../domain/models/order';
import { type Validation } from '../../../../../presentation/contracts/validation';
import { RequiredFieldValidation } from '../../../../../validation/validators/required-field-validation';
import { ValidationComposite } from '../../../../../validation/validators/validation-composite';
import { ValueInListValidation } from '../../../../../validation/validators/value-in-list-validation';
import { makeEditOrderStatusValidation } from './edit-order-status-validation-factory';

jest.mock('../../../../../validation/validators/validation-composite');

describe('EditOrderStatus Validation Factory', () => {
	test('Deve chamar o ValidationComposite com todas os validadores', () => {
		makeEditOrderStatusValidation();
		const validations: Validation[] = [];
		for (const field of [
			'id',
			'status',
			'authorization'
		]) {
			validations.push(new RequiredFieldValidation(field));
		}
		validations.push(new ValueInListValidation('status', orderStatusModelTypes));
		expect(ValidationComposite).toHaveBeenCalledWith(validations);
	});
});
