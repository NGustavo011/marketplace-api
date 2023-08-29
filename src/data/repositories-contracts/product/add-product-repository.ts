import { AddProductParams, AddProductReturn } from '../../../domain/usecases-contracts/product/add-product';

export interface AddProductRepository {
  add: (addProductParams: AddProductParams) => Promise<AddProductReturn | null>
}
