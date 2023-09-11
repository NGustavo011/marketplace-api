import { AddOrderContract } from '../../../../domain/usecases-contracts/order/add-order';
import { ValidateOrderSellerContract } from '../../../../domain/usecases-contracts/order/validate-order-seller';
import { ValidateTokenContract } from '../../../../domain/usecases-contracts/user/validate-token';
import { Controller } from '../../../contracts/controller';
import { HttpRequest, HttpResponse } from '../../../contracts/http';
import { Validation } from '../../../contracts/validation';
import { InvalidOrderSellerError } from '../../../errors/invalid-order-seller-error';
import { badRequest, ok, unauthorized } from '../../../helpers/http/http-helper';

export class AddOrderController extends Controller {
	constructor(
        private readonly addOrder: AddOrderContract,
		private readonly validateOrderSeller: ValidateOrderSellerContract,
        private readonly validateToken: ValidateTokenContract,
        private readonly validation: Validation
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
			products,
			sellerId
		} = httpRequest.body;
		const isOrderSellerValid = await this.validateOrderSeller.validate({
			products,
			sellerId
		});
		if(!isOrderSellerValid){
			return badRequest(new InvalidOrderSellerError());
		}
		const order = await this.addOrder.add({
			products,
			status: 'pending',
			paymentMethod: 'pix',
			buyerId: payload.userId,
			sellerId,
			txId: 'tx_id',
			qrCode: 'qr_code',
			qrCodeImage: 'qr_code_image'
		});
		return ok(order);
	}
}