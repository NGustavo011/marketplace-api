import { mockOrderModel } from '../../data/test/mock-order';
import { AddOrderContract, AddOrderReturn } from '../../domain/usecases-contracts/order/add-order';
import { ValidateOrderSellerContract, ValidateOrderSellerReturn } from '../../domain/usecases-contracts/order/validate-order-seller';

export const mockAddOrder = (): AddOrderContract => {
	class AddOrderStub implements AddOrderContract {
		async add (): Promise<AddOrderReturn | null>{
			return await Promise.resolve(mockOrderModel());
		}
	}
	return new AddOrderStub();
};

export const mockValidateOrderSeller = (): ValidateOrderSellerContract => {
	class ValidateOrderSellerStub implements ValidateOrderSellerContract {
		async validate (): Promise<ValidateOrderSellerReturn | null>{
			return await Promise.resolve(true);
		}
	}
	return new ValidateOrderSellerStub();
};