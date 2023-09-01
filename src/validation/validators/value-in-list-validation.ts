import { type Validation } from '../../presentation/contracts/validation';
import { ValueInListInvalidError } from '../../presentation/errors/value-in-list-invalid-error';

export class ValueInListValidation implements Validation {
	constructor (private readonly fieldName: string, private readonly validValues: string[]) {
	}

	validate (input: any): Error | null {
		if (!this.validValues.includes(input[this.fieldName])) {
			return new ValueInListInvalidError(input[this.fieldName], this.validValues);
		}
		return null;
	}
}
