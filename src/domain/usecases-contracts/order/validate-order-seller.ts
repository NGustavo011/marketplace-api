import { OrderProducts } from './add-order';

export type ValidateOrderSellerParams = {
    sellerId: string
} & OrderProducts
export type ValidateOrderSellerReturn = boolean

export interface ValidateOrderSellerContract {
  validate: (validateOrderSellerParams: ValidateOrderSellerParams) => Promise<ValidateOrderSellerReturn | null>
}
