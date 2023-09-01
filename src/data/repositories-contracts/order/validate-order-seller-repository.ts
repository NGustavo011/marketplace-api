import { ValidateOrderSellerParams, ValidateOrderSellerReturn } from '../../../domain/usecases-contracts/order/validate-order-seller';

export interface ValidateOrderSellerRepository {
  validateSeller: (validateOrderSellerParams: ValidateOrderSellerParams) => Promise<ValidateOrderSellerReturn | null>
}
