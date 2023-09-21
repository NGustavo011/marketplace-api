export class UserDoesNotHavePixKeyError extends Error {
	constructor () {
		super('User does not have a pix key. Please edit your user to add the pix key.');
		this.name = 'UserDoesNotHavePixKeyError';
	}
}
