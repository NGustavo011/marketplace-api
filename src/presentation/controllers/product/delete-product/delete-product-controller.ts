import { DeleteProductContract } from '../../../../domain/usecases-contracts/product/delete-product';
import { ValidateTokenContract } from '../../../../domain/usecases-contracts/user/validate-token';
import { Controller } from '../../../contracts/controller';
import { HttpRequest, HttpResponse } from '../../../contracts/http';
import { Validation } from '../../../contracts/validation';
import { InvalidParamError } from '../../../errors/invalid-param-error';
import { badRequest, noContent, unauthorized } from '../../../helpers/http/http-helper';

export class DeleteProductController extends Controller {
	constructor(
        private readonly deleteProduct: DeleteProductContract,
        private readonly validateToken: ValidateTokenContract,
        private readonly validation: Validation
	){
		super();
	}

	async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
		const error = await this.validation.validate(Object.assign({}, httpRequest.headers, httpRequest.query));
		if (error) {
			return badRequest(error);
		}
		const { authorization } = httpRequest.headers;
		const payload = await this.validateToken.validateToken(authorization);
		if (!payload) {
			return unauthorized();
		}
		const { id } = httpRequest.query;
		const deleted = await this.deleteProduct.delete({
			userId: payload.userId,
			id
		});
		if (!deleted) {
			return badRequest(new InvalidParamError('Product not found to user specified'));
		}
		return noContent();
	}
}