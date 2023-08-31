import { type EmailValidator } from '../contracts/email-validator';

export const mockEmailValidator = (): EmailValidator => {
	class EmailValidatorStub implements EmailValidator {
		isValid (): boolean {
			return true;
		}
	}
	return new EmailValidatorStub();
};
