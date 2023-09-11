import { AddOrderParams, AddOrderReturn } from '../../../domain/usecases-contracts/order/add-order';

export type Payment = {
  txId: string,
  qrCode: string,
  qrCodeImage: string,
  qrCodeExpiration: Date
}

export type AddOrderRepositoryParams = AddOrderParams & Payment

export interface AddOrderRepository {
  add: (addOrderRepositoryParams: AddOrderRepositoryParams) => Promise<AddOrderReturn | null>
}
