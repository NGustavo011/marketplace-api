import { CpfValidator } from '../contracts/cpf-validator';

export const mockCpfValidator = (): CpfValidator => {
	class CpfValidatorStub implements CpfValidator {
		isValid (): boolean {
			return true;
		}
	}
	return new CpfValidatorStub();
};
