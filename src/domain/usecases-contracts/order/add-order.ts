import { OrderModel } from '../../models/order';
import { UserUsed } from '../../models/user';

type Products = {
    products: {
        id: string,
        quantity: number
    }[]
}

export type AddOrderParams = Omit<OrderModel, 'id' | 'orderItems'> & Products & UserUsed
export type AddOrderReturn = OrderModel

export interface AddOrderContract {
    add: (addOrderParams: AddOrderParams) => Promise<AddOrderReturn | null>
}