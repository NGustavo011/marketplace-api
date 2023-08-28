import { ProductModel } from '../../models/product';
import { UserUsed } from '../../models/user';


export type AddProductParams = Omit<ProductModel, 'id' | 'seller' | 'category'> & UserUsed
export type AddProductReturn = ProductModel

export interface AddProductContract {
    add: (addProductParams: AddProductParams) => Promise<AddProductReturn | null>
}