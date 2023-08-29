import { DeleteProductParams } from '../../../domain/usecases-contracts/product/delete-product';

export interface DeleteProductRepository {
  delete: (deleteProductParams: DeleteProductParams) => Promise<boolean | null>
}
