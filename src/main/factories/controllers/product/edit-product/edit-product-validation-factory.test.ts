
import { type Validation } from '../../../../../presentation/contracts/validation';
import { RequiredFieldValidation } from '../../../../../validation/validators/required-field-validation';
import { ValidationComposite } from '../../../../../validation/validators/validation-composite';
import { makeEditProductValidation } from './edit-product-validation-factory';

jest.mock('../../../../../validation/validators/validation-composite');

describe('EditProduct Validation Factory', () => {
	test('Deve chamar o ValidationComposite com todas os validadores', () => {
		makeEditProductValidation();
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
		expect(ValidationComposite).toHaveBeenCalledWith(validations);
	});
});
