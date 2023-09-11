import * as validator  from 'cpf-cnpj-validator';
import { CpfValidatorAdapter } from './cpf-validator-adapter';

jest.mock('validator', () => ({
	cpf: {
		isValid(): boolean {
			return true;
		}
	}
}));

const makeSut = (): CpfValidatorAdapter => {
	return new CpfValidatorAdapter();
};

describe('CpfValidator Adapter', () => {
	test('Deve retornar false se o validador retornar false', () => {
		const sut = makeSut();
		jest.spyOn(validator.cpf, 'isValid').mockReturnValueOnce(false);
		const isValid = sut.isValid('986.208.638-61');
		expect(isValid).toBeFalsy();
	});
	test('Deve retornar true se o validador retornar true', () => {
		const sut = makeSut();
		const isValid = sut.isValid('986.208.638-60');
		expect(isValid).toBeTruthy();
	});
	test('O validador deve ser chamado com o cpf correto', () => {
		const sut = makeSut();
		const isValidSpy = jest.spyOn(validator.cpf, 'isValid');
		sut.isValid('986.208.638-60');
		expect(isValidSpy).toHaveBeenCalledWith('986.208.638-60');
	});
});
