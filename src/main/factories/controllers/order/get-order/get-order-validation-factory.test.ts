import { type Validation } from '../../../../../presentation/contracts/validation';
import { RequiredFieldValidation } from '../../../../../validation/validators/required-field-validation';
import { ValidationComposite } from '../../../../../validation/validators/validation-composite';
import { makeGetOrderValidation } from './get-order-validation-factory';

jest.mock('../../../../../validation/validators/validation-composite');

describe('GetOrder Validation Factory', () => {
	test('Deve chamar o ValidationComposite com todas os validadores', () => {
		makeGetOrderValidation();
		const validations: Validation[] = [];
		for (const field of [
			'authorization'
		]) {
			validations.push(new RequiredFieldValidation(field));
		}
		expect(ValidationComposite).toHaveBeenCalledWith(validations);
	});
});
