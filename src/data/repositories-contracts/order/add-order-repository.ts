import { AddOrderParams, AddOrderReturn } from '../../../domain/usecases-contracts/order/add-order';

export interface AddOrderRepository {
  add: (addOrderParams: AddOrderParams) => Promise<AddOrderReturn | null>
}
