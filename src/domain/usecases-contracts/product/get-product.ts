import { ProductModel } from '../../models/product';

export interface GetProductParams {
  id?: string
  sellerId?: string
  categoryId?: string
}
export type GetProductReturn = ProductModel[]

export interface GetProductContract {
  get: (getProductParams: GetProductParams) => Promise<GetProductReturn | null>
}
