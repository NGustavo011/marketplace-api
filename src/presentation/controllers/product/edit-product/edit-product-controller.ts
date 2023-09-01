import { EditProductContract } from '../../../../domain/usecases-contracts/product/edit-product';
import { ValidateProductPriceContract } from '../../../../domain/usecases-contracts/product/validate-product-price';
import { ValidateTokenContract } from '../../../../domain/usecases-contracts/user/validate-token';
import { Controller } from '../../../contracts/controller';
import { HttpRequest, HttpResponse } from '../../../contracts/http';
import { Validation } from '../../../contracts/validation';
import { InvalidParamError } from '../../../errors/invalid-param-error';
import { InvalidProductPriceError } from '../../../errors/invalid-product-price-error';
import { badRequest, ok, unauthorized } from '../../../helpers/http/http-helper';

export class EditProductController extends Controller {
	constructor(
        private readonly editProduct: EditProductContract,
		private readonly validateProductPrice: ValidateProductPriceContract,
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
			name,
			description,
			listPrice,
			salePrice,
			categoryId,
			urlImage 
		} = httpRequest.body;
		const { id } = httpRequest.query;
		const validProductPrice = this.validateProductPrice.validate({ listPrice, salePrice });
		if(!validProductPrice){
			return badRequest(new InvalidProductPriceError());
		}
		const editedProduct = await this.editProduct.edit({
			id,
			userId: payload.userId,
			product: {
				name,
				description,
				listPrice,
				salePrice,
				categoryId,
				urlImage 
			}
		});
		if(!editedProduct){
			return badRequest(new InvalidParamError('Product not found to user specified'));
		}
		return ok(editedProduct);
	}
}