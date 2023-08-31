import { type Validation } from '../../presentation/contracts/validation';
import { InvalidParamError } from '../../presentation/errors/invalid-param-error';


export class CompareFieldsValidation implements Validation {
	constructor (private readonly fieldName: string, private readonly fieldToCompareName: string) {
	}

	validate (input: any): Error | null {
		if (input[this.fieldName] !== input[this.fieldToCompareName]) {
			return new InvalidParamError(this.fieldToCompareName);
		}
		return null;
	}
}