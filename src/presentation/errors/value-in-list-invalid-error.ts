export class ValueInListInvalidError extends Error {
	constructor (value: string, validValues: string[]) {
		super(`Value invalid: ${value} | Valid values: ${validValues.join(' - ')}`);
		this.name = 'ValueInListInvalidError';
	}
}
