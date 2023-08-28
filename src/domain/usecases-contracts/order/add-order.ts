import { OrderModel } from '../../models/order';
import { UserUsed } from '../../models/user';

type Products = {
    products: {
        id: string
    }[]
}

export type AddOrderParams = Omit<OrderModel, 'id' | 'orderItems'> & Products & UserUsed
export type AddOrderReturn = OrderModel

export interface AddOrderContract {
    add: (addOrderParams: AddOrderParams) => Promise<AddOrderReturn | null>
}