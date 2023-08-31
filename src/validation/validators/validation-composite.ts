import { isPromise } from 'util/types';
import { type Validation } from '../../presentation/contracts/validation';

export class ValidationComposite implements Validation {
	constructor (private readonly validations: Validation[]) {
	}

	async validate (input: any): Promise<Error | null> {
		for (const validation of this.validations) {
			const error = validation.validate(input);
			if (isPromise(error)) {
				const promisedError = await Promise.resolve(error);
				if(promisedError){
					return await Promise.resolve(promisedError);
				}
			}
			else if (error) {
				return error;
			}
		}
		return null;
	}
}
