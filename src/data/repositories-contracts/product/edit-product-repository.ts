import { EditProductParams, EditProductReturn } from '../../../domain/usecases-contracts/product/edit-product';

export interface EditProductRepository {
  edit: (editProductParams: EditProductParams) => Promise<EditProductReturn | null>
}
