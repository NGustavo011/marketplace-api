
import { type Validation } from '../../../../../presentation/contracts/validation';
import { RequiredFieldValidation } from '../../../../../validation/validators/required-field-validation';
import { ValidationComposite } from '../../../../../validation/validators/validation-composite';
import { makeAddProductValidation } from './add-product-validation-factory';

jest.mock('../../../../../validation/validators/validation-composite');

describe('AddProduct Validation Factory', () => {
	test('Deve chamar o ValidationComposite com todas os validadores', () => {
		makeAddProductValidation();
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
		expect(ValidationComposite).toHaveBeenCalledWith(validations);
	});
});
