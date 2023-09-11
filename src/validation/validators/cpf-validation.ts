import { type Validation } from '../../presentation/contracts/validation';
import { InvalidParamError } from '../../presentation/errors/invalid-param-error';
import { type CpfValidator } from '../contracts/cpf-validator';

export class CpfValidation implements Validation {
	constructor (private readonly fieldName: string, private readonly cpfValidator: CpfValidator) {
	}

	validate (input: any): Error | null {
		const isValidCpf = this.cpfValidator.isValid(input[this.fieldName]);
		if (!isValidCpf) { return new InvalidParamError(this.fieldName); }
		return null;
	}
}
