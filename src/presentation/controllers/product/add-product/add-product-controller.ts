import { AddProductContract } from '../../../../domain/usecases-contracts/product/add-product';
import { ValidateProductPriceContract } from '../../../../domain/usecases-contracts/product/validate-product-price';
import { CheckUserHasPixKeyContract } from '../../../../domain/usecases-contracts/user/check-user-has-pix-key';
import { ValidateTokenContract } from '../../../../domain/usecases-contracts/user/validate-token';
import { Controller } from '../../../contracts/controller';
import { HttpRequest, HttpResponse } from '../../../contracts/http';
import { Validation } from '../../../contracts/validation';
import { InvalidProductPriceError } from '../../../errors/invalid-product-price-error';
import { UserDoesNotHavePixKeyError } from '../../../errors/user-does-not-have-pix-key-error';
import { badRequest, ok, unauthorized } from '../../../helpers/http/http-helper';

export class AddProductController extends Controller {
	constructor(
        private readonly addProduct: AddProductContract,
		private readonly checkUserHasPixKey: CheckUserHasPixKeyContract,
        private readonly validateProductPrice: ValidateProductPriceContract,
        private readonly validateToken: ValidateTokenContract,
        private readonly validation: Validation,
	){
		super();
	}

	async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
		const error = await this.validation.validate(Object.assign({}, httpRequest.body, httpRequest.headers));
		if(error){
			return badRequest(error);
		}
		const { authorization } = httpRequest.headers;
		const payload = await this.validateToken.validateToken(authorization);
		if(!payload) { 
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
		const userHasPixKey = await this.checkUserHasPixKey.check(payload.userId);
		if(!userHasPixKey) {
			return badRequest(new UserDoesNotHavePixKeyError());
		}
		const validProductPrice = this.validateProductPrice.validate({ listPrice, salePrice });
		if(!validProductPrice){
			return badRequest(new InvalidProductPriceError());
		}
		const product = await this.addProduct.add({
			name,
			description,
			listPrice,
			salePrice,
			categoryId,
			urlImage,
			userId: payload.userId
		});
		return ok(product);
	}
}