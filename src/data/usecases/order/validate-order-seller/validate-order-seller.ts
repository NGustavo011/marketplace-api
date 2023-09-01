import { ValidateOrderSellerContract, ValidateOrderSellerParams, ValidateOrderSellerReturn } from '../../../../domain/usecases-contracts/order/validate-order-seller';
import { ValidateOrderSellerRepository } from '../../../repositories-contracts/order/validate-order-seller-repository';

export class ValidateOrderSeller implements ValidateOrderSellerContract {
	constructor(private readonly validateOrderSellerRepository: ValidateOrderSellerRepository){
	}
    
	async validate(validateOrderSellerParams: ValidateOrderSellerParams): Promise<ValidateOrderSellerReturn | null>{
		const isOrderSellerValid = await this.validateOrderSellerRepository.validateSeller(validateOrderSellerParams);
		return isOrderSellerValid;
	}
}