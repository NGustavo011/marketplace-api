import { GetProductContract } from '../../../../domain/usecases-contracts/product/get-product';
import { Controller } from '../../../contracts/controller';
import { HttpRequest, HttpResponse } from '../../../contracts/http';
import { ok } from '../../../helpers/http/http-helper';

export class GetProductController extends Controller {
	constructor(
        private readonly getProduct: GetProductContract
	){
		super();
	}

	async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
		const { id, sellerId, categoryId } = httpRequest.query;
		const products = await this.getProduct.get({ 
			id,
			sellerId,
			categoryId
		});
		return ok(products);
	}
}