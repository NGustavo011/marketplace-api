import { type Validation } from '../../../../../presentation/contracts/validation';
import { RequiredFieldValidation } from '../../../../../validation/validators/required-field-validation';
import { ValidationComposite } from '../../../../../validation/validators/validation-composite';
import { makeAddOrderValidation } from './add-order-validation-factory';

jest.mock('../../../../../validation/validators/validation-composite');

describe('AddOrder Validation Factory', () => {
	test('Deve chamar o ValidationComposite com todas os validadores', () => {
		makeAddOrderValidation();
		const validations: Validation[] = [];
		for (const field of [
			'paymentMethod',
			'sellerId',
			'products',
			'authorization'
		]) {
			validations.push(new RequiredFieldValidation(field));
		}
		expect(ValidationComposite).toHaveBeenCalledWith(validations);
	});
});
