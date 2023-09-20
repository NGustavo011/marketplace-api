import { OrderProducts } from '../../../domain/usecases-contracts/order/add-order';

export interface CalculateTotalValueRepository {
  calculate: (orderProducts: OrderProducts) => Promise<number>
}
