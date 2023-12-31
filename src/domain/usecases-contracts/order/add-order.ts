import { OrderModel } from '../../models/order';

export type OrderProducts = {
    products: {
        id: string,
        quantity: number
    }[]
}

export type AddOrderParams = Omit<OrderModel, 'id' | 'orderItems' | 'txId' | 'qrCode' | 'qrCodeImage' | 'qrCodeExpiration'> & OrderProducts
export type AddOrderReturn = OrderModel

export interface AddOrderContract {
    add: (addOrderParams: AddOrderParams) => Promise<AddOrderReturn | null>
}