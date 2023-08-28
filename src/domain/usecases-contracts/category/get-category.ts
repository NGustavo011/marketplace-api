import { CategoryModel } from '../../models/category';

export interface GetCategoryParams {
  id?: string
}
export type GetCategoryReturn = CategoryModel[]

export interface GetCategoryContract {
  get: (getCategoryParams: GetCategoryParams) => Promise<GetCategoryReturn | null>
}
