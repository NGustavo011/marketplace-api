import { LoginContract } from '../../../../domain/usecases-contracts/user/login';
import { Controller } from '../../../contracts/controller';
import { HttpRequest, HttpResponse } from '../../../contracts/http';
import { Validation } from '../../../contracts/validation';
import { badRequest, ok, unauthorized } from '../../../helpers/http/http-helper';

export class LoginController extends Controller{
	constructor(
        private readonly login: LoginContract,
        private readonly validation: Validation
	){
		super();
	}

	async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
		const error = await this.validation.validate(httpRequest.body);
		if(error) { return badRequest(error); }
		const { email, password } = httpRequest.body;
		const userModel = await this.login.auth({ email, password });
		if(!userModel) { return unauthorized(); }
		return ok(userModel);
	}
}