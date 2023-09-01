import { ValueInListInvalidError } from '../../presentation/errors/value-in-list-invalid-error';
import { ValueInListValidation } from './value-in-list-validation';

const makeSut = (): ValueInListValidation => {
	return new ValueInListValidation('field', ['valid_value_1', 'valid_value_2', 'valid_value_3']);
};

describe('RequiredField Validation', () => {
	test('Deve retornar um MissingParamError se a validação falhar', () => {
		const sut = makeSut();
		const error = sut.validate({ field: 'invalid_value' });
		expect(error).toEqual(new ValueInListInvalidError('invalid_value', ['valid_value_1', 'valid_value_2', 'valid_value_3']));
	});

	test('Não deve retornar nada se a validação não falhar', () => {
		const sut = makeSut();
		const error = sut.validate({ field: 'valid_value_1' });
		expect(error).toBeFalsy();
	});
});
