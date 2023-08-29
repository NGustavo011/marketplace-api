import { ProductModel } from '../../models/product';

export type AddProductParams = Omit<ProductModel, 'id' | 'seller' | 'category'>
export type AddProductReturn = ProductModel

export interface AddProductContract {
    add: (addProductParams: AddProductParams) => Promise<AddProductReturn | null>
}