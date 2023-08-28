import { OrderModel } from '../../models/order';
import { UserUsed } from '../../models/user';

export type GetOrderParams = {
  id?: string
  buyerId?: string
  sellerId?: string
  paymentMethod?: string
  status?: string
} & UserUsed
export type GetOrderReturn = OrderModel[]

export interface GetOrderContract {
  get: (getOrderParams: GetOrderParams) => Promise<GetOrderReturn | null>
}
