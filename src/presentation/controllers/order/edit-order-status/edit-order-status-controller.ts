
import { EditOrderStatusContract } from '../../../../domain/usecases-contracts/order/edit-order-status';
import { ValidateTokenContract } from '../../../../domain/usecases-contracts/user/validate-token';
import { Controller } from '../../../contracts/controller';
import { HttpRequest, HttpResponse } from '../../../contracts/http';
import { Validation } from '../../../contracts/validation';
import { InvalidParamError } from '../../../errors/invalid-param-error';
import { badRequest, ok, unauthorized } from '../../../helpers/http/http-helper';

export class EditOrderStatusController extends Controller {
	constructor(
        private readonly editOrderStatus: EditOrderStatusContract,
        private readonly validateToken: ValidateTokenContract,
        private readonly validation: Validation
	){
		super();
	}

	async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
		const error = await this.validation.validate(Object.assign({}, httpRequest.headers, httpRequest.body, httpRequest.query));
		if (error) {
			return badRequest(error);
		}
		const { authorization } = httpRequest.headers;
		const payload = await this.validateToken.validateToken(authorization);
		if (!payload) {
			return unauthorized();
		}
		const { 
			status
		} = httpRequest.body;
		const { id } = httpRequest.query;
		const editedOrder = await this.editOrderStatus.edit({
			id,
			userId: payload.userId,
			type: status
		});
		if(!editedOrder){
			return badRequest(new InvalidParamError('Order not found to user specified'));
		}
		return ok(editedOrder);
	}
}