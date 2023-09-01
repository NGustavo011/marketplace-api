
import { type Validation } from '../../../../../presentation/contracts/validation';
import { RequiredFieldValidation } from '../../../../../validation/validators/required-field-validation';
import { ValidationComposite } from '../../../../../validation/validators/validation-composite';
import { makeDeleteProductValidation } from './delete-product-validation-factory';

jest.mock('../../../../../validation/validators/validation-composite');

describe('DeleteProduct Validation Factory', () => {
	test('Deve chamar o ValidationComposite com todas os validadores', () => {
		makeDeleteProductValidation();
		const validations: Validation[] = [];
		for (const field of [
			'id',
			'authorization',
		]) {
			validations.push(new RequiredFieldValidation(field));
		}
		expect(ValidationComposite).toHaveBeenCalledWith(validations);
	});
});
