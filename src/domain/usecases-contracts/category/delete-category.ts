export interface DeleteCategoryParams {
    id: string
}
  
export interface DeleteCategoryContract {
    delete: (deleteCategoryParams: DeleteCategoryParams) => Promise<boolean | null>
}
