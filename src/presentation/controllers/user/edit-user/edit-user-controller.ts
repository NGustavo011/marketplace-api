import { EditUserContract } from '../../../../domain/usecases-contracts/user/edit-user';
import { ValidateTokenContract } from '../../../../domain/usecases-contracts/user/validate-token';
import { Controller } from '../../../contracts/controller';
import { HttpRequest, HttpResponse } from '../../../contracts/http';
import { Validation } from '../../../contracts/validation';
import { InvalidParamError } from '../../../errors/invalid-param-error';
import { badRequest, ok, unauthorized } from '../../../helpers/http/http-helper';

export class EditUserController extends Controller {
	constructor(
        private readonly editUser: EditUserContract,
        private readonly validateToken: ValidateTokenContract,
        private readonly validation: Validation
	){
		super();
	}

	async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
		const error = await this.validation.validate(Object.assign({}, httpRequest.headers, httpRequest.body));
		if (error) {
			return badRequest(error);
		}
		const { authorization } = httpRequest.headers;
		const payload = await this.validateToken.validateToken(authorization);
		if (!payload) {
			return unauthorized();
		}
		const { 
			pixKey
		} = httpRequest.body;
		const editedUser = await this.editUser.edit({
			id: payload.userId,
			pixKey
		});
		if(!editedUser){
			return badRequest(new InvalidParamError('User not found'));
		}
		return ok(editedUser);
	}
}