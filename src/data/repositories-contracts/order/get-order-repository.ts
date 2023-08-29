import { GetOrderParams, GetOrderReturn } from '../../../domain/usecases-contracts/order/get-order';

export interface GetOrderRepository {
  get: (getOrderParams: GetOrderParams) => Promise<GetOrderReturn | null>
}
