import { GetProductParams, GetProductReturn } from '../../../domain/usecases-contracts/product/get-product';

export interface GetProductRepository {
  get: (getProductParams: GetProductParams) => Promise<GetProductReturn | null>
}
