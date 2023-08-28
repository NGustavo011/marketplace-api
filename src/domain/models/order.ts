import { OrderItemModel } from './order-item';

export interface OrderModel {
    id: string
    buyerId: string
    sellerId: string
    orderItems: OrderItemModel[]
    paymentMethod: string
    status: string
}