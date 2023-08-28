import { OrderItemModel } from './order-item';

export type OrderStatusModel = 'Pending' | 'Canceled' | 'Finished'

export interface OrderModel {
    id: string
    buyerId: string
    sellerId: string
    orderItems: OrderItemModel[]
    paymentMethod: string
    status: OrderStatusModel
}