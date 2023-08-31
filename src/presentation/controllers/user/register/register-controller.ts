import { LoginContract } from '../../../../domain/usecases-contracts/user/login';
import { RegisterContract } from '../../../../domain/usecases-contracts/user/register';
import { Controller } from '../../../contracts/controller';
import { HttpRequest, HttpResponse } from '../../../contracts/http';
import { Validation } from '../../../contracts/validation';
import { EmailInUseError } from '../../../errors/email-in-use-error';
import { badRequest, forbidden, ok } from '../../../helpers/http/http-helper';

export class RegisterController extends Controller {
	constructor(
        private readonly register: RegisterContract,
        private readonly validation: Validation,
        private readonly login: LoginContract
	){
		super();
	}

	async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
		const error = await this.validation.validate(httpRequest.body);
		if(error) return badRequest(error);
		const { name, email, password } = httpRequest.body;
		const user = await this.register.add({
			name,
			email,
			password
		});
		if(!user) { return forbidden(new EmailInUseError()); }
		const userModel = await this.login.auth({
			email,
			password
		});
		return ok(userModel);
	}
}