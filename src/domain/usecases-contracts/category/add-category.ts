import { CategoryModel } from '../../models/category';

export type AddCategoryParams = Omit<CategoryModel, 'id'>
export type AddCategoryReturn = CategoryModel

export interface AddCategoryContract {
    add: (addCategoryParams: AddCategoryParams) => Promise<AddCategoryReturn | null>
}