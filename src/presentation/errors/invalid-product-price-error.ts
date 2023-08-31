export class InvalidProductPriceError extends Error {
	constructor () {
		super('The product price is invalid, check if one of the values ​​is negative or if the list price is greater than the sale price');
		this.name = 'InvalidProductPriceError';
	}
}
