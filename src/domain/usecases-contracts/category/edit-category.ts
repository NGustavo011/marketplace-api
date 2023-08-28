import { CategoryModel } from '../../models/category';
import { AddCategoryParams } from './add-category';

export type EditCategoryParams = {
    id: string
    category: AddCategoryParams
}
export type EditCategoryReturn = CategoryModel

export interface EditCategoryContract {
  edit: (editCategoryParams: EditCategoryParams) => Promise<EditCategoryReturn | null>
}
