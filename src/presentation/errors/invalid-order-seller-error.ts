export class InvalidOrderSellerError extends Error {
	constructor () {
		super('One of the products entered in the list is not part of the specified seller\'s products.');
		this.name = 'InvalidOrderSellerError';
	}
}
