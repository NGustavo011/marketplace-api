import { ProductModel } from '../../models/product';
import { UserUsed } from '../../models/user';
import { AddProductParams } from './add-product';

export type EditProductParams = {
    id: string
    product: Omit<AddProductParams, 'userId'>
} & UserUsed
export type EditProductReturn = ProductModel

export interface EditProductContract {
  edit: (editProductParams: EditProductParams) => Promise<EditProductReturn | null>
}
