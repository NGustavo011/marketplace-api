import { OrderModel, OrderStatusModel } from '../../models/order';
import { UserUsed } from '../../models/user';


export type EditOrderStatusParams = {
    id: string
    type: OrderStatusModel
} & UserUsed
export type EditOrderStatusReturn = OrderModel

export interface EditOrderStatusContract {
  edit: (editOrderStatusParams: EditOrderStatusParams) => Promise<EditOrderStatusReturn | null>
}
