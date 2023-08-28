import { UserUsed } from '../../models/user';

export type DeleteProductParams = {
    id: string
} & UserUsed
  
export interface DeleteProductContract {
    delete: (deleteProductParams: DeleteProductParams) => Promise<boolean | null>
}