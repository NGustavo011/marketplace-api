import { OrderItemModel } from './order-item';

const OrderStatusModelTypes = <const>['pending', 'canceled', 'finished']; 
export type OrderStatusModel = typeof OrderStatusModelTypes[number]
export const orderStatusModelTypes = OrderStatusModelTypes as unknown as string[];

export interface OrderModel {
    id: string
    buyerId: string
    sellerId: string
    orderItems: OrderItemModel[]
    paymentMethod: string
    status: OrderStatusModel,
    txId: string
    qrCode: string
    qrCodeImage: string
    qrCodeExpiration: Date
}