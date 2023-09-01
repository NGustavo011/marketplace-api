
import { GetOrderContract } from '../../../../domain/usecases-contracts/order/get-order';
import { ValidateTokenContract } from '../../../../domain/usecases-contracts/user/validate-token';
import { Controller } from '../../../contracts/controller';
import { HttpRequest, HttpResponse } from '../../../contracts/http';
import { Validation } from '../../../contracts/validation';
import { badRequest, ok, unauthorized } from '../../../helpers/http/http-helper';

export class GetOrderController extends Controller {
	constructor(
        private readonly getOrder: GetOrderContract,
        private readonly validateToken: ValidateTokenContract,
        private readonly validation: Validation
	){
		super();
	}

	async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
		const error = await this.validation.validate(httpRequest.headers);
		if (error) {
			return badRequest(error);
		}
		const { authorization } = httpRequest.headers;
		const payload = await this.validateToken.validateToken(authorization);
		if (!payload) {
			return unauthorized();
		}
		const { id, buyerId, paymentMethod, sellerId, status } = httpRequest.query;
		const orders = await this.getOrder.get({
			userId: payload.userId,
			id,
			buyerId,
			paymentMethod,
			sellerId,
			status
		});
		return ok(orders);
	}
}