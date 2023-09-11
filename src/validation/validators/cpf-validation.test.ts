import { InvalidParamError } from '../../presentation/errors/invalid-param-error';
import { CpfValidator } from '../contracts/cpf-validator';
import { mockCpfValidator } from '../test/mock-cpf-validator';
import { CpfValidation } from './cpf-validation';


interface SutTypes {
  sut: CpfValidation
  cpfValidatorStub: CpfValidator
}

const makeSut = (): SutTypes => {
	const cpfValidatorStub = mockCpfValidator();
	const sut = new CpfValidation('cpf', cpfValidatorStub);
	return {
		sut, cpfValidatorStub
	};
};

describe('Cpf Validation', () => {
	test('Deve retornar um erro se o CpfValidator retornar false', () => {
		const { sut, cpfValidatorStub } = makeSut();
		jest.spyOn(cpfValidatorStub, 'isValid').mockReturnValueOnce(false);
		const error = sut.validate({ cpf: 'any_cpf' });
		expect(error).toEqual(new InvalidParamError('cpf'));
	});
	test('Deve chamar o CpfValidator utilizando o cpf correto', () => {
		const { sut, cpfValidatorStub } = makeSut();
		const isValidSpy = jest.spyOn(cpfValidatorStub, 'isValid');
		sut.validate({ cpf: 'any_cpf' });
		expect(isValidSpy).toHaveBeenCalledWith('any_cpf');
	});
	test('Propague o erro se o CpfValidator lançar um erro', () => {
		const { sut, cpfValidatorStub } = makeSut();
		jest.spyOn(cpfValidatorStub, 'isValid').mockImplementationOnce(() => {
			throw new Error();
		});
		expect(sut.validate).toThrow();
	});
});
