import { AddOrderParams, AddOrderReturn } from '../../../domain/usecases-contracts/order/add-order';

export type Payment = {
  txId: string,
  qrCode: string,
  qrCodeImage: string 
}

export type AddOrderParamsRepository = AddOrderParams & Payment

export interface AddOrderRepository {
  add: (addOrderParamsRepository: AddOrderParamsRepository) => Promise<AddOrderReturn | null>
}
