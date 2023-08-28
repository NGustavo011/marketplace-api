import { GetCategoryParams, GetCategoryReturn } from '../../../domain/usecases-contracts/category/get-category';

export interface GetCategoryRepository {
  get: (getCategoryParams: GetCategoryParams) => Promise<GetCategoryReturn | null>
}
